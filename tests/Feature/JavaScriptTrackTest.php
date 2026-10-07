<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia;
use Tests\TestCase;

class JavaScriptTrackTest extends TestCase
{
    use RefreshDatabase;

    public function test_javascript_track_is_accessible_without_an_account(): void
    {
        $response = $this->get('/learn/javascript-logic-dom');

        $response->assertStatus(200);
        $response->assertInertia(fn (AssertableInertia $page) => $page
            ->component('Courses/JavascriptLogicDom')
        );
    }

    public function test_javascript_track_starter_files_are_published(): void
    {
        $this->assertFileExists(public_path('learn/javascript-logic/starter/index.html'));
        $this->assertFileExists(public_path('learn/javascript-logic/starter/styles.css'));
        $this->assertFileExists(public_path('learn/javascript-logic/starter/app.js'));
        $this->assertFileExists(public_path('learn/javascript-logic/example/index.html'));
        $this->assertFileExists(public_path('learn/javascript-logic/example/styles.css'));
        $this->assertFileExists(public_path('learn/javascript-logic/example/app.js'));
    }

    public function test_javascript_track_manifest_api_returns_course_details(): void
    {
        $response = $this->getJson('/api/learning-tracks/javascript-logic-dom');

        $response->assertStatus(200)
            ->assertJson([
                'slug' => 'javascript-logic-dom',
                'title' => 'Dasar Logika JavaScript & DOM',
                'status' => 'published',
                'requires_account' => false,
                'lesson_count' => 5,
                'has_capstone' => true,
            ])
            ->assertJsonPath('lessons.0.number', 1)
            ->assertJsonPath('lessons.4.number', 5)
            ->assertJsonStructure([
                'version',
                'slug',
                'title',
                'status',
                'requires_account',
                'lesson_count',
                'has_capstone',
                'lessons' => [
                    '*' => ['number', 'title'],
                ],
                'resources' => [
                    'track',
                    'starter_html',
                    'starter_css',
                    'starter_js',
                    'example_html',
                    'example_css',
                    'example_js',
                    'help',
                ],
            ]);
    }

    public function test_track_catalog_marks_javascript_track_as_published(): void
    {
        $response = $this->get('/tracks');

        $response->assertStatus(200);
        $response->assertInertia(fn (AssertableInertia $page) => $page
            ->component('Tracks/Index')
            ->where('tracks.1.slug', 'javascript-logic-dom')
            ->where('tracks.1.status', 'published')
            ->where('tracks.1.route', '/learn/javascript-logic-dom')
        );
    }
}
