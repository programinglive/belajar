<?php

namespace Tests\Feature;

use App\Models\LearningTrackProgress;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia;
use Tests\TestCase;

class TrackCatalogTest extends TestCase
{
    use RefreshDatabase;

    public function test_track_catalog_is_accessible_to_guests(): void
    {
        $response = $this->get('/tracks');

        $response->assertStatus(200);
        $response->assertInertia(fn (AssertableInertia $page) => $page
            ->component('Tracks/Index')
            ->has('tracks')
        );
    }

    public function test_track_catalog_contains_published_and_upcoming_tracks(): void
    {
        $response = $this->get('/tracks');

        $response->assertStatus(200);
        $response->assertInertia(fn (AssertableInertia $page) => $page
            ->component('Tracks/Index')
            ->has('tracks', 3)
            ->where('tracks.0.slug', 'first-web-page')
            ->where('tracks.0.status', 'published')
            ->where('tracks.1.slug', 'javascript-logic-dom')
            ->where('tracks.1.status', 'coming_soon')
            ->where('tracks.2.slug', 'git-github-fundamentals')
            ->where('tracks.2.status', 'coming_soon')
        );
    }

    public function test_track_catalog_reflects_user_progress_when_authenticated(): void
    {
        $user = User::factory()->create();

        LearningTrackProgress::create([
            'user_id' => $user->id,
            'track_slug' => 'first-web-page',
            'consent_given' => true,
            'consent_given_at' => now(),
            'completed_lessons' => [1, 2],
            'capstone_completed' => false,
        ]);

        $response = $this->actingAs($user)->get('/tracks');

        $response->assertStatus(200);
        $response->assertInertia(fn (AssertableInertia $page) => $page
            ->component('Tracks/Index')
            ->where('tracks.0.slug', 'first-web-page')
            ->where('tracks.0.user_progress.completed_lessons_count', 2)
            ->where('tracks.0.user_progress.percentage', 50)
            ->where('tracks.0.user_progress.capstone_completed', false)
        );
    }
}
