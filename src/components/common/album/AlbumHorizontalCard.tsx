import { motion } from "framer-motion";
import type { AlbumCard } from "@/types/album";
import { AlbumCardImage, AlbumCardLink } from "./albumCardShared";
import { ALBUM_DESKTOP_CARD_FRAME_CLASS } from "./albumLayout";

type AlbumHorizontalCardProps = {
  card: AlbumCard;
  index: number;
};

export function AlbumHorizontalCard({
  card,
  index,
}: AlbumHorizontalCardProps) {
  const isInstagram = card.isExternal;
  const previewImages = (card.previewImages?.length
    ? card.previewImages
    : [{ url: card.url, alt: card.alt }]
  ).slice(0, 3);
  const stackImages = [0, 1, 2].map(
    (stackIndex) => previewImages[stackIndex % previewImages.length],
  );

  const cardContent = (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`
        relative flex flex-col items-center justify-center bg-white/20 backdrop-blur-xl border border-white/30 group
        h-full w-full
        ${ALBUM_DESKTOP_CARD_FRAME_CLASS}
        md:justify-start transition-all duration-300 hover:-translate-y-1 hover:bg-white/30
      `}
    >
      <p
        className={`text-white text-2xl md:text-base lg:text-lg font-bold mb-4 md:mb-3 drop-shadow-md md:drop-shadow-none z-10 transition-opacity duration-300 ${!isInstagram ? "md:group-hover:opacity-0" : ""}`}
      >
        {card.title}
      </p>

      <div className="relative flex-1 min-h-0 w-full">
        {!isInstagram && (
          <div className="pointer-events-none absolute inset-3 z-0">
            {stackImages.slice(1).map((image, stackIndex) => (
              <div
                key={`${image.url}-${stackIndex}`}
                className={`absolute inset-0 overflow-hidden rounded-xl border border-white/60 bg-gray-100 shadow-lg transition-all duration-500 ease-out ${stackIndex === 0
                  ? "translate-x-2 translate-y-2 rotate-3 group-hover:translate-x-4 group-hover:-translate-y-1 group-hover:rotate-8"
                  : "-translate-x-2 translate-y-4 -rotate-3 group-hover:-translate-x-5 group-hover:translate-y-1 group-hover:-rotate-8"
                  }`}
              >
                <AlbumCardImage
                  card={card}
                  index={index}
                  src={image.url}
                  alt={image.alt}
                  className="object-cover opacity-75"
                />
              </div>
            ))}
          </div>
        )}

        <div
          className={`relative z-10 h-full w-full overflow-hidden rounded-lg bg-gray-100 shadow-sm transition-all duration-300 ${!isInstagram ? "group-hover:ring-2 group-hover:ring-black/50" : ""}`}
        >
          <AlbumCardImage card={card} index={index} />

          {!isInstagram && previewImages.length > 1 && (
            <div className="absolute inset-0 z-10 grid grid-cols-3 gap-1 bg-white/80 p-1 opacity-0 transition-all duration-500 group-hover:opacity-100">
              {previewImages.map((image, previewIndex) => (
                <div
                  key={`${image.url}-${previewIndex}`}
                  className={`relative overflow-hidden rounded-md bg-gray-100 transition-transform duration-500 group-hover:translate-x-0 ${previewIndex === 0
                    ? "translate-x-[22px] delay-0"
                    : previewIndex === 1
                      ? "translate-x-[44px] delay-75"
                      : "translate-x-[66px] delay-150"
                    }`}
                >
                  <AlbumCardImage
                    card={card}
                    index={index}
                    src={image.url}
                    alt={image.alt}
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          )}

          {!isInstagram && (
            <div className="absolute inset-0 z-20 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/80 via-black/35 to-transparent" />

              <p className="absolute bottom-5 left-5 right-5 text-white text-2xl font-bold drop-shadow-md translate-y-4 transition-transform duration-300 group-hover:translate-y-0">
                {card.title}
              </p>

              <div className="absolute right-4 top-4 flex items-center gap-2 rounded-full border border-white/70 bg-white px-5 py-2 text-black text-xs font-semibold tracking-wider shadow-lg translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                <span>VIEW</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                  />
                </svg>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );

  return <AlbumCardLink card={card}>{cardContent}</AlbumCardLink>;
}
