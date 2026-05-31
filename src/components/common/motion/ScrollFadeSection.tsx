"use client";

import {
  createContext,
  type HTMLAttributes,
  type ReactNode,
  type RefObject,
  useContext,
  useRef,
} from "react";
import { motion, type MotionStyle, useScroll, useTransform } from "framer-motion";

type ScrollContainerRef = RefObject<HTMLElement | null>;

const ScrollFadeContainerContext = createContext<ScrollContainerRef | null>(
  null,
);

type ScrollFadeContainerProps = HTMLAttributes<HTMLElement> & {
  children: ReactNode;
};

export function ScrollFadeContainer({
  children,
  className = "",
  ...props
}: ScrollFadeContainerProps) {
  const containerRef = useRef<HTMLElement | null>(null);

  return (
    <ScrollFadeContainerContext.Provider value={containerRef}>
      <section ref={containerRef} className={className} {...props}>
        {children}
      </section>
    </ScrollFadeContainerContext.Provider>
  );
}

export function useScrollFade<T extends HTMLElement>() {
  const targetRef = useRef<T | null>(null);
  const containerRef = useContext(ScrollFadeContainerContext);

  const { scrollYProgress } = useScroll({
    container: containerRef ?? undefined,
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.18, 0.82, 1],
    [0, 1, 1, 0],
  );
  const y = useTransform(
    scrollYProgress,
    [0, 0.18, 0.82, 1],
    [28, 0, 0, -28],
  );

  return {
    ref: targetRef,
    style: { opacity, y } satisfies MotionStyle,
  };
}

type ScrollFadeSectionProps = {
  children: ReactNode;
  className?: string;
  id?: string;
  "data-testid"?: string;
};

export default function ScrollFadeSection({
  children,
  className = "",
  ...props
}: ScrollFadeSectionProps) {
  const fade = useScrollFade<HTMLElement>();

  return (
    <motion.section
      ref={fade.ref}
      style={fade.style}
      className={className}
      {...props}
    >
      {children}
    </motion.section>
  );
}
