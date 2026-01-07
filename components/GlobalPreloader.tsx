'use client';

import React, { useState, useEffect } from 'react';

type PreloaderTheme = 'blue' | 'red' | 'yellow' | 'green' | 'default' | 'white';

interface GlobalPreloaderProps {
    onComplete: () => void;
    theme?: PreloaderTheme;
}

export const GlobalPreloader: React.FC<GlobalPreloaderProps> = ({ onComplete, theme = 'default' }) => {
    const [logs, setLogs] = useState<string[]>([]);
    const [progress, setProgress] = useState(0);

    // Theme Config
    const themeConfig = {
        blue: {
            text: 'text-blue-500',
            pulse: 'text-blue-400',
            bar: 'bg-blue-500',
            bootText: 'INITIALIZING RESEARCH KERNEL...'
        },
        red: {
            text: 'text-red-500',
            pulse: 'text-red-400',
            bar: 'bg-red-500',
            bootText: 'INITIALIZING ADVERSARIAL UNIT...'
        },
        green: {
            text: 'text-green-500',
            pulse: 'text-green-400',
            bar: 'bg-green-500',
            bootText: 'INITIALIZING IRONGRADE...'
        },
        yellow: {
            text: 'text-brand-yellow',
            pulse: 'text-brand-yellow',
            bar: 'bg-brand-yellow',
            bootText: 'INITIALIZING IRONGRADE...'
        },
        default: {
            text: 'text-zinc-300',
            pulse: 'text-white',
            bar: 'bg-white',
            bootText: 'INITIALIZING GATEWAY...'
        },
        white: {
            text: 'text-white',
            pulse: 'text-zinc-400',
            bar: 'bg-white',
            bootText: 'ESTABLISHING SECURE CONNECTION...'
        }
    };

    const activeTheme = themeConfig[theme];

    const bootSequence = [
        activeTheme.bootText,
        "LOADING VIBE SCHEMAS...",
        "VERIFYING INTEGRITY...",
        "ESTABLISHING SECURE CONNECTION...",
        "ACCESS GRANTED."
    ];

    useEffect(() => {
        let currentStep = 0;

        // Progress Bar Simulation
        const progressInterval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(progressInterval);
                    return 100;
                }
                return prev + Math.random() * 15;
            });
        }, 150);

        // Text Log Simulation
        const logInterval = setInterval(() => {
            if (currentStep < bootSequence.length) {
                setLogs(prev => [...prev, bootSequence[currentStep]]);
                currentStep++;
            } else {
                clearInterval(logInterval);
                setTimeout(onComplete, 800);
            }
        }, 400);

        return () => {
            clearInterval(progressInterval);
            clearInterval(logInterval);
        };
    }, [theme, onComplete]);

    return (
        <div className="fixed inset-0 z-[100] bg-black font-mono text-xs p-8 flex flex-col items-center justify-center">

            {/* Center Logo */}
            <div className="mb-12 animate-fade-in flex flex-col items-center gap-4">
                <div className="flex items-center gap-0.5 text-4xl md:text-6xl tracking-tighter text-white">
                    <span className="font-montserrat font-bold">M4</span>
                    <span className="italic text-zinc-500 text-6xl md:text-8xl font-black leading-none pb-2">|</span>
                    <span className="font-montserrat ">LABS</span>
                </div>
                <div className={`mt-4 text-xs tracking-[0.3em] uppercase opacity-70 ${activeTheme.text}`}>
                    System Loading...
                </div>
            </div>

            {/* Bottom Status Bar */}
            <div className="fixed bottom-0 left-0 w-full p-8">
                <div className="max-w-md w-full mb-4 space-y-1">
                    {logs.map((log, i) => (
                        <div key={i} className="flex gap-2">
                            <span className="text-zinc-600">[{new Date().toISOString().split('T')[1].split('.')[0]}]</span>
                            <span className={i === logs.length - 1 ? `animate-pulse ${activeTheme.pulse}` : "text-zinc-500"}>
                                {log}
                            </span>
                        </div>
                    ))}
                </div>

                <div className="w-full h-1 bg-zinc-900 rounded-full overflow-hidden">
                    <div
                        className={`h-full ${activeTheme.bar} transition-all duration-300 ease-out`}
                        style={{ width: `${Math.min(progress, 100)}%` }}
                    />
                </div>
            </div>
        </div>
    );
};
