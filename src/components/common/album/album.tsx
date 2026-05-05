"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import InternalLink from "../internalLink";
import FallbackImage from "../fallbackImage";
import { MediaType, useImages } from "@/hooks/useImages";


const STORAGE_BASE_URL = (
  process.env.NEXT_PUBLIC_GCP_STORAGE_URL ?? ""
).replace(/\/$/, "");

type AlbumCard = {
  id: string;
  url: string;
  title: string;
  alt: string;
  slug: string | null;
  isExternal?: boolean;
};

type OrderedAlbumCard = AlbumCard & { order: number };

const getPublicImageUrl = (path?: string | null) => {
  if (!path) return null;
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return `${STORAGE_BASE_URL}${path}`;
};

const toGalleryQuerySlug = (collectionSlug: string) =>
  collectionSlug.replace(/^gallery-/, "");

const buildAlbumCards = (medias: MediaType[] = []): AlbumCard[] => {
  const collections = new Map<
    string,
    NonNullable<MediaType["collection"]>
  >();

  medias.forEach((media) => {
    if (
      media.collection &&
      (media.collection.location === "GALLERY" || media.location === "GALLERY")
    ) {
      collections.set(media.collection.slug, media.collection);
    }
  });

  const collectionCards = [...collections.values()]
    .reduce<OrderedAlbumCard[]>((cards, collection) => {
      const thumbnailUrl = getPublicImageUrl(collection.thumbnailUrl);

      if (!thumbnailUrl || collection.location !== "GALLERY") return cards;

      cards.push({
        id: collection.id,
        url: thumbnailUrl,
        title: collection.title,
        alt: collection.title,
        slug: toGalleryQuerySlug(collection.slug),
        order: collection.orderIndex,
      });

      return cards;
    }, [])
    .sort((a, b) => a.order - b.order);


  const instagramImage = medias.find(
    (media) => media.location === "ALBUM" && media.type === "IMAGE",
  );
  const instagramCard: AlbumCard | null = instagramImage
    ? {
      id: instagramImage.id,
      url: getPublicImageUrl(instagramImage.publicUrl) ?? "",
      title: "INSTAGRAM",
      alt: instagramImage.altText ?? instagramImage.title ?? "INSTAGRAM QR",
      slug: null,
      isExternal: true,
    }
    : null;

  return [...collectionCards, instagramCard].filter(
    (card): card is AlbumCard => Boolean(card?.url),
  );
};

const albumSkeletonCards = Array.from({ length: 6 }, (_, index) => index);

function Card({
  card,
  index,
  total,
  scrollYProgress,
  isMobile,
}: {
  card: AlbumCard;
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
  isMobile: boolean;
}) {
  const isInstagram = card.isExternal;
  const position = total > 1 ? index / (total - 1) : 0;
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
        md:h-[65vh] md:max-h-[600px] md:w-87.5 md:rounded-3xl md:shadow-2xl md:p-6 md:justify-start transition-all duration-300
      `}
    >
      {/* 상단 제목 (호버 시 데스크탑에서 페이드 아웃) */}
      <p className={`text-black text-2xl md:text-xl font-bold mb-4 md:mb-6 drop-shadow-md md:drop-shadow-none z-10 transition-opacity duration-300 ${!isInstagram ? "md:group-hover:opacity-0" : ""}`}>
        {card.title}
      </p>

      <div className={`relative flex-1 w-full h-fit overflow-hidden rounded-lg bg-gray-100 transition-all duration-300 ${!isInstagram ? "group-hover:ring-2 group-hover:ring-black/50" : ""}`}>
        <FallbackImage
          src={card.url}
          alt={card.alt}
          fill
          className="object-contain"
          sizes="(max-width: 345px) 100vw, 33vw"
          priority={index < 2} // 상위 이미지는 우선 로딩
          placeholder="empty"
        />

        {/* 데스크탑 호버 오버레이 (이미지 어둡게 + 흰색 글자 + CTA 버튼) */}
        {!isMobile && !isInstagram && (
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

  // 링크 URL 결정 (slug가 있으면 쿼리 스트링 추가, 없으면 전체 갤러리)
  const href = card.slug ? `/gallery?collection=${card.slug}` : "/gallery";

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
  const { data: cards = [], isLoading } = useImages(buildAlbumCards);

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
        ${isMobile ? "relative flex flex-col pb-safe" : "sticky top-0 h-screen flex items-center overflow-hidden z-10"}
      `}
      >
        <motion.div
          // 모바일에서는 x축 이동 없음 (0), 데스크탑은 x 변수 적용
          style={{ x: isMobile ? 0 : x }}
          className={`
            flex 
            ${isMobile ? "flex-col w-full " : "flex-row gap-40 items-center"}
          `}
        >
          {isLoading
            ? albumSkeletonCards.map((index) => (
              <div
                key={index}
                className={`
                    ${isMobile ? "h-[70vh] w-full flex items-center justify-center p-4 border-b border-gray-100 last:border-0" : ""}
                  `}
              >
                <div
                  className="
                      h-full w-full animate-pulse bg-white/20 backdrop-blur-xl border border-white/30
                      md:h-[65vh] md:max-h-[600px] md:w-87.5 md:rounded-3xl md:shadow-2xl md:p-6
                    "
                />
              </div>
            ))
            : cards.map((card, index) => (
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
