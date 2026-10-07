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
            <Head title="Dashboard Pembelajar — Belajar" />

            {/* Header Greeting */}
            <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-800 text-white py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-white/20 text-blue-100 backdrop-blur-xs mb-3">
                                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                                Dashboard Pembelajar
                            </div>
                            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
                                Halo, {user?.name || 'Pembelajar'}! 👋
                            </h1>
                            <p className="text-blue-100 text-sm md:text-base mt-1 max-w-2xl">
                                Selamat datang kembali di ruang belajarmu. Pantau pencapaian, lanjutkan modul yang sedang berjalan, dan bangun portofolio langkah demi langkah.
                            </p>
                        </div>
                        <div className="flex items-center gap-3">
                            <Link href="/tracks">
                                <Button variant="secondary" className="bg-white text-blue-700 hover:bg-blue-50 font-semibold shadow-xs">
                                    Jelajahi Katalog
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
                {notification && (
                    <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-3 rounded-lg text-sm flex justify-between items-center shadow-xs">
                        <span>{notification}</span>
                        <button
                            type="button"
                            onClick={() => setNotification(null)}
                            className="text-emerald-600 hover:text-emerald-900 font-bold ml-4"
                        >
                            ✕
                        </button>
                    </div>
                )}

                {/* 3 Metric Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <Card className="border border-blue-100 bg-linear-to-br from-white to-blue-50/40 shadow-xs">
                        <CardHeader className="pb-2">
                            <CardDescription className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
                                Track Diikuti
                            </CardDescription>
                            <CardTitle className="text-3xl font-extrabold text-gray-900">
                                {stats.tracks_started}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-xs text-gray-500">Jalur pembelajaran aktif yang sedang atau telah diselesaikan</p>
                        </CardContent>
                    </Card>

                    <Card className="border border-indigo-100 bg-linear-to-br from-white to-indigo-50/40 shadow-xs">
                        <CardHeader className="pb-2">
                            <CardDescription className="text-xs font-semibold text-indigo-600 uppercase tracking-wider">
                                Modul Pelajaran Selesai
                            </CardDescription>
                            <CardTitle className="text-3xl font-extrabold text-gray-900">
                                {stats.lessons_completed}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-xs text-gray-500">Materi teori dan lab praktikum yang berhasil dituntaskan</p>
                        </CardContent>
                    </Card>

                    <Card className="border border-emerald-100 bg-linear-to-br from-white to-emerald-50/40 shadow-xs">
                        <CardHeader className="pb-2">
                            <CardDescription className="text-xs font-semibold text-emerald-600 uppercase tracking-wider">
                                Capstone Selesai
                            </CardDescription>
                            <CardTitle className="text-3xl font-extrabold text-emerald-700">
                                {stats.capstones_completed}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-xs text-gray-500">Proyek portofolio nyata yang siap diverifikasi</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Active Learning Tracks Section */}
                <div className="space-y-4">
                    <div className="flex justify-between items-baseline">
                        <h2 className="text-2xl font-bold text-gray-900">
                            Lanjutkan Pembelajaran
                        </h2>
                        <Link href="/tracks" className="text-sm font-semibold text-blue-600 hover:text-blue-800">
                            Semua Track ({active_tracks.length + available_tracks.length}) →
                        </Link>
                    </div>

                    {active_tracks.length === 0 ? (
                        <Card className="border border-dashed border-gray-300 bg-white text-center py-12 px-4">
                            <div className="max-w-md mx-auto space-y-4">
                                <div className="w-16 h-16 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-2xl mx-auto">
                                    🚀
                                </div>
                                <h3 className="text-lg font-bold text-gray-900">Belum Ada Track Pembelajaran Aktif</h3>
                                <p className="text-sm text-gray-600">
                                    Mulai langkah perdanamu dengan mempelajari dasar web modern (HTML, CSS responsif, dan portofolio capstone).
                                </p>
                                <div className="pt-2">
                                    <Link href="/learn/first-web-page">
                                        <Button className="bg-blue-600 hover:bg-blue-700 text-white font-medium">
                                            Mulai Track Web Pertama Sekarang
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </Card>
                    ) : (
                        <div className="grid md:grid-cols-2 gap-6">
                            {active_tracks.map((track) => (
                                <Card key={track.slug} className="border border-gray-200 shadow-xs hover:shadow-md transition-shadow">
                                    <CardHeader className="pb-3">
                                        <div className="flex justify-between items-start gap-2">
                                            <div>
                                                <Badge variant="outline" className="text-xs text-blue-700 bg-blue-50 border-blue-200 mb-1">
                                                    {track.level} · {track.duration}
                                                </Badge>
                                                <CardTitle className="text-xl font-bold text-gray-900">
                                                    {track.title}
                                                </CardTitle>
                                                {track.subtitle && (
                                                    <CardDescription className="text-xs text-gray-500 font-medium">
                                                        {track.subtitle}
                                                    </CardDescription>
                                                )}
                                            </div>
                                            <span className="text-lg font-extrabold text-blue-600">
                                                {track.percentage}%
                                            </span>
                                        </div>
                                    </CardHeader>

                                    <CardContent className="space-y-4 text-sm">
                                        {/* Progress bar */}
                                        <div className="space-y-1.5">
                                            <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
                                                <div
                                                    className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                                                    style={{ width: `${track.percentage}%` }}
                                                ></div>
                                            </div>
                                            <div className="flex justify-between text-xs text-gray-500">
                                                <span>{track.completed_lessons_count} dari {track.lesson_count} modul selesai</span>
                                                <span>{track.capstone_completed ? '🏆 Capstone Selesai' : '⏳ Capstone Belum'}</span>
                                            </div>
                                        </div>

                                        {/* Completed lesson badges */}
                                        <div className="flex items-center gap-1.5 pt-1">
                                            <span className="text-xs text-gray-500 mr-1">Modul:</span>
                                            {Array.from({ length: track.lesson_count }, (_, i) => i + 1).map((lessonNum) => {
                                                const isCompleted = track.completed_lessons.includes(lessonNum);
                                                return (
                                                    <span
                                                        key={lessonNum}
                                                        className={`w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center ${
                                                            isCompleted
                                                                ? 'bg-blue-600 text-white shadow-xs'
                                                                : 'bg-gray-100 text-gray-400 border border-gray-200'
                                                        }`}
                                                        title={`Modul ${lessonNum}: ${isCompleted ? 'Selesai' : 'Belum selesai'}`}
                                                    >
                                                        {lessonNum}
                                                    </span>
                                                );
                                            })}
                                        </div>
                                    </CardContent>

                                    <CardFooter className="pt-3 border-t border-gray-100 flex justify-between items-center gap-2">
                                        <button
                                            type="button"
                                            disabled={revokingSlug === track.slug}
                                            onClick={() => handleRevokeProgress(track.slug, track.title)}
                                            className="text-xs text-gray-400 hover:text-red-600 font-medium transition-colors cursor-pointer"
                                            title="Cabut persetujuan data dan hapus riwayat"
                                        >
                                            {revokingSlug === track.slug ? 'Menghapus...' : 'Cabut Izin / Hapus'}
                                        </button>

                                        <Link href={track.resume_url}>
                                            <Button className="bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs px-4">
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
                    <div className="space-y-4 pt-4 border-t border-gray-200">
                        <h2 className="text-2xl font-bold text-gray-900">
                            Jelajahi Track Lain
                        </h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {available_tracks.map((track) => (
                                <Card key={track.slug} className="border border-gray-200 bg-white">
                                    <CardHeader className="pb-2">
                                        <div className="flex justify-between items-center">
                                            <Badge variant={track.status === 'published' ? 'default' : 'secondary'} className="text-[10px]">
                                                {track.status === 'published' ? 'Tersedia' : 'Segera Hadir'}
                                            </Badge>
                                            <span className="text-xs text-gray-500">{track.level}</span>
                                        </div>
                                        <CardTitle className="text-lg font-bold text-gray-900 mt-1">
                                            {track.title}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="text-xs text-gray-600">
                                        <p className="line-clamp-2">{track.description}</p>
                                    </CardContent>
                                    <CardFooter className="pt-2">
                                        {track.status === 'published' ? (
                                            <Link href={track.route || `/learn/${track.slug}`} className="w-full">
                                                <Button variant="outline" size="sm" className="w-full text-xs">
                                                    Mulai Track Ini
                                                </Button>
                                            </Link>
                                        ) : (
                                            <Button disabled variant="ghost" size="sm" className="w-full text-xs text-gray-400">
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
                <div className="pt-6 border-t border-gray-200">
                    <Card className="border border-gray-200 bg-gray-50/70">
                        <CardHeader className="pb-3">
                            <div className="flex items-center gap-2">
                                <span className="text-base">🛡️</span>
                                <CardTitle className="text-base font-bold text-gray-900">
                                    Kebijakan Privasi & Kepemilikan Data Progres
                                </CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent className="text-xs text-gray-600 space-y-2">
                            <p>
                                Platform <strong>Belajar</strong> menerapkan prinsip transparansi penuh dan persetujuan eksplisit (consent-first):
                            </p>
                            <ul className="list-disc pl-5 space-y-1">
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
