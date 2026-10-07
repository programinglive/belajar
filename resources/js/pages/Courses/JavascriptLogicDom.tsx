import Navbar from '@/components/Navbar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import CodeBlock from '@/components/ui/CodeBlock';
import { Head } from '@inertiajs/react';
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
        <div className="min-h-screen bg-[#F8FAFC] flex flex-col text-[#0F172A] font-sans antialiased">
            <Head title="Track 2: Dasar Logika JavaScript & DOM — ProgramingLive Belajar" />
            <Navbar />

            {/* Hero Header */}
            <header className="bg-[#1E3A8A] text-white py-14 border-b border-[#172554]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[8px] text-xs font-semibold bg-white/10 text-blue-100 border border-white/20 mb-4">
                            <span>Track 2</span>
                            <span>•</span>
                            <span>Pemula</span>
                            <span>•</span>
                            <span>100% Gratis</span>
                        </div>
                        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
                            Dasar Logika JavaScript & DOM
                        </h1>
                        <p className="text-base sm:text-lg text-blue-100 leading-relaxed mb-6">
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

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 space-y-10">
                {/* Downloadable Resources */}
                <Card className="border border-[#E2E8F0] bg-white rounded-[12px] shadow-xs">
                    <CardHeader className="pb-3">
                        <div className="flex justify-between items-start">
                            <div>
                                <Badge variant="default" className="text-xs mb-1">Materi & Starter Files</Badge>
                                <CardTitle className="text-lg font-bold text-[#0F172A]">
                                    Unduh Berkas Pembelajaran & Uji Coba Proyek
                                </CardTitle>
                                <CardDescription className="text-xs text-[#64748B]">
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
                                className="p-3 rounded-[8px] border border-[#E2E8F0] hover:border-[#BFDBFE] hover:bg-[#F8FAFC] transition-colors flex items-center justify-between text-xs font-medium text-[#0F172A]"
                            >
                                <span>📄 Starter index.html</span>
                                <span className="text-[#2563EB] font-semibold">Unduh ↓</span>
                            </a>
                            <a
                                href="/learn/javascript-logic/starter/styles.css"
                                download="styles.css"
                                className="p-3 rounded-[8px] border border-[#E2E8F0] hover:border-[#BFDBFE] hover:bg-[#F8FAFC] transition-colors flex items-center justify-between text-xs font-medium text-[#0F172A]"
                            >
                                <span>🎨 Starter styles.css</span>
                                <span className="text-[#2563EB] font-semibold">Unduh ↓</span>
                            </a>
                            <a
                                href="/learn/javascript-logic/starter/app.js"
                                download="app.js"
                                className="p-3 rounded-[8px] border border-[#E2E8F0] hover:border-[#BFDBFE] hover:bg-[#F8FAFC] transition-colors flex items-center justify-between text-xs font-medium text-[#0F172A]"
                            >
                                <span>⚡ Starter app.js</span>
                                <span className="text-[#2563EB] font-semibold">Unduh ↓</span>
                            </a>
                            <a
                                href="/learn/javascript-logic/example/index.html"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-3 rounded-[8px] bg-[#DCFCE7]/40 border border-[#BBF7D0] text-[#16A34A] hover:bg-[#DCFCE7]/70 transition-colors flex items-center justify-between text-xs font-bold"
                            >
                                <span>🚀 Buka Contoh Selesai</span>
                                <span>Buka ↗</span>
                            </a>
                        </div>
                    </CardContent>
                </Card>

                {/* 5 Lesson Modules Navigation & Content */}
                <div className="space-y-6">
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 border-b border-[#E2E8F0] pb-4">
                        <div>
                            <h2 className="text-2xl font-bold text-[#0F172A] tracking-tight">Kurikulum 5 Modul</h2>
                            <p className="text-xs text-[#64748B]">Pelajari materi secara berurutan mulai dari variabel hingga perakitan aplikasi.</p>
                        </div>
                        <Badge variant="default" className="text-xs">
                            {completedLessonNumbers.length} dari 5 Modul Ditandai Selesai
                        </Badge>
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
                                    className={`px-3.5 py-2 rounded-[8px] text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
                                        isActive
                                            ? 'bg-[#1E3A8A] text-white shadow-xs'
                                            : 'bg-white text-[#475569] border border-[#E2E8F0] hover:bg-[#F8FAFC]'
                                    }`}
                                >
                                    <span
                                        className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                                            isActive
                                                ? 'bg-white/20 text-white'
                                                : isDone
                                                ? 'bg-[#DCFCE7] text-[#16A34A]'
                                                : 'bg-[#F1F5F9] text-[#64748B]'
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
                                <Card key={lesson.number} className="border border-[#E2E8F0] bg-white rounded-[12px] shadow-xs">
                                    <CardHeader className="pb-3 border-b border-[#F1F5F9]">
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                            <div>
                                                <Badge variant="default" className="text-xs mb-1">
                                                    Modul {lesson.number} • {lesson.duration}
                                                </Badge>
                                                <CardTitle className="text-xl font-bold text-[#0F172A]">
                                                    {lesson.title}
                                                </CardTitle>
                                            </div>
                                            <label className="flex items-center gap-2 bg-[#F8FAFC] hover:bg-slate-100 px-3 py-1.5 rounded-[8px] border border-[#CBD5E1] cursor-pointer text-xs font-semibold text-[#0F172A] transition-colors">
                                                <input
                                                    type="checkbox"
                                                    checked={isDone}
                                                    onChange={() => toggleCheck(`lesson-${lesson.number}`)}
                                                    className="w-3.5 h-3.5 rounded-xs text-[#2563EB] focus:ring-blue-500"
                                                />
                                                <span>Tandai Modul Selesai</span>
                                            </label>
                                        </div>
                                    </CardHeader>

                                    <CardContent className="space-y-5 pt-5 text-xs text-[#475569] leading-relaxed">
                                        {/* Prerequisite & Outcome */}
                                        <div className="grid sm:grid-cols-2 gap-3 bg-[#F8FAFC] p-3.5 rounded-[8px] border border-[#E2E8F0]">
                                            <div>
                                                <span className="font-bold text-[#64748B] block mb-0.5">
                                                    Prasyarat:
                                                </span>
                                                <p>{lesson.prerequisite}</p>
                                            </div>
                                            <div>
                                                <span className="font-bold text-[#2563EB] block mb-0.5">
                                                    Target Capaian:
                                                </span>
                                                <p className="font-medium text-[#0F172A]">{lesson.outcome}</p>
                                            </div>
                                        </div>

                                        {/* Steps */}
                                        <div>
                                            <h3 className="font-bold text-[#0F172A] mb-2 text-sm">Langkah Pembelajaran:</h3>
                                            <ol className="list-decimal pl-5 space-y-1">
                                                {lesson.steps.map((step, idx) => (
                                                    <li key={idx}>{step}</li>
                                                ))}
                                            </ol>
                                        </div>

                                        {/* Code Snippet Example with CodeBlock */}
                                        {lesson.codeSnippet && (
                                            <div>
                                                <h3 className="font-bold text-[#0F172A] mb-1 text-sm">Contoh Kode:</h3>
                                                <CodeBlock
                                                    code={lesson.codeSnippet}
                                                    language="javascript"
                                                    filename="app.js"
                                                />
                                            </div>
                                        )}

                                        {/* Practical Lab */}
                                        <div className="bg-[#EFF6FF] border border-[#BFDBFE] p-3.5 rounded-[8px] space-y-1 text-[#1E3A8A]">
                                            <h3 className="font-bold text-xs flex items-center gap-1.5">
                                                <span>🔬 Lab Mandiri:</span>
                                            </h3>
                                            <p className="font-medium">{lesson.lab}</p>
                                            <div className="pt-2 border-t border-[#BFDBFE]/70 mt-2">
                                                <span className="font-bold uppercase text-[10px] block mb-1">
                                                    Hasil yang Diharapkan:
                                                </span>
                                                <ul className="list-disc pl-4 space-y-0.5">
                                                    {lesson.expected.map((exp, idx) => (
                                                        <li key={idx}>{exp}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>

                                        {/* Self Check Criteria */}
                                        <div>
                                            <h3 className="font-bold text-[#0F172A] mb-2 text-sm">Pemeriksaan Mandiri (Self-Check):</h3>
                                            <ul className="space-y-1.5">
                                                {lesson.checks.map((check, idx) => (
                                                    <li key={idx} className="flex items-center gap-2">
                                                        <span className="text-[#16A34A] font-bold">✓</span>
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
                <div className="space-y-4 pt-4 border-t border-[#E2E8F0]">
                    <div className="flex justify-between items-baseline">
                        <div>
                            <h2 className="text-2xl font-bold text-[#0F172A] flex items-center gap-2">
                                <span>🏆</span>
                                <span>Tantangan Capstone: Aplikasi Kalkulator Sederhana</span>
                            </h2>
                            <p className="text-xs text-[#64748B] mt-1">
                                Pastikan kode kalkulator Anda memenuhi semua kriteria di bawah ini sebelum menandai proyek selesai.
                            </p>
                        </div>
                        {isCapstoneFullyChecked && (
                            <Badge variant="success" className="font-bold">
                                Capstone Selesai 🎉
                            </Badge>
                        )}
                    </div>

                    <Card className="border border-[#BBF7D0] bg-[#DCFCE7]/20 rounded-[12px] shadow-xs">
                        <CardContent className="pt-5 space-y-4">
                            <div className="space-y-2.5">
                                {capstoneItems.map((item, idx) => {
                                    const isChecked = Boolean(checkedItems[`capstone-${idx}`]);
                                    return (
                                        <label
                                            key={idx}
                                            className={`flex items-start gap-2.5 p-2.5 rounded-[8px] border transition-all cursor-pointer text-xs ${
                                                isChecked
                                                    ? 'bg-white border-[#BBF7D0] text-[#16A34A] font-medium'
                                                    : 'bg-white/60 border-transparent hover:bg-white text-[#0F172A]'
                                            }`}
                                        >
                                            <input
                                                type="checkbox"
                                                checked={isChecked}
                                                onChange={() => toggleCheck(`capstone-${idx}`)}
                                                className="mt-0.5 w-3.5 h-3.5 rounded-xs text-[#16A34A] focus:ring-emerald-500"
                                            />
                                            <span className="leading-relaxed">{item}</span>
                                        </label>
                                    );
                                })}
                            </div>

                            {/* Optional Notes */}
                            <div className="pt-3 border-t border-[#BBF7D0]/50 space-y-1.5">
                                <label htmlFor="capstone-notes" className="text-xs font-semibold text-[#0F172A] block">
                                    Catatan Pembelajaran atau Tautan Demo Proyek Anda (Opsional):
                                </label>
                                <textarea
                                    id="capstone-notes"
                                    rows={3}
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                    placeholder="Contoh: Menambahkan styling khusus untuk tombol operasi dan pesan validasi saat input kosong."
                                    className="w-full text-xs p-2.5 rounded-[8px] border border-[#CBD5E1] bg-white focus:border-[#2563EB] focus:outline-none"
                                />
                            </div>

                            {/* Data Consent & Save Progress */}
                            <div className="pt-3 border-t border-[#BBF7D0]/50 bg-white/70 p-3.5 rounded-[8px] space-y-3">
                                <label className="flex items-start gap-2.5 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={consentGiven}
                                        onChange={(e) => handleConsentChange(e.target.checked)}
                                        className="mt-0.5 w-3.5 h-3.5 rounded-xs text-[#2563EB] focus:ring-blue-500"
                                    />
                                    <span className="text-xs text-[#475569] leading-relaxed">
                                        Saya setuju untuk menyimpan progres belajar ini (nomor modul dan status capstone) ke akun saya. Data ini hanya digunakan untuk menampilkan perkembangan di Dashboard saya dan dapat dicabut kapan saja.
                                    </span>
                                </label>

                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-1">
                                    <Button
                                        onClick={handleSaveProgress}
                                        disabled={isSaving}
                                        className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold px-4"
                                    >
                                        {isSaving ? 'Menyimpan...' : 'Sinkronkan Progres ke Dashboard'}
                                    </Button>

                                    {saveStatus && (
                                        <span className="text-xs font-semibold text-[#1E3A8A]">
                                            {saveStatus}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </main>

            <footer className="border-t border-[#E2E8F0] bg-white py-6 mt-auto">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-xs text-[#64748B]">
                    <p>© 2026 Belajar — ProgramingLive Initiative. Belajar pemrograman tanpa hambatan.</p>
                </div>
            </footer>
        </div>
    );
}
