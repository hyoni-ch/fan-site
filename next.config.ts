import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "61.99.26.112",
        port: "3001",
        pathname: "/images/**",
        search: "",
      },
    ],
  },
};

export default nextConfig;
