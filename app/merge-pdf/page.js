import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MergePdfTool from '@/components/MergePdf';

export const metadata = {
  title: 'Merge PDF Files Online Free — GD PDF',
  description: 'Combine multiple PDF documents into one single PDF file quickly and securely in your browser.',
  keywords: ['Merge PDF', 'Combine PDF Files', 'Join PDF Online', 'Free PDF Merger'],
  openGraph: {
    title: 'Merge PDF Online Free — GD PDF',
    description: 'Combine PDF files seamlessly with 100% client-side security.',
    url: 'https://gdpdf.online/merge-pdf',
  },
};

export default function MergePdfPage() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-50">
      <Header />
      <main className="flex-grow py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight text-center mb-2">
            Merge PDF Files Instantly
          </h1>
          <p className="text-center text-slate-600 text-sm mb-8 max-w-xl mx-auto">
            Combine separate PDF files into a single structured document directly on your device.
          </p>
          
          <MergePdfTool />

          {/* On-Page FAQs */}
          <section className="max-w-4xl mx-auto mt-16 pt-12 border-t border-slate-200">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-xs">
                <h3 className="font-bold text-slate-900 text-base mb-1">How many PDF files can I merge together?</h3>
                <p className="text-sm text-slate-600">You can merge multiple PDF files simultaneously. Since processing happens right on your device, there are no strict file upload limits.</p>
              </div>
              <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-xs">
                <h3 className="font-bold text-slate-900 text-base mb-1">Is it safe to merge confidential PDF documents here?</h3>
                <p className="text-sm text-slate-600">Yes, completely safe. Your files never leave your device or get sent to any server, guaranteeing maximum privacy for sensitive documents.</p>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}