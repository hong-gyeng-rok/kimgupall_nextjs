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
        className={`pointer-events-none fixed left-0 top-0 z-30 hidden h-dvh ${sidebarWidthClass} flex-col justify-between overflow-hidden [container-type:inline-size] md:flex md:bg-black md:px-[clamp(0.5rem,1vw,1rem)] md:py-[clamp(1.5rem,1.9vw,1.75rem)]`}
        aria-hidden="true"
      >
        <motion.div
          style={{ opacity: sidebarBorderOpacity }}
          className="absolute right-0 top-0 hidden h-full w-px  md:block "
        />

        <div className="relative z-10 grid w-full justify-items-end gap-[clamp(0.5rem,5cqw,0.75rem)]">
          <motion.p
            style={{ y: yachaY, opacity: yachaOpacity }}
            className="justify-self-center text-center [font-family:var(--font-kimsaeng)] text-[clamp(2rem,24cqw,2.25rem)] font-black leading-none text-white"
          >
            七罪宗
          </motion.p>
          <p className="max-w-full justify-self-end whitespace-nowrap text-right text-[clamp(1.25rem,16cqw,1.5rem)] font-black uppercase leading-none tracking-[-0.1em] text-white">
            GRADUATION
          </p>
          <p className="justify-self-end text-right text-[clamp(0.875rem,10.6cqw,1rem)] font-light leading-none tracking-[-0.04em] text-white/90">
            2026
          </p>
        </div>

        <div className="relative z-10 grid w-full justify-items-start gap-[clamp(0.25rem,2cqw,0.35rem)] uppercase leading-none tracking-[-0.04em]">
          <p className="text-[clamp(0.875rem,10.6cqw,1rem)] font-light text-white/70">
            ARTIST BY
          </p>
          <p className="text-[clamp(1.25rem,16cqw,1.5rem)] font-black">
            KIMGUPALL
          </p>
        </div>
      </motion.aside>

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
