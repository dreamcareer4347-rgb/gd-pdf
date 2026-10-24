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
  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900">
      {/* Header */}
      <Header />

      <main className="flex-grow py-10 px-4 bg-slate-50">
        <div className="max-w-4xl mx-auto text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
            Image Resizer for Online Forms & Applications
          </h1>
          <p className="text-slate-600">
            Easily adjust dimensions and compress KB size of your photographs and signatures to meet strict government form guidelines.
          </p>
        </div>

        <ImageResizer />

        <section className="max-w-3xl mx-auto mt-12 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-xl font-bold text-slate-800 mb-3">Form Photo Guidelines Checklist</h2>
          <ul className="list-disc pl-5 space-y-2 text-slate-600">
            <li>Passport Photograph: Typically required under 50KB - 100KB in JPG/JPEG format.</li>
            <li>Signature Image: Usually required under 20KB - 50KB size limit.</li>
            <li>Instant client-side resizing guarantees crisp visual clarity.</li>
          </ul>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}