"use client";

import React from "react";
import { motion } from "framer-motion";
import InternalLink from "./internalLink";
import { Link } from "../../types/links";
import { useRouter } from "next/navigation";

const navLinks = [
  {
    id: 1,
    title: "홈",
    url: "/",
  },
  {
    id: 2,
    title: "뒤로가기",
    url: "#",
  },
];

export default function GoToHomeBtn() {
  return (
    <motion.nav
      id="GoToHomeBtnNav"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="font-mono fixed bottom-5 left-1/2 -translate-x-1/2 flex flex-row justify-center items-center gap-5 md:gap-8 z-50 pb-safe w-fit px-4 py-2 rounded-full bg-black/10 backdrop-blur-lg border border-white/30 shadow-2xl"
    >
      {navLinks.map((link) => (
        <Nav key={link.id} link={link} />
      ))}
    </motion.nav>
  );
}

function Nav({ link }: { link: Link }) {
  const router = useRouter();

  const handleOnClick = (e?: React.MouseEvent) => {
    if (link.title === "뒤로가기" && e) {
      e.preventDefault();
      router.back();
    }
  };

  return (
    <InternalLink
      data-testid="GoToHomeBtn"
      className="flex items-center justify-center text-center md:w-25 md:h-10 relative text-black text-md md:text-lg p-2 rounded-full transition-all duration-300 hover:bg-black hover:text-white hover:scale-105 hover:shadow-xl"
      href={link.url}
      ariaLabel={`${link.title}으로 이동`}
      onClick={handleOnClick}
    >
      <span className="font-medium mix-blend-difference">{link.title}</span>
    </InternalLink>
  );
}
