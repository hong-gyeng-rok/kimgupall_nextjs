"use client";

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
  return (
    <div className="w-full max-h-[85vh] md:max-h-[90vh] overflow-y-auto p-6 no-scrollbar rounded-xl backdrop-blur-sm shadow-inner">
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
