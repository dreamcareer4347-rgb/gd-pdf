'use client';

import React, { useState, useEffect } from 'react';
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
  Menu
} from 'lucide-react';

export default function Header() {
  const pathname = usePathname();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentHash, setCurrentHash] = useState('');

  useEffect(() => {
    setCurrentHash(window.location.hash);
    const handleHashChange = () => {
      setCurrentHash(window.location.hash);
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleTabClick = (hash) => {
    setDropdownOpen(false);
    setMobileMenuOpen(false);
    if (pathname === '/') {
      window.location.hash = hash;
      setCurrentHash(`#${hash}`);
    }
  };

  const primaryNav = [
    { href: '/', label: 'To PDF', icon: FileText, hash: 'image-to-pdf' },
    { href: '/#word-to-pdf', label: 'Word to PDF', icon: FileText, hash: 'word-to-pdf' },
    { href: '/#excel-to-pdf', label: 'Excel to PDF', icon: FileSpreadsheet, hash: 'excel-to-pdf' },
    { href: '/#resize-image', label: 'Resize', icon: Maximize2, hash: 'resize-image' },
    { href: '/#compress-pdf', label: 'Compress', icon: Minimize2, hash: 'compress-pdf' },
    { href: '/#merge-pdf', label: 'Merge', icon: Layers, hash: 'merge-pdf' },
  ];

  const quickMobileTools = [
    { href: '/', label: 'To PDF', icon: FileText, hash: 'image-to-pdf' },
    { href: '/#word-to-pdf', label: 'Word to PDF', icon: FileText, hash: 'word-to-pdf' },
    { href: '/#resize-image', label: 'Resize', icon: Maximize2, hash: 'resize-image' },
    { href: '/#compress-pdf', label: 'Compress', icon: Minimize2, hash: 'compress-pdf' },
    { href: '/#merge-pdf', label: 'Merge', icon: Layers, hash: 'merge-pdf' },
    { href: '/iphone-photo-converter', label: 'HEIC to JPG', icon: Smartphone },
    { href: '/passport-photo-maker', label: 'Passport Photo', icon: UserCheck },
    { href: '/name-dob-photo', label: 'Name & DOB', icon: Type },
    { href: '/nda-age-calculator', label: 'Age Calc', icon: Calculator },
    { href: '/signature-6x2-cm', label: 'Signature 6x2', icon: Ruler },
  ];

  const convertToPdfTools = [
    { href: '/#word-to-pdf', label: 'Word to PDF', icon: FileText, hash: 'word-to-pdf' },
    { href: '/#excel-to-pdf', label: 'Excel to PDF', icon: FileSpreadsheet, hash: 'excel-to-pdf' },
    { href: '/#html-to-pdf', label: 'HTML to PDF', icon: Code, hash: 'html-to-pdf' },
  ];

  const convertFromPdfTools = [
    { href: '/#pdf-to-jpg', label: 'PDF to JPG', icon: FileImage, hash: 'pdf-to-jpg' },
    { href: '/#pdf-to-word', label: 'PDF to WORD', icon: FileText, hash: 'pdf-to-word' },
    { href: '/#pdf-to-pdfa', label: 'PDF to PDF/A', icon: ShieldCheck, hash: 'pdf-to-pdfa' },
  ];

  const examPhotoTools = [
    { href: '/name-dob-photo', label: 'Add Name & DOB on Photo', icon: Type },
    { href: '/passport-photo-maker', label: 'Passport Photo Maker & 4x6', icon: UserCheck },
    { href: '/signature-6x2-cm', label: 'Signature 6×2 cm Resizer', icon: Ruler },
    { href: '/nda-age-calculator', label: 'NDA Age Calculator', icon: Calculator },
    { href: '/#custom-exam-resizer', label: 'SSC/NEET Exam Resizer', icon: Sliders, hash: 'custom-exam-resizer' },
    { href: '/#generate-sign', label: 'Generate Signature Pad', icon: PenTool, hash: 'generate-sign' },
  ];

  const imageTools = [
    { href: '/iphone-photo-converter', label: 'iPhone HEIC to JPG', icon: Smartphone },
    { href: '/#image-to-jpg', label: 'Image to JPG', icon: FileImage, hash: 'image-to-jpg' },
    { href: '/#merge-images', label: 'Merge Images', icon: Layers, hash: 'merge-images' },
    { href: '/#ecommerce-resizer', label: 'E-Commerce Resizer', icon: Maximize2, hash: 'ecommerce-resizer' },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Logo */}
          <Link href="/" onClick={() => handleTabClick('image-to-pdf')} className="flex items-center space-x-2.5 cursor-pointer group shrink-0">
            <div className="w-10 h-10 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <svg viewBox="0 0 100 100" className="w-full h-full text-[#033B70] fill-current">
                <circle cx="50" cy="50" r="44" fill="none" stroke="currentColor" strokeWidth="9" />
                <text x="50" y="63" fontSize="42" fontWeight="900" fontFamily="sans-serif" textAnchor="middle" letterSpacing="-1">
                  GD
                </text>
              </svg>
            </div>
            <span className="text-xl font-extrabold tracking-tight text-slate-950">GD PDF</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center space-x-1 bg-slate-100 p-1 rounded-xl">
            {primaryNav.map((item) => {
              const isActive = pathname === item.href && ((!item.hash && !currentHash) || currentHash === `#${item.hash}`);
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => item.hash && handleTabClick(item.hash)}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                    isActive ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                  }`}
                >
                  <item.icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}

            {/* Categorized 4-Column Mega Menu Dropdown */}
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center space-x-1 px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap text-slate-700 hover:text-slate-900 hover:bg-white/50 bg-white shadow-xs"
              >
                <span>All Tools Menu</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-[920px] bg-white border border-slate-200 rounded-2xl shadow-2xl p-6 grid grid-cols-4 gap-6 z-50">
                  
                  {/* Column 1: Convert to PDF */}
                  <div className="space-y-3">
                    <p className="text-[11px] font-black uppercase text-blue-600 tracking-wider">Convert to PDF</p>
                    <div className="space-y-1">
                      {convertToPdfTools.map((item) => (
                        <Link
                          key={item.label}
                          href={item.href}
                          onClick={() => item.hash && handleTabClick(item.hash)}
                          className="w-full flex items-center space-x-2 text-left px-2.5 py-2 rounded-lg text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
                        >
                          <item.icon className="w-4 h-4 text-blue-600 shrink-0" />
                          <span>{item.label}</span>
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Column 2: Convert from PDF */}
                  <div className="space-y-3">
                    <p className="text-[11px] font-black uppercase text-blue-600 tracking-wider">Convert from PDF</p>
                    <div className="space-y-1">
                      {convertFromPdfTools.map((item) => (
                        <Link
                          key={item.label}
                          href={item.href}
                          onClick={() => item.hash && handleTabClick(item.hash)}
                          className="w-full flex items-center space-x-2 text-left px-2.5 py-2 rounded-lg text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
                        >
                          <item.icon className="w-4 h-4 text-blue-600 shrink-0" />
                          <span>{item.label}</span>
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Column 3: Govt Exam & Photo Tools */}
                  <div className="space-y-3">
                    <p className="text-[11px] font-black uppercase text-blue-600 tracking-wider">Govt Exam & Photos</p>
                    <div className="space-y-1">
                      {examPhotoTools.map((item) => (
                        <Link
                          key={item.label}
                          href={item.href}
                          onClick={() => item.hash && handleTabClick(item.hash)}
                          className="w-full flex items-center space-x-2 text-left px-2.5 py-2 rounded-lg text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
                        >
                          <item.icon className="w-4 h-4 text-blue-600 shrink-0" />
                          <span className="truncate">{item.label}</span>
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Column 4: Quick Image Tools */}
                  <div className="space-y-3">
                    <p className="text-[11px] font-black uppercase text-blue-600 tracking-wider">Image & Utility Tools</p>
                    <div className="space-y-1">
                      {imageTools.map((item) => (
                        <Link
                          key={item.label}
                          href={item.href}
                          onClick={() => item.hash && handleTabClick(item.hash)}
                          className="w-full flex items-center space-x-2 text-left px-2.5 py-2 rounded-lg text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
                        >
                          <item.icon className="w-4 h-4 text-blue-600 shrink-0" />
                          <span className="truncate">{item.label}</span>
                        </Link>
                      ))}
                    </div>
                  </div>

                </div>
              )}
            </div>
          </nav>

          <div className="hidden sm:flex items-center space-x-1.5 text-xs text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100 font-semibold shrink-0">
            <ShieldCheck className="w-4 h-4" />
            <span>100% Secure</span>
          </div>

          {/* Mobile Menu Button */}
          <div className="xl:hidden flex items-center space-x-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex items-center space-x-1 px-3 py-2 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-xl font-bold text-xs transition-all cursor-pointer"
            >
              <Menu className="w-4 h-4" />
              <span>All Tools</span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Horizontal Quick Scroll Bar */}
      <div className="xl:hidden bg-slate-50 border-b border-slate-200 px-3 py-2 overflow-x-auto flex space-x-2 scrollbar-none shrink-0">
        {quickMobileTools.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            onClick={() => item.hash && handleTabClick(item.hash)}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap shadow-xs transition-all cursor-pointer shrink-0 bg-white text-slate-700 border border-slate-200 hover:bg-blue-50 hover:text-blue-600"
          >
            <item.icon className="w-3.5 h-3.5 shrink-0" />
            <span>{item.label}</span>
          </Link>
        ))}
      </div>

      {/* Mobile Menu Modal (Ab yaha saare tools list kar diye hain) */}
      {mobileMenuOpen && (
        <div className="xl:hidden absolute top-28 left-0 w-full bg-white border-b border-slate-200 shadow-2xl py-6 px-5 space-y-6 z-50 max-h-[80vh] overflow-y-auto">
          
          {/* Govt Exam & Photo Tools */}
          <div>
            <p className="text-[11px] font-black uppercase text-blue-600 tracking-wider mb-2">🎯 Govt Exam & Photo Tools</p>
            <div className="grid grid-cols-1 gap-1.5">
              {examPhotoTools.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => item.hash ? handleTabClick(item.hash) : setMobileMenuOpen(false)}
                  className="w-full flex items-center space-x-2.5 text-left px-3 py-2.5 rounded-xl text-xs font-bold bg-slate-50 text-slate-700 hover:bg-slate-100 transition-all cursor-pointer"
                >
                  <item.icon className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Image & Utility Tools */}
          <div>
            <p className="text-[11px] font-black uppercase text-blue-600 tracking-wider mb-2">🖼️ Image & Utility Tools</p>
            <div className="grid grid-cols-1 gap-1.5">
              {imageTools.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => item.hash ? handleTabClick(item.hash) : setMobileMenuOpen(false)}
                  className="w-full flex items-center space-x-2.5 text-left px-3 py-2.5 rounded-xl text-xs font-bold bg-slate-50 text-slate-700 hover:bg-slate-100 transition-all cursor-pointer"
                >
                  <item.icon className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Convert to PDF */}
          <div>
            <p className="text-[11px] font-black uppercase text-blue-600 tracking-wider mb-2">📁 Convert to PDF</p>
            <div className="grid grid-cols-1 gap-1.5">
              {convertToPdfTools.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => item.hash ? handleTabClick(item.hash) : setMobileMenuOpen(false)}
                  className="w-full flex items-center space-x-2.5 text-left px-3 py-2.5 rounded-xl text-xs font-bold bg-slate-50 text-slate-700 hover:bg-slate-100 transition-all cursor-pointer"
                >
                  <item.icon className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Convert from PDF */}
          <div>
            <p className="text-[11px] font-black uppercase text-blue-600 tracking-wider mb-2">🔄 Convert from PDF</p>
            <div className="grid grid-cols-1 gap-1.5">
              {convertFromPdfTools.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => item.hash ? handleTabClick(item.hash) : setMobileMenuOpen(false)}
                  className="w-full flex items-center space-x-2.5 text-left px-3 py-2.5 rounded-xl text-xs font-bold bg-slate-50 text-slate-700 hover:bg-slate-100 transition-all cursor-pointer"
                >
                  <item.icon className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
          </div>

        </div>
      )}
    </>
  );
}