"use client";

import { useRef, type ReactNode } from "react";
import { useScroll } from "framer-motion";
import StartupOverlay from "@/components/common/StartupOverlay";
import CollectionIndex from "@/components/common/collectionIndex/CollectionIndex";
import ExhibitionTextSection from "@/components/common/exhibition/ExhibitionTextSection";
import IntroScrollScene from "@/components/common/intro/IntroScrollScene";
import MainTitleAnimation from "@/components/common/title/MainTitleAnimation";
import Showcase from "@/components/common/showcase/showcase";

const DESKTOP_CONTENT_OFFSET_CLASS = "md:pl-[clamp(140px,11.5vw,174px)]";

type OffsetSectionProps = {
  children: ReactNode;
  id?: string;
  className?: string;
};

function OffsetSection({ children, id, className = "" }: OffsetSectionProps) {
  return (
    <div id={id} className={`${DESKTOP_CONTENT_OFFSET_CLASS} ${className}`}>
      {children}
    </div>
  );
}

export default function HomeView() {
  const scrollContainerRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress: titleProgress } = useScroll({
    container: scrollContainerRef,
    target: titleRef,
    offset: ["start start", "end start"],
  });

  return (
    <>
      <StartupOverlay />
      <section
        ref={scrollContainerRef}
        data-testid="HomeView"
        className="flex h-dvh w-full flex-col overflow-y-auto bg-none text-white snap-y snap-mandatory"
      >

        <div ref={titleRef} className="h-dvh shrink-0 snap-start">
          <MainTitleAnimation progress={titleProgress} />
        </div>

        <OffsetSection>
          <Showcase endIndex={4} />
        </OffsetSection>

        <div>
          <ExhibitionTextSection
            variant="break"
            eyebrow="夜叉"
            titleLines={["七罪宗"]}
            descriptionLines={["욕망은 사라지지 않고,", "다른 얼굴로 돌아온다."]}
          />
        </div>

        <OffsetSection>
          <Showcase startIndex={4} />
        </OffsetSection>

        <OffsetSection id="section-album" className="h-dvh shrink-0 snap-start">
          <CollectionIndex />
        </OffsetSection>

        <ExhibitionTextSection
          variant="ending"
          eyebrow="졸업전시 2026"
          titleLines={["당신의 시선으로", "전시는 완성됩니다"]}
          closingText="관람해주셔서 감사합니다"
          contacts={[
            { label: "작가", value: "김구팔" },
            {
              label: "인스타그램",
              value: "@kimgupall_98",
              href: "https://www.instagram.com/kimgupall_98/",
            },
            {
              label: "이메일",
              value: "kimgupall98@gmail.com",
              href: "mailto:kimgupall98@gmail.com",
            },
          ]}
        />
      </section>
    </>
  );
}
