import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ShieldCheck, Zap, Award, Lock, FileText, CheckCircle2 } from 'lucide-react';

export const metadata = {
  title: 'About Us — GD PDF Suite & Typing Pro',
  description: 'Learn about GD PDF Suite, our mission to provide 100% free, secure browser-based document utilities and government exam typing tools for students and professionals.',
  alternates: { canonical: 'https://gdpdf.online/about' },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Header />
      
      <main className="flex-grow max-w-4xl mx-auto px-4 py-12 w-full space-y-10">
        
        {/* Title & Intro */}
        <div className="space-y-3 text-center sm:text-left">
          <span className="bg-blue-100 text-blue-700 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider">
            Trusted Educational Utility Platform
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#033B70] tracking-tight">
            About GD PDF Suite & Typing Pro
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl">
            GD PDF Suite (`gdpdf.online`) is your all-in-one, 100% free browser-based platform designed specifically for students, job aspirants, and professionals across India who need fast document management and government exam touch-typing practice.
          </p>
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-3">
            <ShieldCheck className="w-8 h-8 text-emerald-600" />
            <h3 className="font-bold text-slate-900 text-sm">100% Client-Side Privacy</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              All PDF compressions, image resizings, and format conversions happen locally inside your browser. Your files never touch any external server.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-3">
            <Zap className="w-8 h-8 text-blue-600" />
            <h3 className="font-bold text-slate-900 text-sm">Lightning Fast Processing</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              No long waiting queues or slow uploads. Get your converted PDFs, compressed photos, and calculated exam ages within milliseconds.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-3">
            <Award className="w-8 h-8 text-indigo-600" />
            <h3 className="font-bold text-slate-900 text-sm">Govt Exam Tailored</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Built with precise presets for UPSC, SSC CGL/CHSL, banking, and high court exam portal requirements (exact KB & dimension limits).
            </p>
          </div>
        </div>

        {/* Detailed Description Box */}
        <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-xs space-y-6 text-slate-700 text-sm leading-relaxed">
          <h2 className="text-xl font-bold text-slate-900">Our Mission & Vision</h2>
          <p>
            Preparing for competitive examinations in India requires absolute precision. Whether uploading a scanned passport photograph under 50KB, formatting a signature to exact 6×2 cm dimensions, or clearing high-speed touch typing tests with strict error penalty rules, students often struggle with complicated software.
          </p>
          <p>
            We built <strong>GD PDF Suite</strong> to eliminate these hurdles. By offering reliable tools that require zero software installation, zero registration, and zero file uploads, we ensure complete accessibility and data safety for everyone.
          </p>

          <h3 className="text-lg font-bold text-slate-900 pt-2">Created & Maintained By</h3>
          <p>
            Developed under the umbrella of <strong>GD Dream Career</strong>, our platform reflects a commitment to empowering learners with high-performance digital tools, computer education, and academic support.
          </p>
        </div>

      </main>

      <Footer />
    </div>
  );
}