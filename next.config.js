/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    // incrementalCacheHandlerPath: require.resolve("./cache-handler.js"),
  },
};

module.exports = nextConfig;
