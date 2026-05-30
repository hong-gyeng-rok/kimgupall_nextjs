import StartupOverlay from "@/components/common/StartupOverlay";
import Album from "@/components/common/album/album";
import IntroScrollScene from "@/components/common/intro/IntroScrollScene";
import MainTitleAnimation from "@/components/common/title/MainTitleAnimation";
import PageShell from "@/components/layout/PageShell";
import Showcase from "@/components/common/showcase/showcase";


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
        <Showcase />
        <div id="section-album" className="h-dvh shrink-0 snap-start">
          <Album />
        </div>
        <div className="h-dvh shrink-0 snap-start">
          <MainTitleAnimation />
        </div>
      </section>
    </PageShell>
  );
}
