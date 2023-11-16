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
        $users = User::all()->map(function ($user) {
            if ($user->role == 'user') {
                return [
                    'value' => $user->id,
                    'label' => $user->name . '-' . $user->department . ' (' . $user->region . ')'
                ];
            }
            return null;
        })->filter()->values(); // Удалить все значения null из списка и преобразовать в массив
        $document->load(['files', 'creator', 'receivers', 'manager']);
        return Inertia::render('CreateDocument/DocumentEditOnlyCommonDepartment', [
            'document' => $document,
            'managers' => $managers,
            'users' => $users,
        ]);
    }
}
