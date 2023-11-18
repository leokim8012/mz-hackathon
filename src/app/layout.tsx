import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import { RootStyleRegistry } from './RootStyle';
import './globals.scss';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  icons: '/favicon.png',
  title: 'MZHackathon - Description',
  description: 'Description',
  openGraph: {
    title: 'MZHackathon - Description',
    description: 'Description ',
    images: '/assets/images/og.png',
    url: `${process.env.NEXT_PUBLIC_DOMAIN}`,
    type: 'website',
  },
  twitter: {
    images: '/assets/images/og.png',
    card: 'summary_large_image',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning lang="en">
      <link rel="icon" href="/favicon.png" />
      {/* <Script src="https://www.googletagmanager.com/gtag/js?id=G-CXVF307F2R" />
      <Script id="google-analytics">
        {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'G-CXVF307F2R');
      `}
      </Script> */}
      <body className={inter.className}>
        <RootStyleRegistry>{children}</RootStyleRegistry>
      </body>
    </html>
  );
}
