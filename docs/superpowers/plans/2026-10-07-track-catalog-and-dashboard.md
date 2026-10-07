# Learning Track Catalog & Learner Dashboard Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a discoverable public Learning Track Catalog (`/tracks`) and an authenticated Learner Dashboard (`/dashboard`) with progress aggregation and consent management in `belajar`.

**Architecture:** Server-driven Inertia.js 2 props rendered through Laravel 12 controllers (`TrackCatalogController` and `DashboardController`), consuming `LearningTrackProgress` models and rendering React 19 / Tailwind CSS views (`Tracks/Index.tsx` and `Dashboard.tsx`).

**Tech Stack:** Laravel 12 (PHP 8.3), Inertia.js 2, React 19, Tailwind CSS 4, TypeScript, PHPUnit/ParaTest.

**Spec:** `docs/superpowers/specs/2026-10-07-track-catalog-and-dashboard-design.md`

## Global Constraints
- Target release: `v0.0.11` in `package.json`.
- All routes must be clean and idiomatic Inertia.js responses.
- `/tracks` must remain 100% accessible to unauthenticated guests without collecting personal data.
- `/dashboard` must be strictly gated behind Laravel's `auth` middleware, redirecting unauthenticated guests to `/login`.
- Fortify's `'home'` path must redirect authenticated users to `/dashboard`.
- All TypeScript files must compile cleanly with `tsc && vite build`.
- All automated tests must pass under `php artisan test`.

## Review Focus
1. Guest visits `/tracks`: Must render without error, showing `first-web-page` as published and upcoming tracks as disabled.
2. Guest attempts to visit `/dashboard`: Must be redirected to `/login` with HTTP 302.
3. Authenticated learner with no progress visits `/dashboard`: Stats show `0` tracks started, `0` lessons completed, and prompt to browse the catalog.
4. Authenticated learner with saved progress visits `/dashboard`: Stats accurately reflect lessons count, visual progress bar displays percentage, and direct resume link points to `/learn/first-web-page`.
5. Learner revokes consent from Dashboard: Triggers progress deletion and updates Dashboard state to unconsented.

---

### Task 1: Track Catalog Service & Controller (Backend TDD)

**Files:**
- Create: `app/Services/TrackCatalogService.php`
- Create: `app/Http/Controllers/TrackCatalogController.php`
- Create: `tests/Feature/TrackCatalogTest.php`
- Modify: `routes/web.php`

**Interfaces:**
- Consumes: `App\Models\LearningTrackProgress`, `Illuminate\Support\Facades\Auth`
- Produces: `TrackCatalogService::getTracks(?User $user = null): array`, `TrackCatalogController::index(Request $request): Inertia\Response`

- [ ] **Step 1: Write the failing test**

Create `tests/Feature/TrackCatalogTest.php` testing:
1. `test_track_catalog_is_accessible_to_guests`: GET `/tracks` returns status 200, renders `Tracks/Index`.
2. `test_track_catalog_contains_published_and_upcoming_tracks`: Inertia prop `tracks` contains 3 tracks (`first-web-page` published, `javascript-logic-dom` coming soon, `git-github-fundamentals` coming soon).
3. `test_track_catalog_reflects_user_progress_when_authenticated`: Logged-in user with `first-web-page` progress sees their progress attached to the track prop.

- [ ] **Step 2: Run test to verify it fails**

Run: `php artisan test --filter=TrackCatalogTest`  
Expected: FAIL (Route `/tracks` not found, 404).

- [ ] **Step 3: Implement `TrackCatalogService` and `TrackCatalogController`**

1. Create `app/Services/TrackCatalogService.php` with static track registry and helper `getTracks(?User $user = null): array`.
2. Create `app/Http/Controllers/TrackCatalogController.php` rendering `Inertia::render('Tracks/Index', ['tracks' => TrackCatalogService::getTracks($request->user())])`.
3. Add `Route::get('/tracks', [TrackCatalogController::class, 'index'])->name('tracks.index');` to `routes/web.php`.

- [ ] **Step 4: Run test to verify it passes**

Run: `php artisan test --filter=TrackCatalogTest`  
Expected: PASS (all 3 tests pass).

- [ ] **Step 5: Commit**

