import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ImageResizerTool from '@/components/ImageResizer';

export const metadata = {
  title: 'Resize Image KB & Dimensions Online — GD PDF',
  description: 'Resize JPG, PNG pictures to specific dimensions or KB size online for free. Ideal for form uploads.',
  keywords: ['Resize Image KB', 'Image Dimensions Resizer', 'Photo KB Reducer', 'Online Image Resizer'],
  openGraph: {
    title: 'Resize Image Online Free — GD PDF',
    description: 'Adjust image dimensions and size safely in your browser.',
    url: 'https://gdpdf.online/resize-image',
  },
};

export default function ResizeImagePage() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-50">
      <Header />
      <main className="flex-grow py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight text-center mb-2">
            Resize Image KB & Pixels
          </h1>
          <p className="text-center text-slate-600 text-sm mb-8 max-w-xl mx-auto">
            Modify image dimensions (width/height) and file size for official application forms and documents.
          </p>
          
          <ImageResizerTool />

          {/* On-Page FAQs */}
          <section className="max-w-4xl mx-auto mt-16 pt-12 border-t border-slate-200">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-xs">
                <h3 className="font-bold text-slate-900 text-base mb-1">How do I resize a photo for online application forms?</h3>
                <p className="text-sm text-slate-600">Upload your picture, enter the exact target width, height, or target KB size specified in the form requirements, and click Resize to download your perfectly adjusted image.</p>
              </div>
              <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-xs">
                <h3 className="font-bold text-slate-900 text-base mb-1">Which image formats are supported?</h3>
                <p className="text-sm text-slate-600">GD PDF supports popular formats including JPG, JPEG, PNG, and WebP for fast client-side resizing.</p>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}