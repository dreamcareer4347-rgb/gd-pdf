import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CompressPdf from '@/components/CompressPdf';
import Link from 'next/link';

export const metadata = {
  title: 'Compress PDF to 200KB Online Free — UPSC & Govt Exams',
  description:
    'Shrink a multi-page PDF under 200KB for UPSC, SSC CHSL, IBPS and Railway uploads, with text and photos still readable. No upload.',
  alternates: {
    canonical: 'https://gdpdf.online/compress-pdf-200kb',
  },
};

export default function CompressPdf200KBPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        'name': 'PDF Compressor to 200KB',
        'url': 'https://gdpdf.online/compress-pdf-200kb',
        'applicationCategory': 'UtilitiesApplication',
        'operatingSystem': 'Any',
        'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'INR' },
      },
      {
        '@type': 'FAQPage',
        'mainEntity': [
          {
            '@type': 'Question',
            'name': 'Why is my 200KB PDF still rejected by the portal?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'Most rejections at this size are about dimensions or format, not file size. Check whether the portal wants JPG instead of PDF, or a specific page size.',
            },
          },
          {
            '@type': 'Question',
            'name': 'Does compressing to 200KB ruin scanned documents?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'It depends on the source. A greyscale 150 DPI scan survives 200KB well. A colour photo-heavy scan does not.',
            },
          },
          {
            '@type': 'Question',
            'name': 'Can I compress several PDFs at once?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'Merge them first, then compress the combined file. That gives you one output under 200KB.',
            },
          },
          {
            '@type': 'Question',
            'name': 'What is the difference between this and the 100KB page?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': '100KB is meant for single-page photo, signature and certificate uploads. 200KB is for multi-page document sets.',
            },
          },
          {
            '@type': 'Question',
            'name': 'Will my signature still be visible at 200KB?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'Yes, if it was scanned in black ink on white paper. Check the output at 100% zoom before submission.',
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
            Compress PDF to 200KB Online — Free & Private
          </h1>
          <p className="text-slate-600 text-xs md:text-sm max-w-2xl mx-auto">
            Shrink multi-page marksheets and certificate sets under 200KB for government exam portals instantly.
          </p>
        </div>

        {/* 1. TOOL PLACED AT THE VERY TOP */}
        <div className="max-w-4xl mx-auto mb-10">
          <CompressPdf targetKb={200} />
        </div>

        {/* 2. SEO CONTENT AND FAQS BELOW THE TOOL */}
        <div className="max-w-4xl mx-auto space-y-8 text-slate-700">
          <section className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200 space-y-3">
            <h2 className="text-lg font-bold text-slate-900">Getting a multi-page set under 200KB</h2>
            <p className="text-xs md:text-sm leading-relaxed text-slate-600">
              200KB is the most common upper limit on central government recruitment portals for combined document sets like marksheets, income certificates, and ID proofs.
            </p>
          </section>

          <section className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200">
            <h2 className="text-lg font-bold text-slate-900 mb-3">How to compress a PDF to 200KB</h2>
            <ol className="list-decimal pl-5 space-y-2 text-xs md:text-sm">
              <li>Merge all documents into one PDF file first.</li>
              <li>Set target size to 200KB.</li>
              <li>Compress securely inside your browser with zero server storage.</li>
              <li>Review the smallest text on the last page before uploading.</li>
            </ol>
          </section>

          <section className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200 space-y-4">
            <h2 className="text-lg font-bold text-slate-900">Frequently Asked Questions</h2>
            <div className="space-y-3 text-xs md:text-sm">
              <div>
                <h3 className="font-bold text-slate-900">Why is my 200KB PDF still rejected by the portal?</h3>
                <p className="text-slate-600 mt-0.5">Check portal requirements for exact format or dimensions rather than size.</p>
              </div>
              <div>
                <h3 className="font-bold text-slate-900">Does compressing to 200KB ruin scanned documents?</h3>
                <p className="text-slate-600 mt-0.5">Greyscale 150 DPI scans survive well. Colour photo-heavy scans may need rescanning.</p>
              </div>
              <div>
                <h3 className="font-bold text-slate-900">Can I compress several PDFs at once?</h3>
                <p className="text-slate-600 mt-0.5">Merge them first, then compress the combined file.</p>
              </div>
              <div>
                <h3 className="font-bold text-slate-900">What is the difference between this and 100KB?</h3>
                <p className="text-slate-600 mt-0.5">100KB is for single-page files; 200KB provides more headroom for multi-page document sets.</p>
              </div>
              <div>
                <h3 className="font-bold text-slate-900">Will my signature still be visible at 200KB?</h3>
                <p className="text-slate-600 mt-0.5">Yes, if scanned clearly in black ink on white paper.</p>
              </div>
            </div>
          </section>

          <section className="bg-blue-50/50 p-5 rounded-2xl border border-blue-100 text-center space-y-2">
            <h3 className="text-xs font-bold text-[#033B70] uppercase tracking-wider">Need a Different Target Size?</h3>
            <div className="flex flex-wrap justify-center gap-3 text-xs font-semibold">
              <Link href="/compress-pdf-100kb" className="text-blue-700 hover:underline">Compress PDF to 100KB</Link>
              <span>•</span>
              <Link href="/compress-pdf" className="text-blue-700 hover:underline">All PDF Compression</Link>
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