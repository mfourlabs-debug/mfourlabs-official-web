import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'M4-VIGILANT | MFOUR LABS',
    description: 'M4-VIGILANT: Vibe Integrity & Governance Intelligence Loop. We move beyond testing to Architectural Enforcement. The Systems Guardian for your AI Infrastructure.',
    openGraph: {
        title: 'M4-VIGILANT By MFOUR LABS',
        description: 'M4-VIGILANT: Vibe Integrity & Governance Intelligence Loop. Active Remediation and IronGrade Sovereign Unit deployment.',
    },
};

export default function M4VigilantLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
