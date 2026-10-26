export default async function sitemap() {
  const baseUrl = 'https://gdpdf.online';

  const tools = [
    '',
    '/image-to-pdf',
    '/word-to-pdf',
    '/excel-to-pdf',
    '/ppt-to-pdf',
    '/html-to-pdf',
    '/pdf-to-jpg',
    '/pdf-to-word',
    '/pdf-to-ppt',
    '/pdf-to-excel',
    '/pdf-to-pdfa',
    '/custom-exam-resizer',
    '/nda-age-calc',
    '/add-name-date',
    '/generate-sign',
    '/sign-6x2',
    '/passport-maker',
    '/image-to-jpg',
    '/merge-images',
    '/resize-image',
    '/compress-pdf',
    '/merge-pdf',
    '/ecommerce-resizer',
    '/heic-converter',
    '/image-to-png'
  ];

  return tools.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'daily' : 'weekly',
    priority: route === '' ? 1.0 : 0.8,
  }));
}