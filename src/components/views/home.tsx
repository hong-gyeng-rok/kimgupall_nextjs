import TitleView from "./titleView";
import AlbumView from "./albumView";
import IntroView from "./introView";
import DrawingCourseView from "./drawingCourseView";
import MainBg from "../layout/mainBg";
import TitleNav from "../common/title/titleNav";

import DrawingCourseLayout from "../layout/drawingCourseLayout";
import { useEffect } from "react";

export default function HomeView() {
  // 스크롤 위치 복구 로직
  useEffect(() => {
    const savedPos = sessionStorage.getItem("home_scroll_pos");
    if (savedPos) {
      // 약간의 지연을 주어 레이아웃이 잡힌 뒤 스크롤 이동
      setTimeout(() => {
        window.scrollTo({
          top: parseInt(savedPos),
          behavior: "instant", // 부드러운 이동보다는 즉시 이동이 복구 느낌에 가까움
        });
        sessionStorage.removeItem("home_scroll_pos"); // 한 번 사용 후 삭제
      }, 100);
    }
  }, []);

  return (
    <section
      id="HomeView"
      className="text-black bg-white flex flex-col h-fit w-screen "
    >
      <MainBg>
        <TitleView />
        <TitleNav />
        <IntroView />
        <DrawingCourseView />
        <AlbumView />
      </MainBg>
    </section>
  );
}
