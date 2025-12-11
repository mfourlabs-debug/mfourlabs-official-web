import React from 'react';
import { X, FileText, Shield, Scale, AlertCircle } from 'lucide-react';

interface TermsOfServiceProps {
    onClose: () => void;
}

export const TermsOfService: React.FC<TermsOfServiceProps> = ({ onClose }) => {
    return (
        <div className="fixed inset-0 z-[70] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-6 animate-fade-in overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none"></div>
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-yellow/5 blur-[120px] rounded-full pointer-events-none"></div>

            {/* Modal Container */}
            <div className="relative w-full max-w-4xl max-h-[90vh] bg-[#0A0A0A] border border-white/10 rounded-3xl overflow-hidden shadow-2xl ring-1 ring-white/5">

                {/* Header */}
                <div className="sticky top-0 z-10 bg-gradient-to-b from-[#0A0A0A] to-[#0A0A0A]/95 backdrop-blur-xl border-b border-white/10 p-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-brand-yellow/10 rounded-xl border border-brand-yellow/20">
                                <Scale className="w-6 h-6 text-brand-yellow" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-display font-bold text-white tracking-tight">Terms of Service</h2>
                                <p className="text-sm text-neutral-400 mt-1">MFOURLABS Research Lab Access Agreement</p>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 text-neutral-400 hover:text-white hover:bg-white/10 rounded-full transition-all"
                            aria-label="Close Terms of Service"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="overflow-y-auto max-h-[calc(90vh-120px)] p-6 md:p-8 space-y-8 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">

                    {/* Last Updated */}
                    <div className="flex items-center gap-2 text-xs text-neutral-500 font-mono">
                        <FileText className="w-4 h-4" />
                        <span>Last Updated: December 8, 2025</span>
                    </div>

                    {/* Important Notice */}
                    <div className="bg-orange-950/20 border border-orange-500/30 rounded-xl p-4">
                        <div className="flex items-start gap-3">
                            <AlertCircle className="w-5 h-5 text-orange-400 mt-0.5 flex-shrink-0" />
                            <div>
                                <h3 className="text-sm font-semibold text-orange-300 mb-1">Important Notice</h3>
                                <p className="text-xs text-neutral-300 leading-relaxed">
                                    By accessing the MFOURLABS Research Lab, you agree to be bound by these Terms of Service.
                                    Please read them carefully before proceeding with registration.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Section 1: Acceptance of Terms */}
                    <section className="space-y-3">
                        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                            <span className="text-brand-yellow">1.</span> Acceptance of Terms
                        </h3>
                        <div className="text-sm text-neutral-300 leading-relaxed space-y-2 pl-6">
                            <p>
                                By registering for early access to MFOURLABS ("the Lab"), you acknowledge that you have read,
                                understood, and agree to be bound by these Terms of Service and our Privacy Policy.
                            </p>
                            <p>
                                If you do not agree to these terms, you may not access or use the Lab services.
                            </p>
                        </div>
                    </section>

                    {/* Section 2: Eligibility */}
                    <section className="space-y-3">
                        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                            <span className="text-brand-yellow">2.</span> Eligibility
                        </h3>
                        <div className="text-sm text-neutral-300 leading-relaxed space-y-2 pl-6">
                            <p>You must meet the following criteria to register:</p>
                            <ul className="list-disc list-inside space-y-1 ml-4">
                                <li>Be at least 13 years of age (or the age of majority in your jurisdiction)</li>
                                <li>Provide accurate and complete registration information</li>
                                <li>Have the legal capacity to enter into binding agreements</li>
                                <li>Not be prohibited from accessing the services under applicable laws</li>
                            </ul>
                        </div>
                    </section>

                    {/* Section 3: Early Access Program */}
                    <section className="space-y-3">
                        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                            <span className="text-brand-yellow">3.</span> Early Access Program
                        </h3>
                        <div className="text-sm text-neutral-300 leading-relaxed space-y-2 pl-6">
                            <p>
                                <strong className="text-white">3.1 Waitlist Status:</strong> Registration grants you a position on our early access waitlist.
                                Access is not guaranteed and will be granted based on availability and selection criteria.
                            </p>
                            <p>
                                <strong className="text-white">3.2 Beta Nature:</strong> The Lab is in active development. Features may change,
                                and services may be temporarily unavailable without notice.
                            </p>
                            <p>
                                <strong className="text-white">3.3 No Warranty:</strong> Early access is provided "as is" without warranties of any kind,
                                express or implied.
                            </p>
                        </div>
                    </section>

                    {/* Section 4: Account Responsibilities */}
                    <section className="space-y-3">
                        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                            <span className="text-brand-yellow">4.</span> Account Responsibilities
                        </h3>
                        <div className="text-sm text-neutral-300 leading-relaxed space-y-2 pl-6">
                            <p>You agree to:</p>
                            <ul className="list-disc list-inside space-y-1 ml-4">
                                <li>Provide accurate, current, and complete information during registration</li>
                                <li>Maintain the security of your account credentials</li>
                                <li>Notify us immediately of any unauthorized access</li>
                                <li>Accept responsibility for all activities under your account</li>
                                <li>Not share your access credentials with others</li>
                            </ul>
                        </div>
                    </section>

                    {/* Section 5: Acceptable Use */}
                    <section className="space-y-3">
                        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                            <span className="text-brand-yellow">5.</span> Acceptable Use Policy
                        </h3>
                        <div className="text-sm text-neutral-300 leading-relaxed space-y-2 pl-6">
                            <p>You agree NOT to:</p>
                            <ul className="list-disc list-inside space-y-1 ml-4">
                                <li>Use the Lab for any illegal or unauthorized purpose</li>
                                <li>Violate any laws in your jurisdiction</li>
                                <li>Infringe on intellectual property rights</li>
                                <li>Transmit malicious code, viruses, or harmful content</li>
                                <li>Attempt to gain unauthorized access to systems or data</li>
                                <li>Interfere with or disrupt the Lab's services</li>
                                <li>Scrape, harvest, or collect user data without permission</li>
                                <li>Impersonate others or misrepresent your affiliation</li>
                            </ul>
                        </div>
                    </section>

                    {/* Section 6: Intellectual Property */}
                    <section className="space-y-3">
                        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                            <span className="text-brand-yellow">6.</span> Intellectual Property
                        </h3>
                        <div className="text-sm text-neutral-300 leading-relaxed space-y-2 pl-6">
                            <p>
                                All content, features, and functionality of the Lab, including but not limited to text, graphics,
                                logos, code, and software, are owned by MFOURLABS and protected by international copyright,
                                trademark, and other intellectual property laws.
                            </p>
                            <p>
                                You may not reproduce, distribute, modify, or create derivative works without explicit written permission.
                            </p>
                        </div>
                    </section>

                    {/* Section 7: Data Privacy */}
                    <section className="space-y-3">
                        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                            <span className="text-brand-yellow">7.</span> Data Privacy & GDPR Compliance
                        </h3>
                        <div className="text-sm text-neutral-300 leading-relaxed space-y-2 pl-6">
                            <p>
                                We are committed to protecting your privacy and complying with GDPR and other data protection regulations.
                            </p>
                            <p>
                                <strong className="text-white">Your Rights:</strong>
                            </p>
                            <ul className="list-disc list-inside space-y-1 ml-4">
                                <li><strong>Right to Access:</strong> Request a copy of your personal data</li>
                                <li><strong>Right to Rectification:</strong> Correct inaccurate data</li>
                                <li><strong>Right to Erasure:</strong> Request deletion of your account and data</li>
                                <li><strong>Right to Data Portability:</strong> Export your data in JSON format</li>
                                <li><strong>Right to Withdraw Consent:</strong> Opt-out of communications</li>
                            </ul>
                            <p className="mt-2">
                                For full details, please review our <span className="text-brand-yellow">Privacy Policy</span>.
                            </p>
                        </div>
                    </section>

                    {/* Section 8: Termination */}
                    <section className="space-y-3">
                        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                            <span className="text-brand-yellow">8.</span> Termination
                        </h3>
                        <div className="text-sm text-neutral-300 leading-relaxed space-y-2 pl-6">
                            <p>
                                We reserve the right to suspend or terminate your access to the Lab at any time, with or without cause,
                                with or without notice, for any violation of these Terms or for any other reason.
                            </p>
                            <p>
                                You may terminate your account at any time by requesting account deletion through our GDPR compliance tools.
                            </p>
                        </div>
                    </section>

                    {/* Section 9: Limitation of Liability */}
                    <section className="space-y-3">
                        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                            <span className="text-brand-yellow">9.</span> Limitation of Liability
                        </h3>
                        <div className="text-sm text-neutral-300 leading-relaxed space-y-2 pl-6">
                            <p>
                                To the maximum extent permitted by law, MFOURLABS shall not be liable for any indirect, incidental,
                                special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred
                                directly or indirectly, or any loss of data, use, goodwill, or other intangible losses.
                            </p>
                        </div>
                    </section>

                    {/* Section 10: Changes to Terms */}
                    <section className="space-y-3">
                        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                            <span className="text-brand-yellow">10.</span> Changes to Terms
                        </h3>
                        <div className="text-sm text-neutral-300 leading-relaxed space-y-2 pl-6">
                            <p>
                                We reserve the right to modify these Terms at any time. We will notify you of material changes
                                via email or through the Lab interface. Continued use after changes constitutes acceptance of the new Terms.
                            </p>
                        </div>
                    </section>

                    {/* Section 11: Governing Law */}
                    <section className="space-y-3">
                        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                            <span className="text-brand-yellow">11.</span> Governing Law
                        </h3>
                        <div className="text-sm text-neutral-300 leading-relaxed space-y-2 pl-6">
                            <p>
                                These Terms shall be governed by and construed in accordance with the laws of [Your Jurisdiction],
                                without regard to its conflict of law provisions.
                            </p>
                        </div>
                    </section>

                    {/* Section 12: Contact */}
                    <section className="space-y-3">
                        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                            <span className="text-brand-yellow">12.</span> Contact Information
                        </h3>
                        <div className="text-sm text-neutral-300 leading-relaxed space-y-2 pl-6">
                            <p>For questions about these Terms, please contact us:</p>
                            <div className="bg-neutral-900/60 border border-white/10 rounded-lg p-4 mt-3 space-y-1">
                                <p><strong className="text-white">Email:</strong> legal@mfourlabs.com</p>
                                <p><strong className="text-white">Privacy:</strong> privacy@mfourlabs.com</p>
                                <p><strong className="text-white">Support:</strong> support@mfourlabs.com</p>
                            </div>
                        </div>
                    </section>

                    {/* Acknowledgment */}
                    <div className="bg-brand-yellow/10 border border-brand-yellow/20 rounded-xl p-5 mt-8">
                        <div className="flex items-start gap-3">
                            <Shield className="w-5 h-5 text-brand-yellow mt-0.5 flex-shrink-0" />
                            <div>
                                <h3 className="text-sm font-semibold text-brand-yellow mb-2">Acknowledgment</h3>
                                <p className="text-xs text-neutral-300 leading-relaxed">
                                    By clicking "I Accept" or by accessing the Lab, you acknowledge that you have read and understood
                                    these Terms of Service and agree to be bound by them. If you do not agree, please do not use our services.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="sticky bottom-0 bg-gradient-to-t from-[#0A0A0A] to-[#0A0A0A]/95 backdrop-blur-xl border-t border-white/10 p-6">
                    <div className="flex items-center justify-between">
                        <p className="text-xs text-neutral-500 font-mono">
                            © 2025 MFOURLABS. All rights reserved.
                        </p>
                        <button
                            onClick={onClose}
                            className="px-6 py-2.5 bg-brand-yellow text-black text-sm font-bold rounded-full hover:bg-white transition-all"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>

            {/* CSS for animations */}
            <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }

        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
        }

        .scrollbar-thin::-webkit-scrollbar-track {
          background: transparent;
        }

        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 3px;
        }

        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      `}</style>
        </div>
    );
};
