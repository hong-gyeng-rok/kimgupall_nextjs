"use client";

import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";
import Typewriter from "@/components/common/Typewriter";

export default function TitleAnime() {
  const creditsData = [
    { role: "Project Management", name: "HONG GYEONG ROK" },
    { role: "Content & Editing", name: "KIM CHAN SEOK" },
    { role: "Website", name: "KIMGUPALL98.COM" },
    { role: "Instagram", name: "@kimgupall_98" },
    { role: "Email", name: "kimgupall98@gmail.com" },
  ];

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
  const trapOpacity = useTransform(scrollYProgress, [0.5, 1], [1, 0]);

  return (
    // 높이를 넉넉히 주어 스크롤 공간 확보
    <article
      id="TitleAnime"
      ref={targetRef}
      className="h-[200vh] relative w-screen font-sans"
    >
      <motion.div
        style={{
          backgroundColor: backgroundColor,
          color: textColor,
        }}
        className="items-center sticky top-0 left-0 h-screen flex flex-col justify-center font-bold transition-colors gap-[2vh] md:gap-[4vh] px-4 overflow-hidden"
      >
        <h3 className="contents">
          <Typewriter
            className="text-[clamp(1.2rem,4vw,5rem)] z-20 font-light italic text-center whitespace-nowrap"
            text="ARTIST BY KIMGUPALL"
            speed={0.1}
            show={true}
          />
        </h3>
        <h1 className="contents">
          <Typewriter
            className="text-[clamp(3rem,13vw,16rem)] z-20 leading-none text-center whitespace-nowrap"
            text="GRADUATION"
            speed={0.2}
            delay={1}
            show={true}
          />
        </h1>
        <h2 className="contents">
          <Typewriter
            className="text-[clamp(2rem,10vw,11rem)] z-20 leading-none text-center whitespace-nowrap"
            text="2026"
            speed={0.3}
            show={true}
            delay={2}
          />
        </h2>
        {/* 움직이는 트랙 */}
        <aside aria-label="Project Credits" className="w-full overflow-hidden">
          <motion.ul
            className="flex gap-8 md:gap-20 w-max" // w-max: 내용물만큼 너비 확보
            animate={{
              x: ["120%", "-120%"], // 전체 길이의 절반만큼만 이동하고 0으로 순간이동
            }}
            transition={{
              repeat: Infinity,
              ease: "linear",
              duration: 25, // 속도 (숫자가 클수록 느림)
            }}
            style={{ opacity: trapOpacity }}
          >
            {[...creditsData].map((item, idx) => (
              <li
                key={idx}
                className="flex flex-col items-start justify-center min-w-40 md:min-w-50"
              >
                {/* 역할 (작은 회색 글씨) */}
                <span
                  data-testid="Title_role"
                  className="text-xs md:text-sm text-white font-medium tracking-widest uppercase mb-1"
                >
                  {item.role}
                </span>

                {/* 이름 (큰 흰색 글씨) */}
                <span
                  data-testid="title_name"
                  className="text-xl md:text-3xl text-white font-black tracking-tight font-serif italic"
                >
                  {item.name}
                </span>
              </li>
            ))}
          </motion.ul>
        </aside>

        {/* 스크롤 가이드 */}
        <motion.div
          style={{
            opacity: useTransform(scrollYProgress, [0, 0.05], [1, 0]),
          }}
          className="mt-[4vh] flex flex-col items-center gap-2 md:gap-4"
        >
          <span className="text-xs md:text-sm tracking-[0.4em] font-light">
            SCROLL DOWN
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{
              repeat: Infinity,
              duration: 1.5,
              ease: "easeInOut",
            }}
            className="flex flex-col items-center"
          >
            <div className="w-px h-12 bg-current opacity-60" />
            <div className="w-2 h-2 border-b border-r border-current rotate-45 -mt-1.5 opacity-60" />
          </motion.div>{" "}
        </motion.div>
      </motion.div>
    </article>
  );
}
