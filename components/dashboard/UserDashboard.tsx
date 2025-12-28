import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthService, useAuth } from '../../services/authService';
import {
    LayoutDashboard,
    ShieldCheck,
    History,
    Settings,
    CreditCard,
    LogOut,
    Plus,
    Search,
    Bell,
    ChevronRight,
    Play,
    Terminal
} from 'lucide-react';
import { ComplianceService } from '../../services/complianceService';
import { DashboardHistory } from './DashboardHistory';
import { DashboardBilling } from './DashboardBilling';
import { DashboardSettings } from './DashboardSettings';

export const UserDashboard: React.FC = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('overview');
    const [showNewAudit, setShowNewAudit] = useState(false);
    const [systemPrompt, setSystemPrompt] = useState("");
    const [auditing, setAuditing] = useState(false);

    const handleLogout = async () => {
        await AuthService.logout();
        navigate('/login');
    };

    const handleRunAudit = async () => {
        setAuditing(true);
        try {
            const reportId = await ComplianceService.runAudit(systemPrompt);
            navigate(`/compliance/report/${reportId}`);
        } catch (e) {
            console.error(e);
            setAuditing(false);
        }
    };

    // Render Content Based on Tab
    const renderContent = () => {
        switch (activeTab) {
            case 'history': return <DashboardHistory />;
            case 'billing': return <DashboardBilling />;
            case 'settings': return <DashboardSettings />;
            case 'overview':
            default:
                return (
                    <>
                        {/* Existing Overview Content - Stats Grid, New Audit Button etc */}
                        <header className="flex items-center justify-between mb-8">
                            {/* ... same header as before ... */}
                            <h1 className="text-2xl font-bold font-display">Overview</h1>
                            <div className="flex items-center gap-4">
                                <div className="relative">
                                    <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-2.5" />
                                    <input type="text" placeholder="Search reports..." className="bg-zinc-900 border border-zinc-800 rounded-full pl-9 pr-4 py-2 text-sm text-zinc-300 focus:outline-none focus:border-zinc-700 w-64 transition-all" />
                                </div>
                                <button className="w-9 h-9 rounded-full border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors relative">
                                    <Bell className="w-4 h-4" />
                                    <span className="w-2 h-2 bg-red-500 rounded-full absolute top-2 right-2 border-2 border-[#09090b]"></span>
                                </button>
                                <button
                                    onClick={() => setShowNewAudit(true)}
                                    className="flex items-center gap-2 bg-brand-yellow text-black px-4 py-2 rounded-full text-sm font-bold hover:bg-brand-yellowDim transition-all hover:scale-105"
                                >
                                    <Plus className="w-4 h-4" /> New Audit
                                </button>
                            </div>
                        </header>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-3 gap-6 mb-8">
                            <StatCard label="Active Kernels" value="3" active />
                            <StatCard label="Passed Audits" value="12" />
                            <StatCard label="Critical Issues" value="2" alert />
                        </div>

                        {/* Interactive "New Audit" Section (Inline) */}
                        {showNewAudit && (
                            <div className="mb-8 animate-in slide-in-from-top-4 duration-500">
                                <div className="bg-gradient-to-br from-zinc-900 to-[#0A0A0C] border border-zinc-800 rounded-2xl p-6 relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-brand-yellow/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 group-hover:bg-brand-yellow/10 transition-colors duration-700"></div>

                                    <div className="flex justify-between items-start mb-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-zinc-800 rounded-lg flex items-center justify-center border border-zinc-700">
                                                <Terminal className="w-5 h-5 text-brand-yellow" />
                                            </div>
                                            <div>
                                                <h2 className="font-bold text-lg">Initialize New Compliance Scan</h2>
                                                <p className="text-zinc-500 text-sm">Target: EU AI Act Annex IV</p>
                                            </div>
                                        </div>
                                        <button onClick={() => setShowNewAudit(false)} className="text-zinc-500 hover:text-white transition-colors">Close</button>
                                    </div>

                                    <div className="flex gap-4">
                                        <div className="flex-1">
                                            <textarea
                                                value={systemPrompt}
                                                onChange={(e) => setSystemPrompt(e.target.value)}
                                                placeholder="Paste your System Prompt or Kernel Definition here..."
                                                className="w-full h-32 bg-black border border-zinc-800 rounded-xl p-4 font-mono text-sm text-zinc-300 focus:outline-none focus:border-brand-yellow/50 transition-colors resize-none mb-2 placeholder:text-zinc-700"
                                            />
                                        </div>
                                        <div className="w-64 flex flex-col gap-2">
                                            <div className="flex-1 bg-black/50 border border-zinc-800 rounded-xl p-4 text-xs text-zinc-500 space-y-2">
                                                <div className="flex justify-between"><span>Est. Runtime</span> <span className="text-zinc-300">~2m 30s</span></div>
                                                <div className="flex justify-between"><span>Tests</span> <span className="text-zinc-300">142 checks</span></div>
                                                <div className="flex justify-between"><span>Cost</span> <span className="text-zinc-300">Included</span></div>
                                            </div>
                                            <button
                                                onClick={handleRunAudit}
                                                disabled={!systemPrompt || auditing}
                                                className="w-full py-3 bg-white text-black font-bold rounded-xl hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2"
                                            >
                                                {auditing ? (
                                                    <>Processing...</>
                                                ) : (
                                                    <>
                                                        <Play className="w-4 h-4 fill-current" /> Run Scan
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Recent Reports List (Replaced by History Component in 'history' tab, but kept mini version here or removed?
                        Let's keep a mini version for Overview) */}
                        <div className="bg-zinc-900/30 border border-zinc-800 rounded-2xl overflow-hidden">
                            <div className="p-6 border-b border-zinc-800 flex justify-between items-center">
                                <h3 className="font-bold">Recent Audits</h3>
                                <button onClick={() => setActiveTab('history')} className="text-xs text-zinc-500 hover:text-white flex items-center gap-1">View All <ChevronRight className="w-3 h-3" /></button>
                            </div>
                            <div className="divide-y divide-zinc-800">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="p-4 flex items-center justify-between hover:bg-zinc-800/30 transition-colors cursor-pointer group" onClick={() => navigate('/compliance/report/RPT-2025-EU-X92')}>
                                        <div className="flex items-center gap-4">
                                            <div className={`w-2 h-2 rounded-full ${i === 2 ? 'bg-red-500' : 'bg-emerald-500'}`}></div>
                                            <div>
                                                <div className="font-medium text-sm group-hover:text-brand-yellow transition-colors">Sentinel-EU Core v1.{i}.0</div>
                                                <div className="text-xs text-zinc-500">Oct {24 - i}, 2025 • 2:30 PM</div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-6">
                                            <div className="text-right">
                                                <div className="text-xs font-bold text-zinc-300">Score</div>
                                                <div className={`font-mono text-sm ${i === 2 ? 'text-red-500' : 'text-emerald-500'}`}>{i === 2 ? '64' : '98'}/100</div>
                                            </div>
                                            <ChevronRight className="w-4 h-4 text-zinc-700 group-hover:text-zinc-500" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                );
        }
    }

    return (
        <div className="min-h-screen bg-[#09090b] text-zinc-100 font-sans flex overflow-hidden">

            {/* Sidebar */}
            <aside className="w-64 border-r border-zinc-800 bg-[#09090b] flex flex-col fixed h-full z-10">
                <div className="p-6">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-8 h-8 bg-brand-yellow rounded-lg flex items-center justify-center">
                            <ShieldCheck className="w-5 h-5 text-black" />
                        </div>
                        <span className="font-bold text-lg tracking-tight">Sentinel-EU</span>
                    </div>

                    <nav className="space-y-1">
                        <SidebarItem icon={<LayoutDashboard />} label="Dashboard" active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} />
                        <SidebarItem icon={<History />} label="Audit History" active={activeTab === 'history'} onClick={() => setActiveTab('history')} />
                        <SidebarItem icon={<CreditCard />} label="Billing" active={activeTab === 'billing'} onClick={() => setActiveTab('billing')} />
                        <SidebarItem icon={<Settings />} label="Settings" active={activeTab === 'settings'} onClick={() => setActiveTab('settings')} />
                    </nav>
                </div>

                <div className="mt-auto p-6 border-t border-zinc-800">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-sm font-bold">
                            {user?.displayName?.charAt(0) || 'U'}
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium truncate">{user?.displayName || 'User'}</div>
                            <div className="text-xs text-zinc-500 truncate">{user?.email}</div>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 text-xs font-medium text-zinc-500 hover:text-white transition-colors"
                    >
                        <LogOut className="w-3 h-3" /> Sign Out
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-64 p-8 relative overflow-y-auto w-full h-full">
                {renderContent()}
            </main>

        </div>
    );
};

const SidebarItem = ({ icon, label, active, onClick }: any) => (
    <button
        onClick={onClick}
        className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors mb-1 ${active
            ? 'bg-zinc-800 text-white'
            : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900'
            }`}
    >
        {React.cloneElement(icon, { className: "w-4 h-4" })}
        {label}
    </button>
);

const StatCard = ({ label, value, alert, active }: any) => (
    <div className={`p-6 rounded-2xl border flex flex-col justify-between h-32 relative overflow-hidden group transition-all hover:-translate-y-1 ${active
        ? 'bg-zinc-100 text-black border-transparent'
        : 'bg-zinc-900/50 border-zinc-800 text-zinc-300 hover:border-zinc-700'
        }`}>
        <div className="text-xs font-bold uppercase tracking-wider opacity-60">{label}</div>
        <div className="text-4xl font-display font-bold tracking-tight">{value}</div>
        {active && (
            <div className="absolute right-0 bottom-0 opacity-10">
                <ShieldCheck className="w-32 h-32 translate-x-8 translate-y-8" />
            </div>
        )}
    </div>
);
