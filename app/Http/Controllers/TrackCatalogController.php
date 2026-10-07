<?php

namespace App\Http\Controllers;

use App\Services\TrackCatalogService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class TrackCatalogController extends Controller
{
    /**
     * Display the public course catalog of learning tracks.
     */
    public function index(Request $request): Response
    {
        $tracks = TrackCatalogService::getTracks($request->user());

        return Inertia::render('Tracks/Index', [
            'tracks' => $tracks,
        ]);
    }
}
