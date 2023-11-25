<?php

use App\Http\Controllers\DocumentController as DocumentControllerAlias;
use App\Http\Controllers\GetUsersList as GetUsersListAlias;
use App\Http\Controllers\MainPageController as MainPageControllerAlias;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UsersList as UsersListAlias;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\DocumentResponseController as DocumentResponseControllerAlias;
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

Route::middleware('locale')->group(function () {
    Route::get('/', [MainPageControllerAlias::class, 'index'])->name('main-page');
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->middleware(['auth', 'verified'])->name('dashboard');

    Route::middleware('auth')->group(function () {
        Route::resource('documents', DocumentControllerAlias::class);
        Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
        Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
        Route::resource('users', UsersListAlias::class)->name('users', 'users');
        Route::get('/sent', [App\Http\Controllers\SentController::class, 'index'])->name('sent.index');
        Route::get('/inbox', [App\Http\Controllers\InboxController::class, 'index'])->name('inbox.index');
        Route::get('users-list', [GetUsersListAlias::class, 'usersList'])->name('users-list');
        Route::post('reply-to-documents/', [DocumentResponseControllerAlias::class, 'store'])->name('reply-to-documents.store');
        Route::get('document-edit-only-common-department/{document}', [App\Http\Controllers\DocumentEditOnlyCommonDepartment::class, 'edit'])->name('document-edit-only-common-department.edit');
    });
    Route::get('/documents-in-reviews', [App\Http\Controllers\DocumentsInReviewsController::class, 'index'])->name('documents-in-reviews.index')->middleware(['auth', 'management']);

    Route::middleware(['auth'])->group(function () {
        Route::resource('types-document', \App\Http\Controllers\TypesDocumentController::class);
    });
    require __DIR__ . '/auth.php';
    Route::post('/language', [App\Http\Controllers\LanguageController::class, 'store'])->name('language.store');
});
