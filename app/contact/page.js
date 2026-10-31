import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Mail, Clock, MessageSquare, Send } from 'lucide-react';

export const metadata = {
  title: 'Contact Us — GD PDF Suite & Typing Pro',
  description: 'Get in touch with the GD PDF Suite team for feedback, tool support, or partnership queries.',
  alternates: { canonical: 'https://gdpdf.online/contact' },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Header />
      
      <main className="flex-grow max-w-4xl mx-auto px-4 py-12 w-full space-y-10">
        
        {/* Title & Intro */}
        <div className="space-y-3 text-center sm:text-left">
          <span className="bg-blue-100 text-blue-700 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider">
            We Are Here To Help
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#033B70] tracking-tight">
            Contact Us
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl">
            Have questions regarding our PDF conversion tools, image resizers, touch typing practice software, or need support? Reach out to our team directly.
          </p>
        </div>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Email Card */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Direct Support Email</h3>
              <p className="text-xs text-slate-500 mt-0.5">Send your queries or bug reports anytime</p>
            </div>
            <a 
              href="mailto:support@gdpdf.online" 
              className="inline-flex items-center text-blue-600 font-bold hover:underline text-sm pt-1"
            >
              <Send className="w-3.5 h-3.5 mr-1.5" /> gdpdf7744@gmail.com
            </a>
          </div>

          {/* Response Time Card */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Response Time</h3>
              <p className="text-xs text-slate-500 mt-0.5">Working hours commitment</p>
            </div>
            <p className="text-xs font-semibold text-slate-700 pt-1">
              We typically reply within 24 to 48 business hours.
            </p>
          </div>

        </div>

        {/* Feedback Section */}
        <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-xs space-y-4 text-slate-700 text-sm leading-relaxed">
          <h2 className="text-xl font-bold text-slate-900 flex items-center">
            <MessageSquare className="w-5 h-5 text-[#033B70] mr-2" /> Feedback & Feature Requests
          </h2>
          <p>
            Are you looking for a specific state government exam photo preset, custom KB compressor, or additional typing practice passages? Drop us an email! We actively update GD PDF Suite based on student and educator feedback to keep exam preparation seamless and secure.
          </p>
        </div>

      </main>

      <Footer />
    </div>
  );
}