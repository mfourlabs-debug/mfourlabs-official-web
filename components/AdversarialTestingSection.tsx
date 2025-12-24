import React from 'react';
import { Target, Lightbulb, Cpu, Zap } from 'lucide-react';

interface TestingDimension {
    title: string;
    description: string;
    regulation: string;
}

export const AdversarialTestingSection: React.FC = () => {
    const testingDimensions: TestingDimension[] = [
        {
            title: "Deepfake Satire",
            description: "Testing transparency requirements for AI-generated content in satirical contexts.",
            regulation: "Article 50"
        },
        {
            title: "Medical Device Exceptions",
            description: "Validating MDR interaction boundaries and medical AI system classifications.",
            regulation: "MDR Annex VIII"
        },
        {
            title: "Biometric Edge Cases",
            description: "Distinguishing law enforcement exceptions from prohibited biometric practices.",
            regulation: "Article 5.1(d)"
        },
        {
            title: "GPAI Systemic Risk",
            description: "Compute threshold classification and systemic risk assessments for general-purpose AI.",
            regulation: "Article 51"
        },
        {
            title: "Data Sovereignty",
            description: "GDPR alignment testing for cross-border data flows and regional compliance.",
            regulation: "GDPR Article 44-50"
        }
    ];

    const engineeringFeatures = [
        {
            icon: <Cpu className="w-5 h-5" />,
            title: "Smart Polling Architecture",
            description: "Bulletproof status updates without 429 errors"
        },
        {
            icon: <Zap className="w-5 h-5" />,
            title: "Secure Thinking UI",
            description: "Admin-only debug views vs. user-safe states"
        },
        {
            icon: <Target className="w-5 h-5" />,
            title: "Real-time VIS Checks",
            description: "Vibe Integrity Score computed on every response"
        }
    ];

    return (
        <section id="adversarial-testing" className="py-24 md:py-32 px-4 md:px-6 bg-brand-black border-t border-brand-white/10" aria-labelledby="testing-heading">
            <div className="max-w-7xl mx-auto">

                {/* Section Header */}
                <header className="mb-16 md:mb-20 text-center">
                    <span className="block font-mono text-xs text-brand-yellow uppercase tracking-widest mb-4">Trust Through Testing</span>
                    <h2 id="testing-heading" className="text-4xl md:text-5xl lg:text-6xl font-display font-medium text-brand-white tracking-tighter mb-6">
                        Adversarial Testing Suite
                    </h2>
                    <p className="text-xl text-brand-gray max-w-3xl mx-auto leading-relaxed">
                        <span className="text-brand-white font-medium">We don't just prompt; we Red Team.</span> Our kernels are battle-tested against 5+ dimensions of legal pressure tests, from deepfake satire to medical device exceptions.
                    </p>
                </header>

                {/* Testing Dimensions Grid */}
                <div className="mb-20">
                    <h3 className="font-mono text-xs text-brand-yellow uppercase tracking-widest mb-8">Legal Pressure Test Categories</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {testingDimensions.map((dimension, index) => (
                            <div
                                key={index}
                                className="group p-6 bg-brand-surface/50 border border-brand-white/5 rounded-xl hover:bg-brand-surface hover:border-brand-white/10 transition-all duration-300"
                            >
                                <div className="flex items-start gap-3 mb-3">
                                    <span className="text-brand-yellow font-mono text-sm mt-1">→</span>
                                    <div className="flex-1">
                                        <h4 className="text-lg font-display font-medium text-brand-white mb-2">
                                            {dimension.title}
                                        </h4>
                                        <p className="text-sm text-brand-gray leading-relaxed mb-3">
                                            {dimension.description}
                                        </p>
                                        <span className="inline-block px-3 py-1 rounded-full bg-brand-white/5 border border-brand-white/10 text-[10px] font-mono text-brand-sub uppercase tracking-widest">
                                            {dimension.regulation}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Engineering Details - The "1%" Flex */}
                <div className="border-t border-brand-white/10 pt-16">
                    <h3 className="font-mono text-xs text-brand-yellow uppercase tracking-widest mb-8 text-center">
                        Engineering Excellence (The "1%" Details)
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                        {engineeringFeatures.map((feature, index) => (
                            <div key={index} className="text-center">
                                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-brand-yellow/10 text-brand-yellow mb-4">
                                    {feature.icon}
                                </div>
                                <h4 className="text-base font-display font-medium text-brand-white mb-2">
                                    {feature.title}
                                </h4>
                                <p className="text-sm text-brand-gray">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
};
