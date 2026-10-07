import Navbar from '@/components/Navbar';
import { PropsWithChildren } from 'react';

export default function Layout({ children }: PropsWithChildren) {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col text-gray-900">
            <Navbar />
            <main className="flex-1">{children}</main>
            <footer className="border-t border-gray-200 bg-white py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-500">
                    <p>© 2026 Belajar — ProgramingLive Initiative. 100% Free & Open Access.</p>
                    <div className="flex gap-4">
                        <a href="https://programinglive.com" target="_blank" rel="noreferrer" className="hover:text-gray-900">
                            ProgramingLive Portal
                        </a>
                        <a href="https://github.com/programinglive/belajar" target="_blank" rel="noreferrer" className="hover:text-gray-900">
                            GitHub Repository
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
