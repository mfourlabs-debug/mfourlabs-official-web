'use client';

import React from 'react';
import { RoadmapItem } from '@/lib/types';

const ROADMAP_DATA: RoadmapItem[] = [
  {
    phase: "01",
    title: "Phase I: Open Source Dominance",
    description: "Releasing the MVS Canvas and XML Kernel Gists as public goods. We provide the 'Goldmine'—premium, high-value schemas—to the global freelance workforce. Establishing MFOUR protocols as the universal standard for commercial prompt engineering.",
    active: true
  },
  {
    phase: "02",
    title: "Phase II: Adversarial Hardening",
    description: "The Shift to Safety. While the community builds on our Open Source kernel, MFOUR Labs launches the 'Red Team' unit to stress-test enterprise systems against hallucination, data leaks, and EU AI Act failures.",
    active: false
  },
  {
    phase: "03",
    title: "Phase III: Sovereign Runtime",
    description: "The IronGrade Deployment. Moving from 'Prompting' to 'Infrastructure'. We take the now-standardized MFOUR protocols and bake them into a sovereign, on-premise runtime environment for high-security industries.",
    active: false
  }
];

export const RoadmapSection: React.FC = () => {
  return (
    <section id="roadmap" className="py-32 px-6 bg-brand-black border-t border-brand-white/5" aria-labelledby="roadmap-heading">
      <div className="max-w-3xl mx-auto">
        <header className="text-center mb-24">
          <span className="font-mono text-xs text-zinc-500 uppercase tracking-widest">Trajectory</span>
          <h2 id="roadmap-heading" className="text-4xl font-mono font-bold text-white mt-4 tracking-tighter">Research Trajectory</h2>
        </header>

        <div className="relative pl-8 md:pl-0">
          {/* Vertical Line */}
          <div className="absolute left-[7px] md:left-1/2 md:-ml-px top-0 bottom-0 w-px bg-brand-white/10"></div>

          <div className="space-y-24">
            {ROADMAP_DATA.map((item, index) => (
              <article key={index} className={`relative flex flex-col md:flex-row items-center gap-8 md:gap-16 group ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>

                {/* Center Marker */}
                <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 w-4 h-4 rounded-full bg-black border border-zinc-700 z-10 group-hover:border-blue-500 group-hover:scale-125 transition-all duration-300">
                  {item.active && <div className="absolute inset-0 m-auto w-1.5 h-1.5 rounded-full bg-zinc-400 group-hover:bg-blue-500 animate-pulse transition-colors"></div>}
                </div>

                {/* Content Spacer for layout balance */}
                <div className="hidden md:block w-full"></div>

                {/* Content */}
                <div className="w-full pl-6 md:pl-0 text-left">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="font-mono text-xs text-zinc-500 group-hover:text-blue-400 transition-colors">{item.phase}</span>
                    <h3 className="text-xl font-mono font-bold text-white group-hover:text-blue-400 transition-colors">{item.title}</h3>
                  </div>
                  <p className="text-brand-gray text-sm leading-relaxed max-w-sm">
                    {item.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};