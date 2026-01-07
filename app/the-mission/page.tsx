'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Cpu, Layers, Zap, ShieldCheck, Award, Menu, X } from 'lucide-react';
import { GlobalPreloader } from '@/components/GlobalPreloader';

export default function TheMissionPage() {
    const [isLoading, setIsLoading] = useState(true);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    if (isLoading) {
        return <GlobalPreloader onComplete={() => setIsLoading(false)} theme="yellow" />;
    }

    return (
        <div className="min-h-screen bg-black text-zinc-300 font-mono flex flex-col items-center">

            {/* HEADER (Reusing your branding) */}
            <header className="fixed top-0 left-0 w-full z-50 bg-black/90 backdrop-blur-sm border-b border-zinc-800">
                <div className="max-w-7xl mx-auto px-6 h-16 flex justify-between items-center">
                    <Link href="/" className="flex items-center gap-4 group">
                        <div className="flex items-center gap-0.5 text-xl tracking-tighter text-white group-hover:text-brand-yellow transition-colors">
                            <span className="font-montserrat font-bold">M4</span>
                            <span className="italic text-zinc-500 text-3xl font-black leading-none pb-1">|</span>
                            <span className="font-montserrat">LABS</span>
                        </div>
                        <div className="hidden md:block h-4 w-[1px] bg-zinc-800"></div>
                        <div className="hidden md:block text-xs text-zinc-500 tracking-widest">
                            LABS HQ // THE MISSION
                        </div>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-6 text-[10px] tracking-widest text-zinc-500">
                        <Link href="/mvf" className="hover:text-white transition-colors">MVF PROTOCOL</Link>
                        <Link href="/irongrade" className="hover:text-white transition-colors">IRONGRADE</Link>
                        <Link href="/red-team" className="hover:text-white transition-colors">RED TEAM</Link>
                        <Link href="/the-mission" className="text-white cursor-default">THE MISSION</Link>
                        <Link href="/contact" className="hover:text-white transition-colors">CONTACT</Link>
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
                        <Link href="/red-team" className="text-zinc-400">RED TEAM</Link>
                        <Link href="/the-mission" className="text-white">THE MISSION</Link>
                        <Link href="/contact" className="text-zinc-400">CONTACT</Link>
                    </div>
                )}
            </header>

            <main className="w-full max-w-7xl border-x border-zinc-800 min-h-screen pt-32 pb-20 relative">
                <div className="relative z-10 px-6 md:px-12">

                    {/* Hero Section: The Manifesto */}
                    <div className="max-w-4xl mb-32">
                        <span className="block text-brand-yellow text-xs tracking-[0.2em] mb-6">M4 LABS CORE PHILOSOPHY</span>
                        <h1 className="text-5xl md:text-8xl font-bold text-white tracking-tighter mb-8 leading-[0.85]">
                            BRIDGING THE <br />
                            <span className="text-zinc-800 text-6xl md:text-7xl italic">DETERMINISTIC</span> <br />
                            GAP.
                        </h1>
                        <p className="text-zinc-500 text-lg md:text-xl max-w-2xl leading-relaxed">
                            MFOUR LABS is an elite R&D unit dedicated to the engineering of secure AI governance.
                            While the world builds probabilistic "toys," we build deterministic infrastructure.
                            Our mission is simple: <strong>Eliminate the "Vibe" and enforce the "Anchor."</strong>
                        </p>
                    </div>

                    {/* The Bronze vs Iron Argument */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-32">
                        <div className="p-8 border border-zinc-800 bg-zinc-900/10">
                            <h3 className="text-zinc-500 text-xs tracking-widest mb-6">THE PROBLEM</h3>
                            <h2 className="text-2xl font-bold text-white mb-4 italic text-zinc-400">Bronze Grade AI</h2>
                            <p className="text-sm text-zinc-600 leading-relaxed mb-6">
                                Most enterprise AI operates on "Probabilistic Vibes." It guesses, it hallucinations, and it leaks.
                                It is helpful, but it is dangerous. In a regulated world, "close enough" is a liability.
                            </p>
                            <div className="text-[10px] text-red-900 font-bold tracking-widest uppercase">
                                STATUS: UNACCEPTABLE RISK
                            </div>
                        </div>
                        <div className="p-8 border border-brand-yellow/20 bg-brand-yellow/5">
                            <h3 className="text-brand-yellow text-xs tracking-widest mb-6">THE SOLUTION</h3>
                            <h2 className="text-2xl font-bold text-white mb-4">IronGrade Infrastructure</h2>
                            <p className="text-sm text-zinc-400 leading-relaxed mb-6">
                                We enforce deterministic integrity. Through MVF Kernels and Mirror Layer interception,
                                we ensure that AI agents never speak unless they are anchored in truth.
                                We don't build chatbots; we build Governance Gates.
                            </p>
                            <div className="text-[10px] text-brand-yellow font-bold tracking-widest uppercase flex items-center gap-2">
                                <ShieldCheck className="w-3 h-3" />
                                STATUS: DETERMINISTIC CERTAINTY
                            </div>
                        </div>
                    </div>

                    {/* Core Pillars */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-zinc-800 mb-32">
                        {[
                            {
                                icon: <Cpu />,
                                title: "Sovereign Engineering",
                                desc: "Physically isolated compute and memory states for high-risk regulatory workloads."
                            },
                            {
                                icon: <Layers />,
                                title: "MVF Frameworks",
                                desc: "Recursive logic kernels that force AI models to adhere to deterministic compliance paths."
                            },
                            {
                                icon: <Zap />,
                                title: "Adversarial Stress",
                                desc: "Constant red-teaming to probe for semantic drift and kernel bypass vulnerabilities."
                            }
                        ].map((pillar, i) => (
                            <div key={i} className="p-12 border-zinc-800 md:border-r last:border-r-0 hover:bg-zinc-900/30 transition-colors group">
                                <div className="text-zinc-700 group-hover:text-brand-yellow mb-8 transition-colors">
                                    {pillar.icon}
                                </div>
                                <h4 className="text-white font-bold mb-4 uppercase tracking-tighter">{pillar.title}</h4>
                                <p className="text-xs text-zinc-600 leading-loose">{pillar.desc}</p>
                            </div>
                        ))}
                    </div>

                    {/* FOUNDING ARCHITECTS SECTION */}
                    <div className="mb-32">
                        <div className="flex items-center gap-4 mb-12">
                            <div className="h-px bg-zinc-800 grow"></div>
                            <h2 className="text-xs tracking-[0.4em] text-zinc-500 uppercase font-bold">Project Leadership // Founding Architects</h2>
                            <div className="h-px bg-zinc-800 grow"></div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
                            {[
                                {
                                    name: "D.K. Yasan Lakmal Hemachandra",
                                    role: "Founding Architect",
                                    bio: "Dedicated to engineering deterministic protocols that eliminate AI hallucinations and enforce absolute enterprise compliance. My work centers on the operationalization of the MVF Standard, leading the development of the Mirror Protocol and real-time adversarial auditing to harden AI systems against high-load semantic pressure and logic-gate bypass attempts.",
                                    image: "/YasanLakmal.jpg" // Replace with your B&W photo
                                },
                                {
                                    name: "W.A.Hasindu Navanjana Wijayagunawardhana",
                                    role: "Founding Architect",
                                    bio: "Specializing in the transition from stochastic uncertainty to Deterministic Governance. As a lead architect of the MVF Vibe Framework, my research focuses on Identity Kernels and Synapse Strategy—decoupling raw reasoning from controlled response generation to ensure every agent operates within immutable constraints.",
                                    image: "/HasinduNavanjana.jpg" // Replace with your B&W photo
                                }
                            ].map((member, i) => (
                                <div key={member.name} className="flex flex-col md:flex-row gap-8 items-start group">
                                    {/* Photo Frame */}
                                    <div className="relative w-48 h-60 shrink-0 transition-all duration-500 border border-zinc-800 group-hover:border-brand-yellow/50 overflow-hidden bg-black">
                                        <img
                                            src={member.image}
                                            alt={member.name}
                                            className="w-full h-full object-cover grayscale contrast-125 brightness-90"
                                        />
                                    </div>

                                    {/* Info */}
                                    <div className="pt-2">
                                        <h3 className="text-xl font-bold text-white mb-1 tracking-tighter group-hover:text-brand-yellow transition-colors">
                                            {member.name}
                                        </h3>
                                        <div className="text-[10px] text-brand-yellow tracking-widest uppercase mb-4 font-bold">
                                            {member.role}
                                        </div>
                                        <p className="text-xs text-zinc-500 leading-relaxed mb-6 italic whitespace-pre-line">
                                            "{member.bio}"
                                        </p>
                                        <div className="flex gap-4">
                                            <span className="text-[10px] text-zinc-700 hover:text-white cursor-pointer transition-colors border-b border-zinc-900 hover:border-white">LN</span>
                                            <span className="text-[10px] text-zinc-700 hover:text-white cursor-pointer transition-colors border-b border-zinc-900 hover:border-white">GH</span>
                                            <span className="text-[10px] text-zinc-700 hover:text-white cursor-pointer transition-colors border-b border-zinc-900 hover:border-white">X</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Final CTA */}
                    <div className="text-center py-20 border border-zinc-800 bg-zinc-900/10">
                        <h2 className="text-3xl font-bold text-white mb-4">READY TO HARDEN YOUR STACK?</h2>
                        <p className="text-zinc-600 text-sm mb-12 max-w-md mx-auto">
                            Transition from probabilistic risk to deterministic stability.
                            Schedule a high-level briefing with our Architects.
                        </p>
                        <Link href="/iron-grade" className="text-brand-yellow text-xs font-bold tracking-[0.3em] flex items-center justify-center gap-2 hover:gap-4 transition-all">
                            SECURE CHANNEL <ArrowUpRight className="w-4 h-4" />
                        </Link>
                    </div>

                </div>
            </main>

            <footer className="w-full border-t border-zinc-800 bg-black py-12 px-6">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-center text-[10px] text-zinc-700 tracking-[0.2em] uppercase">
                    <div>COPYRIGHT © 2026 MFOUR LABS</div>
                </div>
            </footer>
        </div>
    );
}
