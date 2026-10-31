'use client';

import Link from 'next/link';
import { Zap, Target, BookOpen, Gamepad2, ArrowRight, Award, TrendingUp, ShieldCheck, Globe } from 'lucide-react';

export default function TypingDashboardHome() {
  return (
    <div className="space-y-10 animate-fade-in font-sans pb-16 bg-white text-slate-900">
      
      {/* ULTRA-PRO HERO BANNER (Matched with GD Logo Color Theme #0B2545) */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#0B2545] via-[#134074] to-slate-900 rounded-3xl p-8 md:p-14 text-white shadow-2xl border border-blue-900/40">
        <div className="absolute -right-16 -top-16 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute left-1/4 -bottom-20 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-mono font-bold tracking-wider text-blue-200 uppercase shadow-sm mb-6">
            <ShieldCheck className="w-4 h-4 text-blue-300" />
            <span>GD Typing Pro Suite • Enterprise Platform</span>
          </div>
          
          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white leading-tight mb-6">
            Master Touch Typing & <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-sky-300 to-white">Crack Govt Exams</span>
          </h1>
          
          <p className="text-slate-200 text-base md:text-lg font-normal leading-relaxed mb-8 max-w-2xl">
            Official <strong className="text-white font-bold">SSC CGL/CHSL</strong>, <strong className="text-white font-bold">High Court Steno</strong>, and <strong className="text-white font-bold">RRB NTPC</strong> exam-grade passages powered by <strong className="text-white font-bold">GD Typing Pro Suite</strong>. Build high speed with 20 touch typing lessons and interactive arcade games.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Link 
              href="/typing/dashboard/practice"
              className="bg-white text-[#0B2545] hover:bg-blue-50 font-extrabold px-8 py-4 rounded-2xl transition-all shadow-xl text-sm tracking-wide flex items-center gap-3 transform hover:-translate-y-0.5"
            >
              <span>Start Touch Course</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            
            <Link 
              href="/typing/dashboard/exams"
              className="bg-blue-900/40 hover:bg-blue-900/60 text-white font-bold px-8 py-4 rounded-2xl transition border border-white/20 text-sm backdrop-blur-md flex items-center gap-2 shadow-sm"
            >
              <Target className="w-4 h-4 text-blue-300" />
              <span>Govt Exam Hub</span>
            </Link>
          </div>
        </div>
      </div>

      {/* METRICS STATS GRID WITH ORIGINAL SVG FLAGS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {/* India */}
        <div className="bg-slate-50/80 p-6 rounded-3xl border border-slate-200/80 shadow-xs hover:shadow-md transition flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-blue-50/80 border border-blue-100 flex items-center justify-center shadow-inner overflow-hidden">
            <img 
              src="https://flagcdn.com/in.svg" 
              alt="India Flag" 
              className="w-10 h-7 object-cover rounded-md shadow-xs" 
            />
          </div>
          <div>
            <span className="block text-[11px] text-slate-500 font-extrabold uppercase tracking-wider">India Usage</span>
            <span className="text-2xl font-black text-slate-900">40% Share</span>
          </div>
        </div>

        {/* USA */}
        <div className="bg-slate-50/80 p-6 rounded-3xl border border-slate-200/80 shadow-xs hover:shadow-md transition flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-blue-50/80 border border-blue-100 flex items-center justify-center shadow-inner overflow-hidden">
            <img 
              src="https://flagcdn.com/us.svg" 
              alt="USA Flag" 
              className="w-10 h-7 object-cover rounded-md shadow-xs" 
            />
          </div>
          <div>
            <span className="block text-[11px] text-slate-500 font-extrabold uppercase tracking-wider">USA Usage</span>
            <span className="text-2xl font-black text-slate-900">30% Reach</span>
          </div>
        </div>

        {/* World / Other Nations */}
        <div className="bg-slate-50/80 p-6 rounded-3xl border border-slate-200/80 shadow-xs hover:shadow-md transition flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-blue-50/80 border border-blue-100 flex items-center justify-center shadow-inner overflow-hidden text-2xl">
            🌍
          </div>
          <div>
            <span className="block text-[11px] text-slate-500 font-extrabold uppercase tracking-wider">Other Nations</span>
            <span className="text-2xl font-black text-slate-900">30% Global</span>
          </div>
        </div>

        {/* Global Leader */}
        <div className="bg-slate-50/80 p-6 rounded-3xl border border-slate-200/80 shadow-xs hover:shadow-md transition flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-blue-50 text-[#134074] border border-blue-100 flex items-center justify-center shadow-inner">
            <Globe className="w-7 h-7 text-[#134074]" />
          </div>
          <div>
            <span className="block text-[11px] text-slate-500 font-extrabold uppercase tracking-wider">Platform Status</span>
            <span className="text-2xl font-black text-slate-900">Global Leader</span>
          </div>
        </div>
      </div>

      {/* SECTION HEADER */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            Explore GD Typing Pro Training Modules
          </h2>
          <p className="text-slate-500 text-xs md:text-sm font-medium mt-1">
            Select your target module to start speed training and evaluation.
          </p>
        </div>
        <span className="text-xs font-extrabold text-[#134074] bg-blue-50 border border-blue-200 px-3.5 py-1.5 rounded-full uppercase tracking-wider">
          3 Portals Active
        </span>
      </div>

      {/* FEATURE CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Module 1 */}
        <Link 
          href="/typing/dashboard/practice"
          className="group bg-slate-50/60 p-8 rounded-3xl border border-slate-200 shadow-xs hover:shadow-xl hover:border-[#134074] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
        >
          <div>
            <div className="w-14 h-14 rounded-2xl bg-blue-50 text-[#134074] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-inner">
              <BookOpen className="w-7 h-7" />
            </div>
            <span className="text-[11px] font-black text-[#134074] bg-blue-50 border border-blue-200 px-3 py-1 rounded-full uppercase tracking-wider">
              20 Lessons
            </span>
            <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-[#134074] transition mt-4 mb-3">
              Touch Typing Course
            </h3>
            <p className="text-slate-600 text-xs md:text-sm leading-relaxed mb-8">
              Home row, top/bottom rows, shift key mastery, and 3 auto-progressing paragraphs per lesson with live WPM tracking.
            </p>
          </div>

          <div className="flex items-center justify-between pt-5 border-t border-slate-200 text-xs font-extrabold text-[#134074]">
            <span>Open Touch Course</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
          </div>
        </Link>

        {/* Module 2 */}
        <Link 
          href="/typing/dashboard/exams"
          className="group bg-slate-50/60 p-8 rounded-3xl border border-slate-200 shadow-xs hover:shadow-xl hover:border-[#134074] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
        >
          <div>
            <div className="w-14 h-14 rounded-2xl bg-blue-50 text-[#134074] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-inner">
              <Target className="w-7 h-7" />
            </div>
            <span className="text-[11px] font-black text-[#134074] bg-blue-50 border border-blue-200 px-3 py-1 rounded-full uppercase tracking-wider">
              Exam Simulation
            </span>
            <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-[#134074] transition mt-4 mb-3">
              Govt Exams Practice Hub
            </h3>
            <p className="text-slate-600 text-xs md:text-sm leading-relaxed mb-8">
              Official passages for SSC CGL/CHSL, High Court Steno, RRB NTPC, and State Patwari tests with strict timer.
            </p>
          </div>

          <div className="flex items-center justify-between pt-5 border-t border-slate-200 text-xs font-extrabold text-[#134074]">
            <span>Start Exam Practice</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
          </div>
        </Link>

        {/* Module 3 */}
        <Link 
          href="/typing/dashboard/games"
          className="group bg-slate-50/60 p-8 rounded-3xl border border-slate-200 shadow-xs hover:shadow-xl hover:border-[#134074] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
        >
          <div>
            <div className="w-14 h-14 rounded-2xl bg-blue-50 text-[#134074] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-inner">
              <Gamepad2 className="w-7 h-7" />
            </div>
            <span className="text-[11px] font-black text-[#134074] bg-blue-50 border border-blue-200 px-3 py-1 rounded-full uppercase tracking-wider">
              Arcade Suite
            </span>
            <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-[#134074] transition mt-4 mb-3">
              Pro Typing Games
            </h3>
            <p className="text-slate-600 text-xs md:text-sm leading-relaxed mb-8">
              Cyber Rain, Lava Burst, Zombie Defense, and Love Kiss Challenge with particle explosions and audio effects.
            </p>
          </div>

          <div className="flex items-center justify-between pt-5 border-t border-slate-200 text-xs font-extrabold text-[#134074]">
            <span>Play Pro Arcade</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
          </div>
        </Link>

      </div>

    </div>
  );
}