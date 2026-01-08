import type { Metadata } from 'next';
import { Inter, Inter_Tight, JetBrains_Mono, Montserrat } from 'next/font/google';
import './globals.css';
import MaintenancePage from '@/components/MaintenancePage';

const MAINTENANCE_MODE = false;

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
    display: 'swap',
});

const interTight = Inter_Tight({
    subsets: ['latin'],
    variable: '--font-inter-tight',
    display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
    subsets: ['latin'],
    variable: '--font-jetbrains-mono',
    display: 'swap',
});

const montserrat = Montserrat({
    subsets: ['latin'],
    variable: '--font-montserrat',
    weight: ['400', '500', '600', '700', '800'],
    display: 'swap',
});

export const metadata: Metadata = {
    title: 'MFOURLABS | The Global Standard for Deterministic AI Governance',
    description: 'We define the MVF Standard (DOI: 10.5281/zenodo.17924469). A 5-Layer Kernel Architecture for deterministic Enterprise AI. Read the whitepaper',
    keywords: [
        'MVF Protocol',
        'MVF Standard',
        '5-Layer Kernel Architecture',
        'DOI 10.5281/zenodo.17924469',
        'MFOURLABS',
        'AI governance',
        'deterministic AI',
        'vibe architecture',
        'MFOUR Vibe Framework',
        'MVF',
        'AI systems design',
        'kernel specification',
        'mirror test',
        'synapse strategy',
        'first principles engineering',
        'software architecture',
        'research lab',
        'system design',
        'architects not coders',
        '1% standard',
        'AI safety',
        'LLM governance',
        'enterprise AI',
        'AI orchestration',
    ],
    authors: [{ name: 'MFOUR LABS' }],
    creator: 'MFOUR LABS',
    publisher: 'MFOUR LABS',
    robots: 'index, follow',
    metadataBase: new URL('https://mfourlabs.dev'),
    alternates: {
        canonical: '/',
    },
    openGraph: {
        type: 'website',
        url: 'https://mfourlabs.dev/',
        title: 'MFOURLABS | The Global Standard for Deterministic AI Governance',
        description: 'We define the MVF Standard (DOI: 10.5281/zenodo.17924469). A 5-Layer Kernel Architecture for deterministic Enterprise AI. Read the whitepaper',
        siteName: 'MFOURLABS',
        images: [
            {
                url: '/og-image.jpg',
                width: 1200,
                height: 630,
                alt: 'MFOURLABS - The Global Standard for Deterministic AI Governance',
            },
        ],
        locale: 'en_US',
    },
    twitter: {
        card: 'summary_large_image',
        site: '@mfourlabs',
        creator: '@mfourlabs',
        title: 'MFOURLABS | The Global Standard for Deterministic AI Governance',
        description: 'We define the MVF Standard (DOI: 10.5281/zenodo.17924469). A 5-Layer Kernel Architecture for deterministic Enterprise AI. Read the whitepaper',
        images: ['/x-card.jpg'],
    },
    icons: {
        icon: [
            { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
            { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
        ],
        shortcut: '/favicon.ico',
        apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
        other: [
            {
                rel: 'icon',
                url: '/favicon.ico',
            },
        ],
    },
    manifest: '/site.webmanifest',
    other: {
        'theme-color': '#000000',
        'msapplication-TileColor': '#FFE600',
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="en"
            className={`scroll-smooth antialiased selection:bg-white selection:text-black ${inter.variable} ${interTight.variable} ${jetbrainsMono.variable} ${montserrat.variable}`}
            itemScope
            itemType="https://schema.org/WebPage"
        >
            <head>
                {/* Structured Data - Organization */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            '@context': 'https://schema.org',
                            '@type': 'Organization',
                            name: 'MFOURLABS',
                            alternateName: ['MFOUR LABS', 'MFourLabs'],
                            url: 'https://mfourlabs.dev',
                            logo: 'https://mfourlabs.dev/logo.png',
                            description:
                                'The Research Lab for First Principles Engineering. Building the global standard for deterministic AI governance through the MFOUR Vibe Framework™ (MVF). Deconstructing complexity, establishing rigorous interface contracts, and defining the 1% standard for AI architects.',
                            foundingDate: '2025',
                            slogan: 'The Global Standard For Deterministic AI Governance',
                            knowsAbout: [
                                'AI Governance',
                                'Deterministic AI Systems',
                                'Vibe Architecture',
                                'System Design',
                                'First Principles Engineering',
                                'LLM Safety',
                                'Kernel Specification',
                                'Mirror Test Protocol',
                            ],
                            sameAs: [
                                'https://x.com/mfourlabs',
                                'https://www.linkedin.com/company/mfourlabs',
                                'https://github.com/mfourlabs',
                                'https://youtube.com/@mfourlabs',
                                'https://doi.org/10.5281/zenodo.17924469',
                            ],
                            contactPoint: [
                                {
                                    '@type': 'ContactPoint',
                                    contactType: 'Research Inquiries',
                                    email: 'research@mfourlabs.dev',
                                },
                                {
                                    '@type': 'ContactPoint',
                                    contactType: 'Enterprise Licensing',
                                    email: 'licensing@mfourlabs.dev',
                                },
                            ],
                        }),
                    }}
                />

                {/* Structured Data - WebSite */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            '@context': 'https://schema.org',
                            '@type': 'WebSite',
                            name: 'MFOURLABS',
                            url: 'https://mfourlabs.dev',
                            description:
                                'The official research lab portal for MFOURLABS. Master the MFOUR Vibe Framework™ and build deterministic AI systems through rigorous architecture.',
                            potentialAction: {
                                '@type': 'SearchAction',
                                target: 'https://mfourlabs.dev/search?q={search_term_string}',
                                'query-input': 'required name=search_term_string',
                            },
                        }),
                    }}
                />

                {/* Structured Data - Software Application */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            '@context': 'https://schema.org',
                            '@type': 'SoftwareApplication',
                            name: 'MFOUR Vibe Framework (MVF)',
                            applicationCategory: 'DeveloperApplication',
                            operatingSystem: 'Cross-platform',
                            offers: {
                                '@type': 'Offer',
                                price: '0',
                                priceCurrency: 'USD',
                                availability: 'https://schema.org/InDevelopment',
                            },
                            description:
                                'The global standard for deterministic AI governance. A comprehensive framework featuring Kernel Specification, Synapse Strategy, and Mirror Test protocols for building rigorous AI systems.',
                            featureList: [
                                'Kernel Specification: Rigid interface contracts for AI systems',
                                'Synapse Strategy: Agentic routing and tool-use authorization',
                                'Mirror Test: Automated auditing and vibe integrity scoring',
                                'MVF Cloud: Enterprise AI governance middleware (alpha)',
                                'First Principles Engineering methodology',
                            ],
                            license: 'MIT License',
                            creator: {
                                '@type': 'Organization',
                                name: 'MFOURLABS',
                            },
                        }),
                    }}
                />

                {/* Structured Data - Scholarly Article */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            '@context': 'https://schema.org',
                            '@type': 'ScholarlyArticle',
                            headline:
                                'The MVF Protocol: A Deterministic Architecture for Orchestrating and Governing Non-Deterministic Generative AI Systems',
                            name: 'The MVF Protocol: A Deterministic Architecture for Orchestrating and Governing Non-Deterministic Generative AI Systems',
                            alternateName: 'MVF Standard',
                            description:
                                'We define the MVF Standard: A 5-Layer Kernel Architecture for deterministic Enterprise AI. This whitepaper introduces a comprehensive framework for orchestrating and governing non-deterministic generative AI systems through deterministic architectural patterns.',
                            author: {
                                '@type': 'Organization',
                                name: 'MFOURLABS',
                                url: 'https://mfourlabs.dev',
                            },
                            publisher: {
                                '@type': 'Organization',
                                name: 'Zenodo',
                                url: 'https://zenodo.org',
                            },
                            datePublished: '2025',
                            identifier: [
                                {
                                    '@type': 'PropertyValue',
                                    propertyID: 'DOI',
                                    value: '10.5281/zenodo.17924469',
                                },
                            ],
                            url: 'https://doi.org/10.5281/zenodo.17924469',
                            sameAs: 'https://doi.org/10.5281/zenodo.17924469',
                            keywords: [
                                'MVF Protocol',
                                'MVF Standard',
                                'Deterministic AI Architecture',
                                '5-Layer Kernel Architecture',
                                'AI Governance',
                                'Generative AI Systems',
                                'Enterprise AI',
                                'AI Orchestration',
                                'Non-deterministic AI',
                                'MFOUR Vibe Framework',
                            ],
                            about: [
                                {
                                    '@type': 'Thing',
                                    name: 'Artificial Intelligence Governance',
                                },
                                {
                                    '@type': 'Thing',
                                    name: 'Software Architecture',
                                },
                                {
                                    '@type': 'Thing',
                                    name: 'Enterprise AI Systems',
                                },
                            ],
                            license: 'CC BY 4.0',
                            inLanguage: 'en',
                            isAccessibleForFree: true,
                        }),
                    }}
                />
            </head>
            <body className="font-sans">
                {MAINTENANCE_MODE ? <MaintenancePage /> : children}
            </body>
        </html>
    );
}
