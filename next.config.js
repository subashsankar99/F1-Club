/** @type {import('next').NextConfig} */
const nextConfig = {
  // 1. REQUIRED: Tells Next.js to generate static HTML files for GitHub Pages
  output: 'export', 

  // 2. REQUIRED: Disables the Image Optimization API (which doesn't work on GitHub Pages)
  images: {
    unoptimized: true, 
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },

  // Your existing settings
  reactStrictMode: true,
  
  experimental: {
    // Enable server actions if needed
  },
}

module.exports = nextConfig;