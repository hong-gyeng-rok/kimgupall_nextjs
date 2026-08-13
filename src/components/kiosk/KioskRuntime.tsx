"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

const IDLE_RESET_MS = 120_000;
const RESTORE_HOME_TOP_KEY = "kimgupall:restore-home-top";
const KIOSK_RESET_EVENT = "kimgupall:kiosk-reset";
const KIOSK_BOTTOM_STATE_EVENT = "kimgupall:kiosk-bottom-state";
const KIOSK_SCROLL_STATE_EVENT = "kimgupall:kiosk-scroll-state";

const activityEvents = [
  "pointerdown",
  "touchstart",
  "click",
  "keydown",
  "scroll",
] as const;

export default function KioskRuntime() {
  const router = useRouter();
  const pathname = usePathname();
  const timeoutRef = useRef<number | null>(null);
  const pathnameRef = useRef(pathname);
  const [isAtPageBottom, setIsAtPageBottom] = useState(false);
  const [isAtPageTop, setIsAtPageTop] = useState(true);

  useEffect(() => {
    pathnameRef.current = pathname;
  }, [pathname]);

  const resetToHome = useCallback(() => {
    window.dispatchEvent(new CustomEvent(KIOSK_RESET_EVENT));

    if (pathnameRef.current === "/") {
      window.sessionStorage.setItem(RESTORE_HOME_TOP_KEY, "true");
      window.dispatchEvent(new CustomEvent("kimgupall:scroll-home-top"));
      return;
    }

    window.sessionStorage.setItem(RESTORE_HOME_TOP_KEY, "true");
    router.push("/");
  }, [router]);

  const resetIdleTimer = useCallback(() => {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = window.setTimeout(resetToHome, IDLE_RESET_MS);
  }, [resetToHome]);

  useEffect(() => {
    resetIdleTimer();

    activityEvents.forEach((eventName) => {
      window.addEventListener(eventName, resetIdleTimer, { passive: true });
    });

    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }

      activityEvents.forEach((eventName) => {
        window.removeEventListener(eventName, resetIdleTimer);
      });
    };
  }, [resetIdleTimer]);

  useEffect(() => {
    const updateWindowScrollState = () => {
      const distanceToBottom =
        document.documentElement.scrollHeight - window.innerHeight - window.scrollY;

      setIsAtPageTop(window.scrollY <= 24);
      setIsAtPageBottom(distanceToBottom <= 24);
    };

    const updateCustomBottomState = (event: Event) => {
      const customEvent = event as CustomEvent<{ isAtBottom: boolean }>;
      setIsAtPageBottom(Boolean(customEvent.detail?.isAtBottom));
    };

    const updateCustomScrollState = (event: Event) => {
      const customEvent = event as CustomEvent<{
        isAtTop: boolean;
        isAtBottom: boolean;
      }>;

      setIsAtPageTop(Boolean(customEvent.detail?.isAtTop));
      setIsAtPageBottom(Boolean(customEvent.detail?.isAtBottom));
    };

    updateWindowScrollState();

    window.addEventListener("scroll", updateWindowScrollState, { passive: true });
    window.addEventListener(KIOSK_BOTTOM_STATE_EVENT, updateCustomBottomState);
    window.addEventListener(KIOSK_SCROLL_STATE_EVENT, updateCustomScrollState);

    return () => {
      window.removeEventListener("scroll", updateWindowScrollState);
      window.removeEventListener(KIOSK_BOTTOM_STATE_EVENT, updateCustomBottomState);
      window.removeEventListener(KIOSK_SCROLL_STATE_EVENT, updateCustomScrollState);
    };
  }, []);

  if (pathname === "/gallery" || pathname.startsWith("/gallery/")) return null;
  const shouldShowControls = !(pathname === "/" && isAtPageTop);

  return (
    <AnimatePresence>
      {shouldShowControls ? (
        <motion.div
          key="home-kiosk-controls"
          className="pointer-events-none fixed inset-0 z-40"
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <motion.aside
            variants={{
              hidden: { x: -64, opacity: 0 },
              visible: { x: 0, opacity: 1 },
            }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="absolute left-0 top-0 hidden h-dvh w-[clamp(140px,11.5vw,174px)] overflow-hidden bg-black px-[clamp(0.5rem,1vw,1rem)] py-[clamp(1.5rem,1.9vw,1.75rem)] [container-type:inline-size] md:block"
            aria-hidden="true"
          >
            <div className="grid w-full justify-items-end gap-[clamp(0.5rem,5cqw,0.75rem)]">
              <p className="justify-self-center text-center [font-family:var(--font-kimsaeng)] text-[clamp(2rem,24cqw,2.25rem)] font-black leading-none text-white">
                七罪宗
              </p>
              <p className="max-w-full justify-self-end whitespace-nowrap text-right text-[clamp(1.25rem,16cqw,1.5rem)] font-black uppercase leading-none tracking-[-0.1em] text-white">
                GRADUATION
              </p>
              <p className="justify-self-end text-right text-[clamp(0.875rem,10.6cqw,1rem)] font-light leading-none tracking-[-0.04em] text-white/90">
                2026
              </p>
            </div>
          </motion.aside>

          <motion.div
            variants={{
              hidden: { x: -64, opacity: 0 },
              visible: { x: 0, opacity: 1 },
            }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <div
              className={`absolute left-6 grid justify-items-start gap-1 uppercase leading-none tracking-[-0.04em] text-white transition-[bottom] duration-500 ease-out ${
                isAtPageBottom ? "bottom-6" : "bottom-24"
              }`}
              aria-hidden="true"
            >
              <p className="text-sm font-light text-white/70 md:text-base">
                ARTIST BY
              </p>
              <p className="text-xl font-black md:text-2xl">KIMGUPALL</p>
            </div>
          </motion.div>

          <motion.div
            variants={{
              hidden: { y: 64, opacity: 0 },
              visible: { y: 0, opacity: 1 },
            }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <button
              type="button"
              className={`pointer-events-auto absolute bottom-6 z-10 touch-manipulation rounded-full border border-white px-8 py-3 font-mono text-base font-bold shadow-2xl transition-all duration-500 ease-out active:scale-95 md:px-10 md:text-xl ${
                isAtPageBottom
                  ? "left-1/2 -translate-x-1/2 bg-white text-black"
                  : "left-6 translate-x-0 bg-black text-white"
              }`}
              onClick={resetToHome}
              aria-label="처음 화면으로 이동"
            >
              처음으로
            </button>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
