<?php

namespace Tests\Feature;

use App\Models\LearningTrackProgress;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Inertia\Testing\AssertableInertia;
use Tests\TestCase;

class DashboardTest extends TestCase
{
    use RefreshDatabase;

    public function test_unauthenticated_user_cannot_access_dashboard(): void
    {
        $response = $this->get('/dashboard');

        $response->assertRedirect('/login');
    }

    public function test_authenticated_user_can_access_dashboard(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->get('/dashboard');

        $response->assertStatus(200);
        $response->assertInertia(fn (AssertableInertia $page) => $page
            ->component('Dashboard')
            ->has('stats')
            ->has('active_tracks')
            ->has('available_tracks')
            ->where('stats.tracks_started', 0)
            ->where('stats.lessons_completed', 0)
            ->where('stats.capstones_completed', 0)
        );
    }

    public function test_dashboard_aggregates_correct_learning_stats(): void
    {
        $user = User::factory()->create();

        LearningTrackProgress::create([
            'user_id' => $user->id,
            'track_slug' => 'first-web-page',
            'consent_given' => true,
            'consent_given_at' => now(),
            'completed_lessons' => [1, 2],
            'capstone_completed' => true,
            'capstone_submitted_at' => now(),
            'capstone_notes' => 'Portofolio awal selesai.',
        ]);

        $response = $this->actingAs($user)->get('/dashboard');

        $response->assertStatus(200);
        $response->assertInertia(fn (AssertableInertia $page) => $page
            ->component('Dashboard')
            ->where('stats.tracks_started', 1)
            ->where('stats.lessons_completed', 2)
            ->where('stats.capstones_completed', 1)
            ->has('active_tracks', 1)
            ->where('active_tracks.0.slug', 'first-web-page')
            ->where('active_tracks.0.percentage', 50)
            ->where('active_tracks.0.capstone_completed', true)
        );
    }

    public function test_authenticated_user_is_redirected_to_dashboard_after_login(): void
    {
        $user = User::factory()->create([
            'email' => 'learner@example.com',
            'password' => Hash::make('secret-password'),
        ]);

        $response = $this->post('/login', [
            'email' => 'learner@example.com',
            'password' => 'secret-password',
        ]);

        $response->assertRedirect('/dashboard');
        $this->assertAuthenticatedAs($user);
    }
}
