import Link from 'next/link';

export const metadata = {
  title: 'Privacy Policy — GD PDF Suite & Typing Pro',
  description: 'Read the privacy policy for GD PDF Suite and GD Typing Pro Suite. Learn how we protect your data with 100% client-side processing.',
};

export default function PrivacyPolicyPage() {
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
          <h1 className="text-3xl font-bold text-[#033B70] mb-2">Privacy Policy</h1>
          <p className="text-sm text-slate-500 mb-6">Last updated: October 31, 2026</p>

          <div className="space-y-6 text-slate-700 leading-relaxed text-sm sm:text-base">
            <section>
              <h2 className="text-xl font-semibold text-slate-900 mb-2">1. Introduction</h2>
              <p>
                Welcome to <strong>GD PDF Suite & Typing Pro</strong> (`https://gdpdf.online`). We respect your privacy and are committed to protecting your personal information. This Privacy Policy explains how we handle your data when you use our browser-based PDF utilities and typing test platform.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-900 mb-2">2. 100% Client-Side Processing</h2>
              <p>
                All our PDF tools (such as compression, image-to-PDF, and resizing) operate entirely within your local browser using client-side JavaScript. <strong>We do not upload, store, or view any of your private documents, images, or files on our servers.</strong> Your files never leave your device.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-900 mb-2">3. Google AdSense & Cookies</h2>
              <p>
                We use third-party vendors, including Google, to serve ads when you visit our website. Google uses cookies (such as the DART cookie) to serve ads based on your prior visits to our website or other websites. Users may opt out of personalized advertising by visiting Google Ads Settings.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-900 mb-2">4. Analytics</h2>
              <p>
                We use lightweight analytics (such as Vercel Analytics) to monitor general site performance, page views, and traffic origins to improve our platform experience. This data is anonymized and does not track personal user identities.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-900 mb-2">5. Contact Us</h2>
              <p>
                If you have any questions regarding this Privacy Policy, you can reach out to us through our platform.
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