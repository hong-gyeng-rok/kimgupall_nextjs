"use client";

import React from "react";
import { motion } from "framer-motion";
import InternalLink from "@/components/common/internalLink";
import { useRouter } from "next/navigation";

const backButtonClassName =
  "flex items-center justify-center rounded-full bg-white px-10 py-3 font-mono text-xl font-bold text-black shadow-xl transition-all duration-300 active:scale-95";
const homeButtonClassName =
  "flex items-center justify-center rounded-full border border-white bg-black px-10 py-3 font-mono text-xl font-bold text-white shadow-xl transition-all duration-300 active:scale-95";

export default function GalleryFooterNav() {
  const router = useRouter();

  const handleBackClick = (e?: React.MouseEvent) => {
    e?.preventDefault();
    window.sessionStorage.setItem("kimgupall:restore-section-album", "true");
    router.back();
  };

  const handleHomeClick = (e?: React.MouseEvent) => {
    e?.preventDefault();
    window.sessionStorage.setItem("kimgupall:restore-home-top", "true");
    router.push("/");
  };

  return (
    <motion.nav
      id="GalleryFooterNav"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="font-mono mx-auto hidden w-fit shrink-0 flex-row items-center justify-center gap-4 md:flex"
    >
      <InternalLink
        data-testid="GalleryFooterNavBackLink"
        className={backButtonClassName}
        href="#"
        ariaLabel="컬렉션 인덱스로 돌아가기"
        onClick={handleBackClick}
      >
        뒤로가기
      </InternalLink>
      <InternalLink
        data-testid="GalleryFooterNavHomeLink"
        className={homeButtonClassName}
        href="/"
        ariaLabel="처음 화면으로 이동"
        onClick={handleHomeClick}
      >
        처음으로
      </InternalLink>
    </motion.nav>
  );
}
