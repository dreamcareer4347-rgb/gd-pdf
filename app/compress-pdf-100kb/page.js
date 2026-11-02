import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CompressPdf from '@/components/CompressPdf';
import Link from 'next/link';

export const metadata = {
  title: 'Compress PDF to 100KB Online Free — Fast & Private',
  description:
    'Reduce a PDF under 100KB for SSC, IBPS and state portal uploads. Runs in your browser, no upload, no watermark, no sign-up.',
  alternates: {
    canonical: 'https://gdpdf.online/compress-pdf-100kb',
  },
};

export default function CompressPdf100KBPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        'name': 'PDF Compressor to 100KB',
        'url': 'https://gdpdf.online/compress-pdf-100kb',
        'applicationCategory': 'UtilitiesApplication',
        'operatingSystem': 'Any',
        'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'INR' },
      },
      {
        '@type': 'FAQPage',
        'mainEntity': [
          {
            '@type': 'Question',
            'name': 'Why does my scanned PDF refuse to go below 100KB?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'A colour scan at 300 DPI is mostly image data. At 100KB there is very little room left, so the compressor has to downsample heavily. If the result becomes unreadable, rescan the document in greyscale at 150 DPI instead.',
            },
          },
          {
            '@type': 'Question',
            'name': 'Will the text stay selectable after compression?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'For PDFs that were generated digitally, yes — text is kept and only embedded images are reduced. For scanned PDFs there is no text layer to begin with.',
            },
          },
          {
            '@type': 'Question',
            'name': 'My form says "100KB" but the portal still rejects the file. Why?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'Some portals check the size in bytes rather than kilobytes, so a file of exactly 102400 bytes can fail a strict limit. Compress to 95KB instead of 100KB to leave a small margin.',
            },
          },
          {
            '@type': 'Question',
            'name': 'Is there a page limit?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'No fixed limit. But a 20-page scan cannot realistically reach 100KB with readable output — for long documents, use the 500KB page instead.',
            },
          },
          {
            '@type': 'Question',
            'name': 'Is my document uploaded to a server?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'No. Compression happens in your browser using client-side JavaScript, which is why this is safe for documents containing personal details.',
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
            Compress PDF to 100KB Online — Free & Private
          </h1>
          <p className="text-slate-600 text-xs md:text-sm max-w-2xl mx-auto">
            Reduce PDF file size under 100KB instantly for strict government exam forms. 100% secure client-side processing.
          </p>
        </div>

        {/* 1. TOOL PLACED AT THE VERY TOP */}
        <div className="max-w-4xl mx-auto mb-10">
          <CompressPdf targetKb={100} />
        </div>

        {/* 2. SEO CONTENT AND FAQS BELOW THE TOOL */}
        <div className="max-w-4xl mx-auto space-y-8 text-slate-700">
          <section className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200 space-y-3">
            <h2 className="text-lg font-bold text-slate-900">Where the 100KB limit applies</h2>
            <p className="text-xs md:text-sm leading-relaxed text-slate-600">
              A 100KB limit is the tightest one Indian recruitment portals ask for, applied to single-page scanned certificates, signed declarations, or photo-and-signature PDFs.
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs md:text-sm">
              <li><strong>Photo and signature PDFs:</strong> Small images exceeding limits due to high export resolution.</li>
              <li><strong>Single-page scanned certificates:</strong> 300 DPI colour scans reaching up to 2MB.</li>
            </ul>
          </section>

          <section className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200">
            <h2 className="text-lg font-bold text-slate-900 mb-3">How to compress a PDF to 100KB</h2>
            <ol className="list-decimal pl-5 space-y-2 text-xs md:text-sm">
              <li>Add your PDF by dragging or picking from your device.</li>
              <li>Set target size to 100KB.</li>
              <li>Compress instantly inside your browser without server uploads.</li>
              <li>Download and check legibility at 100% zoom.</li>
            </ol>
          </section>

          <section className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200 space-y-4">
            <h2 className="text-lg font-bold text-slate-900">Frequently Asked Questions</h2>
            <div className="space-y-3 text-xs md:text-sm">
              <div>
                <h3 className="font-bold text-slate-900">Why does my scanned PDF refuse to go below 100KB?</h3>
                <p className="text-slate-600 mt-0.5">A colour scan at 300 DPI is mostly image data. If unreadable, rescan in greyscale at 150 DPI instead.</p>
              </div>
              <div>
                <h3 className="font-bold text-slate-900">Will the text stay selectable after compression?</h3>
                <p className="text-slate-600 mt-0.5">For digitally generated PDFs, yes. Scanned PDFs remain raster images.</p>
              </div>
              <div>
                <h3 className="font-bold text-slate-900">My form says "100KB" but portal rejects it. Why?</h3>
                <p className="text-slate-600 mt-0.5">Some portals check exact bytes. Try compressing to 95KB to leave a safe margin.</p>
              </div>
              <div>
                <h3 className="font-bold text-slate-900">Is there a page limit?</h3>
                <p className="text-slate-600 mt-0.5">No fixed limit, but multi-page scans won't fit 100KB cleanly. Use 500KB for long documents.</p>
              </div>
              <div>
                <h3 className="font-bold text-slate-900">Is my document uploaded to a server?</h3>
                <p className="text-slate-600 mt-0.5">No, everything runs 100% client-side in your browser.</p>
              </div>
            </div>
          </section>

          <section className="bg-blue-50/50 p-5 rounded-2xl border border-blue-100 text-center space-y-2">
            <h3 className="text-xs font-bold text-[#033B70] uppercase tracking-wider">Need a Different Target Size?</h3>
            <div className="flex flex-wrap justify-center gap-3 text-xs font-semibold">
              <Link href="/compress-pdf" className="text-blue-700 hover:underline">All PDF Compression</Link>
              <span>•</span>
              <Link href="/compress-pdf-200kb" className="text-blue-700 hover:underline">Compress PDF to 200KB</Link>
              <span>•</span>
              <Link href="/compress-pdf-500kb" className="text-blue-700 hover:underline">Compress PDF to 500KB</Link>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}