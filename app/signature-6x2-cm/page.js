import React from 'react';
import Header from '@/components/Header';
import SignatureSixByTwo from '@/components/SignatureSixByTwo';

export const metadata = {
  title: 'Signature 6x2 cm Resizer Online - Official Exam Form Size Format',
  description: 'Free online tool to resize and format your scanned signature to exact 6 cm × 2 cm dimensions for government job application forms, SSC, UPSC, and banking exams.',
  keywords: [
    'signature 6x2 cm resizer online',
    'signature size for government exam',
    'resize signature to 6x2 cm',
    'signature cropper online 6x2',
    'ssc signature size resizer',
    'gd pdf suite signature tool'
  ],
  alternates: {
    canonical: 'https://gdpdf.online/signature-6x2-cm',
  },
  openGraph: {
    title: 'Signature 6x2 cm Resizer Online | GD PDF Suite',
    description: 'Format your signature image to official 6cm x 2cm recruitment and exam form standards instantly.',
    url: 'https://gdpdf.online/signature-6x2-cm',
    siteName: 'GD PDF Suite',
    type: 'website',
  },
};

export default function SignaturePage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': [
      {
        '@type': 'Question',
        'name': 'What is the standard signature size for government exams?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Many government exams require signatures to be formatted in a 6 cm width by 2 cm height dimension with a clear white background.'
        }
      },
      {
        '@type': 'Question',
        'name': 'How to resize signature to 6x2 cm online?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Upload your scanned signature image, preview it, and click format to automatically adjust it to the precise 6x2 cm ratio securely inside your browser.'
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
          <SignatureSixByTwo />

          <section className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 text-slate-600 text-sm space-y-6">
            <h2 className="text-xl font-extrabold text-slate-800">
              Why Use Signature 6×2 cm Resizer?
            </h2>
            <p className="leading-relaxed">
              Submitting online application forms for banking, railways, or central recruitment boards often results in form rejections if the scanned signature dimensions do not match the notification criteria. Our tool formats your signature to an exact <strong>6cm × 2cm</strong> specification with 100% client-side privacy.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}