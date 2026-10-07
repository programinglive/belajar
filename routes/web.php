<?php

use App\Http\Controllers\TrackCatalogController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Home');
});

Route::get('/tracks', [TrackCatalogController::class, 'index'])->name('tracks.index');

Route::get('/learn/first-web-page', function () {
    return Inertia::render('Courses/FirstWebPage');
})->name('learn.first-web-page');
