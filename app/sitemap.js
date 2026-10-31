export default async function sitemap() {
  const baseUrl = 'https://gdpdf.online';
  const currentDate = new Date();

  // PDF & General Tools Routes
  const tools = [
    '',
    '/compress-pdf',
    '/compress-pdf-100kb',
    '/compress-pdf-200kb',
    '/ilovepdf-alternative',
    '/image-to-pdf',
    '/iphone-photo-converter',
    '/merge-pdf',
    '/name-dob-photo',
    '/nda-age-calculator',
    '/passport-photo-maker',
    '/resize-image',
    '/resize-image-for-form',
    '/signature-6x2-cm',
  ];

  // GD Typing Pro Suite Routes
  const typingRoutes = [
    '/typing',
    '/typing/dashboard',
    '/typing/dashboard/exams',
    '/typing/dashboard/hindi',
    '/typing/dashboard/practice',
    '/typing/dashboard/games',
    '/typing/dashboard/certificates',
  ];

  const toolEntries = tools.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: currentDate,
    changeFrequency: route === '' ? 'daily' : 'weekly',
    priority: route === '' ? 1.0 : 0.8,
  }));

  const typingEntries = typingRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 0.85,
  }));

  return [...toolEntries, ...typingEntries];
}