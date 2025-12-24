import React from 'react';
import { Shield, AlertTriangle, Brain, FileCheck, ExternalLink } from 'lucide-react';

interface Capability {
    icon: React.ReactNode;
    title: string;
    description: string;
    regulation: string;
}

export const SentinelEUSection: React.FC = () => {
    const capabilities: Capability[] = [
        {
            icon: <AlertTriangle className="w-6 h-6" />,
            title: "Prohibited Practice Detection",
            description: "Instantly flags Real-time Biometrics & Social Scoring systems.",
            regulation: "Article 5"
        },
        {
            icon: <Shield className="w-6 h-6" />,
            title: "Exception Hunting",
            description: "Distinguishes between 'Banned' and 'Law Enforcement Exceptions' with precision.",
            regulation: "Article 5(1)(d)"
        },
        {
            icon: <Brain className="w-6 h-6" />,
            title: "Systemic Risk Analysis",
            description: "Classifies GPAI models by Compute Threshold (10²⁵ FLOPs).",
            regulation: "Annex XIII"
        },
        {
            icon: <FileCheck className="w-6 h-6" />,
            title: "Legacy Protection",
            description: "Handles 'Grandfathering' rules for pre-2023 systems with accuracy.",
            regulation: "Article 111"
        }
    ];

    return (
        <section id="sentinel-eu" className="py-24 md:py-32 px-4 md:px-6 bg-gradient-to-b from-brand-black to-brand-offblack border-t border-brand-white/10" aria-labelledby="sentinel-heading">
            <div className="max-w-7xl mx-auto">

                {/* Section Header */}
                <header className="mb-16 md:mb-20">
                    <span className="block font-mono text-xs text-brand-yellow uppercase tracking-widest mb-4">Flagship Product</span>
                    <h2 id="sentinel-heading" className="text-4xl md:text-5xl lg:text-6xl font-display font-medium text-brand-white tracking-tighter mb-6">
                        Case Study: Automated <br className="hidden md:block" />
                        <span className="text-brand-yellow">EU AI Act Compliance</span>
                    </h2>
                    <p className="text-lg text-brand-gray max-w-2xl leading-relaxed">
                        <span className="text-brand-white font-medium">Sentinel-EU</span> is the first kernel native to Regulation (EU) 2024/1689.
                        Built to enforce Article 5 prohibited practices and high-risk system classifications in real-time.
                    </p>
                </header>

                {/* Capabilities Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {capabilities.map((capability, index) => (
                        <div
                            key={index}
                            className="group p-6 bg-brand-surface border border-brand-white/5 rounded-2xl hover:border-brand-yellow/30 transition-all duration-300"
                        >
                            <div className="mb-4 p-3 bg-brand-yellow/10 w-fit rounded-xl text-brand-yellow group-hover:bg-brand-yellow/20 transition-colors">
                                {capability.icon}
                            </div>
                            <h3 className="text-lg font-display font-medium text-brand-white mb-2">
                                {capability.title}
                            </h3>
                            <p className="text-sm text-brand-gray leading-relaxed mb-3">
                                {capability.description}
                            </p>
                            <span className="inline-block px-3 py-1 rounded-full bg-brand-white/5 border border-brand-white/10 text-[10px] font-mono text-brand-sub uppercase tracking-widest">
                                {capability.regulation}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Dashboard Preview Placeholder */}
                <div className="relative rounded-2xl border border-brand-white/10 bg-brand-surface overflow-hidden mb-12">
                    <div className="aspect-video flex items-center justify-center bg-gradient-to-br from-brand-surfaceHighlight to-brand-surface">
                        <div className="text-center">
                            <Shield className="w-16 h-16 text-brand-yellow/50 mx-auto mb-4" />
                            <p className="font-mono text-sm text-brand-sub uppercase tracking-widest">
                                Adversarial Testing Dashboard
                            </p>
                            <p className="text-xs text-brand-gray mt-2">
                                Real-time compliance verification interface
                            </p>
                        </div>
                    </div>
                </div>

                {/* Reference Link */}
                <div className="flex items-center justify-center gap-2 text-sm">
                    <span className="text-brand-gray">Built for</span>
                    <a
                        href="https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=OJ:L_202401689"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-2 text-brand-white hover:text-brand-yellow transition-colors"
                    >
                        <span className="border-b border-transparent group-hover:border-brand-yellow transition-colors">
                            Regulation (EU) 2024/1689
                        </span>
                        <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                </div>

            </div>
        </section>
    );
};
