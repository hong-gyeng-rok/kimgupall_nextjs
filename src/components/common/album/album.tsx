"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useImages } from "@/hooks/useImages";
import { AlbumCardItem } from "./albumCard";
import { buildAlbumCards } from "./albumData";
import { AlbumSkeleton } from "./albumSkeleton";
import { useAlbumLayoutMode } from "./useAlbumLayoutMode";

export default function Album() {
  const targetRef = useRef<HTMLDivElement>(null);
  const layoutMode = useAlbumLayoutMode();
  const isStackedLayout = layoutMode === "stacked";
  const { data: cards = [], isLoading } = useImages(buildAlbumCards);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["25%", "-60%"]);

  return (
    <article
      ref={targetRef}
      className={`relative w-full ${isStackedLayout ? "h-auto" : "h-[300vh]"}`}
    >
      {/* 
        Container 
        - Mobile: Normal Flow (relative), Vertical Stack
        - Desktop: Sticky, Horizontal Flow
      */}
      <div
        className={`
        w-full
        ${isStackedLayout ? "relative flex flex-col pb-safe" : "sticky top-0 h-screen flex items-center overflow-hidden z-10"}
      `}
      >
        <motion.div
          // 모바일에서는 x축 이동 없음 (0), 데스크탑은 x 변수 적용
          style={{ x: isStackedLayout ? 0 : x }}
          className={`
            flex 
            ${isStackedLayout ? "flex-col w-full " : "flex-row gap-40 items-center"}
          `}
        >
          {isLoading
            ? <AlbumSkeleton layoutMode={layoutMode} />
            : cards.map((card, index) => (
              <div
                key={card.id}
                className={`
                          ${isStackedLayout ? "h-[70vh] w-full flex items-center justify-center p-4 border-b border-gray-100 last:border-0" : ""}
                        `}
              >
                <AlbumCardItem
                  card={card}
                  index={index}
                  total={cards.length}
                  scrollYProgress={scrollYProgress}
                  layoutMode={layoutMode}
                />
              </div>
            ))}
        </motion.div>
      </div>
    </article>
  );
}
