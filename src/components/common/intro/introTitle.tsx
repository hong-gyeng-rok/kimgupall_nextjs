import Image from "next/image";
import yacha_font from "../../../../public/sampleImages/yacha_font.png";

export default function IntroTitle() {
  const titleImg = yacha_font;

  return (
    <div className="w-full h-full flex items-center justify-center">
      <Image
        src={titleImg}
        alt="yacha_font"
        className="w-[300px] md:w-[600px] h-auto object-contain"
      />
    </div>
  );
}
