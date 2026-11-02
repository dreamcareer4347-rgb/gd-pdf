// components/SeoSchema.jsx
//
// NOTE: Server Component (No 'use client').
// Renders a static <script> tag into initial HTML for zero JS overhead and instant Googlebot indexing.

export default function SeoSchema() {
  const schemaData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': 'https://gdpdf.online/#organization',
        name: 'GD PDF Suite & Typing Pro',
        alternateName: 'GD PDF',
        url: 'https://gdpdf.online',
        logo: {
          '@type': 'ImageObject',
          url: 'https://gdpdf.online/gd-logo.png',
          width: 512,
          height: 512,
        },
        description:
          'Free browser-based PDF tools, image resizer, passport photo maker and government exam typing practice, built and maintained by GD Dream Career.',
        parentOrganization: {
          '@type': 'Organization',
          name: 'GD Dream Career',
        },
        sameAs: [
          // Future profiles can be added here once live
        ],
      },
      {
        '@type': 'WebSite',
        '@id': 'https://gdpdf.online/#website',
        url: 'https://gdpdf.online',
        name: 'GD PDF Suite & Typing Pro',
        inLanguage: 'en-IN',
        publisher: { '@id': 'https://gdpdf.online/#organization' },
      },
      {
        '@type': 'WebApplication',
        '@id': 'https://gdpdf.online/#webapp',
        name: 'GD PDF Suite',
        url: 'https://gdpdf.online',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'All',
        browserRequirements: 'Requires JavaScript',
        description:
          '100% Free & Secure Online PDF Tools. Convert Pictures to PDF, Compress PDF size to target KB, Resize Images, and Merge PDFs directly in your browser with zero server uploads.',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
}