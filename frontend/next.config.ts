/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["images.unsplash.com"], // Add your image domains here
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;