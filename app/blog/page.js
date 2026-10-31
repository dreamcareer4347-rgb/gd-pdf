import Link from 'next/link';

export const metadata = {
  title: 'Blog & Government Exam Guides — GD PDF Suite & Typing Pro',
  description: 'Read expert guides on SSC CGL typing tests, touch typing tips, document compression techniques, and government exam preparation.',
};

const blogPosts = [
  {
    slug: 'how-to-crack-ssc-cgl-typing-test',
    title: 'How to Crack SSC CGL & High Court Typing Test: Complete Speed & Accuracy Guide',
    excerpt: 'Master touch typing, eliminate backspace dependency, and boost your WPM speed for government exam simulations using GD Typing Pro Suite.',
    date: 'October 31, 2026',
    category: 'Typing Guide',
  },
  {
    slug: 'ssc-typing-test-error-calculation-formula',
    title: 'How SSC & High Court Calculate Typing Test Errors: Full Formula & Accuracy Tips',
    excerpt: 'Understand gross speed, net speed, and full/half mistake rules used in government recruitment board typing tests.',
    date: 'October 31, 2026',
    category: 'Exam Tips',
  },
  {
    slug: 'how-to-resize-image-signature-for-upsc-ssc-form',
    title: 'How to Resize Photo and Signature for UPSC and SSC Portal Uploads (KB & Dimension Guide)',
    excerpt: 'Learn official KB limits and dimension requirements for passport photos and signatures without risking form rejection.',
    date: 'October 31, 2026',
    category: 'Document Guides',
  },
  {
    slug: 'compress-pdf-below-100kb-without-losing-quality',
    title: 'How to Compress PDF and Images Below 100KB for Government Portal Uploads',
    excerpt: 'Learn the easiest ways to resize images, compress PDF files, and format 6x2 cm signatures securely in your browser without losing clarity.',
    date: 'October 30, 2026',
    category: 'PDF Tools',
  },
  {
    slug: 'best-free-pdf-tools-without-uploading-files',
    title: 'Why Browser-Based Client-Side PDF Tools are Safer Than Cloud Converters',
    excerpt: 'Discover why processing sensitive documents locally in your browser guarantees absolute privacy with zero server file uploads.',
    date: 'October 30, 2026',
    category: 'Privacy & Tech',
  },
];

export default function BlogPage() {
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
            <Link href="/blog" className="underline">Blog</Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-4xl mx-auto px-4 py-12 w-full">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#033B70] mb-2">GD PDF & Typing Blog</h1>
          <p className="text-slate-600">Expert guides, exam tips, and utility tutorials for students and professionals.</p>
        </div>

        <div className="grid gap-6">
          {blogPosts.map((post) => (
            <article key={post.slug} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 text-xs text-slate-500 mb-2">
                <span className="bg-blue-100 text-[#033B70] font-semibold px-2.5 py-1 rounded-full">{post.category}</span>
                <span>{post.date}</span>
              </div>
              <h2 className="text-xl font-bold text-slate-900 mb-2">
                <Link href={`/blog/${post.slug}`} className="hover:text-[#033B70] transition-colors">
                  {post.title}
                </Link>
              </h2>
              <p className="text-slate-700 text-sm mb-4 leading-relaxed">{post.excerpt}</p>
              <Link href={`/blog/${post.slug}`} className="inline-flex items-center text-sm font-semibold text-[#033B70] hover:underline">
                Read Full Article →
              </Link>
            </article>
          ))}
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