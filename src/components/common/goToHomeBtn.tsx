"use client";

import { motion } from "framer-motion";
import InternalLink from "./internalLink";
import { Link } from "../../types/links";

const navLinks = [
  {
    id: 1,
    title: "홈",
    url: "/",
  },
];

export default function GoToHomeBtn() {
  return (
    <motion.nav
      id="GoToHomeBtnNav"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed bottom-5 left-1/2 -translate-x-1/2 flex flex-row justify-center items-center z-50 pb-safe w-fit px-4 py-2 rounded-full bg-black/20 backdrop-blur-lg border border-white/10 shadow-2xl"
    >
      {navLinks.map((link) => (
        <Nav key={link.id} link={link} />
      ))}
    </motion.nav>
  );
}

function Nav({ link }: { link: Link }) {
  return (
    <InternalLink
      data-testid="GoToHomeBtn"
      className="font-mono flex items-center justify-center text-center md:w-40 md:h-10 relative text-stone-900 text-lg md:text-2xl py-2 px-8 md:px-12 rounded-full border border-white/40 bg-gradient-to-b from-white/60 to-white/30 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.6)] transition-all duration-300 hover:scale-105 hover:from-white/80 hover:to-white/50 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:font-bold hover:animate-bounce"
      href={link.url}
      ariaLabel={`${link.title}으로 이동`}
    >
      {link.title}
    </InternalLink>
  );
}
