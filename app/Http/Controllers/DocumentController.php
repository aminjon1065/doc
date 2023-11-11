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
        $searchTerm = $request->input('search');
        $status = $request->input('status');
        $dateDone = $request->input('date_done');
        $startDate = $request->input('start_date'); // Предполагается формат 'Y-m-d'
        $endDate = $request->input('end_date');     // Предполагается формат 'Y-m-d'
        $isControlled = filter_var($request->input('is_controlled'), FILTER_VALIDATE_BOOLEAN);
        $perPage = 10; // Количество элементов на странице
        $userId = Auth::id();

        $documents = Document::
        with(['files', 'creator', 'receivers'])
            ->search($searchTerm)
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
        return Inertia::render('Create/index', [
            'managers' => $managers,

        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'files.*' => 'file|mimes:jpg,jpeg,png,bmp,gif,svg,pdf,doc,docx|max:20480',
            'description' => 'nullable|string',
        ]);
        $document = new Document;
        $document->created_by_id = Auth::id();
        $document->title = $request->title;
        $document->type = $request->type;
        $document->code = $request->code;
        $document->is_controlled = $request->filled('is_controlled') ? 1 : 0;
        $document->description = $request->description;
        $document->status = 'created';
        $document->date_done = $request->has('is_controlled') && $request->has('date_done') ? $request->date_done : null;
        $document->save();
        // Сохраняем файлы
        if ($request->hasFile('files')) {
            foreach ($request->file('files') as $file) {
                $filePath = $file->storeAs('/documents/' . \auth()->user()->name, date_format(now(), 'Y-m-d') . '-' . $file->getClientOriginalName(), 'public');
                $documentFile = new DocumentFile;
                $documentFile->document_id = $document->id;
                $documentFile->file_path = $filePath;
                $documentFile->file_name = $file->getClientOriginalName();
                $documentFile->file_type = $file->getClientOriginalExtension();
                $documentFile->file_size = round($file->getSize() / 1024 / 1024 * 1024, 2);
                $documentFile->save();
            }
        }
        return redirect()->route('documents.index')->with('success', 'Документ успешно отправлен');
    }

    /**
     * Display the specified resource.
     */
    public function show(Document $document)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Document $document)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Document $document)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Document $document)
    {
        //
    }
}
