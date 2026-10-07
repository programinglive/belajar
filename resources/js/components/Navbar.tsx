import { Button } from '@/components/ui/button';
import { Link, usePage, router } from '@inertiajs/react';
import { useState } from 'react';

interface AuthUser {
    id: number;
    name: string;
    email: string;
}

export default function Navbar() {
    const page = usePage<{ auth?: { user?: AuthUser | null } }>();
    const user = page.props.auth?.user;
    const url = page.url || '';
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const handleLogout = () => {
        router.post('/logout');
    };

    const isActive = (path: string) => {
        if (path === '/' && (url === '/' || url === '')) return true;
        if (path !== '/' && typeof url === 'string' && url.startsWith(path)) return true;
        return false;
    };

    return (
        <nav className="bg-white sticky top-0 z-50 border-b border-[#E2E8F0] shadow-xs">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Brand */}
                    <div className="flex items-center space-x-6">
                        <Link href="/" className="flex items-center space-x-2.5 group">
                            <div className="w-8 h-8 rounded-[8px] bg-[#1E3A8A] flex items-center justify-center text-white font-bold text-sm tracking-wider shadow-xs">
                                PL
                            </div>
                            <div className="flex flex-col">
                                <span className="text-sm font-extrabold tracking-tight text-[#1E3A8A] leading-tight">
                                    PROGRAMINGLIVE
                                </span>
                                <span className="text-[11px] font-semibold text-[#2563EB] -mt-0.5 tracking-wider uppercase">
                                    Belajar Platform
                                </span>
                            </div>
                        </Link>

                        {/* Desktop Navigation Links */}
                        <div className="hidden md:flex items-center space-x-1 pl-4">
                            <Link
                                href="/"
                                className={`px-3 py-2 rounded-[8px] text-sm font-medium transition-colors ${
                                    isActive('/')
                                        ? 'text-[#2563EB] bg-[#EFF6FF] font-semibold'
                                        : 'text-[#475569] hover:text-[#0F172A] hover:bg-[#F8FAFC]'
                                }`}
                            >
                                Beranda
                            </Link>
                            <Link
                                href="/tracks"
                                className={`px-3 py-2 rounded-[8px] text-sm font-medium transition-colors ${
                                    isActive('/tracks')
                                        ? 'text-[#2563EB] bg-[#EFF6FF] font-semibold'
                                        : 'text-[#475569] hover:text-[#0F172A] hover:bg-[#F8FAFC]'
                                }`}
                            >
                                Katalog Kursus
                            </Link>
                            {user && (
                                <Link
                                    href="/dashboard"
                                    className={`px-3 py-2 rounded-[8px] text-sm font-medium transition-colors ${
                                        isActive('/dashboard')
                                            ? 'text-[#2563EB] bg-[#EFF6FF] font-semibold'
                                            : 'text-[#475569] hover:text-[#0F172A] hover:bg-[#F8FAFC]'
                                    }`}
                                >
                                    Dashboard
                                </Link>
                            )}
                            <a
                                href="https://programinglive.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-3 py-2 rounded-[8px] text-sm font-medium text-[#64748B] hover:text-[#0F172A] hover:bg-[#F8FAFC] flex items-center gap-1 transition-colors"
                            >
                                <span>Portal Utama</span>
                                <svg className="w-3.5 h-3.5 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Right Action Buttons */}
                    <div className="hidden md:flex items-center space-x-3">
                        {user ? (
                            <div className="flex items-center space-x-3">
                                <Link
                                    href="/dashboard"
                                    className="flex items-center gap-2 px-3 py-1.5 rounded-[8px] border border-[#BFDBFE] bg-[#EFF6FF] text-[#1E3A8A] text-xs font-semibold hover:bg-blue-100/70 transition-colors"
                                >
                                    <span className="w-2 h-2 rounded-full bg-[#16A34A]"></span>
                                    <span>{user.name}</span>
                                </Link>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={handleLogout}
                                    className="text-[#64748B] hover:text-[#DC2626] hover:bg-red-50 text-xs"
                                >
                                    Keluar
                                </Button>
                            </div>
                        ) : (
                            <div className="flex items-center space-x-2.5">
                                <Link href="/login">
                                    <Button variant="ghost" size="sm" className="text-[#0F172A]">
                                        Masuk
                                    </Button>
                                </Link>
                                <Link href="/register">
                                    <Button size="sm" className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white">
                                        Mulai Belajar
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile Hamburger Button */}
                    <div className="flex md:hidden items-center">
                        <button
                            type="button"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            aria-label="Toggle navigation"
                            className="p-2 rounded-[8px] text-[#475569] hover:text-[#0F172A] hover:bg-[#F8FAFC]"
                        >
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                {mobileMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {mobileMenuOpen && (
                <div className="md:hidden border-t border-[#E2E8F0] bg-white px-4 pt-2 pb-4 space-y-1 shadow-sm">
                    <Link
                        href="/"
                        onClick={() => setMobileMenuOpen(false)}
                        className={`block px-3 py-2 rounded-[8px] text-sm font-medium ${
                            isActive('/') ? 'text-[#2563EB] bg-[#EFF6FF] font-semibold' : 'text-[#475569] hover:bg-[#F8FAFC]'
                        }`}
                    >
                        Beranda
                    </Link>
                    <Link
                        href="/tracks"
                        onClick={() => setMobileMenuOpen(false)}
                        className={`block px-3 py-2 rounded-[8px] text-sm font-medium ${
                            isActive('/tracks') ? 'text-[#2563EB] bg-[#EFF6FF] font-semibold' : 'text-[#475569] hover:bg-[#F8FAFC]'
                        }`}
                    >
                        Katalog Kursus
                    </Link>
                    {user && (
                        <Link
                            href="/dashboard"
                            onClick={() => setMobileMenuOpen(false)}
                            className={`block px-3 py-2 rounded-[8px] text-sm font-medium ${
                                isActive('/dashboard') ? 'text-[#2563EB] bg-[#EFF6FF] font-semibold' : 'text-[#475569] hover:bg-[#F8FAFC]'
                            }`}
                        >
                            Dashboard
                        </Link>
                    )}
                    <a
                        href="https://programinglive.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block px-3 py-2 rounded-[8px] text-sm font-medium text-[#64748B] hover:bg-[#F8FAFC]"
                    >
                        Portal ProgramingLive ↗
                    </a>
                    <div className="pt-3 border-t border-[#E2E8F0]">
                        {user ? (
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-semibold text-[#0F172A]">{user.name}</span>
                                <Button variant="ghost" size="sm" onClick={handleLogout} className="text-[#DC2626] hover:bg-red-50 text-xs">
                                    Keluar
                                </Button>
                            </div>
                        ) : (
                            <div className="flex gap-2">
                                <Link href="/login" className="flex-1" onClick={() => setMobileMenuOpen(false)}>
                                    <Button variant="secondary" size="sm" className="w-full text-xs">Masuk</Button>
                                </Link>
                                <Link href="/register" className="flex-1" onClick={() => setMobileMenuOpen(false)}>
                                    <Button size="sm" className="w-full text-xs bg-[#2563EB] hover:bg-[#1D4ED8] text-white">Mulai Belajar</Button>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}
