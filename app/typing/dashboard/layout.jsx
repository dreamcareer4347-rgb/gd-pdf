'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Target, BookOpen, Gamepad2, Award, Keyboard, ArrowLeft } from 'lucide-react';

export default function TypingDashboardLayout({ children }) {
  const pathname = usePathname();

  const navItems = [
    { name: 'Home', href: '/typing/dashboard', icon: <Home className="w-5 h-5" /> },
    { name: 'Govt Exams', href: '/typing/dashboard/exams', icon: <Target className="w-5 h-5" /> },
    { name: 'Hindi Typing', href: '/typing/dashboard/hindi', icon: <Keyboard className="w-5 h-5" /> },
    { name: 'Touch Practice', href: '/typing/dashboard/practice', icon: <BookOpen className="w-5 h-5" /> },
    { name: 'Typing Games', href: '/typing/dashboard/games', icon: <Gamepad2 className="w-5 h-5" /> },
    { name: 'Certificates', href: '/typing/dashboard/certificates', icon: <Award className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col md:flex-row text-slate-900 font-sans">
      
      {/* Desktop Sidebar */}
      <aside className="w-72 bg-white border-r border-slate-200 hidden md:flex flex-col justify-between p-6 sticky top-0 h-screen shadow-sm z-30">
        <div>
          {/* Logo & Brand Name */}
          <div className="flex items-center justify-between mb-10 px-2">
            <Link href="/typing/dashboard" className="flex items-center gap-3.5 group">
              <img 
                src="/gd-logo.png" 
                alt="GD Logo" 
                className="w-12 h-12 object-contain rounded-2xl shadow-md border border-blue-900/10 p-0.5 bg-white group-hover:scale-105 transition"
              />
              <div>
                <span className="text-lg font-black tracking-tight text-[#0B2545] block leading-none">
                  GD Typing
                </span>
                <span className="text-[10px] font-mono font-extrabold text-[#134074] tracking-widest uppercase mt-1 block">
                  Pro Suite
                </span>
              </div>
            </Link>
            <span className="text-[10px] font-extrabold bg-blue-50 text-blue-700 border border-blue-200 px-2.5 py-1 rounded-full shadow-xs">
              v2.0
            </span>
          </div>

          {/* Navigation Links with Lucide Icons */}
          <nav className="space-y-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3.5 px-4 py-3.5 rounded-2xl font-bold text-sm transition-all duration-200 ${
                    isActive
                      ? 'bg-[#134074] text-white shadow-lg shadow-blue-900/25 translate-x-1'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  {item.icon}
                  <span className="tracking-wide">{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Back to PDF Suite */}
        <div className="border-t border-slate-100 pt-5">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 text-xs font-bold text-slate-600 hover:text-blue-700 p-3.5 rounded-2xl bg-slate-50 hover:bg-blue-50 transition border border-slate-200/80 shadow-xs"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to GD PDF Suite</span>
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen bg-white pb-24 md:pb-0">
        
        {/* Mobile Header */}
        <header className="bg-white/90 backdrop-blur-md border-b border-slate-200 p-4 md:hidden flex justify-between items-center sticky top-0 z-40 shadow-xs">
          <Link href="/typing/dashboard" className="flex items-center gap-3">
            <img src="/gd-logo.png" alt="GD Logo" className="w-9 h-9 object-contain rounded-xl shadow-sm" />
            <span className="font-black text-[#0B2545] text-base">GD Typing Pro</span>
          </Link>
          <Link href="/" className="text-xs font-extrabold text-blue-700 bg-blue-50 border border-blue-200 px-3 py-1.5 rounded-xl shadow-xs">
            ← PDF Suite
          </Link>
        </header>

        {/* Page Content */}
        <main className="p-6 md:p-12 max-w-7xl w-full mx-auto flex-1">
          {children}
        </main>

        {/* Mobile Bottom Navigation Bar for Seamless Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-lg border-t border-slate-200 px-3 py-2 md:hidden z-50 shadow-2xl flex justify-around items-center">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${
                  isActive ? 'text-[#134074] font-black scale-105 bg-blue-50/80' : 'text-slate-500 hover:text-slate-900 font-bold'
                }`}
              >
                <div className="w-5 h-5">{item.icon}</div>
                <span className="text-[9px] tracking-tight">{item.name}</span>
              </Link>
            );
          })}
        </div>

      </div>

    </div>
  );
}