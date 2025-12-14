import React, { useState, useEffect } from 'react';
import { HeroSection } from './components/HeroSection';
import { ManifestoSection } from './components/ManifestoSection';
import { CurriculumSection } from './components/CurriculumSection';
import { RoadmapSection } from './components/RoadmapSection';
import { LabRegistration } from './components/LabRegistration';
import { ArrowUpRight, Menu, X, ExternalLink, Globe, ShieldCheck, ChevronRight } from 'lucide-react';

const Preloader: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [log, setLog] = useState("Initializing Core Systems...");

  useEffect(() => {
    const logs = [
      "Loading Architectural Patterns...",
      "Deconstructing Legacy Modules...",
      "Optimizing Neural Pathways...",
      "Verifying First Principles...",
      "Establishing Secure Connection...",
      "Welcome to mfourlabs."
    ];

    let step = 0;
    const interval = setInterval(() => {
      setProgress(prev => Math.min(prev + Math.floor(Math.random() * 15), 100));
      if (Math.random() > 0.6 && step < logs.length) {
        setLog(logs[step]);
        step++;
      }
    }, 150);

    const timeout = setTimeout(() => {
      setProgress(100);
      setTimeout(onComplete, 800);
    }, 2500);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[100] bg-brand-black flex flex-col items-center justify-center font-mono text-xs text-brand-gray">
      <div className="w-64 mb-4 flex justify-between">
        <span>SYS.BOOT</span>
        <span className="text-brand-yellow">{progress}%</span>
      </div>
      <div className="w-64 h-0.5 bg-brand-surfaceHighlight overflow-hidden relative">
        <div
          className="absolute top-0 left-0 h-full bg-brand-yellow transition-all duration-200 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <div className="mt-4 h-6 text-brand-sub uppercase tracking-widest text-[10px] animate-pulse">
        {log}
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showRegistration, setShowRegistration] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleEnterLab = () => {
    setShowRegistration(true);
  };

  if (isLoading) {
    return <Preloader onComplete={() => setIsLoading(false)} />;
  }

  return (
    <div className="min-h-screen bg-brand-black text-brand-white font-sans selection:bg-brand-yellow selection:text-black animate-reveal">

      {/* Registration Overlay */}
      {showRegistration && <LabRegistration onClose={() => setShowRegistration(false)} />}

      {/* Floating Navigation Island */}
      <header role="banner">
        <nav
          className={`fixed top-6 left-0 right-0 z-50 transition-all duration-500 flex justify-center px-4`}
          aria-label="Main navigation"
        >
          <div className={`
            flex items-center justify-between pl-6 pr-2 py-2.5 rounded-full transition-all duration-500
            ${scrolled
              ? 'w-full max-w-5xl bg-brand-surface/80 backdrop-blur-xl border border-brand-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)]'
              : 'w-full max-w-7xl bg-transparent border-transparent'}
          `}>

            {/* Brand */}
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo(0, 0)}>
              <div className="w-8 h-8 bg-brand-white text-brand-black rounded-full flex items-center justify-center font-bold font-display text-lg tracking-tighter">
                M4
              </div>
              <span className={`font-display font-semibold tracking-tight text-lg ${scrolled ? 'opacity-100' : 'opacity-0 md:opacity-100'} transition-opacity`}>MFOUR<span className="text-brand-yellow">LABS</span></span>
            </div>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-1">
              <a href="https://mfour-labs.gitbook.io/mfour-labs-docs/" className="px-4 py-2 text-sm font-medium text-brand-gray hover:text-brand-white transition-colors hover:bg-white/5 rounded-full">Docs</a>
              <a href="#philosophy" className="px-4 py-2 text-sm font-medium text-brand-gray hover:text-brand-white transition-colors hover:bg-white/5 rounded-full">Manifesto</a>
              <a href="#roadmap" className="px-4 py-2 text-sm font-medium text-brand-gray hover:text-brand-white transition-colors hover:bg-white/5 rounded-full">Research Trejectory</a>
            </div>

            {/* Action */}
            <div className="flex items-center gap-4">
              {/* Lab Registration - Coming Soon */}
              <button
                onClick={handleEnterLab}
                disabled
                className="group flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-white/30 text-brand-gray text-sm font-semibold transition-all duration-300 cursor-not-allowed opacity-50"
                aria-label="Lab Registration"
              >
                <span>Request MVF Cloud (alpha)</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>

              {/* Mobile Toggle */}
              <button
                className="md:hidden w-10 h-10 flex items-center justify-center text-brand-white bg-white/5 rounded-full"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle mobile menu"
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu Overlay */}
          {isMobileMenuOpen && (
            <div className="md:hidden absolute top-20 left-4 right-4 bg-brand-surface border border-brand-border rounded-2xl p-6 flex flex-col gap-2 shadow-2xl animate-slide-up">
              <a href="https://mfour-labs.gitbook.io/mfour-labs-docs/" onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-3 text-lg font-medium text-brand-white hover:bg-white/5 rounded-lg">Docs</a>
              <a href="#philosophy" onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-3 text-lg font-medium text-brand-white hover:bg-white/5 rounded-lg">Manifesto</a>
              <a href="#roadmap" onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-3 text-lg font-medium text-brand-white hover:bg-white/5 rounded-lg">Research Trejectory</a>
            </div>
          )}
        </nav>
      </header>


      <main className="bg-noise bg-repeat">
        <HeroSection onEnterLab={handleEnterLab} />
        <ManifestoSection />
        <CurriculumSection />
        <RoadmapSection />
      </main>

      {/* Massive Architectural Footer */}
      <footer className="pt-32 pb-12 px-6 bg-brand-offblack border-t border-brand-border font-sans">
        <div className="max-w-7xl mx-auto">

          {/* Top Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-12 mb-24">
            <div className="col-span-2 lg:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-6 h-6 bg-brand-yellow rounded-full"></div>
                <span className="font-display font-bold text-xl tracking-tight">mfourlabs</span>
              </div>
              <p className="text-brand-sub text-sm leading-relaxed max-w-xs mb-8">
                The Research Lab for First Principles Engineering. Deconstructing the stack, rebuilding intelligence, and defining the 1% standard.
              </p>
              <div className="flex gap-4">
                <Globe className="w-5 h-5 text-brand-sub hover:text-brand-white transition-colors cursor-pointer" />
                <ShieldCheck className="w-5 h-5 text-brand-sub hover:text-brand-white transition-colors cursor-pointer" />
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <h4 className="text-sm font-semibold text-brand-white">Platform</h4>
              <button onClick={handleEnterLab} className="text-sm text-brand-gray hover:text-brand-white transition-colors text-left">MVF CLI (beta) </button>
              <a href="https://mfour-labs.gitbook.io/mfour-labs-docs/" className="text-sm text-brand-gray hover:text-brand-white transition-colors text-left">Documentation</a>
              <button onClick={() => window.scrollTo(0, 0)} className="text-sm text-brand-gray hover:text-brand-white transition-colors text-left">System Design</button>
              <button onClick={() => window.scrollTo(0, 0)} className="text-sm text-brand-gray hover:text-brand-white transition-colors text-left">Changelog</button>
            </div>

            <div className="flex flex-col gap-4">
              <h4 className="text-sm font-semibold text-brand-white">Research</h4>
              <button onClick={() => window.scrollTo(0, 0)} className="text-sm text-brand-gray hover:text-brand-white transition-colors text-left">Methodology</button>
              <button onClick={() => window.scrollTo(0, 0)} className="text-sm text-brand-gray hover:text-brand-white transition-colors text-left">Publications</button>
              <button onClick={() => window.scrollTo(0, 0)} className="text-sm text-brand-gray hover:text-brand-white transition-colors text-left">Case Studies</button>
              <button onClick={() => window.scrollTo(0, 0)} className="text-sm text-brand-gray hover:text-brand-white transition-colors text-left">Open Source</button>
            </div>

            <div className="flex flex-col gap-4">
              <h4 className="text-sm font-semibold text-brand-white">Community</h4>
              <a href="https://x.com/mfourlabs" target="_blank" rel="noreferrer" className="text-sm text-brand-gray hover:text-brand-white transition-colors">X (Twitter)</a>
              <a href="https://www.linkedin.com/company/mfourlabs" target="_blank" rel="noreferrer" className="text-sm text-brand-gray hover:text-brand-white transition-colors">LinkedIn</a>
            </div>

            <div className="flex flex-col gap-4">
              <h4 className="text-sm font-semibold text-brand-white">Legal</h4>
              <button onClick={() => window.scrollTo(0, 0)} className="text-sm text-brand-gray hover:text-brand-white transition-colors text-left">Privacy</button>
              <button onClick={() => window.scrollTo(0, 0)} className="text-sm text-brand-gray hover:text-brand-white transition-colors text-left">Terms</button>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="pt-8 border-t border-brand-border flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-brand-sub font-mono">
              © 2025 MFOUR LABS. ALL RIGHTS RESERVED. The MFOUR Vibe Framework™ is licensed under CC BY-ND 4.0. Verified Authority: mfourlabs.dev | Global Standard: MF-CVA-02
            </p>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-xs text-brand-sub font-mono uppercase">All Systems Operational</span>
            </div>
          </div>

          {/* Big Text Background */}
          <div className="mt-20 border-t border-brand-border/30 pt-10 overflow-hidden select-none">
            <h1 className="text-[12vw] leading-none font-bold text-brand-white/5 text-center tracking-tighter">
              START ARCHITECTING
            </h1>
          </div>

        </div>
      </footer>
    </div>
  );
};

export default App;