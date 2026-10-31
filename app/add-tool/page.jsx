'use client';
import { useState } from 'react';

export default function EmbedToolPage() {
  const [copied, setCopied] = useState(false);

  // Yeh woh HTML iframe code hoga jo doosri website par chalega
  const embedCode = `<iframe src="https://gdpdf.online/embed-widget" width="100%" height="600px" style="border:none; border-radius:12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);"></iframe><div style="text-align:center; font-size:12px; font-family:sans-serif; margin-top:4px;">Free Tool by <a href="https://gdpdf.online" target="_blank" style="color:#0066ff; text-decoration:none;">GD PDF Suite</a></div>`;

  const handleCopy = () => {
    navigator.clipboard.writeText(embedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Put a free PDF & Photo tool on your website</h1>
      <p className="text-gray-600 mb-8">
        Running a job-alert blog, coaching site or exam Telegram channel? Give your readers a free tool that works directly on their device.
      </p>

      {/* Code Box */}
      <div className="bg-gray-900 text-gray-100 p-4 rounded-xl relative mb-6">
        <pre className="overflow-x-auto text-sm font-mono">{embedCode}</pre>
        <button
          onClick={handleCopy}
          className="absolute top-3 right-3 bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-lg text-sm font-medium transition"
        >
          {copied ? 'Copied!' : 'Copy Code'}
        </button>
      </div>

      <div className="bg-blue-50 border border-blue-200 p-4 rounded-xl text-blue-900 text-sm">
        💡 <strong>Good to know:</strong> Keep the small credit link under the tool so your users know it's safe and free!
      </div>
    </div>
  );
}