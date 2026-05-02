// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"], // AVIF 우선 사용
    minimumCacheTTL: 60 * 60 * 24 * 30,
    deviceSizes: [320, 420, 640, 768, 1024, 1280, 1536],
    imageSizes: [96, 160, 256, 384],
    qualities: [35, 45, 60, 75, 85, 100],
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
