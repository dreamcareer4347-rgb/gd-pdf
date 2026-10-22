// app/layout.js
import './globals.css';

export const metadata = {
  title: 'GD PDF Suite — Free Online PDF Tools by GD Dream Career',
  description: 'Convert Images to PDF, compress PDF size, and resize pictures securely in your browser. 100% client-side privacy.',
  keywords: ['Picture to PDF', 'Image to PDF', 'Compress PDF', 'Resize Image KB', 'GD PDF Suite', 'GD Dream Career'],
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title: 'GD PDF Suite — Free Online PDF Utility',
    description: '100% client-side PDF converter & image resizer. Zero server uploads.',
    url: 'https://gdpdfsuite.com', // Aapka final domain
    siteName: 'GD PDF Suite',
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased bg-white text-slate-900">{children}</body>
    </html>
  );
}