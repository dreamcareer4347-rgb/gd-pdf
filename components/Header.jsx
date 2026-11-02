'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  FileText,
  Layers,
  Minimize2,
  Maximize2,
  ShieldCheck,
  FileSpreadsheet,
  Code,
  FileImage,
  Sliders,
  Calculator,
  Type,
  PenTool,
  Ruler,
  UserCheck,
  Smartphone,
  ChevronDown,
  Menu,
  X,
  Keyboard,
} from 'lucide-react';

export default function Header() {
  const pathname = usePathname();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeAll = () => {
    setDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  const primaryNav = [
    { href: '/image-to-pdf', label: 'To PDF', icon: FileText },
    { href: '/compress-pdf', label: 'Compress', icon: Minimize2 },
    { href: '/merge-pdf', label: 'Merge', icon: Layers },
    { href: '/resize-image', label: 'Resize', icon: Maximize2 },
    { href: '/typing', label: 'Typing Pro', icon: Keyboard },
  ];

  const quickMobileTools = [
    { href: '/image-to-pdf', label: 'Image to PDF', icon: FileText },
    { href: '/compress-pdf', label: 'Compress PDF', icon: Minimize2 },
    { href: '/merge-pdf', label: 'Merge PDF', icon: Layers },
    { href: '/typing', label: 'Typing Pro', icon: Keyboard },
    { href: '/passport-photo-maker', label: 'Passport Photo', icon: UserCheck },
    { href: '/name-dob-photo', label: 'Name & DOB', icon: Type },
    { href: '/nda-age-calculator', label: 'Age Calc', icon: Calculator },
    { href: '/signature-6x2-cm', label: 'Signature 6x2', icon: Ruler },
    { href: '/iphone-photo-converter', label: 'HEIC to JPG', icon: Smartphone },
  ];

  const pdfTools = [
    { href: '/image-to-pdf', label: 'Image to PDF', icon: FileText },
    { href: '/compress-pdf', label: 'Compress PDF', icon: Minimize2 },
    { href: '/compress-pdf-100kb', label: 'Compress to 100KB', icon: Minimize2 },
    { href: '/compress-pdf-200kb', label: 'Compress to 200KB', icon: Minimize2 },
    { href: '/merge-pdf', label: 'Merge PDF', icon: Layers },
    { href: '/ilovepdf-alternative', label: 'iLovePDF Alternative', icon: ShieldCheck },
  ];

  const imageTools = [
    { href: '/resize-image', label: 'Resize Image', icon: Maximize2 },
    { href: '/resize-image-for-form', label: 'Resize for Exam Form', icon: Sliders },
    { href: '/iphone-photo-converter', label: 'iPhone HEIC to JPG', icon: Smartphone },
    { href: '/passport-photo-maker', label: 'Passport Photo Sheet', icon: UserCheck },
  ];

  const examTools = [
    { href: '/typing', label: 'GD Typing Pro Suite', icon: Keyboard },
    { href: '/name-dob-photo', label: 'Add Name & DOB on Photo', icon: Type },
    { href: '/signature-6x2-cm', label: 'Signature 6x2 cm Resizer', icon: Ruler },
    { href: '/nda-age-calculator', label: 'NDA Age Calculator', icon: Calculator },
  ];

  const homepageSections = [
    { href: '/#word-to-pdf', label: 'Word to PDF', icon: FileText },
    { href: '/#excel-to-pdf', label: 'Excel to PDF', icon: FileSpreadsheet },
    { href: '/#html-to-pdf', label: 'HTML to PDF', icon: Code },
    { href: '/#pdf-to-jpg', label: 'PDF to JPG', icon: FileImage },
    { href: '/#pdf-to-word', label: 'PDF to Word', icon: FileText },
    { href: '/#custom-exam-resizer', label: 'SSC/NEET Resizer', icon: Sliders },
    { href: '/#generate-sign', label: 'Signature Pad', icon: PenTool },
  ];

  const isActive = (href) => pathname === href;

  const MenuLink = ({ item, onNavigate, truncate = false }) => (
    <Link
      href={item.href}
      onClick={onNavigate}
      className="w-full flex items-center space-x-2 text-left px-2.5 py-2 rounded-lg text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
    >
      <item.icon className="w-4 h-4 text-blue-600 shrink-0" />
      <span className={truncate ? 'truncate' : ''}>{item.label}</span>
    </Link>
  );

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" onClick={closeAll} className="flex items-center space-x-2.5 cursor-pointer group shrink-0">
            <div className="w-10 h-10 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <svg viewBox="0 0 100 100" className="w-full h-full text-[#033B70] fill-current" aria-hidden="true">
                <circle cx="50" cy="50" r="44" fill="none" stroke="currentColor" strokeWidth="9" />
                <text x="50" y="63" fontSize="42" fontWeight="900" fontFamily="sans-serif" textAnchor="middle" letterSpacing="-1">
                  GD
                </text>
              </svg>
            </div>
            <span className="text-xl font-extrabold tracking-tight text-slate-950">GD PDF</span>
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden xl:flex items-center space-x-1 bg-slate-100 p-1 rounded-xl" aria-label="Main">
            {primaryNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  isActive(item.href)
                    ? 'bg-white text-blue-600 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                }`}
              >
                <item.icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </Link>
            ))}

            {/* Mega menu */}
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                aria-expanded={dropdownOpen}
                aria-haspopup="true"
                className="flex items-center space-x-1 px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap text-slate-700 hover:text-slate-900 hover:bg-white/50 bg-white shadow-xs"
              >
                <span>All Tools Menu</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-[880px] bg-white border border-slate-200 rounded-2xl shadow-2xl p-6 grid grid-cols-4 gap-6 z-50">
                  <div className="space-y-3">
                    <p className="text-[11px] font-black uppercase text-[#033B70] tracking-wider">PDF Tools</p>
                    <div className="space-y-1">
                      {pdfTools.map((item) => (
                        <MenuLink key={item.href} item={item} onNavigate={closeAll} truncate />
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <p className="text-[11px] font-black uppercase text-[#033B70] tracking-wider">Image Tools</p>
                    <div className="space-y-1">
                      {imageTools.map((item) => (
                        <MenuLink key={item.href} item={item} onNavigate={closeAll} truncate />
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <p className="text-[11px] font-black uppercase text-[#033B70] tracking-wider">Govt Exam Tools</p>
                    <div className="space-y-1">
                      {examTools.map((item) => (
                        <MenuLink key={item.href} item={item} onNavigate={closeAll} truncate />
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <p className="text-[11px] font-black uppercase text-[#033B70] tracking-wider">
                      On the home page
                    </p>
                    <div className="space-y-1">
                      {homepageSections.map((item) => (
                        <MenuLink key={item.href} item={item} onNavigate={closeAll} truncate />
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </nav>

          <div className="hidden sm:flex items-center space-x-1.5 text-xs text-[#033B70] bg-blue-50 px-3 py-1.5 rounded-full border border-blue-100 font-bold shrink-0">
            <ShieldCheck className="w-4 h-4 text-blue-600" aria-hidden="true" />
            <span>100% Secure</span>
          </div>

          {/* Mobile toggle */}
          <div className="xl:hidden flex items-center space-x-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              className="flex items-center space-x-1.5 px-3.5 py-2 bg-[#033B70] text-white hover:bg-blue-900 rounded-xl font-bold text-xs transition-all cursor-pointer shadow-sm"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              <span>{mobileMenuOpen ? 'Close' : 'All Tools'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile quick bar */}
      <div className="xl:hidden bg-slate-50 border-b border-slate-200 px-3 py-2.5 overflow-x-auto flex space-x-2 scrollbar-none shrink-0">
        {quickMobileTools.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap shadow-xs transition-all cursor-pointer shrink-0 bg-white text-slate-700 border border-slate-200 hover:bg-blue-50 hover:text-blue-600"
          >
            <item.icon className="w-3.5 h-3.5 text-blue-600 shrink-0" />
            <span>{item.label}</span>
          </Link>
        ))}
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden fixed inset-x-0 top-28 bg-white border-b border-slate-200 shadow-2xl py-6 px-5 space-y-6 z-50 max-h-[75vh] overflow-y-auto">
          <div className="space-y-2">
            <p className="text-[11px] font-black uppercase text-[#033B70] tracking-wider">PDF Tools</p>
            <div className="grid grid-cols-2 gap-2">
              {pdfTools.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeAll}
                  className="flex items-center space-x-2 px-3 py-2 rounded-xl text-xs font-bold bg-slate-50 text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-all cursor-pointer border border-slate-100"
                >
                  <item.icon className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <span className="truncate">{item.label}</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-[11px] font-black uppercase text-[#033B70] tracking-wider">Image Tools</p>
            <div className="grid grid-cols-2 gap-2">
              {imageTools.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeAll}
                  className="flex items-center space-x-2 px-3 py-2 rounded-xl text-xs font-bold bg-slate-50 text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-all cursor-pointer border border-slate-100"
                >
                  <item.icon className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <span className="truncate">{item.label}</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-[11px] font-black uppercase text-[#033B70] tracking-wider">Govt Exam Tools</p>
            <div className="grid grid-cols-1 gap-2">
              {examTools.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeAll}
                  className="flex items-center space-x-2.5 px-3 py-2.5 rounded-xl text-xs font-bold bg-slate-50 text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-all cursor-pointer border border-slate-100"
                >
                  <item.icon className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-[11px] font-black uppercase text-[#033B70] tracking-wider">On the home page</p>
            <div className="grid grid-cols-2 gap-2">
              {homepageSections.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeAll}
                  className="flex items-center space-x-2 px-3 py-2 rounded-xl text-xs font-bold bg-slate-50 text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-all cursor-pointer border border-slate-100"
                >
                  <item.icon className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <span className="truncate">{item.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}