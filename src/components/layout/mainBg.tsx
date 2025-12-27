import { ReactNode } from "react";
import mainPatten from "../../../public/sampleImages/mainPatten_2.png";

interface MainBgProps {
  children: ReactNode;
}

export default function MainBg({ children }: MainBgProps) {
  const bgImg = mainPatten;

  return (
    <div className="relative w-full h-full bg-white ">
      <div
        className="absolute inset-0 z-0 opacity-20"
        style={{
          backgroundImage: `url(${bgImg.src})`,
          backgroundRepeat: "repeat",
          backgroundSize: "auto", // 원본 사이즈 유지
        }}
      />
      <div data-testid="MainBg" className="relative w-full h-full z-10">
        {children}
      </div>
    </div>
  );
}
