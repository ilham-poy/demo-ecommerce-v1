import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "rdjg9vt8xfmrbpm7.public.blob.vercel-storage.com",
        pathname: "/products/**",
      },
    ],
  },

};

export default nextConfig;
