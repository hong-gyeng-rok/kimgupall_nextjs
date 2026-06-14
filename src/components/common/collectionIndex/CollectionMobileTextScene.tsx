import type { AlbumCard } from "@/types/album";
import InternalLink from "../internalLink";
import { getCollectionIndexHref } from "./collectionIndexLink";

type CollectionMobileTextSceneProps = {
  cards: AlbumCard[];
  isLoading: boolean;
};

function CollectionMobileTextSkeleton() {
  return (
    <div className="flex min-h-[100svh] w-full flex-col justify-center px-4 py-8 md:px-5 md:py-10">
      <div className="mb-8 border-b border-white/15 pb-5">
        <div className="mb-3 h-3 w-32 animate-pulse bg-white/10" />
        <div className="h-10 w-64 animate-pulse bg-white/10" />
      </div>
      <div>
        {Array.from({ length: 6 }, (_, index) => (
          <div
            key={index}
            className="flex min-h-[58px] items-center justify-between border-b border-white/10 md:min-h-[64px]"
          >
            <div className="h-3 w-8 animate-pulse bg-white/10" />
            <div className="h-5 w-44 animate-pulse bg-white/10" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function CollectionMobileTextScene({
  cards,
  isLoading,
}: CollectionMobileTextSceneProps) {
  if (isLoading) return <CollectionMobileTextSkeleton />;

  return (
    <section
      className="flex min-h-[100svh] w-full flex-col justify-center px-4 py-8 md:px-5 md:py-10"
      aria-label="컬렉션 인덱스"
    >
      <div className="mb-8 border-b border-white/15 pb-5">
        <p className="mb-2 text-[10px] font-semibold tracking-[0.28em] text-white/40 md:tracking-[0.32em]">
          전시 컬렉션
        </p>
        <h2 className="text-3xl font-black leading-none tracking-[-0.05em] text-white md:text-4xl">
          컬렉션별 전시 보기
        </h2>
      </div>

      <ul className="w-full">
        {cards.map((card, index) => {
          const rowClassName = "group flex min-h-[58px] w-full items-center justify-between gap-3 border-b border-white/10 py-3 text-left text-white transition-all duration-200 active:scale-[0.99] active:bg-white/[0.04] md:min-h-[64px] md:gap-4 md:py-4";
          const rowContent = (
            <>
              <span className="w-8 shrink-0 text-[10px] font-medium tabular-nums tracking-[0.22em] text-white/35">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="min-w-0 flex-1 text-lg font-medium leading-none tracking-[-0.04em] text-white/85 md:text-xl">
                {card.title}
              </span>
              <span className="shrink-0 text-[10px] font-medium uppercase tracking-[0.16em] text-white/35">
                {card.isExternal ? "" : "보기 →"}
              </span>
            </>
          );

          if (card.isExternal) {
            return (
              <li key={card.id} className={rowClassName}>
                {rowContent}
              </li>
            );
          }

          return (
            <li key={card.id}>
              <InternalLink
                href={getCollectionIndexHref(card)}
                className={rowClassName}
                ariaLabel={`${card.title} 작품 보기`}
              >
                {rowContent}
              </InternalLink>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
