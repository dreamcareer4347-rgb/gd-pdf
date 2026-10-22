'use client';

import React from 'react';
import { UploadCloud, Sliders, Download, Zap, ShieldCheck } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      step: '1',
      title: 'Upload Your Images',
      desc: 'Select or drag & drop multiple JPG, PNG, or WebP photos at once from your phone or desktop.',
      icon: UploadCloud,
    },
    {
      step: '2',
      title: 'Arrange & Customize',
      desc: 'Reorder pages, rotate images, and choose custom page sizes (A4, Letter), margins, or orientation.',
      icon: Sliders,
    },
    {
      step: '3',
      title: 'Download Instantly',
      desc: 'Click convert and download your high-quality PDF in seconds. Processed 100% locally on your device.',
      icon: Download,
    },
  ];

  // Search Engine HowTo Schema for Google Snippets
  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    'name': 'How to Convert Images to PDF Online Free',
    'description': 'Convert JPG, PNG, and WebP images to a single PDF document securely in 3 simple steps using GD PDF Suite.',
    'step': steps.map((s) => ({
      '@type': 'HowToStep',
      'position': s.step,
      'name': s.title,
      'text': s.desc,
    })),
  };

  return (
    <section id="how-it-works" className="py-16 bg-slate-50/80 border-t border-slate-200/80">
      {/* Google Search HowTo Schema Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <div className="inline-flex items-center space-x-1.5 bg-blue-50 border border-blue-100 px-3 py-1 rounded-full text-blue-700 text-xs font-bold">
            <Zap className="w-3.5 h-3.5" />
            <span>Fast & Simple Workflow</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            How to Convert Images to PDF
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Combine your photos into a professional PDF document in three easy steps with GD PDF Suite by GD Dream Career.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {steps.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-md transition-all space-y-4 relative overflow-hidden group"
              >
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-black text-lg group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-4xl font-black text-slate-100 group-hover:text-blue-50 transition-colors">
                    0{item.step}
                  </span>
                </div>

                <div className="space-y-1.5">
                  <h3 className="text-lg font-bold text-slate-900">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Security & Privacy Banner */}
        <div className="mt-10 bg-blue-50/60 border border-blue-100 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left max-w-4xl mx-auto">
          <div className="flex items-center space-x-3">
            <ShieldCheck className="w-6 h-6 text-blue-600 shrink-0 hidden sm:block" />
            <p className="text-xs sm:text-sm text-slate-700 font-medium">
              <span className="font-bold text-slate-900">100% Privacy Guarantee:</span> Files are processed directly in your browser without uploading to any cloud server.
            </p>
          </div>
          <span className="text-[11px] font-bold text-blue-700 bg-white px-3 py-1.5 rounded-xl border border-blue-200/80 shrink-0">
            GD PDF Privacy
          </span>
        </div>
      </div>
    </section>
  );
}