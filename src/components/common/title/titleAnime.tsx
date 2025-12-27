"use client";

import { useScroll, useTransform, motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
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

  // 애니메이션 루프 제어 상태
  const [isShowing, setIsShowing] = useState(true);

  useEffect(() => {
    const loop = async () => {
      while (true) {
        setIsShowing(true); // 시작
        await new Promise((resolve) => setTimeout(resolve, 9000)); // 9초간 유지 (타이핑 시간 포함)

        setIsShowing(false); // 사라짐
        await new Promise((resolve) => setTimeout(resolve, 1500)); // 1.5초간 사라지는 애니메이션 대기
      }
    };
    loop();
  }, []);

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

  return (
    // 높이를 넉넉히 주어 스크롤 공간 확보
    <article
      id="TitleAnime"
      ref={targetRef}
      className="h-[600vh] relative w-screen font-sans"
    >
      <motion.div
        style={{
          backgroundColor: backgroundColor,
          color: textColor,
        }}
        className="items-center sticky top-0 left-0 h-screen flex flex-col justify-center font-bold transition-colors"
      >
        <h3 className="contents">
          <Typewriter
            className="text-7xl z-20 font-light italic"
            text="ARTIST BY KIMGUPALL"
            speed={0.1}
            show={isShowing}
          />
        </h3>
        <h1 className="contents">
          <Typewriter
            className="text-[15rem] z-20"
            text="GRADUATION"
            speed={0.2}
            delay={1}
            show={isShowing}
          />
        </h1>
        <h2 className="contents">
          <Typewriter
            className="text-[10rem] z-20 "
            text="2026"
            speed={0.3}
            delay={2}
            show={isShowing}
          />
        </h2>
        {/* 움직이는 트랙 */}
        <aside aria-label="Project Credits" className="w-full overflow-hidden">
          <motion.ul
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
            {[...creditsData].map((item, idx) => (
              <li
                key={idx}
                className="flex flex-col items-start justify-center min-w-[200px]"
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
      </motion.div>
    </article>
  );
}
