<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UsersList extends Controller
{
    public function index()
    {
        return Inertia::render('Users/index', [
            'users' => User::paginate(10)
        ]);
    }

    public function store(Request $request)
    {
        
    }
}
