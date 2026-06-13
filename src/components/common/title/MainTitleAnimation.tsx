"use client";

import { motion, type MotionValue, useTransform } from "framer-motion";
import Typewriter from "@/components/common/Typewriter";

type MainTitleAnimationProps = {
  progress: MotionValue<number>;
};

const sidebarWidthClass = "md:w-[clamp(140px,11.5vw,174px)]";

export default function MainTitleAnimation({ progress }: MainTitleAnimationProps) {
  const centerScale = useTransform(progress, [0, 0.78, 1], [1, 0.72, 0.48]);
  const centerY = useTransform(progress, [0, 1], [0, -96]);
  const centerOpacity = useTransform(progress, [0, 0.72, 1], [1, 0.55, 0]);

  const sidebarOpacity = useTransform(progress, [0.5, 0.85], [0, 1]);
  const sidebarX = useTransform(progress, [0.45, 0.85], [-24, 0]);
  const sidebarBorderOpacity = useTransform(progress, [0.55, 1], [0, 1]);

  const yachaY = useTransform(progress, [0.68, 1], [-56, 0]);
  const yachaOpacity = useTransform(progress, [0.68, 0.9], [0, 1]);

  return (
    <article
      id="MainTitleAnimation"
      className="relative h-full w-screen bg-black font-sans text-white"
    >
      <motion.aside
        style={{ opacity: sidebarOpacity, x: sidebarX }}
        className={`pointer-events-none fixed left-0 top-0 z-30 hidden h-dvh ${sidebarWidthClass} flex-col justify-between overflow-hidden md:flex md:border-r md:border-white/10 md:bg-black md:px-5 md:py-7`}
        aria-hidden="true"
      >
        <motion.div
          style={{ opacity: sidebarBorderOpacity }}
          className="absolute right-0 top-0 hidden h-full w-px bg-white/10 md:block"
        />

        <div className="relative z-10 space-y-2 md:space-y-3">
          <motion.p
            style={{ y: yachaY, opacity: yachaOpacity }}
            className="text-center [font-family:var(--font-kimsaeng)] text-4xl font-black leading-none text-white"
          >
            七罪宗
          </motion.p>
          <p className="w-full whitespace-nowrap text-2xl font-black uppercase leading-none tracking-[-0.1em] text-white">
            GRADUATION
          </p>
          <p className="text-right text-base font-light leading-none tracking-[-0.04em] text-white/90">
            2026
          </p>
        </div>

        <div className="relative z-10 text-left uppercase leading-none tracking-[-0.04em]">
          <p className="text-base font-light text-white/70">
            ARTIST BY
          </p>
          <p className="mt-1 text-2xl font-black">
            KIMGUPALL
          </p>
        </div>
      </motion.aside>

      <div className="sticky left-0 top-0 flex h-dvh w-full items-center justify-center overflow-hidden bg-black px-4">
        <motion.div
          style={{ scale: centerScale, y: centerY, opacity: centerOpacity }}
          className="flex origin-center flex-col items-center justify-center gap-[2vh] text-center md:gap-[4vh]"
        >
          <h1 className="contents">
            <Typewriter
              className="z-20 whitespace-nowrap text-[clamp(2.75rem,12vw,4.5rem)] font-black leading-none tracking-[-0.08em] md:text-9xl"
              text="GRADUATION"
              speed={0.2}
              delay={1}
              show={true}
            />
          </h1>
          <h2 className="contents">
            <Typewriter
              className="z-20 whitespace-nowrap text-[clamp(3rem,16vw,4.5rem)] font-black leading-none tracking-[-0.08em] md:text-9xl"
              text="2026"
              speed={0.3}
              show={true}
              delay={2}
            />
          </h2>
          <Typewriter
            className="z-20 whitespace-nowrap text-center text-lg font-light italic leading-none text-white/70 md:text-4xl"
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
