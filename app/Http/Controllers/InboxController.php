<?php

namespace App\Http\Controllers;

use App\Models\Document;
use Auth;
use Illuminate\Http\Request;
use Inertia\Inertia;

class InboxController extends Controller
{
    public function index()
    {
        $userId = Auth::id(); // Или любой другой ID пользователя
        $documents = Document::forReceiver($userId)->get();
        return Inertia::render('Inbox/index', [
            'documents' => $documents,
        ]);
    }
}
