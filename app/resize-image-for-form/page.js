import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ImageResizer from '@/components/ImageResizer';

export const metadata = {
  title: 'Resize Image in KB for Online Application Forms',
  description: 'Resize photos, passport images, and signature files in KB/MB for online recruitment portals. Free, instant, and private image size reducer.',
  keywords: [
    'resize image for online form',
    'photo size reducer in kb',
    'passport size photo resizer',
    'signature resizer for govt form'
  ],
  alternates: {
    canonical: 'https://gdpdf.online/resize-image-for-form',
  },
};

export default function ResizeImageForFormPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': [
      {
        '@type': 'Question',
        'name': 'How to resize an image for government job application forms?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Upload your photograph or signature, set your desired target file size in KB (e.g., 20KB, 50KB, or 100KB), and download your compressed image instantly inside your browser.'
        }
      },
      {
        '@type': 'Question',
        'name': 'Is my image uploaded to any external server?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'No. All resizing and compression happen 100% locally on your device using client-side JavaScript, ensuring complete privacy and safety for your personal documents.'
        }
      }
    ]
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900">
      {/* FAQ Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Header */}
      <Header />

      <main className="flex-grow py-10 px-4 bg-slate-50">
        <div className="max-w-4xl mx-auto text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3 tracking-tight">
            Image Resizer for Online Forms &amp; Applications
          </h1>
          <p className="text-slate-600 text-sm md:text-base max-w-2xl mx-auto">
            Easily adjust dimensions and compress KB size of your photographs and signatures to meet strict government form guidelines instantly.
          </p>
        </div>

        <ImageResizer />

        <section className="max-w-3xl mx-auto mt-12 bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-slate-200 text-slate-700 space-y-6">
          <h2 className="text-xl font-extrabold text-slate-900">Form Photo Guidelines &amp; Checklist</h2>
          <ul className="list-disc pl-5 space-y-2 text-xs md:text-sm text-slate-600">
            <li><strong>Passport Photograph:</strong> Typically required under 50KB - 100KB in JPG/JPEG format with a plain background.</li>
            <li><strong>Signature Image:</strong> Usually required under 20KB - 50KB size limit with clear dark ink strokes.</li>
            <li><strong>Privacy First:</strong> Instant client-side resizing guarantees crisp visual clarity without any risk of data leakage on external servers.</li>
          </ul>

          <div className="space-y-4 pt-4 border-t border-slate-100">
            <h3 className="text-lg font-extrabold text-slate-900">Frequently Asked Questions</h3>
            <div className="space-y-3 text-xs md:text-sm">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <h4 className="font-bold text-slate-900 mb-1">How to resize an image for government job application forms?</h4>
                <p className="text-slate-600">Upload your photograph or signature, set your desired target file size in KB, and download your compressed image instantly inside your browser.</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <h4 className="font-bold text-slate-900 mb-1">Is my image uploaded to any external server?</h4>
                <p className="text-slate-600">No. All resizing and compression happen 100% locally on your device, ensuring complete privacy and safety.</p>
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