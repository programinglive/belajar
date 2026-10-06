<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class LearningTrackProgressTest extends TestCase
{
    use RefreshDatabase;

    public function test_unauthenticated_request_cannot_access_progress(): void
    {
        $this->getJson('/api/learning-tracks/first-web-page/progress')
            ->assertUnauthorized();

        $this->postJson('/api/learning-tracks/first-web-page/progress', [
            'consent_given' => true,
            'completed_lessons' => [1, 2],
        ])->assertUnauthorized();
    }

    public function test_saving_progress_without_explicit_consent_fails_validation(): void
    {
        $user = User::factory()->create(['password' => 'pilot-password']);
        $token = auth('api')->login($user);

        $this->withToken($token)
            ->postJson('/api/learning-tracks/first-web-page/progress', [
                'consent_given' => false,
                'completed_lessons' => [1],
            ])
            ->assertStatus(422)
            ->assertJson([
                'error' => 'Consent required',
            ]);
    }

    public function test_authenticated_user_can_save_and_retrieve_consented_progress(): void
    {
        $user = User::factory()->create(['password' => 'pilot-password']);
        $token = auth('api')->login($user);

        // Initially no progress saved
        $this->withToken($token)
            ->getJson('/api/learning-tracks/first-web-page/progress')
            ->assertOk()
            ->assertJson([
                'track_slug' => 'first-web-page',
                'consent_given' => false,
                'completed_lessons' => [],
                'capstone_completed' => false,
            ]);

        // Save lesson completion with consent
        $saveResponse = $this->withToken($token)
            ->postJson('/api/learning-tracks/first-web-page/progress', [
                'consent_given' => true,
                'completed_lessons' => [1, 2],
                'capstone_completed' => false,
            ]);

        $saveResponse->assertOk()
            ->assertJsonPath('progress.consent_given', true)
            ->assertJsonPath('progress.completed_lessons', [1, 2])
            ->assertJsonPath('progress.capstone_completed', false);

        // Retrieve saved progress
        $this->withToken($token)
            ->getJson('/api/learning-tracks/first-web-page/progress')
            ->assertOk()
            ->assertJson([
                'track_slug' => 'first-web-page',
                'consent_given' => true,
                'completed_lessons' => [1, 2],
                'capstone_completed' => false,
            ]);

        // Update with full lessons and capstone submission
        $capstoneResponse = $this->withToken($token)
            ->postJson('/api/learning-tracks/first-web-page/progress', [
                'consent_given' => true,
                'completed_lessons' => [1, 2, 3, 4],
                'capstone_completed' => true,
                'capstone_notes' => 'Profil selesai diuji di 375px dan 1280px.',
            ]);

        $capstoneResponse->assertOk()
            ->assertJsonPath('progress.completed_lessons', [1, 2, 3, 4])
            ->assertJsonPath('progress.capstone_completed', true)
            ->assertJsonPath('progress.capstone_notes', 'Profil selesai diuji di 375px dan 1280px.');
    }

    public function test_user_can_revoke_consent_and_delete_stored_progress(): void
    {
        $user = User::factory()->create(['password' => 'pilot-password']);
        $token = auth('api')->login($user);

        $this->withToken($token)
            ->postJson('/api/learning-tracks/first-web-page/progress', [
                'consent_given' => true,
                'completed_lessons' => [1, 2, 3, 4],
                'capstone_completed' => true,
            ])
            ->assertOk();

        // Delete progress and revoke consent
        $this->withToken($token)
            ->deleteJson('/api/learning-tracks/first-web-page/progress')
            ->assertOk()
            ->assertJson([
                'message' => 'Persetujuan dicabut dan data progres pembelajaran telah dihapus.',
            ]);

        // Fetching again shows empty / unconsented state
        $this->withToken($token)
            ->getJson('/api/learning-tracks/first-web-page/progress')
            ->assertOk()
            ->assertJson([
                'consent_given' => false,
                'completed_lessons' => [],
                'capstone_completed' => false,
            ]);
    }
}
