import './globals.css';
import SeoSchema from '@/components/SeoSchema';
import { Analytics } from '@vercel/analytics/react';

export const metadata = {
  metadataBase: new URL('https://gdpdf.online'),
  title: {
    default: 'GD PDF Suite & Typing Pro — Free PDF Tools & Govt Exam Typing Master',
    template: '%s | GD PDF Suite & Typing Pro',
  },
  description: 'Free browser-based PDF tools, image compressor, passport photo maker, and GD Typing Pro Suite for SSC CGL, High Court, and government exams typing test practice. 100% secure client-side processing.',
  applicationName: 'GD PDF Suite & Typing Pro',
  authors: [{ name: 'Dev Sharma', url: 'https://gdpdf.online' }],
  creator: 'Dev Sharma',
  publisher: 'GD PDF Suite',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
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
  keywords: [
    // PDF & Document Tools
    'Picture to PDF',
    'Image to PDF',
    'Compress PDF Online Free',
    'Compress PDF 100kb 200kb',
    'Resize Image for Government Form',
    'Passport Photo Maker Online',
    'Signature Resize 6x2 cm',
    'NDA Age Calculator',
    'Merge PDF Online',
    'GD PDF Suite',
    'Free PDF Converter',
    'ILovePDF Alternative',
    // Typing Pro Suite & Govt Exams
    'Online Typing Test Free',
    'Touch Typing Course Online',
    'Govt Exam Typing Test Practice',
    'SSC CGL Typing Speed Calculator',
    'High Court Typing Test Software',
    'Hindi Typing Test Online',
    'GD Typing Pro Suite',
    'Typing Certificate Generator Free'
  ],
  manifest: '/manifest.json',
  icons: {
    icon: '/gd-logo.png',
    shortcut: '/gd-logo.png',
    apple: '/gd-logo.png',
  },
  verification: {
    google: '0i-Rdd8sDuMwGD84UMyQcj63tyEtVDlNNY0oMHIbsg4',
  },
  openGraph: {
    title: 'GD PDF Suite & Typing Pro — Free PDF Tools & Govt Exam Typing Master',
    description: 'Master touch typing with exam-grade passages and process documents securely in your browser with zero server uploads.',
    url: 'https://gdpdf.online',
    siteName: 'GD PDF Suite',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: '/gd-logo.png',
        width: 512,
        height: 512,
        alt: 'GD PDF Suite & Typing Pro Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GD PDF Suite & Typing Pro',
    description: 'Free browser utility platform for PDF tools, image formatting, and government exam touch typing master.',
    images: ['/gd-logo.png'],
  },
  category: 'Technology & Education',
};

export const viewport = {
  themeColor: '#033B70',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased bg-white text-slate-900 flex flex-col min-h-screen">
        <SeoSchema />
        
        <div className="flex-grow">
          {children}
        </div>

        <Analytics />
      </body>
    </html>
  );
}