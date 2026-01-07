import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'The Mission | MFOURLABS',
    description: 'We eliminate the Vibe and enforce the Anchor. The mission of MFOUR LABS is to build deterministic AI governance infrastructure.',
    openGraph: {
        title: 'The Mission | MFOURLABS',
        description: 'We eliminate the Vibe and enforce the Anchor. The mission of MFOUR LABS is to build deterministic AI governance infrastructure.',
        url: 'https://mfourlabs.dev/the-mission',
    },
};

export default function TheMissionLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
