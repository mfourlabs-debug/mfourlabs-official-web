import React, { useState } from 'react';
import { X, Download, Trash2, Shield, CheckCircle2, AlertTriangle, Mail } from 'lucide-react';
import { gdprService } from '../services/gdprService';

interface GDPRDataManagementProps {
    onClose: () => void;
    userEmail?: string;
}

export const GDPRDataManagement: React.FC<GDPRDataManagementProps> = ({ onClose, userEmail: initialEmail }) => {
    const [email, setEmail] = useState(initialEmail || '');
    const [activeTab, setActiveTab] = useState<'export' | 'delete'>('export');
    const [isProcessing, setIsProcessing] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
    const [deletionReason, setDeletionReason] = useState('');
    const [confirmDelete, setConfirmDelete] = useState('');

    const handleDataExport = async () => {
        if (!email) {
            setMessage({ type: 'error', text: 'Please enter your email address' });
            return;
        }

        setIsProcessing(true);
        setMessage(null);

        try {
            const result = await gdprService.requestDataExport(email);

            if (result.success && result.data) {
                // Download the data
                gdprService.downloadDataAsJSON(result.data, `mfourlabs-data-${email}-${Date.now()}.json`);
                setMessage({
                    type: 'success',
                    text: 'Your data has been exported successfully! Check your downloads folder.',
                });
            } else {
                setMessage({
                    type: 'error',
                    text: result.error || 'Failed to export data. Please try again.',
                });
            }
        } catch (error: any) {
            setMessage({
                type: 'error',
                text: error.message || 'An error occurred while exporting your data.',
            });
        } finally {
            setIsProcessing(false);
        }
    };

    const handleAccountDeletion = async () => {
        if (!email) {
            setMessage({ type: 'error', text: 'Please enter your email address' });
            return;
        }

        if (confirmDelete !== 'DELETE') {
            setMessage({ type: 'error', text: 'Please type DELETE to confirm' });
            return;
        }

        setIsProcessing(true);
        setMessage(null);

        try {
            const result = await gdprService.requestAccountDeletion(email, deletionReason);

            if (result.success) {
                setMessage({
                    type: 'success',
                    text: 'Deletion request submitted successfully. Your account will be deleted within 30 days. You will receive a confirmation email.',
                });
                setTimeout(() => {
                    onClose();
                }, 3000);
            } else {
                setMessage({
                    type: 'error',
                    text: result.error || 'Failed to submit deletion request. Please try again.',
                });
            }
        } catch (error: any) {
            setMessage({
                type: 'error',
                text: error.message || 'An error occurred while processing your request.',
            });
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[80] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-6 animate-fade-in">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none"></div>

            {/* Modal Container */}
            <div className="relative w-full max-w-2xl bg-[#0A0A0A] border border-white/10 rounded-3xl overflow-hidden shadow-2xl ring-1 ring-white/5">

                {/* Header */}
                <div className="bg-gradient-to-b from-[#0A0A0A] to-[#0A0A0A]/95 backdrop-blur-xl border-b border-white/10 p-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-blue-500/10 rounded-xl border border-blue-500/20">
                                <Shield className="w-6 h-6 text-blue-400" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-display font-bold text-white tracking-tight">GDPR Data Management</h2>
                                <p className="text-sm text-neutral-400 mt-1">Manage your personal data and privacy</p>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 text-neutral-400 hover:text-white hover:bg-white/10 rounded-full transition-all"
                            aria-label="Close"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>
                </div>

                {/* Tabs */}
                <div className="grid grid-cols-2 border-b border-white/10">
                    <button
                        onClick={() => setActiveTab('export')}
                        className={`py-4 text-sm font-medium transition-all ${activeTab === 'export'
                            ? 'bg-white/5 text-brand-yellow border-b-2 border-brand-yellow'
                            : 'text-neutral-500 hover:text-white hover:bg-white/5'
                            }`}
                    >
                        <div className="flex items-center justify-center gap-2">
                            <Download className="w-4 h-4" />
                            Export Data
                        </div>
                    </button>
                    <button
                        onClick={() => setActiveTab('delete')}
                        className={`py-4 text-sm font-medium transition-all ${activeTab === 'delete'
                            ? 'bg-white/5 text-red-400 border-b-2 border-red-400'
                            : 'text-neutral-500 hover:text-white hover:bg-white/5'
                            }`}
                    >
                        <div className="flex items-center justify-center gap-2">
                            <Trash2 className="w-4 h-4" />
                            Delete Account
                        </div>
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                    {/* Email Input */}
                    <div className="space-y-2">
                        <label className="text-xs font-mono uppercase tracking-widest text-neutral-500">
                            Your Email Address
                        </label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-3 w-4 h-4 text-neutral-600" />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="name@example.com"
                                className="w-full bg-neutral-900 border border-white/10 rounded-lg py-2.5 pl-10 pr-4 text-sm text-white placeholder-neutral-600 focus:ring-2 focus:ring-brand-yellow/50 focus:border-brand-yellow/50 transition-all"
                            />
                        </div>
                    </div>

                    {/* Export Data Tab */}
                    {activeTab === 'export' && (
                        <div className="space-y-4 animate-fade-in">
                            <div className="bg-blue-950/20 border border-blue-500/30 rounded-xl p-4">
                                <h3 className="text-sm font-semibold text-blue-300 mb-2">Right to Data Portability</h3>
                                <p className="text-xs text-neutral-300 leading-relaxed">
                                    You have the right to receive a copy of your personal data in a structured, commonly used,
                                    and machine-readable format (JSON). This includes all information you provided during registration
                                    and any data we've collected about your account.
                                </p>
                            </div>

                            <div className="space-y-2">
                                <h4 className="text-xs font-semibold text-white">What's included in the export:</h4>
                                <ul className="text-xs text-neutral-400 space-y-1 ml-4">
                                    <li>• Personal information (name, email, date of birth)</li>
                                    <li>• Professional information (role, organization, interests)</li>
                                    <li>• Account information (access ID, waitlist position, status)</li>
                                    <li>• Preferences (newsletter subscription)</li>
                                    <li>• Metadata (registration date, last activity)</li>
                                </ul>
                            </div>

                            <button
                                onClick={handleDataExport}
                                disabled={isProcessing || !email}
                                className="w-full py-3 bg-blue-500 text-white text-sm font-bold rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                            >
                                {isProcessing ? (
                                    <>Processing...</>
                                ) : (
                                    <>
                                        <Download className="w-4 h-4" />
                                        Export My Data
                                    </>
                                )}
                            </button>
                        </div>
                    )}

                    {/* Delete Account Tab */}
                    {activeTab === 'delete' && (
                        <div className="space-y-4 animate-fade-in">
                            <div className="bg-red-950/20 border border-red-500/30 rounded-xl p-4">
                                <div className="flex items-start gap-3">
                                    <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                                    <div>
                                        <h3 className="text-sm font-semibold text-red-300 mb-2">Right to be Forgotten</h3>
                                        <p className="text-xs text-neutral-300 leading-relaxed">
                                            You have the right to request deletion of your personal data. This action is <strong>permanent and irreversible</strong>.
                                            All your data will be permanently deleted within 30 days.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <h4 className="text-xs font-semibold text-white">What will be deleted:</h4>
                                <ul className="text-xs text-neutral-400 space-y-1 ml-4">
                                    <li>• All personal information</li>
                                    <li>• Account access and credentials</li>
                                    <li>• Waitlist position</li>
                                    <li>• All associated data and metadata</li>
                                </ul>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-mono uppercase tracking-widest text-neutral-500">
                                    Reason for Deletion (Optional)
                                </label>
                                <textarea
                                    value={deletionReason}
                                    onChange={(e) => setDeletionReason(e.target.value)}
                                    placeholder="Help us improve by telling us why you're leaving..."
                                    rows={3}
                                    className="w-full bg-neutral-900 border border-white/10 rounded-lg py-2.5 px-4 text-sm text-white placeholder-neutral-600 focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 transition-all resize-none"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-mono uppercase tracking-widest text-neutral-500">
                                    Type "DELETE" to Confirm
                                </label>
                                <input
                                    type="text"
                                    value={confirmDelete}
                                    onChange={(e) => setConfirmDelete(e.target.value)}
                                    placeholder="DELETE"
                                    className="w-full bg-neutral-900 border border-white/10 rounded-lg py-2.5 px-4 text-sm text-white placeholder-neutral-600 focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 transition-all font-mono"
                                />
                            </div>

                            <button
                                onClick={handleAccountDeletion}
                                disabled={isProcessing || !email || confirmDelete !== 'DELETE'}
                                className="w-full py-3 bg-red-500 text-white text-sm font-bold rounded-lg hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                            >
                                {isProcessing ? (
                                    <>Processing...</>
                                ) : (
                                    <>
                                        <Trash2 className="w-4 h-4" />
                                        Delete My Account
                                    </>
                                )}
                            </button>
                        </div>
                    )}

                    {/* Message Display */}
                    {message && (
                        <div
                            className={`p-4 rounded-lg border animate-fade-in ${message.type === 'success'
                                ? 'bg-green-950/20 border-green-500/30'
                                : 'bg-red-950/20 border-red-500/30'
                                }`}
                        >
                            <div className="flex items-start gap-3">
                                {message.type === 'success' ? (
                                    <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                                ) : (
                                    <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                                )}
                                <p className={`text-xs leading-relaxed ${message.type === 'success' ? 'text-green-300' : 'text-red-300'
                                    }`}>
                                    {message.text}
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Data Retention Policy Link */}
                    <div className="pt-4 border-t border-white/10">
                        <p className="text-xs text-neutral-500 text-center">
                            Read our{' '}
                            <button
                                onClick={() => {
                                    const policy = gdprService.getDataRetentionPolicy();
                                    alert(policy);
                                }}
                                className="text-brand-yellow underline decoration-brand-yellow/40 underline-offset-2 hover:decoration-brand-yellow transition-colors"
                            >
                                Data Retention Policy
                            </button>
                        </p>
                    </div>
                </div>
            </div>

            {/* CSS */}
            <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
        </div>
    );
};
