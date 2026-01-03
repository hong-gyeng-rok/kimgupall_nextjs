"use client";

import GalleryLayout from "../layout/galleryLayout";
import { IsShow } from "../../types/common";
import MainBg from "../layout/mainBg";
import LoadingOverlay from "../common/loadingOverlay";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";

export default function GalleryView({ isShow = true }: IsShow) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <MainBg onLoadComplete={() => setIsLoaded(true)}>
      <AnimatePresence>{!isLoaded && <LoadingOverlay />}</AnimatePresence>
      <section
        data-testid="GalleryView"
        className="flex flex-col items-center bg-none shadow-xl/50 rounded w-full h-screen"
      >
        <GalleryLayout isShow={isShow} />
      </section>
    </MainBg>
  );
}
