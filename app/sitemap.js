export default function sitemap() {
    const baseUrl = 'https://www.raksha.amanblaze.in';

    const routes = [
        '',
        '/about',
        '/faq',
        '/how-to-use',
        '/security',
        '/privacy',
        '/terms',
        '/dashboard',
        '/verify',
        '/legal',
        '/help',
        '/protect',
        '/support',
        '/saheli'
    ];

    return routes.map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: route === '' ? 'daily' : 'weekly',
        priority: route === '' ? 1 : 0.8,
    }));
}
