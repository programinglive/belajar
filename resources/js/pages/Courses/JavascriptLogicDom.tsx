import Navbar from '@/components/Navbar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Head, Link } from '@inertiajs/react';
import axios from 'axios';
import { useEffect, useState } from 'react';

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
    codeSnippet?: string;
};

const codeSample1 = `// index.html
// <script src="app.js" defer></script>

// app.js
const namaAplikasi = "Kalkulator Sederhana";
let angkaAwal = 10;
let angkaKedua = 5;

console.log("Selamat datang di " + namaAplikasi);
console.log("Angka awal:", angkaAwal);`;

const codeSample2 = `function validasiPembagi(angka) {
  if (angka === 0) {
    console.warn("Peringatan: Tidak dapat membagi dengan 0!");
    return false;
  }
  return true;
}

if (validasiPembagi(0)) {
  console.log("Aman untuk membagi.");
} else {
  console.log("Operasi dibatalkan.");
}`;

const codeSample3 = `function tambah(a, b) {
  return a + b;
}

function kurang(a, b) {
  return a - b;
}

function kali(a, b) {
  return a * b;
}

function bagi(a, b) {
  if (b === 0) return null;
  return a / b;
}`;

const codeSample4 = `const btnHitung = document.getElementById('btn-tambah');
const input1 = document.getElementById('angka1');
const input2 = document.getElementById('angka2');
const hasilDisplay = document.getElementById('hasil-teks');

btnHitung.addEventListener('click', function () {
  const a = parseFloat(input1.value);
  const b = parseFloat(input2.value);
  hasilDisplay.textContent = tambah(a, b);
});`;

