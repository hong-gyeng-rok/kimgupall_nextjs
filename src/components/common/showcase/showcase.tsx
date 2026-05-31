"use client";

import ArtworkDetailSection from "@/components/common/artwork/ArtworkDetailSection";
import { useCollectionImages } from "@/hooks/useImages";
import { getPublicMediaUrl } from "@/lib/mediaUrl";

type ShowcaseProps = {
  startIndex?: number;
  endIndex?: number;
};

const TEST_PROFILE = `'분노의 야차'는 과거의 죄악을 겪고, '야차'가 되어 도시의 어둠 속에 숨어서 분노의 대상을 찾고있습니다.
분노를 터뜨리는 푸른 불꽃은 여전히 숨쉬고 있습니다.`;

const TEST_MOTIF = `한국의 귀신 '도깨비'를 모티브로 도깨비의 방망이를 현대적인 야구배트로 변화 시켰습니다.
'분노'를 현대의 야차의 모습으로 형상화 되었습니다.`;

export default function Showcase({ startIndex = 0, endIndex }: ShowcaseProps) {
  const { data: images = [] } = useCollectionImages("gallery-yacha");
  const visibleImages = images.slice(startIndex, endIndex);

  return (
    <>
      {visibleImages.map((item, index) => {
        const imageUrl = getPublicMediaUrl(item.publicUrl);
        const title = item.title ?? "야차도";
        const alt = item.altText || item.title || "작품 이미지";

        if (!imageUrl) return null;

        return (
          <ArtworkDetailSection
            key={item.id}
            logoText="夜叉"
            number={`No.${startIndex + index + 1}`}
            title={title}
            image={imageUrl}
            alt={alt}
            profile={TEST_PROFILE}
            motifTitle="MOTIF"
            motif={TEST_MOTIF}
          />
        );
      })}
    </>
  );
}
