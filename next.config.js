/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export', // Enables static export
  images: {
    unoptimized: true // Required for static export
  },
  // Configure the basePath and assetPrefix if the site is not hosted at the domain root
  // Update 'floriandemel.de' with your repository name if different
  basePath: process.env.NODE_ENV === 'production' ? '' : '',
  trailingSlash: true,
}

module.exports = nextConfig
