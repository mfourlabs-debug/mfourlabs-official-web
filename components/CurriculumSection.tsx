'use client';

import React from 'react';

interface ProtocolLayer {
  number: string;
  name: string;
  focus: string[];
  description: string;
}

export const CurriculumSection: React.FC = () => {
  const layers: ProtocolLayer[] = [
    {
      number: "00",
      name: "GuardLayer",
      focus: ["Prompt Injection Defense", "Jailbreak Detection", "Pre-computation Firewalls"],
      description: "Security-first input validation. Blocks malicious prompts before they reach the model."
    },
    {
      number: "01",
      name: "KernelLayer",
      focus: ["Role-Enforced Prompts", "Sentinel-EU Compliance", "Regulation (EU) 2024/1689"],
      description: "The first kernel native to EU AI Act. System prompts that enforce Article 5 prohibited practices and high-risk classifications."
    },
    {
      number: "02",
      name: "SynapseLayer",
      focus: ["Strict Tool Authorization", "Agent Routing", "Zero Hallucinated API Calls"],
      description: "Controlled intelligence routing through verified pathways. Every tool call is audited and authorized."
    },
    {
      number: "03",
      name: "AnchorLayer",
      focus: ["Vector-Based Retrieval", "Legal Document Indexing", "Citation-Backed Accuracy"],
      description: "Grounding layer for knowledge retrieval. Capable of indexing 144+ page regulations with precise citations."
    },
    {
      number: "04",
      name: "CognitiveLayer",
      focus: ["Silent Reasoning", "Thinking Block Protocol", "Gemini-Style Logic Separation"],
      description: "Internal reasoning that's separate from public output. Security without sacrificing transparency."
    },
    {
      number: "05",
      name: "MirrorLayer",
      focus: ["Vibe Integrity Score (VIS)", "Post-Generation Auditing", "Compliance Verification"],
      description: "Automated verification that blocks non-compliant responses. The system that observes itself."
    }
  ];

  return (
    <section id="framework-specs" className="py-24 md:py-32 px-4 md:px-6 bg-brand-black border-t border-brand-white/10" aria-labelledby="mvf-spec-heading">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <header className="mb-20 border-b border-brand-white/10 pb-12">
          <h2 id="mvf-spec-heading" className="text-5xl md:text-6xl lg:text-7xl font-mono font-bold text-white tracking-tighter mb-6">
            The IronRAG Architecture
          </h2>
          <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-12">
            <div className="flex flex-col gap-3">
              <p className="font-mono text-xs text-zinc-500 uppercase tracking-widest">
                Global Standard: <span className="text-white">MF-CVA-02</span>
              </p>
              <p className="font-mono text-xs text-brand-gray uppercase tracking-widest">
                Status: <span className="text-brand-white">Stable v1.0</span>
              </p>
            </div>
            <div className="border-l border-brand-white/10 pl-6 md:pl-8">
              <p className="text-sm text-brand-gray leading-relaxed max-w-md">
                The six-layer defense pipeline for compliance-grade AI.
                Security, compliance, and verification engineered into every interaction.
              </p>
            </div>
          </div>
        </header>

        {/* Layers */}
        <div className="space-y-0">
          {layers.map((layer, index) => (
            <div
              key={index}
              className="group py-12 px-0 border-t border-brand-white/10 hover:border-brand-white/20 transition-all duration-300"
            >
              {/* Layer Header */}
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8 mb-6">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-3">
                    <span className="font-mono text-xs text-zinc-500 group-hover:text-blue-400 transition-colors uppercase tracking-widest">
                      LAYER {layer.number}
                    </span>
                    <div className="flex-1 h-px bg-brand-white/10 group-hover:bg-brand-white/20 transition-colors"></div>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-mono font-bold text-white group-hover:text-blue-400 transition-colors tracking-tighter mb-3">
                    {layer.name}
                  </h3>
                  <p className="text-base text-brand-gray leading-relaxed max-w-2xl">
                    {layer.description}
                  </p>
                </div>
              </div>

              {/* Focus Areas */}
              <div className="pl-0 md:pl-0">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {layer.focus.map((focus, focusIndex) => (
                    <div key={focusIndex} className="group/item">
                      <div className="flex items-start gap-3">
                        <span className="text-zinc-600 group-hover/item:text-blue-400 font-mono text-sm mt-0.5 transition-colors">→</span>
                        <div>
                          <p className="font-mono text-xs text-zinc-500 group-hover/item:text-blue-400 transition-colors uppercase tracking-widest mb-1">
                            {focus.split(' ')[0]}
                          </p>
                          <p className="text-sm text-brand-gray group-hover/item:text-white transition-colors">
                            {focus}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Divider */}
        <div className="border-t border-brand-white/10 mt-20 pt-12">
          {/* CTA Link */}
          <div className="flex items-center justify-center mb-12">
            <a
              href="#"
              className="group font-mono text-sm text-brand-gray hover:text-blue-400 transition-all duration-300 flex items-center gap-2"
            >
              <span className="text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
              <span className="border-b border-transparent group-hover:border-blue-400 transition-colors">
                Request Framework Access
              </span>
            </a>
          </div>

          {/* Specification Notice */}
          <div className="text-center">
            <p className="font-mono text-xs text-brand-sub uppercase tracking-widest">
              The MFOUR Vibe Framework™ is licensed under CC BY-ND 4.0.
              <span className="block mt-2 text-brand-gray">
                Published by MFOUR LABS. All Systems Operational.
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
