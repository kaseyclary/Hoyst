/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
  dest: 'public'
})

const nextConfig = withPWA({
  webpack: (config, { isServer }) => {
    if (!isServer) {
        config.resolve.fallback = {
            fs: false,
            net: false,
            tls: false,
        };
    }

    return config;
},
  reactStrictMode: true,
  pwa:{
    dest:"public",
    register:true,
    skipWaiting:true,
    disable:process.env.NODE_ENV === 'development'
  }
})

module.exports = nextConfig
