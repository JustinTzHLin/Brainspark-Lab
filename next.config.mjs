/** @type {import('next').NextConfig} */
const nextConfig = {
  publicRuntimeConfig: {
    API_URL: process.env.API_URL,
    MY_VAR: process.env.MY_VAR,
  },
};

export default nextConfig;
