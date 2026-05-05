import TitleView from "./titleView";
import AlbumView from "./albumView";
import IntroView from "./introView";
import DrawingCourseView from "./drawingCourseView";
import MainBg from "../layout/mainBg";
import TitleNav from "../common/title/titleNav";
import HomeClientEffects from "./HomeClientEffects";

export default function HomeView() {
  return (
    <MainBg>
      <HomeClientEffects />
      <TitleNav />
      <section
        data-testid="HomeView"
        className="text-black bg-white flex flex-col h-fit w-screen"
      >
        <TitleView />
        <div id="section-intro" className="w-full">
          <IntroView />
        </div>
        <div id="section-drawing" className="w-full">
          <DrawingCourseView />
        </div>
        <div id="section-album" className="w-full">
          <AlbumView />
        </div>
      </section>
    </MainBg>
  );
}
