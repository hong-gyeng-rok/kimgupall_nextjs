"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { useScroll } from "framer-motion";
import StartupOverlay from "@/components/common/StartupOverlay";
import CollectionIndex from "@/components/common/collectionIndex/CollectionIndex";
import ExhibitionTextSection from "@/components/common/exhibition/ExhibitionTextSection";
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

function MobileMainTitle() {
  return (
    <section className="flex h-dvh shrink-0 flex-col items-center justify-center gap-4 bg-black px-4 text-center text-white">
      <h1 className="whitespace-nowrap text-[clamp(2.75rem,12vw,4.5rem)] font-black leading-none tracking-[-0.08em]">
        GRADUATION
      </h1>
      <p className="whitespace-nowrap text-[clamp(3rem,16vw,4.5rem)] font-black leading-none tracking-[-0.08em]">
        2026
      </p>
      <p className="whitespace-nowrap text-lg font-light italic leading-none text-white/70">
        ARTIST BY KIMGUPALL
      </p>
    </section>
  );
}

function BreakTextSection() {
  return (
    <ExhibitionTextSection
      variant="break"
      eyebrow="夜叉"
      titleLines={["七罪宗"]}
      descriptionLines={["욕망은 사라지지 않고,", "다른 얼굴로 돌아온다."]}
    />
  );
}

function EndingTextSection() {
  return (
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
  );
}

function DesktopHomeContent() {
  const scrollContainerRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress: titleProgress } = useScroll({
    container: scrollContainerRef,
    target: titleRef,
    offset: ["start start", "end start"],
  });

  return (
    <section
      ref={scrollContainerRef}
      data-testid="HomeView"
      className="flex h-dvh w-full flex-col overflow-y-auto bg-none text-white md:snap-y md:snap-mandatory"
    >
      <div ref={titleRef} className="h-dvh shrink-0 md:snap-start">
        <MainTitleAnimation progress={titleProgress} />
      </div>

      <OffsetSection>
        <Showcase endIndex={4} />
      </OffsetSection>

      <div>
        <BreakTextSection />
      </div>

      <OffsetSection>
        <Showcase startIndex={4} />
      </OffsetSection>

      <OffsetSection id="section-album" className="h-dvh shrink-0 md:snap-start">
        <CollectionIndex />
      </OffsetSection>

      <EndingTextSection />
    </section>
  );
}

function MobileHomeContent() {
  return (
    <section
      data-testid="HomeView"
      className="flex min-h-dvh w-full flex-col overflow-y-auto bg-black text-white"
    >
      <MobileMainTitle />

      <Showcase endIndex={4} />
      <BreakTextSection />
      <Showcase startIndex={4} />

      <div id="section-album" className="h-dvh shrink-0">
        <CollectionIndex />
      </div>

      <EndingTextSection />
    </section>
  );
}

export default function HomeView() {
  const isDesktop = useIsDesktop();

  if (isDesktop === null) {
    return (
      <>
        <StartupOverlay />
        <section className="h-dvh w-full bg-black" aria-label="홈 로딩 중" />
      </>
    );
  }

  return (
    <>
      <StartupOverlay />
      {isDesktop ? <DesktopHomeContent /> : <MobileHomeContent />}
    </>
  );
}
