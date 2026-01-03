"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import InternalLink from "../internalLink";
import { Link } from "../../../types/links";
import { useEffect, useState } from "react";

const navLinks = [
  {
    id: 1,
    title: "작품소개",
    url: "/page/intro",
    targetId: "section-intro",
  },
  {
    id: 2,
    title: "작업과정",
    url: "/page/drawingCourse",
    targetId: "section-drawing",
  },
  {
    id: 3,
    title: "앨범",
    url: "/page/album",
    targetId: "section-album",
  },
];

export default function TitleNav() {
  const { scrollY } = useScroll();
  const [activeSection, setActiveSection] = useState<string>("");

  // 0px ~ 100px 스크롤 구간 동안 투명도가 0 -> 1로 변함
  const opacity = useTransform(scrollY, [0, 100], [0, 1]);
  // 0px ~ 100px 스크롤 구간 동안 Y축 위치가 20px -> 0px (살짝 아래에서 올라옴)
  const y = useTransform(scrollY, [0, 100], [20, 0]);
  // 투명도가 0일 때 클릭 방지
  const pointerEvents = useTransform(scrollY, (value) =>
    value > 0 ? "auto" : "none",
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-45% 0px -45% 0px", // 화면 중앙 10% 영역에 들어오면 감지
        threshold: 0,
      },
    );

    navLinks.forEach((link) => {
      const element = document.getElementById(link.targetId);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <motion.nav
      data-testid="TitleNav"
      style={{ opacity, y, pointerEvents }}
      className="font-mono fixed top-5 left-1/2 -translate-x-1/2 flex flex-row justify-center items-center gap-5 md:gap-8 z-50 pb-safe w-fit px-4 py-2 rounded-full bg-black/10 backdrop-blur-lg border border-white/30 shadow-2xl"
    >
      {navLinks.map((link) => (
        <Nav
          key={link.id}
          link={link}
          isActive={activeSection === link.targetId}
        />
      ))}
    </motion.nav>
  );
}

function Nav({ link, isActive }: { link: Link; isActive: boolean }) {
  return (
    <InternalLink
      data-testid="HomeViewNavBtn"
      className={`
        flex items-center justify-center text-center md:w-25 md:h-10 relative text-md md:text-lg p-2 rounded-full transition-all duration-300
        ${
          isActive
            ? "bg-black  scale-105 shadow-xl text-white  "
            : " text-black "
        }
      `}
      href={link.url}
      onClick={() => {
        if (typeof window !== "undefined") {
          sessionStorage.setItem("home_scroll_pos", window.scrollY.toString());
        }
      }}
    >
      <span
        className={`font-medium ${isActive ? "text-white font-bold" : "mix-blend-difference text-white"}`}
      >
        {link.title}
      </span>
    </InternalLink>
  );
}
