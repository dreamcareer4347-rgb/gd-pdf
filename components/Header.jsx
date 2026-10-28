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
  Presentation,
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
  X
} from 'lucide-react';

export default function Header({ activeTab, setActiveTab }) {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const primaryNav = [
    { id: 'image-to-pdf', label: 'To PDF', icon: FileText },
    { id: 'word-to-pdf', label: 'Word to PDF', icon: FileText },
    { id: 'excel-to-pdf', label: 'Excel to PDF', icon: FileSpreadsheet },
    { id: 'resize-image', label: 'Resize', icon: Maximize2 },
    { id: 'compress-pdf', label: 'Compress', icon: Minimize2 },
    { id: 'merge-pdf', label: 'Merge', icon: Layers },
  ];

  const quickMobileTools = [
    { id: 'image-to-pdf', label: 'To PDF', icon: FileText },
    { id: 'word-to-pdf', label: 'Word to PDF', icon: FileText },
    { id: 'excel-to-pdf', label: 'Excel to PDF', icon: FileSpreadsheet },
    { id: 'custom-exam-resizer', label: 'SSC/NEET Resizer', icon: Sliders },
    { id: 'add-name-date', label: 'Name & DOB', icon: Type },
    { id: 'pdf-to-jpg', label: 'PDF to JPG', icon: FileImage },
    { id: 'pdf-to-word', label: 'PDF to Word', icon: FileText },
    { id: 'nda-age-calc', label: 'Age Calc', icon: Calculator },
  ];

  const convertToPdfTools = [
    { id: 'word-to-pdf', label: 'Word to PDF', icon: FileText },
    { id: 'excel-to-pdf', label: 'Excel to PDF', icon: FileSpreadsheet },
    { id: 'html-to-pdf', label: 'HTML to PDF', icon: Code },
  ];

  const convertFromPdfTools = [
    { id: 'pdf-to-jpg', label: 'PDF to JPG', icon: FileImage },
    { id: 'pdf-to-word', label: 'PDF to WORD', icon: FileText },
    { id: 'pdf-to-pdfa', label: 'PDF to PDF/A', icon: ShieldCheck },
  ];

  const examPhotoTools = [
    { id: 'custom-exam-resizer', label: 'SSC/NEET Exam Resizer', icon: Sliders },
    { id: 'nda-age-calc', label: 'NDA Age Calculator', icon: Calculator },
    { id: 'add-name-date', label: 'Add Name & DOB on Photo', icon: Type },
    { id: 'generate-sign', label: 'Generate Signature Pad', icon: PenTool },
    { id: 'sign-6x2', label: 'Signature 6×2 cm', icon: Ruler },
    { id: 'passport-maker', label: 'Passport Photo Maker', icon: UserCheck },
  ];

  const imageTools = [
    { id: 'image-to-jpg', label: 'Image to JPG', icon: FileImage },
    { id: 'merge-images', label: 'Merge Images', icon: Layers },
    { id: 'ecommerce-resizer', label: 'E-Commerce Resizer', icon: Maximize2 },
    { id: 'heic-converter', label: 'HEIC to JPG', icon: Smartphone },
  ];

  const handleNavClick = (id) => {
    if (isHome && typeof setActiveTab === 'function') {
      setActiveTab(id);
    } else {
      window.location.href = `/${id === 'image-to-pdf' ? '' : '#' + id}`;
    }
    setDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2.5 cursor-pointer group shrink-0">
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
              const Icon = item.icon;
              const isActive = isHome && activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                    isActive ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                </button>
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
                      {convertToPdfTools.map((item) => {
                        const Icon = item.icon;
                        return (
                          <button
                            key={item.id}
                            onClick={() => handleNavClick(item.id)}
                            className={`w-full flex items-center space-x-2 text-left px-2.5 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                              activeTab === item.id ? 'bg-blue-50 text-blue-600' : 'text-slate-700 hover:bg-slate-50'
                            }`}
                          >
                            <Icon className="w-4 h-4 text-blue-600 shrink-0" />
                            <span>{item.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Column 2: Convert from PDF */}
                  <div className="space-y-3">
                    <p className="text-[11px] font-black uppercase text-blue-600 tracking-wider">Convert from PDF</p>
                    <div className="space-y-1">
                      {convertFromPdfTools.map((item) => {
                        const Icon = item.icon;
                        return (
                          <button
                            key={item.id}
                            onClick={() => handleNavClick(item.id)}
                            className={`w-full flex items-center space-x-2 text-left px-2.5 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                              activeTab === item.id ? 'bg-blue-50 text-blue-600' : 'text-slate-700 hover:bg-slate-50'
                            }`}
                          >
                            <Icon className="w-4 h-4 text-blue-600 shrink-0" />
                            <span>{item.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Column 3: Govt Exam & Photo Tools */}
                  <div className="space-y-3">
                    <p className="text-[11px] font-black uppercase text-blue-600 tracking-wider">Govt Exam & Photos</p>
                    <div className="space-y-1">
                      {examPhotoTools.map((item) => {
                        const Icon = item.icon;
                        return (
                          <button
                            key={item.id}
                            onClick={() => handleNavClick(item.id)}
                            className={`w-full flex items-center space-x-2 text-left px-2.5 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                              activeTab === item.id ? 'bg-blue-50 text-blue-600' : 'text-slate-700 hover:bg-slate-50'
                            }`}
                          >
                            <Icon className="w-4 h-4 text-blue-600 shrink-0" />
                            <span className="truncate">{item.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Column 4: Quick Image Tools */}
                  <div className="space-y-3">
                    <p className="text-[11px] font-black uppercase text-blue-600 tracking-wider">Image & Utility Tools</p>
                    <div className="space-y-1">
                      {imageTools.map((item) => {
                        const Icon = item.icon;
                        return (
                          <button
                            key={item.id}
                            onClick={() => handleNavClick(item.id)}
                            className={`w-full flex items-center space-x-2 text-left px-2.5 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                              activeTab === item.id ? 'bg-blue-50 text-blue-600' : 'text-slate-700 hover:bg-slate-50'
                            }`}
                          >
                            <Icon className="w-4 h-4 text-blue-600 shrink-0" />
                            <span className="truncate">{item.label}</span>
                          </button>
                        );
                      })}
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
        {quickMobileTools.map((item) => {
          const Icon = item.icon;
          const isActive = isHome && activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap shadow-xs transition-all cursor-pointer shrink-0 ${
                isActive ? 'bg-blue-600 text-white' : 'bg-white text-slate-700 border border-slate-200 hover:bg-blue-50 hover:text-blue-600'
              }`}
            >
              <Icon className="w-3.5 h-3.5 shrink-0" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* Mobile Menu Modal */}
      {mobileMenuOpen && (
        <div className="xl:hidden absolute top-28 left-0 w-full bg-white border-b border-slate-200 shadow-2xl py-6 px-5 space-y-6 z-50 max-h-[80vh] overflow-y-auto">
          
          <div>
            <p className="text-[11px] font-black uppercase text-blue-600 tracking-wider mb-2">🎯 Govt Exam & Photo Tools (SSC/NEET/UPSC)</p>
            <div className="grid grid-cols-1 gap-1.5">
              {examPhotoTools.map((item) => {
                const ItemIcon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full flex items-center space-x-2.5 text-left px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      activeTab === item.id ? 'bg-blue-600 text-white shadow-sm' : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <ItemIcon className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <p className="text-[11px] font-black uppercase text-blue-600 tracking-wider mb-2">📁 Convert to PDF</p>
            <div className="grid grid-cols-1 gap-1.5">
              {convertToPdfTools.map((item) => {
                const ItemIcon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full flex items-center space-x-2.5 text-left px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      activeTab === item.id ? 'bg-blue-600 text-white shadow-sm' : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <ItemIcon className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <p className="text-[11px] font-black uppercase text-blue-600 tracking-wider mb-2">🔄 Convert from PDF</p>
            <div className="grid grid-cols-1 gap-1.5">
              {convertFromPdfTools.map((item) => {
                const ItemIcon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full flex items-center space-x-2.5 text-left px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      activeTab === item.id ? 'bg-blue-600 text-white shadow-sm' : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <ItemIcon className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

        </div>
      )}
    </>
  );
}