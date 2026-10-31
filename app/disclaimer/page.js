import Link from 'next/link';

export const metadata = {
  title: 'Disclaimer — GD PDF Suite & Typing Pro',
  description: 'Disclaimer regarding document conversions and typing speed practice tools on GD PDF Suite.',
};

export default function DisclaimerPage() {
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
          <h1 className="text-3xl font-bold text-[#033B70] mb-2">Disclaimer</h1>
          <p className="text-sm text-slate-500 mb-6">Last updated: October 31, 2026</p>

          <div className="space-y-6 text-slate-700 leading-relaxed text-sm sm:text-base">
            <section>
              <h2 className="text-xl font-semibold text-slate-900 mb-2">1. Tool Accuracy</h2>
              <p>
                While we strive to provide high-precision PDF compression, image resizing, and typing speed calculations, GD PDF Suite makes no guarantees regarding exact file output compatibility with specific government portal upload requirements. Users are advised to verify their compressed documents before final submission.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-900 mb-2">2. External Links</h2>
              <p>
                Our website may contain links to external websites or partner services. We do not assume responsibility for the content, privacy policies, or practices of any third-party sites.
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