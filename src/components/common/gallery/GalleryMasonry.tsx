"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Masonry from "react-masonry-css";
import type { MediaType } from "@/hooks/useImages";
import GalleryImageCard from "@/components/common/gallery/GalleryImageCard";
import { galleryBreakpointColumns } from "@/components/common/gallery/galleryUtils";

interface GalleryMasonryProps {
  images: MediaType[];
  onSelectImage: (image: MediaType) => void;
}

export default function GalleryMasonry({
  images,
  onSelectImage,
}: GalleryMasonryProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = scrollContainerRef.current;

    if (!container) return;

    const updateBottomState = () => {
      const distanceToBottom =
        container.scrollHeight - container.clientHeight - container.scrollTop;

      window.dispatchEvent(
        new CustomEvent("kimgupall:kiosk-scroll-state", {
          detail: {
            isAtTop: container.scrollTop <= 24,
            isAtBottom: distanceToBottom <= 24,
          },
        }),
      );
    };

    updateBottomState();
    container.addEventListener("scroll", updateBottomState, { passive: true });

    return () => {
      container.removeEventListener("scroll", updateBottomState);
      window.dispatchEvent(
        new CustomEvent("kimgupall:kiosk-scroll-state", {
          detail: { isAtTop: true, isAtBottom: false },
        }),
      );
    };
  }, [images.length]);

  return (
    <div ref={scrollContainerRef} className="min-h-0 w-full flex-1 overflow-y-auto no-scrollbar">
      {images.length > 0 ? (
        <Masonry
          breakpointCols={galleryBreakpointColumns}
          className="my-masonry-grid flex gap-4"
          columnClassName="my-masonry-grid_column gap-4 bg-clip-padding"
        >
          {images.map((image, index) => (
            <GalleryImageCard
              key={image.id}
              image={image}
              index={index}
              onSelect={onSelectImage}
            />
          ))}
        </Masonry>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center h-full min-h-[40vh] text-gray-400 gap-4"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-16 h-16 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center"
          >
            <div className="w-8 h-8 bg-gray-200 rounded-full" />
          </motion.div>
          <p className="font-mono text-lg tracking-widest text-gray-500">
            NO ARTWORKS FOUND
          </p>
        </motion.div>
      )}
    </div>
  );
}
