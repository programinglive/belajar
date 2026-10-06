<?php

namespace App\Http\Controllers;

use App\Models\LearningTrackProgress;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class LearningTrackProgressController extends Controller
{
    /**
     * Resolve the currently authenticated user across JWT, Sanctum, or Session auth.
     */
    protected function resolveUser(Request $request)
    {
        return auth('api')->user() ?: $request->user();
    }

    /**
     * Get the authenticated user's progress for a learning track.
     */
    public function show(Request $request, string $track): JsonResponse
    {
        $user = $this->resolveUser($request);

        if (! $user) {
            return response()->json(['error' => 'Unauthenticated'], 401);
        }

        $progress = LearningTrackProgress::where('user_id', $user->id)
            ->where('track_slug', $track)
            ->first();

        if (! $progress || ! $progress->consent_given) {
            return response()->json([
                'track_slug' => $track,
                'consent_given' => false,
                'completed_lessons' => [],
                'capstone_completed' => false,
                'capstone_notes' => null,
            ]);
        }

        return response()->json([
            'track_slug' => $progress->track_slug,
            'consent_given' => true,
            'consent_given_at' => $progress->consent_given_at?->toIso8601String(),
            'completed_lessons' => $progress->completed_lessons ?? [],
            'capstone_completed' => (bool) $progress->capstone_completed,
            'capstone_submitted_at' => $progress->capstone_submitted_at?->toIso8601String(),
            'capstone_notes' => $progress->capstone_notes,
            'updated_at' => $progress->updated_at?->toIso8601String(),
        ]);
    }

    /**
     * Record or update consented progress signals for a learning track.
     */
    public function store(Request $request, string $track): JsonResponse
    {
        $user = $this->resolveUser($request);

        if (! $user) {
            return response()->json(['error' => 'Unauthenticated'], 401);
        }

        $validated = $request->validate([
            'consent_given' => ['required', 'boolean'],
            'completed_lessons' => ['nullable', 'array'],
            'completed_lessons.*' => ['integer', 'min:1', 'max:10'],
            'capstone_completed' => ['nullable', 'boolean'],
            'capstone_notes' => ['nullable', 'string', 'max:500'],
        ]);

        if (! $validated['consent_given']) {
            return response()->json([
                'error' => 'Consent required',
                'message' => 'Penyimpanan progres pembelajaran memerlukan persetujuan eksplisit (consent).',
            ], 422);
        }

        $completedLessons = array_values(array_unique($validated['completed_lessons'] ?? []));
        sort($completedLessons);

        $capstoneCompleted = (bool) ($validated['capstone_completed'] ?? false);

        $progress = LearningTrackProgress::updateOrCreate(
            [
                'user_id' => $user->id,
                'track_slug' => $track,
            ],
            [
                'consent_given' => true,
                'consent_given_at' => now(),
                'completed_lessons' => $completedLessons,
                'capstone_completed' => $capstoneCompleted,
                'capstone_submitted_at' => $capstoneCompleted ? now() : null,
                'capstone_notes' => $validated['capstone_notes'] ?? null,
            ]
        );

        return response()->json([
            'message' => 'Sinyal progres belajar berhasil disimpan dengan persetujuan.',
            'progress' => [
                'track_slug' => $progress->track_slug,
                'consent_given' => true,
                'consent_given_at' => $progress->consent_given_at?->toIso8601String(),
                'completed_lessons' => $progress->completed_lessons,
                'capstone_completed' => (bool) $progress->capstone_completed,
                'capstone_submitted_at' => $progress->capstone_submitted_at?->toIso8601String(),
                'capstone_notes' => $progress->capstone_notes,
            ],
        ]);
    }

    /**
     * Revoke consent and delete stored progress data.
     */
    public function destroy(Request $request, string $track): JsonResponse
    {
        $user = $this->resolveUser($request);

        if (! $user) {
            return response()->json(['error' => 'Unauthenticated'], 401);
        }

        LearningTrackProgress::where('user_id', $user->id)
            ->where('track_slug', $track)
            ->delete();

        return response()->json([
            'message' => 'Persetujuan dicabut dan data progres pembelajaran telah dihapus.',
        ]);
    }
}
