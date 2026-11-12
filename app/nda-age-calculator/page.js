import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import NdaAgeCalculatorClient from '@/components/NdaAgeCalculator';

export const metadata = {
  title: 'NDA Age Calculator Online - UPSC Defense Exam Eligibility Criteria',
  description: 'Free NDA Age Limit Calculator for UPSC NDA 1 & NDA 2 exams. Check DOB eligibility, date criteria, and cutoff for NDA defense aspirants.',
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
          'text': 'The age limit for UPSC NDA exam is usually between 16.5 years to 19.5 years at the commencement of the course. Only unmarried candidates born within the official UPSC notification date range can apply.'
        }
      },
      {
        '@type': 'Question',
        'name': 'Is age relaxation applicable for SC/ST in NDA exam?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'No, UPSC does not provide any category-based age relaxation for SC, ST, or OBC candidates in the National Defence Academy (NDA) examination.'
        }
      },
      {
        '@type': 'Question',
        'name': 'Can female candidates apply for NDA?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Yes, female candidates are fully eligible to apply for the UPSC NDA exam subject to the same age limit rules and marital status requirements as male candidates.'
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
          <section className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 text-slate-700 text-sm sm:text-base space-y-6 shadow-sm">
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              UPSC NDA Age Limit &amp; Eligibility Calculator
            </h2>
            <p className="leading-relaxed">
              The National Defence Academy (NDA) entrance examination is conducted twice every year by the Union Public Service Commission (<strong>UPSC NDA 1 &amp; NDA 2</strong>). Calculating your exact eligibility based on shifting notification cutoff dates can often be confusing. Our free <strong>NDA Age Calculator</strong> instantly verifies whether your Date of Birth (DOB) falls within the official criteria set for defense aspirants.
            </p>

            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 space-y-2">
              <h3 className="font-bold text-slate-900 text-base">🛡️ Core NDA Eligibility Rules</h3>
              <ul className="list-disc list-inside space-y-1.5 text-xs sm:text-sm text-slate-600">
                <li><strong>Age Bracket:</strong> Generally between 16.5 years and 19.5 years at the time course commences.</li>
                <li><strong>Marital Status:</strong> Only unmarried male and female candidates are eligible to apply.</li>
                <li><strong>Educational Qualification:</strong> 12th Class Pass (with Physics &amp; Mathematics specifically required for Air Force and Naval wings).</li>
              </ul>
            </div>

            <div className="space-y-4 pt-4 border-t border-slate-100">
              <h3 className="text-xl font-extrabold text-slate-900">
                Frequently Asked Questions (FAQs)
              </h3>
              
              <div className="space-y-3 text-xs sm:text-sm">
                <div className="bg-slate-50 p-4 rounded-xl">
                  <h4 className="font-bold text-slate-900 mb-1">What is the age limit for UPSC NDA Exam?</h4>
                  <p className="text-slate-600">The age limit for UPSC NDA exam is usually between 16.5 years to 19.5 years at the commencement of the course. Only unmarried candidates born within the official notification range can apply.</p>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl">
                  <h4 className="font-bold text-slate-900 mb-1">Can girls apply for NDA?</h4>
                  <p className="text-slate-600">Yes, female candidates are fully eligible for the NDA exam subject to the same age limit rules and criteria as male candidates.</p>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl">
                  <h4 className="font-bold text-slate-900 mb-1">How many attempts are allowed for NDA?</h4>
                  <p className="text-slate-600">There is no fixed limit on the total number of attempts. You can appear as long as your date of birth falls within the permissible eligibility age range.</p>
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