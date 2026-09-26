import { MetadataRoute } from 'next';
import { PRODUCTS } from '@/lib/products-data';
import { SANCTUARY_PROPERTIES } from '@/lib/retreats-data';
import { INITIAL_ARTICLES } from '@/lib/editorial-data';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.yojqi.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = ['en', 'zh'];
  const routes: MetadataRoute.Sitemap = [];

  // Static core routes
  const staticPages = ['', '/shop', '/talismans', '/retreats', '/wisdom'];

  for (const lang of languages) {
    for (const page of staticPages) {
      routes.push({
        url: `${BASE_URL}/${lang}${page}`,
        lastModified: new Date(),
        changeFrequency: page === '/wisdom' ? 'daily' : 'weekly',
        priority: page === '' ? 1.0 : 0.8,
      });
    }

    // Dynamic Products & Talismans
    for (const prod of PRODUCTS) {
      routes.push({
        url: `${BASE_URL}/${lang}/product/${prod.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.9,
      });
    }

    // Dynamic Retreats
    for (const prop of SANCTUARY_PROPERTIES) {
      routes.push({
        url: `${BASE_URL}/${lang}/retreats/${prop.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.9,
      });
    }

    // Dynamic Wisdom Articles
    for (const art of INITIAL_ARTICLES) {
      routes.push({
        url: `${BASE_URL}/${lang}/wisdom/${art.slug}`,
        lastModified: new Date(art.publishDate || Date.now()),
        changeFrequency: 'monthly',
        priority: 0.8,
      });
    }
  }

  return routes;
}
