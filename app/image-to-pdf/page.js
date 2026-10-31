import Header from '@/components/Header';
import ImageToPdf from '@/components/ImageToPdf';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Convert Image to PDF Online Free — GD PDF',
  description: 'Convert JPG, PNG, WebP images to PDF instantly in your browser. 100% secure with zero server uploads[cite: 1].',
  keywords: ['Image to PDF', 'JPG to PDF', 'PNG to PDF', 'Picture to PDF Converter', 'Free PDF Maker'],
  alternates: { canonical: 'https://gdpdf.online/image-to-pdf' },
  openGraph: {
    title: 'Convert Image to PDF Online Free — GD PDF',
    description: 'Fast, free, and secure client-side Image to PDF converter.',
    url: 'https://gdpdf.online/image-to-pdf',
  },
};

export default function ImageToPdfRoutePage() {
  return (
    <div className="flex flex-col bg-white text-slate-900 selection:bg-blue-600 selection:text-white min-h-screen">
      {/* Unified Header */}
      <Header />

      {/* Main Tool Container with proper spacing */}
      <main className="flex-grow max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <ImageToPdf />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}