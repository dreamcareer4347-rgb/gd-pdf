import React from 'react';
import Header from '@/components/Header';
import NdaAgeCalculatorClient from '@/components/NdaAgeCalculator';

export const metadata = {
  title: 'NDA Age Calculator Online - UPSC Defense Exam Eligibility Criteria',
  description: 'Free NDA Age Limit Calculator for UPSC NDA 1 & NDA 2 exams. Check DOB eligibility, date criteria, and cutoff for NDA 2026/2027 defense aspirants.',
  keywords: [
    'nda age calculator',
    'upsc nda age limit',
    'nda eligibility calculator',
    'nda 1 age limit',
    'nda 2 age limit',
    'nda age limit for girls',
    'nda dob limit calculator',
    'defense exam age limit',
    'can i apply for nda',
    'nda cutoff date calculator'
  ],
  alternates: {
    canonical: 'https://gdpdf.online/nda-age-calculator',
  },
  openGraph: {
    title: 'NDA Age Calculator Online - UPSC Defense Eligibility Check',
    description: 'Check your exact age and eligibility for UPSC NDA 1 & NDA 2 exams instantly.',
    url: 'https://gdpdf.online/nda-age-calculator',
    siteName: 'GD PDF Suite',
    type: 'website',
  },
};

export default function NdaAgeCalculatorPage() {
  // Structured Schema Data for Search Engine Rich Snippets
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': [
      {
        '@type': 'Question',
        'name': 'What is the age limit for UPSC NDA Exam?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'The age limit for UPSC NDA exam is usually between 15.7 years (16.5 at commencement of course) to 19.5 years. Only unmarried candidates born within the specified date range can apply.'
        }
      },
      {
        '@type': 'Question',
        'name': 'Is age relaxation applicable for SC/ST in NDA exam?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'No, UPSC does not provide any age relaxation for SC/ST or OBC candidates in the NDA exam.'
        }
      }
    ]
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* Header Added */}
      <Header />

      <main className="flex-grow py-10 px-4">
        {/* Schema Injection */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />

        <div className="max-w-4xl mx-auto space-y-10">
          {/* Interactive Calculator Client Component */}
          <NdaAgeCalculatorClient />

          {/* SEO Keywords & Article Section */}
          <section className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 text-slate-600 text-sm space-y-6">
            <h2 className="text-xl font-extrabold text-slate-800">
              UPSC NDA Age Limit & Eligibility Criteria
            </h2>
            <p className="leading-relaxed">
              The National Defence Academy (NDA) entrance exam is conducted twice a year by UPSC (NDA 1 and NDA 2). 
              Calculating your exact age based on the official UPSC notifications can be confusing. 
              Our <strong>NDA Age Calculator</strong> simplifies this by telling you instantly whether your Date of Birth (DOB) fits the eligible criteria.
            </p>

            <h3 className="text-base font-bold text-slate-800 pt-2">
              Target Keywords & NDA Eligibility Rules
            </h3>
            <ul className="list-disc list-inside space-y-2 text-xs sm:text-sm">
              <li><strong>Age Limit Range:</strong> 16.5 years to 19.5 years (at course commencement).</li>
              <li><strong>Marital Status:</strong> Only unmarried male and female candidates are eligible.</li>
              <li><strong>Educational Qualification:</strong> 12th Pass or appearing in 12th standard (Physics & Math required for Air Force & Navy wings).</li>
            </ul>

            <div className="pt-4 border-t border-slate-100">
              <h3 className="text-base font-bold text-slate-800 mb-3">Frequently Asked Questions (FAQs)</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-bold text-slate-700">Can girls apply for NDA?</h4>
                  <p className="text-xs text-slate-500 mt-1">
                    Yes, female candidates are fully eligible for the NDA exam subject to the same age limit rules as male candidates.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-slate-700">How many attempts are allowed for NDA?</h4>
                  <p className="text-xs text-slate-500 mt-1">
                    There is no fixed limit on the number of attempts. You can appear as long as your age falls within the eligibility range.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}