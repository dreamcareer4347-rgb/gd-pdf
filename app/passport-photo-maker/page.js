import React from 'react';
import Header from '@/components/Header';
import PassportPhotoMaker from '@/components/PassportPhotoMaker';

export const metadata = {
  title: 'Passport Photo Maker & 4x6 Sheet Generator Online Free',
  description: 'Create passport size photos and generate 4x6 print sheets online for free. Crop, resize, and arrange multiple photos on a 4x6 photo sheet instantly.',
  keywords: [
    'passport photo maker online',
    '4x6 photo sheet generator',
    'passport size photo layout maker',
    'print passport photos 4x6 sheet',
    'free passport photo resizer',
    'gd pdf suite passport tool'
  ],
  alternates: {
    canonical: 'https://gdpdf.online/passport-photo-maker',
  },
  openGraph: {
    title: 'Passport Photo Maker & 4x6 Sheet Generator | GD PDF Suite',
    description: 'Easily create standard passport photos and arrange them on a 4x6 sheet for printing.',
    url: 'https://gdpdf.online/passport-photo-maker',
    siteName: 'GD PDF Suite',
    type: 'website',
  },
};

export default function PassportPhotoPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': [
      {
        '@type': 'Question',
        'name': 'How to create a 4x6 passport photo sheet online?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Upload your passport photo, adjust the frame and background, and our tool automatically generates a 4x6 inch print sheet containing multiple copies ready for printing.'
        }
      },
      {
        '@type': 'Question',
        'name': 'What is the standard size of a passport photo?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Standard passport photo size is 3.5 cm x 4.5 cm (or 2x2 inches for US visas). Our tool lets you format your photos cleanly for printing.'
        }
      }
    ]
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* Navigation Header */}
      <Header />

      <main className="flex-grow py-10 px-4">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />

        <div className="max-w-4xl mx-auto space-y-10">
          <PassportPhotoMaker />

          <section className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 text-slate-600 text-sm space-y-6">
            <h2 className="text-xl font-extrabold text-slate-800">
              Free Passport Photo Maker & 4x6 Sheet Generator
            </h2>
            <p className="leading-relaxed">
              Printing individual passport photos at a photo studio can be costly. With our <strong>Passport Photo Maker & 4x6 Sheet Generator</strong>, you can upload a single snapshot, format it to passport dimensions, and arrange 8 to 12 copies onto a standard 4x6 inch photo sheet right inside your browser. Take the sheet to any print shop and get your photos printed at a fraction of the cost!
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}