const EXTERNAL_DATA_URL = process.env.NEXT_PUBLIC_API_URL ? `${process.env.NEXT_PUBLIC_API_URL}/api/products` : 'http://localhost:5000/api/products';
const SITE_URL = 'https://www.sukaprint.com';

export default async function sitemap() {
  // Static routes
  const routes = [
    '',
    '/products',
    '/services',
    '/about',
    '/contact',
    '/blog',
    '/help-center',
    '/shipping-info',
    '/returns-refunds',
  ].map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // Home page priority
  routes[0].priority = 1.0;
  routes[0].changeFrequency = 'daily';

  // Dynamic product routes
  try {
    const res = await fetch(EXTERNAL_DATA_URL);
    const products = await res.json();

    const productRoutes = products.map((product) => ({
      url: `${SITE_URL}/products/${product._id}`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly',
      priority: 0.6,
    }));

    return [...routes, ...productRoutes];
  } catch (error) {
    console.error('Sitemap fetch error:', error);
    return routes;
  }
}
