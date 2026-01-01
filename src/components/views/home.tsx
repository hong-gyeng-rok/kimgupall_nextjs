import TitleView from "./titleView";
import AlbumView from "./albumView";
import IntroView from "./introView";
import DrawingCourseView from "./drawingCourseView";
import MainBg from "../layout/mainBg";
import TitleNav from "../common/title/titleNav";

import { useEffect } from "react";

export default function HomeView() {
  // 스크롤 스냅 및 위치 복구 로직
  useEffect(() => {
    const savedPos = sessionStorage.getItem("home_scroll_pos");
    if (savedPos) {
      setTimeout(() => {
        window.scrollTo({
          top: parseInt(savedPos),
          behavior: "auto",
        });
        sessionStorage.removeItem("home_scroll_pos");
      }, 100);
    }
  }, []);

  return (
    <MainBg>
      <section
        data-testid="HomeView"
        className="text-black bg-white flex flex-col h-fit w-screen"
      >
          <TitleView />
          <IntroView />
          <DrawingCourseView />
          <AlbumView />
      </section>
      <TitleNav />
    </MainBg>
  );
}
