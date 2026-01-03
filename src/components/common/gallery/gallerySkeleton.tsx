"use client";

import React from "react";
import Masonry from "react-masonry-css";
import { motion } from "framer-motion";

interface GallerySkeletonProps {
  breakpointCols?: { [key: string]: number };
}

const defaultBreakpointColumnsObj = {
  default: 4,
  1280: 3,
  1024: 2,
  800: 1,
  640: 1,
};

export default function GallerySkeleton({
  breakpointCols = defaultBreakpointColumnsObj,
}: GallerySkeletonProps) {
  const skeletonHeights = [300, 400, 250, 350, 450, 280, 320, 380];

  return (
    <div className="w-full h-full flex justify-center p-6">
      <Masonry
        breakpointCols={breakpointCols}
        className="my-masonry-grid flex gap-4 w-full"
        columnClassName="my-masonry-grid_column gap-4 bg-clip-padding"
      >
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0.5 }}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="mb-4 rounded-lg bg-gray-200"
            style={{
              height: `${skeletonHeights[i % skeletonHeights.length]}px`,
            }}
          />
        ))}
      </Masonry>
    </div>
  );
}
