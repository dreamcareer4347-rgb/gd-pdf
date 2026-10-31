import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Terms & Conditions — GD PDF Suite & Typing Pro',
  description: 'Terms and conditions for using GD PDF Suite and GD Typing Pro Suite online utilities and typing test platform.',
  alternates: { canonical: 'https://gdpdf.online/terms' },
};

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      {/* Global Root Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-grow max-w-4xl mx-auto px-4 py-12 w-full">
        <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-xs space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <span className="bg-blue-100 text-[#033B70] text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider">
              Legal & Terms
            </span>
            <h1 className="text-3xl font-extrabold text-[#033B70] tracking-tight mt-2">Terms & Conditions</h1>
            <p className="text-xs text-slate-500 mt-1">Last updated: October 31, 2026</p>
          </div>

          <div className="space-y-6 text-slate-700 leading-relaxed text-sm sm:text-base">
            <section>
              <h2 className="text-lg font-bold text-slate-900 mb-2">1. Acceptance of Terms</h2>
              <p>
                By accessing and using <strong>GD PDF Suite & Typing Pro</strong> (`https://gdpdf.online`), you accept and agree to be bound by the terms and provisions of this agreement.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-slate-900 mb-2">2. Use of Services</h2>
              <p>
                Our PDF tools, image resizers, and typing test modules are provided free of charge for personal and educational use. You agree not to misuse the platform, attempt unauthorized access, or disrupt server operations.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-slate-900 mb-2">3. Intellectual Property</h2>
              <p>
                All branding assets, user interface layouts, software code, and official logos associated with GD PDF Suite and GD Typing Pro are protected properties. Unauthorized reproduction or commercial redistribution is prohibited.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-slate-900 mb-2">4. Limitation of Liability</h2>
              <p>
                The tools and typing tests are provided on an &quot;as is&quot; basis without warranties of any kind. We are not responsible for any accidental data loss on user devices or document formatting discrepancies during offline conversions.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-slate-900 mb-2">5. Contact Information</h2>
              <p>
                If you have questions regarding these terms, feel free to reach out via our{' '}
                <Link href="/contact" className="text-blue-600 font-bold hover:underline">
                  Contact Page
                </Link>{' '}
                or email <strong>support@gdpdf.online</strong>.
              </p>
            </section>
          </div>
        </div>
      </main>

      {/* Global Root Footer */}
      <Footer />
    </div>
  );
}