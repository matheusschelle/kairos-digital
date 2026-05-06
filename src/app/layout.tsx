import type { Metadata, Viewport } from 'next';
import { Inter, Orbitron, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import ClientProviders from '@/components/ClientProviders';

const sans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const display = Orbitron({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-display',
  display: 'swap',
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://kairosdigital.vercel.app'),
  title: {
    default: 'KAIROS DIGITAL — Inteligência Artificial de Elite',
    template: '%s | KAIROS DIGITAL',
  },
  description:
    'O futuro não espera. Sua empresa também não deveria. Agentes de IA que vendem, atendem e escalam 24/7 com Claude Opus 4.7.',
  keywords: [
    'KAIROS DIGITAL',
    'Inteligência Artificial',
    'Agentes de IA',
    'Claude Opus',
    'Anthropic',
    'Vendedor Virtual',
    'Automação WhatsApp',
    'IA Estratégica',
  ],
  authors: [{ name: 'KAIROS DIGITAL' }],
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://kairosdigital.vercel.app',
    siteName: 'KAIROS DIGITAL',
    title: 'KAIROS DIGITAL — Inteligência Artificial de Elite',
    description:
      'Agentes de IA que vendem, atendem e escalam 24/7. Tecnologia Claude Opus 4.7. Implantação em 4 semanas.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'KAIROS DIGITAL',
    description: 'Inteligência Artificial Estratégica.',
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#05060c',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${sans.variable} ${display.variable} ${mono.variable}`}>
      <head>
        {/*
         * Preload the first animation frame per tier so the browser starts
         * downloading it before JS hydrates and fires useEffect.
         * Each `media` attribute ensures only the matching tier is fetched.
         */}
        {/* eslint-disable @next/next/no-page-custom-font */}
        <link
          rel="preload"
          as="image"
          type="image/webp"
          href="/frames/mobile/frame-001.webp"
          media="(pointer: coarse)"
        />
        <link
          rel="preload"
          as="image"
          type="image/webp"
          href="/frames/tablet/frame-001.webp"
          media="(pointer: fine) and (max-width: 1279px)"
        />
        <link
          rel="preload"
          as="image"
          type="image/webp"
          href="/frames/desktop/frame-001.webp"
          media="(pointer: fine) and (min-width: 1280px)"
        />
      </head>
      <body className="bg-bg text-silver-50 antialiased selection:bg-neon-violet/40 selection:text-white">
        {/*
         * ClientProviders wraps CustomCursor, SmoothScroll, and MobileEnergyOrb
         * with ssr:false dynamic imports — valid inside a 'use client' component.
         */}
        <ClientProviders />
        {children}
      </body>
    </html>
  );
}
