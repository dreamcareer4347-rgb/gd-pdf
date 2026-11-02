'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Shield, Zap, Heart } from 'lucide-react';

const pdfTools = [
  { href: '/image-to-pdf', label: 'Image to PDF' },
  { href: '/compress-pdf', label: 'Compress PDF' },
  { href: '/compress-pdf-100kb', label: 'Compress PDF to 100KB' },
  { href: '/compress-pdf-200kb', label: 'Compress PDF to 200KB' },
  { href: '/compress-pdf-500kb', label: 'Compress PDF to 500KB' },
  { href: '/merge-pdf', label: 'Merge PDF' },
];

const imageTools = [
  { href: '/resize-image', label: 'Resize Image' },
  { href: '/photo-resize-20kb', label: 'Photo to 20KB' },
  { href: '/photo-resize-50kb', label: 'Photo to 50KB' },
  { href: '/photo-resize-100kb', label: 'Photo to 100KB' },
  { href: '/resize-image-for-form', label: 'Photo for Exam Forms' },
  { href: '/passport-photo-maker', label: 'Passport Photo Sheet' },
  { href: '/signature-6x2-cm', label: 'Signature 6x2 cm' },
  { href: '/name-dob-photo', label: 'Name & Date on Photo' },
  { href: '/iphone-photo-converter', label: 'HEIC to JPG' },
];

const examTools = [
  { href: '/typing', label: 'Typing Practice' },
  { href: '/typing/dashboard/exams', label: 'SSC / Court Exam Typing' },
  { href: '/typing/dashboard/hindi', label: 'Hindi Typing Test' },
  { href: '/typing/dashboard/certificates', label: 'Typing Certificate' },
  { href: '/nda-age-calculator', label: 'NDA Age Calculator' },
  { href: '/ilovepdf-alternative', label: 'iLovePDF Alternative' },
];

const companyLinks = [
  { href: '/blog', label: 'Blog & Exam Guides' },
  { href: '/about', label: 'About Us' },
  { href: '/contact', label: 'Contact Us' },
];

const legalLinks = [
  { href: '/privacy-policy', label: 'Privacy Policy' },
  { href: '/terms', label: 'Terms & Conditions' },
  { href: '/disclaimer', label: 'Disclaimer' },
];

function LinkColumn({ title, links }) {
  return (
    <div>
      <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4">{title}</h3>
      <ul className="space-y-2 text-xs sm:text-sm">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="hover:text-white transition-colors">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  const [currentYear, setCurrentYear] = useState('2026');

  useEffect(() => {
    setCurrentYear(new Date().getFullYear().toString());
  }, []);

  return (
    <footer className="bg-slate-900 text-slate-400 py-12 pb-24 lg:pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-10">
          {/* Brand Info */}
          <div className="col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 flex items-center justify-center shrink-0">
                <svg viewBox="0 0 100 100" className="w-full h-full text-blue-500 fill-current" aria-hidden="true">
                  <circle cx="50" cy="50" r="44" fill="none" stroke="currentColor" strokeWidth="9" />
                  <text x="50" y="63" fontSize="42" fontWeight="900" fontFamily="sans-serif" textAnchor="middle" letterSpacing="-1">
                    GD
                  </text>
                </svg>
              </div>
              <span className="text-lg font-bold text-white tracking-tight">GD PDF Suite &amp; Typing Pro</span>
            </div>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Free PDF and image tools plus government exam typing practice. Everything
              runs in your browser — files are never uploaded to a server.
            </p>
            <ul className="space-y-2 text-xs sm:text-sm pt-1">
              <li className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-emerald-400 shrink-0" aria-hidden="true" />
                <span>100% client-side processing</span>
              </li>
              <li className="flex items-center space-x-2">
                <Zap className="w-4 h-4 text-blue-400 shrink-0" aria-hidden="true" />
                <span>No signup, no watermark</span>
              </li>
            </ul>
          </div>

          <LinkColumn title="PDF Tools" links={pdfTools} />
          <LinkColumn title="Image Tools" links={imageTools} />
          <LinkColumn title="Exam Tools" links={examTools} />
          <div className="space-y-8">
            <LinkColumn title="Company" links={companyLinks} />
            <LinkColumn title="Legal" links={legalLinks} />
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mb-8 pt-4 border-t border-slate-800 text-xs text-slate-400 leading-relaxed bg-slate-950/40 p-4 rounded-2xl border border-slate-800/60">
          <p>
            <strong className="text-slate-300">Disclaimer:</strong> GD PDF Suite &amp; Typing Pro
            is an independent practice platform. We are not affiliated with, endorsed by, or
            connected to UPSC, SSC, IBPS, RRB or any government body. Exam patterns are
            referenced for practice purposes only. Always verify size and format requirements
            in the current official notification before submitting a form.
          </p>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>© {currentYear} GD PDF Suite. All rights reserved.</p>
          <p>Built and maintained by GD Dream Career.</p>
        </div>
      </div>
    </footer>
  );
}