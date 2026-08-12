"use client";

import { AnimatePresence, motion } from "framer-motion";
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
  const [activeIndex, setActiveIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState<1 | -1>(1);

  if (isLoading) return <CollectionHoverPreviewSkeleton />;
  if (cards.length === 0) return null;

  const activeCard = cards[Math.min(activeIndex, cards.length - 1)];
  const activePage = Math.min(activeIndex, cards.length - 1);

  const moveActiveCard = (direction: -1 | 1) => {
    setSlideDirection(direction);
    setActiveIndex((currentIndex) =>
      (currentIndex + direction + cards.length) % cards.length,
    );
  };

  const selectActiveCard = (nextIndex: number) => {
    if (nextIndex === activePage) return;

    setSlideDirection(nextIndex > activePage ? 1 : -1);
    setActiveIndex(nextIndex);
  };

  return (
    <section
      className="grid h-full w-full grid-cols-[72px_minmax(280px,0.9fr)_minmax(360px,1.1fr)_72px] items-center gap-6 px-6 lg:grid-cols-[88px_minmax(340px,0.9fr)_minmax(420px,1.1fr)_88px] lg:gap-8 lg:px-10"
      aria-label="컬렉션 인덱스"
    >
      <div className="flex h-full items-center justify-center">
        <button
          type="button"
          className="flex h-16 w-16 shrink-0 touch-manipulation items-center justify-center rounded-full border border-white bg-white text-4xl font-black leading-none text-black shadow-xl transition-all duration-300 active:scale-95 lg:h-18 lg:w-18"
          onClick={() => moveActiveCard(-1)}
          aria-label="이전 컬렉션 보기"
        >
          ‹
        </button>
      </div>

      <div className="flex h-full flex-col items-center justify-center gap-6">
        <div className="relative aspect-[4/5] w-full max-w-[380px] overflow-hidden bg-white/[0.03] transition-all duration-500 ease-out lg:max-w-[440px]">
          <AnimatePresence initial={false} custom={slideDirection} mode="popLayout">
            <motion.div
              key={activeCard.id}
              custom={slideDirection}
              initial={(direction: 1 | -1) => ({
                x: direction > 0 ? 80 : -80,
                opacity: 0,
                scale: 0.98,
              })}
              animate={{ x: 0, opacity: 1, scale: 1 }}
              exit={(direction: 1 | -1) => ({
                x: direction > 0 ? -80 : 80,
                opacity: 0,
                scale: 0.98,
              })}
              transition={{ duration: 0.42, ease: "easeOut" }}
              className="absolute inset-0"
            >
              <FallbackImage
                src={activeCard.url}
                alt={activeCard.alt}
                fill
                className="object-cover"
                sizes={PREVIEW_IMAGE_SIZES}
                quality={activeCard.isExternal ? 85 : 65}
                priority={false}
                placeholder="empty"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex items-center gap-3 text-xs font-semibold tracking-[0.24em] text-white/45">
          <span>{String(activePage + 1).padStart(2, "0")}</span>
          <span className="h-px w-10 bg-white/25" />
          <span>{String(cards.length).padStart(2, "0")}</span>
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

        <ul className="w-full">
          {cards.map((card, index) => {
            const isActive = activePage === index;
            const rowClassName = `relative z-10 flex min-h-[64px] w-full cursor-pointer touch-manipulation items-center justify-between gap-4 border-b py-3 text-left transition-all duration-300 ease-out active:scale-[0.99] lg:min-h-[82px] lg:gap-6 lg:py-4 ${isActive
              ? "border-white/35 bg-white/[0.03] text-white"
              : "border-white/10 text-white/35"
              }`;

            return (
              <li key={card.id} className="relative">
                <button
                  type="button"
                  className={rowClassName}
                  onClick={() => selectActiveCard(index)}
                  aria-pressed={isActive}
                >
                  <span className={`w-8 shrink-0 text-xs font-medium tabular-nums tracking-[0.2em] transition-colors duration-300 lg:w-10 lg:tracking-[0.24em] ${isActive ? "text-white/60" : "text-white/35"}`}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className={`ml-auto flex min-w-0 items-center justify-end gap-2 text-right transition-all duration-500 ease-out lg:gap-3 ${isActive ? "translate-x-[-10px] lg:translate-x-[-14px]" : "translate-x-0"}`}>
                    <span
                      className={`relative h-7 w-7 shrink-0 transition-all duration-500 ease-out lg:h-9 lg:w-9 ${isActive
                        ? "translate-x-0 opacity-100"
                        : "-translate-x-2 opacity-0"
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
                    <span className={`min-w-0 text-2xl leading-none tracking-[-0.04em] transition-all duration-300 lg:text-5xl ${isActive ? "font-black text-white" : "font-medium"}`}>
                      {card.title}
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>

        {activeCard.isExternal ? null : (
          <div className="mt-8 flex justify-end">
            <InternalLink
              href={getCollectionIndexHref(activeCard)}
              className="flex touch-manipulation items-center justify-center rounded-full border border-white bg-white px-10 py-3 font-mono text-xl font-bold text-black shadow-xl transition-all duration-300 active:scale-95"
              ariaLabel={`${activeCard.title} 작품 보기`}
            >
              작품 보기
            </InternalLink>
          </div>
        )}
      </div>

      <div className="flex h-full items-center justify-center">
        <button
          type="button"
          className="flex h-16 w-16 shrink-0 touch-manipulation items-center justify-center rounded-full border border-white bg-white text-4xl font-black leading-none text-black shadow-xl transition-all duration-300 active:scale-95 lg:h-18 lg:w-18"
          onClick={() => moveActiveCard(1)}
          aria-label="다음 컬렉션 보기"
        >
          ›
        </button>
      </div>
    </section>
  );
}
