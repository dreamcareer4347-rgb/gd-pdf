import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ImageResizer from '@/components/ImageResizer';
import Link from 'next/link';

export const metadata = {
  title: 'Resize Photo to 50KB Online Free',
  description:
    'Compress a passport photo to exactly 50KB for SSC, UPSC and state exam forms, with the face still sharp. No upload, free.',
  alternates: {
    canonical: 'https://gdpdf.online/photo-resize-50kb',
  },
};

export default function PhotoResize50KBPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        'name': 'Passport Photo Resizer to 50KB',
        'url': 'https://gdpdf.online/photo-resize-50kb',
        'applicationCategory': 'UtilitiesApplication',
        'operatingSystem': 'Any',
        'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'INR' },
      },
      {
        '@type': 'FAQPage',
        'mainEntity': [
          {
            '@type': 'Question',
            'name': 'Will a 50KB photo look pixelated on the printed form?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'No, if the pixel dimensions are correct. 50KB is plenty for a 3.5×4.5 cm photo printed at normal size — the file size only becomes a problem if the image was already low resolution before compression.',
            },
          },
          {
            '@type': 'Question',
            'name': 'Can I resize a photo I took on my phone?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'Yes, and that is the usual case. Phone cameras produce 2-5MB files, which is why the resize step is needed at all. Avoid using a screenshot of a photo — that re-compresses it once before you even start.',
            },
          },
          {
            '@type': 'Question',
            'name': 'What if the form needs both 50KB and a specific pixel size?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'Set both in the same pass. Resizing dimensions and compressing to a target KB happens in one operation, so there is no quality loss from doing it twice.',
            },
          },
          {
            '@type': 'Question',
            'name': 'Does the background colour matter?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'For file size, a plain light background compresses much better than a busy one. For acceptance, most notifications require a white or very light background — check yours before uploading.',
            },
          },
          {
            '@type': 'Question',
            'name': 'Which page should I use if my limit is 20KB or 100KB?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'Use the 20KB page for signature uploads, and the 100KB page for documents and ID proofs. 50KB is specifically the passport photo range.',
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
            Resize Photo to 50KB Online — Free &amp; Private
          </h1>
          <p className="text-slate-600 text-xs md:text-sm max-w-2xl mx-auto">
            50KB is the standard limit for passport photos in Indian recruitment forms. Keep facial features sharp with browser-side compression.
          </p>
        </div>

        {/* TOOL AT TOP */}
        <div className="max-w-4xl mx-auto mb-10">
          <ImageResizer targetKb={50} />
        </div>

        {/* CONTENT & FAQS */}
        <div className="max-w-4xl mx-auto space-y-8 text-slate-700">
          <section className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200 space-y-3">
            <h2 className="text-lg font-bold text-slate-900">Get the Framing Right Before the File Size</h2>
            <p className="text-xs md:text-sm leading-relaxed text-slate-600">
              Most notifications describe the photograph: plain light background, face occupying 70-80% of the frame, both ears visible, no cap or goggles. Crop to those proportions first, then compress — compressing a badly framed photo and then cropping causes double quality loss.
            </p>
          </section>

          <section className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200">
            <h2 className="text-lg font-bold text-slate-900 mb-3">How to Resize a Passport Photo to 50KB</h2>
            <ol className="list-decimal pl-5 space-y-2 text-xs md:text-sm text-slate-700">
              <li><strong>Start from a plain-background photo:</strong> A wall, not a doorway with background clutter.</li>
              <li><strong>Crop to required proportions:</strong> Face centred, head filling most of the frame.</li>
              <li><strong>Set 50KB as target:</strong> Add pixel dimensions if specified by the exam notification.</li>
              <li><strong>Check the face at 100%:</strong> Eyes and jawline should be crisp, not soft-edged.</li>
            </ol>
          </section>

          <section className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200 space-y-4">
            <h2 className="text-lg font-bold text-slate-900">Frequently Asked Questions</h2>
            <div className="space-y-3 text-xs md:text-sm">
              <div>
                <h3 className="font-bold text-slate-900">Will a 50KB photo look pixelated on the printed form?</h3>
                <p className="text-slate-600 mt-0.5">No, if pixel dimensions are correct. 50KB is plenty for a standard 3.5×4.5 cm print.</p>
              </div>
              <div>
                <h3 className="font-bold text-slate-900">Can I resize a photo I took on my phone?</h3>
                <p className="text-slate-600 mt-0.5">Yes. Direct phone camera photos are 2-5MB, making resizing essential. Avoid using screenshots.</p>
              </div>
              <div>
                <h3 className="font-bold text-slate-900">What if the form needs both 50KB and a specific pixel size?</h3>
                <p className="text-slate-600 mt-0.5">Set both in the same pass in the tool for optimal quality.</p>
              </div>
              <div>
                <h3 className="font-bold text-slate-900">Does the background colour matter?</h3>
                <p className="text-slate-600 mt-0.5">Plain light backgrounds compress better and meet portal compliance.</p>
              </div>
              <div>
                <h3 className="font-bold text-slate-900">Which page should I use if my limit is 20KB or 100KB?</h3>
                <p className="text-slate-600 mt-0.5">Use 20KB for signatures, 100KB for scanned document uploads.</p>
              </div>
            </div>
          </section>

          <section className="bg-blue-50/50 p-5 rounded-2xl border border-blue-100 text-center space-y-2">
            <h3 className="text-xs font-bold text-[#033B70] uppercase tracking-wider">Related Resizer Pages</h3>
            <div className="flex flex-wrap justify-center gap-3 text-xs font-semibold">
              <Link href="/photo-resize-20kb" className="text-blue-700 hover:underline">Resize Photo to 20KB</Link>
              <span>•</span>
              <Link href="/photo-resize-100kb" className="text-blue-700 hover:underline">Resize Image to 100KB</Link>
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