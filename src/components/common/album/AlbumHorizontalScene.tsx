import type { AlbumCard } from "@/types/album";
import { AlbumSkeleton } from "./albumSkeleton";
import { AlbumHorizontalCard } from "./AlbumHorizontalCard";

type AlbumHorizontalSceneProps = {
  cards: AlbumCard[];
  isLoading: boolean;
};

export function AlbumHorizontalScene({
  cards,
  isLoading,
}: AlbumHorizontalSceneProps) {
  return (
    <div className="grid h-full w-full max-w-6xl grid-cols-3 grid-rows-2 gap-5 lg:gap-6">
      {isLoading ? (
        <AlbumSkeleton layoutMode="horizontal" />
      ) : (
        cards.map((card, index) => (
          <div key={card.id} className="min-h-0">
            <AlbumHorizontalCard card={card} index={index} />
          </div>
        ))
      )}
    </div>
  );
}
