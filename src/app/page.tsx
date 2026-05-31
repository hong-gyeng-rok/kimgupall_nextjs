import StartupOverlay from "@/components/common/StartupOverlay";
import Album from "@/components/common/album/album";
import IntroScrollScene from "@/components/common/intro/IntroScrollScene";
import MainTitleAnimation from "@/components/common/title/MainTitleAnimation";
import PageShell from "@/components/layout/PageShell";
import Showcase from "@/components/common/showcase/showcase";
import ExhibitionTextSection from "@/components/common/exhibition/ExhibitionTextSection";


export const dynamic = "force-dynamic";

export default async function Home() {

  return (
    <PageShell testId="HomePage" >
      <StartupOverlay />
      <section
        data-testid="HomeView"
        className="text-white flex h-dvh w-full flex-col overflow-y-auto bg-none snap-y snap-mandatory"
      >
        <div id="section-intro" className="h-dvh shrink-0 snap-start">
          <IntroScrollScene />
        </div>
        <Showcase endIndex={4} />
        <ExhibitionTextSection
          variant="break"
          eyebrow="夜叉"
          titleLines={["七罪宗"]}
          descriptionLines={["욕망은 사라지지 않고,", "다른 얼굴로 돌아온다."]}
        />
        <Showcase startIndex={4} />
        <div id="section-album" className="h-dvh shrink-0 snap-start">
          <Album />
        </div>
        <div className="h-dvh shrink-0 snap-start">
          <MainTitleAnimation />
        </div>
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
    </PageShell>
  );
}
