'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ArrowUpRight, ShieldCheck, Server, Lock, Globe, Cpu, FileText, Activity } from 'lucide-react';
import { LabRegistration } from '@/components/LabRegistration';
import { GlobalPreloader } from '@/components/GlobalPreloader';

export default function IronGradePage() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [showRegistration, setShowRegistration] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [heroTitle, setHeroTitle] = useState<{
        line1: string;
        line2: string;
        line3?: string;
        key: string;
    }>({
        line1: "ELIMINATE",
        line2: "THE VIBE",
        key: "initial"
    });
    const [isExiting, setIsExiting] = useState(false);

    useEffect(() => {
        const fadeTimer = setTimeout(() => {
            setIsExiting(true);
        }, 3000);

        const switchTimer = setTimeout(() => {
            setHeroTitle({
                line1: "DETERMINISTIC",
                line2: "GOVERNANCE",
                line3: "INFRASTRUCTURE",
                key: "final"
            });
            setIsExiting(false);
        }, 3800);

        return () => {
            clearTimeout(fadeTimer);
            clearTimeout(switchTimer);
        };
    }, []);

    if (isLoading) {
        return <GlobalPreloader onComplete={() => setIsLoading(false)} theme="green" />;
    }

    return (
        <div className="min-h-screen bg-black text-zinc-300 font-mono flex flex-col items-center">
            {/* Registration Modal */}
            {showRegistration && <LabRegistration onClose={() => setShowRegistration(false)} />}

            {/* HEADER */}
            <header className="fixed top-0 left-0 w-full z-50 bg-black/90 backdrop-blur-sm border-b border-zinc-800">
                <div className="max-w-7xl mx-auto px-6 h-16 flex justify-between items-center">
                    <Link href="/" className="flex items-center gap-4 group">
                        <div className="flex items-center gap-0.5 text-xl tracking-tighter text-white group-hover:text-green-500 transition-colors">
                            <span className="font-montserrat font-bold">M4</span>
                            <span className="italic text-zinc-500 text-3xl font-black leading-none pb-1">|</span>
                            <span className="font-montserrat ">LABS</span>
                        </div>
                        <div className="hidden md:block h-4 w-[1px] bg-zinc-800"></div>
                        <div className="hidden md:block text-xs text-zinc-500 tracking-widest group-hover:text-green-500/70 transition-colors">
                            IRONGRADE UNIT
                        </div>
                    </Link>
                    <div className="hidden md:flex items-center gap-6 text-[10px] tracking-widest text-zinc-500">
                        <Link href="/mvf" className="hover:text-green-500 transition-colors cursor-pointer uppercase">MVF Protocol</Link>
                        <Link href="/red-team" className="hover:text-green-500 transition-colors cursor-pointer uppercase">Red Team</Link>
                        <Link href="/the-mission" className="hover:text-green-500 transition-colors cursor-pointer uppercase">The Mission</Link>
                        <Link href="/contact" className="hover:text-green-500 transition-colors cursor-pointer uppercase">Contact</Link>
                        <div className="flex items-center gap-2 pl-6 border-l border-zinc-800">
                            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                            <span className="text-green-500">OPERATIONAL</span>
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
                        <Link href="/red-team" className="text-zinc-400">RED TEAM</Link>
                        <Link href="/the-mission" className="text-zinc-400">THE MISSION</Link>
                        <Link href="/contact" className="text-zinc-400">CONTACT</Link>
                    </div>
                )}
            </header >

            <main className="w-full max-w-7xl border-x border-zinc-800 min-h-screen pt-32 pb-20 relative">
                {/* Background Grid */}
                <div className="absolute inset-0 z-0 pointer-events-none opacity-10"
                    style={{
                        backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)',
                        backgroundSize: '40px 40px'
                    }}>
                </div>

                <div className="relative z-10 px-6 md:px-12">
                    {/* Hero Section */}
                    {/* Hero Section */}
                    <div className="max-w-4xl mx-auto text-center mb-24">
                        <span className="block text-green-500 text-xs tracking-[0.2em] mb-6 animate-slide-up opacity-0" style={{ animationDelay: '0.1s' }}>INFRASTRUCTURE LEVEL: IRONGRADE</span>

                        <div className={`transition-opacity duration-700 min-h-[180px] md:min-h-[240px] ${isExiting ? 'opacity-0' : 'opacity-100'}`}>
                            <h1 key={heroTitle.key} className="text-5xl md:text-7xl font-bold text-white tracking-tighter mb-8 leading-[0.9] animate-slide-up opacity-0" style={{ animationDelay: '0.2s' }}>
                                {heroTitle.line1} <br />
                                <span className={heroTitle.key === 'initial' ? "text-zinc-600" : "text-zinc-800"}>{heroTitle.line2}</span>
                                {heroTitle.line3 && (
                                    <>
                                        <br />
                                        {heroTitle.line3}
                                    </>
                                )}
                            </h1>
                        </div>

                        <p className="text-zinc-500 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-12 animate-slide-up opacity-0" style={{ animationDelay: '0.4s' }}>
                            Sovereign AI security for high-risk deployments. Beyond probabilistic guessing—enforcing deterministic truth through Multi-layer Variable Frameworks (MVF) and real-time hallucination interception.
                        </p>

                        <div className="animate-slide-up opacity-0" style={{ animationDelay: '0.5s' }}>
                            <button
                                onClick={() => setShowRegistration(true)}
                                className="group relative inline-flex items-center gap-3 px-8 py-4 bg-zinc-900 border border-zinc-700 hover:border-green-500/50 rounded-lg overflow-hidden transition-all duration-300"
                            >
                                <span className="absolute inset-0 bg-green-500/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                                <span className="relative font-bold text-white group-hover:text-green-500 transition-colors tracking-wider text-sm">
                                    REQUEST ACCESS ID
                                </span>
                                <ArrowUpRight className="relative w-4 h-4 text-zinc-500 group-hover:text-green-500 transition-colors" />
                            </button>
                        </div>
                    </div>

                    {/* Features Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
                        {[
                            {
                                icon: <Cpu className="w-6 h-6" />,
                                title: "MVF System Config",
                                desc: "Multi-layer Variable Frameworks that lock AI agents into deterministic logic gates. No prose. No drift. Pure compliance."
                            },
                            {
                                icon: <FileText className="w-6 h-6" />,
                                title: "Anchor Layer (RAG)",
                                desc: "Physically isolated context injection. AI only speaks from verified Anchors (Statutes, Laws). If it's not in the Anchor, the system stays silent."
                            },
                            {
                                icon: <Activity className="w-6 h-6" />,
                                title: "Mirror Layer Protocol",
                                desc: "A secondary verification layer that intercepts every output. If the VIS (Visual Integrity Score) drops below 1.0, the request is instantly blocked."
                            }
                        ].map((feature, i) => (
                            <div key={i} className="group p-8 border border-zinc-800 hover:border-green-500/30 bg-black/50 transition-colors">
                                <div className="text-zinc-600 group-hover:text-green-500 mb-6 transition-colors">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold text-white mb-4 group-hover:text-green-500 transition-colors">
                                    {feature.title}
                                </h3>
                                <p className="text-sm text-zinc-500 leading-relaxed">
                                    {feature.desc}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* 3. The Iron Gauntlet */}
                    <div className="mb-24 border-t border-zinc-800 pt-12">
                        <h2 className="text-3xl font-bold text-white mb-8 text-center bg-clip-text text-transparent bg-gradient-to-b from-white to-zinc-500">THE IRON GAUNTLET</h2>
                        <p className="text-zinc-500 text-center max-w-2xl mx-auto mb-12">
                            Every request to an IronGrade Gateway undergoes a 5-layer cryptographic and semantic gauntlet before delivery.
                        </p>
                        <div className="space-y-4 font-mono text-sm max-w-3xl mx-auto">
                            {[
                                { step: '01', title: 'IDENTITY LAYER', desc: 'Biometric & Credential Verification' },
                                { step: '02', title: 'ANCHOR LAYER', desc: 'Verified Truth Retrieval (1000-token chunks)' },
                                { step: '03', title: 'KERNEL LAYER', desc: 'MVF Kernel Logic Gate Execution' },
                                { step: '04', title: 'MODEL LAYER', desc: 'Air-Gapped Sovereign Runtime' },
                                { step: '05', title: 'MIRROR LAYER', desc: 'Semantic Audit & Fail-Safe' }
                            ].map((layer, i) => (
                                <div key={i} className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4 p-4 border border-zinc-800 bg-zinc-900/30 hover:bg-zinc-900/50 transition-colors">
                                    <span className="text-green-500 font-bold shrink-0">{layer.step}</span>
                                    <span className="text-white font-bold shrink-0">{layer.title}</span>
                                    <span className="hidden md:block w-px h-4 bg-zinc-700 shrink-0"></span>
                                    <span className="text-zinc-500">{layer.desc}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 4. Why IronGrade? (Comparison Table) */}
                    <div className="mb-24 border-t border-zinc-800 pt-12">
                        <h2 className="text-3xl font-bold text-white mb-12 text-center bg-clip-text text-transparent bg-gradient-to-b from-white to-zinc-500">BRONZE VS. IRON</h2>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse font-mono text-sm">
                                <thead>
                                    <tr className="border-b border-zinc-800 text-zinc-500 bg-zinc-900/20">
                                        <th className="p-4 whitespace-nowrap">FEATURE</th>
                                        <th className="p-4 whitespace-nowrap">BRONZE GRADE (INDUSTRY)</th>
                                        <th className="p-4 whitespace-nowrap text-green-500">IRONGRADE (OUR INFRASTRUCTURE)</th>
                                    </tr>
                                </thead>
                                <tbody className="text-zinc-300">
                                    <tr className="border-b border-zinc-800/50 hover:bg-zinc-900/20">
                                        <td className="p-4 font-bold text-white">ACCURACY</td>
                                        <td className="p-4 text-zinc-500">Probabilistic (Best Guess)</td>
                                        <td className="p-4 text-green-500">Deterministic (Verified Fact)</td>
                                    </tr>
                                    <tr className="border-b border-zinc-800/50 hover:bg-zinc-900/20">
                                        <td className="p-4 font-bold text-white">HALLUCINATIONS</td>
                                        <td className="p-4 text-zinc-500">Hidden / "Helpful"</td>
                                        <td className="p-4 text-green-500">Hard-Blocked by Mirror Layer</td>
                                    </tr>
                                    <tr className="border-b border-zinc-800/50 hover:bg-zinc-900/20">
                                        <td className="p-4 font-bold text-white">GOVERNANCE</td>
                                        <td className="p-4 text-zinc-500">Manual Prompting</td>
                                        <td className="p-4 text-green-500">MVF Kernel Enforcement</td>
                                    </tr>
                                    <tr className="hover:bg-zinc-900/20">
                                        <td className="p-4 font-bold text-white">SECURITY</td>
                                        <td className="p-4 text-zinc-500">Public API / Shared Memory</td>
                                        <td className="p-4 text-green-500">Air-Gapped / Sovereign Runtime</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Status Log */}
                    <div className="border-t border-zinc-800 pt-12">
                        <div className="font-mono text-[10px] text-zinc-600 space-y-2">
                            <div className="flex justify-between">
                                <span>COMPLIANCE_LEVEL</span>
                                <span className="text-green-500">EU AI ACT // NIST AAL3</span>
                            </div>
                            <div className="flex justify-between">
                                <span>DETERMINISTIC_SYNC</span>
                                <span>ACTIVE [VIS: 1.0]</span>
                            </div>
                            <div className="flex justify-between">
                                <span>HALLUCINATION_BLOCK_RATE</span>
                                <span>100.00%</span>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <footer className="w-full border-t border-zinc-800 bg-black py-8 text-center z-10">
                <div className="max-w-7xl mx-auto px-6 flex justify-center text-[10px] text-zinc-600 tracking-widest uppercase">
                    <div>COPYRIGHT © 2026 MFOUR LABS</div>
                </div>
            </footer>
        </div >
    );
}
