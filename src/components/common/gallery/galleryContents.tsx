"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useGalleryImages, MediaType } from "@/hooks/useImages";
import GalleryImageModal from "@/components/common/gallery/GalleryImageModal";
import GalleryMasonry from "@/components/common/gallery/GalleryMasonry";
import GallerySkeleton from "@/components/common/gallery/gallerySkeleton";
import { galleryBreakpointColumns } from "@/components/common/gallery/galleryUtils";

interface GalleryContentsProps {
  collectionSlug?: string;
  children?: ReactNode;
}

export default function GalleryContents({
  collectionSlug,
  children,
}: GalleryContentsProps) {
  const {
    data: images,
    isLoading,
    isError,
    error,
    refetch,
  } = useGalleryImages(collectionSlug);
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const [selectedImage, setSelectedImage] = useState<MediaType | null>(null);

  const content = (() => {
    if (isLoading) {
      return <GallerySkeleton breakpointCols={galleryBreakpointColumns} />;
    }

    if (isError) {
      return (
        <div className="min-h-[50vh] w-full flex flex-col items-center justify-center gap-6 p-8 bg-gray-50 rounded-xl">
          <div className="text-center space-y-2">
            <p className="text-xl font-bold text-gray-800">
              앗! 갤러리를 불러오지 못했어요.
            </p>
            <p className="text-gray-500 text-sm">
              네트워크 연결을 확인하거나 잠시 후 다시 시도해 주세요.
            </p>
            <p className="text-red-400 text-xs bg-red-50 p-2 rounded">
              Error: {error?.message}
            </p>
          </div>
          <button
            onClick={() => refetch()}
            className="font-mono px-8 py-2 border border-black text-black rounded-full hover:bg-black hover:text-white transition-all duration-300 shadow-lg active:scale-95"
          >
            RETRY
          </button>
        </div>
      );
    }

    return (
      <GalleryMasonry
        images={images ?? []}
        onSelectImage={setSelectedImage}
      />
    );
  })();

  return (
    <article
      data-testid="GalleryContents"
      className="flex min-h-svh w-full flex-col gap-6 md:px-6"
    >
      {content}
      {children}
      <GalleryImageModal
        selectedImage={selectedImage}
        isMobile={isMobile}
        onClose={() => setSelectedImage(null)}
      />
    </article>
  );
}
