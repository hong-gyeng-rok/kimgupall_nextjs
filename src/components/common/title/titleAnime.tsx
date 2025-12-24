"use client";

import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import mainPatten from "../../../../public/sampleImages/mainPatten.png";
import titlePattenTopLeft from "../../../../public/sampleImages/titlePatten_top_left.png";
import titlePattenTopRight from "../../../../public/sampleImages/titlePatten_top_right.png";
import titlePattenBottomLeft from "../../../../public/sampleImages/titlePatten_bottom_left.png";
import titlePattenBottomRight from "../../../../public/sampleImages/titlePatton_bottom_right.png";

export default function TitleAnime() {
  const creditsData = [
    { role: "Project Management", name: "HONG GYEONG ROK" },
    { role: "Content & Editing", name: "KIM CHAN SEOK" },
    { role: "Website", name: "KIMGUPALL98.COM" },
    { role: "Instagram", name: "@kimgupall_98" },
    { role: "Email", name: "kimgupall98@gmail.com" },
  ];
  const mainBg = mainPatten;
  const topLeft = titlePattenTopLeft;
  const topRigt = titlePattenTopRight;
  const bottomLeft = titlePattenBottomLeft;
  const bottomRight = titlePattenBottomRight;

  const targetRef = useRef<HTMLDivElement>(null);

  // 1. 타겟 요소의 스크롤 진행률을 추적 (0 ~ 1)
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"], // 요소의 시작이 뷰포트 시작에 닿을 때 ~ 끝이 뷰포트 끝에 닿을 때
  });
  // 2. 스크롤 진행률(0 -> 1)에 따라 색상 매핑
  const backgroundColor = useTransform(
    scrollYProgress,
    [0.5, 1],
    ["#000000", "rgba(255,255,255,0)"],
  );
  const textColor = useTransform(
    scrollYProgress,
    [0.5, 1],
    ["#ffffff", "#c4c47e"],
  );

  const pattonOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const mainOpacity = useTransform(scrollYProgress, [0.9, 1], [1, 0]);

  return (
    // 높이를 넉넉히 주어 스크롤 공간 확보
    <article ref={targetRef} className="h-[300vh] relative w-screen font-sans">
      <motion.div
        style={{
          backgroundColor: backgroundColor,
          color: textColor,
        }}
        className="items-center sticky top-0 left-0 h-screen flex flex-col justify-around font-bold transition-colors"
      >
        <motion.div className="absolute inset-0 w-full h-full pointer-events-none">
          <Image
            src={topLeft}
            alt="titlePattenTopLeft"
            className="absolute top-0 left-0 w-md z-10"
          />
          <Image
            src={topRigt}
            alt="titlePattenTopRight"
            className="absolute top-0 right-0 w-md z-10"
          />
          <Image
            src={bottomLeft}
            alt="titlePattenBottomLeft"
            className="absolute bottom-0 left-0 w-md z-10"
          />
          <Image
            src={bottomRight}
            alt="titlePattenBottomRight"
            className="absolute bottom-0 right-0 w-md z-10"
          />
        </motion.div>
        <p className="text-[12rem] z-20">GRADUATION 2026</p>
        {/* 움직이는 트랙 */}
        <motion.div
          className="flex gap-20 w-max" // w-max: 내용물만큼 너비 확보
          animate={{
            x: ["120%", "-120%"], // 전체 길이의 절반만큼만 이동하고 0으로 순간이동
          }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 25, // 속도 (숫자가 클수록 느림)
          }}
        >
          {/* (옵션) 배경 그라데이션: 양쪽 끝을 자연스럽게 흐리게 만듦 */}
          {/* 무한 루프를 위해 리스트를 2번 렌더링 (Original + Duplicate) */}
          {[...creditsData].map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col items-start justify-center min-w-[200px]"
            >
              {/* 역할 (작은 회색 글씨) */}
              <span className="text-xs md:text-sm text-white font-medium tracking-widest uppercase mb-1">
                {item.role}
              </span>

              {/* 이름 (큰 흰색 글씨) */}
              <span className="text-xl md:text-3xl text-white font-black tracking-tight font-serif italic">
                {item.name}
              </span>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </article>
  );
}
