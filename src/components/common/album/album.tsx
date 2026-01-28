"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import InternalLink from "../internalLink";
import FallbackImage from "../fallbackImage";

import runner from "../../../../public/sampleImages/runner.jpg";
import yacha from "../../../../public/sampleImages/yacha.jpg";
import wave from "../../../../public/sampleImages/ON_THE_WAVE 1.jpg";
import baseball from "../../../../public/sampleImages/baseball.jpg";
import newyear from "../../../../public/sampleImages/2025years.jpg";
import instaQR from "../../../../public/sampleImages/instagramLink.png";

const cards = [
  {
    id: 1,
    url: yacha,
    title: "야차 시리즈",
    alt: "YACHA",
    slug: "gallery-yacha",
  },
  {
    id: 2,
    url: runner,
    title: "빈칸 전시회",
    alt: "RUNNER",
    slug: "gallery-binkan",
  },
  {
    id: 3,
    url: wave,
    title: "2025 서울 일러스트 페어",
    alt: "ON THE WAVE",
    slug: "gallery-seoul",
  },
  {
    id: 4,
    url: baseball,
    title: "2024 서울 일러스트 페어",
    alt: "BASEBALL",
    slug: "gallery-binkan",
  },
  { id: 5, url: newyear, title: "모든 작품", alt: "2025 NEW YEAR", slug: "all" },
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
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      style={{ scale: isMobile ? 1 : scale, opacity: isMobile ? 1 : opacity }}
      className={`
        relative flex flex-col items-center justify-center bg-white/20 backdrop-blur-xl border border-white/30 group
        /* Mobile: Full Screen, No Shadow/Round initially */
        h-full w-full 
        /* Desktop: Card Style */
        md:h-[65vh] md:max-h-150 md:w-87.5 md:rounded-3xl md:shadow-2xl md:p-6 md:justify-start transition-all duration-300
      `}
    >
      {/* 상단 제목 (호버 시 데스크탑에서 페이드 아웃) */}
      <p className="text-black text-2xl md:text-xl font-bold mb-4 md:mb-6 drop-shadow-md md:drop-shadow-none z-10 md:group-hover:opacity-0 transition-opacity duration-300">
        {card.title}
      </p>

      <div className="relative flex-1 w-full h-fit overflow-hidden rounded-lg bg-gray-100 group-hover:ring-2 group-hover:ring-black/50 transition-all duration-300">
        <FallbackImage
          src={card.url}
          alt={card.alt}
          fill
          className="object-contain"
          sizes="(max-width: 345px) 100vw, 33vw"
          placeholder="blur" // 로컬 이미지 블러 처리
        />

        {/* 데스크탑 호버 오버레이 (이미지 어둡게 + 흰색 글자 + CTA 버튼) */}
        {!isMobile && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center gap-4 z-20">
            <p className="text-white text-2xl font-bold px-4 text-center translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
              {card.title}
            </p>
            <div className="flex items-center gap-2 px-6 py-2 border border-white/50 rounded-full text-white text-sm font-medium tracking-wider hover:bg-white hover:text-black transition-colors duration-300 translate-y-4 group-hover:translate-y-0 delay-75">
              <span>VIEW {card.title}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                />
              </svg>
            </div>
          </div>
        )}

        {/* 모바일 전용 CTA 버튼 (우측 하단) */}
        {isMobile && !isInstagram && (
          <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-md text-white px-4 py-2 rounded-full flex items-center gap-2 shadow-lg z-20 pointer-events-none">
            <span className="text-xs font-bold">VIEW {card.title}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-3 h-3"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
              />
            </svg>
          </div>
        )}
      </div>
    </motion.div>
  );

  const href =
    card.slug === "all"
      ? "/gallery"
      : `/gallery?collection=${card.slug}`;

  return isInstagram ? (
    cardContent
  ) : (
    <InternalLink href={href} className="w-full h-full block">
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

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  return (
    <article
      ref={targetRef}
      className={`relative w-full ${isMobile ? "h-auto" : "h-[300vh]"}`}
    >
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
            <div
              key={card.id}
              className={`
                          ${isMobile ? "h-[70vh] w-full flex items-center justify-center p-4 border-b border-gray-100 last:border-0" : ""}
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
          ))}
        </motion.div>
      </div>
    </article>
  );
}
