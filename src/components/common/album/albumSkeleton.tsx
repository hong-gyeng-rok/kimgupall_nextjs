import type { AlbumLayoutMode } from "@/types/album";

const albumSkeletonCards = Array.from({ length: 6 }, (_, index) => index);

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
            className="
              h-full w-full animate-pulse bg-white/20 backdrop-blur-xl border border-white/30
              md:h-[65vh] md:max-h-[600px] md:w-87.5 md:rounded-3xl md:shadow-2xl md:p-6
            "
          />
        </div>
      ))}
    </>
  );
}
