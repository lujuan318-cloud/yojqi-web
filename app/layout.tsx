import type { Metadata } from 'next';
import { Cormorant_Garamond, Source_Sans_3 } from 'next/font/google';
import './globals.css';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
});

const sourceSans = Source_Sans_3({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'YOJQI | Wearable Somatic Rituals & Chongqing Drone Show Sanctuaries',
  description: 'Ancient oriental herbal scent anchors for nervous system regulation, tactile grounding jewelry, and private high-altitude Chongqing drone show view residences.',
  keywords: [
    'YOJQI',
    'Somatic wearability',
    'Herbal scent anchor',
    'Tactile jewelry',
    'Chongqing drone show apartment',
    'Baihong Drone show apartment',
    'YOJQI Drone show apartment',
    'Two rivers confluence Chongqing',
  ],
  authors: [{ name: 'YOJQI Studio' }],
  metadataBase: new URL('https://yojqi.com'),
  openGraph: {
    title: 'YOJQI | Wearable Somatic Rituals & Chongqing Drone Show Sanctuaries',
    description: 'Ancient oriental herbal scent anchors and private high-altitude Chongqing drone show viewing apartments.',
    url: 'https://yojqi.com',
    siteName: 'YOJQI Official Platform',
    images: [
      {
        url: 'https://yojqi.com/wp-content/uploads/2026/05/yojqi_ambergris_bracelet_hero.jpg',
        width: 1200,
        height: 630,
        alt: 'YOJQI Somatic Wearables & Chongqing Sanctuaries',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${sourceSans.variable}`}>
      <body className="min-h-screen bg-yojqi-ivory text-yojqi-ink antialiased">
        {children}
      </body>
    </html>
  );
}
