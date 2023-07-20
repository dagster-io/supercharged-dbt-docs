/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    appDir: true,
  },

  output: "export",
  trailingSlash: true,
  distDir: "dist/supercharged",
};

module.exports = nextConfig;
