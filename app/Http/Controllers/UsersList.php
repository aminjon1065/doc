<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;

class UsersList extends Controller
{
    private function checkRole()
    {
        return auth()->user()->role === 'common' || auth()->user()->role === 'admin';
    }

    public function index()
    {
        if (!$this->checkRole()) {
            return redirect()->back()->withErrors('Unauthorized access');
        }
        return Inertia::render('Users/index', [
            'users' => User::orderByDesc("created_at")->paginate(10)
        ]);
    }

    public function store(Request $request)
    {
        if (!$this->checkRole()) {
            return redirect()->back()->withErrors('Unauthorized access');
        }
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:' . User::class,
            'position' => 'required|string|max:255',
            'department' => 'required|string|max:255',
            'region' => 'required|string|max:255',
            'rank' => 'required|string|max:255',
            'role' => 'required|in:admin,common,user,management',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'position' => $request->position,
            'department' => $request->department,
            'region' => $request->region,
            'rank' => $request->rank,
            'role' => $request->role,
            'password' => Hash::make($request->password),
        ]);
        return redirect()->back()->with('success', 'User created successfully');
    }

    public function edit(User $user)
    {
        if (!$this->checkRole()) {
            return redirect()->back()->withErrors('Unauthorized access');
        }
        return Inertia::render('Users/EditUserForm', [
            'user' => $user
        ]);
    }

    public function update(User $user)
    {
        if (!$this->checkRole()) {
            return redirect()->back()->withErrors('Unauthorized access');
        }

        $request = request()->validate([
            'name' => 'nullable|string|max:255',
            'email' => 'nullable|string|lowercase|email|max:255|unique:' . User::class . ',email,' . $user->id,
            'position' => 'nullable|string|max:255',
            'department' => 'nullable|string|max:255',
            'region' => 'nullable|string|max:255',
            'rank' => 'nullable|string|max:255',
            'role' => 'nullable|in:admin,common,user,management',
            'password' => ['nullable', 'confirmed', Rules\Password::defaults()],
        ]);

        $updateData = array_filter([
            'name' => $request['name'],
            'email' => $request['email'],
            'position' => $request['position'],
            'department' => $request['department'],
            'region' => $request['region'],
            'rank' => $request['rank'],
            'role' => $request['role'],
            'password' => isset($request['password']) ? Hash::make($request['password']) : null,
        ]);
        $user->update($updateData);
        return redirect()->back()->with('success', 'UserUpdated');
    }
}
