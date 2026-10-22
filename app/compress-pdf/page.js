import CompressPdfTool from '@/components/CompressPdf';

export const metadata = {
  title: 'Compress PDF Online to Target KB — GD PDF',
  description: 'Reduce PDF file size online to custom KB/MB while maintaining visual quality. 100% client-side privacy.',
  keywords: ['Compress PDF', 'Reduce PDF Size KB', 'PDF Size Reducer', 'Free PDF Compressor'],
  openGraph: {
    title: 'Compress PDF Online Free — GD PDF',
    description: 'Reduce PDF file size securely in your browser.',
    url: 'https://gdpdf.online/compress-pdf',
  },
};

export default function CompressPdfPage() {
  return (
    <main className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight text-center mb-2">
          Compress PDF File Size
        </h1>
        <p className="text-center text-slate-600 text-sm mb-8 max-w-xl mx-auto">
          Shrink your PDF document to target KB or MB limits instantly without uploading to any server.
        </p>
        
        <CompressPdfTool />
      </div>
    </main>
  );
}