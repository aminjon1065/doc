<?php

namespace App\Http\Controllers;

use App\Models\DocumentFileResponse;
use App\Models\DocumentResponse;
use Illuminate\Http\Request;

class DocumentResponseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $responseDocument = new DocumentResponse();
        $responseDocument->document_id = $request->input('document_id');
        $responseDocument->user_id = auth()->user()->id;
        $responseDocument->description = $request->input('description');
        $responseDocument->save();
        if ($request->hasFile('files')) {
            foreach ($request->file('files') as $file) {
                $filePath = $file->storeAs('/reply-to-documents/' . \auth()->user()->name, date_format(now(), 'Y-m-d-H-i-s') . '-' . $file->getClientOriginalName(), 'public');
                $documentFile = new DocumentFileResponse();
                $documentFile->document_responses_id = $responseDocument->id;
                $documentFile->file_path = $filePath;
                $documentFile->file_name = $file->getClientOriginalName();
                $documentFile->file_type = $file->getClientOriginalExtension();
                $documentFile->file_size = round($file->getSize() / 1024 / 1024 * 1024, 2);
                $documentFile->save();
            }
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
