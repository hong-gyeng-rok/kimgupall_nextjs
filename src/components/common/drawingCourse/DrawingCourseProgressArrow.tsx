"use client";

import { motion, type MotionValue } from "framer-motion";

type DrawingCourseProgressArrowProps = {
  opacity: MotionValue<number>;
  width: MotionValue<string>;
};

export function DrawingCourseProgressArrow({
  opacity,
  width,
}: DrawingCourseProgressArrowProps) {
  return (
    <motion.div
      style={{ opacity }}
      className="font-sans text-black flex w-full px-4 md:px-10 items-center gap-4 absolute bottom-15 z-50 h-0 pb-safe font-bold"
    >
      <p className="shrink-0 whitespace-nowrap text-lg sm:text-xl md:text-3xl">
        작업 전
      </p>
      <div className="flex-1 min-w-0">
        <motion.div style={{ width }} className="h-1 bg-black relative">
          <div className="absolute right-px top-1/2 -translate-y-1/2 w-5 h-5 border-t-3 border-r-3 border-solid rotate-45" />
        </motion.div>
      </div>
      <p className="shrink-0 whitespace-nowrap text-lg sm:text-xl md:text-3xl">
        작업 후
      </p>
    </motion.div>
  );
}
