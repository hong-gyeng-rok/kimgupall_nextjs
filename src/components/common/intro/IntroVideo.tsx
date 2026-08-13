import { useCallback, useEffect, useRef, useState } from "react";
import { useIntroImages } from "@/hooks/useImages";
import { getPublicMediaUrl } from "@/lib/mediaUrl";
import { resolvePosterUrl } from "@/lib/exhibitionCache/mediaUrl";

const DEFAULT_WIDTH = 1300;
const DEFAULT_HEIGHT = 500;
const INTRO_VIDEO_FRAME_CLASS =
  "relative w-[92vw] md:w-[72vw] xl:w-[64vw] overflow-hidden rounded-lg shadow-xl";

export default function IntroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasVideoError, setHasVideoError] = useState(false);

  const { data: medias, isLoading, isError, error } = useIntroImages();

  const targetMedia = medias
    ?.filter((media) => media.type === "VIDEO")
    .sort((a, b) => b.orderIndex - a.orderIndex)[0];

  const introVideoSrc = getPublicMediaUrl(targetMedia?.publicUrl);
  const posterUrl = resolvePosterUrl(targetMedia);

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
      {introVideoSrc && !hasVideoError ? (
        <video
          ref={videoRef}
          src={introVideoSrc}
          className="absolute inset-0 object-contain w-full h-full"
          width={targetMedia?.width ?? DEFAULT_WIDTH}
          height={targetMedia?.height ?? DEFAULT_HEIGHT}
          muted
          loop
          playsInline
          autoPlay
          preload="auto"
          onLoadedData={tryPlayVideo}
          onCanPlay={tryPlayVideo}
          onError={() => setHasVideoError(true)}
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-black text-center text-sm text-white/60">
          {posterUrl ? (
            // eslint-disable-next-line @next/next/no-img-element -- Native cached poster URLs are not supported by next/image.
            <img
              src={posterUrl}
              alt={targetMedia?.altText ?? "영상 포스터"}
              className="h-full w-full object-contain"
            />
          ) : (
            <p>오프라인에서는 영상을 재생할 수 없습니다.</p>
          )}
        </div>
      )}
    </div>
  );
}
