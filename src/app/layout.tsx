import type { Metadata } from 'next';
import { Inter, Playfair_Display, Montserrat } from 'next/font/google';
// import { Toaster } from 'sonner'; // TODO: Installer sonner avec npm install sonner
import './globals.css';

// Fonts
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
});

// Metadata
export const metadata: Metadata = {
  title: {
    default: 'LE BARBIER - L\'Art de la Beauté Redéfini',
    template: '%s | LE BARBIER',
  },
  description: 'Institut de beauté premium à Yaoundé. Services de coupe, rasage, soins du visage et bien plus. Réservation en ligne disponible.',
  keywords: [
    'barbier',
    'institut beauté',
    'coupe cheveux',
    'rasage',
    'barbe',
    'Yaoundé',
    'Cameroun',
    'salon coiffure',
    'soins homme',
  ],
  authors: [{ name: 'LE BARBIER' }],
  creator: 'LE BARBIER',
  publisher: 'LE BARBIER',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  alternates: {
    canonical: '/',
    languages: {
      'fr': '/fr',
      'en': '/en',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    alternateLocale: ['en_US'],
    url: '/',
    siteName: 'LE BARBIER',
    title: 'LE BARBIER - L\'Art de la Beauté Redéfini',
    description: 'Institut de beauté premium à Yaoundé. Réservation en ligne.',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'LE BARBIER',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LE BARBIER - L\'Art de la Beauté Redéfini',
    description: 'Institut de beauté premium à Yaoundé',
    images: ['/images/twitter-image.jpg'],
    creator: '@lebarbier_cm',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${inter.variable} ${playfair.variable} ${montserrat.variable}`}>
      <head>
        {/* Preload critical fonts */}
        <link
          rel="preload"
          href="/fonts/inter-var.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body className="antialiased">
        {/* Main Content */}
        {children}

        {/* Toast Notifications - TODO: Décommenter après installation de sonner */}
        {/* <Toaster
          position="top-right"
          expand={false}
          richColors
          closeButton
          toastOptions={{
            duration: 4000,
            style: {
              background: '#FFFFFF',
              color: '#1A1A1A',
              border: '1px solid #E5E5E5',
              borderLeft: '4px solid #C9A961',
              fontFamily: 'var(--font-inter)',
            },
          }}
        /> */}

        {/* Analytics */}
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}', {
                    page_path: window.location.pathname,
                  });
                `,
              }}
            />
          </>
        )}
      </body>
    </html>
  );
}