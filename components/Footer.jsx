'use client';

import React, { useState, useEffect } from 'react';
import { Shield, Heart, Zap } from 'lucide-react';

export default function Footer() {
  const [currentYear, setCurrentYear] = useState('2026');

  useEffect(() => {
    setCurrentYear(new Date().getFullYear().toString());
  }, []);

  return (
    <footer className="bg-slate-900 text-slate-400 py-12 pb-24 lg:pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              {/* Exact Same Deep Blue SVG Logo as Header */}
              <div className="w-10 h-10 flex items-center justify-center shrink-0">
                <svg viewBox="0 0 100 100" className="w-full h-full text-[#033B70] fill-current">
                  {/* Outer Circle Ring */}
                  <circle cx="50" cy="50" r="44" fill="none" stroke="currentColor" strokeWidth="9" />
                  {/* Inner GD Text */}
                  <text x="50" y="63" fontSize="42" fontWeight="900" fontFamily="sans-serif" textAnchor="middle" letterSpacing="-1">
                    GD
                  </text>
                </svg>
              </div>
              <div>
                <span className="text-lg font-bold text-white tracking-tight">GD PDF Suite</span>
                <span className="block text-[11px] text-blue-400 font-medium">by GD Dream Career</span>
              </div>
            </div>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              The ultimate 100% free client-side PDF utility suite. Convert pictures to PDF, compress files to target KB sizes, resize images, and merge documents directly in your browser without server uploads.
            </p>
          </div>

          {/* Quick Tools & Formats */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">PDF & Image Tools</h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li className="hover:text-white transition-colors cursor-pointer">Picture to PDF Converter</li>
              <li className="hover:text-white transition-colors cursor-pointer">Compress PDF to Target KB</li>
              <li className="hover:text-white transition-colors cursor-pointer">Custom Image Pixel Resizer</li>
              <li className="hover:text-white transition-colors cursor-pointer">JPG, PNG & WebP Batch Support</li>
            </ul>
          </div>

          {/* Privacy & Security */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Privacy & Security</h4>
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
          <p>© {currentYear} GD PDF Suite. Powered by GD Dream Career. All rights reserved.</p>
          <p className="flex items-center space-x-1.5 font-medium">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
            <span>for speed, privacy, and mobile users.</span>
          </p>
        </div>
      </div>
    </footer>
  );
}