const lessons: Lesson[] = [
    {
        number: 1,
        title: 'Menghubungkan JavaScript & Mengenal Variabel',
        duration: '20–25 menit',
        prerequisite: 'Memahami dasar tag HTML. Membuka Console DevTools (F12 atau Inspect Element).',
        outcome: 'Menghubungkan app.js ke index.html dengan atribut defer, membuat variabel const/let, dan mencetak data di console.',
        steps: [
            'Unduh starter files dan letakkan index.html, styles.css, serta app.js dalam satu folder.',
            'Buka app.js di editor kode pilihan Anda.',
            'Deklarasikan dua angka menggunakan const dan let, lalu jalankan console.log() untuk melihat nilainya di browser.',
        ],
        lab: 'Tulis salam selamat datang dan cetak tipe data (typeof) dari angka pertama ke console browser.',
        expected: ['Console browser menampilkan pesan tanpa error merah.', 'Nilai variabel tercetak sesuai deklarasi.'],
        checks: ['Tag script menggunakan atribut defer.', 'File app.js tersimpan.', 'Console DevTools bersih dari error 404.'],
        codeSnippet: codeSample1,
    },
    {
        number: 2,
        title: 'Percabangan & Logika Kondisional',
        duration: '20–25 menit',
        prerequisite: 'Modul 1 selesai dan console.log dapat berjalan dengan baik.',
        outcome: 'Mampu mengambil keputusan logika dengan operator perbandingan (===) dan percabangan if/else.',
        steps: [
            'Pelajari perbedaan operator sama dengan biasa (==) dan identik (===).',
            'Buat percabangan if untuk mengecek jika nilai pembagi sama dengan 0.',
            'Tampilkan pesan error atau kembalikan nilai null jika pembagi bernilai 0.',
        ],
        lab: 'Tulis percabangan logika yang memvalidasi apakah dua input bernilai angka atau kosong sebelum kalkulasi dijalankan.',
        expected: ['Percabangan berhasil menangkap nilai 0.', 'Pesan ramah muncul di console saat kondisi pembagian dengan nol terjadi.'],
        checks: ['Menggunakan perbandingan ketat === 0.', 'Memiliki cabang if dan else yang jelas.'],
        codeSnippet: codeSample2,
    },
    {
        number: 3,
        title: 'Fungsi (Functions) & Operasi Aritmatika',
        duration: '20–25 menit',
        prerequisite: 'Modul 2 selesai dan percabangan logika telah dipahami.',
        outcome: 'Menyusun fungsi-fungsi matematika modular (tambah, kurang, kali, bagi) yang mengembalikan nilai (return).',
        steps: [
            'Deklarasikan 4 fungsi aritmatika murni dengan parameter a dan b.',
            'Gunakan kata kunci return untuk mengembalikan hasil perhitungan matematika.',
            'Integrasikan logika perlindungan pembagian dengan 0 pada fungsi bagi().',
        ],
        lab: 'Uji fungsi-fungsi aritmatika di console dengan berbagai nilai (angka bulat, desimal, dan nilai negatif).',
        expected: ['Fungsi mengembalikan angka yang akurat.', 'Fungsi bagi(10, 0) mengembalikan peringatan atau nilai yang aman.'],
        checks: ['Setiap fungsi memiliki kata kunci return.', 'Fungsi tidak langsung mengubah DOM (bersifat fungsi murni).'],
        codeSnippet: codeSample3,
    },
    {
        number: 4,
        title: 'Seleksi Elemen DOM & Event Listener',
        duration: '25–30 menit',
        prerequisite: 'Modul 3 selesai dan fungsi aritmatika sudah siap digunakan.',
        outcome: 'Membaca nilai input HTML dari JavaScript dan memperbarui teks hasil secara dinamis saat tombol diklik.',
        steps: [
            'Gunakan document.getElementById untuk mengambil referensi input angka dan tombol operasi.',
            'Pasang addEventListener("click", ...) pada tombol operasi.',
            'Konversi teks input ke angka menggunakan parseFloat() atau Number().',
            'Perbarui teks elemen hasil di layar menggunakan textContent.',
        ],
        lab: 'Hubungkan tombol penjumlahan (+) sehingga saat diklik, hasil perhitungan langsung tampil di layar kalkulator.',
        expected: ['Mengklik tombol memperbarui angka di layar secara real-time tanpa refresh.', 'Nilai terbaca sebagai angka, bukan teks sambung (misal: 10 + 5 = 15, bukan 105).'],
        checks: ['Menggunakan parseFloat() untuk menghindari penggabungan string.', 'Menggunakan textContent untuk mengisi hasil.'],
        codeSnippet: codeSample4,
    },
    {
        number: 5,
        title: 'Proyek Capstone: Merakit Aplikasi Kalkulator Sederhana',
        duration: '45–60 menit',
        prerequisite: 'Modul 1–4 selesai. Menguasai alur event listener, validasi input, dan manipulasi DOM.',
        outcome: 'Membangun aplikasi kalkulator interaktif lengkap yang mendukung 4 operasi, validasi input, tombol reset, dan responsif.',
        steps: [
            'Lengkapi semua tombol operasi (+, −, ×, ÷) dengan event listener masing-masing.',
            'Tambahkan tombol Reset / Bersihkan untuk mengosongkan input dan mengembalikan hasil ke 0.',
            'Tampilkan pesan error ramah jika input kosong atau terjadi pembagian dengan 0.',
            'Uji aplikasi kalkulator di layar ponsel (375px) dan desktop (1280px).',
        ],
        lab: 'Selesaikan proyek kalkulator Anda, uji seluruh skenario perhitungan, dan centang Capstone Checklist di bawah.',
        expected: ['Seluruh 4 operasi bekerja dengan benar.', 'Tombol reset mengembalikan kondisi awal.', 'Aplikasi tidak pernah crash atau menampilkan NaN.'],
        checks: ['Semua kriteria capstone terpenuhi.', 'Aplikasi berjalan lokal di browser.'],
    },
];

