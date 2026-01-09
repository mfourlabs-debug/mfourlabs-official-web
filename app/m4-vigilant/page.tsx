'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ArrowUpRight, ShieldAlert, Zap, Target, Crosshair, Lock, Search, FileText, Activity, Server, Database, Eye } from 'lucide-react';
import { GlobalPreloader } from '@/components/GlobalPreloader';

export default function M4VigilantPage() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [heroTitle, setHeroTitle] = useState<{
        line1: string;
        line2: string;
        line3?: string;
        key: string;
    }>({
        line1: "SYSTEM",
        line2: "GUARDIAN",
        key: "initial"
    });
    const [isExiting, setIsExiting] = useState(false);

    useEffect(() => {
        const fadeTimer = setTimeout(() => {
            setIsExiting(true);
        }, 3000);

        const switchTimer = setTimeout(() => {
            setHeroTitle({
                line1: "M4-VIGILANT",
                line2: "ACTIVE DEFENSE",
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
        return <GlobalPreloader onComplete={() => setIsLoading(false)} theme="red" />;
    }

    return (
        <div className="min-h-screen bg-black text-zinc-300 font-mono flex flex-col items-center">

            {/* HEADER */}
            <header className="fixed top-0 left-0 w-full z-50 bg-black/90 backdrop-blur-sm border-b border-zinc-800">
                <div className="max-w-7xl mx-auto px-6 h-16 flex justify-between items-center">
                    <Link href="/" className="flex items-center gap-4 group">
                        <div className="flex items-center gap-0.5 text-xl tracking-tighter text-white group-hover:text-red-500 transition-colors">
                            <span className="font-montserrat font-bold">M4</span>
                            <span className="italic text-zinc-500 text-3xl font-black leading-none pb-1">|</span>
                            <span className="font-montserrat ">LABS</span>
                        </div>
                        <div className="hidden md:block h-4 w-[1px] bg-zinc-800"></div>
                        <div className="hidden md:block text-xs text-zinc-500 tracking-widest group-hover:text-red-500/70 transition-colors">
                            M4-VIGILANT
                        </div>
                    </Link>
                    <div className="hidden md:flex items-center gap-6 text-[10px] tracking-widest text-zinc-500">
                        <Link href="/mvf" className="hover:text-red-500 transition-colors cursor-pointer uppercase">MVF Protocol</Link>
                        <Link href="/irongrade" className="hover:text-red-500 transition-colors cursor-pointer uppercase">IronGrade</Link>
                        <Link href="/the-mission" className="hover:text-red-500 transition-colors cursor-pointer uppercase">The Mission</Link>
                        <Link href="/contact" className="hover:text-red-500 transition-colors cursor-pointer uppercase">Contact</Link>
                        <div className="flex items-center gap-2 pl-6 border-l border-zinc-800">
                            <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></span>
                            <span className="text-red-500">ACTIVE</span>
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
                        <Link href="/irongrade" className="text-zinc-400">IRONGRADE</Link>
                        <Link href="/the-mission" className="text-zinc-400">THE MISSION</Link>
                        <Link href="/contact" className="text-zinc-400">CONTACT</Link>
                    </div>
                )}
            </header >

            <main className="w-full max-w-7xl border-x border-zinc-800 min-h-screen pt-32 pb-20 relative">
                {/* Background Grid */}
                <div className="absolute inset-0 z-0 pointer-events-none opacity-10"
                    style={{
                        backgroundImage: 'linear-gradient(#1a1a1a 1px, transparent 1px), linear-gradient(90deg, #1a1a1a 1px, transparent 1px)',
                        backgroundSize: '40px 40px'
                    }}>
                </div>

                <div className="relative z-10 px-6 md:px-12">
                    {/* Hero Section */}
                    <div className="max-w-4xl mx-auto text-center mb-24">
                        <span className="block text-red-500 text-xs tracking-[0.2em] mb-6 animate-slide-up opacity-0" style={{ animationDelay: '0.1s' }}>M4-VIGILANT: VIBE INTEGRITY & GOVERNANCE INTELLIGENCE LOOP</span>

                        <div className={`transition-opacity duration-700 min-h-[180px] md:min-h-[240px] ${isExiting ? 'opacity-0' : 'opacity-100'}`}>
                            <h1 key={heroTitle.key} className="text-5xl md:text-7xl font-bold text-white tracking-tighter mb-8 leading-[0.9] animate-slide-up opacity-0" style={{ animationDelay: '0.2s' }}>
                                {heroTitle.line1} <br />
                                <span className={heroTitle.key === 'initial' ? "text-zinc-600" : "text-zinc-800"}>{heroTitle.line2}</span>
                                {heroTitle.line3 && (
                                    <>
                                        <br />
                                        <span className="text-red-600">{heroTitle.line3}</span>
                                    </>
                                )}
                            </h1>
                        </div>

                        <p className="text-zinc-500 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-12 animate-slide-up opacity-0" style={{ animationDelay: '0.4s' }}>
                            We are not pentesters. We are the Surgeon who finds the cancer (Vigilance), removes it (The Fix), and installs a life-support system (IronGrade Runtime).
                            <span className="block mt-4 text-zinc-400">From Passive Governance to <span className="text-white font-bold">Active Enforcement</span>.</span>
                        </p>
                    </div>

                    {/* 1. M4 Offensive Stack */}
                    <div className="mb-24">
                        <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                            <Crosshair className="text-red-500" />
                            THE TOOLING: M4 OFFENSIVE STACK
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="border border-zinc-800 bg-zinc-900/20 p-8">
                                <h3 className="text-lg font-bold text-white mb-4">Internal: MVF Adversarial Engine</h3>
                                <p className="text-zinc-500 mb-6 text-sm leading-relaxed">
                                    Our custom Python-based automation engine that iterates M4-VIGILANT Kernels. Unlike off-the-shelf tools, it uses <strong>Custom Payload Splitting</strong> logic to bypass standard filters and test "Shadow Data" leaks.
                                </p>
                                <div className="flex gap-2 text-xs">
                                    <span className="bg-red-900/20 text-red-500 px-2 py-1 rounded border border-red-900/30">Custom Kernels</span>
                                    <span className="bg-red-900/20 text-red-500 px-2 py-1 rounded border border-red-900/30">Shadow Data Probe</span>
                                </div>
                            </div>
                            <div className="border border-zinc-800 bg-zinc-900/20 p-8">
                                <h3 className="text-lg font-bold text-white mb-4">Industry Benchmarks</h3>
                                <div className="space-y-4 text-sm text-zinc-500">
                                    <div className="flex justify-between border-b border-zinc-800 pb-2">
                                        <span>Garak</span>
                                        <span className="text-zinc-400">Vulnerability Scanning</span>
                                    </div>
                                    <div className="flex justify-between border-b border-zinc-800 pb-2">
                                        <span>Microsoft PyRIT</span>
                                        <span className="text-zinc-400">Supply Chain Testing</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Inspect (UK AISI)</span>
                                        <span className="text-zinc-400">Safety Standards</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 2. Auditability & Traceability */}
                    <div className="mb-24 border-t border-zinc-800 pt-12">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            <div>
                                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                                    <Search className="text-red-500" />
                                    AUDITABILITY & TRACEABILITY
                                </h2>
                                <p className="text-zinc-500 mb-8 leading-relaxed">
                                    Traditional reports are PDFs of survey answers. M4 Reports are <strong>Forensic Evidence</strong>.
                                    We map every failure to specific EU AI Act Articles (10, 13, 15) and provide a cryptographic proof of audit.
                                </p>
                                <div className="space-y-6">
                                    <div className="flex gap-4">
                                        <div className="mt-1"><Lock className="w-5 h-5 text-zinc-400" /></div>
                                        <div>
                                            <h4 className="text-white font-bold text-sm">Hash-Chain Trace</h4>
                                            <p className="text-xs text-zinc-600 mt-1">Every prompt is cryptographically hashed and logged. If a regulator asks, "Did you test for X?", you show the hash-chain log.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="mt-1"><Activity className="w-5 h-5 text-zinc-400" /></div>
                                        <div>
                                            <h4 className="text-white font-bold text-sm">Vibe Integrity Score (VIS) Delta</h4>
                                            <p className="text-xs text-zinc-600 mt-1">We don't just say "Fail". We measure Stochastic Variance. "Zone 2 Stress Test dropped VIS from 0.98 to 0.42."</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="relative border border-zinc-800 bg-black p-6 font-mono text-xs">
                                <div className="absolute top-0 right-0 p-2 bg-red-900/10 text-red-500 text-[10px] border-b border-l border-zinc-800">FORENSIC LOG SAMPLE</div>
                                <div className="space-y-3 text-zinc-500 mt-4">
                                    <div className="flex gap-4">
                                        <span className="text-zinc-700">TIMESTAMP</span>
                                        <span className="text-zinc-400">2026-01-09 T14:22:41Z</span>
                                    </div>
                                    <div className="flex gap-4">
                                        <span className="text-zinc-700">HASH</span>
                                        <span className="text-green-500 truncate">a7f9c...8b2d1</span>
                                    </div>
                                    <div className="flex gap-4">
                                        <span className="text-zinc-700">ATTACK_VEC</span>
                                        <span className="text-red-500">PROMPT_INJECTION_RECURSIVE</span>
                                    </div>
                                    <div className="flex gap-4">
                                        <span className="text-zinc-700">VIS_DELTA</span>
                                        <span className="text-yellow-500">-0.45 [CRITICAL]</span>
                                    </div>
                                    <div className="border-t border-zinc-800 my-2"></div>
                                    <div className="text-zinc-600 italic">
                                        "EU AI ACT ART.15 VIOLATION DETECTED. REMEDIATION KERNEL [FIN-SEC-04] SUGGESTED."
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 3. The End-to-End Workflow */}
                    <div className="mb-24 border-t border-zinc-800 pt-12">
                        <h2 className="text-3xl font-bold text-white mb-2 text-center">THE M4-VIGILANT</h2>
                        <p className="text-center text-zinc-500 text-sm mb-12 uppercase tracking-widest">Zero to Finish // Closed Loop Security</p>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            {[
                                {
                                    step: "01",
                                    title: "Black Box Scoping",
                                    desc: "Define the 'Blast Radius'. Establish Rules of Engagement (ROE) and emergency contacts."
                                },
                                {
                                    step: "02",
                                    title: "Adversarial Assault",
                                    desc: "100+ specialized attacks using Targeted Persona Kernels (e.g., 'Disgruntled Employee')."
                                },
                                {
                                    step: "03",
                                    title: "Forensic Report",
                                    desc: "Raw logs, VIS Delta, and the 'Remediation Roadmap' with ready-to-use Solution Kernels."
                                },
                                {
                                    step: "04",
                                    title: "IronGrade Pivot",
                                    desc: "Installation of the IronGrade Runtime middleware to automate the 'Mirror Layer' checks."
                                }
                            ].map((item, i) => (
                                <div key={i} className="group border border-zinc-800 p-6 hover:bg-zinc-900/30 hover:border-red-500/30 transition-colors">
                                    <div className="text-4xl font-black text-zinc-800 mb-4 group-hover:text-red-500/50 transition-colors">{item.step}</div>
                                    <h3 className="text-white font-bold mb-2">{item.title}</h3>
                                    <p className="text-zinc-500 text-sm">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 4. Comparative Advantage (Generic) */}
                    <div className="mb-24 border-t border-zinc-800 pt-12">
                        <h2 className="text-2xl font-bold text-white mb-8 text-center uppercase tracking-widest">Comparative Advantage</h2>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-zinc-800 text-xs text-zinc-500 tracking-widest uppercase">
                                        <th className="p-4">Feature</th>
                                        <th className="p-4">Traditional Governance Tools</th>
                                        <th className="p-4 text-white">MFOUR LABS (M4-VIGILANT)</th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm">
                                    <tr className="border-b border-zinc-800/50">
                                        <td className="p-4 font-bold text-zinc-400">Focus</td>
                                        <td className="p-4 text-zinc-600">Compliance Checklists</td>
                                        <td className="p-4 text-white font-bold">Adversarial Integrity</td>
                                    </tr>
                                    <tr className="border-b border-zinc-800/50">
                                        <td className="p-4 font-bold text-zinc-400">Output</td>
                                        <td className="p-4 text-zinc-600">Static PDF Report</td>
                                        <td className="p-4 text-white font-bold">Interactive Remediation Kernel</td>
                                    </tr>
                                    <tr className="border-b border-zinc-800/50">
                                        <td className="p-4 font-bold text-zinc-400">Method</td>
                                        <td className="p-4 text-zinc-600">Questionnaires & Surveys</td>
                                        <td className="p-4 text-white font-bold">Active Code Injection & stress testing</td>
                                    </tr>
                                    <tr className="border-b border-zinc-800/50">
                                        <td className="p-4 font-bold text-zinc-400">Traceability</td>
                                        <td className="p-4 text-zinc-600">Self-Reported</td>
                                        <td className="p-4 text-white font-bold">Cryptographic Forensic Logs</td>
                                    </tr>
                                    <tr>
                                        <td className="p-4 font-bold text-zinc-400">Result</td>
                                        <td className="p-4 text-zinc-600">"You have a problem."</td>
                                        <td className="p-4 text-white font-bold">"We broke it, here is the Cure."</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* 5. IronGrade Upsell */}
                    <div className="mb-24 pt-12 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-red-900/5 group-hover:bg-red-900/10 transition-colors z-0"></div>
                        <div className="relative z-10 p-8 md:p-12 border border-red-900/20">
                            <div className="flex flex-col md:flex-row gap-8 justify-between items-start">
                                <div className="flex-1">
                                    <span className="text-red-500 text-xs tracking-widest uppercase mb-2 block">The Fortification</span>
                                    <h2 className="text-3xl font-bold text-white mb-6">IRONGRADE SOVEREIGN UNIT</h2>
                                    <p className="text-zinc-400 mb-6 leading-relaxed max-w-xl">
                                        The Kernel we give you protects your logic. But to ensure this never happens again at the infrastructure level, you need the IronGrade Runtime.
                                        <br /><br />
                                        <span className="text-white">The Hybrid Vault Architecture:</span> We install the IronGrade Binary on your local server (Data Sovereignty) while verifying integrity via our Cloud Brain (IP Protection).
                                    </p>
                                    <div className="flex gap-4">

                                        <Link href="/irongrade" className="flex items-center gap-2 px-6 py-3 text-xs font-bold tracking-widest text-white border border-zinc-800 hover:border-red-500 transition-colors uppercase">
                                            View Architecture <ArrowUpRight className="w-4 h-4" />
                                        </Link>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                    {/* Status Log */}
                    <div className="border-t border-zinc-800 pt-12">
                        <div className="font-mono text-[10px] text-zinc-600 space-y-2">
                            <div className="flex justify-between">
                                <span>M4-VIGILANT_VERSION</span>
                                <span className="text-red-500">2.4.1 [ACTIVE]</span>
                            </div>
                            <div className="flex justify-between">
                                <span>VIS_CALCULATION_ENGINE</span>
                                <span>ONLINE</span>
                            </div>
                            <div className="flex justify-between">
                                <span>COMPLIANCE_STANDARD</span>
                                <span>EU AI ACT ART.15 // NIST AI 100-1</span>
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
