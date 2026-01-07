'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ArrowUpRight, ShieldAlert, Zap, Target, Crosshair } from 'lucide-react';
import { GlobalPreloader } from '@/components/GlobalPreloader';

export default function RedTeamPage() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [heroTitle, setHeroTitle] = useState<{
        line1: string;
        line2: string;
        line3?: string;
        key: string;
    }>({
        line1: "BREAK",
        line2: "THE SYSTEM",
        key: "initial"
    });
    const [isExiting, setIsExiting] = useState(false);

    useEffect(() => {
        const fadeTimer = setTimeout(() => {
            setIsExiting(true);
        }, 3000);

        const switchTimer = setTimeout(() => {
            setHeroTitle({
                line1: "ADVERSARIAL",
                line2: "GOVERNANCE",
                line3: "AUDITS",
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
                            RED TEAM UNIT
                        </div>
                    </Link>
                    <div className="hidden md:flex items-center gap-6 text-[10px] tracking-widest text-zinc-500">
                        <Link href="/mvf" className="hover:text-red-500 transition-colors cursor-pointer uppercase">MVF Protocol</Link>
                        <Link href="/iron-grade" className="hover:text-red-500 transition-colors cursor-pointer uppercase">Iron Grade</Link>
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
                        <Link href="/iron-grade" className="text-zinc-400">IRON GRADE</Link>
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
                    {/* Hero Section */}
                    {/* Hero Section */}
                    <div className="max-w-4xl mx-auto text-center mb-24">
                        <span className="block text-red-500 text-xs tracking-[0.2em] mb-6 animate-slide-up opacity-0" style={{ animationDelay: '0.1s' }}>ADVERSARIAL UNIT // LEVEL 02</span>

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
                            Don't just test your model; test your infrastructure. We execute advanced semantic hijacking, kernel-bypass attempts, and anchor-poisoning simulations to ensure your IronGrade stay ironclad.
                        </p>
                    </div>

                    {/* Features Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
                        {[
                            {
                                icon: <Zap className="w-6 h-6" />,
                                title: "Kernel Hijacking",
                                desc: "We attempt to bypass MVF XML delimiters using semantic injection to force the AI into 'helpfulness' mode and ignore prime directives."
                            },
                            {
                                icon: <Target className="w-6 h-6" />,
                                title: "Anchor Poisoning",
                                desc: "Stress-testing the RAG retrieval layer. We simulate data drift and conflicting context to see if your Anchor Layer can distinguish 'Truth' from 'Noise'."
                            },
                            {
                                icon: <ShieldAlert className="w-6 h-6" />,
                                title: "Mirror Failure Analysis",
                                desc: "We probe the Mirror Layer's VIS thresholds, attempting to generate 'Partial Truths' that pass semantic filters while delivering non-compliant payloads."
                            }
                        ].map((feature, i) => (
                            <div key={i} className="group p-8 border border-zinc-800 hover:border-red-500/30 bg-black/50 transition-colors">
                                <div className="text-zinc-600 group-hover:text-red-500 mb-6 transition-colors">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold text-white mb-4 group-hover:text-red-500 transition-colors">
                                    {feature.title}
                                </h3>
                                <p className="text-sm text-zinc-500 leading-relaxed">
                                    {feature.desc}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* 3. The Breach Protocol */}
                    <div className="mb-24 border-t border-zinc-800 pt-12">
                        <h2 className="text-3xl font-bold text-white mb-8 text-center bg-clip-text text-transparent bg-gradient-to-b from-white to-zinc-500 uppercase tracking-widest">
                            The Breach Protocol // Audit Phase
                        </h2>
                        <p className="text-zinc-500 text-center max-w-2xl mx-auto mb-12">
                            We execute a high-pressure diagnostic on your existing <strong>Bronze Grade</strong> systems.
                            Where standard AI "vibes" its way through guardrails, we apply deterministic stress to force catastrophic failure.
                        </p>
                        <div className="space-y-4 font-mono text-sm max-w-3xl mx-auto">
                            {[
                                {
                                    step: 'PHASE 01',
                                    title: 'PROBABILISTIC DRAIN',
                                    desc: 'Exploiting the inherent uncertainty in standard LLM guardrails to trigger unauthorized outputs.'
                                },
                                {
                                    step: 'PHASE 02',
                                    title: 'SEMANTIC HIJACKING',
                                    desc: 'Bypassing basic system prompts using nested injection payloads that Bronze systems cannot parse.'
                                },
                                {
                                    step: 'PHASE 03',
                                    title: 'ANCHOR DEPRIVATION',
                                    desc: 'Forcing the model to hallucinate by simulating missing data environments—proving the lack of deterministic gates.'
                                },
                                {
                                    step: 'PHASE 04',
                                    title: 'GOVERNANCE COLLAPSE',
                                    desc: 'Demonstrating the total failure of non-IronGrade filters when faced with complex, multi-vector adversarial prompts.'
                                }
                            ].map((phase, i) => (
                                <div key={i} className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4 p-4 border border-zinc-800 bg-zinc-900/30 hover:border-red-500/30 hover:bg-zinc-900/50 transition-colors group">
                                    <span className="text-red-500 font-bold shrink-0">{phase.step}</span>
                                    <span className="text-white font-bold shrink-0">{phase.title}</span>
                                    <span className="hidden md:block w-px h-4 bg-zinc-700 shrink-0"></span>
                                    <span className="text-zinc-500 group-hover:text-zinc-300 transition-colors">{phase.desc}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 4. Remediation & Transition */}
                    <div className="mb-24 border-t border-zinc-800 pt-24">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                            <div>
                                <span className="text-red-500 text-xs tracking-widest mb-4 block uppercase">The Solution Path</span>
                                <h2 className="text-4xl font-bold text-white mb-6 leading-tight">
                                    FROM AUDIT TO <br />
                                    <span className="text-zinc-700">IRON-GRADE</span> <br />
                                    STABILITY.
                                </h2>
                                <p className="text-zinc-500 mb-6 leading-relaxed">
                                    The Breach Protocol isn't just a list of bugs. It’s a <strong>Feasibility Matrix</strong>.
                                    We analyze your system across cost, latency, and risk appetite to provide a custom IronGrade remediation plan.
                                </p>
                                <div className="space-y-4">
                                    <div className="flex gap-4 items-start">
                                        <div className="mt-1 bg-red-500/10 p-2 border border-red-500/20">
                                            <ShieldAlert className="w-4 h-4 text-red-500" />
                                        </div>
                                        <div>
                                            <h4 className="text-white font-bold text-sm">Critical Breach Report</h4>
                                            <p className="text-xs text-zinc-600">A comprehensive map of every probabilistic leak and hallucination vector found during the audit.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4 items-start">
                                        <div className="mt-1 bg-red-500/10 p-2 border border-red-500/20">
                                            <Crosshair className="w-4 h-4 text-red-500" />
                                        </div>
                                        <div>
                                            <h4 className="text-white font-bold text-sm">IronGrade Roadmap</h4>
                                            <p className="text-xs text-zinc-600">A tiered blueprint for implementing MVF Kernels and Mirror Layers based on your specific infrastructure constraints.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Feasibility Criteria Cards */}
                            <div className="grid grid-cols-2 gap-4">
                                {[
                                    { label: 'COMPLIANCE', val: 'EU AI ACT' },
                                    { label: 'LATENCY', val: '<200MS' },
                                    { label: 'ACCURACY', val: '100% DET.' },
                                    { label: 'RUNTIME', val: 'SOVEREIGN' },
                                ].map((stat, i) => (
                                    <div key={i} className="p-6 border border-zinc-800 bg-zinc-900/20 text-center">
                                        <div className="text-[10px] text-zinc-600 mb-1 uppercase tracking-widest">{stat.label}</div>
                                        <div className="text-white font-bold text-xs tracking-tighter">{stat.val}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Status Log */}
                    <div className="border-t border-zinc-800 pt-12">
                        <div className="font-mono text-[10px] text-zinc-600 space-y-2">
                            <div className="flex justify-between">
                                <span>DETERMINISTIC_BYPASS_ATTEMPTS</span>
                                <span className="text-red-500">4,291 [FAILED]</span>
                            </div>
                            <div className="flex justify-between">
                                <span>KERNEL_INTEGRITY_SCORE</span>
                                <span>99.98%</span>
                            </div>
                            <div className="flex justify-between">
                                <span>AUDIT_STANDARD</span>
                                <span>NIST AI 100-1 // OWASP LLM-01</span>
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
