import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CompressPdf from '@/components/CompressPdf';

export const metadata = {
  title: 'Compress PDF to 100KB Online Free - Fast & Private',
  description: 'Reduce PDF file size under 100KB instantly in your browser for government job forms, admission portals, and visa applications. 100% private with GD PDF Suite.',
  keywords: [
    'compress pdf to 100kb',
    'reduce pdf size under 100kb',
    'pdf compressor for govt form',
    'compress pdf in kb online free'
  ],
  alternates: {
    canonical: 'https://gdpdf.online/compress-pdf-100kb',
  },
};

export default function CompressPdf100KBPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900">
      {/* Header */}
      <Header />

      <main className="flex-grow py-10 px-4 bg-slate-50">
        <div className="max-w-4xl mx-auto text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
            Compress PDF Under 100KB
          </h1>
          <p className="text-slate-600">
            Optimize and reduce PDF size specifically for online job forms (UPSC, SSC, IBPS), college admissions, and passport applications.
          </p>
        </div>

        <CompressPdf />

        <section className="max-w-3xl mx-auto mt-12 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-xl font-bold text-slate-800 mb-4">How to Compress PDF to 100KB?</h2>
          <ol className="list-decimal pl-5 space-y-2 text-slate-600">
            <li>Select or drag-and-drop your PDF document into the tool.</li>
            <li>Set compression level or target size to 100KB.</li>
            <li>Click Compress — processing completes instantly inside your web browser.</li>
            <li>Download your 100KB optimized PDF safely.</li>
          </ol>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}