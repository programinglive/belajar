# Learning Track Catalog and Learner Dashboard Specification

**Status:** Draft / Pending Plan Review  
**Date:** 2026-10-07  
**Repository:** `D:\code\belajar`  
**Target Release:** v0.0.11  

---

## 1. Goal & Context

Belajar is the accessible, open-source social learning platform in the ProgramingLive ecosystem. In v0.0.10, the platform published its first free beginner learning track at `/learn/first-web-page` with opt-in, consented progress tracking via the REST API (`/api/learning-tracks/{track}/progress`).

This specification defines the architectural design for two dedicated, interconnected destinations:
1. **Public Learning Track Catalog (`/tracks`):** A discoverable, un-gated directory of all learning tracks (published and upcoming), complete with difficulty ratings, lesson breakdowns, starter resources, and direct entry points.
2. **Authenticated Learner Dashboard (`/dashboard`):** A personalized hub for registered learners displaying aggregated progression metrics (active tracks, completed lessons, capstone status), resume-learning action cards, and self-service privacy/consent management.

---

## 2. Audience & User Journeys

### 2.1 Guest Learner (Unauthenticated)
- Visits `/tracks` without needing an account.
- Browses available tracks and views curriculum outlines (lessons, lab expectations, starter files).
- Clicks "Mulai Belajar" to launch `/learn/first-web-page` immediately.
- Guest learners retain full ability to track progress locally in browser localStorage without data collection.

### 2.2 Registered Learner (Authenticated)
- Signs in via `/login` and is redirected automatically to `/dashboard`.
- Views a personalized summary banner with their name and learning metrics.
- Sees active tracks with visual progress bars (e.g. 3 of 4 lessons completed).
- Clicks a direct "Lanjutkan Belajar" button that takes them directly to the track.
- Inspects their privacy status and can revoke consent or clear progress records at will.
- Visits `/tracks` to discover other tracks and see their enrolled/in-progress status marked inline.

---

## 3. System Architecture & Component Design

```
+------------------------------------------------------------------------+
|                              Web Browser                               |
+-----------------------------------+------------------------------------+
                                    |
          +-------------------------+-------------------------+
          |                                                   |
    GET /tracks                                         GET /dashboard
(Guest or Authenticated)                               (auth middleware)
          |                                                   |
          v                                                   v
+-----------------------+                           +--------------------+
| TrackCatalogController|                           | DashboardController|
+-----------+-----------+                           +---------+----------+
            |                                                 |
            | Reads Track Registry                            | Fetches User +
            | (and user progress if auth)                     | LearningTrackProgress
            v                                                 v
+---------------------------+                       +--------------------+
| Inertia: 'Tracks/Index'   |                       | Inertia:           |
| (Katalog Kartu & Filter)  |                       | 'Dashboard'        |
+---------------------------+                       +--------------------+
```

### 3.1 Routing Contracts (`routes/web.php`)
- `GET /tracks` (`tracks.index`): Serviced by `App\Http\Controllers\TrackCatalogController@index`.
- `GET /dashboard` (`dashboard`): Protected by `middleware('auth')`. Serviced by `App\Http\Controllers\DashboardController@index`.
- Fortify redirect configuration (`config/fortify.php`): `'home' => '/dashboard'`. Authenticated users navigating to `/login` or logging in are redirected to `/dashboard`.

### 3.2 Track Catalog Data Definition
Track catalog metadata is centralized in a dedicated service or controller catalog registry (`App\Services\TrackCatalogService` or static catalog within `TrackCatalogController`):
- `first-web-page` (Status: `published`):
  - Title: "Build a simple personal webpage" (Membangun Halaman Web Pribadi)
  - Level: "Pemula" (Beginner)
  - Duration: "60-90 menit"
  - Lessons: 4 lessons (Struktur HTML, Konten Bermakna, Gaya CSS Responsif, Tinjau & Perbaiki)
  - Capstone: Yes ("Personal Portfolio Landing Page")
  - Route: `/learn/first-web-page`
- `javascript-logic-dom` (Status: `coming_soon`):
  - Title: "Dasar Logika JavaScript & DOM"
  - Level: "Pemula" (Beginner)
  - Duration: "90-120 menit"
  - Lessons: 5 lessons (Variabel & Tipe Data, Logika Kondisional, Interaksi Tombol, Manipulasi DOM, Capstone Interaktif)
  - Capstone: Yes ("Aplikasi Kalkulator Sederhana")
  - Route: null (Coming soon indicator)
- `git-github-fundamentals` (Status: `coming_soon`):
  - Title: "Dasar Git & Kolaborasi GitHub"
  - Level: "Pemula" (Beginner)
  - Duration: "45-60 menit"
  - Lessons: 4 lessons (Instalasi & Konfigurasi, Commit & Riwayat, Branching Dasar, Pull Request Pertama)
  - Capstone: Yes ("Repository Pertama Anda")
  - Route: null (Coming soon indicator)

### 3.3 Dashboard Controller Contract
When `GET /dashboard` is requested by an authenticated user:
1. Queries `LearningTrackProgress` for `user_id = auth()->id()`.
2. Computes summary metrics:
   - `total_tracks_started`: Count of tracks where `count(completed_lessons) > 0` or `capstone_completed = true`.
   - `total_lessons_completed`: Sum of unique completed lesson indices across all tracks.
   - `total_capstones_completed`: Count of tracks where `capstone_completed = true`.
