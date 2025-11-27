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
}
