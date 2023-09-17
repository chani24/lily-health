/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    STRAPI_API_ENDPOINT: "http://localhost:1337",
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
