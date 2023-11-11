<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class InboxController extends Controller
{
    public function index()
    {

        return Inertia::render('Inbox/index');
    }
}
