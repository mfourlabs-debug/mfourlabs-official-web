import React, { useEffect, useState } from 'react';
import { ComplianceReport, ComplianceService } from '../../services/complianceService';
import { Search, FileText, ChevronRight, Download, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const DashboardHistory: React.FC = () => {
    const navigate = useNavigate();
    const [reports, setReports] = useState<ComplianceReport[]>([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            const data = await ComplianceService.getUserReports('user_123');
            setReports(data);
            setLoading(false);
        };
        load();
    }, []);

    const filtered = reports.filter(r =>
        r.kernel_name.toLowerCase().includes(search.toLowerCase()) ||
        r.id.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <header className="flex justify-between items-end">
                <div>
                    <h2 className="text-2xl font-bold mb-2">Audit History</h2>
                    <p className="text-zinc-500 text-sm">View and download your past compliance reports.</p>
                </div>
                <div className="flex gap-3">
                    <div className="relative">
                        <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-2.5" />
                        <input
                            type="text"
                            placeholder="Search reports..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="bg-zinc-900 border border-zinc-800 rounded-lg pl-9 pr-4 py-2 text-sm text-zinc-300 focus:outline-none focus:border-zinc-700 w-64 transition-all"
                        />
                    </div>
                    <button className="flex items-center gap-2 px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-sm text-zinc-400 hover:text-white transition-colors">
                        <Filter className="w-4 h-4" /> Filter
                    </button>
                </div>
            </header>

            <div className="bg-zinc-900/30 border border-zinc-800 rounded-xl overflow-hidden">
                <table className="w-full text-left text-sm">
                    <thead>
                        <tr className="border-b border-zinc-800 bg-zinc-900/50 text-zinc-500">
                            <th className="px-6 py-4 font-medium uppercase text-xs tracking-wider">Report ID</th>
                            <th className="px-6 py-4 font-medium uppercase text-xs tracking-wider">Kernel Name</th>
                            <th className="px-6 py-4 font-medium uppercase text-xs tracking-wider">Date</th>
                            <th className="px-6 py-4 font-medium uppercase text-xs tracking-wider">Score</th>
                            <th className="px-6 py-4 font-medium uppercase text-xs tracking-wider">Status</th>
                            <th className="px-6 py-4 font-medium uppercase text-xs tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800">
                        {loading ? (
                            <tr><td colSpan={6} className="px-6 py-8 text-center text-zinc-500">Loading records...</td></tr>
                        ) : filtered.map(report => (
                            <tr
                                key={report.id}
                                onClick={() => navigate(`/compliance/report/${report.id}`)}
                                className="group hover:bg-zinc-800/30 transition-colors cursor-pointer"
                            >
                                <td className="px-6 py-4 font-mono text-zinc-400 group-hover:text-brand-yellow transition-colors">{report.id}</td>
                                <td className="px-6 py-4 font-medium flex items-center gap-3">
                                    <FileText className="w-4 h-4 text-zinc-600" />
                                    {report.kernel_name} <span className="text-zinc-600 text-xs">v{report.version}</span>
                                </td>
                                <td className="px-6 py-4 text-zinc-500">
                                    {new Date(report.timestamp).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <div className="w-16 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                                            <div
                                                className={`h-full rounded-full ${report.resilience_score > 80 ? 'bg-emerald-500' : 'bg-red-500'}`}
                                                style={{ width: `${report.resilience_score}%` }}
                                            ></div>
                                        </div>
                                        <span className="text-xs font-mono">{report.resilience_score}%</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide border ${report.status === 'PASS'
                                            ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
                                            : 'bg-red-500/10 text-red-500 border-red-500/20'
                                        }`}>
                                        {report.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        {report.is_paid ? (
                                            <button className="p-2 text-zinc-500 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors" title="Download PDF" onClick={(e) => { e.stopPropagation(); }}>
                                                <Download className="w-4 h-4" />
                                            </button>
                                        ) : (
                                            <span className="text-[10px] text-zinc-600 border border-zinc-800 px-2 py-1 rounded">Locked</span>
                                        )}
                                        <ChevronRight className="w-4 h-4 text-zinc-700 group-hover:text-zinc-500" />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {!loading && filtered.length === 0 && (
                    <div className="p-12 text-center text-zinc-500">No reports found matching your search.</div>
                )}
            </div>
        </div>
    );
};