```bash
git add app/Services/TrackCatalogService.php app/Http/Controllers/TrackCatalogController.php tests/Feature/TrackCatalogTest.php routes/web.php
git commit -m "feat: add track catalog backend service, controller, and feature tests"
```

---

### Task 2: Learner Dashboard Controller & Auth Redirection (Backend TDD)

**Files:**
- Create: `app/Http/Controllers/DashboardController.php`
- Create: `tests/Feature/DashboardTest.php`
- Modify: `routes/web.php`
- Modify: `config/fortify.php`

**Interfaces:**
- Consumes: `App\Models\LearningTrackProgress`, `App\Services\TrackCatalogService`
- Produces: `DashboardController::index(Request $request): Inertia\Response`

- [ ] **Step 1: Write the failing test**

Create `tests/Feature/DashboardTest.php` testing:
1. `test_unauthenticated_user_cannot_access_dashboard`: GET `/dashboard` redirects to `/login`.
2. `test_authenticated_user_can_access_dashboard`: GET `/dashboard` returns status 200, renders `Dashboard`.
3. `test_dashboard_aggregates_correct_learning_stats`: Seed user with progress on `first-web-page` (completed lessons `[1, 2]`, `capstone_completed` true); verify Inertia props `stats` (`tracks_started` = 1, `lessons_completed` = 2, `capstones_completed` = 1) and `active_tracks` has 1 item with 50% percentage.
4. `test_authenticated_user_is_redirected_to_dashboard_after_login`: POST `/login` redirects to `/dashboard`.

- [ ] **Step 2: Run test to verify it fails**

Run: `php artisan test --filter=DashboardTest`  
Expected: FAIL (Route `/dashboard` not found, 404).

- [ ] **Step 3: Implement `DashboardController` and update Fortify redirect**

1. Create `app/Http/Controllers/DashboardController.php`:
   - Enforce authentication.
   - Fetch user's `LearningTrackProgress` records.
   - Calculate summary stats (`tracks_started`, `lessons_completed`, `capstones_completed`).
   - Map active track cards with progress percentages and direct resume links.
   - Render `Inertia::render('Dashboard', compact('stats', 'active_tracks', 'available_tracks'))`.
2. Register `Route::middleware('auth')->get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');` in `routes/web.php`.
3. Update `config/fortify.php` `'home' => '/dashboard'`.

- [ ] **Step 4: Run test to verify it passes**

Run: `php artisan test --filter=DashboardTest`  
Expected: PASS (all 4 tests pass).

- [ ] **Step 5: Commit**

```bash
git add app/Http/Controllers/DashboardController.php tests/Feature/DashboardTest.php routes/web.php config/fortify.php
git commit -m "feat: add learner dashboard controller and configure fortify home redirect"
```

---

### Task 3: Global Reusable Navigation Component

**Files:**
- Create: `resources/js/components/Navbar.tsx`
- Modify: `resources/js/layouts/Layout.tsx`
- Modify: `resources/js/pages/Home.tsx`

**Interfaces:**
- Consumes: `@inertiajs/react` (`Link`, `usePage`), `resources/js/components/ui/button`
- Produces: `<Navbar />` component supporting guest state, authenticated learner state, and responsive mobile menu.

- [ ] **Step 1: Create `Navbar.tsx`**

Implement `resources/js/components/Navbar.tsx`:
- Logo and brand linking to `/`.
- Nav links: "Home" (`/`), "Katalog Kursus" (`/tracks`).
- Authenticated state: shows "Dashboard" (`/dashboard`), User Name / Email badge, and "Keluar" button submitting POST `/logout`.
- Guest state: shows "Sign In" (`/login`) and "Get Started" (`/register`).
- Portal link to `https://programinglive.com`.

- [ ] **Step 2: Integrate `Navbar` into `Layout.tsx` and `Home.tsx`**

1. Update `resources/js/layouts/Layout.tsx` to include `<Navbar />` in the layout shell.
2. Update `resources/js/pages/Home.tsx` to use the unified Navbar and include a direct link to the new Catalog (`/tracks`).

- [ ] **Step 3: Verify TypeScript compilation**

Run: `npm run build`  
Expected: Compiles successfully without TypeScript errors.

- [ ] **Step 4: Commit**

