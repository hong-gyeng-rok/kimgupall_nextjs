"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

const navLinks = [
  {
    id: 1,
    title: "작품소개",
    targetId: "section-intro",
  },
  {
    id: 2,
    title: "작업과정",
    targetId: "section-drawing",
  },
  {
    id: 3,
    title: "앨범",
    targetId: "section-album",
  },
];

type NavLink = (typeof navLinks)[number];

export default function TitleNav() {
  const { scrollY } = useScroll();
  const [activeSection, setActiveSection] = useState<string>("");
  const [viewportHeight, setViewportHeight] = useState(0);

  // 뷰포트 높이 감지
  useEffect(() => {
    const handleResize = () => setViewportHeight(window.innerHeight);
    handleResize(); // 초기값 설정
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 200vh 시점 계산 (뷰포트 높이가 0일 땐 0 처리)
  const startPoint = viewportHeight * 2;
  const endPoint = viewportHeight * 2.5;

  // 200vh까지는 0, 200vh~250vh 구간에서 서서히 1로 변함
  const opacity = useTransform(scrollY, [startPoint, endPoint], [0, 1]);
  // 200vh~250vh 구간에서 위에서 아래로 내려오는 효과
  const y = useTransform(scrollY, [startPoint, endPoint], [-20, 0]);
  // 200vh 이전에는 클릭 불가능
  const pointerEvents = useTransform(scrollY, (value) =>
    value > startPoint ? "auto" : "none",
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
      className="font-sans fixed top-5 left-1/2 -translate-x-1/2 flex flex-row justify-center items-center gap-2 md:gap-8 z-50 pb-safe w-max max-w-[90vw] px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-black/10 backdrop-blur-lg border border-white/30 shadow-2xl"
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

function Nav({ link, isActive }: { link: NavLink; isActive: boolean }) {
  const handleClick = () => {
    document.getElementById(link.targetId)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <button
      data-testid="HomeViewNavBtn"
      type="button"
      className={`
        flex items-center justify-center text-center relative rounded-full transition-all duration-300
        px-3 py-1.5 text-xs min-w-[60px]
        md:w-25 md:h-10 md:text-lg md:p-2
        ${isActive
          ? "bg-black scale-105 shadow-xl text-white "
          : "text-black"
        }
      `}
      onClick={handleClick}
    >
      <span
        className={`font-medium whitespace-nowrap ${isActive ? "text-white font-bold" : "mix-blend-difference text-white"}`}
      >
        {link.title}
      </span>
    </button>
  );
}
