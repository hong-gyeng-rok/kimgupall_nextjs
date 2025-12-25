"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";

interface TypewriterProps {
  text: string;
  speed?: number;
  className?: string;
  delay?: number;
  loop?: boolean;
  waitTime?: number;
  show?: boolean; // 외부 제어용 prop
}

export default function Typewriter({
  text,
  speed = 0.1,
  className = "",
  delay = 0,
  loop = true,
  waitTime = 3,
  show, // 외부에서 제어할 때 사용
}: TypewriterProps) {
  const controls = useAnimation();

  useEffect(() => {
    // 1. 외부 제어 모드 (show prop이 제공된 경우)
    if (show !== undefined) {
      if (show) {
        controls.start("visible");
      } else {
        controls.start("hidden");
      }
      return;
    }

    // 2. 내부 루프 모드 (기존 로직)
    const sequence = async () => {
      if (delay > 0) {
        await new Promise((resolve) => setTimeout(resolve, delay * 1000));
      }

      while (loop) {
        await controls.start("visible");
        await new Promise((resolve) => setTimeout(resolve, waitTime * 1000));
        if (!loop) break;
        await controls.start("hidden");
        await new Promise((resolve) => setTimeout(resolve, 500));
      }
    };

    if (loop) {
      sequence();
    } else {
      controls.start("visible");
    }
  }, [controls, delay, loop, text.length, speed, waitTime, show]);

  const containerVariants = {
    hidden: { 
      opacity: 0,
      transition: {
        staggerChildren: 0.05, // 사라질 때는 빠르게
        staggerDirection: -1, // 뒤에서부터 사라짐 (선택사항)
        when: "afterChildren", // 자식들이 다 사라진 뒤 컨테이너 숨김
      }
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: speed,
        delayChildren: show !== undefined ? delay : 0, // 외부 제어일 때만 delay 적용
      },
    },
  };

  const childVariants = {
    hidden: { 
      opacity: 0, 
      y: 10,
      transition: { 
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate={controls}
      className={`inline-block ${className}`}
      aria-label={text}
    >
      {text.split("\n").map((line, index) => (
        <motion.span
          key={`${line}-${index}`}
          variants={childVariants}
          className="block" // 줄바꿈을 위해 block 처리
        >
          {line || "\u00A0" /* 빈 줄일 경우 높이 유지를 위해 공백 문자 삽입 */}
        </motion.span>
      ))}
    </motion.div>
  );
}

