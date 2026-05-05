"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { useIntroImages } from "@/hooks/useImages";
import LoadingOverlay from "../common/loadingOverlay";

const STORAGE_BASE_URL = (
  process.env.NEXT_PUBLIC_GCP_STORAGE_URL ?? ""
).replace(/\/$/, "");

export default function HomeClientEffects() {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const { data: medias, isLoading, isError } = useIntroImages();

  const targetMedia = medias?.find(
    (media) => media.title === "mainPatten 2" && media.type === "IMAGE",
  );

  const bgImgSrc = targetMedia?.publicUrl
    ? `${STORAGE_BASE_URL}${targetMedia.publicUrl}`
    : undefined;

  useEffect(() => {
    const savedPos = sessionStorage.getItem("home_scroll_pos");
    if (!savedPos) return;

    setTimeout(() => {
      window.scrollTo({
        top: Number(savedPos),
        behavior: "instant",
      });
      sessionStorage.removeItem("home_scroll_pos");
    }, 100);
  }, []);

  const shouldShowOverlay = isLoading || Boolean(bgImgSrc && !isImageLoaded);

  return (
    <>
      {bgImgSrc && !isError && !isImageLoaded && (
        <Image
          key={bgImgSrc}
          src={bgImgSrc}
          alt=""
          width={100}
          height={100}
          className="pointer-events-none absolute size-px opacity-0"
          priority
          onLoad={() => setIsImageLoaded(true)}
          onError={() => setIsImageLoaded(true)}
        />
      )}
      <AnimatePresence>
        {shouldShowOverlay && !isError && <LoadingOverlay />}
      </AnimatePresence>
    </>
  );
}
