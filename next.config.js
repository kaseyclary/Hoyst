/** @type {import('next').NextConfig} */
const nextConfig = {
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
}

module.exports = nextConfig
