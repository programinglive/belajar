<?php

use App\Http\Controllers\SendMailController;
use App\Http\Controllers\UserController;
use App\Livewire\CartPage;
use App\Livewire\Counter;
use App\Livewire\ModalLivewireTigaPage;
use App\Livewire\ProductPage;
use App\Livewire\UploadPage;
use App\Livewire\UserPage;
use App\Models\User;
use Illuminate\Support\Facades\Route;

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

/**
 * Product 
 */
Route::get('productPages', ProductPage::class)->name('productPages');

/**
 * Cart 
 */
Route::get('cartPages', CartPage::class)->name('cartPages');


/**
 * Send EMail
 */

Route::get('/send-mail', [SendMailController::class, 'index'])->name('sendmail');


/**
 * Modal Livewire 3
 */

Route::get('/modalLivewireTiga', ModalLivewireTigaPage::class)->name('modalLivewireTiga');
