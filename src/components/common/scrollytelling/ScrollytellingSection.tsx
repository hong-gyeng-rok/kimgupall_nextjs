"use client";

import type { ReactNode } from "react";
import { useRef } from "react";
import {
  useScroll,
  type MotionValue,
  type UseScrollOptions,
} from "framer-motion";

type ScrollytellingSectionProps = {
  children: (scrollYProgress: MotionValue<number>) => ReactNode;
  className?: string;
  scrollLengthClassName?: string;
  stageClassName?: string;
  offset?: UseScrollOptions["offset"];
};

export function ScrollytellingSection({
  children,
  className = "",
  scrollLengthClassName = "h-dvh",
  stageClassName = "",
  offset = ["start start", "end end"],
}: ScrollytellingSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset,
  });

  return (
    <section
      ref={containerRef}
      className={`relative w-full  ${scrollLengthClassName} ${className}`}
    >
      <div
        className={`sticky top-0 h-screen w-full overflow-hidden ${stageClassName}`}
      >
        {children(scrollYProgress)}
      </div>
    </section>
  );
}
