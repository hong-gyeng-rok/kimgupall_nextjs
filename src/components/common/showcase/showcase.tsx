"use client";

import { useCollectionImages } from "@/hooks/useImages";
import { getPublicMediaUrl } from "@/lib/mediaUrl";

export default function Showcase() {
  const { data: images = [] } = useCollectionImages("gallery-binkan");
  const showcaseComments = [
    "textComments-1  textComments-1  textComments-1  textComments-1 textComments-1 textComments-1  textComments-1  textComments-1  textComments-1 textComments-1",
    "textComments-2  textComments-2  textComments-2  textComments-2 textComments-2 textComments-2  textComments-2  textComments-2  textComments-2 textComments-2",
    "textComments-3  textComments-3  textComments-3  textComments-3 textComments-3 textComments-3  textComments-3  textComments-3  textComments-3 textComments-3",
    "textComments-4  textComments-4  textComments-4  textComments-4 textComments-4 textComments-4  textComments-4  textComments-4  textComments-4 textComments-4 ",
    "textComments-5  textComments-5  textComments-5  textComments-5 textComments-5 textComments-5  textComments-5  textComments-5  textComments-5 textComments-5 ",
    "textComments-6  textComments-6  textComments-6  textComments-6 textComments-6 textComments-6  textComments-6  textComments-6  textComments-6 textComments-6 ",
  ];

  return (
    <>
      {images.map((item, index) => {
        const imageUrl = getPublicMediaUrl(item.publicUrl);
        const comment = showcaseComments[index] ?? item.description ?? "";
        const title = item.title ?? "YaCha";
        const alt = item.altText || item.title || "작품 이미지";

        if (!imageUrl) return null;

        return (
          <article
            key={item.id}
            className="flex h-dvh shrink-0 snap-start items-center justify-center"
          >
            <div className="grid h-fit grid-cols-3 gap-5 px-30">
              <div className="flex h-fit flex-col items-start justify-start text-white">
                <h1 className="font-bold text-6xl">{title}</h1>
                <p className="w-full text-3xl">{comment}</p>
              </div>

              <div className="flex h-fit w-full items-center justify-center">
                <div className="relative inset-0 items-center justify-center sm:flex">
                  <div className="static inset-0 flex items-center-safe justify-center">
                    <div className="overflow-hidden rounded-2xl bg-black/10 shadow-xl">
                      <img
                        src={imageUrl}
                        alt={alt}
                        className="h-full w-full object-contain"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-start justify-end text-white">
                <h1 className="font-bold text-6xl">{title}</h1>
                <p className="w-full text-3xl">{comment}</p>
              </div>
            </div>
          </article>
        );
      })}
    </>
  );
}
