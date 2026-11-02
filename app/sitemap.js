// app/sitemap.js

const baseUrl = 'https://gdpdf.online';

// Tool routes with active image & PDF resizer pages
const toolRoutes = [
  { path: '', lastModified: '2026-11-02', priority: 1.0 },
  { path: '/compress-pdf', lastModified: '2026-11-02', priority: 0.9 },
  { path: '/compress-pdf-100kb', lastModified: '2026-11-02', priority: 0.9 },
  { path: '/compress-pdf-200kb', lastModified: '2026-11-02', priority: 0.9 },
  { path: '/compress-pdf-500kb', lastModified: '2026-11-02', priority: 0.9 },
  { path: '/image-to-pdf', lastModified: '2026-11-02', priority: 0.9 },
  { path: '/merge-pdf', lastModified: '2026-11-02', priority: 0.8 },
  { path: '/resize-image', lastModified: '2026-11-02', priority: 0.9 },
  { path: '/resize-image-for-form', lastModified: '2026-11-02', priority: 0.8 },
  { path: '/photo-resize-20kb', lastModified: '2026-11-02', priority: 0.9 },
  { path: '/photo-resize-50kb', lastModified: '2026-11-02', priority: 0.9 },
  { path: '/photo-resize-100kb', lastModified: '2026-11-02', priority: 0.9 },
  { path: '/passport-photo-maker', lastModified: '2026-11-02', priority: 0.8 },
  { path: '/signature-6x2-cm', lastModified: '2026-11-02', priority: 0.8 },
  { path: '/name-dob-photo', lastModified: '2026-11-02', priority: 0.8 },
  { path: '/iphone-photo-converter', lastModified: '2026-11-02', priority: 0.7 },
  { path: '/ilovepdf-alternative', lastModified: '2026-11-02', priority: 0.7 },
  { path: '/nda-age-calculator', lastModified: '2026-11-02', priority: 0.7 },
];

const typingRoutes = [
  { path: '/typing', lastModified: '2026-11-02', priority: 0.8 },
  { path: '/typing/dashboard/exams', lastModified: '2026-11-02', priority: 0.7 },
  { path: '/typing/dashboard/hindi', lastModified: '2026-11-02', priority: 0.7 },
  { path: '/typing/dashboard/games', lastModified: '2026-11-02', priority: 0.7 },
  { path: '/typing/dashboard/certificates', lastModified: '2026-11-02', priority: 0.6 },
];

const blogPosts = [];

const trustRoutes = [
  { path: '/blog', lastModified: '2026-11-02', priority: 0.5 },
  { path: '/about', lastModified: '2026-10-31', priority: 0.5 },
  { path: '/contact', lastModified: '2026-10-31', priority: 0.5 },
  { path: '/disclaimer', lastModified: '2026-10-31', priority: 0.3 },
  { path: '/privacy-policy', lastModified: '2026-10-31', priority: 0.3 },
  { path: '/terms', lastModified: '2026-10-31', priority: 0.3 },
];

const blogEntries = blogPosts.map((post) => ({
  url: `${baseUrl}/blog/${post.slug}`,
  lastModified: post.lastModified,
  changeFrequency: 'monthly',
  priority: 0.6,
}));

const toEntries = (routes) =>
  routes.map((route) => ({
    url: route.path === '' ? `${baseUrl}/` : `${baseUrl}${route.path}`,
    lastModified: route.lastModified,
    changeFrequency: route.path === '' ? 'daily' : 'weekly',
    priority: route.priority,
  }));

export default function sitemap() {
  return [
    ...toEntries(toolRoutes),
    ...toEntries(typingRoutes),
    ...blogEntries,
    ...toEntries(trustRoutes),
  ];
}