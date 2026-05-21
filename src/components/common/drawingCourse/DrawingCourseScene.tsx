"use client";

import {
  useMotionValueEvent,
  useTransform,
  motion,
  type MotionValue,
} from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import type { MediaType } from "@/hooks/useImages";
import { getPublicMediaUrl } from "@/lib/mediaUrl";
import { DrawingCourseProgressArrow } from "./DrawingCourseProgressArrow";
import { DrawingCourseStep } from "./DrawingCourseStep";

const SCENE_BACKGROUND_COLOR = "#ffffff";
const ARROW_WIDTH_RANGE = [0, 0.8];
const ARROW_OPACITY_RANGE = [0.85, 0.9];
const VIDEO_OPACITY_RANGE = [0.9, 1];
const VIDEO_PLAY_PROGRESS = 0.85;
const DEFAULT_VIDEO_ASPECT_RATIO = "3 / 4";
const VIDEO_CARD_CLASS =
  "relative w-[88vw] md:w-[56vw] xl:w-[42vw] max-h-[85vh] flex flex-col gap-5 p-6 rounded-3xl bg-black/10 backdrop-blur-lg border border-white/30 shadow-2xl";

type DrawingCourseSceneProps = {
  medias?: MediaType[];
  scrollYProgress: MotionValue<number>;
};

export function DrawingCourseScene({
  medias,
  scrollYProgress,
}: DrawingCourseSceneProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [progress, setProgress] = useState(0);
  const [shouldPlayVideo, setShouldPlayVideo] = useState(false);

  const arrowWidth = useTransform(
    scrollYProgress,
    ARROW_WIDTH_RANGE,
    ["0%", "100%"],
  );
  const arrowOpacity = useTransform(
    scrollYProgress,
    ARROW_OPACITY_RANGE,
    [1, 0],
  );
  const videoOpacity = useTransform(
    scrollYProgress,
    VIDEO_OPACITY_RANGE,
    [0, 1],
  );

  const sketchMedias =
    medias
      ?.filter((media) => media.type === "IMAGE")
      .sort((a, b) => a.orderIndex - b.orderIndex) ?? [];
  const yachaMvMedia = medias?.find((media) => media.type === "VIDEO");
  const drawingCourseVideoSrc = getPublicMediaUrl(yachaMvMedia?.publicUrl);
  const videoAspectRatio =
    yachaMvMedia?.width && yachaMvMedia.height
      ? `${yachaMvMedia.width} / ${yachaMvMedia.height}`
      : DEFAULT_VIDEO_ASPECT_RATIO;
  const MVWidth = yachaMvMedia?.width || 500;
  const MVHeight = yachaMvMedia?.height || 700;

  const tryPlayVideo = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;

    const playPromise = video.play();

    if (playPromise !== undefined) {
      playPromise.catch((error) => {
        if (process.env.NODE_ENV === "development") {
          console.warn("Drawing course video autoplay failed", error);
        }
      });
    }
  }, []);

  useEffect(() => {
    if (!shouldPlayVideo || !drawingCourseVideoSrc) return;

    tryPlayVideo();
  }, [shouldPlayVideo, drawingCourseVideoSrc, tryPlayVideo]);

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      const total = videoRef.current.duration;
      if (total > 0) {
        setProgress((current / total) * 100);
      }
    }
  };

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest >= VIDEO_PLAY_PROGRESS) {
      setShouldPlayVideo(true);
    }
  });

  // yachaMvMedia width height 값 알아오기
  return (
    <motion.div
      style={{ backgroundColor: SCENE_BACKGROUND_COLOR }}
      className="h-full w-full relative"
    >
      <div className="absolute inset-0 sm:flex items-center justify-center md:p-20">
        {sketchMedias.map((media, index) => (
          <DrawingCourseStep
            key={media.id}
            media={media}
            index={index}
            total={sketchMedias.length}
            scrollYProgress={scrollYProgress}
          />
        ))}

        <motion.div
          style={{ opacity: videoOpacity }}
          className="absolute inset-0 flex items-center-safe justify-center mb-10 z-20"
        >
          <div className={VIDEO_CARD_CLASS}>
            <div
              className="relative rounded-2xl overflow-hidden shadow-xl bg-black/10"
              style={{ aspectRatio: videoAspectRatio }}
            >
              {drawingCourseVideoSrc && (
                <video
                  ref={videoRef}
                  src={drawingCourseVideoSrc}
                  className="inset-0 object-contain w-full h-full"
                  width={MVWidth}
                  height={MVHeight}
                  muted
                  loop
                  preload="metadata"
                  playsInline
                  onLoadedData={tryPlayVideo}
                  onCanPlay={tryPlayVideo}
                  onTimeUpdate={handleTimeUpdate}
                />
              )}
            </div>

            <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-black shadow-[0_0_8px_rgba(0,0,0,0.8)]"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </motion.div>
      </div>

      <DrawingCourseProgressArrow
        opacity={arrowOpacity}
        width={arrowWidth}
      />
    </motion.div>
  );
}
