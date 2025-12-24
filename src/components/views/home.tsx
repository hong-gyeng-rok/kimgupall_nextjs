import Banner from "./banner";
import Gallery from "./gallery";
import TitleAnime from "../common/title/titleAnime";
import TitleNav from "../common/title/titleNav";
import SeparateLine from "../common/separateLine";
import IntroTitle from "../common/intro/introTitle";
import IntroContext from "../common/intro/introContext";
import MainBg from "../layout/mainBg";

import DrawingCourseLayout from "../layout/drawingCourseLayout";

export default function HomeView() {
  return (
    <section
      id="HomeView"
      className="text-black bg-white flex flex-col h-[500vh] w-screen"
    >
      <MainBg>
        <TitleAnime />
        <TitleNav />
        <IntroTitle />
        <IntroContext />
        <DrawingCourseLayout />
      </MainBg>
    </section>
  );
}
