import React, { useState, useEffect } from 'react';
import { Users, TrendingUp, Clock, CheckCircle, XCircle, Award, Download } from 'lucide-react';
import { WaitlistService } from '../services/waitlistService';
import { WaitlistStats, EarlyAccessUser } from '../types/earlyAccess';

/**
 * Admin Dashboard for Early Access Waitlist Management
 * Protected route - should require authentication in production
 */
export const AdminDashboard: React.FC = () => {
    const [stats, setStats] = useState<WaitlistStats | null>(null);
    const [pendingUsers, setPendingUsers] = useState<EarlyAccessUser[]>([]);
    const [topReferrers, setTopReferrers] = useState<Array<{ user: EarlyAccessUser, referralCount: number }>>([]);
    const [loading, setLoading] = useState(true);
    const [selectedTab, setSelectedTab] = useState<'overview' | 'pending' | 'approved' | 'referrals'>('overview');

    useEffect(() => {
        loadDashboardData();
    }, []);

    const loadDashboardData = async () => {
        setLoading(true);
        try {
            const [statsData, pending, referrers] = await Promise.all([
                WaitlistService.getWaitlistStats(),
                WaitlistService.getUsersByStatus('pending'),
                WaitlistService.getTopReferrers(10),
            ]);

            setStats(statsData);
            setPendingUsers(pending);
            setTopReferrers(referrers);
        } catch (error) {
            console.error('Error loading dashboard data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleApproveUser = async (email: string) => {
        try {
            await WaitlistService.updateUserStatus(email, 'approved');
            await loadDashboardData(); // Refresh data
            alert('User approved successfully!');
        } catch (error) {
            console.error('Error approving user:', error);
            alert('Failed to approve user');
        }
    };

    const handleBulkApprove = async (count: number) => {
        if (!confirm(`Approve the next ${count} users?`)) return;

        try {
            const approved = await WaitlistService.bulkApproveUsers(count);
            await loadDashboardData();
            alert(`Successfully approved ${approved} users!`);
        } catch (error) {
            console.error('Error bulk approving:', error);
            alert('Failed to bulk approve users');
        }
    };

    const exportToCSV = () => {
        if (!pendingUsers.length) return;

        const headers = ['Name', 'Email', 'Role', 'Organization', 'Experience', 'Interests', 'Referral Source', 'Position', 'Created At'];
        const rows = pendingUsers.map(user => [
            user.name,
            user.email,
            user.role,
            user.organization,
            user.experienceLevel,
            user.interestAreas.join('; '),
            user.referralSource,
            user.waitlistPosition,
            user.createdAt.toString(),
        ]);

        const csv = [headers, ...rows].map(row => row.join(',')).join('\n');
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `waitlist_${new Date().toISOString()}.csv`;
        a.click();
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-brand-yellow border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <div className="text-neutral-400">Loading dashboard...</div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-display font-bold mb-2">Early Access Dashboard</h1>
                    <p className="text-neutral-400">Manage your mfourlabs waitlist</p>
                </div>

                {/* Stats Cards */}
                {stats && (
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                        <div className="p-6 rounded-xl bg-neutral-900 border border-white/10">
                            <div className="flex items-center gap-3 mb-2">
                                <Users className="w-5 h-5 text-brand-yellow" />
                                <div className="text-sm text-neutral-400">Total Users</div>
                            </div>
                            <div className="text-3xl font-bold">{stats.totalUsers}</div>
                        </div>

                        <div className="p-6 rounded-xl bg-neutral-900 border border-white/10">
                            <div className="flex items-center gap-3 mb-2">
                                <Clock className="w-5 h-5 text-orange-500" />
                                <div className="text-sm text-neutral-400">Pending</div>
                            </div>
                            <div className="text-3xl font-bold">{stats.pendingCount}</div>
                        </div>

                        <div className="p-6 rounded-xl bg-neutral-900 border border-white/10">
                            <div className="flex items-center gap-3 mb-2">
                                <CheckCircle className="w-5 h-5 text-green-500" />
                                <div className="text-sm text-neutral-400">Approved</div>
                            </div>
                            <div className="text-3xl font-bold">{stats.approvedCount}</div>
                        </div>

                        <div className="p-6 rounded-xl bg-neutral-900 border border-white/10">
                            <div className="flex items-center gap-3 mb-2">
                                <TrendingUp className="w-5 h-5 text-blue-500" />
                                <div className="text-sm text-neutral-400">Active</div>
                            </div>
                            <div className="text-3xl font-bold">{stats.activeCount}</div>
                        </div>
                    </div>
                )}

                {/* Tabs */}
                <div className="flex gap-2 mb-6 border-b border-white/10">
                    {['overview', 'pending', 'approved', 'referrals'].map(tab => (
                        <button
                            key={tab}
                            onClick={() => setSelectedTab(tab as any)}
                            className={`px-6 py-3 text-sm font-medium capitalize transition-colors ${selectedTab === tab
                                    ? 'text-brand-yellow border-b-2 border-brand-yellow'
                                    : 'text-neutral-400 hover:text-white'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Tab Content */}
                {selectedTab === 'pending' && (
                    <div className="space-y-4">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-bold">Pending Approvals</h2>
                            <div className="flex gap-2">
                                <button
                                    onClick={exportToCSV}
                                    className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 rounded-lg flex items-center gap-2 transition-colors"
                                >
                                    <Download className="w-4 h-4" />
                                    Export CSV
                                </button>
                                <button
                                    onClick={() => handleBulkApprove(10)}
                                    className="px-4 py-2 bg-brand-yellow text-black font-semibold rounded-lg hover:bg-white transition-colors"
                                >
                                    Approve Next 10
                                </button>
                            </div>
                        </div>

                        <div className="space-y-2">
                            {pendingUsers.map((user, index) => (
                                <div key={user.email} className="p-4 rounded-lg bg-neutral-900 border border-white/10 flex items-center justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-1">
                                            <span className="text-sm font-mono text-neutral-500">#{user.waitlistPosition}</span>
                                            <span className="font-semibold">{user.name}</span>
                                            <span className="text-sm text-neutral-400">{user.email}</span>
                                        </div>
                                        <div className="flex gap-4 text-xs text-neutral-500">
                                            <span>{user.role}</span>
                                            <span>{user.organization}</span>
                                            <span>{user.experienceLevel}</span>
                                            <span className="text-brand-yellow">{user.interestAreas.length} interests</span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => handleApproveUser(user.email)}
                                        className="px-4 py-2 bg-green-600 hover:bg-green-500 rounded-lg text-sm font-semibold transition-colors"
                                    >
                                        Approve
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {selectedTab === 'referrals' && (
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold mb-4">Top Referrers</h2>
                        <div className="space-y-2">
                            {topReferrers.map((item, index) => (
                                <div key={item.user.email} className="p-4 rounded-lg bg-neutral-900 border border-white/10 flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-brand-yellow/10 flex items-center justify-center">
                                            <Award className="w-5 h-5 text-brand-yellow" />
                                        </div>
                                        <div>
                                            <div className="font-semibold">{item.user.name}</div>
                                            <div className="text-sm text-neutral-400">{item.user.referralCode}</div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-2xl font-bold text-brand-yellow">{item.referralCount}</div>
                                        <div className="text-xs text-neutral-500">referrals</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
