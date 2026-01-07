'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { HeroSection } from '@/components/HeroSection';
import { ManifestoSection } from '@/components/ManifestoSection';
import { CurriculumSection } from '@/components/CurriculumSection';
import { SentinelEUSection } from '@/components/SentinelEUSection';
import { AdversarialTestingSection } from '@/components/AdversarialTestingSection';
import { RoadmapSection } from '@/components/RoadmapSection';
import { GlobalPreloader } from '@/components/GlobalPreloader';
import { Menu, X, ExternalLink, Globe, ShieldCheck, Terminal, Cpu, Activity, ArrowUpRight } from 'lucide-react';

// --- MAIN PAGE COMPONENT ---
export default function ResearchLab() {
    const [isLoading, setIsLoading] = useState(true);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    if (isLoading) {
        return <GlobalPreloader onComplete={() => setIsLoading(false)} theme="blue" />;
    }

    return (
        // KEY CHANGE: font-mono to match Gateway, bg-black, selection blue
        <div className="min-h-screen bg-black text-zinc-300 font-mono flex flex-col items-center">

            <header className="fixed top-0 left-0 w-full z-50 bg-black/90 backdrop-blur-sm border-b border-zinc-800">
                <div className="max-w-7xl mx-auto px-6 h-16 flex justify-between items-center">

                    {/* Left: Brand (Gateway Style) */}
                    <Link href="/" className="flex items-center gap-4 group">
                        <div className="flex items-center gap-0.5 text-xl tracking-tighter text-white group-hover:text-blue-400 transition-colors">
                            <span className="font-montserrat font-bold">M4</span>
                            <span className="italic text-zinc-500 text-3xl font-black leading-none pb-1">|</span>
                            <span className="font-montserrat ">LABS</span>
                        </div>
                        <div className="hidden md:block h-4 w-[1px] bg-zinc-800"></div>
                        <div className="hidden md:block text-xs text-zinc-500 tracking-widest group-hover:text-blue-400/70 transition-colors">
                            RESEARCH PROTOCOL
                        </div>
                    </Link>

                    {/* Right: Nav Links (Terminal Style) */}
                    <div className="hidden md:flex items-center gap-6 text-[10px] tracking-widest text-zinc-500">
                        <a href="https://mfour-labs.gitbook.io/mfour-labs-docs/" className="hover:text-blue-400 transition-colors">DOCS</a>
                        <a href="#philosophy" className="hover:text-blue-400 transition-colors">MANIFESTO</a>
                        <a href="#roadmap" className="hover:text-blue-400 transition-colors">TRAJECTORY</a>
                        <Link href="/iron-grade" className="hover:text-blue-400 transition-colors">IRON GRADE</Link>
                        <Link href="/red-team" className="hover:text-blue-400 transition-colors">RED TEAM</Link>
                        <Link href="/the-mission" className="hover:text-blue-400 transition-colors">THE MISSION</Link>
                        <Link href="/contact" className="hover:text-blue-400 transition-colors">CONTACT</Link>

                        {/* Status Indicator */}
                        <div className="flex items-center gap-2 pl-6 border-l border-zinc-800">
                            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></span>
                            <span className="text-blue-500">ONLINE</span>
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
                        <a href="https://mfour-labs.gitbook.io/mfour-labs-docs/" className="text-zinc-400">DOCS</a>
                        <a href="#philosophy" className="text-zinc-400">MANIFESTO</a>
                        <Link href="/iron-grade" className="text-zinc-400">IRON GRADE</Link>
                        <Link href="/red-team" className="text-zinc-400">RED TEAM</Link>
                        <Link href="/the-mission" className="text-zinc-400">THE MISSION</Link>
                        <Link href="/contact" className="text-zinc-400">CONTACT</Link>
                    </div>
                )}
            </header>

            {/* --- 4. MAIN LAYOUT (Central Column) --- */}
            <main className="w-full max-w-7xl border-x border-zinc-800 min-h-screen pt-16 relative">

                {/* Decorative Grid Lines */}
                <div className="absolute inset-0 z-0 pointer-events-none opacity-20"
                    style={{
                        backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)',
                        backgroundSize: '40px 40px'
                    }}>
                </div>

                {/* Content Wrapper */}
                <div className="relative z-10">
                    <HeroSection />
                    <div id="philosophy" className="border-t border-zinc-800"><ManifestoSection /></div>
                    <div className="border-t border-zinc-800"><CurriculumSection /></div>
                    <div className="border-t border-zinc-800"><SentinelEUSection /></div>
                    <div className="border-t border-zinc-800"><AdversarialTestingSection /></div>
                    <div id="roadmap" className="border-t border-zinc-800"><RoadmapSection /></div>
                </div>

            </main>

            {/* --- 5. FOOTER (Matches Gateway Style) --- */}
            <footer className="w-full border-t border-zinc-800 bg-black py-8 text-center">
                <div className="max-w-7xl mx-auto px-6 flex justify-center text-[10px] text-zinc-600 tracking-widest uppercase">
                    <div>COPYRIGHT © 2026 MFOUR LABS</div>
                </div>
            </footer>

        </div>
    );
}
