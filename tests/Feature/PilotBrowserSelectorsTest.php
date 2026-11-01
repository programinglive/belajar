<?php

namespace Tests\Feature;

use FilesystemIterator;
use RecursiveDirectoryIterator;
use RecursiveIteratorIterator;
use Tests\TestCase;

/**
 * Pilot produksi mencari elemen lewat data-testid. Kalau atribut itu diganti
 * nama atau dihapus dari komponen, pilot baru ketahuan gagal pada jadwal
 * berikutnya di produksi - terlambat dan berisik. Berkas ini menutup celah itu
 * di suite biasa: setiap test id yang dipakai skrip pilot harus ada di sumber
 * React.
 *
 * Insiden yang mendasari: antara 7 dan 31 Oktober 2026 pilot mencari teks
 * Inggris ("Start the Free Track", "Sign in") yang hilang saat antarmuka
 * di-rebrand ke bahasa Indonesia, sehingga pilot gagal setiap hari walau
 * produksi sehat.
 */
class PilotBrowserSelectorsTest extends TestCase
{
    private const SMOKE_SCRIPT = 'scripts/pilot-browser-smoke.cjs';

    public function test_pilot_journey_uses_data_test_id_selectors(): void
    {
        $script = file_get_contents(base_path(self::SMOKE_SCRIPT));

        $this->assertStringNotContainsString('getByRole(', $script);
        $this->assertStringNotContainsString('getByLabel(', $script);
        $this->assertStringContainsString('getByTestId(', $script);
    }

    public function test_pilot_does_not_assume_the_url_after_sign_in(): void
    {
        // Produksi mengarahkan ke /dashboard, bukan /. Menunggu URL tertentu
        // membuat pilot gagal padahal login berhasil; yang penting dashboard
        // tampil, dan itu diperiksa lewat data-testid.
        $script = file_get_contents(base_path(self::SMOKE_SCRIPT));

        $this->assertStringNotContainsString('waitForURL', $script);
        $this->assertStringContainsString("getByTestId('dashboard-heading')", $script);
    }

    public function test_every_pilot_test_id_exists_in_the_react_source(): void
    {
        $available = $this->testIdsInSource();
        $used = $this->testIdsInPilotScript();

        $this->assertNotEmpty($used, 'Skrip pilot tidak memakai satu pun data-testid.');
        $this->assertSame([], $this->missingIds($used, $available), 'Ada test id pilot yang tidak ditemukan di resources/js.');
    }

    public function test_the_check_actually_reports_a_missing_id(): void
    {
        $available = $this->testIdsInSource();
        $used = array_merge($this->testIdsInPilotScript(), ['id-yang-tidak-ada']);

        $this->assertSame(['id-yang-tidak-ada'], $this->missingIds($used, $available));
    }

    private function missingIds(array $used, array $available): array
    {
        return array_values(array_diff($used, $available));
    }

    /**
     * Test id di sumber React, dengan ekspresi template dinormalkan.
     *
     * data-testid={`lesson-${lesson.number}`} menjadi "lesson-${}", sehingga
     * cocok dengan getByTestId(`lesson-${number}`) di skrip pilot sementara
     * awalan statisnya tetap harus sama.
     */
    private function testIdsInSource(): array
    {
        $ids = [];
        $directory = base_path('resources/js');
        $files = new RecursiveIteratorIterator(
            new RecursiveDirectoryIterator($directory, FilesystemIterator::SKIP_DOTS)
        );

        foreach ($files as $file) {
            if (! $file->isFile() || ! preg_match('/\.(tsx?|jsx?)$/', $file->getFilename())) {
                continue;
            }

            $text = file_get_contents($file->getPathname());

            if (preg_match_all('/data-testid=(?:"([^"]+)"|\{`([^`]+)`\})/', $text, $matches, PREG_SET_ORDER)) {
                foreach ($matches as $match) {
                    $value = $match[2] ?? $match[1];
                    $ids[] = $this->normalize($value);
                }
            }
        }

        return array_values(array_unique($ids));
    }

    private function testIdsInPilotScript(): array
    {
        $script = file_get_contents(base_path(self::SMOKE_SCRIPT));
        $used = [];

        if (preg_match_all('/getByTestId\((?:' . "'" . '([^' . "'" . ']+)' . "'" . '|`([^`]+)`)\)/', $script, $matches, PREG_SET_ORDER)) {
            foreach ($matches as $match) {
                $used[] = $this->normalize($match[2] ?? $match[1]);
            }
        }

        return array_values(array_unique($used));
    }

    private function normalize(string $value): string
    {
        return trim(preg_replace('/\$\{[^}]*\}/', '${}', $value));
    }
}