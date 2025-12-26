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
        <div className="sticky top-0 h-screen w-full flex flex-col items-center overflow-hidden">
          <IntroTitle />
          <IntroContext scrollYProgress={scrollYProgress} />
        </div>
      </article>
    </MainBg>
  );
}
