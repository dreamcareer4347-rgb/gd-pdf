'use client';

import React from 'react';
import { ShieldCheck, Zap, ArrowRight, Lock } from 'lucide-react';

export default function HeroSection({ onGetStarted }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/50 via-white to-slate-50/50 py-12 sm:py-20 border-b border-slate-200/80">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 sm:space-y-8">
        
        {/* Top Branding Badge */}
        <div className="inline-flex items-center space-x-2 bg-blue-50 border border-blue-200/80 px-4 py-1.5 rounded-full text-blue-700 text-xs sm:text-sm font-extrabold shadow-2xs">
          <div className="w-5 h-5 flex items-center justify-center shrink-0">
            <svg viewBox="0 0 100 100" className="w-full h-full text-[#033B70] fill-current">
              <circle cx="50" cy="50" r="44" fill="none" stroke="currentColor" strokeWidth="10" />
              <text x="50" y="63" fontSize="42" fontWeight="900" fontFamily="sans-serif" textAnchor="middle" letterSpacing="-1">
                GD
              </text>
            </svg>
          </div>
          <span>GD PDF Suite</span>
        </div>

        {/* Main SEO Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-950 tracking-tight leading-[1.15]">
          Convert Pictures to PDF & <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
            Manage Documents Instantly
          </span>
        </h1>

        {/* Subheadline */}
        <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed font-medium">
          The ultimate 100% client-side PDF utility suite. Combine JPG, PNG, and WebP images, resize photos to exact KB sizes, and merge PDFs securely in your browser without any server uploads.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
          <button
            type="button"
            onClick={onGetStarted}
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-2xl bg-blue-600 text-white font-bold text-base shadow-lg shadow-blue-500/25 hover:bg-blue-700 active:scale-95 transition-all cursor-pointer"
          >
            <span>Start Converting Free</span>
            <ArrowRight className="w-5 h-5 ml-2" />
          </button>
          <a
            href="#how-it-works"
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-2xl bg-white border border-slate-300 text-slate-800 font-bold text-base hover:bg-slate-50 active:scale-95 transition-all cursor-pointer shadow-2xs"
          >
            How It Works
          </a>
        </div>

        {/* Trust Badges Bar */}
        <div className="pt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto border-t border-slate-200/60 mt-10">
          <div className="flex items-center justify-center space-x-2 text-xs sm:text-sm font-bold text-slate-700">
            <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0" />
            <span>100% Client-Side Privacy</span>
          </div>
          <div className="flex items-center justify-center space-x-2 text-xs sm:text-sm font-bold text-slate-700">
            <Lock className="w-5 h-5 text-blue-500 shrink-0" />
            <span>Zero Server Uploads</span>
          </div>
          <div className="flex items-center justify-center space-x-2 text-xs sm:text-sm font-bold text-slate-700">
            <Zap className="w-5 h-5 text-amber-500 shrink-0" />
            <span>Lightning Fast Speed</span>
          </div>
        </div>

      </div>
    </section>
  );
}