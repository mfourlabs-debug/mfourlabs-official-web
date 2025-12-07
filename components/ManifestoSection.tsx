import React from 'react';
import { Box, Layers, Cpu, Ban, Braces, Database } from 'lucide-react';

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
              <span className="block font-mono text-xs text-brand-yellow uppercase tracking-widest mb-4">The Core Protocol</span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-medium text-brand-white tracking-tighter">
                Engineering <br/> <span className="text-brand-sub">First Principles.</span>
              </h2>
          </div>
          <div className="md:text-right">
              <p className="text-brand-gray max-w-md ml-auto leading-relaxed text-sm md:text-base">
                Deconstructing modern software engineering to its mathematical and logical foundations. 
                We don't teach tools. We teach how to build the tools.
              </p>
          </div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-4 auto-rows-auto md:auto-rows-[340px]">
            
            {/* First Principles - Large Card */}
            <BentoCard 
                title="First Principles" 
                subtitle="If you can't build it with Math and Python from scratch, you don't understand it. We reject abstraction until understanding is proven."
                icon={<Box className="w-6 h-6" />}
                className="md:col-span-3 lg:col-span-8 bg-gradient-to-br from-brand-surfaceHighlight to-brand-surface min-h-[300px]"
            >
                <div className="mt-8 p-4 bg-brand-black/50 rounded-lg border border-brand-white/5 font-mono text-[10px] md:text-xs text-brand-sub">
                    <div className="flex gap-2 mb-1"><span className="text-blue-400">class</span> <span className="text-brand-yellow">NeuralNet</span>:</div>
                    <div className="pl-4 text-brand-gray">def __init__(self):</div>
                    <div className="pl-8 text-brand-gray"># No Torch. Just Math.</div>
                </div>
            </BentoCard>

            {/* No Magic - Vertical */}
            <BentoCard 
                title="No Magic" 
                subtitle="We ban 'Black Boxes'. Open the library. Look inside."
                icon={<Ban className="w-6 h-6" />}
                className="md:col-span-3 lg:col-span-4 min-h-[250px]"
            />

            {/* Modern Stack - Tall/Wide */}
            <BentoCard 
                title="Modern Architecture" 
                subtitle="Replace outdated OOP inheritance with Composition & Data-Oriented Design (DOD). Align with high-performance standards."
                icon={<Cpu className="w-6 h-6" />}
                className="md:col-span-6 lg:col-span-6 min-h-[250px]"
            >
               <div className="mt-auto flex items-center gap-3 pt-6">
                 <span className="px-3 py-1 rounded-full border border-brand-white/10 text-[10px] font-mono text-brand-gray uppercase">ECS Pattern</span>
                 <span className="px-3 py-1 rounded-full border border-brand-white/10 text-[10px] font-mono text-brand-gray uppercase">Data-Locality</span>
               </div>
            </BentoCard>

            {/* Architecture First */}
            <BentoCard 
                title="Design First" 
                subtitle="Code is cheap. Structure is expensive. We design the system before writing a single line."
                icon={<Layers className="w-6 h-6" />}
                className="md:col-span-6 lg:col-span-3 min-h-[250px]"
            />

            {/* Struggle */}
             <BentoCard 
                title="Rigorous" 
                subtitle="Real engineering isn't a 10-minute tutorial. It's struggle, failed experiments, and iteration."
                icon={<Database className="w-6 h-6" />}
                className="md:col-span-6 lg:col-span-3 bg-brand-yellow/10 border-brand-yellow/20 min-h-[250px]"
            />

        </div>
      </div>
    </section>
  );
};