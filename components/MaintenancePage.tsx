'use client';

import React, { useState, useEffect } from 'react';
import { Terminal, Shield, Lock, Activity } from 'lucide-react';
import Link from 'next/link';

export default function MaintenancePage() {
    const [progress, setProgress] = useState(0);
    const [logs, setLogs] = useState<string[]>([]);

    const systemLogs = [
        "INITIATING LOCKDOWN PROTOCOL...",
        "SECURING VIBE SCHEMAS...",
        "UPGRADING KERNEL ARCHITECTURE...",
        "SYNCHRONIZING WITH IRONGRADE VAULT...",
        "OPTIMIZING STOCHASTIC GATES...",
        "VERIFYING DETERMINISTIC OUTPUTS...",
        "SYSTEM_UPDATE_IN_PROGRESS..."
    ];

    useEffect(() => {
        // Progress bar simulation
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 95) return 95; // Stall at 95%
                return prev + Math.random() * 2;
            });
        }, 200);

        // Log simulation
        let logIndex = 0;
        const logInterval = setInterval(() => {
            if (logIndex < systemLogs.length) {
                setLogs(prev => [...prev, systemLogs[logIndex]]);
                logIndex++;
            }
        }, 800);

        return () => {
            clearInterval(interval);
            clearInterval(logInterval);
        };
    }, []);

    return (
        <div className="min-h-screen bg-black text-zinc-300 font-mono flex flex-col items-center justify-center relative overflow-hidden">

            {/* Background Grid */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-20"
                style={{
                    backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)',
                    backgroundSize: '40px 40px'
                }}>
            </div>

            {/* Content Container */}
            <div className="relative z-10 w-full max-w-2xl px-6">

                {/* Branding */}
                <div className="flex justify-center mb-12">
                    <div className="flex items-center gap-0.5 text-2xl tracking-tighter text-white">
                        <span className="font-montserrat font-bold">M4</span>
                        <span className="italic text-zinc-500 text-3xl font-black leading-none pb-1">|</span>
                        <span className="font-montserrat">LABS</span>
                    </div>
                </div>

                {/* Main Card */}
                <div className="bg-zinc-900/50 border border-zinc-800 p-8 md:p-12 backdrop-blur-sm relative overflow-hidden group">

                    {/* Corner Accents */}
                    <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-zinc-500"></div>
                    <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-zinc-500"></div>
                    <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-zinc-500"></div>
                    <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-zinc-500"></div>

                    {/* Status Header */}
                    <div className="flex items-center justify-between mb-8 pb-4 border-b border-zinc-800">
                        <div className="flex items-center gap-3 text-yellow-500">
                            <Lock className="w-5 h-5 animate-pulse" />
                            <span className="text-xs font-bold tracking-widest uppercase">MAINTENANCE_MODE_ACTIVE</span>
                        </div>
                        <div className="text-[10px] text-zinc-600 font-mono">
                            REF: SYS-UPGRADE-004
                        </div>
                    </div>

                    {/* Main Message */}
                    <div className="text-center mb-10">
                        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">SYSTEM UPDATE</h1>
                        <p className="text-zinc-500 text-sm md:text-base leading-relaxed max-w-lg mx-auto">
                            MFOUR LABS is undergoing critical upgrades. Access is temporarily restricted to prevent schema drift.
                        </p>
                    </div>

                    {/* Terminal Logs */}
                    <div className="bg-black/80 border border-zinc-800 p-4 mb-6 font-mono text-[10px] md:text-xs h-32 overflow-hidden flex flex-col justify-end">
                        {logs.map((log, i) => (
                            <div key={i} className="flex gap-2">
                                <span className="text-zinc-600">{`>`}</span>
                                <span className={i === logs.length - 1 ? "text-yellow-500 animate-pulse" : "text-zinc-400"}>
                                    {log}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full h-1 bg-zinc-800 mb-2">
                        <div
                            className="h-full bg-yellow-500 transition-all duration-300 ease-out"
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                    <div className="flex justify-between text-[10px] text-zinc-600 font-mono">
                        <span>ESTIMATED_COMPLETION</span>
                        <span>xx:xx:xx</span>
                    </div>

                </div>

                {/* Footer Info */}
                <div className="mt-8 text-center space-y-4">
                    <p className="text-[10px] text-zinc-600 uppercase tracking-widest">
                        Check back shortly
                    </p>
                    <div className="flex justify-center gap-6">
                        <a href="https://x.com/mfourlabs" target="_blank" className="text-zinc-500 hover:text-white transition-colors">
                            <span className="sr-only">X (Twitter)</span>
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                            </svg>
                        </a>
                        <a href="mailto:hq@mfourlabs.dev" className="text-zinc-500 hover:text-white transition-colors text-xs font-mono">
                            hq@mfourlabs.dev
                        </a>
                    </div>
                </div>

            </div>
        </div>
    );
}
