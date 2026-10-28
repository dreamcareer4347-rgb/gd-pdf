import './globals.css';
import SeoSchema from '@/components/SeoSchema';
import { Analytics } from '@vercel/analytics/react';

export const metadata = {
  title: 'GD PDF Suite — Free Online Image to PDF & Compressor Tools',
  description: 'Convert Images to PDF, compress PDF size, and resize pictures securely in your browser. 100% client-side privacy with zero server uploads.',
  authors: [{ name: 'Dev Sharma', url: 'https://gdpdf.online' }],
  creator: 'Dev Sharma',
  publisher: 'GD PDF Suite',
  keywords: [
    'Picture to PDF',
    'Image to PDF',
    'Compress PDF',
    'Resize Image KB',
    'Merge PDF Online',
    'GD PDF Suite',
    'GD PDF',
    'Free PDF Converter'
  ],
  manifest: '/manifest.json',
  icons: {
    icon: '/gd-logo.png',
    apple: '/gd-logo.png',
  },
  verification: {
    google: '0i-Rdd8sDuMwGD84UMyQcj63tyEtVDlNNY0oMHIbsg4',
  },
  openGraph: {
    title: 'GD PDF Suite — Free Online PDF Utility',
    description: '100% client-side PDF converter & image resizer. Zero server uploads.',
    url: 'https://gdpdf.online',
    siteName: 'GD PDF Suite',
    locale: 'en_US',
    type: 'website',
  },
};

export const viewport = {
  themeColor: '#033B70',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased bg-white text-slate-900 flex flex-col min-h-screen">
        <SeoSchema />
        
        {/* Main Content Area (Header ab individual pages par handle ho raha hai) */}
        <div className="flex-grow">
          {children}
        </div>

        <Analytics />
      </body>
    </html>
  );
}