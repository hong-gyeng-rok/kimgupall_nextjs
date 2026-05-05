"use client";

import {
  useMotionValueEvent,
  useScroll,
  useTransform,
  motion,
} from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";
import { useImages } from "@/hooks/useImages";
import { getPublicMediaUrl } from "@/lib/mediaUrl";

export default function DrawingProcessSequence() {
  const { data: medias } = useImages((data) =>
    data.filter(
      (media) =>
        media.location === "DRAWING_COURSE" ||
        media.collection?.location === "DRAWING_COURSE",
    ),
  );

  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [progress, setProgress] = useState(0);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      const total = videoRef.current.duration;
      if (total > 0) {
        setProgress((current / total) * 100);
      }
    }
  };

  // 애니메이션 수치는 기존과 동일하게 유지
  const arrowWidth = useTransform(scrollYProgress, [0, 0.8], ["0%", "87.5%"]);
  const arrowOpacity = useTransform(scrollYProgress, [0.85, 0.9], [1, 0]);

  const opacityA = useTransform(scrollYProgress, [0.1, 0.2, 0.3], [0, 1, 0]);
  const opacityB = useTransform(scrollYProgress, [0.3, 0.4, 0.5], [0, 1, 0]);
  const opacityC = useTransform(scrollYProgress, [0.5, 0.6, 0.7], [0, 1, 0]);
  const opacityD = useTransform(scrollYProgress, [0.7, 0.8, 0.9], [0, 1, 0]);

  const opacityMovie = useTransform(scrollYProgress, [0.9, 1.0], [0, 1]);
  const MovieBg = useTransform(
    scrollYProgress,
    [0.85, 0.95],
    ["#ffffff", "rgba(255,255,255,1)"],
  );

  const opacities = [opacityA, opacityB, opacityC, opacityD];
  const sketchMedias =
    medias
      ?.filter((media) => media.type === "IMAGE")
      .sort((a, b) => a.orderIndex - b.orderIndex) ?? [];
  const yachaMvMedia = medias?.find((media) => media.type === "VIDEO");
  const drawingCourseVideoSrc = getPublicMediaUrl(yachaMvMedia?.publicUrl);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest >= 0.85) {
      setShouldLoadVideo(true);
    }
  });

  return (
    <div ref={containerRef} className="h-[300vh] relative w-full">
      <motion.div
        style={{ backgroundColor: MovieBg }}
        className="sticky top-0 h-screen w-full  overflow-hidden"
      >
        <div className="flex w-full h-full max-h-[80vh] justify-center items-center px-10 ">
          {sketchMedias.map((media, index) => (
            <motion.span
              key={media.id}
              style={{ opacity: opacities[index] }}
              className="relative sm:flex sm:flex-col items-center"
            >
              <Image
                src={getPublicMediaUrl(media.publicUrl) ?? ""}
                alt={media.description ?? "sketch Image"}
                width={300}
                height={400}
                className="w-full max-w-xl px-4 md:px-0 h-[60vh] object-contain"
              />
              <p className="font-sans font-bold text-3xl mt-4 text-center">
                STEP {index + 1}
              </p>
            </motion.span>
          ))}

          <motion.div
            style={{ opacity: opacityMovie }}
            className=" absolute inset-0 flex items-center justify-center z-10"
          >
            <div className="relative w-full max-w-xl mx-4 flex flex-col gap-5 p-6 rounded-3xl bg-black/10 backdrop-blur-lg border border-white/30 shadow-2xl">
              <div className="relative rounded-2xl overflow-hidden shadow-xl">
                {shouldLoadVideo && drawingCourseVideoSrc && (
                  <video
                    ref={videoRef}
                    src={drawingCourseVideoSrc}
                    className="w-full h-auto"
                    muted
                    loop
                    playsInline
                    autoPlay
                    preload="none"
                    onTimeUpdate={handleTimeUpdate}
                  />
                )}
              </div>

              {/* 프로그레스 바 */}
              <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-black shadow-[0_0_8px_rgba(0,0,0,0.8)]"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </motion.div>
        </div>
        <motion.div
          style={{ opacity: arrowOpacity }}
          className="font-sans text-black flex flex-row w-full px-4 md:px-10 items-center gap-4 absolute bottom-15 z-50 h-0 pb-safe"
        >
          <p className="text-xl md:text-3xl  font-bold">작업 전</p>
          <motion.div
            style={{ width: arrowWidth }}
            className="h-1 bg-black relative max-w-47.5 sm:max-w-70 xl:max-w-full"
          >
            <div className="absolute right-px top-1/2 -translate-y-1/2 w-5 h-5 border-t-3 border-r-3 border-solid rotate-45" />
          </motion.div>
          <p className="text-black text-xl md:text-3xl  font-bold">작업 후</p>
        </motion.div>
      </motion.div>
    </div>
  );
}