```bash
git add resources/js/components/Navbar.tsx resources/js/layouts/Layout.tsx resources/js/pages/Home.tsx
git commit -m "feat: create unified responsive navigation bar with auth-aware links"
```

---

### Task 4: Public Learning Track Catalog View

**Files:**
- Create: `resources/js/pages/Tracks/Index.tsx`

**Interfaces:**
- Consumes: `resources/js/layouts/Layout.tsx`, `resources/js/components/ui/button`, `resources/js/components/ui/badge`
- Props: `tracks: Array<Track>`

- [ ] **Step 1: Implement `Tracks/Index.tsx`**

Create `resources/js/pages/Tracks/Index.tsx`:
- Header banner: "Katalog Kursus & Jalur Belajar", explaining zero-cost, open access model.
- Filter chips: "Semua", "Pemula", "Tersedia Sekarang".
- Grid of course cards:
  - Title, description, duration, lesson count, and capstone status.
  - Difficulty badge ("Pemula").
  - Status badge: "Tersedia" (emerald green) vs "Segera Hadir" (slate gray).
  - List of module titles preview.
  - Progress badge if user has started the track (e.g. "3/4 Selesai").
  - Action buttons: "Mulai Belajar" / "Lanjutkan Belajar" for published tracks; "Segera Hadir" for upcoming tracks.

- [ ] **Step 2: Verify TypeScript and Asset Build**

Run: `npm run build`  
Expected: Compiles `Tracks/Index` bundle cleanly.

- [ ] **Step 3: Commit**

```bash
git add resources/js/pages/Tracks/Index.tsx
git commit -m "feat: implement public track catalog page with course cards and status badges"
```

---

### Task 5: Authenticated Learner Dashboard View

**Files:**
- Create: `resources/js/pages/Dashboard.tsx`

**Interfaces:**
- Consumes: `resources/js/layouts/Layout.tsx`, `resources/js/components/ui/button`, `resources/js/components/ui/card`
- Props: `stats: { tracks_started: number, lessons_completed: number, capstones_completed: number }`, `active_tracks: Array<EnrolledTrack>`, `available_tracks: Array<CatalogTrack>`

- [ ] **Step 1: Implement `Dashboard.tsx`**

Create `resources/js/pages/Dashboard.tsx`:
- Personalized greeting header with user name and motivational message.
- 3 Metric Cards:
  1. 📚 Track Aktif (`stats.tracks_started`)
  2. ✅ Modul Selesai (`stats.lessons_completed`)
  3. 🏆 Capstone Selesai (`stats.capstones_completed`)
- Active Tracks section:
  - Card with progress bar (percentage), completed lessons badges (1, 2, 3, 4).
  - Capstone status badge (Belum / Selesai).
  - Big prominent "Lanjutkan Belajar" button linking directly to `/learn/first-web-page`.
- Unenrolled/Catalog recommendations section pointing to other tracks.
- Privacy & Consent Governance card:
  - Clear statement of what data is collected.
  - "Cabut Persetujuan & Hapus Progres" button with confirmation prompt, invoking DELETE `/api/learning-tracks/{track}/progress`.

- [ ] **Step 2: Verify TypeScript and Asset Build**

Run: `npm run build`  
Expected: Compiles `Dashboard` bundle cleanly.

- [ ] **Step 3: Commit**

```bash
git add resources/js/pages/Dashboard.tsx
git commit -m "feat: implement learner dashboard view with metrics, resume actions, and privacy controls"
```

---

### Task 6: Full Verification & Test Suite Execution

**Files:**
- Modify: `tests/Feature/LandingPageTest.php`
- Modify: `package.json` (bump to `v0.0.11` via standard release when complete)

- [ ] **Step 1: Update LandingPageTest for new catalog routes**

Verify `/tracks` is added to regression tests in `LandingPageTest.php`.

- [ ] **Step 2: Run Full PHP Feature & Unit Test Suite**

Run: `php artisan test`  
Expected: All tests pass (0 failures).

- [ ] **Step 3: Run Full Asset Production Build**

Run: `npm run build`  
Expected: Exit code 0, manifests generated, zero TypeScript errors.

- [ ] **Step 4: Commit and tag release**

```bash
git add tests/Feature/LandingPageTest.php
git commit -m "test: add catalog regression test to LandingPageTest"
```
