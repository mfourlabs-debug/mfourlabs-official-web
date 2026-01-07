import React from 'react';
import { Settings } from 'lucide-react';

export default function MaintenancePage() {
    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
            <div className="max-w-2xl w-full text-center space-y-8">
                {/* Icon */}
                <div className="flex justify-center">
                    <div className="relative">
                        <div className="absolute inset-0 bg-brand-yellow/20 blur-xl rounded-full" />
                        <Settings className="w-24 h-24 text-brand-yellow animate-spin-slow relative z-10" strokeWidth={1.5} />
                    </div>
                </div>

                {/* Title */}
                <h1 className="text-4xl md:text-6xl font-bold font-montserrat tracking-tight">
                    System <span className="text-brand-yellow">Maintenance</span>
                </h1>

                {/* Description */}
                <div className="space-y-4 text-gray-400 text-lg md:text-xl font-light">
                    <p>
                        We are currently performing scheduled upgrades to our kernel architecture.
                    </p>
                    <p>
                        The MFOUR Vibe Framework (MVF) is evolving. Please check back shortly.
                    </p>
                </div>

                {/* Status Indicator */}
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10 mt-8">
                    <span className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse" />
                    <span className="text-sm font-mono text-gray-300">STATUS: MAINTENANCE_MODE_ACTIVE</span>
                </div>
            </div>

            {/* Footer */}
            <div className="absolute bottom-8 text-gray-600 text-sm font-mono">
                &copy; {new Date().getFullYear()} MFOURLABS. All systems nominal.
            </div>
        </div>
    );
}
