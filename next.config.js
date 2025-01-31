/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['avatars.githubusercontent.com', 'res.cloudinary.com'],
  },
  // Enable SWC compiler and disable Babel
  compiler: {
    // Enables SWC minification
    swcMinify: true,
  },
  // Disable Babel
  experimental: {
    forceSwcTransforms: true,
  },
}

module.exports = nextConfig
