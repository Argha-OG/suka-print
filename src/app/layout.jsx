import './globals.css';
import { CartProvider } from '@/context/CartContext';

export const metadata = {
  metadataBase: new URL('https://www.sukaprint.com'),
  title: {
    default: 'Suka Print | Premium Printing Services Malaysia',
    template: '%s | Suka Print'
  },
  description: 'Your one-stop shop for premium printing services in Malaysia. Business cards, banners, stickers, flyers, and more with fast delivery.',
  keywords: ['printing services malaysia', 'business cards', 'banner printing', 'sticker printing', 'offset printing', 'digital printing', 'suka print'],
  authors: [{ name: 'Suka Print' }],
  creator: 'Suka Print',
  publisher: 'Suka Print',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'Suka Print | Premium Printing Services Malaysia',
    description: 'Your one-stop shop for premium printing services in Malaysia. High-quality prints with fast turnaround.',
    url: 'https://www.sukaprint.com',
    siteName: 'Suka Print',
    images: [
      {
        url: 'https://res.cloudinary.com/dteaoozsi/image/upload/v1781988539/sukaprint/suka_zaqezu.png',
        width: 800,
        height: 600,
        alt: 'Suka Print Logo',
      },
    ],
    locale: 'en_MY',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Suka Print | Premium Printing Services Malaysia',
    description: 'Premier printing solutions in Malaysia. Business cards, banners, and more.',
    images: ['https://res.cloudinary.com/dteaoozsi/image/upload/v1781988539/sukaprint/suka_zaqezu.png'],
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
}

export default function RootLayout({ children }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Suka Print',
    url: 'https://www.sukaprint.com',
    logo: 'https://res.cloudinary.com/dteaoozsi/image/upload/v1781988539/sukaprint/suka_zaqezu.png',
    sameAs: [
      'https://www.facebook.com/sukaprint',
      'https://www.instagram.com/sukaprint',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+601114141509',
      contactType: 'customer service',
      areaServed: 'MY',
      availableLanguage: ['en', 'ms', 'zh'],
    },
  };

  return (
    <html lang="en" suppressHydrationWarning={true}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link rel="canonical" href="https://www.sukaprint.com" />
      </head>
      <body className="min-h-screen bg-gray-50 flex flex-col font-sans relative overflow-x-hidden" suppressHydrationWarning={true}>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  )
}
