import { useRef } from "react";
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
          className="absolute inset-0 h-full w-full object-contain"
          width={targetMedia?.width ?? DEFAULT_WIDTH}
          height={targetMedia?.height ?? DEFAULT_HEIGHT}
          muted
          loop
          preload="auto"
          autoPlay
          playsInline
        />
      )}
    </div>
  );
}
