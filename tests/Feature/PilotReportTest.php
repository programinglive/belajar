<?php

namespace Tests\Feature;

use Tests\TestCase;

/**
 * Laporan Discord adalah pemberitahuan, bukan syarat lulus pilot. Pada 1
 * November 2026 webhook-nya sudah dihapus (HTTP 404) sementara kedua journey
 * lulus, sehingga pilot tampil merah setiap hari dan menenggelamkan sinyal yang
 * seharusnya dikirim. Berkas ini mengunci aturannya.
 */
class PilotReportTest extends TestCase
{
    private const WORKFLOW = '.github/workflows/pilot-production.yml';
    private const SCRIPT = 'scripts/post-pilot-result.cjs';

    public function test_the_discord_report_step_cannot_fail_a_healthy_pilot(): void
    {
        $workflow = file_get_contents(base_path(self::WORKFLOW));
        $start = strpos($workflow, 'Report result to Discord');

        $this->assertNotFalse($start, 'Langkah Report result to Discord tidak ditemukan di workflow pilot.');

        $step = substr($workflow, $start, 400);

        $this->assertStringContainsString(
            'continue-on-error: true',
            $step,
            'Laporan Discord harus continue-on-error agar webhook mati tidak menggagalkan pilot.'
        );
    }

    public function test_the_reporter_surfaces_a_warning_when_the_webhook_fails(): void
    {
        $script = file_get_contents(base_path(self::SCRIPT));

        $this->assertStringContainsString('::warning::', $script);
        $this->assertStringContainsString('DISCORD_PILOT_WEBHOOK_URL', $script);
    }

    public function test_only_the_enforce_step_decides_the_outcome(): void
    {
        $workflow = file_get_contents(base_path(self::WORKFLOW));

        $this->assertStringContainsString('Enforce pilot result', $workflow);
        $this->assertStringContainsString('exit 1', $workflow);
    }
}
