import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.personalizedsongmaker.com';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/song-download/', '/lyrics-preview', '/api/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
