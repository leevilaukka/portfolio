import type { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/'
    },

    sitemap: 'https://leevila.fi/sitemap.xml',
    host: 'https://leevila.fi',
  }
}