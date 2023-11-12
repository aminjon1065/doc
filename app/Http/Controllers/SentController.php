<?php

namespace App\Http\Controllers;

use App\Models\Document;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SentController extends Controller
{
    public function index()
    {
        if (\Auth::user()->isCommonDepartment()) {
            $documents = Document::all();
            return Inertia::render('Sent/index', [
                'documents' => $documents
            ]);
        }
        $documents = \Auth::user()->createDocument()->with(['files'])->get();
        return Inertia::render('Sent/index', [
            'documents' => $documents
        ]);
    }
}
