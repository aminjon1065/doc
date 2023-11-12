<?php

namespace App\Http\Controllers;

use App\Models\Document;
use App\Models\DocumentFile;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DocumentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $this->authorize('viewAny', Document::class);
        $searchTerm = $request->input('search');
        $status = $request->input('status');
        $dateDone = $request->input('date_done');
        $startDate = $request->input('start_date'); // Предполагается формат 'Y-m-d'
        $endDate = $request->input('end_date');     // Предполагается формат 'Y-m-d'
        $isControlled = filter_var($request->input('is_controlled'), FILTER_VALIDATE_BOOLEAN);
        $perPage = 10; // Количество элементов на странице
        $documents = Document::
        with(['files', 'creator', 'receivers'])
            ->search($searchTerm)
            ->withEmptyCategory() // Использование нового scope
            ->isControlled($isControlled)
            ->status($status)
            ->dateDone($dateDone)
            ->createdAtBetween($startDate, $endDate)
            ->orderBy('created_at', 'desc')
            ->paginate($perPage);
        return Inertia::render('Documents/index', [
            'documents' => $documents,
            'searchTerm' => $searchTerm,
            'status' => $status,
            'dateDone' => $dateDone,
            'startDate' => $startDate,
            'endDate' => $endDate,
            'is_controlled' => $isControlled,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $managers = User::where('role', 'management')->get();
        return Inertia::render('CreateDocument/index', [
            'managers' => $managers,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $documentTypeArr = [
            [
                "code" => "5/3-12",
                "type" => "Бақайдгирии супоришҳои хаттӣ ва протоколҳои маҷлисҳои назди Сарвазири Ҷумҳурии Тоҷикистон ва муовинони у Роҳбари Дастгоҳи иҷроияи Президенти Ҷумҳурии Тоҷикистон",
            ],
            [
                "code" => "5/3-13",
                "type" => "Бақайдгирии супоришҳои хаттӣ ва протоколҳои маҷлисҳои Президенти Ҷумҳурии Тоҷикистон",
            ],
            [
                "code" => "5/3-14",
                "type" => "Бақайдгирии қонунҳо, санадҳои меъёрии ҳуқуқии Президенти Ҷумҳурии Тоҷикистон",
            ],
            [
                'code' => '5/3-15',
                'type' => 'Бақайдгирии мукотиботи  Ҳукуматӣ',
            ],
            [
                'code' => '5/3-16',
                'type' => 'Бақайдгирии мукотиботи вазорату идораҳо',
            ],
            [
                'code' => '5/3-17',
                'type' => 'Бақайдгирии гузоришҳои хизматчиёни ҳарбӣ',
            ],
            [
                'code' => '5/3-18',
                'type' => 'Бақайдгирии амрҳои Президенти Ҷумҳурии Тоҷикистон ва фармоишҳои Ҳукумати Ҷумҳурии Тоҷикистон',
            ],
            [
                'code' => '5/3-19',
                'type' => 'Бақайдгирии ҳуҷҷатҳои воридотии БИХ',
            ],
            [
                'code' => '5/3-20',
                'type' => 'Бақайдгирии барқияҳои ҳукуматӣ',
            ],
            [
                'code' => '5/3-21',
                'type' => 'Бақайдгирии ҳуҷҷатҳои воридотии Шурои амнияти Ҷумҳурии Тоҷикистон ',
            ],
            [
                'code' => '5/3-22',
                'type' => 'Бақайдгирии ТАВЗЕҲОТҲО',
            ],
            [
                'code' => '5/3-23',
                'type' => 'Бақайдгирии ҳуҷҷатҳои Дастгоҳи маркази ва сохторҳои таркибии Кумита ',
            ],
            [
                'code' => '5/3-24',
                'type' => 'Бақайдгирии ҳуҷҷатҳои вазорату идораҳо',
            ],
            [
                'code' => '5/3-25',
                'type' => 'Бақайдгирии ҳуҷҷатҳои баргардонидашуда ',
            ],
            [
                'code' => '5/3-26',
                'type' => 'Бақайдгирии дигар санадҳои меъёрии ҳуқуқии Ҷумҳурии Тоҷикистон, аз ҷумла санадҳои байналмилалӣ',
            ],
            [
                'code' => '5/3-27',
                'type' => 'Бақайдгирии лоиҳаҳои санадҳои меъёрии ҳуқуқӣ ',
            ]
        ];
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'files.*' => 'file|mimes:jpg,jpeg,png,bmp,gif,svg,pdf,doc,docx|max:20480',
        ]);

        $document = new Document;
        $document->created_by_id = Auth::id();
        $document->title = $request->input('title');
        $document->description = $request->input('description');
        $document->code = $request->input('code');
        foreach ($documentTypeArr as $item) {
            if ($item['code'] === $document->code) {
                $document->type = $item['type'];
                break;
            }
        }
        $document->manager_id = $request->input('manager_id');
        $document->category = $request->input('category');
        $document->status = $request->filled('status') ? $request->input('status') : 'created';
        $document->is_controlled = $request->filled('is_controlled') ? 1 : 0;
        $document->date_done = $request->has('is_controlled') && $request->has('date_done') ? $request->date_done : null;
        $document->save();
        // Сохраняем файлы
        if ($request->hasFile('files')) {
            foreach ($request->file('files') as $file) {
                $filePath = $file->storeAs('/documents/' . \auth()->user()->name, date_format(now(), 'Y-m-d-H-i-s') . '-' . $file->getClientOriginalName(), 'public');
                $documentFile = new DocumentFile;
                $documentFile->document_id = $document->id;
                $documentFile->file_path = $filePath;
                $documentFile->file_name = $file->getClientOriginalName();
                $documentFile->file_type = $file->getClientOriginalExtension();
                $documentFile->file_size = round($file->getSize() / 1024 / 1024 * 1024, 2);
                $documentFile->save();
            }
        }
        $receiverIds = $request->input('receivers');

        // Проверка, что $receiverIds действительно является массивом
        if (is_array($receiverIds)) {
            // Связывание получателей с документом
            $document->receivers()->attach($receiverIds);
        }
        return redirect()->route('inbox.index')->with('success', 'Документ успешно отправлен');
    }

    /**
     * Display the specified resource.
     */
    public function show(Document $document)
    {
        $this->authorize('view', $document);
        $document->load(['files', 'creator', 'receivers']);
        return Inertia::render('ShowDocument/index', [
            'document' => $document,
        ]);
//        if (Auth::user()->isCommonDepartment()) {
//            $managers = User::where('role', 'management')->get();
//            $document->load(['files', 'creator', 'receivers']);
//            return Inertia::render('Documents/CommonShow', [
//                'document' => $document,
//                'managers' => $managers
//            ]);
//        }
//        $document->load(['files', 'creator', 'receivers']);
//        return Inertia::render('Documents/UserShow', [
//            'document' => $document,
//        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Document $document)
    {
        $this->authorize('view', $document);
        $managers = User::where('role', 'management')->get();
        $document->load(['files', 'creator', 'receivers', 'manager']);
//        $document->load(['files', 'creator', 'receivers']);
        return Inertia::render('EditDocument/index', [
            'document' => $document,
            'managers' => $managers
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Document $document)
    {
        $validatedData = $request->validate([
            'manager_id' => 'nullable|exists:users,id',
            'category' => 'nullable|string',
            'status' => 'required|string',
            'is_controlled' => 'nullable|boolean',
            'date_done' => 'nullable|date',
            'receivers' => 'nullable|array',
        ]);
        $document->manager_id = $request->input('manager_id', $document->manager_id);
        $document->category = $request->input('category', $document->category);
        $document->status = $request->filled('status') ? $request->input('status') : $document->status;
        $document->is_controlled = $request->filled('is_controlled') ? 1 : 0;
        $document->date_done = $request->has('is_controlled') && $request->has('date_done') ? $request->date_done : null;
        $document->save();
        if ($request->has('receivers')) {
            $receiverIds = $request->input('receivers', $document->receivers->pluck('id')->toArray());
            // Проверка, что $receiverIds действительно является массивом
            if (isset($receiverIds))
            {
                if (is_array($receiverIds)) {
                    // Связывание получателей с документом
                    $document->receivers()->attach($receiverIds);
                }
            }

        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Document $document)
    {
        //
    }
}
