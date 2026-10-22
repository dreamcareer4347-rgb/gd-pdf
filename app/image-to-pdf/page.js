import Home from '@/app/page';

export const metadata = {
  title: 'Convert Image to PDF Online Free — GD PDF',
  description: 'Convert JPG, PNG, WebP images to PDF instantly in your browser. 100% secure with zero server uploads.',
  keywords: ['Image to PDF', 'JPG to PDF', 'PNG to PDF', 'Picture to PDF Converter', 'Free PDF Maker'],
  openGraph: {
    title: 'Convert Image to PDF Online Free — GD PDF',
    description: 'Fast, free, and secure client-side Image to PDF converter.',
    url: 'https://gdpdf.online/image-to-pdf',
  },
};

export default function ImageToPdfPage() {
  return <Home defaultTab="image-to-pdf" />;
}