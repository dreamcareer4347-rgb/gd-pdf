import Link from 'next/link';

export const metadata = {
  title: 'Terms & Conditions — GD PDF Suite & Typing Pro',
  description: 'Terms and conditions for using GD PDF Suite and GD Typing Pro Suite online utilities and typing test platform.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      {/* Header */}
      <header className="bg-[#033B70] text-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg">
            <img src="/gd-logo.png" alt="Logo" className="w-8 h-8 rounded bg-white p-0.5" />
            <span>GD PDF Suite & Typing Pro</span>
          </Link>
          <div className="flex items-center gap-4 text-sm font-medium">
            <Link href="/" className="hover:underline">Home</Link>
            <Link href="/typing" className="hover:underline">Typing Pro</Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-4xl mx-auto px-4 py-12 w-full">
        <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
          <h1 className="text-3xl font-bold text-[#033B70] mb-2">Terms & Conditions</h1>
          <p className="text-sm text-slate-500 mb-6">Last updated: October 31, 2026</p>

          <div className="space-y-6 text-slate-700 leading-relaxed text-sm sm:text-base">
            <section>
              <h2 className="text-xl font-semibold text-slate-900 mb-2">1. Acceptance of Terms</h2>
              <p>
                By accessing and using <strong>GD PDF Suite & Typing Pro</strong> (`https://gdpdf.online`), you accept and agree to be bound by the terms and provisions of this agreement.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-900 mb-2">2. Use of Services</h2>
              <p>
                Our PDF tools, image resizers, and typing test modules are provided free of charge for personal and educational use. You agree not to misuse the platform, attempt unauthorized access, or disrupt server operations.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-900 mb-2">3. Intellectual Property</h2>
              <p>
                All branding assets, user interface layouts, software code, and official logos associated with GD PDF Suite and GD Typing Pro are protected properties. Unauthorized reproduction or commercial redistribution is prohibited.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-900 mb-2">4. Limitation of Liability</h2>
              <p>
                The tools and typing tests are provided on an "as is" basis without warranties of any kind. We are not responsible for any accidental data loss on user devices or document formatting discrepancies during offline conversions.
              </p>
            </section>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#033B70] text-white py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
          <p>© 2026 GD PDF Suite & Typing Pro. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy-policy" className="hover:underline">Privacy Policy</Link>
            <Link href="/terms" className="hover:underline">Terms & Conditions</Link>
            <Link href="/disclaimer" className="hover:underline">Disclaimer</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}