import type { Metadata } from 'next'
import './globals.css'
import ClientLayoutWithConditionalNavbar from '@/components/ClientLayoutWithConditionalNavbar'
import { SpeedInsights } from '@vercel/speed-insights/next';
import { LoyaltyProvider } from '@/components/LoyaltyContext';

export const metadata: Metadata = {
  title: 'Mboga Pap',
  description: 'Order fresh groceries from local vendors and get fast delivery with Mboga Pap! Supporting community, vendors, and riders across Nairobi.',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Mboga Pap',
  },
  formatDetection: {
    telephone: false,
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#6A1B9A',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="no-horizontal-scroll">
      <head>
        {/* Google Analytics removed to prevent hydration issues */}
      </head>
      <body className="no-horizontal-scroll">
        <LoyaltyProvider>
          <ClientLayoutWithConditionalNavbar>
            {children}
          </ClientLayoutWithConditionalNavbar>
        </LoyaltyProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
