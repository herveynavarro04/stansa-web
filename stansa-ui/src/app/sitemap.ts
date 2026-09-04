import type { MetadataRoute } from 'next';
import { PRODUCTS } from '@/lib/products';

const SITE_URL = 'https://www.acerosstansa.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const productRoutes: MetadataRoute.Sitemap = PRODUCTS.map((p) => ({
    url: `${SITE_URL}/productos/${encodeURIComponent(p.slug)}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [
    {
      url: `${SITE_URL}/`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...productRoutes,
  ];
}
