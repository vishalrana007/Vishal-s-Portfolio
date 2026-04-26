import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  distDir: ".next-app",
  turbopack: {
    root: path.join(__dirname),
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
};

export default nextConfig;
