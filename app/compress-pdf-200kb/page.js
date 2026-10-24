import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CompressPdf from '@/components/CompressPdf';

export const metadata = {
  title: 'Compress PDF under 200KB Online - Free & Private Tool',
  description: 'Resize and compress PDF files to under 200KB for online document upload portals. Browser-side processing ensures 100% data safety.',
  keywords: [
    'compress pdf to 200kb',
    'reduce pdf size to 200kb',
    'pdf size reducer under 200kb',
    'free online pdf compressor'
  ],
  alternates: {
    canonical: 'https://gdpdf.online/compress-pdf-200kb',
  },
};

export default function CompressPdf200KBPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900">
      {/* Header */}
      <Header />

      <main className="flex-grow py-10 px-4 bg-slate-50">
        <div className="max-w-4xl mx-auto text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
            Compress PDF to 200KB Online
          </h1>
          <p className="text-slate-600">
            Quickly compress oversized PDF documents under 200KB for Railway, Banking, and University portals without quality degradation.
          </p>
        </div>

        <CompressPdf />

        <section className="max-w-3xl mx-auto mt-12 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-xl font-bold text-slate-800 mb-3">Why Use GD PDF Suite for 200KB Compression?</h2>
          <p className="text-slate-600 leading-relaxed">
            Unlike other web services, GD PDF Suite processes files locally on your machine or mobile device. Your confidential certificates and identity proofs are never sent to remote servers.
          </p>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}