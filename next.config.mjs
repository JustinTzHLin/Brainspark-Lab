/** @type {import('next').NextConfig} */
const nextConfig = {
  publicRuntimeConfig: {
    API_URL: process.env.API_URL,
    MY_VAR: process.env.MY_VAR,
  },
  experimental: {
    optimizePackageImports: ["@chakra-ui/react"],
  },
  async redirects() {
    return [
      {
        source: "/home/:path*",
        destination: "/:path*",
        permanent: true,
      },
    ];
  },
  reactStrictMode: true,
};

export default nextConfig;
