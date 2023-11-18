<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class LanguageController extends Controller
{
    public function store(Request $request)
    {
//        dd($request->language);
        $request->validate([
            'language' => ['required', 'string', 'max:2']
        ]);

        session(['locale' => $request->language]);

        return redirect()->back();
    }
}
