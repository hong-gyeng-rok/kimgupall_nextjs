"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import Image from "next/image";
import InternalLink from "../internalLink";

import runner from "../../../../public/sampleImages/runner.jpg";
import yacha from "../../../../public/sampleImages/yacha.jpg";
import wave from "../../../../public/sampleImages/ON_THE_WAVE 1.jpg";
import baseball from "../../../../public/sampleImages/baseball.jpg";
import newyear from "../../../../public/sampleImages/2025years.jpg";
import instaQR from "../../../../public/sampleImages/instagramLink.png";

const cards = [
  { id: 1, url: yacha, title: "야차 시리즈", alt: "YACHA" },
  { id: 2, url: runner, title: "빈칸 전시회", alt: "RUNNER" },
  { id: 3, url: wave, title: "2025 서울 일러스트 페어", alt: "ON THE WAVE" },
  { id: 4, url: baseball, title: "2024 서울 일러스트 페어", alt: "BASEBALL" },
  { id: 5, url: newyear, title: "모든 작품", alt: "2025 NEW YEAR" },
  { id: 6, url: instaQR, title: "INSTAGRAM", alt: "INSTAGRAM QR" },
];

function Card({
  card,
  index,
  total,
  scrollYProgress,
  isMobile,
}: {
  card: (typeof cards)[0];
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
  isMobile: boolean;
}) {
  const isInstagram = card.alt === "INSTAGRAM QR";
  const position = index / (total - 1);
  const range = 1 / total;
  const inputRange = [position - range, position, position + range];

  // 데스크탑 전용 애니메이션 (모바일은 1로 고정)
  const scale = useTransform(
    scrollYProgress,
    inputRange,
    isMobile ? [1, 1, 1] : [0.8, 1.2, 0.8],
  );
  const opacity = useTransform(
    scrollYProgress,
    inputRange,
    isMobile ? [1, 1, 1] : [0.3, 1, 0.3],
  );

  const cardContent = (
    <motion.div
      style={{ scale, opacity }}
      className={`
        relative flex flex-col items-center justify-center bg-white group
        /* Mobile: Full Screen, No Shadow/Round initially */
        h-full w-full 
        /* Desktop: Card Style */
        md:h-150 md:w-87.5 md:rounded-xl md:shadow-xl md:p-4 md:justify-start transition-all duration-300
      `}
    >
      {/* 상단 제목 (호버 시 데스크탑에서 페이드 아웃) */}
      <p className="text-black text-2xl md:text-xl font-bold mb-4 md:mb-4 drop-shadow-sm md:drop-shadow-none z-10 md:group-hover:opacity-0 transition-opacity duration-300">
        {card.title}
      </p>

      <div className="relative flex-1 w-full h-fit overflow-hidden rounded-lg">
        <Image
          src={card.url}
          alt={card.alt}
          fill
          className="object-contain"
          sizes="(max-width: 345px) 100vw, 33vw"
          priority={index < 2} // 상위 이미지는 우선 로딩
        />
        
        {/* 데스크탑 호버 오버레이 (이미지 어둡게 + 흰색 글자) */}
        {!isMobile && (
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20">
            <p className="text-white text-2xl font-bold px-4 text-center">
              {card.title}
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );

  return isInstagram ? (
    cardContent
  ) : (
    <InternalLink href="/gallery" className="w-full h-full block">
      {cardContent}
    </InternalLink>
  );
}

export default function Album() {
  const targetRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["25%", "-60%"]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);

    // 스크롤 스냅 설정
    document.documentElement.style.scrollSnapType = "y proximity"; // 감옥 방지용 proximity 추천
    document.documentElement.style.scrollBehavior = "smooth";

    return () => {
      window.removeEventListener("resize", checkMobile);
      document.documentElement.style.scrollSnapType = "";
      document.documentElement.style.scrollBehavior = "";
    };
  }, []);

  return (
    <article
      ref={targetRef}
      className={`relative w-full ${isMobile ? "h-auto snap-y snap-mandatory" : "h-[600vh]"}`}
    >
      {/* [Desktop] Ghost Snap Points */}
      {!isMobile && (
        <div className="absolute inset-0 pointer-events-none z-0">
          {cards.map((_, i) => (
            <div
              key={i}
              className="w-full h-screen snap-start snap-always"
              style={{
                top: `${(i / (cards.length - 1)) * 500}vh`,
                position: "absolute",
              }}
            />
          ))}
        </div>
      )}

      {/* 
        Container 
        - Mobile: Normal Flow (relative), Vertical Stack
        - Desktop: Sticky, Horizontal Flow
      */}
      <div
        className={`
        w-full
        ${isMobile ? "relative flex flex-col" : "sticky top-0 h-screen flex items-center overflow-hidden z-10"}
      `}
      >
        <motion.div
          // 모바일에서는 x축 이동 없음 (0), 데스크탑은 x 변수 적용
          style={{ x: isMobile ? 0 : x }}
          className={`
            flex 
            ${isMobile ? "flex-col w-full" : "flex-row gap-40 items-center"}
          `}
        >
          {cards.map((card, index) => (
            // Wrapper for Mobile Snap
            <div
              key={card.id}
              className={`
                          ${isMobile ? "h-[70vh] w-full snap-center flex items-center justify-center p-4 border-b border-gray-100 last:border-0" : ""}
                        `}
            >
              <Card
                card={card}
                index={index}
                total={cards.length}
                scrollYProgress={scrollYProgress}
                isMobile={isMobile}
              />
            </div>
          ))}{" "}
        </motion.div>
      </div>
    </article>
  );
}
