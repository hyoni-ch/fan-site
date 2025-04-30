import type { NextConfig } from "next";

const apiUrl = process.env.NEXT_PUBLIC_API_BASED_URL;
// let ipAddress = "";

// if (apiUrl) {
//   const parsedUrl = new URL(apiUrl);
//   ipAddress = parsedUrl.hostname;
// }

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // {
      //   protocol: "http",
      //   hostname: ipAddress,
      //   port: "3001",
      //   pathname: "/images/**",
      //   search: "",
      // },
      {
        protocol: "https",
        hostname: "mybucket-ces-joyuri-images.s3.ap-northeast-2.amazonaws.com",
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
