<?php

use App\Http\Controllers\DocumentController as DocumentControllerAlias;
use App\Http\Controllers\GetUsersList as GetUsersListAlias;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UsersList as UsersListAlias;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::resource('documents', DocumentControllerAlias::class);
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::get('users', [UsersListAlias::class, 'index'])->name('users.index');
    Route::get('/sent', [App\Http\Controllers\SentController::class, 'index'])->name('sent.index');
    Route::get('/inbox', [App\Http\Controllers\InboxController::class, 'index'])->name('inbox.index');
    Route::get('users-list', [GetUsersListAlias::class, 'usersList'])->name('users-list');
});
Route::get('/documents-in-reviews', [App\Http\Controllers\DocumentsInReviewsController::class, 'index'])->name('documents-in-reviews.index')->middleware(['auth', 'management']);

require __DIR__ . '/auth.php';
