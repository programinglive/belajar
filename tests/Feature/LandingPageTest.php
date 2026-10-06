<?php

namespace Tests\Feature;

use Tests\TestCase;
use Inertia\Testing\AssertableInertia;

class LandingPageTest extends TestCase
{
    /**
     * Test that the landing page is accessible and renders the correct component.
     */
    public function test_landing_page_is_accessible(): void
    {
        $response = $this->get('/');

        $response->assertStatus(200);
        
        $response->assertInertia(fn (AssertableInertia $page) => $page
            ->component('Home')
        );
    }

    /**
     * Test that the login page is accessible.
     */
    public function test_login_page_is_accessible(): void
    {
        $response = $this->get('/login');

        $response->assertStatus(200);
        $response->assertInertia(fn (AssertableInertia $page) => $page
            ->component('Auth/Login')
        );
    }

    /**
     * Test that the register page is accessible.
     */
    public function test_register_page_is_accessible(): void
    {
        $response = $this->get('/register');

        $response->assertStatus(200);
        $response->assertInertia(fn (AssertableInertia $page) => $page
            ->component('Auth/Register')
        );
    }

    public function test_first_learning_track_is_accessible_without_an_account(): void
    {
        $response = $this->get('/learn/first-web-page');

        $response->assertStatus(200);
        $response->assertInertia(fn (AssertableInertia $page) => $page
            ->component('Courses/FirstWebPage')
        );
    }

    public function test_first_learning_track_starter_files_are_published(): void
    {
        $this->assertFileExists(public_path('learn/personal-page/starter/index.html'));
        $this->assertFileExists(public_path('learn/personal-page/starter/styles.css'));
        $this->assertFileExists(public_path('learn/personal-page/example/index.html'));
        $this->assertFileExists(public_path('learn/personal-page/example/styles.css'));
    }
}
