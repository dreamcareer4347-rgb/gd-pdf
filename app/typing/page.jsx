'use client';

import Link from 'next/link';

const TRUSTED_ORGS = [
  "Rajasthan High Court",
  "SSC CGL Typing Standard",
  "IBPS Clerk Exam",
  "Railway Recruitment Board",
  "Sonma Typing Simulator",
  "Civil Courts Board",
  "State Stenographer Exam",
  "Central Secretariat Typing"
];

const POPULAR_COUNTRIES = [
  { name: "India", share: "40% Usage", flag: "https://flagcdn.com/in.svg" },
  { name: "United States", share: "30% Reach", flag: "https://flagcdn.com/us.svg" },
  { name: "United Kingdom", share: "10% Reach", flag: "https://flagcdn.com/gb.svg" },
  { name: "Canada", share: "8% Reach", flag: "https://flagcdn.com/ca.svg" },
  { name: "Australia", share: "7% Reach", flag: "https://flagcdn.com/au.svg" },
  { name: "Germany", share: "5% Global", flag: "https://flagcdn.com/de.svg" }
];

export default function TypingLandingPage() {
  return (
    <div className="relative min-h-screen bg-slate-950 text-white overflow-hidden flex flex-col justify-between font-sans selection:bg-blue-600 selection:text-white">
      
      {/* Background Glow Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-950/40 via-slate-950 to-black z-0"></div>
      <div className="absolute top-16 left-20 w-72 h-72 bg-blue-600/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute right-20 bottom-32 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none"></div>

      {/* Header / Navbar */}
      <header className="relative z-10 max-w-7xl mx-auto w-full px-6 py-6 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <img 
            src="/gd-logo.png" 
            alt="GD Typing Logo" 
            className="w-11 h-11 object-contain rounded-2xl shadow-md border border-white/10 bg-white/5 p-0.5 backdrop-blur-md"
          />
          <div>
            <span className="text-lg font-black tracking-tight text-white block leading-none">
              GD Typing
            </span>
            <span className="text-[10px] font-mono font-bold text-blue-400 tracking-widest uppercase mt-0.5 block">
              Pro Suite
            </span>
          </div>
        </div>
        
        <div className="flex items-center gap-6 text-sm font-bold text-slate-300">
          <Link href="/" className="hover:text-white transition hidden md:block">← PDF Tools Hub</Link>
          <Link 
            href="/typing/dashboard" 
            className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-2xl transition shadow-lg shadow-blue-600/30 text-xs uppercase tracking-wider"
          >
            Get Started 🚀
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 max-w-4xl mx-auto text-center px-4 py-12 my-auto">
        <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-400/30 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-mono font-bold tracking-wider text-blue-300 uppercase shadow-sm mb-6 animate-pulse">
          <span>⚡</span> Official Touch Typing & Govt Exam Master
        </div>

        <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6 leading-tight">
          Master Touch Typing <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-white">
            For Free & Government Exams!
          </span>
        </h1>
        
        <p className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto mb-10 font-normal leading-relaxed">
          Master English & Hindi typing with official exam-grade passages, dynamic keyboard helpers, and earn verified GD tier certificates worldwide.
        </p>

        <div className="flex justify-center gap-4 mb-14">
          <Link
            href="/typing/dashboard"
            className="bg-blue-600 hover:bg-blue-500 text-white font-extrabold px-9 py-4 rounded-2xl transition-all shadow-xl shadow-blue-600/40 text-sm tracking-wide flex items-center gap-3 transform hover:-translate-y-0.5"
          >
            <span>Start Learning Now</span>
            <span className="text-base">→</span>
          </Link>
        </div>

        {/* Popular Countries Flag Grid */}
        <div className="max-w-3xl mx-auto bg-slate-900/60 border border-slate-800/80 p-6 rounded-3xl backdrop-blur-md shadow-2xl">
          <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-widest block mb-4">
            🌍 Global Reach & Popular Country Usage
          </span>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {POPULAR_COUNTRIES.map((country, idx) => (
              <div key={idx} className="bg-slate-950/80 border border-slate-800 p-3.5 rounded-2xl flex items-center gap-3 shadow-inner hover:border-blue-500/50 transition">
                <img src={country.flag} alt={`${country.name} Flag`} className="w-8 h-6 object-cover rounded shadow-xs shrink-0" />
                <div className="text-left">
                  <span className="block text-xs font-bold text-white leading-tight">{country.name}</span>
                  <span className="text-[10px] font-mono text-blue-400 font-semibold">{country.share}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </main>

      {/* Animated Trusted Exams & Organizations Ticker Strip */}
      <div className="relative z-10 w-full bg-slate-900/60 border-t border-b border-slate-800/80 py-5 backdrop-blur-md overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-3 text-center">
          <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">
            Trusted By Government Exam Boards & Typing Academies
          </span>
        </div>

        <div className="flex overflow-x-hidden relative w-full">
          <div className="flex animate-marquee whitespace-nowrap gap-8 items-center">
            {TRUSTED_ORGS.concat(TRUSTED_ORGS).map((org, index) => (
              <div 
                key={index}
                className="inline-flex items-center gap-2.5 bg-slate-950/80 border border-blue-500/30 px-5 py-2.5 rounded-2xl text-xs font-mono font-bold text-slate-200 shadow-sm hover:border-blue-400 hover:text-white transition cursor-default shrink-0 shadow-inner"
              >
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping"></span>
                <span>{org}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 text-center py-6 text-xs text-slate-500 border-t border-slate-900 font-mono flex flex-col md:flex-row justify-between items-center px-6 max-w-7xl mx-auto w-full">
        <span>© 2026 GD PDF Suite & Typing Master. All rights reserved.</span>
        <span className="text-blue-400 font-bold">Secure SSL Encrypted Environment</span>
      </div>

      {/* Custom Marquee CSS Animation */}
      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          width: max-content;
          animation: marquee 25s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>

    </div>
  );
}