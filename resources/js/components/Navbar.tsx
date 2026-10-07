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
        <nav className="bg-white/90 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100 shadow-xs">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Brand */}
                    <div className="flex items-center space-x-6">
                        <Link href="/" className="flex items-center space-x-2">
                            <img src="/images/logo.png" alt="Belajar Logo" className="h-8 w-auto" onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }} />
                            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                Belajar
                            </span>
                        </Link>

                        {/* Desktop Navigation Links */}
                        <div className="hidden md:flex items-center space-x-1">
                            <Link
                                href="/"
                                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                                    isActive('/')
                                        ? 'text-blue-600 bg-blue-50/60 font-semibold'
                                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                                }`}
                            >
                                Home
                            </Link>
                            <Link
                                href="/tracks"
                                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                                    isActive('/tracks')
                                        ? 'text-blue-600 bg-blue-50/60 font-semibold'
                                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                                }`}
                            >
                                Katalog Kursus
                            </Link>
                            {user && (
                                <Link
                                    href="/dashboard"
                                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                                        isActive('/dashboard')
                                            ? 'text-blue-600 bg-blue-50/60 font-semibold'
                                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                                    }`}
                                >
                                    Dashboard
                                </Link>
                            )}
                            <a
                                href="https://programinglive.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-3 py-2 rounded-md text-sm font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-50 flex items-center gap-1"
                            >
                                <span>Portal ProgramingLive</span>
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
                                    className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-medium hover:bg-blue-100 transition-colors"
                                >
                                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                                    <span>{user.name}</span>
                                </Link>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={handleLogout}
                                    className="text-gray-600 hover:text-red-600 hover:bg-red-50 text-xs cursor-pointer"
                                >
                                    Keluar
                                </Button>
                            </div>
                        ) : (
                            <div className="flex items-center space-x-2">
                                <Link href="/login">
                                    <Button variant="ghost" size="sm" className="text-gray-700 hover:text-gray-900">
                                        Sign In
                                    </Button>
                                </Link>
                                <Link href="/register">
                                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white shadow-xs">
                                        Get Started
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
                            className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-hidden"
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
                <div className="md:hidden border-t border-gray-100 bg-white px-4 pt-2 pb-4 space-y-1 shadow-lg">
                    <Link
                        href="/"
                        onClick={() => setMobileMenuOpen(false)}
                        className={`block px-3 py-2 rounded-md text-base font-medium ${
                            isActive('/') ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:bg-gray-50'
                        }`}
                    >
                        Home
                    </Link>
                    <Link
                        href="/tracks"
                        onClick={() => setMobileMenuOpen(false)}
                        className={`block px-3 py-2 rounded-md text-base font-medium ${
                            isActive('/tracks') ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:bg-gray-50'
                        }`}
                    >
                        Katalog Kursus
                    </Link>
                    {user && (
                        <Link
                            href="/dashboard"
                            onClick={() => setMobileMenuOpen(false)}
                            className={`block px-3 py-2 rounded-md text-base font-medium ${
                                isActive('/dashboard') ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:bg-gray-50'
                            }`}
                        >
                            Dashboard
                        </Link>
                    )}
                    <a
                        href="https://programinglive.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-500 hover:bg-gray-50"
                    >
                        Portal ProgramingLive ↗
                    </a>
                    <div className="pt-4 border-t border-gray-100">
                        {user ? (
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-gray-700">{user.name}</span>
                                <Button variant="ghost" size="sm" onClick={handleLogout} className="text-red-600 hover:bg-red-50 text-xs">
                                    Keluar
                                </Button>
                            </div>
                        ) : (
                            <div className="flex gap-2">
                                <Link href="/login" className="flex-1" onClick={() => setMobileMenuOpen(false)}>
                                    <Button variant="outline" className="w-full text-xs">Sign In</Button>
                                </Link>
                                <Link href="/register" className="flex-1" onClick={() => setMobileMenuOpen(false)}>
                                    <Button className="w-full text-xs bg-blue-600 text-white">Get Started</Button>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}
