"use client";

import Image, { ImageProps } from "next/image";
import { useState, useEffect } from "react";

interface FallbackImageProps extends ImageProps {
  fallbackSrc?: string;
}

export default function FallbackImage({
  src,
  alt,
  fallbackSrc = "/sampleImages/yacha.jpg", // 기본 대체 이미지 (public 폴더 내 존재하는 이미지로 설정)
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
