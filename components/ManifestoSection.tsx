import React from 'react';
import { Zap, Brain, Shield, Target, BookOpen, Lightbulb } from 'lucide-react';

const BentoCard: React.FC<{ 
    title: string; 
    subtitle?: string; 
    icon?: React.ReactNode; 
    className?: string; 
    children?: React.ReactNode 
}> = ({ title, subtitle, icon, className = '', children }) => (
  <div className={`group relative p-6 md:p-8 bg-brand-surface border border-brand-white/5 rounded-3xl hover:border-brand-white/10 transition-all duration-500 overflow-hidden ${className}`}>
     
     {/* Technical Markers */}
     <div className="absolute top-4 right-4 w-2 h-2 border-t border-r border-brand-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
     <div className="absolute bottom-4 left-4 w-2 h-2 border-b border-l border-brand-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
     
     <div className="relative z-10 h-full flex flex-col justify-between">
        <div>
            {icon && <div className="mb-6 p-3 bg-brand-white/5 w-fit rounded-xl text-brand-white group-hover:text-brand-yellow group-hover:bg-brand-yellow/10 transition-colors duration-300">{icon}</div>}
            <h3 className="text-xl md:text-2xl font-display font-medium text-brand-white mb-3 tracking-tight">{title}</h3>
            {subtitle && <p className="text-sm text-brand-gray leading-relaxed max-w-sm font-light">{subtitle}</p>}
        </div>
        {children}
     </div>
     
     {/* Hover Glow */}
     <div className="absolute -top-24 -right-24 w-64 h-64 bg-brand-yellow/5 blur-[80px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
  </div>
);

export const ManifestoSection: React.FC = () => {
  return (
    <section id="philosophy" className="py-24 md:py-32 px-4 md:px-6 bg-brand-black border-t border-brand-white/5">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-16 md:mb-20 grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
          <div>
              <span className="block font-mono text-xs text-brand-yellow uppercase tracking-widest mb-4">2025 Manifesto</span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-medium text-brand-white tracking-tighter">
                Design the <br/> <span className="text-brand-sub">Mind.</span>
              </h2>
          </div>
          <div className="md:text-right">
              <p className="text-brand-gray max-w-md ml-auto leading-relaxed text-sm md:text-base">
                The age of the coder is ending. The age of the architect has begun. 
                We are engineering Vibe Architects—builders who orchestrate intelligence through rigorous systems design.
              </p>
          </div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-4 auto-rows-auto md:auto-rows-[340px]">
            
            {/* Vision - Large Card */}
            <BentoCard 
                title="The Shift" 
                subtitle="Writing code is a commodity. Designing intelligence is a superpower."
                icon={<Brain className="w-6 h-6" />}
                className="md:col-span-3 lg:col-span-8 bg-gradient-to-br from-brand-surfaceHighlight to-brand-surface min-h-[300px]"
            >
                <div className="mt-8 p-4 bg-brand-black/50 rounded-lg border border-brand-white/5 font-mono text-[10px] md:text-xs text-brand-sub">
                    <div className="flex gap-2 mb-1"><span className="text-blue-400">From:</span> <span className="text-brand-yellow">Hardcore Coding</span></div>
                    <div className="flex gap-2"><span className="text-blue-400">To:</span> <span className="text-brand-yellow">Hardcore Architecture</span></div>
                </div>
            </BentoCard>

            {/* Mission - Vertical */}
            <BentoCard 
                title="Tame the Chaos" 
                subtitle="We reject the Black Box. We force AI into rigorous Interface Contracts using the MVF Standard."
                icon={<Zap className="w-6 h-6" />}
                className="md:col-span-3 lg:col-span-4 min-h-[250px]"
            />

            {/* Motive Statement */}
            <BentoCard 
                title="Prompting is Dead" 
                subtitle="Prompt Engineering is guessing. Real Architects design Kernels, Synapses, and Anchors."
                icon={<Shield className="w-6 h-6" />}
                className="md:col-span-6 lg:col-span-6 min-h-[250px]"
            >
               <div className="mt-auto flex items-center gap-3 pt-6">
                 <span className="px-3 py-1 rounded-full border border-brand-white/10 text-[10px] font-mono text-brand-gray uppercase">Own the Framework</span>
                 <span className="px-3 py-1 rounded-full border border-brand-white/10 text-[10px] font-mono text-brand-gray uppercase">Not the Tool</span>
               </div>
            </BentoCard>

            {/* Core Goals */}
            <BentoCard 
                title="The Destination" 
                subtitle="Make MVF the global standard. Eradicate black boxes. Prove top talent lives everywhere."
                icon={<Target className="w-6 h-6" />}
                className="md:col-span-6 lg:col-span-3 min-h-[250px]"
            />

            {/* Brand Values */}
             <BentoCard 
                title="Core Values" 
                subtitle="Architecture > Syntax. No Hallucinations. The Mirror Test. Rigorous Vibe."
                icon={<Lightbulb className="w-6 h-6" />}
                className="md:col-span-6 lg:col-span-3 bg-brand-yellow/10 border-brand-yellow/20 min-h-[250px]"
            />

        </div>

        {/* Rallying Cry Section */}
        <div className="mt-16 md:mt-20 pt-12 md:pt-16 border-t border-brand-white/5">
          <div className="max-w-3xl">
            <h3 className="text-2xl md:text-3xl font-display font-medium text-brand-white mb-6">The Rallying Cry</h3>
            <div className="space-y-4">
              <p className="text-brand-yellow text-lg md:text-xl font-medium">
                "Stop Prompting. Start Architecting."
              </p>
              <p className="text-brand-gray text-base md:text-lg">
                <span className="text-brand-white font-medium">Secondary Tagline:</span> mfourlabs: Design the Mind.
              </p>
              <p className="text-brand-gray text-base md:text-lg">
                <span className="text-brand-white font-medium">The Promise:</span> The Global Standard for Vibe Architecture.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};