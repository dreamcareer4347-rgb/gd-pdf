import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ImageResizer from '@/components/ImageResizer';
import Link from 'next/link';

export const metadata = {
  title: 'Resize Image to 100KB Online Free',
  description:
    'Compress a scanned document, ID proof or certificate to 100KB while the text stays readable. Runs in your browser, no upload.',
  alternates: {
    canonical: 'https://gdpdf.online/photo-resize-100kb',
  },
};

export default function PhotoResize100KBPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        'name': 'Document Image Resizer to 100KB',
        'url': 'https://gdpdf.online/photo-resize-100kb',
        'applicationCategory': 'UtilitiesApplication',
        'operatingSystem': 'Any',
        'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'INR' },
      },
      {
        '@type': 'FAQPage',
        'mainEntity': [
          {
            '@type': 'Question',
            'name': 'My text becomes unreadable at 100KB. What now?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'Rescan or rephotograph at a lower resolution instead of compressing harder. A 150 DPI greyscale scan reaches 100KB with clean text, while a 600 DPI colour scan forced down to 100KB produces a smudge.',
            },
          },
          {
            '@type': 'Question',
            'name': 'Should I upload a JPG or a PDF for documents?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'Follow the portal instruction — many recruitment forms accept only JPG for photographs and signatures, while document uploads are often PDF. If a PDF is needed, compress images first and combine them.',
            },
          },
          {
            '@type': 'Question',
            'name': 'Does 100KB work for a two-page document?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'Two pages at 100KB total is tight. Either upload each page separately if allowed, or use our PDF compressor at 200KB for the combined file.',
            },
          },
          {
            '@type': 'Question',
            'name': 'Will the portal accept a greyscale image?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'For documents, yes in almost every case. For photographs and signatures, check the notification — some ask specifically for colour photographs.',
            },
          },
          {
            '@type': 'Question',
            'name': 'Is it safe to resize a sensitive identity document copy here?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'Yes, because the file never leaves your device — processing is client-side, so no server receives the image.',
            },
          },
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Header />

      <main className="flex-grow py-8 px-4 bg-slate-50">
        <div className="max-w-4xl mx-auto text-center mb-6">
          <h1 className="text-2xl md:text-4xl font-extrabold text-slate-900 mb-2">
            Resize Image to 100KB Online — Free &amp; Private
          </h1>
          <p className="text-slate-600 text-xs md:text-sm max-w-2xl mx-auto">
            100KB is the standard limit for scanned document uploads. Ensure text readability with zero server uploads.
          </p>
        </div>

        {/* TOOL AT TOP */}
        <div className="max-w-4xl mx-auto mb-10">
          <ImageResizer targetKb={100} />
        </div>

        {/* CONTENT & FAQS */}
        <div className="max-w-4xl mx-auto space-y-8 text-slate-700">
          <section className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200 space-y-3">
            <h2 className="text-lg font-bold text-slate-900">Scanned Document vs Phone Photo of a Document</h2>
            <p className="text-xs md:text-sm leading-relaxed text-slate-600">
              A flatbed scan at 300 DPI in colour can be 2-5MB for a single page, containing unnecessary colour data. Converting to greyscale cuts size drastically without loss of legibility. For phone photos, straighten and crop page edges first before compressing to 100KB.
            </p>
          </section>

          <section className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200">
            <h2 className="text-lg font-bold text-slate-900 mb-3">How to Resize a Document Image to 100KB</h2>
            <ol className="list-decimal pl-5 space-y-2 text-xs md:text-sm text-slate-700">
              <li><strong>Crop to page edges:</strong> Remove desk clutter and shadows surrounding the paper.</li>
              <li><strong>Switch to greyscale:</strong> For text documents, this instantly halves file size.</li>
              <li><strong>Set 100KB target:</strong> Process directly in your browser.</li>
              <li><strong>Read the smallest line at 100% zoom:</strong> Verify that dates, names, and numbers remain crisp.</li>
            </ol>
          </section>

          <section className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200 space-y-4">
            <h2 className="text-lg font-bold text-slate-900">Frequently Asked Questions</h2>
            <div className="space-y-3 text-xs md:text-sm">
              <div>
                <h3 className="font-bold text-slate-900">My text becomes unreadable at 100KB. What now?</h3>
                <p className="text-slate-600 mt-0.5">Rescan or photograph at 150 DPI greyscale instead of over-compressing a 600 DPI scan.</p>
              </div>
              <div>
                <h3 className="font-bold text-slate-900">Should I upload a JPG or a PDF for documents?</h3>
                <p className="text-slate-600 mt-0.5">Follow portal instructions. If 200KB PDF is needed, adjust target accordingly.</p>
              </div>
              <div>
                <h3 className="font-bold text-slate-900">Does 100KB work for a two-page document?</h3>
                <p className="text-slate-600 mt-0.5">Two pages at 100KB total is tight. Use separate page uploads or compress combined PDF at 200KB.</p>
              </div>
              <div>
                <h3 className="font-bold text-slate-900">Will the portal accept a greyscale image?</h3>
                <p className="text-slate-600 mt-0.5">For document copies, yes in almost all recruitment and admission portals.</p>
              </div>
              <div>
                <h3 className="font-bold text-slate-900">Is it safe to resize a sensitive identity document copy here?</h3>
                <p className="text-slate-600 mt-0.5">Yes, because processing happens 100% locally in your web browser.</p>
              </div>
            </div>
          </section>

          <section className="bg-blue-50/50 p-5 rounded-2xl border border-blue-100 text-center space-y-2">
            <h3 className="text-xs font-bold text-[#033B70] uppercase tracking-wider">Related Resizer Pages</h3>
            <div className="flex flex-wrap justify-center gap-3 text-xs font-semibold">
              <Link href="/photo-resize-20kb" className="text-blue-700 hover:underline">Resize Photo to 20KB</Link>
              <span>•</span>
              <Link href="/photo-resize-50kb" className="text-blue-700 hover:underline">Resize Photo to 50KB</Link>
              <span>•</span>
              <Link href="/resize-image" className="text-blue-700 hover:underline">All Image Resizer Tools</Link>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}