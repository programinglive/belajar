# Track 2: Dasar Logika JavaScript & DOM Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and publish the complete Track 2 learning experience (`/learn/javascript-logic-dom`) with 5 interactive modules, downloadable starter files, working calculator example, capstone checklist, and catalog integration.

**Architecture:** Inertia.js 2 course page rendered via Laravel 12 (`Courses/JavascriptLogicDom.tsx`), static starter files in `public/learn/javascript-logic/`, JSON manifest at `/api/learning-tracks/javascript-logic-dom`, and published catalog status in `TrackCatalogService`.

**Tech Stack:** Laravel 12 (PHP 8.3), Inertia.js 2, React 19, Tailwind CSS 4, Vanilla JavaScript (ES6+), PHPUnit/ParaTest.

**Spec:** `docs/superpowers/specs/2026-10-07-javascript-logic-dom-track-design.md`

## Global Constraints
- Target release: `v0.0.12` in `package.json`.
- Track slug: `javascript-logic-dom`.
- Route: `/learn/javascript-logic-dom`.
- Free to read and use without requiring an account.
- Guests retain marks in browser `localStorage`.
- Authenticated learners can sync progress via `/api/learning-tracks/javascript-logic-dom/progress`.
- All tests must pass under `php artisan test`.
- All TypeScript files must compile cleanly under `npm run build`.

## Review Focus
1. Guest visits `/learn/javascript-logic-dom`: Renders without error, displaying 5 modules, lab instructions, and downloadable resources.
2. Direct starter file access: All 6 files in `public/learn/javascript-logic/` are accessible via HTTP.
3. API manifest: GET `/api/learning-tracks/javascript-logic-dom` returns valid JSON with 5 lessons and starter links.
4. Track catalog update: GET `/tracks` shows `javascript-logic-dom` as `published` with link to `/learn/javascript-logic-dom`.
5. Capstone checklist persistence: Toggling capstone checkboxes saves to localStorage and syncs with backend when consented.

---

### Task 1: Starter Files & Example Project Assets

**Files:**
- Create: `public/learn/javascript-logic/starter/index.html`
- Create: `public/learn/javascript-logic/starter/styles.css`
- Create: `public/learn/javascript-logic/starter/app.js`
- Create: `public/learn/javascript-logic/example/index.html`
- Create: `public/learn/javascript-logic/example/styles.css`
- Create: `public/learn/javascript-logic/example/app.js`

- [ ] **Step 1: Create Starter Files**
Create `public/learn/javascript-logic/starter/` files with clear scaffolding and guided TODO comments for learners.

- [ ] **Step 2: Create Working Example Files**
Create `public/learn/javascript-logic/example/` files containing the completed, functional calculator application with clean DOM operations and division-by-zero validation.

- [ ] **Step 3: Commit**
```bash
git add public/learn/javascript-logic/
git commit -m "feat: add starter files and working example for javascript logic track"
```

---

### Task 2: Web Routes, Manifest API & Track Catalog Service Integration (Backend TDD)

**Files:**
- Create: `tests/Feature/JavaScriptTrackTest.php`
- Modify: `routes/web.php`
- Modify: `routes/api.php`
- Modify: `app/Services/TrackCatalogService.php`

- [ ] **Step 1: Write the failing test**
Create `tests/Feature/JavaScriptTrackTest.php` testing:
1. `test_javascript_track_is_accessible_without_an_account`: GET `/learn/javascript-logic-dom` returns 200, renders `Courses/JavascriptLogicDom`.
2. `test_javascript_track_starter_files_are_published`: asserts all 6 starter/example files exist in `public_path()`.
3. `test_javascript_track_manifest_api_returns_course_details`: GET `/api/learning-tracks/javascript-logic-dom` returns 200, status `published`, 5 lessons, and resources.
4. `test_track_catalog_marks_javascript_track_as_published`: GET `/tracks` confirms `tracks.1.status` is `published` and `tracks.1.route` is `/learn/javascript-logic-dom`.

- [ ] **Step 2: Run test to verify it fails**
Run: `php artisan test --filter=JavaScriptTrackTest`  
Expected: FAIL (routes not found).

- [ ] **Step 3: Implement Backend Routes and Update Catalog Service**
1. Register route `/learn/javascript-logic-dom` in `routes/web.php`.
2. Register `/api/learning-tracks/javascript-logic-dom` in `routes/api.php`.
3. Update `TrackCatalogService.php` to set `javascript-logic-dom` status to `published` and `route` to `/learn/javascript-logic-dom`.

- [ ] **Step 4: Run test to verify it passes**
Run: `php artisan test --filter=JavaScriptTrackTest`  
Expected: PASS (all tests pass).

- [ ] **Step 5: Commit**
```bash
git add tests/Feature/JavaScriptTrackTest.php routes/web.php routes/api.php app/Services/TrackCatalogService.php
git commit -m "feat: add javascript track routes, manifest api, and update catalog status"
```

---

### Task 3: Interactive Course View (`resources/js/pages/Courses/JavascriptLogicDom.tsx`)

**Files:**
- Create: `resources/js/pages/Courses/JavascriptLogicDom.tsx`

- [ ] **Step 1: Implement `JavascriptLogicDom.tsx`**
Build the complete 5-lesson curriculum view:
- Lesson tabs / accordions (Modul 1: Menghubungkan JS & Variabel, Modul 2: Percabangan & Logika, Modul 3: Fungsi Aritmatika, Modul 4: Manipulasi DOM, Modul 5: Merakit Kalkulator).
- Interactive Capstone Checklist with browser `localStorage` fallback and opt-in API sync to `/api/learning-tracks/javascript-logic-dom/progress`.
- Downloadable starter files and "Lihat Contoh Selesai" preview modal/frame.
- Clean responsive layout using `<Navbar />` and `<Layout />`.

- [ ] **Step 2: Verify Asset Build**
Run: `npm run build`  
Expected: Exit code 0, TypeScript compiles cleanly.

- [ ] **Step 3: Commit**
```bash
git add resources/js/pages/Courses/JavascriptLogicDom.tsx
git commit -m "feat: implement javascript logic and dom interactive course view"
```

---

### Task 4: Full Verification, Test Suite & Release

**Files:**
- Modify: `tests/Feature/TrackCatalogTest.php`
- Modify: `package.json`

- [ ] **Step 1: Run Full Test Suite**
Run: `php artisan test`  
Expected: 22+ tests pass with 0 failures.

- [ ] **Step 2: Run Asset Production Build**
Run: `npm run build`  
Expected: Exit code 0, clean manifest.

- [ ] **Step 3: Bump Release to v0.0.12 and Push to Origin**
Run: `npm run release`  
Push branch master and tag `v0.0.12` to `origin`.
