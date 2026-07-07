"use client";

import Image from "next/image";
import { useState } from "react";
import type { AlbumCard } from "@/types/album";
import FallbackImage from "../fallbackImage";
import InternalLink from "../internalLink";
import { getCollectionIndexHref } from "./collectionIndexLink";

type CollectionHoverPreviewSceneProps = {
  cards: AlbumCard[];
  isLoading: boolean;
};

const PREVIEW_IMAGE_SIZES = "(max-width: 1023px) 42vw, 440px";

function CollectionHoverPreviewSkeleton() {
  return (
    <div className="grid h-full w-full grid-cols-[minmax(0,0.9fr)_minmax(360px,1.1fr)] items-center gap-8 px-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(420px,1.1fr)] lg:gap-12 lg:px-14">
      <div className="flex justify-center">
        <div className="aspect-[4/5] w-full max-w-[320px] animate-pulse bg-white/[0.06] lg:max-w-[360px]" />
      </div>
      <div className="space-y-0">
        {Array.from({ length: 6 }, (_, index) => (
          <div
            key={index}
            className="flex min-h-[64px] items-center justify-between border-b border-white/10 lg:min-h-[72px]"
          >
            <div className="h-4 w-8 animate-pulse bg-white/10" />
            <div className="h-8 w-2/3 animate-pulse bg-white/10" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function CollectionHoverPreviewScene({
  cards,
  isLoading,
}: CollectionHoverPreviewSceneProps) {
  const [activeCard, setActiveCard] = useState<AlbumCard | null>(null);

  if (isLoading) return <CollectionHoverPreviewSkeleton />;

  return (
    <section
      className="grid h-full w-full min-w-0 grid-cols-[minmax(0,0.9fr)_minmax(360px,1.1fr)] items-center gap-8 overflow-x-clip px-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(420px,1.1fr)] lg:gap-12 lg:px-14"
      onMouseLeave={() => setActiveCard(null)}
      aria-label="컬렉션 인덱스"
    >
      <div className="flex h-full items-center justify-center">
        <div
          className={`relative aspect-[4/5] w-full max-w-[380px] overflow-hidden bg-white/[0.03] transition-all duration-500 ease-out lg:max-w-[440px] ${activeCard
            ? "translate-y-0 scale-100 opacity-100"
            : "translate-y-4 scale-95 opacity-0"
            }`}
        >
          {activeCard ? (
            <FallbackImage
              key={activeCard.id}
              src={activeCard.url}
              alt={activeCard.alt}
              fill
              className="object-cover"
              sizes={PREVIEW_IMAGE_SIZES}
              quality={activeCard.isExternal ? 85 : 65}
              priority={false}
              placeholder="empty"
            />
          ) : null}
        </div>
      </div>

      <div className="flex min-h-0 flex-col justify-center">
        <div className="mb-8 flex items-end justify-end border-b border-white/15 pb-5 text-right">
          <div>
            <p className="mb-2 text-xs font-semibold tracking-[0.35em] text-white/40">
              전시 컬렉션
            </p>
            <h2 className="text-4xl font-black leading-none text-white lg:text-7xl">
              컬렉션별 전시 보기
            </h2>
          </div>
        </div>

        <ul className="w-full min-w-0 overflow-x-clip">
          {cards.map((card, index) => {
            const isActive = activeCard?.id === card.id;
            const hasActive = Boolean(activeCard);
            const rowItemClassName = "group relative";
            const rowHoverAreaClassName = "absolute inset-y-0 left-0 right-0 z-0 cursor-pointer";
            const rowClassName = `relative z-10 flex min-h-[64px] w-full cursor-pointer items-center justify-between gap-4 border-b border-white/10 py-3 text-left transition-all duration-300 ease-out group-hover:border-white/35 group-hover:bg-white/[0.03] lg:min-h-[82px] lg:gap-6 lg:py-4 ${isActive
              ? "text-white"
              : hasActive
                ? "text-white/35"
                : "text-white/70"
              }`;
            const rowContent = (
              <>
                <span className="w-8 shrink-0 text-xs font-medium tabular-nums tracking-[0.2em] text-white/35 transition-colors duration-300 group-hover:text-white/60 lg:w-10 lg:tracking-[0.24em]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="ml-auto flex min-w-0 items-center justify-end gap-2 text-right transition-all duration-500 ease-out group-hover:translate-x-[-10px] lg:gap-3 lg:group-hover:translate-x-[-14px]">
                  <span
                    className={`relative h-7 w-7 shrink-0 transition-all duration-500 ease-out lg:h-9 lg:w-9 ${isActive
                      ? "translate-x-0 opacity-100"
                      : "-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                      }`}
                    aria-hidden="true"
                  >
                    <Image
                      src="/Arrow-right-down.svg"
                      alt=""
                      fill
                      className="object-contain"
                      sizes="36px"
                    />
                  </span>
                  <span className="min-w-0 text-2xl font-medium leading-none tracking-[-0.04em] transition-all duration-300 group-hover:font-black group-hover:text-white lg:text-5xl">
                    {card.title}
                  </span>
                  <span
                    className={`inline-block max-w-0 shrink-0 overflow-hidden whitespace-nowrap text-base font-medium uppercase tracking-[0.14em] opacity-0 transition-all duration-500 ease-out group-hover:max-w-24 group-hover:font-bold group-hover:opacity-100 lg:text-xl lg:tracking-[0.18em] lg:group-hover:max-w-32 ${isActive
                      ? "max-w-32 translate-x-0 opacity-100"
                      : "translate-x-2 group-hover:translate-x-0"
                      }`}
                  >
                    작품 보기
                  </span>
                </span>
              </>
            );

            if (card.isExternal) {
              return (
                <li
                  key={card.id}
                  className={rowItemClassName}
                  onMouseEnter={() => setActiveCard(card)}
                >
                  <span className={rowHoverAreaClassName} aria-hidden="true" />
                  <div className={rowClassName}>
                    {rowContent}
                  </div>
                </li>
              );
            }

            return (
              <li
                key={card.id}
                className={rowItemClassName}
                onMouseEnter={() => setActiveCard(card)}
              >
                <span className={rowHoverAreaClassName} aria-hidden="true" />
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
      </div>
    </section>
  );
}
