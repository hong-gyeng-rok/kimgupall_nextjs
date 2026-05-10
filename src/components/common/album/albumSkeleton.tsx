import type { AlbumLayoutMode } from "@/types/album";
import { ALBUM_DESKTOP_CARD_FRAME_CLASS } from "./albumLayout";

export const ALBUM_SKELETON_CARD_COUNT = 6;

const albumSkeletonCards = Array.from(
  { length: ALBUM_SKELETON_CARD_COUNT },
  (_, index) => index,
);

type AlbumSkeletonProps = {
  layoutMode: AlbumLayoutMode;
};

export function AlbumSkeleton({ layoutMode }: AlbumSkeletonProps) {
  const isStackedLayout = layoutMode === "stacked";

  return (
    <>
      {albumSkeletonCards.map((index) => (
        <div
          key={index}
          className={`
            ${isStackedLayout ? "h-[70vh] w-full flex items-center justify-center p-4 border-b border-gray-100 last:border-0" : ""}
          `}
        >
          <div
            className={`
              h-full w-full animate-pulse bg-white/20 backdrop-blur-xl border border-white/30
              ${ALBUM_DESKTOP_CARD_FRAME_CLASS}
            `}
          />
        </div>
      ))}
    </>
  );
}
