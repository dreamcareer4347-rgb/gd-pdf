import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CompressPdf from '@/components/CompressPdf';
import Link from 'next/link';

export const metadata = {
  title: 'Compress PDF to 500KB Online Free — Admissions & Visas',
  description:
    'Reduce large PDFs under 500KB for university admissions, visa forms and email attachments, without losing readable quality.',
  alternates: {
    canonical: 'https://gdpdf.online/compress-pdf-500kb',
  },
};

export default function CompressPdf500KBPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        'name': 'PDF Compressor to 500KB',
        'url': 'https://gdpdf.online/compress-pdf-500kb',
        'applicationCategory': 'UtilitiesApplication',
        'operatingSystem': 'Any',
        'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'INR' },
      },
      {
        '@type': 'FAQPage',
        'mainEntity': [
          {
            '@type': 'Question',
            'name': 'Can a 10MB PDF really become 500KB?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'Yes, if most of that 10MB is uncompressed image data, which is typical for scans. A PDF that is already optimised will compress far less.',
            },
          },
          {
            '@type': 'Question',
            'name': 'What happens to images and stamps inside the PDF?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'At 500KB there is enough headroom to keep them recognisable. Expect slight softness in photographs, not loss of the stamp itself.',
            },
          },
          {
            '@type': 'Question',
            'name': 'Does this work for password-protected PDFs?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'No. A protected file has to be unlocked before it can be re-saved. Remove the password in a PDF reader first, then compress.',
            },
          },
          {
            '@type': 'Question',
            'name': 'Is there a maximum file size I can add?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': "The limit is your device's memory, not a server quota. Files up to 50MB work on most laptops.",
            },
          },
          {
            '@type': 'Question',
            'name': 'Which page should I use instead if my file is small already?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'For a single photo or signature upload, the 100KB page is the right one. For a multi-page set of certificates, use 200KB.',
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
            Compress PDF to 500KB Online — Free & Private
          </h1>
          <p className="text-slate-600 text-xs md:text-sm max-w-2xl mx-auto">
            Reduce large PDF documents under 500KB for university admissions, visa applications, and email attachments.
          </p>
        </div>

        {/* 1. TOOL PLACED AT THE VERY TOP */}
        <div className="max-w-4xl mx-auto mb-10">
          <CompressPdf targetKb={500} />
        </div>

        {/* 2. SEO CONTENT AND FAQS BELOW THE TOOL */}
        <div className="max-w-4xl mx-auto space-y-8 text-slate-700">
          <section className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200 space-y-3">
            <h2 className="text-lg font-bold text-slate-900">When 500KB is the right target</h2>
            <p className="text-xs md:text-sm leading-relaxed text-slate-600">
              500KB provides a comfortable ceiling for university admission forms, visa applications, and multi-page scanned reports where text needs to remain sharp and readable.
            </p>
          </section>

          <section className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200">
            <h2 className="text-lg font-bold text-slate-900 mb-3">How to compress a PDF to 500KB</h2>
            <ol className="list-decimal pl-5 space-y-2 text-xs md:text-sm">
              <li>Add your large PDF document.</li>
              <li>Set target size to 500KB.</li>
              <li>Compress and download securely inside your local browser.</li>
              <li>Compare side-by-side for optimal quality retention.</li>
            </ol>
          </section>

          <section className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200 space-y-4">
            <h2 className="text-lg font-bold text-slate-900">Frequently Asked Questions</h2>
            <div className="space-y-3 text-xs md:text-sm">
              <div>
                <h3 className="font-bold text-slate-900">Can a 10MB PDF really become 500KB?</h3>
                <p className="text-slate-600 mt-0.5">Yes, if most of it is uncompressed image scan data.</p>
              </div>
              <div>
                <h3 className="font-bold text-slate-900">What happens to images and stamps inside the PDF?</h3>
                <p className="text-slate-600 mt-0.5">At 500KB there is enough headroom to keep them completely recognisable.</p>
              </div>
              <div>
                <h3 className="font-bold text-slate-900">Does this work for password-protected PDFs?</h3>
                <p className="text-slate-600 mt-0.5">No, unlock the password in a PDF reader first before compressing.</p>
              </div>
              <div>
                <h3 className="font-bold text-slate-900">Is there a maximum file size limit?</h3>
                <p className="text-slate-600 mt-0.5">Limited only by your device memory (up to 50MB works on laptops).</p>
              </div>
              <div>
                <h3 className="font-bold text-slate-900">Which page should I use for smaller files?</h3>
                <p className="text-slate-600 mt-0.5">Use 100KB for single photos/signatures, or 200KB for standard certificate sets.</p>
              </div>
            </div>
          </section>

          <section className="bg-blue-50/50 p-5 rounded-2xl border border-blue-100 text-center space-y-2">
            <h3 className="text-xs font-bold text-[#033B70] uppercase tracking-wider">Need a Different Target Size?</h3>
            <div className="flex flex-wrap justify-center gap-3 text-xs font-semibold">
              <Link href="/compress-pdf-100kb" className="text-blue-700 hover:underline">Compress PDF to 100KB</Link>
              <span>•</span>
              <Link href="/compress-pdf-200kb" className="text-blue-700 hover:underline">Compress PDF to 200KB</Link>
              <span>•</span>
              <Link href="/compress-pdf" className="text-blue-700 hover:underline">All PDF Compression</Link>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}