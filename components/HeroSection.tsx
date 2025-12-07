import React, { useEffect, useState } from 'react';
import { Button } from './Button';
import { GoogleGenAI } from "@google/genai";
import { ArrowRight, Terminal } from 'lucide-react';

interface HeroProps {
  onEnterLab: () => void;
}

export const HeroSection: React.FC<HeroProps> = ({ onEnterLab }) => {
  const [dailyInsight, setDailyInsight] = useState<string>("INITIALIZING PROTOCOLS...");

  useEffect(() => {
    const fetchInsight = async () => {
      if (!process.env.API_KEY) {
        setDailyInsight("DESIGN SYSTEMS. NOT JUST CODE.");
        return;
      }
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const model = "gemini-2.5-flash";
        const response = await ai.models.generateContent({
          model,
          contents: "Generate a single, short, cryptic but profound sentence about Software Architecture or Engineering. Max 8 words. Uppercase.",
        });
        if (response.text) {
          setDailyInsight(response.text.trim());
        }
      } catch (e) {
        setDailyInsight("FIRST PRINCIPLES: DECONSTRUCT. REBUILD.");
      }
    };

    fetchInsight();
  }, []);

  return (
    <section id="vision" className="relative min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 pt-24 md:pt-24 overflow-hidden bg-brand-black">

      {/* Dynamic Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none"></div>

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col items-center">

        {/* Status Badge */}
        <div className="mb-8 md:mb-10 animate-slide-up opacity-0 flex items-center gap-3 px-4 py-1.5 rounded-full border border-brand-white/10 bg-brand-white/5 backdrop-blur" style={{ animationDelay: '0.1s' }}>
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-yellow opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-yellow"></span>
          </span>
          <span className="text-[10px] md:text-[11px] font-mono tracking-widest text-brand-gray uppercase">Global Research Node</span>
        </div>

        {/* Main Title - Massive & Responsive */}
        <div className="text-center mb-8 md:mb-10 relative">
          <h1 className="text-[13vw] md:text-[11vw] lg:text-[11rem] font-display font-bold tracking-tighter leading-[0.85] text-brand-white animate-slide-up opacity-0" style={{ animationDelay: '0.2s' }}>
            ARCHITECTS
          </h1>
          <h1 className="text-[13vw] md:text-[11vw] lg:text-[11rem] font-display font-bold tracking-tighter leading-[0.85] text-transparent bg-clip-text bg-gradient-to-b from-brand-gray/50 to-brand-black/0 animate-slide-up opacity-0" style={{ animationDelay: '0.3s' }}>
            NOT CODERS
          </h1>
        </div>

        {/* Subtitle / Description */}
        <p className="text-base md:text-xl text-brand-gray max-w-xl md:max-w-2xl text-center mb-10 md:mb-14 leading-relaxed font-light animate-slide-up opacity-0 px-4" style={{ animationDelay: '0.4s' }}>
          We bridge the gap between University Theory and Elite R&D.
          Rejecting copy-paste culture to build from <span className="text-brand-white font-medium">First Principles</span>.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 items-center animate-slide-up opacity-0 w-full sm:w-auto px-4" style={{ animationDelay: '0.5s' }}>
          <button
            onClick={onEnterLab}
            className="w-full sm:w-auto group relative px-8 py-4 bg-brand-white text-black rounded-full font-medium tracking-tight overflow-hidden transition-all hover:scale-105 active:scale-95 text-center"
          >
            <div className="absolute inset-0 bg-brand-yellow translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            <span className="relative flex items-center justify-center gap-2 group-hover:text-black transition-colors">
              Enter mfourlabs.Lab <ArrowRight className="w-4 h-4" />
            </span>
          </button>

          <button
            onClick={() => document.getElementById('philosophy')?.scrollIntoView({ behavior: 'smooth' })}
            className="w-full sm:w-auto px-8 py-4 text-brand-gray hover:text-brand-white transition-colors text-sm font-medium tracking-wide border-b border-transparent hover:border-brand-white/20"
          >
            Read The Manifesto
          </button>
        </div>

        {/* AI Insight Terminal */}
        <div className="absolute bottom-10 left-6 md:left-10 animate-fade-in opacity-0 hidden lg:block" style={{ animationDelay: '1.2s' }}>
          <div className="flex items-center gap-2 text-[10px] font-mono text-brand-sub mb-2 uppercase tracking-widest">
            <Terminal className="w-3 h-3" />
            <span>System Broadcast // Daily-Ref</span>
          </div>
          <div className="pl-3 border-l border-brand-yellow/50">
            <p className="text-xs text-brand-gray font-mono max-w-[200px] uppercase">{dailyInsight}</p>
          </div>
        </div>

      </div>
    </section>
  );
};