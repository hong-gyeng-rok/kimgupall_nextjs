"use client";

import { motion } from "framer-motion";

type ExhibitionTextSectionVariant = "break" | "ending";

type ExhibitionContactItem = {
  label: string;
  value: string;
  href?: string;
};

type ExhibitionTextSectionProps = {
  variant?: ExhibitionTextSectionVariant;
  eyebrow?: string;
  titleLines: string[];
  descriptionLines?: string[];
  closingText?: string;
  contacts?: ExhibitionContactItem[];
  className?: string;
};

const sectionMotion = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const itemMotion = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

export default function ExhibitionTextSection({
  variant = "break",
  eyebrow,
  titleLines,
  descriptionLines = [],
  closingText,
  contacts = [],
  className = "",
}: ExhibitionTextSectionProps) {
  const isEnding = variant === "ending";

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.35 }}
      variants={sectionMotion}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={[
        "bg-black text-white md:shrink-0 md:snap-start",
        isEnding
          ? "flex min-h-dvh flex-col justify-between px-5 py-14 md:px-10 md:py-18 lg:px-12 lg:py-20"
          : "flex min-h-svh items-center justify-center px-5 py-16 md:h-screen md:px-8 md:py-20 lg:px-10",
        className,
      ].join(" ")}
    >
      {isEnding && <div aria-hidden="true" />}

      <div className="mx-auto max-w-5xl text-center [font-family:var(--font-kimsaeng)] ">
        {eyebrow ? (
          <motion.p
            variants={itemMotion}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-xs tracking-[0.38em] text-white/45 md:text-sm md:tracking-[0.42em] lg:text-base lg:tracking-[0.45em]"
          >
            {eyebrow}
          </motion.p>
        ) : null}

        <motion.h2
          variants={itemMotion}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.12 }}
          className={[
            " font-black leading-[0.95] tracking-[-0.04em] ",
            isEnding
              ? "mt-10 text-3xl md:text-6xl lg:text-8xl"
              : "text-5xl md:text-7xl lg:text-8xl",
          ].join(" ")}
        >
          {titleLines.map((line) => (
            <span key={line} className="mt-4 block md:mt-5 lg:mt-6">
              {line}
            </span>
          ))}
        </motion.h2>

        {descriptionLines.length > 0 ? (
          <motion.p
            variants={itemMotion}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.24 }}
            className="mx-auto mt-7 max-w-xl whitespace-pre-line text-base leading-relaxed text-white/55 md:mt-8 md:text-xl lg:text-2xl"
          >
            {descriptionLines.join("\n")}
          </motion.p>
        ) : null}

        {closingText ? (
          <motion.p
            variants={itemMotion}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.34 }}
            className="mt-8 text-sm tracking-[0.2em] text-white/60 md:mt-10 md:text-lg md:tracking-[0.22em] lg:text-xl lg:tracking-[0.25em]"
          >
            {closingText}
          </motion.p>
        ) : null}
      </div>

      {isEnding && contacts.length > 0 ? (
        <motion.dl
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          transition={{ staggerChildren: 0.08, delayChildren: 0.45 }}
          className="grid gap-5 text-center text-xs tracking-[0.18em] text-white/50 lg:grid-cols-3 md:gap-6 md:text-sm md:tracking-[0.2em]"
        >
          {contacts.map((contact) => (
            <motion.div key={contact.label} variants={itemMotion}>
              <dt className="text-white/30">{contact.label}</dt>
              <dd className="mt-2 text-white">
                {contact.href ? (
                  <a href={contact.href} className="transition hover:text-white/70">
                    {contact.value}
                  </a>
                ) : (
                  contact.value
                )}
              </dd>
            </motion.div>
          ))}
        </motion.dl>
      ) : null}
    </motion.section>
  );
}
