import Banner from "./banner";
import Gallery from "./gallery";
import TitleAnime from "../common/title/titleAnime";
import TitleNav from "../common/title/titleNav";
import SeparateLine from "../common/separateLine";

export default function HomeView() {
  return (
    <section className="bg-white text-white flex flex-col h-[500vh] w-screen">
      <TitleAnime />
      <TitleNav />
      <SeparateLine />
    </section>
  );
}
