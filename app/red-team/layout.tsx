import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Red Team Unit | Adversarial Governance',
    description: 'Adversarial Governance Audits. We execute advanced semantic hijacking, kernel-bypass attempts, and anchor-poisoning simulations to ensure your IronGrade stay ironclad.',
    openGraph: {
        title: 'Red Team Unit | Adversarial Governance',
        description: 'Adversarial Governance Audits. Probing for semantic drift and kernel bypass vulnerabilities.',
    },
};

export default function RedTeamLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
