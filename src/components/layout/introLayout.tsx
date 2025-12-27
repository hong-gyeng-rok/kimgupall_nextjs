"use client";

import { useScroll } from "framer-motion";
import { useRef } from "react";
import IntroTitle from "../common/intro/introTitle";
import IntroContext from "../common/intro/introContext";

export default function IntroLayout() {
  const targetRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  return (
    <article
      data-testid="IntroLayout"
      ref={targetRef}
      className="relative h-[300vh]"
    >
      {/* Sticky 컨테이너: 화면에 고정된 상태로 내용물만 변경되는 느낌 */}
      <div className="sticky top-0 h-screen w-full flex flex-col items-center overflow-hidden">
        <figure className="w-full h-full flex flex-col items-center">
          <IntroTitle />
          <IntroContext scrollYProgress={scrollYProgress} />
        </figure>
      </div>
    </article>
  );
}
