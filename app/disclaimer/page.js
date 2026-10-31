import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Disclaimer — GD PDF Suite & Typing Pro',
  description: 'Disclaimer regarding document conversions, age calculation tools, and typing speed practice tools on GD PDF Suite.',
  alternates: { canonical: 'https://gdpdf.online/disclaimer' },
};

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      {/* Global Root Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-grow max-w-4xl mx-auto px-4 py-12 w-full">
        <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-xs space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <span className="bg-blue-100 text-[#033B70] text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider">
              Legal Disclaimer
            </span>
            <h1 className="text-3xl font-extrabold text-[#033B70] tracking-tight mt-2">Disclaimer</h1>
            <p className="text-xs text-slate-500 mt-1">Last updated: October 31, 2026</p>
          </div>

          <div className="space-y-6 text-slate-700 leading-relaxed text-sm sm:text-base">
            <section>
              <h2 className="text-lg font-bold text-slate-900 mb-2">1. Tool Accuracy & Verification</h2>
              <p>
                While we strive to provide high-precision PDF compression, image resizing, age calculations, and typing speed measurement, <strong>GD PDF Suite</strong> makes no guarantees regarding exact file output compatibility with specific government portal upload requirements. Users are strongly advised to verify their resized or compressed documents against official recruitment board guidelines before final submission.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-slate-900 mb-2">2. External Links & Services</h2>
              <p>
                Our website may contain links to external websites, blog references, or partner services. We do not assume responsibility for the content, accuracy, privacy policies, or operational practices of any third-party sites.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-slate-900 mb-2">3. Educational & Utility Purpose</h2>
              <p>
                All tools, typing passages, and exam guides available on GD PDF Suite and GD Typing Pro Suite are designed solely for educational, practice, and utility purposes. We are an independent software utility platform and are not affiliated with any government examination board or recruitment council.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-slate-900 mb-2">4. Contact Information</h2>
              <p>
                If you have questions regarding this Disclaimer, please reach out via our{' '}
                <Link href="/contact" className="text-blue-600 font-bold hover:underline">
                  Contact Page
                </Link>{' '}
                or email <strong>gdpdf7744@gmail.com</strong>.
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