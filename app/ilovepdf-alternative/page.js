import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CompressPdf from '@/components/CompressPdf';

export const metadata = {
  title: '100% Private iLovePDF Alternative - Free & Secure',
  description: 'Looking for a secure iLovePDF alternative? GD PDF Suite processes your PDF and image files locally in your browser with zero server uploads. 100% private and free.',
  keywords: [
    'ilovepdf alternative',
    'secure pdf compressor online',
    'private pdf tools browser side',
    'free online pdf toolkit without server upload'
  ],
  alternates: {
    canonical: 'https://gdpdf.online/ilovepdf-alternative',
  },
};

export default function ILovePdfAlternativePage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900">
      {/* Header */}
      <Header />

      <main className="flex-grow py-10 px-4 bg-slate-50">
        <div className="max-w-4xl mx-auto text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
            The 100% Private iLovePDF Alternative
          </h1>
          <p className="text-slate-600">
            Convert, compress, and manage your sensitive documents directly in your browser. Unlike traditional tools, your files never touch any remote server.
          </p>
        </div>

        <CompressPdf />

        <section className="max-w-3xl mx-auto mt-12 bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
          <h2 className="text-xl font-bold text-slate-800">Why Switch to GD PDF Suite?</h2>
          <ul className="list-disc pl-5 space-y-2 text-slate-600">
            <li><strong>Zero Server Uploads:</strong> All processing happens inside your browser using WebAssembly and client-side JavaScript.</li>
            <li><strong>Absolute Privacy:</strong> Your bank statements, Aadhaar cards, and confidential agreements remain strictly on your device.</li>
            <li><strong>Lightning Fast:</strong> No waiting for large files to upload or download over slow internet connections.</li>
          </ul>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}