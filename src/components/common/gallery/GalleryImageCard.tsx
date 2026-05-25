"use client";

import { motion } from "framer-motion";
import type { MediaType } from "@/hooks/useImages";
import FallbackImage from "@/components/common/fallbackImage";
import { getGalleryImageUrl } from "@/components/common/gallery/galleryUtils";

interface GalleryImageCardProps {
  image: MediaType;
  index: number;
  onSelect: (image: MediaType) => void;
}

export default function GalleryImageCard({
  image,
  index,
  onSelect,
}: GalleryImageCardProps) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: Math.min(index, 8) * 0.03 }}
      className="pointer-events-none relative mb-4 w-full rounded-lg shadow-lg transition-all duration-300 md:pointer-events-auto md:hover:z-50 md:hover:scale-105 md:hover:shadow-2xl group"
      onClick={() => onSelect(image)}
      aria-label={`${image.title || "작품"} 크게 보기`}
    >
      <FallbackImage
        src={getGalleryImageUrl(image.publicUrl)}
        alt={image.altText || image.title || "작품 이미지"}
        width={image.width ?? 300}
        height={image.height ?? 400}
        sizes="(max-width: 800px) calc(100vw - 48px), (max-width: 1024px) calc((100vw - 64px) / 2), (max-width: 1280px) calc((100vw - 80px) / 3), calc((100vw - 96px) / 4)"
        quality={45}
        placeholder="empty"
        loading="lazy"
        decoding="async"
        className="w-full h-auto object-cover rounded-lg bg-gray-100"
      />
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 rounded-lg" />
    </motion.button>
  );
}
