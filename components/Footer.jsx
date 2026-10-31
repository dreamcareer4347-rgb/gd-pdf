'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Shield, Heart, Zap } from 'lucide-react';

export default function Footer() {
  const [currentYear, setCurrentYear] = useState('2026');

  useEffect(() => {
    setCurrentYear(new Date().getFullYear().toString());
  }, []);

  return (
    <footer className="bg-slate-900 text-slate-400 py-12 pb-24 lg:pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Comprehensive SEO Informational Section for the Entire Suite */}
        <div className="mb-12 pb-8 border-b border-slate-800 space-y-3">
          <h2 className="text-sm font-extrabold text-white uppercase tracking-wider">About GD PDF Suite & Typing Pro — Free Online Document & Exam Tools</h2>
          <p className="text-xs leading-relaxed text-slate-400">
            GD PDF Suite is your all-in-one, 100% free browser-based utility platform designed for fast document management and government exam touch typing practice. Whether you need to convert pictures to PDF, compress PDF files to specific KB limits, resize images for government exam forms (UPSC, SSC, banking), calculate exact NDA exam age eligibility, or master touch typing with GD Typing Pro Suite—everything runs completely client-side on your device with absolute privacy and zero server uploads.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              {/* Circular SVG Logo */}
              <div className="w-10 h-10 flex items-center justify-center shrink-0">
                <svg viewBox="0 0 100 100" className="w-full h-full text-blue-500 fill-current">
                  {/* Outer Ring */}
                  <circle cx="50" cy="50" r="44" fill="none" stroke="currentColor" strokeWidth="9" />
                  {/* GD Text */}
                  <text x="50" y="63" fontSize="42" fontWeight="900" fontFamily="sans-serif" textAnchor="middle" letterSpacing="-1">
                    GD
                  </text>
                </svg>
              </div>
              <div>
                <span className="text-lg font-bold text-white tracking-tight">GD PDF Suite & Typing Pro</span>
              </div>
            </div>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              The ultimate 100% free client-side PDF utility and government exam touch typing master platform. Process documents and practice speed safely in your browser.
            </p>
          </div>

          {/* Quick Tools & Formats */}
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Quick Links</h3>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link href="/" className="hover:text-white transition-colors">Home & PDF Tools</Link>
              </li>
              <li>
                <Link href="/typing" className="hover:text-white transition-colors">GD Typing Pro Suite</Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-white transition-colors">Blog & Exam Guides</Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link>
              </li>
              <li>
                <Link href="/disclaimer" className="hover:text-white transition-colors">Disclaimer</Link>
              </li>
            </ul>
          </div>

          {/* Privacy & Security */}
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Privacy & Security</h3>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>100% Client-Side Processing</span>
              </li>
              <li className="flex items-center space-x-2">
                <Zap className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Zero Server File Uploads</span>
              </li>
              <li>No Registration or Signup Required</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 space-y-3 sm:space-y-0">
          <p>© {currentYear} GD PDF Suite. All rights reserved.</p>
          <div className="flex items-center gap-4 sm:gap-6 flex-wrap justify-center">
            <Link href="/blog" className="hover:text-slate-300 transition-colors">Blog</Link>
            <Link href="/privacy-policy" className="hover:text-slate-300 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-slate-300 transition-colors">Terms</Link>
            <Link href="/disclaimer" className="hover:text-slate-300 transition-colors">Disclaimer</Link>
          </div>
          <p className="flex items-center space-x-1.5 font-medium">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
            <span>for speed and privacy.</span>
          </p>
        </div>
      </div>
    </footer>
  );
}