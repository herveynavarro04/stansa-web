import type { Metadata, Viewport } from 'next';
import { Fraunces, Inter_Tight } from 'next/font/google';
import { AnnouncementModal } from '@/components/announcement-modal';
import './globals.css';

const fraunces = Fraunces({
  variable: '--font-fraunces',
  subsets: ['latin'],
  display: 'swap',
  axes: ['SOFT', 'WONK', 'opsz'],
});

const inter = Inter_Tight({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Aceros Stansa — Acero estructural en Monterrey',
  description:
    'Distribución de acero estructural con la precisión y confianza que exige tu obra. Láminas, placas, perfiles, tubos y soleras en Monterrey, Nuevo León.',
  metadataBase: new URL('https://www.acerosstansa.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Aceros Stansa',
    description: 'Acero estructural en Monterrey, Nuevo León.',
    locale: 'es_MX',
    type: 'website',
  },
  appleWebApp: {
    title: 'Aceros Stansa',
    statusBarStyle: 'default',
    capable: true,
  },
  formatDetection: {
    telephone: true,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#5c2e14' },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${fraunces.variable} ${inter.variable}`}>
      <body>
        {children}
        <AnnouncementModal />
      </body>
    </html>
  );
}
