import { useRef } from "react";
import { useIntroImages } from "@/hooks/useImages";

const STORAGE_BASE_URL = (
  process.env.NEXT_PUBLIC_GCP_STORAGE_URL ?? ""
).replace(/\/$/, "");

const DEFAULT_WIDTH = 1300;
const DEFAULT_HEIGHT = 500;

export default function IntroTitle() {
  const videoRef = useRef<HTMLVideoElement>(null);

  const { data: medias, isLoading, isError, error } = useIntroImages();

  const targetMedia = medias?.find(
    (media) => media.title === "introMv" && media.type === "VIDEO",
  );

  const introMvSrc = targetMedia?.publicUrl
    ? `${STORAGE_BASE_URL}${targetMedia.publicUrl}`
    : undefined;

  if (isLoading) {
    return (
      <div
        className="w-full h-full bg-gray-200 animate-pulse rounded-lg"
        style={{
          aspectRatio: `${DEFAULT_WIDTH} / ${DEFAULT_HEIGHT}`,
          maxHeight: "100%",
        }}
      />
    );
  }
  if (isError) return <p>에러 발생 : {error?.message}</p>;

  return (
    <>
      {introMvSrc && (
        <video
          ref={videoRef}
          src={introMvSrc}
          className="w-auto h-full max-h-full object-contain rounded-lg shadow-xl max-w-6xl"
          width={targetMedia?.width ?? DEFAULT_WIDTH}
          height={targetMedia?.height ?? DEFAULT_HEIGHT}
          muted
          loop
          preload="none"
          autoPlay
          playsInline
        />
      )}
    </>
  );
}
