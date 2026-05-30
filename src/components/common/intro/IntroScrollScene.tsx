"use client";

import IntroVideo from "@/components/common/intro/IntroVideo";
import IntroLanternGlow from "@/components/common/intro/IntroLanternGlow";

export default function IntroScrollScene() {
  return (
    <section className="relative flex h-dvh w-full flex-col justify-center gap-[5vh] overflow-hidden bg-black pt-10">
      <IntroLanternGlow />
      <div className="relative z-20 flex w-full flex-none justify-center max-h-[40vh] px-4 md:max-h-[50vh]">
        <IntroVideo />
      </div>
    </section>
  );
}
