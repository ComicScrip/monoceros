/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    API_BASE_URL: process.env.API_BASE_URL,
    EMAIL: process.env.EMAIL,
    PASSWORD: process.env.PASSWORD,
  },
};

module.exports = nextConfig;
