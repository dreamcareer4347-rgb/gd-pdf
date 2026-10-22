'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

const faqs = [
  {
    q: 'Is this Picture to PDF and PDF compression suite completely free?',
    a: 'Yes, 100% free with no hidden charges, watermarks, or subscription requirements, brought to you by GD Dream Career.'
  },
  {
    q: 'Are my files, images, and documents secure and private?',
    a: 'Absolutely. All processing occurs locally in your browser using secure client-side technologies. Your files are never uploaded to any external server.'
  },
  {
    q: 'What image and PDF formats are supported?',
    a: 'We support standard web image formats including JPG, JPEG, PNG, WebP, as well as complete PDF document processing.'
  },
  {
    q: 'Do I need to install any software or application?',
    a: 'No installation required. It runs entirely inside any modern web browser on desktop, tablet, and mobile smartphones seamlessly.'
  }
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Structured Data Schema for FAQ rich snippets in Google search results
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': faqs.map((faq) => ({
      '@type': 'Question',
      'name': faq.q,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': faq.a
      }
    }))
  };

  return (
    <section id="faq" className="py-16 bg-slate-50/50 border-t border-slate-200/80">
      {/* Search Engine FAQ Schema Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 space-y-2">
          <div className="inline-flex items-center space-x-1.5 bg-blue-50 border border-blue-100 px-3 py-1 rounded-full text-blue-700 text-xs font-bold">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-3xl font-extrabold text-slate-950 tracking-tight">Frequently Asked Questions</h2>
          <p className="text-sm sm:text-base text-slate-600">Everything you need to know about GD PDF Suite by GD Dream Career.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-slate-200 rounded-2xl overflow-hidden transition-all bg-white shadow-xs hover:shadow-md"
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full px-6 py-4 text-left font-bold text-slate-900 text-sm sm:text-base flex items-center justify-between hover:bg-slate-50/80 transition-colors cursor-pointer"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-5 h-5 text-slate-500 shrink-0 ml-4 transition-transform duration-200 ${
                    openIndex === index ? 'transform rotate-180 text-blue-600' : ''
                  }`}
                />
              </button>
              {openIndex === index && (
                <div className="px-6 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3 animate-fade-in bg-blue-50/20">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}