"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import InternalLink from "../internalLink";
import { Link } from "../../../types/links";

const navLinks = [
  {
    id: 1,
    title: "작품소개",
    url: "/page/intro",
  },
  {
    id: 2,
    title: "작업과정",
    url: "/page/drawingCourse",
  },
  {
    id: 3,
    title: "앨범",
    url: "/page/album",
  },
];

export default function TitleNav() {
  const { scrollY } = useScroll();

  // 0px ~ 100px 스크롤 구간 동안 투명도가 0 -> 1로 변함
  const opacity = useTransform(scrollY, [0, 100], [0, 1]);
  // 0px ~ 100px 스크롤 구간 동안 Y축 위치가 20px -> 0px (살짝 아래에서 올라옴)
  const y = useTransform(scrollY, [0, 100], [20, 0]);
  // 투명도가 0일 때 클릭 방지
  const pointerEvents = useTransform(scrollY, (value) =>
    value > 0 ? "auto" : "none",
  );

  return (
    <motion.nav
      data-testid="TitleNav"
      style={{ opacity, y, pointerEvents }}
      className="font-mono sticky bottom-5 flex flex-row justify-center items-center gap-5 md:gap-8 mx-auto z-50 pb-safe w-fit px-4 py-2 rounded-full bg-black/10 backdrop-blur-lg border border-white/30 shadow-2xl"
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
      data-testid="HomeViewNavBtn"
      className=" flex items-center justify-center text-center md:w-40 md:h-10 relative text-stone-900 text-lg md:text-2xl  py-2 px-5 md:px-6 rounded-full border border-white/40 bg-gradient-to-b from-white to-white/20 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.8)] transition-all duration-300 hover:scale-105 hover:from-white/80 hover:to-white/70 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:font-bold hover:animate-bounce"
      href={link.url}
      onClick={() => {
        // 갤러리로 이동하기 전 현재 스크롤 위치 저장
        if (typeof window !== "undefined") {
          sessionStorage.setItem("home_scroll_pos", window.scrollY.toString());
        }
      }}
    >
      {link.title}
    </InternalLink>
  );
}
