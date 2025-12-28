import React, { useState } from 'react';
import { useAuth } from '../../services/authService';
import { User, Key, Bell, Copy, Check, ShieldAlert } from 'lucide-react';

export const DashboardSettings: React.FC = () => {
    const { user } = useAuth();
    const [apiKey, setApiKey] = useState('sk_live_51M...');
    const [copied, setCopied] = useState(false);
    const [showKey, setShowKey] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText('sk_live_51Mz92XL...CompleteKeyHere');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleRegenerate = () => {
        if (confirm("Are you sure? This will invalidate your existing key immediately.")) {
            // Mock regeneration
            setApiKey('sk_live_NewKeyGenerated_' + Math.random().toString(36).substring(7));
            alert("New API Key Generated");
        }
    };

    return (
        <div className="max-w-3xl space-y-10">
            <header>
                <h2 className="text-2xl font-bold mb-2">Account Settings</h2>
                <p className="text-zinc-500 text-sm">Manage your profile, security, and integration keys.</p>
            </header>

            {/* Profile Section */}
            <section className="space-y-4">
                <h3 className="text-lg font-bold flex items-center gap-2 pb-2 border-b border-zinc-800">
                    <User className="w-5 h-5 text-zinc-500" /> Profile
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-zinc-500">Display Name</label>
                        <input
                            type="text"
                            value={user?.displayName || ''}
                            disabled
                            className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg px-4 py-2 text-sm text-zinc-400 cursor-not-allowed"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-zinc-500">Email Address</label>
                        <input
                            type="email"
                            value={user?.email || ''}
                            disabled
                            className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg px-4 py-2 text-sm text-zinc-400 cursor-not-allowed"
                        />
                    </div>
                </div>
                <p className="text-xs text-zinc-600">To change your email or password, please contact enterprise support (SSO Managed).</p>
            </section>

            {/* API Keys Section */}
            <section className="space-y-4">
                <h3 className="text-lg font-bold flex items-center gap-2 pb-2 border-b border-zinc-800">
                    <Key className="w-5 h-5 text-zinc-500" /> API Keys
                </h3>
                <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <div className="font-medium text-white">Production Secret Key</div>
                            <p className="text-sm text-zinc-500 mt-1">Use this key to authenticate with the Sentinel-EU CI/CD Pipeline.</p>
                        </div>
                        <button
                            onClick={handleRegenerate}
                            className="text-xs text-red-500 hover:text-red-400 hover:underline"
                        >
                            Revoke & Regenerate
                        </button>
                    </div>

                    <div className="flex gap-2">
                        <div className="flex-1 bg-black border border-zinc-800 rounded-lg px-4 py-3 font-mono text-sm text-zinc-300 flex justify-between items-center group relative">
                            <span>{showKey ? apiKey : '••••••••••••••••••••••••••••••••'}</span>
                            <button
                                onClick={() => setShowKey(!showKey)}
                                className="absolute right-12 text-xs text-zinc-500 hover:text-white px-2 py-1"
                            >
                                {showKey ? 'Hide' : 'Show'}
                            </button>
                        </div>
                        <button
                            onClick={handleCopy}
                            className="bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg px-4 transition-colors flex items-center gap-2 min-w-[100px] justify-center"
                        >
                            {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                            <span className="text-sm font-medium">{copied ? 'Copied' : 'Copy'}</span>
                        </button>
                    </div>
                    <div className="mt-4 flex items-center gap-2 text-xs text-amber-500/80 bg-amber-500/10 px-3 py-2 rounded-lg border border-amber-500/20">
                        <ShieldAlert className="w-4 h-4" />
                        Never share this key. It grants full access to your organization's compliance reports.
                    </div>
                </div>
            </section>

            {/* Notifications */}
            <section className="space-y-4">
                <h3 className="text-lg font-bold flex items-center gap-2 pb-2 border-b border-zinc-800">
                    <Bell className="w-5 h-5 text-zinc-500" /> Notifications
                </h3>
                <div className="space-y-3">
                    {['Audit Completion Alerts', 'Weekly Compliance Summary', 'Product Updates & Security Patches'].map(item => (
                        <div key={item} className="flex items-center justify-between py-2">
                            <span className="text-sm text-zinc-300">{item}</span>
                            <div className="w-10 h-5 bg-brand-yellow rounded-full relative cursor-pointer opacity-90 hover:opacity-100">
                                <div className="absolute right-1 top-1 w-3 h-3 bg-black rounded-full shadow-sm"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

        </div>
    );
};
