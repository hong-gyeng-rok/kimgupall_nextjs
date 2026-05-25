import StartupOverlay from "@/components/common/StartupOverlay";
import Album from "@/components/common/album/album";
import DrawingProcessSequence from "@/components/common/drawingCourse/DrawingProcessSequence";
import IntroScrollScene from "@/components/common/intro/IntroScrollScene";
import MainTitleAnimation from "@/components/common/title/MainTitleAnimation";
import TitleNav from "@/components/common/title/titleNav";
import PageShell from "@/components/layout/PageShell";

export const dynamic = "force-dynamic";

export default async function Home() {

  return (
    <PageShell testId="HomePage" >
      <StartupOverlay />
      <section
        data-testid="HomeView"
        className="text-black flex flex-col min-h-dvh w-full bg-none"
      >
        <div id="section-intro" >
          <IntroScrollScene />
        </div>
        <div id="section-drawing" >
          <DrawingProcessSequence />
        </div>
        <div id="section-album">
          <Album />
        </div>
        <MainTitleAnimation />
      </section>
    </PageShell>
  );
}
