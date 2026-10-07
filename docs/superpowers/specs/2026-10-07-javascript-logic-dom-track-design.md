# Learning Track 2: Dasar Logika JavaScript & DOM Specification

**Status:** Draft / Pending Plan Review  
**Date:** 2026-10-07  
**Repository:** `D:\code\belajar`  
**Target Release:** v0.0.12  

---

## 1. Goal & Context

Following the release of the first learning track (`/learn/first-web-page`) and the central Course Catalog (`/tracks`), this specification establishes **Track 2: Dasar Logika JavaScript & DOM** (`/learn/javascript-logic-dom`).

The objective is to introduce beginner learners who already understand basic HTML and CSS to programmatic logic, functions, browser event handling, and real-time DOM manipulation through an interactive project: **Aplikasi Kalkulator Sederhana**.

---

## 2. Audience, Prerequisites & Outcomes

- **Target Audience:** Indonesian learners transitioning from static web pages to interactive programming.
- **Prerequisites:** Completion of Track 1 (`first-web-page`) or equivalent basic HTML & CSS understanding.
- **Estimated Effort:** Five lessons (20–25 minutes each) plus a 45–60 minute Capstone challenge.
- **Measurable Outcome:** The learner builds a functional, responsive calculator web application using vanilla JavaScript (ES6+), running directly in the browser with zero external libraries, with error handling for edge cases (e.g. division by zero, non-numeric input).

---

## 3. Curriculum Sequence & Lab Breakdown

### Modul 1: Menghubungkan JavaScript & Mengenal Variabel
- **Konsep:** Memuat script (`<script src="app.js" defer>`), developer tools console, deklarasi variabel modern (`const`, `let`), tipe data primitif (`number`, `string`, `boolean`).
- **Lab 1:** Membuat `app.js`, mendeklarasikan dua variabel angka dan nama, lalu mencetak informasi tersebut ke console browser.
- **Self-Check:** Membuka Developer Tools Console (F12) dan memastikan output tercetak tanpa `Uncaught ReferenceError`.

### Modul 2: Logika Kondisional & Pengambilan Keputusan
- **Konsep:** Operator perbandingan (`===`, `!==`, `>`, `<`, `>=`, `<=`), operator logika (`&&`, `||`, `!`), struktur percabangan `if`, `else if`, `else`.
- **Lab 2:** Menulis fungsi validator untuk mengecek apakah pembagi bernilai nol (`0`) sebelum operasi pembagian dijalankan.
- **Self-Check:** Logika kondisional mengembalikan peringatan saat angka kedua bernilai 0.

### Modul 3: Fungsi (Functions) & Operasi Aritmatika
- **Konsep:** Deklarasi function, parameter, argument, kata kunci `return`, dan prinsip *Single Responsibility*.
- **Lab 3:** Mengimplementasikan 4 fungsi aritmatika murni: `tambah(a, b)`, `kurang(a, b)`, `kali(a, b)`, dan `bagi(a, b)`.
- **Self-Check:** Menjalankan pemanggilan fungsi di console dengan angka positif, negatif, dan desimal, menghasilkan kalkulasi akurat.

### Modul 4: Seleksi Elemen DOM & Event Listener
- **Konsep:** Document Object Model (DOM), `document.getElementById`, membaca input form (`input.value`), konversi tipe data (`parseFloat` / `Number`), mendengarkan interaksi user (`addEventListener('click')`), dan memperbarui teks elemen (`textContent`).
- **Lab 4:** Menghubungkan tombol operasi di UI HTML dengan listener JavaScript untuk membaca kedua input dan memperbarui teks hasil di layar.
- **Self-Check:** Mengklik tombol memicu kalkulasi real-time tanpa me-refresh halaman web.

### Modul 5 & Proyek Capstone: Merakit Aplikasi Kalkulator Sederhana
- **Tantangan Capstone:** Merangkai seluruh konsep menjadi aplikasi kalkulator web mandiri yang rapi, responsif, dan tahan error.
- **Kriteria Kelulusan (Interactive Capstone Checklist):**
  1. [ ] File `app.js` terhubung dengan benar ke `index.html` menggunakan atribut `defer`.
  2. [ ] Mendukung 4 operasi aritmatika dasar: Penjumlahan (`+`), Pengurangan (`-`), Perkalian (`×`), dan Pembagian (`÷`).
  3. [ ] Memiliki validasi input: menampilkan pesan ramah jika salah satu kolom kosong atau bukan angka.
  4. [ ] Menangani kasus khusus pembagian dengan nol secara aman (misal menampilkan *"Tidak dapat membagi dengan 0"*).
  5. [ ] Memiliki tombol *Reset / Bersihkan* yang mengosongkan kedua input dan mengembalikan tampilan hasil ke awal.
  6. [ ] Tampilan responsif dan tetap proporsional pada layar ponsel (375px) maupun desktop (1280px).

---

## 4. Starter Files & Downloadable Resources

Starter files disediakan secara publik di direktori `public/learn/javascript-logic/`:
- `starter/index.html` — Kerangka HTML bersih dengan form input angka, tombol operasi ber-ID, dan wadah hasil.
- `starter/styles.css` — Tampilan dasar kalkulator dengan kartu terpusat dan tombol kontras.
- `starter/app.js` — Template kode awal dengan komentar instruksi bertahap (`TODO: Modul 1-4`).
- `example/index.html` — Proyek capstone lengkap yang siap dicoba langsung.
- `example/styles.css` — Tampilan selesai.
- `example/app.js` — Implementasi JavaScript lengkap dengan fungsi aritmatika, event listeners, dan validasi nol.

---

## 5. Integrasi Arsitektur Web & Katalog

1. **Rute Web (`routes/web.php`):**
   - `GET /learn/javascript-logic-dom` (`learn.javascript-logic-dom`): Menampilkan Inertia page `Courses/JavascriptLogicDom`.
2. **Katalog Track (`app/Services/TrackCatalogService.php`):**
   - Ubah status track `javascript-logic-dom` dari `coming_soon` menjadi `published`.
   - Tetapkan `route => '/learn/javascript-logic-dom'`.
3. **Endpoint Manifest (`routes/api.php`):**
   - `GET /api/learning-tracks/javascript-logic-dom`: Mengembalikan manifest JSON berisi detail kurikulum, tautan starter files, dan contoh selesai.
4. **Pelacakan Progres Berizin:**
   - Memanfaatkan endpoint yang sudah ada: `/api/learning-tracks/javascript-logic-dom/progress` (GET, POST, DELETE) dengan verifikasi autentikasi & opt-in consent.
   - Mendukung penyimpanan checklist lokal di browser `localStorage` untuk pengunjung tamu (guest).

---

## 6. Strategi Pengujian (TDD)

1. **`tests/Feature/JavaScriptTrackTest.php`:**
   - Aksesibilitas rute web `/learn/javascript-logic-dom` mengembalikan HTTP 200 dan Inertia view `Courses/JavascriptLogicDom`.
   - File starter dan contoh selesai (`public/learn/javascript-logic/*`) terverifikasi ada secara fisik.
   - Endpoint manifest JSON `/api/learning-tracks/javascript-logic-dom` mengembalikan versi, slug, 5 pelajaran, dan tautan starter files.
   - `TrackCatalogService` dan rute `/tracks` mengembalikan status `published` untuk `javascript-logic-dom`.
2. **Build Verification:**
   - `npm run build` (`tsc && vite build`) menghasilkan bundle `Courses/JavascriptLogicDom` tanpa error TypeScript.
