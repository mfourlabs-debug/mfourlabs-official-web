'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { useState } from 'react';
import { GlobalPreloader } from '@/components/GlobalPreloader';

export default function Gateway() {
    const [isLoading, setIsLoading] = useState(true);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    if (isLoading) {
        return <GlobalPreloader onComplete={() => setIsLoading(false)} theme="default" />;
    }

    return (
        <main className="min-h-screen bg-black text-white font-mono flex flex-col items-center justify-center p-4">

            {/* HEADER: Minimalist Lab Branding */}
            <header className="absolute top-0 left-0 w-full p-6 border-b border-zinc-900 flex justify-between items-center">
                <div className="flex items-center gap-0.5 text-xl tracking-tighter text-white">
                    <span className="font-montserrat font-bold">M4</span>
                    <span className="italic text-zinc-500 text-3xl font-black leading-none pb-1">|</span>
                    <span className="font-montserrat ">LABS</span>
                </div>
                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center space-x-4">
                    <Link href="/the-mission" className="px-4 py-2 text-sm font-medium text-zinc-500 hover:text-white transition-colors hover:bg-white/5 rounded-full" aria-label="Read our mission">The Mission</Link>
                    <Link href="/contact" className="px-4 py-2 text-sm font-medium text-zinc-500 hover:text-white transition-colors hover:bg-white/5 rounded-full" aria-label="Contact M4 Labs">Contact</Link>
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden">
                    <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-zinc-500 hover:text-white focus:outline-none">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            {isMobileMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                            )}
                        </svg>
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="md:hidden absolute top-full left-0 w-full bg-black border-b border-zinc-900 flex flex-col items-center py-4 space-y-2 z-10">
                        <Link href="/the-mission" onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-3 text-lg font-medium text-white hover:bg-white/5 rounded-lg">The Mission</Link>
                        <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-3 text-lg font-medium text-white hover:bg-white/5 rounded-lg">Contact</Link>
                    </div>
                )}
            </header>

            {/* HERO TEXT: Abstract, not Salesy */}
            <div className="mt-20 mb-12 text-center">
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
                    DETERMINISTIC <span className="text-zinc-600">INTELLIGENCE</span>
                </h1>
                <p className="text-zinc-500 text-sm md:text-base max-w-xl mx-auto">
                    We architect Stochastic Processing Units (SPUs) for high-stakes environments.
                    Select your access level below.
                </p>
            </div>

            {/* THE 3 ROADS GRID */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-zinc-800 w-full max-w-6xl">

                {/* ROAD 1: THE PROTOCOL (Links to your Old Page) */}
                <div className="group border-r border-b md:border-b-0 border-zinc-800 p-8 hover:bg-zinc-900 transition-all cursor-pointer relative h-80 flex flex-col justify-between">
                    <div>
                        <span className="text-xs text-zinc-500 mb-2 block">01 // RESEARCH</span>
                        <h2 className="text-2xl font-bold mb-2 text-white group-hover:text-blue-400 transition-colors">
                            MVF PROTOCOL
                        </h2>
                        <p className="text-sm text-zinc-400 leading-relaxed">
                            The academic standard for SPU governance. Open-source kernel schemas and whitepapers.
                        </p>
                    </div>
                    <Link href="/mvf" className="flex items-center gap-2 text-sm text-zinc-300 group-hover:text-blue-500">
                        Access Documentation <ArrowUpRight className="w-4 h-4" />
                    </Link>
                </div>

                {/* ROAD 2: THE RED TEAM (Service) */}
                <div className="group border-r border-b md:border-b-0 border-zinc-800 p-8 hover:bg-zinc-900 transition-all cursor-pointer relative h-80 flex flex-col justify-between">
                    <div>
                        <span className="text-xs text-zinc-500 mb-2 block">02 // ADVERSARIAL</span>
                        <h2 className="text-2xl font-bold mb-2 text-white group-hover:text-red-400 transition-colors">
                            RED TEAM UNIT
                        </h2>
                        <p className="text-sm text-zinc-400 leading-relaxed">
                            Stress-testing for hallucination vectors, PII leaks, and EU AI Act compliance failures.
                        </p>
                    </div>
                    <Link href="/red-team" className="flex items-center gap-2 text-sm text-zinc-300 group-hover:text-red-500">
                        Initialize Audit <ArrowUpRight className="w-4 h-4" />
                    </Link>
                </div>

                {/* ROAD 3: THE FORTRESS (Product) */}
                <div className="group border-zinc-800 p-8 hover:bg-zinc-900 transition-all cursor-pointer relative h-80 flex flex-col justify-between">
                    <div>
                        <span className="text-xs text-zinc-500 mb-2 block">03 // INFRASTRUCTURE</span>
                        <h2 className="text-2xl font-bold mb-2 text-white group-hover:text-green-500 transition-colors">
                            IRONGRADE
                        </h2>
                        <p className="text-sm text-zinc-400 leading-relaxed">
                            Sovereign Runtime environment. On-premise deployment with ISO 42001 compliance logs.
                        </p>
                    </div>
                    <Link href="/irongrade" className="flex items-center gap-2 text-sm text-zinc-300 group-hover:text-green-500 transition-colors">
                        Request Pilot <ArrowUpRight className="w-4 h-4" />
                    </Link>
                </div>

            </div>

            {/* FOOTER: Technical Credentials */}
            <footer className="absolute bottom-6 text-center w-full">
                <p className="text-[10px] text-zinc-700 font-mono tracking-widest uppercase">
                    COPYRIGHT © 2026 MFOUR LABS
                </p>
            </footer>
        </main>
    );
}
