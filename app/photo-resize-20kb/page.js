import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ImageResizer from '@/components/ImageResizer';
import Link from 'next/link';

export const metadata = {
  title: 'Resize Photo to 20KB Online Free',
  description:
    'Compress a photo or signature to exactly 20KB for online exam forms. Runs in your browser — no upload, no sign-up, no watermark.',
  alternates: {
    canonical: 'https://gdpdf.online/photo-resize-20kb',
  },
};

export default function PhotoResize20KBPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        'name': 'Photo Resizer to 20KB',
        'url': 'https://gdpdf.online/photo-resize-20kb',
        'applicationCategory': 'UtilitiesApplication',
        'operatingSystem': 'Any',
        'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'INR' },
      },
      {
        '@type': 'FAQPage',
        'mainEntity': [
          {
            '@type': 'Question',
            'name': 'My signature becomes blurry at 20KB. What should I do?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'Crop the image tightly around the signature and try again. Most of the wasted space in a signature photo is blank white paper. If it is still unreadable, convert it to greyscale first — colour data is expensive and a black signature does not need it.',
            },
          },
          {
            '@type': 'Question',
            'name': 'Is 20KB enough for a photograph, or only for a signature?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'It is workable for a passport-style face photo if the background is plain and the image is cropped to the required dimensions. For a full document page, 20KB is not realistic — use the 100KB page instead.',
            },
          },
          {
            '@type': 'Question',
            'name': 'The form says 20KB but rejects my 20KB file. Why?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'Some portals compare bytes, not kilobytes, so a file of exactly 20480 bytes can fail. Target 18KB to leave a margin.',
            },
          },
          {
            '@type': 'Question',
            'name': 'Does resizing to 20KB change the pixel dimensions?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'Only if you ask it to. File size and pixel dimensions are separate settings — the form may require both, for example 20KB at 140×60 pixels for a signature.',
            },
          },
          {
            '@type': 'Question',
            'name': 'Is my signature uploaded anywhere?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'No. The resize happens inside your browser, so the image never reaches a server. That matters for a signature, which is an identity element you should not be sending to random websites.',
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
            Resize Photo to 20KB Online — Free &amp; Private
          </h1>
          <p className="text-slate-600 text-xs md:text-sm max-w-2xl mx-auto">
            20KB is the smallest limit Indian exam portals ask for, usually for signatures. Compress cleanly inside your browser with zero server uploads.
          </p>
        </div>

        {/* TOOL AT TOP */}
        <div className="max-w-4xl mx-auto mb-10">
          <ImageResizer targetKb={20} />
        </div>

        {/* CONTENT & FAQS */}
        <div className="max-w-4xl mx-auto space-y-8 text-slate-700">
          <section className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200 space-y-3">
            <h2 className="text-lg font-bold text-slate-900">Why a Signature at 20KB Stops Looking Like a Signature</h2>
            <p className="text-xs md:text-sm leading-relaxed text-slate-600">
              JPEG compression works in blocks of pixels and throws away detail it judges unimportant. A signature is mostly thin dark lines on a large white area — exactly the detail that gets discarded first. Two things fix this before you compress: scan or photograph the signature in black ink on plain white paper, and crop tightly so the white margins do not waste the 20KB budget.
            </p>
          </section>

          <section className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200">
            <h2 className="text-lg font-bold text-slate-900 mb-3">How to Resize a Photo or Signature to 20KB</h2>
            <ol className="list-decimal pl-5 space-y-2 text-xs md:text-sm text-slate-700">
              <li><strong>Use a clean source:</strong> Black ink on white paper, photographed straight on in good light.</li>
              <li><strong>Crop first:</strong> Trim the empty margins so the signature fills the frame.</li>
              <li><strong>Set the target to 20KB:</strong> If the form specifies dimensions, set width and height too.</li>
              <li><strong>Zoom in before uploading:</strong> At 100% zoom the strokes must still be continuous, not blotchy.</li>
            </ol>
          </section>

          <section className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200 space-y-4">
            <h2 className="text-lg font-bold text-slate-900">Frequently Asked Questions</h2>
            <div className="space-y-3 text-xs md:text-sm">
              <div>
                <h3 className="font-bold text-slate-900">My signature becomes blurry at 20KB. What should I do?</h3>
                <p className="text-slate-600 mt-0.5">Crop the image tightly around the signature and try again. Most wasted space is blank white paper. Convert to greyscale if needed.</p>
              </div>
              <div>
                <h3 className="font-bold text-slate-900">Is 20KB enough for a photograph, or only for a signature?</h3>
                <p className="text-slate-600 mt-0.5">It is workable for a passport-style face photo if the background is plain. For full document pages, use the 100KB page instead.</p>
              </div>
              <div>
                <h3 className="font-bold text-slate-900">The form says 20KB but rejects my 20KB file. Why?</h3>
                <p className="text-slate-600 mt-0.5">Some portals compare bytes rather than KB. Target 18KB to leave a safe margin.</p>
              </div>
              <div>
                <h3 className="font-bold text-slate-900">Does resizing to 20KB change the pixel dimensions?</h3>
                <p className="text-slate-600 mt-0.5">Only if you ask it to. File size and pixel dimensions are separate settings.</p>
              </div>
              <div>
                <h3 className="font-bold text-slate-900">Is my signature uploaded anywhere?</h3>
                <p className="text-slate-600 mt-0.5">No. The resize happens inside your web browser, keeping your identity element safe.</p>
              </div>
            </div>
          </section>

          <section className="bg-blue-50/50 p-5 rounded-2xl border border-blue-100 text-center space-y-2">
            <h3 className="text-xs font-bold text-[#033B70] uppercase tracking-wider">Related Resizer Pages</h3>
            <div className="flex flex-wrap justify-center gap-3 text-xs font-semibold">
              <Link href="/photo-resize-50kb" className="text-blue-700 hover:underline">Resize Photo to 50KB</Link>
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