"use client";

import { useCollectionImages } from "@/hooks/useImages";
import { getPublicMediaUrl } from "@/lib/mediaUrl";

export default function Showcase() {
  const { data: images = [] } = useCollectionImages("gallery-yacha");

  console.log(images)
  return (
    <>
      {images.map((item, index) => {
        const imageUrl = getPublicMediaUrl(item.publicUrl);
        const comment = item.description ?? "";
        const title = item.title ?? "YaCha";
        const alt = item.altText || item.title || "작품 이미지";

        if (!imageUrl) return null;

        return (
          <article
            key={item.id}
            className="flex h-dvh shrink-0 snap-start items-center justify-center"
          >
            <div className="h-fit flex flex-row gap-10 w-fit">
              <div className="flex flex-col items-start justify-end text-white  w-fit mt-50 gap-10 [font-family:var(--font-kimsaeng)]">
                <h1 className="font-bold text-6xl">{title}</h1>
                <p className="w-full whitespace-pre-line text-3xl opacity-80">{comment}</p>
              </div>

              <div className="w-xl h-[75vdh]">
                <div className=" rounded-md ">
                  <img
                    src={imageUrl}
                    alt={alt}
                    className="h-full w-full object-contain"
                  />
                </div>
              </div>
            </div>
          </article>
        );
      })}
    </>
  );
}
