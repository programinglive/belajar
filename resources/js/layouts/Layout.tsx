import Navbar from '@/components/Navbar';
import { PropsWithChildren } from 'react';

export default function Layout({ children }: PropsWithChildren) {
    return (
        <div className="min-h-screen bg-[#F8FAFC] flex flex-col text-[#0F172A] font-sans antialiased">
            <Navbar />
            <main className="flex-1">{children}</main>
            <footer className="border-t border-[#E2E8F0] bg-white py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-[#64748B]">
                    <div className="flex items-center gap-2">
                        <span className="font-extrabold text-[#1E3A8A]">PROGRAMINGLIVE</span>
                        <span>•</span>
                        <span>Belajar Platform — 100% Free & Open Access Coding Education.</span>
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
