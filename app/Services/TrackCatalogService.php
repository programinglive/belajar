<?php

namespace App\Services;

use App\Models\LearningTrackProgress;
use App\Models\User;

class TrackCatalogService
{
    /**
     * Get the defined learning tracks catalog with optional learner progress.
     *
     * @return array<int, array<string, mixed>>
     */
    public static function getTracks(?User $user = null): array
    {
        $userProgressMap = [];

        if ($user) {
            $progressRecords = LearningTrackProgress::where('user_id', $user->id)->get();
            foreach ($progressRecords as $record) {
                $completedCount = count($record->completed_lessons ?? []);
                $userProgressMap[$record->track_slug] = [
                    'consent_given' => (bool) $record->consent_given,
                    'completed_lessons' => $record->completed_lessons ?? [],
                    'completed_lessons_count' => $completedCount,
                    'capstone_completed' => (bool) $record->capstone_completed,
                    'capstone_submitted_at' => $record->capstone_submitted_at?->toIso8601String(),
                ];
            }
        }

        $definitions = [
            [
                'slug' => 'first-web-page',
                'title' => 'Build a simple personal webpage',
                'subtitle' => 'Membangun Halaman Web Pribadi',
                'description' => 'Pelajari fondasi web development modern mulai dari HTML semantik, CSS responsif, hingga menghasilkan portofolio web perdana Anda.',
                'level' => 'Pemula',
                'duration' => '60 - 90 menit',
                'lesson_count' => 4,
                'has_capstone' => true,
                'capstone_title' => 'Halaman Portofolio Pribadi',
                'status' => 'published',
                'route' => '/learn/first-web-page',
                'lessons' => [
                    ['number' => 1, 'title' => 'Buat struktur halaman'],
                    ['number' => 2, 'title' => 'Susun konten yang bermakna'],
                    ['number' => 3, 'title' => 'Beri gaya dan buat responsif'],
                    ['number' => 4, 'title' => 'Tinjau dan perbaiki'],
                ],
            ],
            [
                'slug' => 'javascript-logic-dom',
                'title' => 'Dasar Logika JavaScript & DOM',
                'subtitle' => 'Interaktivitas & Logika Pemrograman',
                'description' => 'Kuasai variabel, percabangan, fungsi, event listener tombol, dan manipulasi elemen DOM secara langsung di browser.',
                'level' => 'Pemula',
                'duration' => '90 - 120 menit',
                'lesson_count' => 5,
                'has_capstone' => true,
                'capstone_title' => 'Aplikasi Kalkulator Sederhana',
                'status' => 'published',
                'route' => '/learn/javascript-logic-dom',
                'lessons' => [
                    ['number' => 1, 'title' => 'Variabel & Tipe Data'],
                    ['number' => 2, 'title' => 'Percabangan & Logika Kondisional'],
                    ['number' => 3, 'title' => 'Fungsi & Scope'],
                    ['number' => 4, 'title' => 'Event Listener & DOM Manipulation'],
                    ['number' => 5, 'title' => 'Capstone: Mini Web App'],
                ],
            ],
            [
                'slug' => 'git-github-fundamentals',
                'title' => 'Dasar Git & Kolaborasi GitHub',
                'subtitle' => 'Version Control untuk Pengembang',
                'description' => 'Mulai perjalanan kolaborasi open-source dengan memahami commit, branch, pull request, dan alur kontribusi tim.',
                'level' => 'Pemula',
                'duration' => '45 - 60 menit',
                'lesson_count' => 4,
                'has_capstone' => true,
                'capstone_title' => 'Repository Proyek Pertama',
                'status' => 'coming_soon',
                'route' => null,
                'lessons' => [
                    ['number' => 1, 'title' => 'Instalasi & Konfigurasi Git'],
                    ['number' => 2, 'title' => 'Snapshot & Riwayat Commit'],
                    ['number' => 3, 'title' => 'Branching & Resolusi Konflik'],
                    ['number' => 4, 'title' => 'Pull Request Pertama di GitHub'],
                ],
            ],
        ];

        return array_map(function (array $track) use ($userProgressMap) {
            $slug = $track['slug'];
            $progress = $userProgressMap[$slug] ?? null;

            if ($progress) {
                $percentage = $track['lesson_count'] > 0
                    ? (int) round(($progress['completed_lessons_count'] / $track['lesson_count']) * 100)
                    : 0;

                $track['user_progress'] = [
                    'consent_given' => $progress['consent_given'],
                    'completed_lessons' => $progress['completed_lessons'],
                    'completed_lessons_count' => $progress['completed_lessons_count'],
                    'percentage' => min(100, $percentage),
                    'capstone_completed' => $progress['capstone_completed'],
                    'capstone_submitted_at' => $progress['capstone_submitted_at'],
                ];
            } else {
                $track['user_progress'] = null;
            }

            return $track;
        }, $definitions);
    }
}
