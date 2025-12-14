import React from 'react';
import { RoadmapItem } from '../types';

const ROADMAP_DATA: RoadmapItem[] = [
  {
    phase: "01",
    title: "Phase I: Standardization",
    description: "Certifying the first 100 Vibe Architects. Establishing the MFOUR Vibe Framework (MVF) as the universal language for System Design.",
    active: true
  },
  {
    phase: "02",
    title: "Phase II: The Open Kernel",
    description: "Releasing the 'Linux of Vibes'. An open-source repository of pre-architected Kernels and Synapse patterns for global use.",
    active: false
  },
  {
    phase: "03",
    title: "Phase III: Decentralized Intelligence",
    description: "Building the MFOURLABS Network. A decentralized guild of Architects replacing traditional software houses with Agentic Systems.",
    active: false
  }
];

export const RoadmapSection: React.FC = () => {
  return (
    <section id="roadmap" className="py-32 px-6 bg-brand-black border-t border-brand-white/5" aria-labelledby="roadmap-heading">
      <div className="max-w-3xl mx-auto">
        <header className="text-center mb-24">
          <span className="font-mono text-xs text-brand-sub uppercase tracking-widest">Trajectory</span>
          <h2 id="roadmap-heading" className="text-4xl font-display font-medium text-brand-white mt-4">Research Trajectory</h2>
        </header>

        <div className="relative pl-8 md:pl-0">
          {/* Vertical Line */}
          <div className="absolute left-[7px] md:left-1/2 md:-ml-px top-0 bottom-0 w-px bg-brand-white/10"></div>

          <div className="space-y-24">
            {ROADMAP_DATA.map((item, index) => (
              <article key={index} className={`relative flex flex-col md:flex-row items-center gap-8 md:gap-16 group ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>

                {/* Center Marker */}
                <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 w-4 h-4 rounded-full bg-brand-black border border-brand-white/20 z-10 group-hover:border-brand-yellow group-hover:scale-125 transition-all duration-300">
                  {item.active && <div className="absolute inset-0 m-auto w-1.5 h-1.5 rounded-full bg-brand-yellow animate-pulse"></div>}
                </div>

                {/* Content Spacer for layout balance */}
                <div className="hidden md:block w-full"></div>

                {/* Content */}
                <div className="w-full pl-6 md:pl-0 text-left">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="font-mono text-xs text-brand-yellow">{item.phase}</span>
                    <h3 className="text-xl font-display font-medium text-brand-white">{item.title}</h3>
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