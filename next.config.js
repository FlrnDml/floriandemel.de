/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export', // Enables static export
  images: {
    unoptimized: true // Required for static export
  },
  // Configure the basePath if needed
  basePath: process.env.NODE_ENV === 'production' ? '' : '',
  trailingSlash: true,

  // Explicitly configure static file handling
  webpack: (config, { isServer }) => {
    // Add PDF file handling
    config.module.rules.push({
      test: /\.(pdf)$/i,
      type: 'asset/resource',
    });
    
    return config;
  },
  
  // Increase limit for larger static files
  experimental: {
    largePageDataBytes: 128 * 1000,
  },
  
  // Note: Headers don't work with static export
  // We'll handle this differently
}

module.exports = nextConfig
