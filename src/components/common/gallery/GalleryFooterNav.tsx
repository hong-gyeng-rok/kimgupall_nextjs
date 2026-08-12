"use client";

import React from "react";
import { motion } from "framer-motion";
import InternalLink from "@/components/common/internalLink";
import { Link } from "@/types/links";
import { useRouter } from "next/navigation";

const navLinks = [
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
      className="font-mono mx-auto hidden w-fit shrink-0 flex-row items-center justify-center md:flex"
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
      window.sessionStorage.setItem("kimgupall:restore-section-album", "true");
      router.back();
    }
  };

  return (
    <InternalLink
      data-testid="GalleryFooterNavLink"
      className="flex items-center justify-center rounded-full bg-white px-10 py-3 font-mono text-xl font-bold text-black shadow-xl transition-all duration-300 active:scale-95"
      href={link.url}
      ariaLabel={`${link.title}으로 이동`}
      onClick={handleOnClick}
    >
      <span>{link.title}</span>
    </InternalLink>
  );
}
