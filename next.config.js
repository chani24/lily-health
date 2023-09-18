/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    STRAPI_API_ENDPOINT: process.env.NEXT_PUBLIC_STRAPI_API_ENDPOINT,
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        pathname: "/uploads/**",
      },
    ],
  },
};

module.exports = nextConfig;
