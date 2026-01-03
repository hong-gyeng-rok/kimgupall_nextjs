"use client";
import { useRef } from "react";
import Image from "next/image";
export default function Test() {
  console.log(medias);
  return (
    <main className="flex flex-col">
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error: {error.message}</p>}
      {!isLoading && !isError && (!medias || medias.length === 0) && (
        <p>No images found.</p>
      )}
      <>
        {medias?.map((media) =>
          media.type === "IMAGE" ? (
            <Image
              key={media.id}
              src={`${STORAGE_BASE_URL}${media.publicUrl}`}
              alt={media.title || "sketch Image"}
              width={media.width ?? 600}
              height={media.height ?? 600}
              className="w-xl h-xl"
            />
          ) : (
            <video
              ref={videoRef}
              key={media.id}
              src={`${STORAGE_BASE_URL}${media.publicUrl}`}
              muted
              loop
              playsInline
              autoPlay
              width={media.width ?? 600}
              height={media.height ?? 600}
            />
          ),
        )}
      </>
    </main>
  );
}

{
  /*

<motion.div
  style={{ opacity: opacityA }}
  className="absolute inset-0 flex items-center justify-center"
>
  <div className="relative w-full max-w-xl px-4 md:px-0 h-[60vh]">
    <Image
      src={yacha1}
      alt="Yacha Sketch 1"
      fill
      className="object-contain rounded-lg"
      sizes="(max-width: 768px) 100vw, 50vw"
      priority
    />
  </div>
</motion.div>;

<motion.div
  style={{ opacity: opacityB }}
  className="absolute inset-0 flex items-center justify-center"
>
  <div className="relative w-full max-w-xl px-4 md:px-0 h-[60vh]">
    <Image
      src={yacha2}
      alt="Yacha Sketch 2"
      fill
      className="object-contain rounded-lg"
      sizes="(max-width: 768px) 100vw, 50vw"
    />
  </div>
</motion.div>;

<motion.div
  style={{ opacity: opacityC }}
  className="absolute inset-0 flex items-center justify-center"
>
  <div className="relative w-full max-w-xl px-4 md:px-0 h-[60vh]">
    <Image
      src={yacha3}
      alt="Yacha Sketch 3"
      fill
      className="object-contain rounded-lg"
      sizes="(max-width: 768px) 100vw, 50vw"
    />
  </div>
</motion.div>;

<motion.div
  style={{ opacity: opacityD }}
  className="absolute inset-0 flex items-center justify-center"
>
  <div className="relative w-full max-w-xl px-4 md:px-0 h-[60vh]">
    <Image
      src={yacha4}
      alt="Yacha Sketch 4"
      fill
      className="object-contain rounded-lg"
      sizes="(max-width: 768px) 100vw, 50vw"
    />
  </div>
</motion.div>;
  */
}
