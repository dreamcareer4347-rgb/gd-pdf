'use client';

import React from 'react';
import { ShieldCheck, Zap, ArrowRight, Lock, Globe } from 'lucide-react';

export default function HeroSection({ onGetStarted }) {
  const countryUsageData = [
    { country: 'United States', code: 'USA', flagCode: 'us', usage: '38%', count: '1.2M+ Files' },
    { country: 'India', code: 'IND', flagCode: 'in', usage: '27%', count: '850K+ Exams' },
    { country: 'United Kingdom', code: 'GBR', flagCode: 'gb', usage: '14%', count: '420K+ Docs' },
    { country: 'Germany', code: 'DEU', flagCode: 'de', usage: '11%', count: '340K+ Docs' },
    { country: 'Canada', code: 'CAN', flagCode: 'ca', usage: '10%', count: '310K+ Docs' },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/60 via-white to-slate-50/50 py-12 sm:py-20 border-b border-slate-200/80">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 sm:space-y-10">
        
        {/* Top Legacy & Branding Badge */}
        <div className="inline-flex items-center space-x-2 bg-blue-100/80 border border-blue-200 px-4 py-1.5 rounded-full text-[#033B70] text-xs sm:text-sm font-black shadow-2xs">
          <div className="w-5 h-5 flex items-center justify-center shrink-0">
            <svg viewBox="0 0 100 100" className="w-full h-full text-[#033B70] fill-current">
              <circle cx="50" cy="50" r="44" fill="none" stroke="currentColor" strokeWidth="10" />
              <text x="50" y="63" fontSize="42" fontWeight="900" fontFamily="sans-serif" textAnchor="middle" letterSpacing="-1">
                GD
              </text>
            </svg>
          </div>
          <span>GD PDF Suite — Established 2024</span>
        </div>

        {/* Main SEO Headline */}
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-950 tracking-tight leading-[1.15]">
            Convert Pictures to PDF & <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#033B70] to-blue-600">
              Manage Documents Instantly
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed font-medium">
            The ultimate 100% client-side PDF utility suite. Combine JPG, PNG, and WebP images, resize photos to exact KB sizes, and merge PDFs securely in your browser without any server uploads[cite: 1].
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
          <button
            type="button"
            onClick={onGetStarted}
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-2xl bg-[#033B70] text-white font-black text-base shadow-lg shadow-blue-900/20 hover:bg-blue-900 active:scale-95 transition-all cursor-pointer group"
          >
            <span>Start Converting Free</span>
            <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
          </button>
          <a
            href="#how-it-works"
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-2xl bg-white border border-slate-300 text-[#033B70] font-bold text-base hover:bg-slate-50 active:scale-95 transition-all cursor-pointer shadow-xs"
          >
            How It Works
          </a>
        </div>

        {/* Trust Badges Bar — Strictly Blue & White Icons */}
        <div className="pt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto border-t border-slate-200/80">
          <div className="flex items-center justify-center space-x-2 text-xs sm:text-sm font-extrabold text-[#033B70]">
            <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0" />
            <span>100% Client-Side Privacy[cite: 1]</span>
          </div>
          <div className="flex items-center justify-center space-x-2 text-xs sm:text-sm font-extrabold text-[#033B70]">
            <Lock className="w-5 h-5 text-blue-600 shrink-0" />
            <span>Zero Server Uploads[cite: 1]</span>
          </div>
          <div className="flex items-center justify-center space-x-2 text-xs sm:text-sm font-extrabold text-[#033B70]">
            <Zap className="w-5 h-5 text-blue-600 shrink-0" />
            <span>Lightning Fast Speed</span>
          </div>
        </div>

        {/* Global Usage & Top Countries embedded inside Hero for instant legacy feel */}
        <div className="pt-8 space-y-6">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-[#033B70] text-xs font-black px-3.5 py-1.5 rounded-full uppercase tracking-wider border border-blue-100">
            <Globe className="w-4 h-4 text-blue-600" />
            <span>Global Privacy & Legacy Benchmark</span>
          </div>

          {/* Country Stats Grid with Real Flag Images */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 pt-2 text-left">
            {countryUsageData.map((item, idx) => (
              <div 
                key={idx} 
                className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs text-center space-y-2.5 hover:border-blue-500 hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="flex justify-center mb-1">
                  <img 
                    src={`https://flagcdn.com/w80/${item.flagCode}.png`} 
                    alt={item.country} 
                    className="w-12 h-8 object-cover rounded-md shadow-xs border border-slate-100"
                  />
                </div>
                <div>
                  <h4 className="font-extrabold text-slate-900 text-xs sm:text-sm">{item.country}</h4>
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{item.code}</span>
                </div>
                <div className="text-blue-600 font-black text-xl">{item.usage}</div>
                <div className="text-[10px] text-slate-600 font-semibold bg-blue-50 py-0.5 px-2 rounded-md border border-blue-100">
                  {item.count}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}