import React from "react";
import InternalLink from "@/components/common/internalLink";
import type { NavList } from "@/types/galleryNavBtn";
const navList: NavList[] = [
  // {
  //   id: 1,
  //   title: "Grid" /** Change to gallary style grid */,
  //   type: "style",
  // },
  // {
  //   id: 2,
  //   title: "Slider",
  //   type: "style",
  // },
  {
    id: 3,
    title: "Exit",
    url: "/",
    type: "url",
  },
];

export default function GalleryNavBtn() {
  return (
    <nav data-testid="GalleryNav" className=" flex flex-row justify-around">
      {navList.map((nav) =>
        nav.type === "style" ? (
          <button
            data-testid="mainBtn"
            key={nav.id}
            className="text-white p-1 px-4 shadow-xl/40 rounded hover:bg-white hover:ring-2 hover:ring-blue-400"
          >
            {nav.title}
          </button>
        ) : (
          <InternalLink
            key={nav.id}
            href={nav.url}
            className=" bg-white text-stone-950 text-center p-1 px-4 text-lg md:text-xl shadow-xl/40 rounded 
          hover:bg-zinc-400 hover:ring-2 hover:ring-blue-400 min-[350px]:w-fit md:w-xs
          "
            ariaLabel={`${nav.title === "Exit" ? "갤러리 나가기" : nav.title}`}
          >
            {nav.title}
          </InternalLink>
        ),
      )}
    </nav>
  );
}
