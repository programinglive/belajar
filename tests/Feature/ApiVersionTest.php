<?php

namespace Tests\Feature;

use Tests\TestCase;

/**
 * /api/version adalah penanda versi yang benar-benar hidup di server. Pilot
 * produksi memakainya untuk menunggu deploy selesai sebelum menguji UI, jadi
 * endpoint ini harus selalu melaporkan versi package.json yang terpasang.
 */
class ApiVersionTest extends TestCase
{
    public function test_version_endpoint_reports_the_package_version(): void
    {
        $package = json_decode(file_get_contents(base_path('package.json')), true);

        $this->getJson('/api/version')
            ->assertOk()
            ->assertJsonPath('version', $package['version']);
    }

    public function test_version_looks_like_a_semantic_version(): void
    {
        $version = $this->getJson('/api/version')->json('version');

        $this->assertMatchesRegularExpression(
            '/^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$/',
            (string) $version,
            "Versi '{$version}' tidak berbentuk semver, jadi pilot tidak bisa mencocokkannya dengan tag."
        );
    }
}
