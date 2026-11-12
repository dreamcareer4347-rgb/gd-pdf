import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AddNameAndDate from '@/components/AddNameAndDate';

export const metadata = {
  title: 'Add Name and Date on Photo Online - Photo Name & DOB Maker for Forms',
  description: 'Free online tool to add candidate Name and Date of Taking Photo (DOP) on passport size photos for SSC, UPSC, IBPS and government job application forms.',
  keywords: [
    'add name and dob on photo online',
    'photo name and date maker',
    'dop photo maker online',
    'ssc photo name and date generator',
    'add date on photo for government exam',
    'online photo stamp tool'
  ],
  alternates: {
    canonical: 'https://gdpdf.online/name-dob-photo',
  },
  openGraph: {
    title: 'Add Name & Date on Photo Online | GD PDF Suite',
    description: 'Easily add your name and photo date stamp for government exam application forms instantly.',
    url: 'https://gdpdf.online/name-dob-photo',
    siteName: 'GD PDF Suite',
    type: 'website',
  },
};

export default function NameDobPhotoPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': [
      {
        '@type': 'Question',
        'name': 'How to add name and date on photo for SSC/UPSC forms?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Upload your passport size photo, enter your candidate name and the date when the photo was taken, adjust the text bar style, and download your final ready-to-upload image instantly.'
        }
      },
      {
        '@type': 'Question',
        'name': 'What format should the date be on government exam photos?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Most government portals (like SSC and IBPS) require the format DD-MM-YYYY (e.g., 15-05-2026) printed clearly on a black/white strip at the bottom of the photo.'
        }
      },
      {
        '@type': 'Question',
        'name': 'Is my photo uploaded to any external server?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'No! All processing happens securely right inside your browser using client-side scripts. Your images remain 100% private and safe.'
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
          <AddNameAndDate />

          <section className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 text-slate-700 text-sm sm:text-base space-y-6 shadow-sm">
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Add Name and Date on Photo (DOP Maker) for Job Forms
            </h2>
            <p className="leading-relaxed">
              Many government recruitment boards (<strong>SSC CGL, CHSL, MTS, Banking, and State Exams</strong>) strictly require candidates to print their <strong>Name and Date of Photo (DOP)</strong> directly on the passport-size photograph. Failing to follow these notification guidelines can lead to automated rejection of your application form. Our <strong>Name &amp; DOB Photo Maker</strong> lets you add custom text strips with zero hassle right inside your browser.
            </p>

            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 space-y-2">
              <h3 className="font-bold text-slate-900 text-base">📌 Key Guidelines for Exam Photos</h3>
              <ul className="list-disc list-inside space-y-1.5 text-xs sm:text-sm text-slate-600">
                <li><strong>Clear Visibility:</strong> Name and date must be printed clearly in capital letters on a solid background strip at the bottom of the photo.</li>
                <li><strong>Recent Photo:</strong> The date on the photo should ideally not be older than 3 months from the official notification date.</li>
                <li><strong>Exact Format:</strong> Keep text clean and legible (e.g., <code className="bg-white px-1.5 py-0.5 rounded border border-slate-200 text-xs font-mono">Dev Sharma / 15-05-2026</code>).</li>
              </ul>
            </div>

            <div className="space-y-4 pt-4 border-t border-slate-100">
              <h3 className="text-xl font-extrabold text-slate-900">
                Frequently Asked Questions (FAQs)
              </h3>
              
              <div className="space-y-3 text-xs sm:text-sm">
                <div className="bg-slate-50 p-4 rounded-xl">
                  <h4 className="font-bold text-slate-900 mb-1">How to add name and date on photo for SSC/UPSC forms?</h4>
                  <p className="text-slate-600">Upload your passport size photo, enter your candidate name and the date when the photo was taken, adjust the text bar style, and download your final ready-to-upload image instantly.</p>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl">
                  <h4 className="font-bold text-slate-900 mb-1">What format should the date be on government exam photos?</h4>
                  <p className="text-slate-600">Most government portals (like SSC and IBPS) require the format DD-MM-YYYY (e.g., 15-05-2026) printed clearly on a strip at the bottom of the photo.</p>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl">
                  <h4 className="font-bold text-slate-900 mb-1">Is my photo uploaded to any external server?</h4>
                  <p className="text-slate-600">No! All processing happens securely right in your browser. Your images remain private and safe.</p>
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