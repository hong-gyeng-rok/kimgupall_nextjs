// next.config.ts
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import type { NextConfig } from "next";

const projectRoot = dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.160.166"],
  cacheMaxMemorySize: 0,
  turbopack: {
    root: projectRoot,
  },
  experimental: {
    turbopackMemoryLimit: 2 * 1024 * 1024 * 1024,
    turbopackFileSystemCacheForDev: false,
    turbopackSourceMaps: false,
    turbopackInputSourceMaps: false,
  },
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
