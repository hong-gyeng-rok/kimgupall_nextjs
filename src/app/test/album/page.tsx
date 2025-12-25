"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import Image from "next/image";

import MainBg from "@/components/layout/mainBg";

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

// 개별 카드 컴포넌트
function Card({
  card,
  index,
  total,
  scrollYProgress,
}: {
  card: (typeof cards)[0];
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
}) {
  const position = index / (total - 1); // 이 카드의 중앙 시점 (0 ~ 1)
  const range = 1 / total; // 반응 범위

  // 3단계 변환: [진입 시작, 중앙(최대), 퇴장 끝] - 부드러운 곡선
  const inputRange = [position - range, position, position + range];

  // 중앙을 지나갈 때 부드럽게 커졌다가 작아짐
  const scale = useTransform(scrollYProgress, inputRange, [1, 1.15, 1]);
  const opacity = useTransform(scrollYProgress, inputRange, [0.6, 1, 0.6]);

  const boxShadow = useTransform(scrollYProgress, inputRange, [
    "0px 5px 10px rgba(0,0,0,0.1)",
    "0px 20px 50px rgba(0,0,0,0.6)", // 중앙에서 그림자 강조
    "0px 5px 10px rgba(0,0,0,0.1)",
  ]);

  return (
    <motion.div
      style={{
        scale,
        boxShadow,
        opacity,
        zIndex: scale.get() > 1.05 ? 10 : 1, // 커질 때 위로 올라옴
      }}
      className="group relative h-[600px] w-[350px] flex flex-col items-center flex-shrink-0 bg-white rounded-xl p-4 transition-colors"
    >
      <p className="text-black text-xl font-bold mb-4 w-full text-center">
        {card.title}
      </p>

      <div className="relative flex-1 w-full overflow-hidden rounded-lg">
        <Image
          src={card.url}
          alt={card.alt}
          fill
          className="object-contain"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-end p-6">
          <h3 className="text-2xl font-bold text-white translate-y-4 transition-transform duration-300 group-hover:translate-y-0 font-chosunGoosu">
            {card.alt}
          </h3>
        </div>
      </div>
    </motion.div>
  );
}

export default function AlbumTestPage() {
  const targetRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  // 설정값
  const START_X = 25; // 시작 위치 (%)
  const END_X = -60; // 끝 위치 (%)

  // 단순 선형 이동: 스크롤에 따라 멈춤 없이 부드럽게 이동
  const x = useTransform(scrollYProgress, [0, 1], [`${START_X}%`, `${END_X}%`]);

  return (
    <MainBg>
      <section ref={targetRef} className="relative h-[400vh]">
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          <motion.div style={{ x }} className="flex gap-40 items-center">
            {cards.map((card, index) => (
              <Card
                key={card.id}
                card={card}
                index={index}
                total={cards.length}
                scrollYProgress={scrollYProgress}
              />
            ))}
          </motion.div>
        </div>
      </section>
    </MainBg>
  );
}

