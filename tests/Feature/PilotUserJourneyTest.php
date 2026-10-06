<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class PilotUserJourneyTest extends TestCase
{
    use RefreshDatabase;

    public function test_pilot_user_can_complete_the_current_api_journey(): void
    {
        $credentials = [
            'name' => 'Belajar Pilot',
            'email' => 'pilot@example.com',
            'password' => 'pilot-password',
            'password_confirmation' => 'pilot-password',
        ];

        $registration = $this->postJson('/api/auth/register', $credentials);
        $registration->assertCreated()->assertJsonStructure([
            'access_token',
            'token_type',
            'expires_in',
        ]);

        $registrationToken = $registration->json('access_token');
        $this->withToken($registrationToken)
            ->postJson('/api/auth/logout')
            ->assertOk()
            ->assertJson(['message' => 'Successfully logged out']);

        $login = $this->postJson('/api/auth/login', [
            'email' => $credentials['email'],
            'password' => $credentials['password'],
        ]);
        $login->assertOk()->assertJsonPath('token_type', 'bearer');

        $token = $login->json('access_token');
        $this->withToken($token)
            ->getJson('/api/auth/me')
            ->assertOk()
            ->assertJsonPath('email', $credentials['email']);

        $this->getJson('/api/learning-tracks/first-web-page')
            ->assertOk()
            ->assertJson([
                'slug' => 'first-web-page',
                'status' => 'published',
                'requires_account' => false,
                'lesson_count' => 4,
                'has_capstone' => true,
            ])
            ->assertJsonCount(4, 'lessons')
            ->assertJsonStructure([
                'resources' => ['track', 'starter_html', 'starter_css', 'completed_example', 'help'],
            ]);

        $this->withToken($token)
            ->postJson('/api/auth/logout')
            ->assertOk();

        $this->withToken($token)
            ->getJson('/api/auth/me')
            ->assertUnauthorized();
    }

    public function test_pilot_user_can_sign_in_through_the_browser_flow(): void
    {
        $user = User::factory()->create([
            'email' => 'browser-pilot@example.com',
            'password' => Hash::make('pilot-password'),
        ]);

        $this->post('/login', [
            'email' => $user->email,
            'password' => 'pilot-password',
        ])->assertRedirect('/');

        $this->assertAuthenticatedAs($user);
    }
}
