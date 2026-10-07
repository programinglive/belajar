<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\LearningTrackProgressController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group([
    'middleware' => 'api',
    'prefix' => 'auth'

], function ($router) {

    Route::post('register', [AuthController::class, 'register']);
    Route::post('login', [AuthController::class, 'login']);

    Route::middleware('auth:api')->group(function () {
        Route::post('logout', [AuthController::class, 'logout']);
        Route::post('refresh', [AuthController::class, 'refresh']);
        Route::match(['get', 'post'], 'me', [AuthController::class, 'me']);
    });

});

Route::get('/learning-tracks/{track}/progress', [LearningTrackProgressController::class, 'show']);
Route::post('/learning-tracks/{track}/progress', [LearningTrackProgressController::class, 'store']);
Route::delete('/learning-tracks/{track}/progress', [LearningTrackProgressController::class, 'destroy']);

Route::get('/learning-tracks/first-web-page', function () {
    $package = json_decode(file_get_contents(base_path('package.json')), true);

    return response()->json([
        'version' => $package['version'] ?? null,
        'slug' => 'first-web-page',
        'title' => 'Build a simple personal webpage',
        'status' => 'published',
        'requires_account' => false,
        'lesson_count' => 4,
        'has_capstone' => true,
        'lessons' => [
            ['number' => 1, 'title' => 'Buat struktur halaman'],
            ['number' => 2, 'title' => 'Susun konten yang bermakna'],
            ['number' => 3, 'title' => 'Beri gaya dan buat responsif'],
            ['number' => 4, 'title' => 'Tinjau dan perbaiki'],
        ],
        'resources' => [
            'track' => url('/learn/first-web-page'),
            'starter_html' => url('/learn/personal-page/starter/index.html'),
            'starter_css' => url('/learn/personal-page/starter/styles.css'),
            'completed_example' => url('/learn/personal-page/example/index.html'),
            'help' => 'https://github.com/programinglive/belajar/discussions',
        ],
    ]);
})->name('api.learning-tracks.first-web-page');

Route::get('/learning-tracks/javascript-logic-dom', function () {
    $package = json_decode(file_get_contents(base_path('package.json')), true);

    return response()->json([
        'version' => $package['version'] ?? null,
        'slug' => 'javascript-logic-dom',
        'title' => 'Dasar Logika JavaScript & DOM',
        'status' => 'published',
        'requires_account' => false,
        'lesson_count' => 5,
        'has_capstone' => true,
        'lessons' => [
            ['number' => 1, 'title' => 'Menghubungkan JavaScript & Mengenal Variabel'],
            ['number' => 2, 'title' => 'Percabangan & Logika Kondisional'],
            ['number' => 3, 'title' => 'Fungsi (Functions) & Operasi Aritmatika'],
            ['number' => 4, 'title' => 'Seleksi Elemen DOM & Event Listener'],
            ['number' => 5, 'title' => 'Proyek Capstone: Merakit Aplikasi Kalkulator'],
        ],
        'resources' => [
            'track' => url('/learn/javascript-logic-dom'),
            'starter_html' => url('/learn/javascript-logic/starter/index.html'),
            'starter_css' => url('/learn/javascript-logic/starter/styles.css'),
            'starter_js' => url('/learn/javascript-logic/starter/app.js'),
            'example_html' => url('/learn/javascript-logic/example/index.html'),
            'example_css' => url('/learn/javascript-logic/example/styles.css'),
            'example_js' => url('/learn/javascript-logic/example/app.js'),
            'help' => 'https://github.com/programinglive/belajar/discussions',
        ],
    ]);
})->name('api.learning-tracks.javascript-logic-dom');
