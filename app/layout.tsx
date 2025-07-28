import type { Metadata } from 'next'
import './globals.css'
import ClientLayoutWithConditionalNavbar from '@/components/ClientLayoutWithConditionalNavbar'
import Head from "next/head";

export const metadata: Metadata = {
  title: 'Mboga Pap',
  description: 'Order fresh groceries from local vendors and get fast delivery with Mboga Pap! Supporting community, vendors, and riders across Nairobi.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <Head>
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
      </Head>
      <body>
        <ClientLayoutWithConditionalNavbar>
          {children}
        </ClientLayoutWithConditionalNavbar>
      </body>
    </html>
  );
}
