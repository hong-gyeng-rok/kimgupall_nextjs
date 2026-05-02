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
    <div className="w-full h-full flex items-center justify-center px-4 md:px-0 max-w-7xl mx-auto ">
      {introMvSrc && (
        <video
          ref={videoRef}
          src={introMvSrc}
          className="w-full h-auto max-h-[80vh] object-contain rounded-lg shadow-xl md:max-w-5xl lg:max-w-6xl"
          width={targetMedia?.width ?? DEFAULT_WIDTH}
          height={targetMedia?.height ?? DEFAULT_HEIGHT}
          muted
          loop
          preload="none"
          autoPlay
          playsInline
        />
      )}
    </div>
  );
}
