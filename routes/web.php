<?php

use App\Http\Controllers\UserController;
use App\Livewire\Counter;
use App\Livewire\UploadPage;
use App\Livewire\UserPage;
use App\Models\User;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function(){
    return view('landingpage');
})->name('landingpage');

Route::get('/phpinfo', function(){
    return phpinfo();
})->name('phpinfo');

/**
 * Simple Counter Application with Livewire
 */
Route::get('counter', Counter::class)->name('counter');

/**
 * Simple CRUD with Jquery Datatable and Bootstrap Modal
 */
Route::get('/crud-with-jquery', [UserController::class, 'crud_with_jquery'])->name('crud.with.jquery');
Route::get('getUserById/{id}', [UserController::class, 'getUserById'])->name('getUserById');
Route::post('updateUser', [UserController::class, 'updateUser']);
Route::get('delete/{id}', [UserController::class, 'deleteUser']);


/**
 * User External Controller to Livewire Component
 */
Route::get('userpages', UserPage::class)->name('userpages');

/**
 * Upload file with Livewire 
 */
Route::get('uploadpages', UploadPage::class)->name('uploadpages');