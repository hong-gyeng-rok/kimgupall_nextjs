import { useRef } from "react";
import { useIntroImages } from "@/hooks/useImages";
import { getPublicMediaUrl } from "@/lib/mediaUrl";

const DEFAULT_WIDTH = 1300;
const DEFAULT_HEIGHT = 500;

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
      {introVideoSrc && (
        <video
          ref={videoRef}
          src={introVideoSrc}
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