3. Maps enrolled tracks with detailed progression:
   - `track_slug`: e.g. `'first-web-page'`
   - `title`: Track title
   - `completed_lessons_count`: integer
   - `total_lessons`: integer (4 for `first-web-page`)
   - `percentage`: integer `(completed_lessons_count / total_lessons) * 100`
   - `capstone_completed`: boolean
   - `consent_given`: boolean
   - `consent_given_at`: ISO timestamp string or null
   - `resume_url`: direct link to `/learn/{track_slug}`
4. Renders Inertia page `'Dashboard'` passing:
   - `user`: `{ id, name, email }`
   - `stats`: `{ tracks_started, lessons_completed, capstones_completed }`
   - `active_tracks`: array of track progression objects
   - `available_tracks`: summary list of other unstarted catalog tracks

---

## 4. Frontend Component Architecture

### 4.1 Reusable Navigation (`resources/js/components/Navbar.tsx`)
Create a shared, modern navigation component used across `Home`, `Tracks/Index`, `Dashboard`, and learning track pages:
- Logo and branding linked to `/`.
- Public links:
  - "Home" (`/`)
  - "Katalog Kursus" (`/tracks`)
  - External link: "Portal ProgramingLive" (`https://programinglive.com`)
- Auth condition:
  - If guest: "Masuk" (`/login`), "Daftar" (`/register`).
  - If authenticated: "Dashboard" (`/dashboard`), User Name chip, "Keluar" (POST `/logout`).

### 4.2 Track Catalog View (`resources/js/pages/Tracks/Index.tsx`)
- Hero header: "Katalog Kursus & Jalur Belajar" with clear mission statement (100% gratis, tanpa paywall).
- Track card grid:
  - Status badge (Aktif vs Segera Hadir).
  - Difficulty badge (Pemula).
  - Lesson list previews.
  - Progress indicator if user is logged in and has started the track.
  - Action button:
    - If published & not started: "Mulai Belajar"
    - If published & in progress: "Lanjutkan Belajar"
    - If coming soon: "Segera Hadir" (disabled state with informative tooltip/text)

### 4.3 Learner Dashboard View (`resources/js/pages/Dashboard.tsx`)
- Header banner greeting learner by name.
- Metric cards:
  - 3-card summary grid (Track Diikuti, Modul Selesai, Capstone Selesai).
- "Lanjutkan Belajar" active section:
  - Highlighted card for in-progress tracks.
  - Visual progress bar.
  - Capstone submission status badge.
  - Direct resume button.
- "Jelajahi Track Lain" section:
  - Cards pointing to unstarted or upcoming tracks.
- "Pengaturan Privasi & Persetujuan Data" card:
  - Displays whether data collection consent is active.
  - Explanation: Data is only used to preserve your learning progress and is never sold or shared.
  - Action button: "Hapus Riwayat Progres & Cabut Persetujuan" with confirmation modal triggering DELETE `/learning-tracks/{track}/progress`.

---

## 5. Security, Privacy & Consent Governance

1. **Authentication Gate:** `/dashboard` is strictly gated behind Laravel `auth` middleware. Guests attempting to access `/dashboard` are redirected to `/login`.
2. **Data Ownership:** Learners can only see and mutate their own `LearningTrackProgress` records. All queries strictly scope by `user_id = auth()->id()`.
3. **Revocation / Deletion:** Learners have one-click access to delete their stored progress and revoke consent at any time.

---

## 6. Verification & Testing Strategy (TDD)

Following strict Test-Driven Development (Red-Green-Refactor):
1. **Feature Tests (`tests/Feature/TrackCatalogTest.php`):**
   - `test_track_catalog_is_accessible_to_guests`: Checks GET `/tracks` returns HTTP 200 and renders `Tracks/Index`.
   - `test_track_catalog_displays_published_and_upcoming_tracks`: Checks catalog props contain `first-web-page`, `javascript-logic-dom`, and `git-github-fundamentals`.
   - `test_track_catalog_includes_user_progress_when_authenticated`: Checks props reflect completed lessons for logged-in user.
2. **Feature Tests (`tests/Feature/DashboardTest.php`):**
   - `test_unauthenticated_user_cannot_access_dashboard`: Checks GET `/dashboard` redirects to `/login`.
   - `test_authenticated_user_can_access_dashboard`: Checks GET `/dashboard` returns HTTP 200 and renders `Dashboard`.
   - `test_dashboard_calculates_correct_learning_stats`: Seed user with progress on `first-web-page` (e.g. 2 lessons, capstone true); verify props reflect `lessons_completed = 2`, `capstones_completed = 1`.
   - `test_user_is_redirected_to_dashboard_after_login`: Post credentials to `/login`, verify redirect to `/dashboard`.
3. **Build & Typecheck Verification:**
   - Execute `npm run build` (`tsc && vite build`) to confirm zero TypeScript and asset bundling errors.
   - Execute `vendor/bin/paratest` / `php artisan test` to confirm all 17+ tests pass with zero failures.
