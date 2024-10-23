/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["i.vgy.me", "i.imgur.com"],
  },
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = nextConfig;
