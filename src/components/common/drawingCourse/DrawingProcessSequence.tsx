"use client";

import { useImages } from "@/hooks/useImages";
import { ScrollytellingSection } from "../scrollytelling/ScrollytellingSection";
import { DrawingCourseScene } from "./DrawingCourseScene";

export default function DrawingProcessSequence() {
  const { data: medias } = useImages((data) =>
    data.filter(
      (media) =>
        media.location === "DRAWING_COURSE" ||
        media.collection?.location === "DRAWING_COURSE",
    ),
  );

  return (
    <ScrollytellingSection>
      {(scrollYProgress) => (
        <DrawingCourseScene
          medias={medias}
          scrollYProgress={scrollYProgress}
        />
      )}
    </ScrollytellingSection>
  );
}
