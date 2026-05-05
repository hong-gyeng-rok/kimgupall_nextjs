"use client";

import { useScroll } from "framer-motion";
import { useRef } from "react";
import IntroVideo from "@/components/common/intro/IntroVideo";
import IntroDescription from "@/components/common/intro/IntroDescription";

export default function IntroScrollScene() {
  const targetRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  return (
    <article
      data-testid="IntroScrollScene"
      ref={targetRef}
      className="relative h-[300vh]"
    >
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden pt-10 gap-[5vh]">
        <div className="flex-none w-full flex justify-center max-h-[40vh] md:max-h-[50vh] px-4">
          <IntroVideo />
        </div>

        <IntroDescription scrollYProgress={scrollYProgress} />
      </div>
    </article>
  );
}
