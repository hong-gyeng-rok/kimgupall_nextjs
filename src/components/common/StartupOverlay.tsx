"use client";

import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import LoadingOverlay from "@/components/common/loadingOverlay";

interface StartupOverlayProps {
  preloadSrc?: string | null;
  timeoutMs?: number;
}

export default function StartupOverlay({
  preloadSrc,
  timeoutMs = 2500,
}: StartupOverlayProps) {
  const [visible, setVisible] = useState(Boolean(preloadSrc));

  useEffect(() => {
    if (!preloadSrc) {
      return;
    }

    const image = new window.Image();
    const timeoutId = window.setTimeout(() => {
      setVisible(false);
    }, timeoutMs);

    const finish = () => {
      window.clearTimeout(timeoutId);
      setVisible(false);
    };

    image.onload = finish;
    image.onerror = finish;
    image.src = preloadSrc;

    return () => {
      window.clearTimeout(timeoutId);
      image.onload = null;
      image.onerror = null;
    };
  }, [preloadSrc, timeoutMs]);

  return <AnimatePresence>{visible && <LoadingOverlay />}</AnimatePresence>;
}
