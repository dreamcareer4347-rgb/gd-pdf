'use client';

import React from 'react';
import { FileText, Layers, Minimize2, Maximize2, ShieldCheck } from 'lucide-react';

export default function Header({ activeTab = 'image-to-pdf', setActiveTab = () => {} }) {
  const navItems = [
    { id: 'image-to-pdf', label: 'To PDF', icon: FileText },
    { id: 'resize-image', label: 'Resize', icon: Maximize2 },
    { id: 'compress-pdf', label: 'Compress', icon: Minimize2 },
    { id: 'merge-pdf', label: 'Merge', icon: Layers },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Logo Area */}
          <div 
            onClick={() => setActiveTab('image-to-pdf')}
            className="flex items-center space-x-2.5 cursor-pointer group"
          >
            {/* Pure SVG GD Circle Logo (No blurry background issue) */}
            <div className="w-10 h-10 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <svg viewBox="0 0 100 100" className="w-full h-full text-[#033B70] fill-current">
                {/* Outer Ring */}
                <circle cx="50" cy="50" r="44" fill="none" stroke="currentColor" strokeWidth="9" />
                {/* GD Text */}
                <text x="50" y="63" fontSize="42" fontWeight="900" fontFamily="sans-serif" textAnchor="middle" letterSpacing="-1">
                  GD
                </text>
              </svg>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-xl font-extrabold tracking-tight text-slate-950">GD PDF</span>
              <span className="hidden sm:inline-block px-2.5 py-0.5 text-xs font-bold bg-blue-50 text-blue-700 rounded-full border border-blue-100">
                by GD Dream Career
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1 bg-slate-100 p-1 rounded-xl">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    isActive 
                      ? 'bg-white text-blue-600 shadow-xs' 
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          <div className="hidden sm:flex items-center space-x-1.5 text-xs text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100 font-semibold">
            <ShieldCheck className="w-4 h-4" />
            <span>100% Secure & Private</span>
          </div>

        </div>
      </header>

      {/* Mobile Bottom Navigation */}
      <nav aria-label="Mobile Bottom Navigation" className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-200 px-2 py-2 flex justify-around items-center shadow-lg">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center justify-center py-1.5 px-3 rounded-xl transition-all cursor-pointer ${
                isActive ? 'text-blue-600 font-bold scale-105' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Icon className="w-5 h-5 mb-0.5" />
              <span className="text-[10px] tracking-tight">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </>
  );
}