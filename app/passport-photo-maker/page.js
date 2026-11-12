import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
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
          'text': 'Upload your passport photo, adjust the frame and crop area, and our tool automatically generates a 4x6 inch print sheet containing multiple copies ready for instant printing.'
        }
      },
      {
        '@type': 'Question',
        'name': 'What is the standard size of a passport photo in India?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'The standard passport photo size in India for exams, PAN card, and official documents is 3.5 cm x 4.5 cm (35mm x 45mm), while US visas require 2x2 inches (51mm x 51mm).'
        }
      },
      {
        '@type': 'Question',
        'name': 'Are my photos uploaded to any server?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'No. All photo cropping and 4x6 sheet generation happen locally inside your browser using JavaScript. Your personal photos never leave your device.'
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

          {/* Comprehensive SEO Guide & Visible FAQs */}
          <section className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 text-slate-700 text-sm sm:text-base space-y-6 shadow-sm">
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Free Passport Photo Maker &amp; 4×6 Print Sheet Generator
            </h2>
            <p className="leading-relaxed">
              Getting passport size photographs printed at a local studio often costs ₹100 to ₹200 for just a few copies. With the <strong>GD PDF Suite Passport Photo Maker</strong>, you can take a clear photo with your smartphone, crop it to exact official dimensions, and automatically arrange <strong>8 to 12 copies onto a standard 4×6 inch photo sheet</strong>. Simply download the high-resolution sheet and get it printed at any local photo lab or cyber cafe for ₹10–₹20.
            </p>

            {/* Standard Sizes Guide */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 space-y-2">
                <h3 className="font-bold text-slate-900 text-base">🇮🇳 Indian Passport &amp; Exam Size</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Standard <strong>3.5 cm × 4.5 cm (35mm × 45mm)</strong> format accepted for Indian Passports, SSC, UPSC, IBPS, Railway forms, and PAN/Aadhaar updates.
                </p>
              </div>
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 space-y-2">
                <h3 className="font-bold text-slate-900 text-base">🖨️ Ready-to-Print 4×6 Layout</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Includes crisp cutting borders between each photo copy so you can trim them neatly with scissors after printing on glossy 4×6 photo paper.
                </p>
              </div>
            </div>

            {/* Step-by-Step Instructions */}
            <div className="space-y-3 pt-2">
              <h3 className="text-lg font-extrabold text-slate-900">
                How to Make a 4×6 Passport Photo Sheet in 3 Steps
              </h3>
              <ol className="list-decimal pl-5 space-y-2 text-xs sm:text-sm text-slate-600">
                <li><strong>Upload Your Photo:</strong> Choose a well-lit front-facing photo against a plain light or white background.</li>
                <li><strong>Adjust Crop &amp; Copies:</strong> Align your face inside the crop guide and select how many copies you need on the 4×6 sheet.</li>
                <li><strong>Download &amp; Print:</strong> Save the final 300 DPI print-ready image directly to your phone or PC—100% private with zero server uploads.</li>
              </ol>
            </div>

            {/* Visible FAQ Section matching JSON-LD */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <h3 className="text-xl font-extrabold text-slate-900">
                Frequently Asked Questions (FAQs)
              </h3>
              
              <div className="space-y-3">
                <div className="bg-slate-50 p-4 rounded-xl">
                  <h4 className="font-bold text-slate-900 mb-1">How to create a 4x6 passport photo sheet online?</h4>
                  <p className="text-xs sm:text-sm text-slate-600">Upload your passport photo, adjust the frame and crop area, and our tool automatically generates a 4x6 inch print sheet containing multiple copies ready for instant printing.</p>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl">
                  <h4 className="font-bold text-slate-900 mb-1">What is the standard size of a passport photo in India?</h4>
                  <p className="text-xs sm:text-sm text-slate-600">The standard passport photo size in India for exams, PAN card, and official documents is 3.5 cm x 4.5 cm (35mm x 45mm), while US visas require 2x2 inches (51mm x 51mm).</p>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl">
                  <h4 className="font-bold text-slate-900 mb-1">Are my photos uploaded to any server?</h4>
                  <p className="text-xs sm:text-sm text-slate-600">No. All photo cropping and 4x6 sheet generation happen locally inside your browser using JavaScript. Your personal photos never leave your device.</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}