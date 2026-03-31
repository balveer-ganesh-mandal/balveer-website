export default function sitemap() {
  const baseUrl = 'https://www.balveerganeshmandal.online';
  
  // Define all the public routes in the application
  const routes = [
    { path: '', priority: 1, changeFrequency: 'monthly' },
    { path: '/about', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/events', priority: 0.9, changeFrequency: 'weekly' }, // Events change more frequently
    { path: '/gallery', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/social-work', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/donate', priority: 0.7, changeFrequency: 'yearly' },
    { path: '/contact', priority: 0.7, changeFrequency: 'yearly' },
    { path: '/committee', priority: 0.7, changeFrequency: 'yearly' },
    { path: '/privacy-policy', priority: 0.5, changeFrequency: 'yearly' },
    { path: '/terms-conditions', priority: 0.5, changeFrequency: 'yearly' },
    { path: '/refund-policy', priority: 0.5, changeFrequency: 'yearly' },
  ].map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  return [...routes];
}
