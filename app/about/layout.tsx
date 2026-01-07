import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'About M4 LABS | The Mission',
    description: 'Bridging the Deterministic Gap. MFOUR LABS is an elite R&D unit dedicated to the engineering of secure AI governance. Eliminate the "Vibe" and enforce the "Anchor."',
    openGraph: {
        title: 'About M4 LABS | The Mission',
        description: 'Bridging the Deterministic Gap. Eliminating the "Vibe" and enforcing the "Anchor".',
    },
};

export default function AboutLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
