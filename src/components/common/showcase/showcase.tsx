"use client";

import { useEffect, useState } from "react";
import ArtworkDetailSection from "@/components/common/artwork/ArtworkDetailSection";
import MobileArtworkShowcase from "@/components/common/showcase/MobileArtworkShowcase";
import { useCollectionImages } from "@/hooks/useImages";
import { getPublicMediaUrl } from "@/lib/mediaUrl";

type ShowcaseProps = {
  startIndex?: number;
  endIndex?: number;
};

const TEST_PROFILE = (
  <>
    <strong className="font-bold text-white">'분노의 야차'</strong>는 과거의
    죄악을 겪고, <strong className="font-bold text-white">'야차'</strong>가 되어 도시의 어둠 속에 숨어서 분노의 대상을
    찾고있습니다.
    <br />
    분노를 터뜨리는 <strong className="font-bold text-white">푸른 불꽃</strong>은 여전히 숨쉬고 있습니다.
  </>
);

const TEST_MOTIF = (
  <>
    한국의 귀신 <strong className="font-bold text-white">'도깨비'</strong>를
    모티브로 도깨비의 <strong className="font-bold text-white">방망이</strong>를 현대적인 <strong className="font-bold text-white">야구배트</strong>
    <br />
    <strong className="font-bold text-white">'분노'</strong>를 현대의 야차의
    모습으로 형상화 되었습니다.
  </>
);

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState<boolean | null>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    const updateIsDesktop = () => setIsDesktop(mediaQuery.matches);

    updateIsDesktop();

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", updateIsDesktop);
      return () => {
        mediaQuery.removeEventListener("change", updateIsDesktop);
      };
    }

    mediaQuery.addListener(updateIsDesktop);
    return () => {
      mediaQuery.removeListener(updateIsDesktop);
    };
  }, []);

  return isDesktop;
}

export default function Showcase({ startIndex = 0, endIndex }: ShowcaseProps) {
  const isDesktop = useIsDesktop();
  const { data: images = [] } = useCollectionImages("gallery-yacha");
  const visibleImages = images.slice(startIndex, endIndex);

  const showcaseItems = visibleImages
    .map((item, index) => {
      const imageUrl = getPublicMediaUrl(item.publicUrl);
      const title = item.title ?? "야차도";
      const alt = item.altText || item.title || "작품 이미지";

      if (!imageUrl) return null;

      return {
        id: item.id,
        logoText: "夜叉",
        number: `No.${startIndex + index + 1}`,
        title,
        image: imageUrl,
        alt,
        width: item.width,
        height: item.height,
        profile: TEST_PROFILE,
        motifTitle: "도깨비",
        motif: TEST_MOTIF,
        reversed: index % 2 === 1,
      };
    })
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  if (isDesktop === null) return null;

  if (!isDesktop) {
    return <MobileArtworkShowcase items={showcaseItems} />;
  }

  return (
    <>
      {showcaseItems.map((item) => (
        <ArtworkDetailSection
          key={item.id}
          logoText={item.logoText}
          number={item.number}
          title={item.title}
          image={item.image}
          alt={item.alt}
          profile={item.profile}
          motifTitle={item.motifTitle}
          motif={item.motif}
          reversed={item.reversed}
        />
      ))}
    </>
  );
}
