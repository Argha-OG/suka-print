import dbConnect from '@/lib/dbConnect';
import Product from '@/lib/models/Product';

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
    await dbConnect();
    // Retrieve only necessary fields for sitemap
    const products = await Product.find({}, '_id updatedAt').lean();

    if (!products || products.length === 0) {
      return routes;
    }

    const productRoutes = products.map((product) => ({
      url: `${SITE_URL}/products/${product._id}`,
      lastModified: (product.updatedAt || new Date()).toISOString(),
      changeFrequency: 'weekly',
      priority: 0.6,
    }));

    return [...routes, ...productRoutes];
  } catch (error) {
    console.error('Sitemap generation error:', error);
    return routes;
  }
}
