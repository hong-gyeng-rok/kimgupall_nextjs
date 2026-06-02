"use client";

import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";
import Typewriter from "@/components/common/Typewriter";

export default function MainTitleAnimation() {

  const targetRef = useRef<HTMLDivElement>(null);

  // 1. 타겟 요소의 스크롤 진행률을 추적 (0 ~ 1)
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"], // 요소의 시작이 뷰포트 시작에 닿을 때 ~ 끝이 뷰포트 끝에 닿을 때
  });
  // 2. 스크롤 진행률(0 -> 1)에 따라 색상 매핑
  const backgroundColor = useTransform(
    scrollYProgress,
    [1, 1],
    ["#000000", "#000000"],
  );
  const textColor = useTransform(
    scrollYProgress,
    [1, 1],
    ["#ffffff", "#ffffff"],
  );
  const trapOpacity = useTransform(scrollYProgress, [0.5, 1], [1, 0]);

  return (
    // 높이를 넉넉히 주어 스크롤 공간 확보
    <article
      id="MainTitleAnimation"
      ref={targetRef}
      className="h-dvh relative w-screen font-sans"
    >
      <motion.div
        style={{
          backgroundColor: backgroundColor,
          color: textColor,
        }}
        className="items-center sticky top-0 left-0 h-screen flex flex-col justify-center font-bold transition-colors gap-[2vh] md:gap-[4vh] px-4 overflow-hidden"
      >
        <h1 className="contents">
          <Typewriter
            className="text-9xl z-20 leading-none text-center whitespace-nowrap"
            text="GRADUATION"
            speed={0.2}
            delay={1}
            show={true}
          />
        </h1>
        <h2 className="contents">
          <Typewriter
            className="text-9xl z-20 leading-none text-center whitespace-nowrap"
            text="2026"
            speed={0.3}
            show={true}
            delay={2}
          />
        </h2>
        <h3 className="contents">
          <Typewriter
            className="text-4xl text-white/70 z-20 font-light italic text-center whitespace-nowrap"
            text="ARTIST BY KIMGUPALL"
            speed={0.4}
            show={true}
            delay={3}
          />
        </h3>
      </motion.div>
    </article>
  );
}
