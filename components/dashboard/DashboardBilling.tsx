import React, { useEffect, useState } from 'react';
import { ComplianceService } from '../../services/complianceService';
import { CreditCard, Check, Zap, ExternalLink, FileText } from 'lucide-react';

export const DashboardBilling: React.FC = () => {
    const [sub, setSub] = useState<any>(null);

    useEffect(() => {
        const load = async () => {
            const data = await ComplianceService.getSubscriptionDetails('user_123');
            setSub(data);
        };
        load();
    }, []);

    if (!sub) return <div className="p-12 text-zinc-500">Loading subscription data...</div>;

    const usagePercent = (sub.usage.current / sub.usage.limit) * 100;

    return (
        <div className="space-y-8 max-w-4xl">
            <header>
                <h2 className="text-2xl font-bold mb-2">Billing & Subscription</h2>
                <p className="text-zinc-500 text-sm">Manage your plan, payment methods, and invoices.</p>
            </header>

            <div className="grid md:grid-cols-2 gap-6">
                {/* Current Plan */}
                <div className="bg-zinc-900/30 border border-zinc-800 rounded-xl p-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-brand-yellow/5 rounded-full blur-[40px] translate-x-10 -translate-y-10"></div>
                    <div className="relative z-10">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="text-sm font-medium text-zinc-400 uppercase tracking-widest">Current Plan</h3>
                                <div className="text-3xl font-display font-bold mt-1 text-white">{sub.plan}</div>
                            </div>
                            <div className="bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 px-3 py-1 rounded-full text-xs font-bold uppercase">
                                {sub.status}
                            </div>
                        </div>
                        <div className="text-zinc-500 text-sm mb-6">
                            Renews on <span className="text-zinc-300">{new Date(sub.renewalDate).toLocaleDateString()}</span>
                        </div>

                        <div className="flex gap-3">
                            <a
                                href="https://billing.lemonsqueezy.com" // Mock link
                                target="_blank"
                                rel="noreferrer"
                                className="flex-1 bg-white text-black font-bold py-2.5 rounded-lg text-sm flex items-center justify-center gap-2 hover:bg-zinc-200 transition-colors"
                            >
                                <CreditCard className="w-4 h-4" /> Manage Subscription
                            </a>
                            <button className="px-4 py-2.5 border border-zinc-800 rounded-lg text-sm font-medium hover:bg-zinc-800 transition-colors">
                                Change Plan
                            </button>
                        </div>
                    </div>
                </div>

                {/* Usage Stats */}
                <div className="bg-zinc-900/30 border border-zinc-800 rounded-xl p-6 flex flex-col justify-center">
                    <h3 className="text-sm font-medium text-zinc-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                        <Zap className="w-4 h-4 text-brand-yellow" /> Monthly Usage
                    </h3>

                    <div className="space-y-4">
                        <div>
                            <div className="flex justify-between text-sm mb-2">
                                <span className="font-medium">Compliance Audits Run</span>
                                <span className="text-zinc-400">{sub.usage.current} / {sub.usage.limit}</span>
                            </div>
                            <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                                <div className="h-full bg-brand-yellow rounded-full transition-all duration-500" style={{ width: `${usagePercent}%` }}></div>
                            </div>
                        </div>
                        <p className="text-xs text-zinc-500">
                            You have used {Math.round(usagePercent)}% of your monthly included audits.
                            <span className="block mt-1 text-zinc-400">Upgrade to Enterprise for unlimited scanning.</span>
                        </p>
                    </div>
                </div>
            </div>

            {/* Invoices */}
            <div className="pt-8 border-t border-zinc-800/50">
                <h3 className="font-bold text-lg mb-4">Invoice History</h3>
                <div className="bg-zinc-900/30 border border-zinc-800 rounded-xl overflow-hidden">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-zinc-900/50 text-zinc-500 border-b border-zinc-800">
                            <tr>
                                <th className="px-6 py-3 font-medium text-xs uppercase">Invoice ID</th>
                                <th className="px-6 py-3 font-medium text-xs uppercase">Date</th>
                                <th className="px-6 py-3 font-medium text-xs uppercase">Amount</th>
                                <th className="px-6 py-3 font-medium text-xs uppercase">Status</th>
                                <th className="px-6 py-3 font-medium text-xs uppercase text-right">Download</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-800">
                            {sub.invoices.map((inv: any) => (
                                <tr key={inv.id} className="hover:bg-zinc-800/20 transition-colors">
                                    <td className="px-6 py-4 font-mono text-zinc-400">{inv.id}</td>
                                    <td className="px-6 py-4">{inv.date}</td>
                                    <td className="px-6 py-4 text-white font-medium">{inv.amount}</td>
                                    <td className="px-6 py-4">
                                        <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full w-fit">
                                            <Check className="w-3 h-3" /> {inv.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="text-zinc-500 hover:text-white transition-colors">
                                            <FileText className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="mt-4 text-center">
                    <a href="#" className="text-xs text-zinc-500 hover:text-zinc-300 flex items-center justify-center gap-1">
                        View all invoices in Lemon Squeezy <ExternalLink className="w-3 h-3" />
                    </a>
                </div>
            </div>

        </div>
    );
};
