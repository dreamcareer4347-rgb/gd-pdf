import ImageResizerTool from '@/components/ImageResizer'; // Aapka existing Image Resizer component

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
    <main className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight text-center mb-2">
          Resize Image KB & Pixels
        </h1>
        <p className="text-center text-slate-600 text-sm mb-8 max-w-xl mx-auto">
          Modify image dimensions (width/height) and file size for official application forms and documents.
        </p>
        
        <ImageResizerTool />
      </div>
    </main>
  );
}