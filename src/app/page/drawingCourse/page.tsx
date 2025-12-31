"use client";

import { useEffect } from "react";
import GoToHomeBtn from "@/components/common/goToHomeBtn";
import DrawingCourseView from "@/components/views/drawingCourseView";
import MainBg from "@/components/layout/mainBg";

export default function DrawingCoursePage() {
  useEffect(() => {
    document.documentElement.style.scrollSnapType = "y mandatory";
    document.documentElement.style.scrollBehavior = "smooth";

    return () => {
      document.documentElement.style.scrollSnapType = "";
      document.documentElement.style.scrollBehavior = "";
    };
  }, []);

  return (
    <main data-testid="DrawingCoursePage" className="snap-start">
      <DrawingCourseView />
      <GoToHomeBtn />
    </main>
  );
}
