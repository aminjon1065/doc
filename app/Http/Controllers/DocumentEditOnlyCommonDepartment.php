<?php

namespace App\Http\Controllers;

use App\Models\Document;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DocumentEditOnlyCommonDepartment extends Controller
{
    public function edit(Document $document, Request $request)
    {
        $this->authorize('edit', $document);
        $managers = User::where('role', 'management')->get();
        $document->load(['files', 'creator', 'receivers', 'manager']);
        return Inertia::render('CreateDocument/DocumentEditOnlyCommonDepartment', [
            'document' => $document,
            'managers' => $managers,
        ]);
    }
}
