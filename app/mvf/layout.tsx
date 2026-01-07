import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'MFOUR Vibe Framework (MVF) | Research Protocol',
    description: 'The MVF Standard (DOI: 10.5281/zenodo.17924469). A 5-Layer Kernel Architecture for deterministic Enterprise AI. Explore the comprehensive framework for orchestrating and governing non-deterministic generative AI systems.',
    openGraph: {
        title: 'MFOUR Vibe Framework (MVF) | Research Protocol',
        description: 'The MVF Standard (DOI: 10.5281/zenodo.17924469). A 5-Layer Kernel Architecture for deterministic Enterprise AI.',
    },
};

export default function MVFLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
