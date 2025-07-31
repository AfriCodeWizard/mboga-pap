import type { Metadata } from 'next'
import './globals.css'
import ClientLayoutWithConditionalNavbar from '@/components/ClientLayoutWithConditionalNavbar'
import { SpeedInsights } from '@vercel/speed-insights/next';

export const metadata: Metadata = {
  title: 'Mboga Pap',
  description: 'Order fresh groceries from local vendors and get fast delivery with Mboga Pap! Supporting community, vendors, and riders across Nairobi.',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
  themeColor: '#6A1B9A',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Mboga Pap',
  },
  formatDetection: {
    telephone: false,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="no-horizontal-scroll">
      <head>
        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
        <script dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'GA_MEASUREMENT_ID');
          `,
        }} />
      </head>
      <body className="no-horizontal-scroll">
        <ClientLayoutWithConditionalNavbar>
          {children}
        </ClientLayoutWithConditionalNavbar>
        <SpeedInsights />
      </body>
    </html>
  );
}
