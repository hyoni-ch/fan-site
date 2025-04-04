import type { NextConfig } from "next";

const apiUrl = process.env.NEXT_PUBLIC_API_BASED_URL;
let ipAddress = "";

if (apiUrl) {
  const parsedUrl = new URL(apiUrl);
  ipAddress = parsedUrl.hostname;
}

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: ipAddress,
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
        destination: `${apiUrl}/:path*`,
      },
    ];
  },
};

export default nextConfig;
