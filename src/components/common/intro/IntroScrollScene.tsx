"use client";

import IntroVideo from "@/components/common/intro/IntroVideo";
import IntroDescription from "@/components/common/intro/IntroDescription";
import { ScrollytellingSection } from "../scrollytelling/ScrollytellingSection";

export default function IntroScrollScene() {
  return (
    <ScrollytellingSection stageClassName="flex flex-col justify-center pt-10 gap-[5vh]">
      {(scrollYProgress) => (
        <>
          <div className="flex-none w-full flex justify-center max-h-[40vh] md:max-h-[50vh] px-4">
            <IntroVideo />
          </div>
        </>
      )}
    </ScrollytellingSection>
  );
}
