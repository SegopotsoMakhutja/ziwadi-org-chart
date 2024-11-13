// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  // Disable image optimization in Docker for better performance
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig