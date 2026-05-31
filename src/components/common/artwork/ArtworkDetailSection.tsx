"use client";

import { motion } from "framer-motion";

type ArtworkDetailSectionProps = {
  logoText?: string;
  number: string;
  title: string;
  image: string;
  alt: string;
  profile: string;
  motifTitle?: string;
  motif: string;
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
  profile,
  motifTitle = "MOTIF: 도깨비",
  motif,
}: ArtworkDetailSectionProps) {
  return (
    <article className="flex justify-center items-center min-h-dvh shrink-0 snap-start bg-black px-6 py-12 text-white md:px-14 md:py-16">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.35 }}
        transition={{ staggerChildren: 0.12 }}
        className="order-2 flex flex-col justify-center md:order-1 md:pr-10"
      >
        <motion.p
          variants={fadeUp}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-xs tracking-[0.4em] text-white/40 md:text-sm"
        >
          {logoText}
        </motion.p>

        <div className="mt-8 flex items-end justify-between gap-6 [font-family:var(--font-kimsaeng)] md:mt-14">
          <motion.h2
            variants={fadeUp}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-5xl font-black leading-none tracking-tight md:text-6xl lg:text-7xl"
          >
            {title}
          </motion.h2>
          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="shrink-0 text-xl font-light text-white/70 md:text-3xl"
          >
            {number}
          </motion.p>
        </div>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.12 }}
          className="mt-8 h-px origin-left bg-white/50"
        />

        <motion.div
          variants={fadeUp}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mt-10"
        >
          <h3 className="text-3xl font-black tracking-tight md:text-5xl">
            PROFILE
          </h3>
          <p className="mt-4 whitespace-pre-line text-base leading-relaxed text-white/80 md:text-xl">
            {profile}
          </p>
        </motion.div>

        <motion.div
          variants={fadeUp}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mt-10"
        >
          <h3 className="text-3xl font-black tracking-tight md:text-5xl">
            {motifTitle}
          </h3>
          <p className="mt-4 whitespace-pre-line text-base leading-relaxed text-white/80 md:text-xl">
            {motif}
          </p>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="order-1 flex items-center justify-center pb-10 md:order-2 md:pb-0 w-fit"
      >
        <img
          src={image}
          alt={alt}
          className="max-h-[52dvh] w-full object-contain md:max-h-[82dvh]"
        />
      </motion.div>
    </article>
  );
}
