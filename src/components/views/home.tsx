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
    // 페이지 전체에 스냅 적용 (네이티브 기능 활용)
    document.documentElement.style.scrollSnapType = "y mandatory";
    document.documentElement.style.scrollBehavior = "smooth";

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

    return () => {
      // 언마운트 시 초기화
      document.documentElement.style.scrollSnapType = "";
      document.documentElement.style.scrollBehavior = "";
    };
  }, []);

  return (
    <MainBg>
      <section
        data-testid="HomeView"
        className="text-black bg-white flex flex-col h-fit w-screen"
      >
        <div className="snap-start snap-proximity">
          <TitleView />
        </div>
        <div className="snap-start snap-proximity">
          <IntroView />
        </div>
        <div className="snap-start snap-proximity">
          <DrawingCourseView />
        </div>
        <div className="snap-start snap-proximity">
          <AlbumView />
        </div>
      </section>
      <TitleNav />
    </MainBg>
  );
}
