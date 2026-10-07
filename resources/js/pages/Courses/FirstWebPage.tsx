import Navbar from '@/components/Navbar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import CodeBlock from '@/components/ui/CodeBlock';
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
  background: #ffffff;
  border-radius: 16px;
}`;

const lessons: Lesson[] = [
    {
        number: 1,
        title: 'Buat struktur halaman',
        duration: '20–30 menit',
        prerequisite: 'Browser modern dan editor teks sederhana terpasang.',
        outcome: 'File index.html valid dengan doctype, html, head, title, body, dan heading utama.',
        steps: [
            'Buka editor teks dan buat file baru bernama index.html.',
            'Tulis kerangka dokumen dasar dengan doctype html, html lang="id", head, dan body.',
            'Tambahkan tag title dengan nama kamu dan heading h1 di dalam body.',
            'Buka index.html di browser dan pastikan judul muncul di tab dan di halaman.',
        ],
        lab: 'Ganti isi h1 dengan nama lengkap kamu dan simpan file. Muat ulang browser untuk melihat perubahan.',
        expected: ['Tab browser menampilkan judul yang kamu tulis.', 'Halaman menampilkan satu heading besar dengan namamu.'],
        checks: ['Ada deklarasi <!DOCTYPE html>.', 'Elemen <title> terisi.', 'Halaman memiliki tepat satu elemen <h1>.'],
    },
    {
        number: 2,
        title: 'Susun konten yang bermakna',
        duration: '20–30 menit',
        prerequisite: 'Lesson 1 selesai dan index.html dapat dibuka tanpa error.',
        outcome: 'Halaman menggunakan elemen main, header, section, ul, li, dan minimal satu link kontak.',
        steps: [
            'Bungkus konten utama dengan elemen main.',
            'Kelompokkan nama dan deskripsi singkat di dalam header.',
            'Buat satu section untuk minat atau keahlian menggunakan list tidak berurutan (ul).',
            'Buat satu section untuk kontak yang memuat link email (mailto:) atau tautan media sosial.',
        ],
        lab: 'Tambahkan minimal dua minat kamu ke dalam list dan pastikan link kontak dapat diklik.',
        expected: ['Informasi terbagi rapi ke dalam bagian-bagian yang jelas.', 'Link dapat diklik dan mengarah ke tujuan yang benar.'],
        checks: ['Menggunakan elemen <main> dan <header>.', 'Daftar minat memakai <ul> dan <li>.', 'Terdapat link yang dapat diklik.'],
        code: semanticExample,
    },
    {
        number: 3,
        title: 'Beri gaya dan buat responsif',
        duration: '30–45 menit',
        prerequisite: 'Lesson 2 selesai dan struktur HTML sudah rapi.',
        outcome: 'File styles.css terhubung dan halaman nyaman dibaca di layar ponsel maupun desktop.',
        steps: [
            'Buat file styles.css di folder yang sama dengan index.html.',
            'Hubungkan stylesheet melalui tag link rel="stylesheet" di dalam elemen head.',
            'Atur font-family, margin, dan warna dasar pada elemen body.',
            'Gunakan lebar relatif seperti width: min(100%, 720px) agar layout tidak melebar berlebihan di layar besar.',
        ],
        lab: 'Buka DevTools di browser, aktifkan mode responsif (Ctrl+Shift+M atau Cmd+Shift+M), dan periksa tampilan pada lebar 375px dan 1280px.',
        expected: ['Warna latar dan tipografi berubah sesuai CSS.', 'Tidak muncul scroll horizontal pada layar ponsel 375px.'],
        checks: ['Stylesheet terhubung tanpa error 404.', 'Layout tidak memiliki horizontal overflow di ponsel.', 'Teks memiliki kontras yang nyaman dibaca.'],
        code: responsiveExample,
    },
    {
        number: 4,
        title: 'Tinjau dan perbaiki',
        duration: '20–30 menit',
        prerequisite: 'Lesson 3 selesai dan styling dasar sudah aktif.',
        outcome: 'Halaman melewati pemeriksaan mandiri: struktur rapi, link valid, dan kontras terbaca jelas.',
        steps: [
            'Periksa kembali konsistensi penulisan tag dan indentasi di editor teks.',
            'Buka console browser (F12) dan pastikan tidak ada error pemanggilan file.',
            'Uji semua tautan yang kamu buat untuk memastikan tujuan URL benar.',
            'Mintalah teman atau buka di perangkat lain untuk memastikan keterbacaan.',
        ],
        lab: 'Lakukan penyesuaian padding dan ukuran font jika ada teks yang terasa terlalu padat atau terlalu kecil di ponsel.',
        expected: ['Halaman tampil konsisten di lebih dari satu ukuran layar.', 'Console browser bersih dari pesan error.'],
        checks: ['Tidak ada tag pembuka yang lupa ditutup.', 'Console browser bebas dari error 404 atau script.', 'Halaman siap dibagikan sebagai halaman pribadi pertama.'],
    },
];

const capstoneItems = [
    'Dokumen HTML memiliki struktur valid (doctype, html, head, title, body).',
    'Menggunakan elemen semantik (main, header, section, h1, h2, p, ul, li).',
    'Terdapat tautan kontak yang berfungsi (mailto: atau URL valid).',
    'Stylesheet eksternal styles.css terhubung dan memuat tanpa error.',
    'Layout responsif dan nyaman dibaca pada lebar 375px dan 1280px tanpa horizontal scrollbar.',
    'Konten merupakan profil pribadi atau perkenalan diri milikmu sendiri.',
];

const STORAGE_KEY = 'belajar:first-web-page:checks';
const CONSENT_STORAGE_KEY = 'belajar:first-web-page:consent';

export default function FirstWebPage() {
    const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
    const [consentGiven, setConsentGiven] = useState(false);
    const [notes, setNotes] = useState('');
    const [saveStatus, setSaveStatus] = useState<string | null>(null);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (raw) setCheckedItems(JSON.parse(raw));

            const consentRaw = localStorage.getItem(CONSENT_STORAGE_KEY);
            if (consentRaw) setConsentGiven(JSON.parse(consentRaw));
        } catch {}
    }, []);

    const toggleCheck = (id: string) => {
        setCheckedItems((prev) => {
            const next = { ...prev, [id]: !prev[id] };
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

    const isLessonCompleted = (lesson: Lesson) => {
        return lesson.checks.every((_, index) => checkedItems[`lesson-${lesson.number}-${index}`]);
    };

    const completedLessonNumbers = lessons
        .filter((lesson) => isLessonCompleted(lesson))
        .map((lesson) => lesson.number);

    const isCapstoneCompleted = capstoneItems.every((_, index) => checkedItems[`capstone-${index}`]);

    const syncProgressToServer = async () => {
        if (!consentGiven) {
            setSaveStatus('Beri centang persetujuan terlebih dahulu sebelum menyimpan data ke akun.');
            return;
        }

        setIsSaving(true);
        setSaveStatus(null);

        try {
            await axios.post('/api/learning-tracks/first-web-page/progress', {
                consent_given: true,
                completed_lessons: completedLessonNumbers,
                capstone_completed: isCapstoneCompleted,
                capstone_notes: notes,
            });
            setSaveStatus('Progres Anda berhasil disinkronkan ke Dashboard akun.');
        } catch (error: any) {
            if (error?.response?.status === 401) {
                setSaveStatus('Progres tersimpan di browser lokal. Masuk (Login) jika ingin menyimpannya ke Dashboard.');
            } else {
                setSaveStatus('Gagal menyimpan ke server. Progres Anda tetap aman di memori browser lokal.');
            }
        } finally {
            setIsSaving(false);
        }
    };

    const revokeConsentAndClear = async () => {
        try {
            await axios.delete('/api/learning-tracks/first-web-page/progress');
            handleConsentChange(false);
        } catch {}
        setSaveStatus('Persetujuan dicabut dan data progres di server telah dihapus. Progres lokal tetap tersimpan.');
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC] flex flex-col text-[#0F172A] font-sans antialiased">
            <Head title="Track 1: Build a simple personal webpage — ProgramingLive Belajar" />
            <Navbar />

            {/* Hero Header */}
            <header className="bg-[#1E3A8A] text-white py-14 border-b border-[#172554]">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[8px] text-xs font-semibold bg-white/10 text-blue-100 border border-white/20 mb-4">
                        <span>Track 1</span>
                        <span>•</span>
                        <span>Pemula</span>
                        <span>•</span>
                        <span>100% Gratis</span>
                    </div>
                    <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
                        Build a simple personal webpage
                    </h1>
                    <p className="text-base sm:text-lg text-blue-100 leading-relaxed mb-6">
                        Jalur pemula untuk membuat profil satu halaman dengan HTML semantik dan CSS responsif. Tidak perlu akun dan seluruh latihan berjalan secara lokal di komputer Anda.
                    </p>
                    <div className="grid grid-cols-3 gap-3 bg-white/10 border border-white/15 rounded-[12px] p-4 text-xs">
                        <div><span className="text-blue-200 block text-[11px]">Prasyarat:</span><span className="font-semibold text-white">Browser & Text Editor</span></div>
                        <div><span className="text-blue-200 block text-[11px]">Estimasi Waktu:</span><span className="font-semibold text-white">60–90 Menit</span></div>
                        <div><span className="text-blue-200 block text-[11px]">Target Hasil:</span><span className="font-semibold text-white">Web Profil Responsif</span></div>
                    </div>
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 space-y-10">
                {/* Download Starter Files */}
                <Card className="border border-[#E2E8F0] bg-white rounded-[12px] shadow-xs">
                    <CardHeader className="pb-3">
                        <div className="flex items-center gap-2">
                            <span className="text-xl">📦</span>
                            <div>
                                <CardTitle className="text-lg font-bold text-[#0F172A]">
                                    Berkas Starter & Contoh Jadi
                                </CardTitle>
                                <p className="text-xs text-[#64748B] mt-0.5">
                                    Unduh kedua file ke folder yang sama di komputer Anda untuk memulai latihan.
                                </p>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-wrap gap-3 pt-1">
                            <a download href="/learn/personal-page/starter/index.html">
                                <Button size="sm" variant="secondary" className="text-xs">
                                    Unduh index.html ↓
                                </Button>
                            </a>
                            <a download href="/learn/personal-page/starter/styles.css">
                                <Button size="sm" variant="secondary" className="text-xs">
                                    Unduh styles.css ↓
                                </Button>
                            </a>
                            <a href="/learn/personal-page/example/index.html" target="_blank" rel="noreferrer">
                                <Button size="sm" className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs">
                                    Buka Contoh Selesai ↗
                                </Button>
                            </a>
                        </div>
                    </CardContent>
                </Card>

                {/* Lesson Navigation Overview */}
                <Card className="border border-[#E2E8F0] bg-white rounded-[12px]">
                    <CardHeader className="pb-3 border-b border-[#F1F5F9]">
                        <div className="flex justify-between items-center">
                            <CardTitle className="text-base font-bold text-[#0F172A]">Urutan Pembelajaran</CardTitle>
                            <Badge variant="default" className="text-xs">
                                {completedLessonNumbers.length} dari 4 Modul Selesai
                            </Badge>
                        </div>
                    </CardHeader>
                    <CardContent className="pt-4">
                        <ol className="grid gap-3 sm:grid-cols-2">
                            {lessons.map((lesson) => {
                                const completed = isLessonCompleted(lesson);
                                return (
                                    <li key={lesson.number}>
                                        <a
                                            href={`#lesson-${lesson.number}`}
                                            className={`block rounded-[10px] border p-3.5 transition-all ${
                                                completed
                                                    ? 'border-[#BBF7D0] bg-[#DCFCE7]/40 text-[#16A34A]'
                                                    : 'border-[#E2E8F0] hover:border-[#BFDBFE] hover:bg-[#F8FAFC]'
                                            }`}
                                        >
                                            <div className="flex items-center justify-between text-xs font-semibold">
                                                <span className="text-[#2563EB]">Lesson {lesson.number}</span>
                                                {completed && <Badge variant="success" className="text-[10px]">Selesai ✓</Badge>}
                                            </div>
                                            <span className="mt-1 block font-bold text-xs text-[#0F172A]">{lesson.title}</span>
                                        </a>
                                    </li>
                                );
                            })}
                        </ol>
                    </CardContent>
                </Card>

                {/* Detailed Lessons */}
                <div className="space-y-8">
                    {lessons.map((lesson) => (
                        <Card id={`lesson-${lesson.number}`} key={lesson.number} className="scroll-mt-20 border border-[#E2E8F0] bg-white rounded-[12px] shadow-xs">
                            <CardHeader className="pb-3 border-b border-[#F1F5F9]">
                                <div className="flex items-center justify-between">
                                    <Badge variant="default" className="text-xs">
                                        Lesson {lesson.number} • {lesson.duration}
                                    </Badge>
                                    {isLessonCompleted(lesson) && (
                                        <Badge variant="success" className="text-xs">
                                            Latihan Terpenuhi ✓
                                        </Badge>
                                    )}
                                </div>
                                <CardTitle className="text-xl font-bold text-[#0F172A] pt-1">
                                    {lesson.title}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-5 pt-4 text-xs text-[#475569]">
                                <div className="grid gap-3 sm:grid-cols-2 bg-[#F8FAFC] p-3.5 rounded-[8px] border border-[#E2E8F0]">
                                    <div>
                                        <span className="font-bold text-[#64748B] block mb-0.5">Prasyarat:</span>
                                        <p>{lesson.prerequisite}</p>
                                    </div>
                                    <div>
                                        <span className="font-bold text-[#2563EB] block mb-0.5">Target Hasil:</span>
                                        <p className="font-medium text-[#0F172A]">{lesson.outcome}</p>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="font-bold text-[#0F172A] mb-2 text-sm">Langkah Pengerjaan:</h3>
                                    <ol className="list-decimal pl-5 space-y-1 text-xs">
                                        {lesson.steps.map((step) => <li key={step}>{step}</li>)}
                                    </ol>
                                </div>

                                {lesson.code && (
                                    <CodeBlock
                                        code={lesson.code}
                                        language={lesson.number === 2 ? 'html' : 'css'}
                                        filename={lesson.number === 2 ? 'index.html' : 'styles.css'}
                                    />
                                )}

                                <div className="rounded-[8px] border border-[#BFDBFE] bg-[#EFF6FF] p-3.5 text-xs text-[#1E3A8A]">
                                    <h4 className="font-bold mb-1 flex items-center gap-1.5">🔬 Lab Mandiri:</h4>
                                    <p>{lesson.lab}</p>
                                </div>

                                <div className="grid gap-4 sm:grid-cols-2 pt-2 border-t border-[#F1F5F9]">
                                    <div>
                                        <h4 className="font-bold text-[#0F172A] mb-2">Hasil yang Diharapkan:</h4>
                                        <ul className="list-disc pl-4 space-y-1">
                                            {lesson.expected.map((item) => <li key={item}>{item}</li>)}
                                        </ul>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-[#0F172A] mb-2">Pemeriksaan Mandiri:</h4>
                                        <ul className="space-y-2">
                                            {lesson.checks.map((item, index) => {
                                                const checkId = `lesson-${lesson.number}-${index}`;
                                                const isChecked = Boolean(checkedItems[checkId]);
                                                return (
                                                    <li key={item}>
                                                        <label className="flex items-start gap-2 cursor-pointer select-none">
                                                            <input
                                                                type="checkbox"
                                                                checked={isChecked}
                                                                onChange={() => toggleCheck(checkId)}
                                                                className="mt-0.5 w-3.5 h-3.5 rounded-xs text-[#2563EB] focus:ring-blue-500"
                                                            />
                                                            <span className={isChecked ? 'line-through text-[#94A3B8]' : 'text-[#0F172A]'}>
                                                                {item}
                                                            </span>
                                                        </label>
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Capstone Section */}
                <Card className="border border-[#BBF7D0] bg-[#DCFCE7]/20 rounded-[12px]">
                    <CardHeader className="pb-3 border-b border-[#BBF7D0]/40">
                        <div className="flex items-center justify-between">
                            <Badge variant="success" className="text-xs">
                                Capstone • 45–60 Menit
                            </Badge>
                            {isCapstoneCompleted && (
                                <Badge variant="success" className="font-bold">
                                    Kriteria Capstone Lengkap ✓
                                </Badge>
                            )}
                        </div>
                        <CardTitle className="text-xl font-bold text-[#0F172A] pt-1">
                            Selesaikan Halaman Profil Versimu
                        </CardTitle>
                        <p className="text-xs text-[#475569]">
                            Gunakan isi dan gaya milikmu sendiri, lalu pastikan seluruh kriteria kelulusan di bawah terpenuhi.
                        </p>
                    </CardHeader>
                    <CardContent className="pt-4 space-y-2.5">
                        {capstoneItems.map((item, index) => {
                            const checkId = `capstone-${index}`;
                            const isChecked = Boolean(checkedItems[checkId]);
                            return (
                                <label
                                    key={item}
                                    className={`flex items-start gap-2.5 p-2.5 rounded-[8px] border transition-colors cursor-pointer text-xs ${
                                        isChecked ? 'bg-white border-[#BBF7D0] text-[#16A34A] font-medium' : 'bg-white/60 border-transparent hover:bg-white text-[#0F172A]'
                                    }`}
                                >
                                    <input
                                        type="checkbox"
                                        checked={isChecked}
                                        onChange={() => toggleCheck(checkId)}
                                        className="mt-0.5 w-3.5 h-3.5 rounded-xs text-[#16A34A] focus:ring-emerald-500"
                                    />
                                    <span className={isChecked ? 'line-through opacity-80' : ''}>{item}</span>
                                </label>
                            );
                        })}
                    </CardContent>
                </Card>

                {/* Consent & Progress Sync */}
                <Card className="border border-[#E2E8F0] bg-white rounded-[12px]">
                    <CardHeader className="pb-3">
                        <Badge variant="default" className="text-xs mb-1">
                            Privasi & Sinkronisasi
                        </Badge>
                        <CardTitle className="text-lg font-bold text-[#0F172A]">
                            Penyimpanan Progres Belajar (Opsional)
                        </CardTitle>
                        <p className="text-xs text-[#64748B] leading-relaxed">
                            Progres Anda tersimpan otomatis di browser lokal Anda tanpa wajib login. Jika Anda masuk ke akun, Anda dapat menyinkronkan progres ke Dashboard.
                        </p>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <label className="flex items-start gap-2.5 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={consentGiven}
                                onChange={(e) => handleConsentChange(e.target.checked)}
                                className="mt-0.5 w-4 h-4 rounded-xs text-[#2563EB] focus:ring-blue-500"
                            />
                            <span className="text-xs text-[#475569] leading-relaxed">
                                Saya menyetujui penyimpanan status modul dan penyerahan capstone ke akun saya secara aman.
                            </span>
                        </label>

                        {consentGiven && (
                            <div className="space-y-3 pt-2 border-t border-[#F1F5F9]">
                                <div>
                                    <label htmlFor="notes" className="text-xs font-semibold text-[#334E68] block mb-1">
                                        Catatan atau tautan hasil karya capstone (opsional):
                                    </label>
                                    <input
                                        id="notes"
                                        type="text"
                                        value={notes}
                                        onChange={(e) => setNotes(e.target.value)}
                                        placeholder="Contoh: https://github.com/username/profil-web"
                                        className="w-full text-xs p-2.5 rounded-[8px] border border-[#CBD5E1] focus:border-[#2563EB] focus:outline-none"
                                    />
                                </div>
                                <div className="flex flex-wrap gap-2.5 pt-1">
                                    <Button
                                        onClick={syncProgressToServer}
                                        disabled={isSaving}
                                        className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold"
                                    >
                                        {isSaving ? 'Menyimpan...' : 'Simpan Progres ke Dashboard'}
                                    </Button>
                                    <Button
                                        variant="secondary"
                                        onClick={revokeConsentAndClear}
                                        className="text-xs text-[#64748B] hover:text-[#DC2626]"
                                    >
                                        Cabut Izin di Server
                                    </Button>
                                </div>
                            </div>
                        )}

                        {saveStatus && (
                            <div className="p-3 rounded-[8px] bg-[#EFF6FF] border border-[#BFDBFE] text-xs text-[#1E3A8A] font-medium">
                                {saveStatus}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </main>

            <footer className="border-t border-[#E2E8F0] bg-white py-6 mt-auto">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-xs text-[#64748B]">
                    <p>© 2026 Belajar — ProgramingLive Initiative. Belajar pemrograman tanpa hambatan.</p>
                </div>
            </footer>
        </div>
    );
}
