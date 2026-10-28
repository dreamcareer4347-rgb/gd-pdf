export default async function sitemap() {
  const baseUrl = 'https://gdpdf.online';

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

  const currentDate = new Date();

  return tools.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: currentDate,
    changeFrequency: route === '' ? 'daily' : 'weekly',
    priority: route === '' ? 1.0 : 0.8,
  }));
}