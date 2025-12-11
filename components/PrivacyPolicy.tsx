import React from 'react';
import { X, Shield, Lock, Database, Eye, Mail, FileText, AlertCircle } from 'lucide-react';

interface PrivacyPolicyProps {
    onClose: () => void;
}

export const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ onClose }) => {
    return (
        <div className="fixed inset-0 z-[70] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-6 animate-fade-in overflow-hidden">

            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none"></div>
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-brand-yellow/5 blur-[120px] rounded-full pointer-events-none"></div>

            {/* Main Container */}
            <div className="relative w-full max-w-4xl max-h-[90vh] bg-[#0A0A0A] border border-white/10 rounded-3xl overflow-hidden shadow-2xl ring-1 ring-white/5 flex flex-col">

                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-white/5 bg-gradient-to-r from-white/[0.02] to-transparent shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-brand-yellow/10 border border-brand-yellow/20 flex items-center justify-center">
                            <Shield className="w-5 h-5 text-brand-yellow" />
                        </div>
                        <div>
                            <h2 className="text-xl font-display font-semibold text-white tracking-tight">Privacy Policy</h2>
                            <div className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">Last Updated: December 2025</div>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-neutral-500 hover:text-white transition-colors flex items-center gap-2 group"
                    >
                        <span className="font-mono text-xs opacity-0 group-hover:opacity-100 transition-opacity">CLOSE</span>
                        <div className="p-2 rounded-full hover:bg-white/10 transition-colors">
                            <X className="w-5 h-5" />
                        </div>
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 scrollbar-thin scrollbar-thumb-neutral-800 scrollbar-track-transparent">

                    {/* Introduction */}
                    <section className="space-y-3">
                        <div className="flex items-center gap-2 mb-3">
                            <FileText className="w-4 h-4 text-brand-yellow" />
                            <h3 className="text-lg font-display font-semibold text-white">Introduction</h3>
                        </div>
                        <p className="text-sm text-neutral-300 leading-relaxed">
                            Welcome to <span className="text-white font-semibold">MFOURLABS</span> ("we," "our," or "us"). We are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you register for lab access on our platform.
                        </p>
                        <p className="text-sm text-neutral-300 leading-relaxed">
                            By using our services and submitting your registration, you agree to the collection and use of information in accordance with this policy.
                        </p>
                    </section>

                    {/* Information We Collect */}
                    <section className="space-y-3">
                        <div className="flex items-center gap-2 mb-3">
                            <Database className="w-4 h-4 text-brand-yellow" />
                            <h3 className="text-lg font-display font-semibold text-white">Information We Collect</h3>
                        </div>
                        <div className="space-y-4">
                            <div className="p-4 rounded-xl bg-neutral-900/40 border border-white/5">
                                <h4 className="text-sm font-semibold text-white mb-2">Personal Information</h4>
                                <p className="text-sm text-neutral-400 leading-relaxed mb-2">
                                    When you register for lab access, we collect the following information:
                                </p>
                                <ul className="space-y-1 text-sm text-neutral-400 ml-4">
                                    <li className="flex items-start gap-2">
                                        <span className="text-brand-yellow mt-1">•</span>
                                        <span><strong className="text-white">Full Legal Name:</strong> To create your digital identity and lab credentials</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-brand-yellow mt-1">•</span>
                                        <span><strong className="text-white">Email Address:</strong> For account verification, communications, and newsletter delivery (if opted in)</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-brand-yellow mt-1">•</span>
                                        <span><strong className="text-white">Date of Birth:</strong> For age verification and compliance purposes</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-brand-yellow mt-1">•</span>
                                        <span><strong className="text-white">Role & Professional Information:</strong> Current role, academic level, degree/major, and organization</span>
                                    </li>
                                </ul>
                            </div>

                            <div className="p-4 rounded-xl bg-neutral-900/40 border border-white/5">
                                <h4 className="text-sm font-semibold text-white mb-2">Automatically Collected Information</h4>
                                <p className="text-sm text-neutral-400 leading-relaxed">
                                    We automatically collect certain technical information when you use our platform, including timestamps, browser type, and device information for security and analytics purposes.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* How We Use Your Information */}
                    <section className="space-y-3">
                        <div className="flex items-center gap-2 mb-3">
                            <Eye className="w-4 h-4 text-brand-yellow" />
                            <h3 className="text-lg font-display font-semibold text-white">How We Use Your Information</h3>
                        </div>
                        <p className="text-sm text-neutral-300 leading-relaxed mb-3">
                            We use the collected information for the following purposes:
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div className="p-4 rounded-xl bg-neutral-900/40 border border-white/5">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="w-6 h-6 rounded bg-brand-yellow/10 flex items-center justify-center">
                                        <span className="text-xs font-bold text-brand-yellow">1</span>
                                    </div>
                                    <h4 className="text-sm font-semibold text-white">Account Management</h4>
                                </div>
                                <p className="text-xs text-neutral-400 leading-relaxed">
                                    To create and manage your lab access credentials and digital identity
                                </p>
                            </div>

                            <div className="p-4 rounded-xl bg-neutral-900/40 border border-white/5">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="w-6 h-6 rounded bg-brand-yellow/10 flex items-center justify-center">
                                        <span className="text-xs font-bold text-brand-yellow">2</span>
                                    </div>
                                    <h4 className="text-sm font-semibold text-white">Communication</h4>
                                </div>
                                <p className="text-xs text-neutral-400 leading-relaxed">
                                    To send you important updates, lab access information, and the weekly newsletter (if opted in)
                                </p>
                            </div>

                            <div className="p-4 rounded-xl bg-neutral-900/40 border border-white/5">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="w-6 h-6 rounded bg-brand-yellow/10 flex items-center justify-center">
                                        <span className="text-xs font-bold text-brand-yellow">3</span>
                                    </div>
                                    <h4 className="text-sm font-semibold text-white">Research & Analytics</h4>
                                </div>
                                <p className="text-xs text-neutral-400 leading-relaxed">
                                    To understand our user base and improve our research lab offerings
                                </p>
                            </div>

                            <div className="p-4 rounded-xl bg-neutral-900/40 border border-white/5">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="w-6 h-6 rounded bg-brand-yellow/10 flex items-center justify-center">
                                        <span className="text-xs font-bold text-brand-yellow">4</span>
                                    </div>
                                    <h4 className="text-sm font-semibold text-white">Security & Compliance</h4>
                                </div>
                                <p className="text-xs text-neutral-400 leading-relaxed">
                                    To protect against unauthorized access and ensure compliance with legal obligations
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Data Storage & Security */}
                    <section className="space-y-3">
                        <div className="flex items-center gap-2 mb-3">
                            <Lock className="w-4 h-4 text-brand-yellow" />
                            <h3 className="text-lg font-display font-semibold text-white">Data Storage & Security</h3>
                        </div>
                        <div className="p-4 rounded-xl bg-neutral-900/40 border border-white/5 space-y-3">
                            <p className="text-sm text-neutral-300 leading-relaxed">
                                Your data is stored securely using industry-standard encryption and security practices:
                            </p>
                            <ul className="space-y-2 text-sm text-neutral-400">
                                <li className="flex items-start gap-2">
                                    <span className="text-brand-yellow mt-1">✓</span>
                                    <span><strong className="text-white">Cloud Storage:</strong> We use Firebase/Firestore, a secure cloud database service provided by Google</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-brand-yellow mt-1">✓</span>
                                    <span><strong className="text-white">Encryption:</strong> All data is encrypted in transit (HTTPS) and at rest</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-brand-yellow mt-1">✓</span>
                                    <span><strong className="text-white">Access Control:</strong> Strict access controls limit who can view your information</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-brand-yellow mt-1">✓</span>
                                    <span><strong className="text-white">Local Storage:</strong> Your Access ID is stored locally on your device for convenience</span>
                                </li>
                            </ul>
                        </div>
                    </section>

                    {/* Data Sharing */}
                    <section className="space-y-3">
                        <div className="flex items-center gap-2 mb-3">
                            <AlertCircle className="w-4 h-4 text-brand-yellow" />
                            <h3 className="text-lg font-display font-semibold text-white">Data Sharing & Disclosure</h3>
                        </div>
                        <div className="p-4 rounded-xl bg-red-900/10 border border-red-500/20">
                            <p className="text-sm text-neutral-300 leading-relaxed mb-2">
                                <strong className="text-white">We do NOT sell your personal information.</strong>
                            </p>
                            <p className="text-sm text-neutral-400 leading-relaxed">
                                We may share your information only in the following limited circumstances:
                            </p>
                            <ul className="space-y-1 text-sm text-neutral-400 mt-2 ml-4">
                                <li className="flex items-start gap-2">
                                    <span className="text-brand-yellow mt-1">•</span>
                                    <span>With service providers who assist in operating our platform (e.g., Firebase/Google Cloud)</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-brand-yellow mt-1">•</span>
                                    <span>When required by law or to protect our legal rights</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-brand-yellow mt-1">•</span>
                                    <span>With your explicit consent</span>
                                </li>
                            </ul>
                        </div>
                    </section>

                    {/* Your Rights */}
                    <section className="space-y-3">
                        <div className="flex items-center gap-2 mb-3">
                            <Shield className="w-4 h-4 text-brand-yellow" />
                            <h3 className="text-lg font-display font-semibold text-white">Your Rights</h3>
                        </div>
                        <p className="text-sm text-neutral-300 leading-relaxed mb-3">
                            You have the following rights regarding your personal information:
                        </p>
                        <div className="space-y-2">
                            <div className="p-3 rounded-lg bg-neutral-900/40 border border-white/5 text-sm text-neutral-400">
                                <strong className="text-white">Access:</strong> Request a copy of the personal data we hold about you
                            </div>
                            <div className="p-3 rounded-lg bg-neutral-900/40 border border-white/5 text-sm text-neutral-400">
                                <strong className="text-white">Correction:</strong> Request correction of inaccurate or incomplete data
                            </div>
                            <div className="p-3 rounded-lg bg-neutral-900/40 border border-white/5 text-sm text-neutral-400">
                                <strong className="text-white">Deletion:</strong> Request deletion of your personal data (subject to legal obligations)
                            </div>
                            <div className="p-3 rounded-lg bg-neutral-900/40 border border-white/5 text-sm text-neutral-400">
                                <strong className="text-white">Opt-Out:</strong> Unsubscribe from marketing communications at any time
                            </div>
                        </div>
                    </section>

                    {/* Newsletter */}
                    <section className="space-y-3">
                        <div className="flex items-center gap-2 mb-3">
                            <Mail className="w-4 h-4 text-brand-yellow" />
                            <h3 className="text-lg font-display font-semibold text-white">Newsletter Subscription</h3>
                        </div>
                        <div className="p-4 rounded-xl bg-neutral-900/40 border border-white/5">
                            <p className="text-sm text-neutral-300 leading-relaxed">
                                If you opt in to receive our <strong className="text-white">"First Principles"</strong> weekly engineering digest, we will use your email address to send you curated content, research updates, and engineering insights. You can unsubscribe at any time by clicking the unsubscribe link in any newsletter email.
                            </p>
                        </div>
                    </section>

                    {/* Contact */}
                    <section className="space-y-3">
                        <div className="flex items-center gap-2 mb-3">
                            <Mail className="w-4 h-4 text-brand-yellow" />
                            <h3 className="text-lg font-display font-semibold text-white">Contact Us</h3>
                        </div>
                        <div className="p-4 rounded-xl bg-neutral-900/40 border border-white/5">
                            <p className="text-sm text-neutral-300 leading-relaxed mb-3">
                                If you have any questions about this Privacy Policy or wish to exercise your rights, please contact us:
                            </p>
                            <div className="space-y-2 text-sm">
                                <div className="flex items-center gap-2">
                                    <Mail className="w-4 h-4 text-brand-yellow" />
                                    <a href="mailto:connect.mfourlabs@gmail.com" className="text-brand-yellow hover:underline">
                                        connect.mfourlabs@gmail.com
                                    </a>
                                </div>

                            </div>
                        </div>
                    </section>

                    {/* Updates */}
                    <section className="space-y-3">
                        <div className="flex items-center gap-2 mb-3">
                            <FileText className="w-4 h-4 text-brand-yellow" />
                            <h3 className="text-lg font-display font-semibold text-white">Policy Updates</h3>
                        </div>
                        <div className="p-4 rounded-xl bg-neutral-900/40 border border-white/5">
                            <p className="text-sm text-neutral-300 leading-relaxed">
                                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. You are advised to review this Privacy Policy periodically for any changes.
                            </p>
                        </div>
                    </section>

                </div>

                {/* Footer */}
                <div className="p-6 border-t border-white/5 bg-gradient-to-r from-white/[0.02] to-transparent shrink-0">
                    <div className="flex items-center justify-between">
                        <div className="text-xs text-neutral-500 font-mono">
                            MFOURLABS © 2025 • All Rights Reserved
                        </div>
                        <button
                            onClick={onClose}
                            className="px-6 py-2.5 bg-brand-yellow text-black text-sm font-bold tracking-wide rounded-full hover:bg-brand-yellow/90 transition-all duration-300"
                        >
                            I Understand
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
};
