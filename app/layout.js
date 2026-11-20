import { SITE_URL, asset } from '../lib/config';

import './styles/styles.css';
import './styles/components.css';
import './styles/pages.css';
import './styles/pages2.css';
import './styles/dashboard.css';
import './styles/legal.css';
import './styles/flows.css';

export const metadata = {
  metadataBase: new URL('https://www.agrifarmcapital.com/directory'),
  title: {
    default: "AgriFarm Directory — California's Agricultural Expert Network",
    template: '%s | AgriFarm Directory',
  },
  description:
    'Find verified California agricultural professionals — land brokers, crop insurance, title & escrow, appraisers, and water-rights attorneys.',
  openGraph: { type: 'website', siteName: 'AgriFarm Directory', url: SITE_URL },
  twitter: { card: 'summary_large_image' },
  icons: { icon: asset('favicon.svg') },
};

export const viewport = { themeColor: '#2e4a37' };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500;1,600&family=Inter:wght@400;500;600;700;800&family=IBM+Plex+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
