"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";
import Image from "next/image";
import type { MediaType } from "@/hooks/useImages";
import { getPublicMediaUrl } from "@/lib/mediaUrl";

const STEP_PROGRESS_START = 0.1;
const STEP_PROGRESS_END = 0.9;

type DrawingCourseStepProps = {
  media: MediaType;
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
};

function getStepOpacityRange(index: number, total: number) {
  const stepCount = Math.max(total, 1);
  const slot = (STEP_PROGRESS_END - STEP_PROGRESS_START) / stepCount;
  const start = STEP_PROGRESS_START + index * slot;
  const peak = start + slot / 2;
  const end = start + slot;

  return [start, peak, end];
}

export function DrawingCourseStep({
  media,
  index,
  total,
  scrollYProgress,
}: DrawingCourseStepProps) {
  const opacity = useTransform(
    scrollYProgress,
    getStepOpacityRange(index, total),
    [0, 1, 0],
  );

  return (
    <motion.span
      style={{ opacity }}
      className="absolute inset-0 flex flex-col items-center justify-center sm:static"
    >
      <Image
        src={getPublicMediaUrl(media.publicUrl) ?? ""}
        alt={media.description ?? "sketch Image"}
        width={300}
        height={400}
        className="w-full max-w-xl px-4 md:px-0 h-[72svh] sm:h-[60vh] object-contain"
      />
      <p className="font-sans font-bold text-3xl mt-4 text-center">
        STEP {index + 1}
      </p>
    </motion.span>
  );
}