const capstoneItems = [
    'File app.js terhubung dengan benar ke index.html menggunakan atribut defer.',
    'Mendukung 4 operasi aritmatika dasar: Penjumlahan (+), Pengurangan (−), Perkalian (×), dan Pembagian (÷).',
    'Memiliki validasi input: menampilkan pesan ramah jika salah satu kolom kosong atau bukan angka.',
    'Menangani kasus khusus pembagian dengan nol secara aman ("Tidak dapat membagi dengan 0").',
    'Memiliki tombol Reset / Bersihkan yang mengosongkan kedua input dan mengembalikan tampilan hasil ke awal.',
    'Tampilan responsif dan tetap proporsional pada layar ponsel (375px) maupun desktop (1280px).',
];

const STORAGE_KEY = 'belajar:javascript-logic-dom:checks';
const CONSENT_STORAGE_KEY = 'belajar:javascript-logic-dom:consent';

export default function JavascriptLogicDom() {
    const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
    const [consentGiven, setConsentGiven] = useState(false);
    const [notes, setNotes] = useState('');
    const [saveStatus, setSaveStatus] = useState<string | null>(null);
    const [isSaving, setIsSaving] = useState(false);
    const [activeLessonTab, setActiveLessonTab] = useState(1);

    useEffect(() => {
        try {
            const savedChecks = localStorage.getItem(STORAGE_KEY);
            if (savedChecks) {
                setCheckedItems(JSON.parse(savedChecks));
            }
            const savedConsent = localStorage.getItem(CONSENT_STORAGE_KEY);
            if (savedConsent) {
                setConsentGiven(JSON.parse(savedConsent));
            }
        } catch {
            // Local storage access may be restricted
        }
    }, []);

    const toggleCheck = (key: string) => {
        setCheckedItems((prev) => {
            const next = { ...prev, [key]: !prev[key] };
            try {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
            } catch {}
            return next;
        });
    };

    const handleConsentChange = (checked: boolean) => {
        setConsentGiven(checked);
        try {
            localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(checked));
        } catch {}
    };

    const completedLessonNumbers = lessons
        .filter((lesson) => checkedItems[`lesson-${lesson.number}`])
        .map((lesson) => lesson.number);

    const isCapstoneFullyChecked = capstoneItems.every((_, idx) => checkedItems[`capstone-${idx}`]);

    const handleSaveProgress = async () => {
        if (!consentGiven) {
            setSaveStatus('Beri centang pada persetujuan data terlebih dahulu sebelum menyimpan ke server.');
            return;
        }

        setIsSaving(true);
        setSaveStatus(null);

        try {
            await axios.post('/api/learning-tracks/javascript-logic-dom/progress', {
                consent_given: true,
                completed_lessons: completedLessonNumbers,
                capstone_completed: isCapstoneFullyChecked,
                capstone_notes: notes,
            });
            setSaveStatus('Progres belajar berhasil disinkronkan ke server!');
        } catch (error: any) {
            if (error?.response?.status === 401) {
                setSaveStatus('Progres tersimpan di browser lokal Anda. Masuk (Login) jika ingin mencatatnya di Dashboard akun Anda.');
            } else {
                setSaveStatus('Gagal menyimpan ke server. Progres Anda tetap aman di memori browser lokal.');
            }
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col text-gray-900">
            <Head title="Track 2: Dasar Logika JavaScript & DOM — Belajar" />
            <Navbar />

            {/* Hero Header */}
            <header className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-800 text-white py-14">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-white/20 text-blue-100 backdrop-blur-xs mb-4">
                            <span>Track 2</span>
                            <span>•</span>
                            <span>Pemula</span>
                            <span>•</span>
                            <span>100% Gratis</span>
                        </div>
                        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
                            Dasar Logika JavaScript & DOM
                        </h1>
                        <p className="text-lg text-blue-100 leading-relaxed mb-6">
                            Pelajari fondasi pemrograman web interaktif. Kuasai variabel, percabangan logika, fungsi modular, dan manipulasi elemen HTML melalui proyek praktis: <strong>Aplikasi Kalkulator Sederhana</strong>.
                        </p>
                        <div className="flex flex-wrap gap-4 text-xs font-medium text-blue-200">
                            <span className="flex items-center gap-1.5">⏱️ 90–120 menit estimasi</span>
                            <span className="flex items-center gap-1.5">📚 5 Modul Praktis</span>
                            <span className="flex items-center gap-1.5">🏆 Proyek Capstone Interaktif</span>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 space-y-12">
                {/* Downloadable Resources & Sandbox Preview */}
                <Card className="border border-blue-200 bg-white shadow-xs">
                    <CardHeader className="pb-3">
                        <div className="flex justify-between items-start">
                            <div>
                                <Badge className="bg-blue-600 text-white mb-1">Materi & Starter Files</Badge>
                                <CardTitle className="text-xl font-bold text-gray-900">
                                    Unduh Berkas Pembelajaran & Uji Coba Proyek
                                </CardTitle>
                                <CardDescription className="text-sm text-gray-600">
                                    Anda dapat menjalankan kode secara offline di komputer Anda tanpa perlu menginstal framework apa pun.
                                </CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
                            <a
                                href="/learn/javascript-logic/starter/index.html"
                                download="index.html"
                                className="p-3 rounded-lg border border-gray-200 hover:border-blue-500 hover:bg-blue-50/50 transition-colors flex items-center justify-between text-xs font-medium text-gray-700"
                            >
                                <span>📄 Starter index.html</span>
                                <span className="text-blue-600">Unduh ↓</span>
                            </a>
                            <a
                                href="/learn/javascript-logic/starter/styles.css"
                                download="styles.css"
                                className="p-3 rounded-lg border border-gray-200 hover:border-blue-500 hover:bg-blue-50/50 transition-colors flex items-center justify-between text-xs font-medium text-gray-700"
                            >
                                <span>🎨 Starter styles.css</span>
                                <span className="text-blue-600">Unduh ↓</span>
                            </a>
                            <a
                                href="/learn/javascript-logic/starter/app.js"
                                download="app.js"
                                className="p-3 rounded-lg border border-gray-200 hover:border-blue-500 hover:bg-blue-50/50 transition-colors flex items-center justify-between text-xs font-medium text-gray-700"
                            >
                                <span>⚡ Starter app.js</span>
                                <span className="text-blue-600">Unduh ↓</span>
                            </a>
                            <a
                                href="/learn/javascript-logic/example/index.html"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 hover:bg-emerald-100 transition-colors flex items-center justify-between text-xs font-semibold"
                            >
                                <span>🚀 Buka Contoh Selesai</span>
                                <span>Buka ↗</span>
                            </a>
                        </div>
                    </CardContent>
                </Card>

                {/* 5 Lesson Modules Navigation & Content */}
                <div className="space-y-6">
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 border-b border-gray-200 pb-4">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">Kurikulum 5 Modul</h2>
                            <p className="text-sm text-gray-600">Pelajari materi secara berurutan mulai dari variabel hingga perakitan aplikasi.</p>
                        </div>
                        <div className="text-xs font-semibold text-blue-700 bg-blue-50 px-3 py-1.5 rounded-full border border-blue-200">
                            {completedLessonNumbers.length} dari 5 Modul Ditandai Selesai
                        </div>
                    </div>

                    {/* Lesson Tab Selector */}
                    <div className="flex overflow-x-auto gap-2 pb-2">
                        {lessons.map((lesson) => {
                            const isDone = Boolean(checkedItems[`lesson-${lesson.number}`]);
                            const isActive = activeLessonTab === lesson.number;

                            return (
                                <button
                                    key={lesson.number}
                                    type="button"
                                    onClick={() => setActiveLessonTab(lesson.number)}
                                    className={`px-4 py-2.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
                                        isActive
                                            ? 'bg-blue-600 text-white shadow-xs'
                                            : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
                                    }`}
                                >
                                    <span
                                        className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                                            isActive
                                                ? 'bg-white/20 text-white'
                                                : isDone
                                                ? 'bg-emerald-100 text-emerald-700'
                                                : 'bg-gray-100 text-gray-600'
                                        }`}
                                    >
                                        {isDone ? '✓' : lesson.number}
                                    </span>
                                    <span>Modul {lesson.number}</span>
                                </button>
                            );
                        })}
                    </div>

                    {/* Active Lesson Detail */}
                    {lessons
                        .filter((l) => l.number === activeLessonTab)
                        .map((lesson) => {
                            const isDone = Boolean(checkedItems[`lesson-${lesson.number}`]);

                            return (
                                <Card key={lesson.number} className="border border-gray-200 bg-white shadow-xs">
                                    <CardHeader className="pb-4 border-b border-gray-100">
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                            <div>
                                                <Badge variant="outline" className="text-blue-700 bg-blue-50 border-blue-200 mb-1">
                                                    Modul {lesson.number} · {lesson.duration}
                                                </Badge>
                                                <CardTitle className="text-2xl font-bold text-gray-900">
                                                    {lesson.title}
                                                </CardTitle>
                                            </div>
                                            <label className="flex items-center gap-2.5 bg-gray-50 hover:bg-gray-100 px-3 py-2 rounded-lg border border-gray-200 cursor-pointer text-xs font-semibold text-gray-700 transition-colors">
                                                <input
                                                    type="checkbox"
                                                    checked={isDone}
                                                    onChange={() => toggleCheck(`lesson-${lesson.number}`)}
                                                    className="w-4 h-4 rounded-xs text-blue-600 focus:ring-blue-500"
                                                />
                                                <span>Tandai Modul Selesai</span>
                                            </label>
                                        </div>
                                    </CardHeader>

                                    <CardContent className="space-y-6 pt-6 text-sm text-gray-700 leading-relaxed">
                                        {/* Prerequisite & Outcome */}
                                        <div className="grid sm:grid-cols-2 gap-4 bg-gray-50/70 p-4 rounded-lg border border-gray-100">
                                            <div>
                                                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">
                                                    Prasyarat
                                                </span>
                                                <p className="text-xs text-gray-700">{lesson.prerequisite}</p>
                                            </div>
                                            <div>
                                                <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block mb-1">
                                                    Target Capaian
                                                </span>
                                                <p className="text-xs text-gray-700 font-medium">{lesson.outcome}</p>
                                            </div>
                                        </div>

                                        {/* Steps */}
                                        <div>
                                            <h3 className="font-bold text-gray-900 mb-2">Langkah Pembelajaran:</h3>
                                            <ol className="list-decimal pl-5 space-y-1.5 text-xs text-gray-600">
                                                {lesson.steps.map((step, idx) => (
                                                    <li key={idx}>{step}</li>
                                                ))}
                                            </ol>
                                        </div>

                                        {/* Code Snippet Example if present */}
                                        {lesson.codeSnippet && (
                                            <div>
                                                <h3 className="font-bold text-gray-900 mb-2">Contoh Potongan Kode:</h3>
                                                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-xs overflow-x-auto border border-gray-800">
                                                    <pre>{lesson.codeSnippet}</pre>
                                                </div>
                                            </div>
                                        )}

                                        {/* Practical Lab */}
                                        <div className="bg-blue-50/60 border border-blue-200 p-4 rounded-lg space-y-2">
                                            <h3 className="font-bold text-blue-900 text-sm flex items-center gap-1.5">
                                                <span>🔬 Lab Mandiri:</span>
                                            </h3>
                                            <p className="text-xs text-blue-950 font-medium">{lesson.lab}</p>
                                            <div className="pt-2 border-t border-blue-200/60">
                                                <span className="text-[11px] font-bold text-blue-800 uppercase block mb-1">
                                                    Hasil yang Diharapkan:
                                                </span>
                                                <ul className="list-disc pl-4 space-y-1 text-xs text-blue-900">
                                                    {lesson.expected.map((exp, idx) => (
                                                        <li key={idx}>{exp}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>

                                        {/* Self Check Criteria */}
                                        <div>
                                            <h3 className="font-bold text-gray-900 mb-2">Pemeriksaan Mandiri (Self-Check):</h3>
                                            <ul className="space-y-1.5">
                                                {lesson.checks.map((check, idx) => (
                                                    <li key={idx} className="flex items-center gap-2 text-xs text-gray-600">
                                                        <span className="text-emerald-600 font-bold">✓</span>
                                                        <span>{check}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </CardContent>
                                </Card>
                            );
                        })}
                </div>

                {/* Capstone Project Checklist */}
                <div className="space-y-4 pt-6 border-t border-gray-200">
                    <div className="flex justify-between items-baseline">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                                <span>🏆</span>
                                <span>Tantangan Capstone: Aplikasi Kalkulator Sederhana</span>
                            </h2>
                            <p className="text-sm text-gray-600 mt-1">
                                Pastikan kode kalkulator Anda memenuhi semua kriteria di bawah ini sebelum menandai proyek selesai.
                            </p>
                        </div>
                        {isCapstoneFullyChecked && (
                            <Badge className="bg-emerald-600 text-white font-semibold">
                                Capstone Selesai 🎉
                            </Badge>
                        )}
                    </div>

                    <Card className="border border-emerald-200 bg-white shadow-xs">
                        <CardContent className="pt-6 space-y-4">
                            <div className="space-y-3">
                                {capstoneItems.map((item, idx) => {
                                    const isChecked = Boolean(checkedItems[`capstone-${idx}`]);
                                    return (
                                        <label
                                            key={idx}
                                            className={`flex items-start gap-3 p-3 rounded-lg border transition-all cursor-pointer ${
                                                isChecked
                                                    ? 'bg-emerald-50/60 border-emerald-200 text-emerald-950 font-medium'
                                                    : 'bg-gray-50/60 border-gray-200 text-gray-700 hover:bg-gray-100'
                                            }`}
                                        >
                                            <input
                                                type="checkbox"
                                                checked={isChecked}
                                                onChange={() => toggleCheck(`capstone-${idx}`)}
                                                className="mt-0.5 w-4 h-4 rounded-xs text-emerald-600 focus:ring-emerald-500"
                                            />
                                            <span className="text-xs leading-relaxed">{item}</span>
                                        </label>
                                    );
                                })}
                            </div>

                            {/* Optional Notes */}
                            <div className="pt-4 border-t border-gray-100 space-y-2">
                                <label htmlFor="capstone-notes" className="text-xs font-semibold text-gray-700 block">
                                    Catatan Pembelajaran atau Tautan Demo Proyek Anda (Opsional):
                                </label>
                                <textarea
                                    id="capstone-notes"
                                    rows={3}
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                    placeholder="Contoh: Menambahkan fitur styling khusus untuk tombol aktif dan pesan validasi saat input kosong."
                                    className="w-full text-xs p-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                                />
                            </div>

                            {/* Data Consent & Save Progress */}
                            <div className="pt-4 border-t border-gray-100 bg-gray-50 p-4 rounded-lg space-y-3">
                                <label className="flex items-start gap-2.5 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={consentGiven}
                                        onChange={(e) => handleConsentChange(e.target.checked)}
                                        className="mt-0.5 w-4 h-4 rounded-xs text-blue-600 focus:ring-blue-500"
                                    />
                                    <span className="text-xs text-gray-600 leading-normal">
                                        Saya setuju untuk menyimpan progres belajar ini (nomor modul dan status capstone) ke akun saya. Data ini hanya digunakan untuk menampilkan perkembangan di Dashboard saya dan dapat dicabut kapan saja.
                                    </span>
                                </label>

                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-2">
                                    <Button
                                        onClick={handleSaveProgress}
                                        disabled={isSaving}
                                        className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-5"
                                    >
                                        {isSaving ? 'Menyimpan...' : 'Sinkronkan Progres ke Dashboard'}
                                    </Button>

                                    {saveStatus && (
                                        <span className="text-xs font-medium text-blue-700">
                                            {saveStatus}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </main>

            <footer className="border-t border-gray-200 bg-white py-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-xs text-gray-500">
                    <p>© 2026 Belajar — ProgramingLive Initiative. Belajar pemrograman tanpa hambatan.</p>
                </div>
            </footer>
        </div>
    );
}
