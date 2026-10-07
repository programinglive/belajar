import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Head, Link } from '@inertiajs/react';

export default function Home() {
    return (
        <div className="min-h-screen bg-[#F8FAFC] flex flex-col text-[#0F172A] font-sans antialiased">
            <Head title="Belajar — ProgramingLive Coding Platform" />
            <Navbar />

            {/* Hero Section */}
            <section className="bg-white border-b border-[#E2E8F0] py-20 lg:py-28">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#EFF6FF] text-[#1E3A8A] border border-[#BFDBFE] mb-8">
                        <span className="w-2 h-2 rounded-full bg-[#2563EB]"></span>
                        Platform Belajar Pemrograman Terstruktur & 100% Gratis
                    </div>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0F172A] tracking-tight mb-6 leading-tight max-w-4xl mx-auto">
                        Belajar Coding Bertahap,{' '}
                        <span className="text-[#2563EB]">Bangun Portofolio Nyata</span>
                    </h1>
                    <p className="text-lg sm:text-xl text-[#475569] mb-10 max-w-2xl mx-auto leading-relaxed">
                        Inisiatif pendidikan teknologi dari ProgramingLive untuk menyediakan kurikulum praktis, berkas starter terbuka, dan proyek nyata tanpa biaya atau paywall.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Link href="/tracks">
                            <Button size="lg" className="w-full sm:w-auto bg-[#2563EB] hover:bg-[#1D4ED8] text-white">
                                Jelajahi Katalog Kursus
                            </Button>
                        </Link>
                        <Link href="/learn/first-web-page">
                            <Button size="lg" variant="secondary" className="w-full sm:w-auto border-[#CBD5E1]">
                                Mulai Track Web Pemula
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex-1">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-[#0F172A] tracking-tight mb-3">
                        Standar Pembelajaran Terarah
                    </h2>
                    <p className="text-base text-[#64748B] max-w-2xl mx-auto">
                        Setiap materi dibangun dengan struktur konsisten agar pemula dapat memahami konsep hingga menghasilkan proyek mandiri.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    <Card className="border border-[#E2E8F0] bg-white hover:border-[#BFDBFE] hover:shadow-sm transition-all duration-150">
                        <CardHeader className="space-y-3 pb-3">
                            <div className="w-12 h-12 rounded-[10px] bg-[#EFF6FF] border border-[#BFDBFE] text-[#1E3A8A] flex items-center justify-center font-bold text-xl shadow-xs">
                                💻
                            </div>
                            <CardTitle className="text-lg font-bold text-[#0F172A]">
                                Lab Praktikum Mandiri
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="text-sm text-[#475569] leading-relaxed">
                            Bukan sekadar video pasif. Disediakan berkas starter code yang dapat diunduh dan dijalankan secara langsung di komputer Anda.
                        </CardContent>
                    </Card>

                    <Card className="border border-[#E2E8F0] bg-white hover:border-[#BFDBFE] hover:shadow-sm transition-all duration-150">
                        <CardHeader className="space-y-3 pb-3">
                            <div className="w-12 h-12 rounded-[10px] bg-[#EFF6FF] border border-[#BFDBFE] text-[#1E3A8A] flex items-center justify-center font-bold text-xl shadow-xs">
                                🏆
                            </div>
                            <CardTitle className="text-lg font-bold text-[#0F172A]">
                                Proyek Capstone Nyata
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="text-sm text-[#475569] leading-relaxed">
                            Setiap akhir track dilengkapi proyek capstone komprehensif dengan checklist kriteria mandiri untuk menguji pemahaman Anda.
                        </CardContent>
                    </Card>

                    <Card className="border border-[#E2E8F0] bg-white hover:border-[#BFDBFE] hover:shadow-sm transition-all duration-150">
                        <CardHeader className="space-y-3 pb-3">
                            <div className="w-12 h-12 rounded-[10px] bg-[#EFF6FF] border border-[#BFDBFE] text-[#1E3A8A] flex items-center justify-center font-bold text-xl shadow-xs">
                                🛡️
                            </div>
                            <CardTitle className="text-lg font-bold text-[#0F172A]">
                                Privasi & Kendali Penuh
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="text-sm text-[#475569] leading-relaxed">
                            Semua kursus terbuka tanpa wajib mendaftar akun. Progres disimpan di browser lokal, dengan opsi sinkronisasi berizin ke dashboard.
                        </CardContent>
                    </Card>
                </div>
            </section>

            {/* Current Project Status */}
            <section className="bg-white border-y border-[#E2E8F0] py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-2xl sm:text-3xl font-bold text-[#0F172A] tracking-tight mb-2">
                            Alur Perkembangan Platform
                        </h2>
                        <p className="text-sm text-[#64748B]">
                            Pengembangan modular dan terverifikasi secara bertahap.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="text-center p-6 rounded-[12px] border border-[#E2E8F0] bg-[#F8FAFC]">
                            <div className="w-12 h-12 bg-[#1E3A8A] text-white rounded-[10px] flex items-center justify-center text-lg font-bold mx-auto mb-4 shadow-xs">
                                1
                            </div>
                            <h3 className="text-base font-bold text-[#0F172A] mb-1">Katalog & Rute Terbuka</h3>
                            <p className="text-xs text-[#475569] leading-relaxed">
                                Jalur belajar dasar web dan logika JavaScript dapat diakses bebas tanpa paywall.
                            </p>
                        </div>

                        <div className="text-center p-6 rounded-[12px] border border-[#E2E8F0] bg-[#F8FAFC]">
                            <div className="w-12 h-12 bg-[#1E3A8A] text-white rounded-[10px] flex items-center justify-center text-lg font-bold mx-auto mb-4 shadow-xs">
                                2
                            </div>
                            <h3 className="text-base font-bold text-[#0F172A] mb-1">Dashboard Pembelajar</h3>
                            <p className="text-xs text-[#475569] leading-relaxed">
                                Autentikasi akun untuk memantau modul yang selesai dan merangkum pencapaian belajar.
                            </p>
                        </div>

                        <div className="text-center p-6 rounded-[12px] border border-[#E2E8F0] bg-[#F8FAFC]">
                            <div className="w-12 h-12 bg-[#1E3A8A] text-white rounded-[10px] flex items-center justify-center text-lg font-bold mx-auto mb-4 shadow-xs">
                                3
                            </div>
                            <h3 className="text-base font-bold text-[#0F172A] mb-1">Jalur Kolaborasi Open Source</h3>
                            <p className="text-xs text-[#475569] leading-relaxed">
                                Transisi dari pembelajar mandiri menuju kontributor nyata di ekosistem open-source ProgramingLive.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="bg-[#1E3A8A] rounded-[16px] p-10 sm:p-14 text-center text-white shadow-xs">
                    <h2 className="text-3xl font-bold tracking-tight mb-4">
                        Mulai Perjalanan Koding Anda Hari Ini
                    </h2>
                    <p className="text-base text-blue-100 mb-8 max-w-xl mx-auto leading-relaxed">
                        Bergabunglah dengan platform Belajar dari ProgramingLive. 100% terbuka, praktis, dan terstruktur untuk semua kalangan.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3.5 justify-center">
                        <Link href="/register">
                            <Button size="lg" className="w-full sm:w-auto bg-[#2563EB] hover:bg-[#1D4ED8] text-white">
                                Buat Akun Gratis
                            </Button>
                        </Link>
                        <Link href="/tracks">
                            <Button size="lg" variant="secondary" className="w-full sm:w-auto bg-white text-[#1E3A8A] hover:bg-slate-50">
                                Buka Katalog Kursus
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-[#E2E8F0] bg-white py-10 mt-auto">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-[#64748B]">
                    <div className="flex items-center gap-2">
                        <span className="font-extrabold text-[#1E3A8A]">PROGRAMINGLIVE</span>
                        <span>•</span>
                        <span>Belajar Platform — Inisiatif Edukasi Terbuka Indonesia.</span>
                    </div>
                    <div className="flex gap-5">
                        <a href="https://programinglive.com" target="_blank" rel="noreferrer" className="hover:text-[#2563EB] transition-colors">
                            Portal Utama
                        </a>
                        <a href="https://github.com/programinglive/belajar" target="_blank" rel="noreferrer" className="hover:text-[#2563EB] transition-colors">
                            GitHub Repository
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
