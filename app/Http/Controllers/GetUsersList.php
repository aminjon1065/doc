<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class GetUsersList extends Controller
{
    public function usersList()
    {
        $users = User::all()->map(function ($user) {
            if ($user->role == 'user') {
                return [
                    'value' => $user->id,
                    'label' => $user->name . '-' . $user->department . ' (' . $user->region . ')'
                ];
            }
            return null;
        })->filter()->values(); // Удалить все значения null из списка и преобразовать в массив
        return response()->json($users, 200);
    }
}
