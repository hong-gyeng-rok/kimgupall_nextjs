"use client";

import { motion, type MotionValue, useTransform } from "framer-motion";
import Typewriter from "@/components/common/Typewriter";

type MainTitleAnimationProps = {
  progress: MotionValue<number>;
};

export default function MainTitleAnimation({ progress }: MainTitleAnimationProps) {
  const centerScale = useTransform(progress, [0, 0.78, 1], [1, 0.72, 0.48]);
  const centerY = useTransform(progress, [0, 1], [0, -96]);
  const centerOpacity = useTransform(progress, [0, 0.72, 1], [1, 0.55, 0]);

  return (
    <article
      id="MainTitleAnimation"
      className="relative h-full w-screen bg-black font-sans text-white"
    >
      <div className="sticky left-0 top-0 flex h-dvh w-full items-center justify-center overflow-hidden bg-black px-4">
        <motion.div
          style={{ scale: centerScale, y: centerY, opacity: centerOpacity }}
          className="flex origin-center flex-col items-center justify-center gap-3 text-center md:gap-6 lg:gap-8"
        >
          <h1 className="contents">
            <Typewriter
              className="z-20 whitespace-nowrap text-5xl font-black leading-none tracking-[-0.08em] md:text-8xl lg:text-9xl"
              text="GRADUATION"
              speed={0.2}
              delay={1}
              show={true}
            />
          </h1>
          <h2 className="contents">
            <Typewriter
              className="z-20 whitespace-nowrap text-6xl font-black leading-none tracking-[-0.08em] md:text-8xl lg:text-9xl"
              text="2026"
              speed={0.3}
              show={true}
              delay={2}
            />
          </h2>
          <Typewriter
            className="z-20 whitespace-nowrap text-center text-base font-light italic leading-none text-white/70 md:text-3xl lg:text-4xl"
            text="ARTIST BY KIMGUPALL"
            speed={0.4}
            show={true}
            delay={3}
          />
        </motion.div>
      </div>
    </article>
  );
}
