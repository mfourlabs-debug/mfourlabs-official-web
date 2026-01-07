import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Contact M4 LABS | Secure Channel',
    description: 'Initiate contact with MFOUR LABS for enterprise licensing, research collaboration, or red team audits. Email: hq@mfourlabs.dev',
    openGraph: {
        title: 'Contact M4 LABS | Secure Channel',
        description: 'Initiate contact with MFOUR LABS. Email: hq@mfourlabs.dev',
    },
};

export default function ContactLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
