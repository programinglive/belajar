<?php

use App\Http\Controllers\UserController;
use App\Livewire\Counter;
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

Route::get('counter', Counter::class)->name('counter');

Route::get('/crud-with-jquery', function () {

    $users = User::all();

    return view('crud_with_jquery', compact('users'));
})->name('crud.with.jquery');

Route::get('getUserById/{id}', [UserController::class, 'getUserById'])->name('getUserById');
Route::post('updateUser', [UserController::class, 'updateUser']);
Route::get('delete/{id}', [UserController::class, 'deleteUser']);