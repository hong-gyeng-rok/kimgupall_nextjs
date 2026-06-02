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
        "shrink-0 snap-start bg-black text-white",
        isEnding
          ? "flex min-h-dvh flex-col justify-between px-6 py-16 md:px-12 md:py-20"
          : "flex h-screen items-center justify-center px-6 py-20",
        className,
      ].join(" ")}
    >
      {isEnding && <div aria-hidden="true" />}

      <div className="mx-auto max-w-5xl text-center [font-family:var(--font-kimsaeng)] ">
        {eyebrow ? (
          <motion.p
            variants={itemMotion}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-sm tracking-[0.45em] text-white/45 md:text-base"
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
              ? "text-5xl md:text-8xl"
              : "text-6xl md:text-8xl ",
          ].join(" ")}
        >
          {titleLines.map((line) => (
            <span key={line} className="block mt-6 ">
              {line}
            </span>
          ))}
        </motion.h2>

        {descriptionLines.length > 0 ? (
          <motion.p
            variants={itemMotion}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.24 }}
            className="mx-auto mt-8 max-w-xl whitespace-pre-line text-lg leading-relaxed text-white/55 md:text-2xl"
          >
            {descriptionLines.join("\n")}
          </motion.p>
        ) : null}

        {closingText ? (
          <motion.p
            variants={itemMotion}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.34 }}
            className="mt-10 text-base tracking-[0.25em] text-white/60 md:text-xl"
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
          className="grid gap-6 text-xs tracking-[0.2em] text-white/50 md:grid-cols-3 md:text-sm"
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
