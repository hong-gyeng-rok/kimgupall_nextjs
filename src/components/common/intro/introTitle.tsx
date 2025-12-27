import Image from "next/image";
import { useRef, useState } from "react";
import yacha_font from "../../../../public/sampleImages/BG_DPI300.jpg";

export default function IntroTitle() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const introTitleImg = yacha_font;

  return (
    <>
      {/**

      <Image
        data-testid="IntronTitle"
        src={introTitleImg}
        alt="yacha_font"
        width={1350}
        height={500}
        className="object-contain relative top-1/12 w-9/12"
      />
      */}

      <video
        ref={videoRef}
        src="/sampleImages/introMv.mp4"
        className="relative top-12 w-9/12 object-contain"
        width={1300}
        height={500}
        muted
        loop
        preload="auto"
        autoPlay
        playsInline
      />
    </>
  );
}
