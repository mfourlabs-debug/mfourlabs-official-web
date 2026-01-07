'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Mail, Globe, ShieldCheck } from 'lucide-react';
import { GlobalPreloader } from '@/components/GlobalPreloader';

export default function ContactPage() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    if (isLoading) {
        return <GlobalPreloader onComplete={() => setIsLoading(false)} theme="white" />;
    }

    return (
        <div className="min-h-screen bg-black text-zinc-300 font-mono flex flex-col items-center">

            {/* HEADER */}
            <header className="fixed top-0 left-0 w-full z-50 bg-black/90 backdrop-blur-sm border-b border-zinc-800">
                <div className="max-w-7xl mx-auto px-6 h-16 flex justify-between items-center">
                    <Link href="/" className="flex items-center gap-4 group">
                        <div className="flex items-center gap-0.5 text-xl tracking-tighter text-white group-hover:text-zinc-500 transition-colors">
                            <span className="font-montserrat font-bold">M4</span>
                            <span className="italic text-zinc-500 text-3xl font-black leading-none pb-1">|</span>
                            <span className="font-montserrat">LABS</span>
                        </div>
                        <div className="hidden md:block h-4 w-[1px] bg-zinc-800"></div>
                        <div className="hidden md:block text-xs text-zinc-500 tracking-widest">
                            SECURE CHANNEL
                        </div>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-6 text-[10px] tracking-widest text-zinc-500">
                        <Link href="/mvf" className="hover:text-white transition-colors">MVF PROTOCOL</Link>
                        <Link href="/iron-grade" className="hover:text-white transition-colors">IRON GRADE</Link>
                        <Link href="/red-team" className="hover:text-white transition-colors">RED TEAM</Link>
                        <Link href="/the-mission" className="hover:text-white transition-colors">THE MISSION</Link>
                        <div className="flex items-center gap-2 pl-6 border-l border-zinc-800">
                            <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
                            <span className="text-white">LISTENING</span>
                        </div>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="md:hidden text-zinc-400 hover:text-white"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                </div>

                {/* Mobile Menu Dropdown */}
                {isMobileMenuOpen && (
                    <div className="md:hidden border-t border-zinc-800 bg-black p-4 flex flex-col gap-4 text-xs tracking-wider">
                        <Link href="/mvf" className="text-zinc-400">MVF PROTOCOL</Link>
                        <Link href="/iron-grade" className="text-zinc-400">IRON GRADE</Link>
                        <Link href="/red-team" className="text-zinc-400">RED TEAM</Link>
                        <Link href="/the-mission" className="text-zinc-400">THE MISSION</Link>
                    </div>
                )}
            </header>

            <main className="w-full max-w-7xl border-x border-zinc-800 min-h-screen pt-32 pb-20 relative flex flex-col justify-center items-center text-center">
                {/* Background Grid */}
                <div className="absolute inset-0 z-0 pointer-events-none opacity-10"
                    style={{
                        backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)',
                        backgroundSize: '40px 40px'
                    }}>
                </div>

                <div className="relative z-10 px-6 max-w-3xl">
                    <span className="block text-zinc-500 text-xs tracking-[0.3em] mb-8 uppercase">Direct Line // HQ</span>
                    <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tighter mb-8 leading-none">
                        INITIATE <br />
                        <span className="text-zinc-700">CONTACT</span>
                    </h1>
                    <p className="text-zinc-400 text-lg md:text-xl leading-relaxed mb-12">
                        For enterprise licensing, research collaboration, or red team audits.
                        We operate on secured channels.
                    </p>

                    <a href="mailto:hq@mfourlabs.dev" className="group inline-flex items-center gap-4 bg-zinc-900 border border-zinc-800 hover:border-white px-8 py-6 rounded-lg transition-all duration-300 hover:scale-105">
                        <Mail className="w-6 h-6 text-zinc-500 group-hover:text-white transition-colors" />
                        <span className="font-mono text-xl md:text-2xl text-white tracking-wider">hq@mfourlabs.dev</span>
                    </a>

                    <div className="mt-20 flex justify-center gap-12 border-t border-zinc-800 pt-12">
                        <div className="text-center">
                            <Globe className="w-6 h-6 text-zinc-600 mx-auto mb-4" />
                            <div className="text-[10px] text-zinc-500 tracking-widest uppercase">Global Operations</div>
                            <div className="text-sm text-white font-bold">Distributed</div>
                        </div>
                        <div className="text-center">
                            <ShieldCheck className="w-6 h-6 text-zinc-600 mx-auto mb-4" />
                            <div className="text-[10px] text-zinc-500 tracking-widest uppercase">Verification</div>
                            <div className="text-sm text-white font-bold">MF-CVA-02</div>
                        </div>
                    </div>
                </div>
            </main>

            <footer className="w-full border-t border-zinc-800 bg-black py-8 text-center z-10">
                <div className="max-w-7xl mx-auto px-6 flex justify-center text-[10px] text-zinc-600 tracking-widest uppercase">
                    <div>COPYRIGHT © 2026 MFOUR LABS</div>
                </div>
            </footer>
        </div>
    );
}
