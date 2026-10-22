// components/SeoSchema.jsx
'use client';

export default function SeoSchema() {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "GD PDF Suite",
    "url": "https://gdpdf.online",
    "applicationCategory": "UtilitiesApplication",
    "operatingSystem": "All",
    "browserRequirements": "Requires JavaScript",
    "description": "100% Free & Secure Online PDF Tools. Convert Pictures to PDF, Compress PDF size to target KB, Resize Images, and Merge PDFs directly in your browser with zero server uploads.",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
}