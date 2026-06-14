"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import FallbackImage from "@/components/common/fallbackImage";

type ArtworkDetailSectionProps = {
  logoText?: string;
  number: string;
  title: string;
  image: string;
  alt: string;
  width?: number | null;
  height?: number | null;
  profile: ReactNode;
  motifTitle?: string;
  motif: ReactNode;
  reversed?: boolean;
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function ArtworkDetailSection({
  logoText = "夜叉",
  number,
  title,
  image,
  alt,
  width,
  height,
  profile,
  motif,
  reversed = false,
}: ArtworkDetailSectionProps) {
  const textOrderClass = reversed
    ? "md:order-2 md:pl-6 lg:pl-8"
    : "md:order-1 md:pr-6 lg:pr-8";
  const imageOrderClass = reversed ? "md:order-1" : "md:order-2";

  return (
    <article className="flex min-h-dvh shrink-0 items-center justify-center bg-black px-6 py-12 text-white md:snap-start md:px-8 md:py-12 lg:px-14 lg:py-16">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.35 }}
        transition={{ staggerChildren: 0.12 }}
        className={`order-2 flex flex-col justify-center ${textOrderClass}`}
      >
        <motion.p
          variants={fadeUp}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-xs tracking-[0.4em] text-white/40 md:text-sm"
        >
          {logoText}
        </motion.p>

        <div className="mt-8 flex items-end justify-between gap-5 [font-family:var(--font-kimsaeng)] md:mt-8 md:gap-5 lg:mt-10 lg:gap-6">
          <motion.h2
            variants={fadeUp}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mb-6 text-5xl font-black leading-none tracking-tight md:text-5xl lg:mb-8 lg:text-6xl"
          >
            {title}
          </motion.h2>
          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="shrink-0 text-xl font-light text-white/70 md:text-2xl lg:text-3xl"
          >
            {number}
          </motion.p>
        </div>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: false, amount: 0.35 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.12 }}
          className=" h-px origin-left bg-white/50"
        />

        <motion.div
          variants={fadeUp}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mt-6 lg:mt-8"
        >
          <h3 className="text-3xl font-black tracking-tight md:text-3xl lg:text-4xl">
            PROFILE
          </h3>
          <p className="mt-3 w-[86%] whitespace-pre-line px-6 text-base leading-relaxed text-white/80 md:w-[82%] md:px-6 md:text-base lg:mt-4 lg:w-[80%] lg:px-8 lg:text-lg">
            {profile}
          </p>
        </motion.div>

        <motion.div
          variants={fadeUp}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mt-6 lg:mt-8"
        >
          <h3 className="text-3xl font-black tracking-tight md:text-3xl lg:text-4xl">
            MOTIF: 도깨비
          </h3>
          <p className="mt-3 w-[86%] whitespace-pre-line px-6 text-base leading-relaxed text-white/80 md:w-[82%] md:px-6 md:text-base lg:mt-4 lg:w-[80%] lg:px-8 lg:text-lg">
            {motif}
          </p>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.35 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`order-1 flex w-fit items-center justify-center pb-10 md:pb-0 ${imageOrderClass}`}
      >
        <FallbackImage
          src={image}
          alt={alt}
          width={width ?? 800}
          height={height ?? 1000}
          sizes="(min-width: 768px) 45vw, 100vw"
          quality={60}
          placeholder="empty"
          className="h-fit w-full object-contain md:max-h-[76dvh] lg:max-h-[82dvh]"
        />
      </motion.div>
    </article>
  );
}
