/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.experiments = { ...config.experiments, asyncWebAssembly: true };
    return config;
  },
  turbopack: {},
  eslint: {
    ignoreDuringBuilds: true,
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'raksha-hash.vercel.app',
          },
        ],
        destination: 'https://www.raksha.amanblaze.in/:path*',
        permanent: true,
      },
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'raksha.amanblaze.in',
          },
        ],
        destination: 'https://www.raksha.amanblaze.in/:path*',
        permanent: true,
      },
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.raksha-hash.vercel.app',
          },
        ],
        destination: 'https://www.raksha.amanblaze.in/:path*',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;
