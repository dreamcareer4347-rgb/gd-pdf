import MergePdfTool from '@/components/MergePdf';

export const metadata = {
  title: 'Merge PDF Files Online Free — GD PDF',
  description: 'Combine multiple PDF documents into one single PDF file quickly and securely in your browser.',
  keywords: ['Merge PDF', 'Combine PDF Files', 'Join PDF Online', 'Free PDF Merger'],
  openGraph: {
    title: 'Merge PDF Online Free — GD PDF',
    description: 'Combine PDF files seamlessly with 100% client-side security.',
    url: 'https://gdpdf.online/merge-pdf',
  },
};

export default function MergePdfPage() {
  return (
    <main className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight text-center mb-2">
          Merge PDF Files Instantly
        </h1>
        <p className="text-center text-slate-600 text-sm mb-8 max-w-xl mx-auto">
          Combine separate PDF files into a single structured document directly on your device.
        </p>
        
        <MergePdfTool />
      </div>
    </main>
  );
}