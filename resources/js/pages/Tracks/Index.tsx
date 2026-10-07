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
            <Head title="Katalog Kursus & Jalur Belajar — ProgramingLive Belajar" />

            {/* Header */}
            <div className="bg-white border-b border-[#E2E8F0] py-14">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#EFF6FF] text-[#1E3A8A] border border-[#BFDBFE] mb-4">
                        <span className="w-2 h-2 rounded-full bg-[#16A34A]"></span>
                        100% Akses Terbuka Tanpa Biaya
                    </div>
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F172A] tracking-tight mb-4">
                        Katalog Kursus & Jalur Belajar
                    </h1>
                    <p className="max-w-2xl mx-auto text-base text-[#475569] leading-relaxed">
                        Pilih kurikulum pemrograman berbasis lab praktikum, kode starter nyata, dan proyek capstone terverifikasi.
                    </p>

                    {/* Filter Tabs */}
                    <div className="flex justify-center gap-2 mt-8">
                        <button
                            type="button"
                            onClick={() => setFilter('all')}
                            className={`px-4 py-2 rounded-[8px] text-xs font-semibold transition-all cursor-pointer ${
                                filter === 'all'
                                    ? 'bg-[#1E3A8A] text-white shadow-xs'
                                    : 'bg-white text-[#475569] border border-[#CBD5E1] hover:bg-[#F8FAFC]'
                            }`}
                        >
                            Semua Track ({tracks.length})
                        </button>
                        <button
                            type="button"
                            onClick={() => setFilter('published')}
                            className={`px-4 py-2 rounded-[8px] text-xs font-semibold transition-all cursor-pointer ${
                                filter === 'published'
                                    ? 'bg-[#1E3A8A] text-white shadow-xs'
                                    : 'bg-white text-[#475569] border border-[#CBD5E1] hover:bg-[#F8FAFC]'
                            }`}
                        >
                            Tersedia ({tracks.filter((t) => t.status === 'published').length})
                        </button>
                        <button
                            type="button"
                            onClick={() => setFilter('coming_soon')}
                            className={`px-4 py-2 rounded-[8px] text-xs font-semibold transition-all cursor-pointer ${
                                filter === 'coming_soon'
                                    ? 'bg-[#1E3A8A] text-white shadow-xs'
                                    : 'bg-white text-[#475569] border border-[#CBD5E1] hover:bg-[#F8FAFC]'
                            }`}
                        >
                            Segera Hadir ({tracks.filter((t) => t.status === 'coming_soon').length})
                        </button>
                    </div>
                </div>
            </div>

            {/* Courses Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredTracks.map((track) => {
                        const isPublished = track.status === 'published';
                        const progress = track.user_progress;
                        const isStarted = progress && (progress.completed_lessons_count > 0 || progress.capstone_completed);

                        return (
                            <Card
                                key={track.slug}
                                className="flex flex-col border border-[#E2E8F0] bg-white rounded-[12px] hover:border-[#BFDBFE] hover:shadow-sm transition-all duration-150"
                            >
                                <CardHeader className="space-y-2 pb-3">
                                    <div className="flex justify-between items-center">
                                        <Badge
                                            variant={isPublished ? 'success' : 'secondary'}
                                        >
                                            {isPublished ? 'Tersedia' : 'Segera Hadir'}
                                        </Badge>
                                        <span className="text-xs font-medium text-[#64748B]">
                                            {track.level} • {track.duration}
                                        </span>
                                    </div>
                                    <CardTitle className="text-lg font-bold text-[#0F172A] leading-snug pt-1">
                                        {track.title}
                                    </CardTitle>
                                    {track.subtitle && (
                                        <CardDescription className="text-xs font-semibold text-[#2563EB]">
                                            {track.subtitle}
                                        </CardDescription>
                                    )}
                                </CardHeader>

                                <CardContent className="flex-1 space-y-4 text-xs text-[#475569]">
                                    <p className="line-clamp-3 leading-relaxed">{track.description}</p>

                                    {/* Lessons list summary */}
                                    <div className="bg-[#F8FAFC] rounded-[8px] p-3 border border-[#E2E8F0]">
                                        <div className="flex justify-between items-center text-xs font-semibold text-[#0F172A] mb-2">
                                            <span>Materi Pembelajaran</span>
                                            <span>{track.lesson_count} Modul</span>
                                        </div>
                                        <ul className="space-y-1.5 text-xs text-[#475569]">
                                            {track.lessons.map((lesson) => (
                                                <li key={lesson.number} className="flex items-center gap-2">
                                                    <span className="w-4 h-4 rounded-full bg-[#EFF6FF] text-[#1E3A8A] text-[10px] flex items-center justify-center font-bold">
                                                        {lesson.number}
                                                    </span>
                                                    <span className="truncate">{lesson.title}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Capstone badge */}
                                    {track.has_capstone && (
                                        <div className="flex items-center gap-2 text-xs text-[#16A34A] bg-[#DCFCE7]/50 px-2.5 py-1.5 rounded-[8px] border border-[#BBF7D0]">
                                            <span>🏆</span>
                                            <span className="font-semibold">Capstone: {track.capstone_title || 'Proyek Mandiri'}</span>
                                        </div>
                                    )}

                                    {/* User progress bar if active */}
                                    {isStarted && (
                                        <div className="space-y-1.5 pt-2 border-t border-[#E2E8F0]">
                                            <div className="flex justify-between text-xs font-medium text-[#0F172A]">
                                                <span>Progres Belajar Anda</span>
                                                <span className="text-[#2563EB] font-bold">{progress.percentage}%</span>
                                            </div>
                                            <div className="w-full bg-[#E2E8F0] h-2 rounded-full overflow-hidden">
                                                <div
                                                    className="bg-[#2563EB] h-2 rounded-full transition-all duration-300"
                                                    style={{ width: `${progress.percentage}%` }}
                                                ></div>
                                            </div>
                                            <div className="text-[11px] text-[#64748B]">
                                                {progress.completed_lessons_count} dari {track.lesson_count} modul selesai
                                                {progress.capstone_completed && ' • Capstone Selesai 🎉'}
                                            </div>
                                        </div>
                                    )}
                                </CardContent>

                                <CardFooter className="pt-4 border-t border-[#F1F5F9]">
                                    {isPublished ? (
                                        <Link href={track.route || '/learn/first-web-page'} className="w-full">
                                            <Button className="w-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white">
                                                {isStarted ? 'Lanjutkan Belajar' : 'Mulai Belajar'}
                                            </Button>
                                        </Link>
                                    ) : (
                                        <Button disabled variant="secondary" className="w-full text-[#94A3B8] border-[#E2E8F0]">
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
