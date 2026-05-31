"use client";

import { useImages } from "@/hooks/useImages";
import { AlbumHorizontalScene } from "./AlbumHorizontalScene";
import { AlbumStackedScene } from "./AlbumStackedScene";
import { buildAlbumCards } from "./albumData";
import { useAlbumLayoutMode } from "./useAlbumLayoutMode";

export default function Album() {
  const layoutMode = useAlbumLayoutMode();
  const isStackedLayout = layoutMode === "stacked";
  const { data: cards = [], isLoading } = useImages(buildAlbumCards);

  if (isStackedLayout) {
    return <AlbumStackedScene cards={cards} isLoading={isLoading} />;
  }

  return (
    <section className="relative z-10 flex h-dvh w-full items-center justify-center overflow-hidden px-6 py-12">
      <AlbumHorizontalScene cards={cards} isLoading={isLoading} />
    </section>
  );
}
