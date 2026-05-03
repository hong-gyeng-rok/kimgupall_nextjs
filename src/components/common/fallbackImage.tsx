"use client";

import Image, { ImageProps } from "next/image";
import { useState, useEffect } from "react";

interface FallbackImageProps extends ImageProps {
  fallbackSrc?: string;
}

const STORAGE_BASE_URL = (
  process.env.NEXT_PUBLIC_GCP_STORAGE_URL ?? ""
).replace(/\/$/, "");

export default function FallbackImage({
  src,
  alt,
  fallbackSrc = `${STORAGE_BASE_URL}/gallery/yacha/9990.yacha_force.jpg`,
  ...props
}: FallbackImageProps) {
  const [imgSrc, setImgSrc] = useState(src);

  useEffect(() => {
    setImgSrc(src);
  }, [src]);

  return (
    <Image
      {...props}
      src={imgSrc}
      alt={alt}
      onError={() => {
        setImgSrc(fallbackSrc);
      }}
    />
  );
}
