<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class MainPageController extends Controller
{
    public function index()
    {
        if (!\Auth::check()) {
            return redirect()->route("login");
        }
        $route = 'login';
        switch (\Auth::user()->role):
            case 'admin':
                $route = 'types-document.index';
                break;
            case 'common':
                $route = 'documents.index';
                break;
            case 'management':
                $route = 'documents-in-reviews.index';
                break;
            case 'user':
                $route = 'inbox';
                break;
        endswitch;
        return redirect()->route($route);
    }
}
