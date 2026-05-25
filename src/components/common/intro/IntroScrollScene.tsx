"use client";

import IntroVideo from "@/components/common/intro/IntroVideo";
import IntroLanternGlow from "@/components/common/intro/IntroLanternGlow";
import { ScrollytellingSection } from "../scrollytelling/ScrollytellingSection";

export default function IntroScrollScene() {
  return (
    <ScrollytellingSection stageClassName="relative flex flex-col justify-center pt-10 gap-[5vh] bg-black overflow-hidden">
      {() => (
        <>
          <IntroLanternGlow />
          <div className="relative z-20 flex-none w-full flex justify-center max-h-[40vh] md:max-h-[50vh] px-4">
            <IntroVideo />
          </div>
        </>
      )}
    </ScrollytellingSection>
  );
}
