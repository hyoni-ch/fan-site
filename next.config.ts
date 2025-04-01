import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "121.172.50.141",
        port: "8080",
        pathname: "/images/**",
        search: "",
      },
    ],
  },
};

export default nextConfig;
