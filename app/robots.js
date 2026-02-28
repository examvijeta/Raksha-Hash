export default function robots() {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: '/api/',
        },
        sitemap: 'https://www.raksha.amanblaze.in/sitemap.xml',
    }
}
