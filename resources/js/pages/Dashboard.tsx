import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Layout from '@/layouts/Layout';
import { Head, Link, router, usePage } from '@inertiajs/react';
import axios from 'axios';
import { useState } from 'react';

export interface ActiveTrack {
    slug: string;
    title: string;
    subtitle: string | null;
    level: string;
    duration: string;
    lesson_count: number;
    completed_lessons: number[];
    completed_lessons_count: number;
    percentage: number;
    capstone_completed: boolean;
    capstone_submitted_at: string | null;
    consent_given: boolean;
    resume_url: string;
}

export interface AvailableTrack {
    slug: string;
    title: string;
    subtitle: string | null;
    description: string;
    level: string;
    duration: string;
    lesson_count: number;
    has_capstone: boolean;
    status: 'published' | 'coming_soon';
    route: string | null;
}

export interface DashboardProps {
    stats: {
        tracks_started: number;
        lessons_completed: number;
        capstones_completed: number;
    };
    active_tracks: ActiveTrack[];
    available_tracks: AvailableTrack[];
}

export default function Dashboard({
    stats = { tracks_started: 0, lessons_completed: 0, capstones_completed: 0 },
    active_tracks = [],
    available_tracks = [],
}: DashboardProps) {
    const { auth } = usePage<{ auth?: { user?: { name: string; email: string } | null } }>().props;
    const user = auth?.user;
    const [revokingSlug, setRevokingSlug] = useState<string | null>(null);
    const [notification, setNotification] = useState<string | null>(null);

    const handleRevokeProgress = async (trackSlug: string, trackTitle: string) => {
        const confirmed = window.confirm(
            `Apakah Anda yakin ingin mencabut persetujuan dan menghapus seluruh progres belajar tersimpan untuk track "${trackTitle}"? Tindakan ini tidak dapat dibatalkan.`
        );
        if (!confirmed) return;

        setRevokingSlug(trackSlug);
        try {
            await axios.delete(`/api/learning-tracks/${trackSlug}/progress`);
            setNotification(`Riwayat progres dan izin untuk "${trackTitle}" berhasil dihapus.`);
            router.reload();
        } catch (error) {
            console.error('Failed to revoke progress', error);
            alert('Gagal menghapus progres. Silakan coba beberapa saat lagi.');
        } finally {
            setRevokingSlug(null);
        }
    };

    return (
        <Layout>
            <Head title="Dashboard Pembelajar — ProgramingLive Belajar" />

            {/* Header Greeting */}
            <div className="bg-[#1E3A8A] text-white py-12 border-b border-[#172554]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[8px] text-xs font-semibold bg-white/10 text-blue-100 border border-white/20 mb-3">
                                <span className="w-2 h-2 rounded-full bg-[#16A34A]"></span>
                                Dashboard Pembelajar
                            </div>
                            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
                                Halo, {user?.name || 'Pembelajar'}! 👋
                            </h1>
                            <p className="text-blue-100 text-sm mt-1.5 max-w-2xl leading-relaxed">
                                Pantau pencapaian, lanjutkan materi yang sedang berjalan, dan bangun portofolio coding langkah demi langkah.
                            </p>
                        </div>
                        <div className="flex items-center gap-3">
                            <Link href="/tracks">
                                <Button variant="secondary" className="bg-white text-[#1E3A8A] hover:bg-slate-50 font-semibold shadow-xs">
                                    Jelajahi Katalog Kursus
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
                {notification && (
                    <div className="bg-[#DCFCE7] border border-[#BBF7D0] text-[#16A34A] px-4 py-3 rounded-[10px] text-xs font-semibold flex justify-between items-center shadow-xs">
                        <span>{notification}</span>
                        <button
                            type="button"
                            onClick={() => setNotification(null)}
                            className="text-[#16A34A] hover:text-emerald-900 font-bold ml-4"
                        >
                            ✕
                        </button>
                    </div>
                )}

                {/* 3 Metric Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <Card className="border border-[#E2E8F0] bg-white rounded-[12px] shadow-xs">
                        <CardHeader className="pb-2">
                            <CardDescription className="text-xs font-bold text-[#64748B] uppercase tracking-wider">
                                Track Diikuti
                            </CardDescription>
                            <CardTitle className="text-3xl font-extrabold text-[#0F172A] mt-1">
                                {stats.tracks_started}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-xs text-[#64748B]">Jalur pembelajaran aktif yang sedang atau telah diselesaikan</p>
                        </CardContent>
                    </Card>

                    <Card className="border border-[#E2E8F0] bg-white rounded-[12px] shadow-xs">
                        <CardHeader className="pb-2">
                            <CardDescription className="text-xs font-bold text-[#2563EB] uppercase tracking-wider">
                                Modul Pelajaran Selesai
                            </CardDescription>
                            <CardTitle className="text-3xl font-extrabold text-[#2563EB] mt-1">
                                {stats.lessons_completed}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-xs text-[#64748B]">Materi teori dan lab praktikum yang berhasil dituntaskan</p>
                        </CardContent>
                    </Card>

                    <Card className="border border-[#E2E8F0] bg-white rounded-[12px] shadow-xs">
                        <CardHeader className="pb-2">
                            <CardDescription className="text-xs font-bold text-[#16A34A] uppercase tracking-wider">
                                Capstone Selesai
                            </CardDescription>
                            <CardTitle className="text-3xl font-extrabold text-[#16A34A] mt-1">
                                {stats.capstones_completed}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-xs text-[#64748B]">Proyek portofolio mandiri yang berhasil diverifikasi</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Active Learning Tracks Section */}
                <div className="space-y-4">
                    <div className="flex justify-between items-baseline">
                        <h2 className="text-2xl font-bold text-[#0F172A] tracking-tight">
                            Lanjutkan Pembelajaran
                        </h2>
                        <Link href="/tracks" className="text-xs font-bold text-[#2563EB] hover:underline">
                            Semua Track ({active_tracks.length + available_tracks.length}) →
                        </Link>
                    </div>

                    {active_tracks.length === 0 ? (
                        <Card className="border border-dashed border-[#CBD5E1] bg-white text-center py-12 px-4 rounded-[12px]">
                            <div className="max-w-md mx-auto space-y-3">
                                <div className="w-12 h-12 rounded-[10px] bg-[#EFF6FF] border border-[#BFDBFE] text-[#1E3A8A] flex items-center justify-center text-xl mx-auto font-bold shadow-xs">
                                    🚀
                                </div>
                                <h3 className="text-base font-bold text-[#0F172A]">Belum Ada Track Pembelajaran Aktif</h3>
                                <p className="text-xs text-[#64748B] leading-relaxed">
                                    Mulai langkah perdanamu dengan mempelajari dasar web modern (HTML, CSS responsif, dan portofolio capstone).
                                </p>
                                <div className="pt-2">
                                    <Link href="/learn/first-web-page">
                                        <Button className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold text-xs">
                                            Mulai Track Web Pertama Sekarang
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </Card>
                    ) : (
                        <div className="grid md:grid-cols-2 gap-6">
                            {active_tracks.map((track) => (
                                <Card
                                    key={track.slug}
                                    className="border border-[#E2E8F0] bg-white rounded-[12px] hover:border-[#BFDBFE] hover:shadow-sm transition-all duration-150"
                                >
                                    <CardHeader className="pb-3">
                                        <div className="flex justify-between items-start gap-2">
                                            <div>
                                                <Badge variant="default" className="text-[11px] mb-1">
                                                    {track.level} • {track.duration}
                                                </Badge>
                                                <CardTitle className="text-lg font-bold text-[#0F172A]">
                                                    {track.title}
                                                </CardTitle>
                                                {track.subtitle && (
                                                    <CardDescription className="text-xs text-[#2563EB] font-semibold">
                                                        {track.subtitle}
                                                    </CardDescription>
                                                )}
                                            </div>
                                            <span className="text-lg font-extrabold text-[#2563EB]">
                                                {track.percentage}%
                                            </span>
                                        </div>
                                    </CardHeader>

                                    <CardContent className="space-y-4 text-xs">
                                        {/* Progress bar */}
                                        <div className="space-y-1.5">
                                            <div className="w-full bg-[#E2E8F0] h-2 rounded-full overflow-hidden">
                                                <div
                                                    className="bg-[#2563EB] h-2 rounded-full transition-all duration-300"
                                                    style={{ width: `${track.percentage}%` }}
                                                ></div>
                                            </div>
                                            <div className="flex justify-between text-xs text-[#64748B]">
                                                <span>{track.completed_lessons_count} dari {track.lesson_count} modul selesai</span>
                                                <span>{track.capstone_completed ? '🏆 Capstone Selesai' : '⏳ Capstone Belum'}</span>
                                            </div>
                                        </div>

                                        {/* Completed lesson badges */}
                                        <div className="flex items-center gap-1.5 pt-1">
                                            <span className="text-xs text-[#64748B] mr-1">Modul:</span>
                                            {Array.from({ length: track.lesson_count }, (_, i) => i + 1).map((lessonNum) => {
                                                const isCompleted = track.completed_lessons.includes(lessonNum);
                                                return (
                                                    <span
                                                        key={lessonNum}
                                                        className={`w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center ${
                                                            isCompleted
                                                                ? 'bg-[#2563EB] text-white shadow-xs'
                                                                : 'bg-[#F1F5F9] text-[#94A3B8] border border-[#E2E8F0]'
                                                        }`}
                                                        title={`Modul ${lessonNum}: ${isCompleted ? 'Selesai' : 'Belum selesai'}`}
                                                    >
                                                        {lessonNum}
                                                    </span>
                                                );
                                            })}
                                        </div>
                                    </CardContent>

                                    <CardFooter className="pt-3 border-t border-[#F1F5F9] flex justify-between items-center gap-2">
                                        <button
                                            type="button"
                                            disabled={revokingSlug === track.slug}
                                            onClick={() => handleRevokeProgress(track.slug, track.title)}
                                            className="text-xs text-[#94A3B8] hover:text-[#DC2626] font-medium transition-colors cursor-pointer"
                                            title="Cabut persetujuan data dan hapus riwayat"
                                        >
                                            {revokingSlug === track.slug ? 'Menghapus...' : 'Cabut Izin / Hapus'}
                                        </button>

                                        <Link href={track.resume_url}>
                                            <Button className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold text-xs px-4">
                                                Lanjutkan Belajar →
                                            </Button>
                                        </Link>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>

                {/* Available / Recommendations Section */}
                {available_tracks.length > 0 && (
                    <div className="space-y-4 pt-4 border-t border-[#E2E8F0]">
                        <h2 className="text-2xl font-bold text-[#0F172A] tracking-tight">
                            Jelajahi Track Lain
                        </h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {available_tracks.map((track) => (
                                <Card key={track.slug} className="border border-[#E2E8F0] bg-white rounded-[12px]">
                                    <CardHeader className="pb-2">
                                        <div className="flex justify-between items-center">
                                            <Badge variant={track.status === 'published' ? 'success' : 'secondary'}>
                                                {track.status === 'published' ? 'Tersedia' : 'Segera Hadir'}
                                            </Badge>
                                            <span className="text-xs text-[#64748B]">{track.level}</span>
                                        </div>
                                        <CardTitle className="text-base font-bold text-[#0F172A] mt-1.5">
                                            {track.title}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="text-xs text-[#475569]">
                                        <p className="line-clamp-2 leading-relaxed">{track.description}</p>
                                    </CardContent>
                                    <CardFooter className="pt-2 border-t border-[#F1F5F9]">
                                        {track.status === 'published' ? (
                                            <Link href={track.route || `/learn/${track.slug}`} className="w-full">
                                                <Button variant="secondary" size="sm" className="w-full text-xs font-semibold">
                                                    Mulai Track Ini
                                                </Button>
                                            </Link>
                                        ) : (
                                            <Button disabled variant="ghost" size="sm" className="w-full text-xs text-[#94A3B8]">
                                                Segera Hadir
                                            </Button>
                                        )}
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>
                    </div>
                )}

                {/* Privacy & Consent Governance Section */}
                <div className="pt-6 border-t border-[#E2E8F0]">
                    <Card className="border border-[#E2E8F0] bg-white rounded-[12px]">
                        <CardHeader className="pb-2">
                            <div className="flex items-center gap-2">
                                <span className="text-base">🛡️</span>
                                <CardTitle className="text-sm font-bold text-[#0F172A]">
                                    Transparansi Data & Privasi Pembelajar
                                </CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent className="text-xs text-[#475569] space-y-2 leading-relaxed">
                            <p>
                                Platform <strong>Belajar</strong> menerapkan kepemilikan data penuh oleh pembelajar (consent-first):
                            </p>
                            <ul className="list-disc pl-5 space-y-1 text-[#64748B]">
                                <li>Data yang kami simpan hanya terbatas pada indeks modul yang Anda tandai selesai dan catatan proyek capstone Anda.</li>
                                <li>Kami tidak membagikan, memprofil, atau menjual data pembelajaran Anda kepada pihak ketiga.</li>
                                <li>Anda berhak mencabut persetujuan dan menghapus seluruh riwayat progres kapan saja melalui tombol pada kartu track di atas.</li>
                            </ul>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </Layout>
    );
}
