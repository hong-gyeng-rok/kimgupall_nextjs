"use client";

import {
  useScroll,
  useTransform,
  motion,
  useMotionValueEvent,
} from "framer-motion";
import { useRef, useState } from "react";

export default function ScrollyTellingSequence() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // 1. 스크롤 진행률 추적 (0 ~ 1)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // --- A. 화살표 길이 변화 로직 ---
  // 스크롤 0 -> 1.0 에 따라 너비가 0% -> 100%로 변함
  const arrowWidth = useTransform(scrollYProgress, [0, 1], ["0%", "87%"]);

  // --- B. 미디어 순차 등장 로직 (Opacity 제어) ---
  // Image A: 처음엔 보이다가(1), 20% 지점에서 사라짐(0)
  const opacityA = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  // Image B: 20%에서 나타나서(0->1), 30%에 완전히 보이고, 30%부터 사라짐
  const opacityB = useTransform(
    scrollYProgress,
    [0.2, 0.3, 0.3, 0.4],
    [0, 1, 1, 0],
  );
  // Image C: 40%에서 나타나서(0->1), 50%에 완전히 보이고, 50%부터 사라짐
  const opacityC = useTransform(
    scrollYProgress,
    [0.4, 0.5, 0.5, 0.6],
    [0, 1, 1, 0],
  );
  // Image D: 70%에서 나타나서(0->1),  80%에 완전히 보이고, 80%부터 사라짐
  const opacityD = useTransform(
    scrollYProgress,
    [0.7, 0.8, 0.8, 0.9],
    [0, 1, 1, 0],
  );

  // Movie: 90%에서 나타남
  const opacityMovie = useTransform(scrollYProgress, [0.9, 1.0], [0, 1]);

  // --- C. 비디오 자동 재생 트리거 ---
  // 스크롤이 끝부분(0.95 이상)에 도달하면 비디오 재생, 아니면 일시정지
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (videoRef.current) {
      if (latest > 0.9) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  });

  return (
    // 1. 스크롤 영역 (높이를 길게 잡음)
    <div
      ref={containerRef}
      className=" h-[1000vh] relative bg-white  inset-0 w-full pointer-events-none"
    >
      {/* 2. 뷰포트 고정 영역 (Sticky) */}
      <div className="sticky top-20 h-screen w-full flex flex-col items-center justify-center overflow-hidden gap-10">
        {/* --- 화살표 영역 --- */}
        <div className="text-black flex flex-row w-full px-10 items-center gap-4">
          <p className="text-3xl font-chosunGoosu font-bold">작업 전</p>
          <motion.div
            style={{ width: arrowWidth }} // 여기서 너비가 동적으로 바뀜
            className="h-1 bg-black relative"
          >
            {/* 화살표 머리 (CSS로 그림) */}
            <div className="absolute right-[1px] top-1/2 -translate-y-1/2 w-[20px] h-[20px] border-t-3 border-r-3 border-solid rotate-45" />
          </motion.div>
          <p className="text-black text-3xl font-chosunGoosu font-bold">
            작업 후
          </p>
        </div>
        <div className="relative w-screen h-[800px] mb-10 flex ">
          {/* Image A */}
          <motion.img
            src="/sampleImages/yacha_sketch/야차1.jpg"
            style={{ opacity: opacityA }}
            className="absolute left-10 inset-0 w-[600px] h-[800px] object-cover rounded-lg"
          />

          {/* Image B */}
          <motion.img
            src="/sampleImages/yacha_sketch/야차2.jpg"
            style={{ opacity: opacityB }}
            className="absolute left-2/12 inset-0 w-[600px] h-[800px] object-cover rounded-lg"
          />
          {/* Image C */}
          <motion.img
            src="/sampleImages/yacha_sketch/야차3.jpg"
            style={{ opacity: opacityC }}
            className="absolute left-5/12 inset-0 w-[600px] h-[800px] object-cover rounded-lg"
          />

          {/* Image D */}
          <motion.img
            src="/sampleImages/yacha_sketch/야차4.jpg"
            style={{ opacity: opacityD }}
            className="absolute left-7/12 inset-0 w-[600px] h-[800px] object-cover rounded-lg"
          />
          {/* Movie */}
          <motion.div
            style={{ opacity: opacityMovie }}
            className="absolute inset-0 w-screen h-[800px] rounded-lg overflow-hidden"
          >
            <video
              ref={videoRef}
              src="/sampleImages/yacha_sketch/yachaMv.mp4"
              className="absolute right-10 w-[600px] h-[800px] object-cover"
              muted
              loop
              playsInline
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

