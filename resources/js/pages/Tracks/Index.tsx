import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Layout from '@/layouts/Layout';
import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';

export interface LessonItem {
    number: number;
    title: string;
}

export interface UserProgress {
    consent_given: boolean;
    completed_lessons: number[];
    completed_lessons_count: number;
    percentage: number;
    capstone_completed: boolean;
    capstone_submitted_at: string | null;
}

export interface Track {
    slug: string;
    title: string;
    subtitle: string | null;
    description: string;
    level: string;
    duration: string;
    lesson_count: number;
    has_capstone: boolean;
    capstone_title?: string;
    status: 'published' | 'coming_soon';
    route: string | null;
    lessons: LessonItem[];
    user_progress: UserProgress | null;
}

export default function Index({ tracks = [] }: { tracks: Track[] }) {
    const [filter, setFilter] = useState<'all' | 'published' | 'coming_soon'>('all');

    const filteredTracks = tracks.filter((track) => {
        if (filter === 'published') return track.status === 'published';
        if (filter === 'coming_soon') return track.status === 'coming_soon';
        return true;
    });

    return (
        <Layout>
            <Head title="Katalog Kursus & Jalur Belajar — Belajar" />

            <div className="bg-gradient-to-b from-blue-50/70 to-white border-b border-gray-100 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 mb-4">
                        ✨ 100% Bebas Akses & Tanpa Paywall
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
                        Katalog Kursus & Jalur Belajar
                    </h1>
                    <p className="max-w-2xl mx-auto text-lg text-gray-600">
                        Pilih jalur pembelajaran mandiri yang dirancang bertahap untuk pemula. Lengkap dengan panduan konsep, starter files, lab praktikum, dan proyek capstone nyata.
                    </p>

                    {/* Filter Tabs */}
                    <div className="flex justify-center gap-2 mt-8">
                        <button
                            type="button"
                            onClick={() => setFilter('all')}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                                filter === 'all'
                                    ? 'bg-blue-600 text-white shadow-xs'
                                    : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
                            }`}
                        >
                            Semua Track ({tracks.length})
                        </button>
                        <button
                            type="button"
                            onClick={() => setFilter('published')}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                                filter === 'published'
                                    ? 'bg-blue-600 text-white shadow-xs'
                                    : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
                            }`}
                        >
                            Tersedia Sekarang ({tracks.filter((t) => t.status === 'published').length})
                        </button>
                        <button
                            type="button"
                            onClick={() => setFilter('coming_soon')}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                                filter === 'coming_soon'
                                    ? 'bg-blue-600 text-white shadow-xs'
                                    : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
                            }`}
                        >
                            Segera Hadir ({tracks.filter((t) => t.status === 'coming_soon').length})
                        </button>
                    </div>
                </div>
            </div>

            {/* Courses Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredTracks.map((track) => {
                        const isPublished = track.status === 'published';
                        const progress = track.user_progress;
                        const isStarted = progress && (progress.completed_lessons_count > 0 || progress.capstone_completed);

                        return (
                            <Card key={track.slug} className="flex flex-col border border-gray-200 hover:shadow-md transition-shadow">
                                <CardHeader className="space-y-2 pb-4">
                                    <div className="flex justify-between items-center">
                                        <Badge variant={isPublished ? 'default' : 'secondary'} className={isPublished ? 'bg-emerald-600' : 'bg-gray-100 text-gray-600'}>
                                            {isPublished ? 'Tersedia' : 'Segera Hadir'}
                                        </Badge>
                                        <span className="text-xs font-medium text-gray-500">
                                            {track.level} · {track.duration}
                                        </span>
                                    </div>
                                    <CardTitle className="text-xl font-bold text-gray-900 leading-snug">
                                        {track.title}
                                    </CardTitle>
                                    {track.subtitle && (
                                        <CardDescription className="text-xs font-semibold text-blue-600">
                                            {track.subtitle}
                                        </CardDescription>
                                    )}
                                </CardHeader>

                                <CardContent className="flex-1 space-y-4 text-sm text-gray-600">
                                    <p className="line-clamp-3">{track.description}</p>

                                    {/* Lessons list summary */}
                                    <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                                        <div className="flex justify-between items-center text-xs font-semibold text-gray-700 mb-2">
                                            <span>Materi Pembelajaran</span>
                                            <span>{track.lesson_count} Pelajaran</span>
                                        </div>
                                        <ul className="space-y-1 text-xs text-gray-600">
                                            {track.lessons.map((lesson) => (
                                                <li key={lesson.number} className="flex items-center gap-1.5">
                                                    <span className="w-4 h-4 rounded-full bg-blue-100 text-blue-700 text-[10px] flex items-center justify-center font-bold">
                                                        {lesson.number}
                                                    </span>
                                                    <span className="truncate">{lesson.title}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Capstone badge */}
                                    {track.has_capstone && (
                                        <div className="flex items-center gap-2 text-xs text-emerald-800 bg-emerald-50 px-2.5 py-1.5 rounded-md border border-emerald-100">
                                            <span>🏆</span>
                                            <span className="font-medium">Capstone: {track.capstone_title || 'Proyek Mandiri'}</span>
                                        </div>
                                    )}

                                    {/* User progress bar if active */}
                                    {isStarted && (
                                        <div className="space-y-1.5 pt-2 border-t border-gray-100">
                                            <div className="flex justify-between text-xs font-medium text-gray-700">
                                                <span>Progres Belajar Anda</span>
                                                <span className="text-blue-600">{progress.percentage}%</span>
                                            </div>
                                            <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                                                <div
                                                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                                    style={{ width: `${progress.percentage}%` }}
                                                ></div>
                                            </div>
                                            <div className="text-[11px] text-gray-500">
                                                {progress.completed_lessons_count} dari {track.lesson_count} modul selesai
                                                {progress.capstone_completed && ' · Capstone selesai 🎉'}
                                            </div>
                                        </div>
                                    )}
                                </CardContent>

                                <CardFooter className="pt-4 border-t border-gray-100">
                                    {isPublished ? (
                                        <Link href={track.route || '/learn/first-web-page'} className="w-full">
                                            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium cursor-pointer">
                                                {isStarted ? 'Lanjutkan Belajar' : 'Mulai Belajar'}
                                            </Button>
                                        </Link>
                                    ) : (
                                        <Button disabled className="w-full bg-gray-100 text-gray-400 cursor-not-allowed">
                                            Segera Hadir
                                        </Button>
                                    )}
                                </CardFooter>
                            </Card>
                        );
                    })}
                </div>
            </div>
        </Layout>
    );
}
