import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
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
          'text': 'Many central and state government recruitment exams require scanned signatures to be formatted in exactly 6 cm width by 2 cm height dimensions with a clear white background.'
        }
      },
      {
        '@type': 'Question',
        'name': 'How to resize signature to 6x2 cm online?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Upload your scanned signature image to GD PDF Suite, preview it, and click format to automatically adjust it to the precise 6x2 cm ratio securely inside your browser with 100% privacy.'
        }
      },
      {
        '@type': 'Question',
        'name': 'Is my scanned signature safe on this website?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Yes, 100% safe. All image processing happens locally inside your browser using client-side JavaScript. Your signature is never uploaded to any external server.'
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

          {/* SEO Content Section for Fast Indexing */}
          <section className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 text-slate-700 text-sm sm:text-base space-y-6 shadow-sm">
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Official Signature 6×2 cm Resizer for Government Job Applications
            </h2>
            <p className="leading-relaxed">
              When applying for Indian government recruitment exams such as <strong>SSC CGL, CHSL, Banking (IBPS, SBI), Railways, and UPSC</strong>, form portals have strict dimension and file size guidelines. Uploading an incorrectly cropped signature often results in automated application rejections. Our free online tool allows aspirants to instantly crop and format their scanned signatures to the exact <strong>6 cm × 2 cm</strong> standard required by official portals.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 space-y-2">
                <h3 className="font-bold text-slate-900 text-base">⚡ 100% Client-Side Privacy</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Your signature is personal and sensitive. Unlike other websites, our tool processes everything locally in your browser. No files are ever saved or uploaded to our cloud.
                </p>
              </div>
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 space-y-2">
                <h3 className="font-bold text-slate-900 text-base">🎯 Exact Dimension Ratio</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Automatically locks into the precise 6:2 aspect ratio, preventing any stretching, blurring, or pixelation during government portal uploads.
                </p>
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-slate-100">
              <h3 className="text-xl font-extrabold text-slate-900">
                Frequently Asked Questions (FAQs)
              </h3>
              
              <div className="space-y-3">
                <div className="bg-slate-50 p-4 rounded-xl">
                  <h4 className="font-bold text-slate-900 mb-1">What is the standard signature size for government exams?</h4>
                  <p className="text-xs sm:text-sm text-slate-600">Most central recruitment notifications mandate a 6 cm width by 2 cm height layout with clear margins on a solid white background.</p>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl">
                  <h4 className="font-bold text-slate-900 mb-1">How do I use this tool?</h4>
                  <p className="text-xs sm:text-sm text-slate-600">Simply click upload, select your signature image from your phone or PC, adjust the crop box if needed, and download your ready-to-use 6x2 cm image file instantly.</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Footer Added */}
      <Footer />
    </div>
  );
}