import { Head, Link } from '@inertiajs/react';

type Lesson = {
    number: number;
    title: string;
    duration: string;
    prerequisite: string;
    outcome: string;
    steps: string[];
    lab: string;
    expected: string[];
    checks: string[];
    code?: string;
};

const semanticExample = `<main>
  <header>
    <h1>Maya Putri</h1>
    <p>Pelajar web dari Bandung.</p>
  </header>

  <section aria-labelledby="minat">
    <h2 id="minat">Minat saya</h2>
    <ul>
      <li>Desain web</li>
      <li>Fotografi</li>
    </ul>
  </section>

  <section aria-labelledby="kontak">
    <h2 id="kontak">Kontak</h2>
    <a href="mailto:maya@example.com">Kirim email kepada Maya</a>
  </section>
</main>`;

const responsiveExample = `body {
  margin: 0;
  padding: 24px;
  font-family: system-ui, sans-serif;
  line-height: 1.6;
  background: #eff6ff;
  color: #172033;
}

main {
  width: min(100%, 720px);
  margin: 0 auto;
  padding: 24px;
  border-radius: 16px;
  background: white;
}

@media (min-width: 768px) {
  body { padding: 64px; }
  main { padding: 48px; }
}`;

const lessons: Lesson[] = [
    {
        number: 1,
        title: 'Buat struktur halaman',
        duration: '20–30 menit',
        prerequisite: 'Browser, editor teks, dan folder kosong. Tidak perlu pengalaman coding.',
        outcome: 'Membuat index.html, membukanya di browser, dan mengenali title, heading, paragraf, serta link.',
        steps: [
            'Unduh starter files dan simpan keduanya di folder yang sama.',
            'Buka index.html, lalu ganti nama, perkenalan, dan alamat link.',
            'Simpan file, buka di browser, dan refresh setelah setiap perubahan.',
        ],
        lab: 'Buat profil singkat berisi nama, satu paragraf perkenalan, dan satu link yang berguna.',
        expected: ['Tab browser menampilkan judul halaman.', 'Halaman memiliki tepat satu heading utama.', 'Link dapat dibuka dan teksnya menjelaskan tujuan link.'],
        checks: ['File bernama index.html.', 'Perubahan muncul setelah refresh.', 'Link memakai https:// atau mailto:.'],
    },
    {
        number: 2,
        title: 'Susun konten yang bermakna',
        duration: '20–30 menit',
        prerequisite: 'Lesson 1 selesai dan index.html dapat dibuka tanpa error.',
        outcome: 'Menyusun konten dengan header, main, section, daftar, dan link yang mudah dipahami.',
        steps: [
            'Kelompokkan identitas, minat, dan kontak ke section yang berbeda.',
            'Tambahkan h2 untuk setiap section dan hubungkan dengan aria-labelledby.',
            'Gunakan daftar untuk minat dan teks link yang jelas tanpa konteks tambahan.',
        ],
        lab: 'Tambahkan minimal dua section, daftar berisi dua minat, dan link kontak berlabel jelas.',
        expected: ['Urutan heading adalah h1 lalu h2.', 'Tombol Tab dapat berpindah ke link.', 'Isi tetap masuk akal ketika CSS tidak aktif.'],
        checks: ['Hanya ada satu h1.', 'Setiap section memiliki heading.', 'Tidak ada link bertuliskan “klik di sini”.'],
        code: semanticExample,
    },
    {
        number: 3,
        title: 'Beri gaya dan buat responsif',
        duration: '20–30 menit',
        prerequisite: 'Lesson 2 selesai dan struktur HTML sudah semantik.',
        outcome: 'Menghubungkan CSS, mengatur jarak dan warna, serta membuat layout nyaman di layar kecil dan besar.',
        steps: [
            'Pastikan index.html memuat styles.css melalui elemen link.',
            'Atur font, line-height, warna dengan kontras jelas, dan ruang antarbagian.',
            'Gunakan width: min(...) serta media query untuk layar lebar.',
        ],
        lab: 'Buat profil berbentuk kartu yang terbaca pada viewport 375px dan 1280px.',
        expected: ['Tidak ada scroll horizontal pada 375px.', 'Teks tidak terlalu lebar pada 1280px.', 'Focus link terlihat jelas.'],
        checks: ['Uji 375px di DevTools.', 'Uji 1280px tanpa zoom.', 'Navigasikan halaman hanya dengan Tab.'],
        code: responsiveExample,
    },
    {
        number: 4,
        title: 'Tinjau dan perbaiki',
        duration: '20–30 menit',
        prerequisite: 'Lesson 3 selesai dan halaman sudah memiliki HTML serta CSS.',
        outcome: 'Memakai DevTools dan checklist untuk menemukan lalu memperbaiki masalah halaman.',
        steps: [
            'Aktifkan responsive mode di DevTools dan periksa halaman pada 375px serta 1280px.',
            'Periksa Console dan pastikan tidak ada error file yang hilang.',
            'Uji semua link dan navigasi keyboard, lalu catat dua masalah yang ditemukan.',
        ],
        lab: 'Perbaiki sedikitnya dua masalah, lalu tulis ringkasan perubahan dalam README.txt.',
        expected: ['Console tidak menampilkan error dari halaman.', 'Semua link bekerja.', 'README.txt menjelaskan masalah, perbaikan, dan pengecekan ulang.'],
        checks: ['Dua viewport sudah diuji.', 'Semua link dan focus state bekerja.', 'Alasan setiap perbaikan dapat dijelaskan.'],
    },
];

