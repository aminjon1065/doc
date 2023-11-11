<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class SentController extends Controller
{
    public function index()
    {
        return Inertia::render('Sent/index');
    }
}
