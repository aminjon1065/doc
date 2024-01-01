<?php

namespace App\Http\Controllers;

use App\Mail\DocumentCreatedMail;
use App\Models\Document;
use App\Models\DocumentFile;
use App\Models\TypesDocument;
use App\Models\User;
use App\Notifications\DocumentReceived;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;

class DocumentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $this->authorize('viewAny', Document::class);
        $typesDocuments = TypesDocument::all();
        $searchTerm = $request->input('search');
        $status = $request->input('status');
        $dateDone = $request->input('date_done');
        $startDate = $request->input('start_date'); // Предполагается формат 'Y-m-d'
        $endDate = $request->input('end_date');     // Предполагается формат 'Y-m-d'
        $typeDocument = $request->input('typeDocument');
        $isControlled = filter_var($request->input('is_controlled'), FILTER_VALIDATE_BOOLEAN);
        $perPage = 10; // Количество элементов на странице
        $documents = Document::with(['files', 'creator', 'receivers'])
            ->search($searchTerm)
            ->withEmptyCategory() // Использование нового scope
            ->isControlled($isControlled)
            ->status($status)
            ->dateDone($dateDone)
            ->createdAtBetween($startDate, $endDate)
            ->orderBy('created_at', 'desc')
            ->code($typeDocument)
            ->paginate($perPage);
        return Inertia::render('Documents/index', [
            'documents' => $documents,
            'searchTerm' => $searchTerm,
            'status' => $status,
            'dateDone' => $dateDone,
            'startDate' => $startDate,
            'endDate' => $endDate,
            'is_controlled' => $isControlled,
            'typesDocuments' => $typesDocuments,
            'typeDocument' => $typeDocument
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $typesDocuments = TypesDocument::all();
        $users = User::all()->map(function ($user) {
            if ($user->role == 'user') {
                return [
                    'value' => $user->id,
                    'label' => $user->name . '-' . $user->department . ' (' . $user->region . ')'
                ];
            }
            return null;
        })->filter()->values(); // Удалить все значения null из списка и преобразовать в массив
        $deputies = User::all()->map(function ($user) {
            if ($user->role == 'deputy') {
                return [
                    'value' => $user->id,
                    'label' => $user->name . '-' . $user->department . ' (' . $user->region . ')'
                ];
            }
            return null;
        })->filter()->values(); // Удалить все значения null из списка и преобразовать в массив
        return Inertia::render('CreateDocument/index', [
            'deputies' => $deputies,
            'users' => $users,
            'typesDocuments' => $typesDocuments
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $documentTypeArr = TypesDocument::all();
        $request->validate([
            'title' => 'required|string',
            'description' => 'nullable|string',
            'code' => 'required|string',
            'category' => 'nullable|string',
            'files.*' => 'nullable|file|mimes:doc,docx,xls,xlsx,ppt,pptx,pdf,jpg,jpeg,png,gif|max:102400'
        ]);
        $document = new Document;
        $document->created_by_id = Auth::id();
//        $toBoss = filter_var($request->input('toBoss'), FILTER_VALIDATE_BOOLEAN);
//        $request->merge(['toBoss' => $toBoss]);
        $document->toBoss = $request->input('toBoss') === 'true' ? 1 : 0;
        $document->title = $request->input('title');
        $document->description = $request->input('description');
        $document->code = $request->input('code');
        foreach ($documentTypeArr as $item) {
            if ($item['code'] === $document->code) {
                $document->type_tj = $item['type_tj'];
                $document->type_ru = $item['type_ru'];
                break;
            }
        }
        $document->category = $request->input('category');
        $document->status = $request->filled('status') ? $request->input('status') : 'created';
        $document->is_controlled = $request->filled('is_controlled') ? 1 : 0;
        $document->date_done = $request->has('is_controlled') && $request->has('date_done') ? $request->date_done : null;
        $document->save();
        $deputyIds = $request->input('deputy');
        if (is_array($deputyIds)) {
            $document->deputy()->sync($deputyIds);
        }
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
        if (is_array($receiverIds)) {
            $document->receivers()->sync($receiverIds);
            $receivers = User::whereIn('id', $receiverIds)->get();
//            Mail::to($receivers)->send(new DocumentCreatedMail($document));
        }

        return redirect()->route('inbox.index')->with('success', 'Документ успешно отправлен');
    }

    /**
     * Display the specified resource.
     */
    public function show(Document $document)
    {
        $this->authorize('view', $document);
        $document->load(['files', 'creator', 'receivers', 'deputy', 'responses']);
        $bossName = $document->toBoss ? User::where('role', 'boss')->first()->name : null;
        return Inertia::render('ShowDocument/index', [
            'document' => $document,
            'bossName' => $bossName
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Document $document)
    {
        $this->authorize('view', $document);
        $users = User::all()->map(function ($user) {
            if ($user->role == 'user') {
                return [
                    'value' => $user->id,
                    'label' => $user->name . '-' . $user->department . ' (' . $user->region . ')'
                ];
            }
            return null;
        })->filter()->values(); // Удалить все значения null из списка и преобразовать в массив
        $deputies = User::all()->map(function ($user) {
            if ($user->role == 'deputy') {
                return [
                    'value' => $user->id,
                    'label' => $user->name . '-' . $user->department . ' (' . $user->region . ')'
                ];
            }
            return null;
        })->filter()->values(); // Удалить все значения null из списка и преобразовать в массив

        $document->load(['files', 'creator', 'receivers', 'deputy', 'responses']);
        //        $document->load(['files', 'creator', 'receivers']);
        $bossName = $document->toBoss ? User::where('role', 'boss')->first() : null;

        return Inertia::render('EditDocument/index', [
            'document' => $document,
            'deputies' => $deputies,
            'users' => $users,
            'bossName' => $bossName
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Document $document)
    {
        $this->authorize('view', $document);
//        dd($request->all());
        if ($request->category) {
            if ($document->status !== 'reviewed' && $request->status !== 'reviewed') {
                return back()->with('error', 'ReviewedError');
            }
        }

        $validatedData = $request->validate([
            'deputies' => 'nullable|array',
            'category' => 'nullable|string',
            'status' => 'required|string',
            'is_controlled' => 'nullable|boolean',
            'date_done' => 'nullable|date',
            'receivers' => 'nullable|array',
        ]);
        $document->toBoss = $request->input('toBoss', $document->toBoss);
        $document->category = $request->input('category', $document->category);
        $document->status = $request->filled('status') ? $request->input('status') : $document->status;
        $document->is_controlled = $request->filled('is_controlled') ? 1 : 0;
        $document->date_done = $request->has('is_controlled') && $request->has('date_done') ? $request->date_done : null;
        $document->save();
        if ($request->has('receivers')) {
            $receiverIds = $request->input('receivers', []);
            // Отправка писем только новым получателям
            $currentReceiverIds = $document->receivers->pluck('id')->toArray();
            $receiversToAdd = array_diff($receiverIds, $currentReceiverIds);

//            if (!empty($receiversToAdd)) {
//                $newReceivers = User::whereIn('id', $receiversToAdd)->get();
//                Mail::to($newReceivers)->send(new DocumentCreatedMail($document));
//            }
            // Обновление списка получателей
            $document->receivers()->sync($receiverIds);
        }
        if ($request->has('deputies')) {
            $deputiesIds = $request->input('deputies', []);
            // Отправка писем только новым получателям
            $currentDeputiesIds = $document->deputy->pluck('id')->toArray();
            $receiversToAdd = array_diff($deputiesIds, $currentDeputiesIds);
            // Обновление списка получателей
            $document->deputy()->sync($deputiesIds);
        }
        if (Auth::user()->isBossRole() or Auth::user()->isDeputiesRole()) {
            return redirect()->route('documents-in-reviews.index')->with('success', 'Документ успешно расмотрен');
        }
        if (Auth::user()->isCommonRole()) {
            return redirect()->route('documents.index')->with('success', 'Документ успешно расмотрен');
        }
        return redirect()->route('inbox.index')->with('success', 'Документ успешно расмотрен');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Document $document)
    {
        //
    }
}
