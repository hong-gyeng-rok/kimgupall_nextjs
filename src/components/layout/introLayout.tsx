"use client";

import { useScroll } from "framer-motion";
import { useRef } from "react";
import IntroTitle from "../common/intro/introTitle";
import IntroContext from "../common/intro/introContext";
import MainBg from "./mainBg";

export default function IntroLayout() {
  const targetRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  return (
    <MainBg>
      <article ref={targetRef} className="relative h-[300vh]">
        {/* Sticky 컨테이너: 화면에 고정된 상태로 내용물만 변경되는 느낌 */}
        <div className="sticky top-30 h-screen w-full flex flex-col items-center justify-center overflow-hidden">
          {/* 왼쪽 (또는 상단): 타이틀 이미지 */}
          <div className="w-full h-[30%] flex items-center justify-center p-4">
            <IntroTitle />
          </div>

          {/* 오른쪽 (또는 하단): 텍스트 컨텐츠 */}
          <div className="w-[70%] h-[70%] flex items-center left-10 p-4">
            <IntroContext scrollYProgress={scrollYProgress} />
          </div>
        </div>
      </article>
    </MainBg>
  );
}
