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
                $route = 'users.index';
                break;
            case 'common':
                $route = 'documents.index';
                break;
            case 'deputy' or    'boss':
                $route = 'documents-in-reviews.index';
                break;
            case 'user':
                $route = 'inbox.index';
                break;
        endswitch;
        return redirect()->route($route);
    }
}
