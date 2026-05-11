"use client";

import React from "react";
import { motion } from "framer-motion";
import InternalLink from "@/components/common/internalLink";
import { Link } from "@/types/links";
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

export default function GalleryFooterNav() {
  return (
    <motion.nav
      id="GalleryFooterNav"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="font-mono mx-auto flex w-fit shrink-0 flex-row items-center justify-center gap-5 rounded-full border border-white/30 bg-black/10 px-4 py-2 shadow-2xl backdrop-blur-lg md:gap-8"
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
      data-testid="GalleryFooterNavLink"
      className="flex items-center justify-center text-center md:w-25 md:h-10 relative text-black text-md md:text-lg p-2 rounded-full transition-all duration-300 hover:bg-black hover:text-white hover:scale-105 hover:shadow-xl"
      href={link.url}
      ariaLabel={`${link.title}으로 이동`}
      onClick={handleOnClick}
    >
      <span className="font-medium mix-blend-difference">{link.title}</span>
    </InternalLink>
  );
}
