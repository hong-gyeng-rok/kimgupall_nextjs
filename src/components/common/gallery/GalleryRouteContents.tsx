"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import GalleryContents from "./galleryContents";
import GalleryFooterNav from "./GalleryFooterNav";

function GalleryRouteContent() {
  const searchParams = useSearchParams();
  const collectionSlug = searchParams.get("collection") ?? undefined;

  return (
    <GalleryContents collectionSlug={collectionSlug}>
      <GalleryFooterNav />
    </GalleryContents>
  );
}

export default function GalleryRouteContents() {
  return (
    <section
      data-testid="GalleryView"
      className="flex h-svh w-full flex-col items-center overflow-hidden border border-white/20 p-6 shadow-inner backdrop-blur-xs"
    >
      <Suspense fallback={null}>
        <GalleryRouteContent />
      </Suspense>
    </section>
  );
}
