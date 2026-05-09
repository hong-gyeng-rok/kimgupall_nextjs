import type { AlbumCard } from "@/types/album";
import { AlbumSkeleton } from "./albumSkeleton";
import { AlbumStackedCard } from "./AlbumStackedCard";

type AlbumStackedSceneProps = {
  cards: AlbumCard[];
  isLoading: boolean;
};

export function AlbumStackedScene({
  cards,
  isLoading,
}: AlbumStackedSceneProps) {
  return (
    <article className="relative w-full h-auto">
      <div className="w-full relative flex flex-col pb-safe">
        <div className="flex flex-col w-full">
          {isLoading ? (
            <AlbumSkeleton layoutMode="stacked" />
          ) : (
            cards.map((card, index) => (
              <div
                key={card.id}
                className="h-[70vh] w-full flex items-center justify-center p-4 border-b border-gray-100 last:border-0"
              >
                <AlbumStackedCard card={card} index={index} />
              </div>
            ))
          )}
        </div>
      </div>
    </article>
  );
}
