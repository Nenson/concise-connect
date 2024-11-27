/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  publicRuntimeConfig: {
    APP_URL: process.env.APP_URL,
    WSS_URL: process.env.WSS_URL,
  },
}

export default nextConfig
