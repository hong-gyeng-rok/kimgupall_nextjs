import { useCallback, useEffect, useRef } from "react";
import { useIntroImages } from "@/hooks/useImages";
import { getPublicMediaUrl } from "@/lib/mediaUrl";

const DEFAULT_WIDTH = 1300;
const DEFAULT_HEIGHT = 500;
const INTRO_VIDEO_FRAME_CLASS =
  "relative w-[92vw] md:w-[72vw] xl:w-[64vw] overflow-hidden rounded-lg shadow-xl";

export default function IntroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  const { data: medias, isLoading, isError, error } = useIntroImages();

  const targetMedia = medias
    ?.filter((media) => media.type === "VIDEO")
    .sort((a, b) => b.orderIndex - a.orderIndex)[0];

  const introVideoSrc = getPublicMediaUrl(targetMedia?.publicUrl);

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
          console.warn("Intro video autoplay failed", error);
        }
      });
    }
  }, []);

  useEffect(() => {
    if (!introVideoSrc) return;

    tryPlayVideo();
  }, [introVideoSrc, tryPlayVideo]);

  if (isLoading) {
    return (
      <div
        className={`${INTRO_VIDEO_FRAME_CLASS} bg-gray-200 animate-pulse`}
        style={{
          aspectRatio: `${DEFAULT_WIDTH} / ${DEFAULT_HEIGHT}`,
        }}
      />
    );
  }
  if (isError) return <p>에러 발생 : {error?.message}</p>;

  //targetMedia(introMv) width, height 값 알아오기
  return (
    <div
      className={INTRO_VIDEO_FRAME_CLASS}
      style={{
        aspectRatio: `${targetMedia?.width ?? DEFAULT_WIDTH} / ${targetMedia?.height ?? DEFAULT_HEIGHT}`,
      }}
    >
      {introVideoSrc && (
        <video
          ref={videoRef}
          src={introVideoSrc}
          className="absolute inset-0 object-contain w-full h-full"
          width={targetMedia?.width ?? DEFAULT_WIDTH}
          height={targetMedia?.height ?? DEFAULT_HEIGHT}
          muted
          loop
          preload="auto"
          autoPlay
          playsInline
          onLoadedData={tryPlayVideo}
          onCanPlay={tryPlayVideo}
        />
      )}
    </div>
  );
}
