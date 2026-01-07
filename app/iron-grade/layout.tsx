import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Iron Grade Infrastructure | Deterministic Governance',
    description: 'Sovereign AI security for high-risk deployments. Beyond probabilistic guessing—enforcing deterministic truth through Multi-layer Variable Frameworks (MVF) and real-time hallucination interception.',
    openGraph: {
        title: 'Iron Grade Infrastructure | Deterministic Governance',
        description: 'Sovereign AI security for high-risk deployments. Enforcing deterministic truth through MVF.',
    },
};

export default function IronGradeLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
