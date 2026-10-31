import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Privacy Policy — GD PDF Suite & Typing Pro',
  description: 'Read the privacy policy for GD PDF Suite and GD Typing Pro Suite. Learn how we protect your data with 100% client-side processing.',
  alternates: { canonical: 'https://gdpdf.online/privacy-policy' },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      {/* Global Root Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-grow max-w-4xl mx-auto px-4 py-12 w-full">
        <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-xs space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <span className="bg-blue-100 text-[#033B70] text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider">
              Legal & Privacy
            </span>
            <h1 className="text-3xl font-extrabold text-[#033B70] tracking-tight mt-2">Privacy Policy</h1>
            <p className="text-xs text-slate-500 mt-1">Last updated: October 31, 2026</p>
          </div>

          <div className="space-y-6 text-slate-700 leading-relaxed text-sm sm:text-base">
            <section>
              <h2 className="text-lg font-bold text-slate-900 mb-2">1. Introduction</h2>
              <p>
                Welcome to <strong>GD PDF Suite & Typing Pro</strong> (`https://gdpdf.online`). We respect your privacy and are committed to protecting your personal information. This Privacy Policy explains how we handle your data when you use our browser-based PDF utilities and typing test platform.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-slate-900 mb-2">2. 100% Client-Side Processing</h2>
              <p>
                All our PDF tools (such as compression, image-to-PDF, and resizing) operate entirely within your local browser using client-side JavaScript. <strong>We do not upload, store, or view any of your private documents, images, or files on our servers.</strong> Your files never leave your device.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-slate-900 mb-2">3. Google AdSense & Cookies</h2>
              <p>
                We use third-party vendors, including Google, to serve ads when you visit our website. Google uses cookies (such as the DART cookie) to serve ads based on your prior visits to our website or other websites. Users may opt out of personalized advertising by visiting Google Ads Settings.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-slate-900 mb-2">4. Analytics</h2>
              <p>
                We use lightweight analytics (such as Vercel Analytics) to monitor general site performance, page views, and traffic origins to improve our platform experience. This data is anonymized and does not track personal user identities.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-slate-900 mb-2">5. Contact Us</h2>
              <p>
                If you have any questions regarding this Privacy Policy, you can reach out to us directly through our{' '}
                <Link href="/contact" className="text-blue-600 font-bold hover:underline">
                  Contact Us
                </Link>{' '}
                page or email us at <strong>gdpdf7744@gmail.com</strong>.
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