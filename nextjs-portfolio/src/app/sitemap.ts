import type { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://leevila.fi',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: 'https://leevila.fi/work',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
      alternates: {languages: {
        'en': 'https://leevila.fi/en-US/work',
        'fi': 'https://leevila.fi/fi-FI/work',
      }},
    },
    {
      url: 'https://leevila.fi/education',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
      alternates: {languages: {
        'en': 'https://leevila.fi/en-US/education',
        'fi': 'https://leevila.fi/fi-FI/education',
      }},
    },
    {
      url: 'https://leevila.fi/projects',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
      alternates: {languages: {
        'en': 'https://leevila.fi/en-US/projects',
        'fi': 'https://leevila.fi/fi-FI/projects',
      }},
    },
  ]
}