"use client";

import { useImages } from "@/hooks/useImages";
import { ScrollytellingSection } from "../scrollytelling/ScrollytellingSection";
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
    <ScrollytellingSection stageClassName="flex items-center z-10">
      {(scrollYProgress) => (
        <AlbumHorizontalScene
          cards={cards}
          isLoading={isLoading}
          scrollYProgress={scrollYProgress}
        />
      )}
    </ScrollytellingSection>
  );
}
