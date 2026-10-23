import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CompressPdfTool from '@/components/CompressPdf';

export const metadata = {
  title: 'Compress PDF Online to Target KB — GD PDF',
  description: 'Reduce PDF file size online to custom KB/MB while maintaining visual quality. 100% client-side privacy.',
  keywords: ['Compress PDF', 'Reduce PDF Size KB', 'PDF Size Reducer', 'Free PDF Compressor'],
  openGraph: {
    title: 'Compress PDF Online Free — GD PDF',
    description: 'Reduce PDF file size securely in your browser.',
    url: 'https://gdpdf.online/compress-pdf',
  },
};

export default function CompressPdfPage() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-50">
      <Header />
      <main className="flex-grow py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main heading changed to h2 to prevent duplicate h1 issue */}
          <h2 className="text-3xl font-black text-slate-900 tracking-tight text-center mb-2">
            Compress PDF File Size
          </h2>
          <p className="text-center text-slate-600 text-sm mb-8 max-w-xl mx-auto">
            Shrink your PDF document to target KB or MB limits instantly without uploading to any server.
          </p>
          
          <CompressPdfTool />

          {/* On-Page FAQs */}
          <section className="max-w-4xl mx-auto mt-16 pt-12 border-t border-slate-200">
            <h3 className="text-2xl font-bold text-slate-900 mb-6 text-center">Frequently Asked Questions</h3>
            <div className="space-y-4">
              <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-xs">
                <h4 className="font-bold text-slate-900 text-base mb-1">Can I compress PDF to a specific KB size?</h4>
                <p className="text-sm text-slate-600">Yes, GD PDF allows custom compression levels so you can reduce PDF file sizes to match exact application form requirement limits (e.g., under 100KB, 200KB, or 500KB).</p>
              </div>
              <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-xs">
                <h4 className="font-bold text-slate-900 text-base mb-1">Will PDF compression lower my document quality?</h4>
                <p className="text-sm text-slate-600">GD PDF optimizes internal elements while preserving text clarity and picture readability so your document stays professional.</p>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}