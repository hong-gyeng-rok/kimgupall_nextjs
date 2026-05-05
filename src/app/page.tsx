import StartupOverlay from "@/components/common/StartupOverlay";
import Album from "@/components/common/album/album";
import DrawingProcessSequence from "@/components/common/drawingCourse/DrawingProcessSequence";
import IntroScrollScene from "@/components/common/intro/IntroScrollScene";
import MainTitleAnimation from "@/components/common/title/MainTitleAnimation";
import TitleNav from "@/components/common/title/titleNav";
import PageShell from "@/components/layout/PageShell";
import { getGlobalBackgroundImageUrl } from "@/lib/media";

export const dynamic = "force-dynamic";

export default async function Home() {
  const bgImgSrc = await getGlobalBackgroundImageUrl();

  return (
    <PageShell testId="HomePage" bgImgSrc={bgImgSrc}>
      <StartupOverlay preloadSrc={bgImgSrc} />
      <TitleNav />
      <section
        data-testid="HomeView"
        className="text-black flex flex-col min-h-dvh w-full bg-none"
      >
        <MainTitleAnimation />
        <div id="section-intro" className="w-full scroll-mt-20 ">
          <IntroScrollScene />
        </div>
        <div id="section-drawing" className="w-full scroll-mt-20">
          <DrawingProcessSequence />
        </div>
        <div id="section-album" className="w-full scroll-mt-20">
          <Album />
        </div>
      </section>
    </PageShell>
  );
}
