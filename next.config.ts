import path from 'path'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,

  /* ------------- IMAGES ------------- */
  images: {
    // 🚩 qualquer URL do Unsplash começa por https://images.unsplash.com
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**', // aceita qualquer caminho
      },
    ],
    // se preferir o formato curto:
    // domains: ['images.unsplash.com'],
  },

  /* ------------- WEBPACK ALIAS ------------- */
  webpack(config) {
    config.resolve ??= { alias: {} }
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, 'src'),
    }
    return config
  },
}

export default nextConfig
