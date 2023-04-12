/** @type {import('next').NextConfig} */
const CompressionPlugin = require('compression-webpack-plugin');

const nextConfig = {
  reactStrictMode: false,
  experimental: {
    appDir: true,
  },
  compress: true,
  // Enable Brotli compression
  webpack(config) {
    config.plugins.push(new CompressionPlugin({
      algorithm: 'brotliCompress',
      test: /\.(js|svg)$/,
      threshold: 15240,
      minRatio: 0.8,
    }))
    return config
  },
}

module.exports = nextConfig
