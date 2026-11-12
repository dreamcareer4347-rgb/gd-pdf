import Header from '@/components/Header';
import ImageToPdf from '@/components/ImageToPdf';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Convert Image to PDF Online Free — GD PDF',
  description: 'Convert JPG, PNG, WebP images to PDF instantly in your browser. 100% secure with zero server uploads.',
  keywords: ['Image to PDF', 'JPG to PDF', 'PNG to PDF', 'Picture to PDF Converter', 'Free PDF Maker'],
  alternates: { canonical: 'https://gdpdf.online/image-to-pdf' },
  openGraph: {
    title: 'Convert Image to PDF Online Free — GD PDF',
    description: 'Fast, free, and secure client-side Image to PDF converter.',
    url: 'https://gdpdf.online/image-to-pdf',
  },
};

export default function ImageToPdfRoutePage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': [
      {
        '@type': 'Question',
        'name': 'How to convert JPG or PNG images to PDF online?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Upload your images (JPG, PNG, or WebP), arrange them in your desired order, customize page margins or orientation if needed, and click convert to download your PDF instantly.'
        }
      },
      {
        '@type': 'Question',
        'name': 'Are my converted documents secure and private?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Yes, 100% secure. All image-to-PDF processing happens locally inside your browser via client-side scripts, ensuring your files are never uploaded to any external server.'
        }
      }
    ]
  };

  return (
    <div className="flex flex-col bg-white text-slate-900 selection:bg-blue-600 selection:text-white min-h-screen">
      {/* FAQ Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Unified Header */}
      <Header />

      {/* Main Tool Container with proper spacing */}
      <main className="flex-grow max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        <ImageToPdf />

        {/* SEO Informative Content & FAQs */}
        <section className="bg-slate-50 p-6 sm:p-8 rounded-3xl border border-slate-200 text-slate-700 text-sm sm:text-base space-y-6 shadow-sm">
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Free Image to PDF Converter Online
          </h2>
          <p className="leading-relaxed text-slate-600">
            Converting scanned documents, assignment pages, certificates, or personal snapshots into a single professional PDF document is essential for online submissions. Our <strong>Image to PDF Converter</strong> lets you combine multiple JPG, PNG, or WebP images into a clean, well-formatted PDF file directly within your web browser with absolute privacy.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-2 shadow-xs">
              <h3 className="font-bold text-slate-900 text-base">⚡ Instant Browser Processing</h3>
              <p className="text-xs sm:text-sm text-slate-600">No waiting for heavy files to upload or download from cloud servers. Everything converts locally in seconds.</p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-2 shadow-xs">
              <h3 className="font-bold text-slate-900 text-base">🔒 100% Zero Server Uploads</h3>
              <p className="text-xs sm:text-sm text-slate-600">Your sensitive documents and personal photos never leave your device, ensuring complete confidentiality.</p>
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-slate-200">
            <h3 className="text-xl font-extrabold text-slate-900">Frequently Asked Questions</h3>
            <div className="space-y-3 text-xs sm:text-sm">
              <div className="bg-white p-4 rounded-xl border border-slate-200">
                <h4 className="font-bold text-slate-900 mb-1">How to convert JPG or PNG images to PDF online?</h4>
                <p className="text-slate-600">Upload your images, reorder them if needed, and click convert to download your merged PDF document instantly.</p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-slate-200">
                <h4 className="font-bold text-slate-900 mb-1">Are my converted documents secure and private?</h4>
                <p className="text-slate-600">Yes, all processing happens entirely inside your browser using client-side JavaScript.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}