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

  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${process.env.NEXT_PUBLIC_API_BASED_URL}/:path*`,
      },
    ];
  },
};

export default nextConfig;
