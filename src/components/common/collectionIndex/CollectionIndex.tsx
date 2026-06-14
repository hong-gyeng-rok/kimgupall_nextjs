"use client";

import { useImages } from "@/hooks/useImages";
import { buildAlbumCards } from "../album/albumData";
import CollectionHoverPreviewScene from "./CollectionHoverPreviewScene";
import CollectionMobileTextScene from "./CollectionMobileTextScene";

const hiddenCollectionTitles = new Set(["컨셉아트", "INSTAGRAM"]);

export default function CollectionIndex() {
  const { data: cards = [], isLoading } = useImages(buildAlbumCards);
  const visibleCards = cards.filter((card) => !hiddenCollectionTitles.has(card.title));

  return (
    <section className="relative z-10 min-h-full w-full bg-black text-white md:h-full md:overflow-hidden">
      <div className="hidden h-full md:block">
        <CollectionHoverPreviewScene cards={visibleCards} isLoading={isLoading} />
      </div>
      <div className="min-h-[100svh] md:hidden">
        <CollectionMobileTextScene cards={visibleCards} isLoading={isLoading} />
      </div>
    </section>
  );
}
