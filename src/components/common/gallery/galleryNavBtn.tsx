import React from "react";
import { NavList } from "../../../types/galleryNavBtn";
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
    <div className=" flex flex-row justify-around">
      {navList.map((nav) =>
        nav.type === "style" ? (
          <button
            key={nav.id}
            className="text-stone-950 p-1 px-4 shadow-xl/40 rounded hover:bg-zinc-200 hover:ring-2 hover:ring-blue-400"
          >
            {nav.title}
          </button>
        ) : (
          <a
            key={nav.id}
            href={nav.url}
            className=" bg-stone-200 text-stone-950 text-center p-1 px-4 text-xl shadow-xl/40 rounded 
          hover:bg-zinc-400 hover:ring-2 hover:ring-blue-400 min-[350px]:w-fit md:w-xs
          "
          >
            {nav.title}
          </a>
        ),
      )}
    </div>
  );
}
