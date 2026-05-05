"use client";

import Image, { ImageProps } from "next/image";
import { useState, useEffect } from "react";

interface FallbackImageProps extends ImageProps {
  fallbackSrc?: string;
}

export default function FallbackImage({
  src,
  alt,
  fallbackSrc,
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
        if (fallbackSrc) {
          setImgSrc(fallbackSrc);
        }
      }}
    />
  );
}
