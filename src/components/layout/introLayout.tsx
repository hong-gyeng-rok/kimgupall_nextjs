"use client";

import { useScroll } from "framer-motion";
import { useRef } from "react";
import IntroVideo from "../common/intro/IntroVideo";
import IntroDescription from "../common/intro/IntroDescription";

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
      {/* Sticky 컨테이너: 화면 전체 높이 사용 */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden pt-10 gap-[5vh]">
        {/* 비디오 영역: 화면 높이의 최대 45%까지만 차지하도록 제한 */}
        <div className="flex-none w-full flex justify-center max-h-[40vh] md:max-h-[50vh] px-4">
          <IntroVideo />
        </div>

        {/* 텍스트 영역: 남은 공간을 자연스럽게 채우거나 적절한 간격 유지 */}
        <IntroDescription scrollYProgress={scrollYProgress} />
      </div>
    </article>
  );
}
