/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['@vercel/node']
  }
}

module.exports = nextConfig
