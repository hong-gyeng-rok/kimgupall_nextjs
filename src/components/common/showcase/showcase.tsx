"use client";

import { useEffect, useState } from "react";
import ArtworkDetailSection from "@/components/common/artwork/ArtworkDetailSection";
import SimpleMarkdown from "@/components/common/markdown/SimpleMarkdown";
import MobileArtworkShowcase from "@/components/common/showcase/MobileArtworkShowcase";
import { useCollectionImages } from "@/hooks/useImages";
import { resolveMediaUrl } from "@/lib/exhibitionCache/mediaUrl";

type ShowcaseProps = {
  startIndex?: number;
  endIndex?: number;
};

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
      const imageUrl = resolveMediaUrl(item);
      const title = item.subtitle ?? item.title ?? "야차도";
      const alt = item.altText || item.subtitle || item.title || "작품 이미지";

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
        profile: <SimpleMarkdown text={item.profileMarkdown} />,
        motifTitle: item.motifTitle ?? undefined,
        motif: <SimpleMarkdown text={item.motifMarkdown} />,
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
          width={item.width}
          height={item.height}
          profile={item.profile}
          motifTitle={item.motifTitle}
          motif={item.motif}
          reversed={item.reversed}
        />
      ))}
    </>
  );
}
