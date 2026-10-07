<?php

namespace App\Http\Controllers;

use App\Models\LearningTrackProgress;
use App\Services\TrackCatalogService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    /**
     * Display the authenticated learner dashboard.
     */
    public function index(Request $request): Response
    {
        $user = $request->user();
        $tracks = TrackCatalogService::getTracks($user);
        $progressRecords = LearningTrackProgress::where('user_id', $user->id)->get();

        $activeTracks = [];
        $availableTracks = [];
        $totalLessonsCompleted = 0;
        $totalCapstonesCompleted = 0;

        foreach ($tracks as $track) {
            $userProgress = $track['user_progress'];
            if ($userProgress && ($userProgress['completed_lessons_count'] > 0 || $userProgress['capstone_completed'])) {
                $totalLessonsCompleted += $userProgress['completed_lessons_count'];
                if ($userProgress['capstone_completed']) {
                    $totalCapstonesCompleted += 1;
                }

                $activeTracks[] = [
                    'slug' => $track['slug'],
                    'title' => $track['title'],
                    'subtitle' => $track['subtitle'] ?? null,
                    'level' => $track['level'],
                    'duration' => $track['duration'],
                    'lesson_count' => $track['lesson_count'],
                    'completed_lessons' => $userProgress['completed_lessons'],
                    'completed_lessons_count' => $userProgress['completed_lessons_count'],
                    'percentage' => $userProgress['percentage'],
                    'capstone_completed' => $userProgress['capstone_completed'],
                    'capstone_submitted_at' => $userProgress['capstone_submitted_at'],
                    'consent_given' => $userProgress['consent_given'],
                    'resume_url' => $track['route'] ?? "/learn/{$track['slug']}",
                ];
            } else {
                $availableTracks[] = $track;
            }
        }

        $stats = [
            'tracks_started' => count($activeTracks),
            'lessons_completed' => $totalLessonsCompleted,
            'capstones_completed' => $totalCapstonesCompleted,
        ];

        return Inertia::render('Dashboard', [
            'stats' => $stats,
            'active_tracks' => $activeTracks,
            'available_tracks' => $availableTracks,
        ]);
    }
}
