import React from 'react';
import Header from '@/components/Header';
import HeicConverter from '@/components/HeicConverter';

export const metadata = {
  title: 'iPhone Photo Converter Online (HEIC/HEIF to JPG/PNG)',
  description: 'Free online tool to convert Apple iPhone HEIC and HEIF photos into standard JPG or PNG images instantly in your browser with 100% privacy and zero server uploads.',
  keywords: [
    'iphone photo converter online',
    'heic to jpg converter free',
    'convert heif to jpg online',
    'apple photo converter for forms',
    'heic to png converter browser',
    'gd pdf suite heic tool'
  ],
  alternates: {
    canonical: 'https://gdpdf.online/iphone-photo-converter',
  },
  openGraph: {
    title: 'iPhone Photo Converter Online (HEIC to JPG) | GD PDF Suite',
    description: 'Easily convert your iPhone HEIC pictures into universally accepted JPG or PNG formats online.',
    url: 'https://gdpdf.online/iphone-photo-converter',
    siteName: 'GD PDF Suite',
    type: 'website',
  },
};

export default function IphonePhotoConverterPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': [
      {
        '@type': 'Question',
        'name': 'How to convert iPhone HEIC photos to JPG online?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Upload your HEIC/HEIF file from your iPhone, select your desired output format (JPG or PNG), and click convert to download your compatible image instantly.'
        }
      },
      {
        '@type': 'Question',
        'name': 'Why do I need to convert HEIC to JPG?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Most government exam portals, application forms, and website uploads do not support Apple HEIC format, requiring standard JPG or PNG files.'
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
          <HeicConverter />

          <section className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 text-slate-600 text-sm space-y-6">
            <h2 className="text-xl font-extrabold text-slate-800">
              Why Use iPhone Photo Converter?
            </h2>
            <p className="leading-relaxed">
              Apple devices save camera shots in HEIC format to save storage space, but online admission forms and government job applications often reject them. Our <strong>iPhone Photo Converter</strong> transforms your HEIC files into universally accepted JPG or PNG formats securely inside your browser.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}