export default function FirstWebPage() {
    return (
        <>
            <Head title="Build a personal webpage · Belajar" />
            <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900 sm:px-6">
                <article className="mx-auto max-w-4xl space-y-10">
                    <Link href="/" className="text-sm font-medium text-blue-700 underline underline-offset-4">
                        ← Kembali ke Belajar
                    </Link>

                    <header className="space-y-4">
                        <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">Learning track gratis · 4 lesson + capstone</p>
                        <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">Build a simple personal webpage</h1>
                        <p className="max-w-3xl text-lg text-slate-700">
                            Jalur pemula untuk membuat profil satu halaman dengan HTML semantik dan CSS responsif. Tidak perlu akun dan seluruh latihan berjalan secara lokal.
                        </p>
                        <dl className="grid gap-3 rounded-2xl border bg-white p-6 sm:grid-cols-3">
                            <div><dt className="text-sm font-semibold text-slate-500">Prasyarat</dt><dd className="mt-1">Browser dan editor teks</dd></div>
                            <div><dt className="text-sm font-semibold text-slate-500">Waktu</dt><dd className="mt-1">Sekitar 2–3 jam</dd></div>
                            <div><dt className="text-sm font-semibold text-slate-500">Hasil</dt><dd className="mt-1">Satu profil responsif</dd></div>
                        </dl>
                    </header>

                    <section aria-labelledby="downloads" className="rounded-2xl bg-blue-950 p-6 text-white sm:p-8">
                        <h2 id="downloads" className="text-2xl font-bold">Mulai dengan starter files</h2>
                        <p className="mt-2 text-blue-100">Unduh kedua file ke folder yang sama. Buka contoh selesai hanya setelah mencoba sendiri.</p>
                        <div className="mt-5 flex flex-wrap gap-3">
                            <a download href="/learn/personal-page/starter/index.html" className="rounded-lg bg-white px-4 py-2 font-semibold text-blue-950">Unduh index.html</a>
                            <a download href="/learn/personal-page/starter/styles.css" className="rounded-lg bg-white px-4 py-2 font-semibold text-blue-950">Unduh styles.css</a>
                            <a href="/learn/personal-page/example/index.html" className="rounded-lg border border-blue-300 px-4 py-2 font-semibold text-white">Lihat contoh selesai</a>
                        </div>
                    </section>

                    <nav aria-label="Daftar lesson" className="rounded-2xl border bg-white p-6">
                        <h2 className="text-xl font-bold">Urutan belajar</h2>
                        <ol className="mt-4 grid gap-3 sm:grid-cols-2">
                            {lessons.map((lesson) => (
                                <li key={lesson.number}>
                                    <a href={`#lesson-${lesson.number}`} className="block rounded-lg border p-4 hover:border-blue-500 hover:bg-blue-50">
                                        <span className="text-sm font-semibold text-blue-700">Lesson {lesson.number} · {lesson.duration}</span>
                                        <span className="mt-1 block font-semibold">{lesson.title}</span>
                                    </a>
                                </li>
                            ))}
                        </ol>
                    </nav>

                    <div className="space-y-6">
                        {lessons.map((lesson) => (
                            <section id={`lesson-${lesson.number}`} key={lesson.number} className="scroll-mt-6 rounded-2xl border bg-white p-6 sm:p-8">
                                <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">Lesson {lesson.number} · {lesson.duration}</p>
                                <h2 className="mt-2 text-2xl font-bold">{lesson.title}</h2>
                                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                                    <div className="rounded-lg bg-slate-100 p-4"><h3 className="font-semibold">Prasyarat</h3><p className="mt-1 text-slate-700">{lesson.prerequisite}</p></div>
                                    <div className="rounded-lg bg-emerald-50 p-4"><h3 className="font-semibold">Target hasil</h3><p className="mt-1 text-slate-700">{lesson.outcome}</p></div>
                                </div>
                                <h3 className="mt-6 text-lg font-semibold">Langkah</h3>
                                <ol className="mt-3 list-decimal space-y-2 pl-6 text-slate-700">{lesson.steps.map((step) => <li key={step}>{step}</li>)}</ol>
                                {lesson.code && <pre className="mt-5 overflow-x-auto rounded-xl bg-slate-950 p-5 text-sm leading-6 text-slate-100"><code>{lesson.code}</code></pre>}
                                <div className="mt-6 rounded-xl border-l-4 border-amber-500 bg-amber-50 p-5"><h3 className="font-semibold">Lab</h3><p className="mt-1 text-slate-700">{lesson.lab}</p></div>
                                <div className="mt-6 grid gap-6 sm:grid-cols-2">
                                    <div><h3 className="font-semibold">Expected result</h3><ul className="mt-2 list-disc space-y-1 pl-5 text-slate-700">{lesson.expected.map((item) => <li key={item}>{item}</li>)}</ul></div>
                                    <div><h3 className="font-semibold">Self-check</h3><ul className="mt-2 space-y-2 text-slate-700">{lesson.checks.map((item) => <li key={item}><label className="flex gap-2"><input type="checkbox" className="mt-1 size-4" /> <span>{item}</span></label></li>)}</ul></div>
                                </div>
                            </section>
                        ))}
                    </div>

                    <section aria-labelledby="capstone" className="rounded-2xl bg-emerald-950 p-6 text-white sm:p-8">
                        <p className="text-sm font-semibold uppercase tracking-wide text-emerald-300">Capstone · 45–60 menit</p>
                        <h2 id="capstone" className="mt-2 text-3xl font-bold">Selesaikan profil versimu</h2>
                        <p className="mt-3 text-emerald-100">Gunakan isi dan gaya milikmu sendiri, lalu penuhi definition of done berikut.</p>
                        <ul className="mt-5 space-y-2 text-emerald-50">
                            {[
                                'Halaman terbuka lokal tanpa error.',
                                'Ada title deskriptif, satu h1, dan sedikitnya dua section.',
                                'Ada satu link aktif dengan teks yang mudah dipahami.',
                                'Tidak ada scroll horizontal pada 375px maupun 1280px.',
                                'README.txt menjelaskan satu perbaikan setelah review.',
                            ].map((item) => <li key={item}><label className="flex gap-2"><input type="checkbox" className="mt-1 size-4" /> <span>{item}</span></label></li>)}
                        </ul>
                    </section>

                    <section aria-labelledby="help" className="rounded-2xl border bg-white p-6">
                        <h2 id="help" className="text-xl font-bold">Kalau kamu buntu</h2>
                        <p className="mt-2 text-slate-700">Saat bertanya, tulis langkah yang dicoba, hasil yang muncul, dan hasil yang diharapkan. Jangan sertakan password, token, alamat rumah, atau data pribadi.</p>
                        <a href="https://github.com/programinglive/belajar/discussions" className="mt-4 inline-block font-semibold text-blue-700 underline underline-offset-4">Tanyakan di GitHub Discussions</a>
                    </section>
                </article>
            </main>
        </>
    );
}
