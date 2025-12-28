// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"], // AVIF 우선 사용
    remotePatterns: [
      {
        protocol: "https",
        hostname: "storage.googleapis.com", // GCP 스토리지 도메인
        port: "",
        pathname: "/**", // 모든 경로 허용
      },
    ],
  },
};

export default nextConfig;
