"use client";

import { useState, type ReactNode } from "react";
import FallbackImage from "@/components/common/fallbackImage";

type MobileArtworkShowcaseItem = {
  id: string;
  title: string;
  image: string;
  alt: string;
  number: string;
  width?: number | null;
  height?: number | null;
  profile: ReactNode;
  motif: ReactNode;
  motifTitle?: string;
};

type MobileArtworkShowcaseProps = {
  items: MobileArtworkShowcaseItem[];
};

function AccordionChevron({ isOpen }: { isOpen: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      className={`h-8 w-8 shrink-0 text-white transition-transform duration-300 ease-out ${isOpen ? "rotate-180" : "rotate-0"
        }`}
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6" />
    </svg>
  );
}

export default function MobileArtworkShowcase({
  items,
}: MobileArtworkShowcaseProps) {
  const [openId, setOpenId] = useState<string | null>(null);

  if (items.length === 0) return null;

  return (
    <section className="flex flex-col gap-6 space-y-6 bg-black px-2 py-8 text-white md:hidden">
      {items.map((item) => {
        const isOpen = openId === item.id;
        const panelId = `showcase-panel-${item.id}`;

        return (
          <article key={item.id} className="overflow-hidden bg-black px-3">
            <button
              type="button"
              onClick={() => setOpenId((prev) => (prev === item.id ? null : item.id))}
              aria-expanded={isOpen}
              aria-controls={panelId}
              className="group block w-full text-left"
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-neutral-950">
                <FallbackImage
                  src={item.image}
                  alt={item.alt || item.title}
                  fill
                  className={`object-cover transition-transform duration-500 ease-out ${isOpen ? "scale-100" : "scale-[1.01]"
                    }`}
                  sizes="(max-width: 767px) 420px, 100vw"
                  quality={45}
                  placeholder="empty"
                />
                <div
                  className={`absolute inset-0 bg-black transition-opacity duration-300 ${isOpen ? "opacity-10" : "opacity-0"
                    }`}
                />
                <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black via-black/75 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-4">
                  <div>
                    <p className="mb-2 text-xs font-bold tracking-[0.28em] text-white/55">
                      {item.number}
                    </p>
                    <h3 className="font-sans text-3xl font-bold leading-none tracking-[-0.04em] text-white">
                      {item.title}
                    </h3>
                  </div>
                  <AccordionChevron isOpen={isOpen} />
                </div>
              </div>
            </button>

            <div
              id={panelId}
              className={`grid overflow-hidden bg-black px-4 [overflow-anchor:none] transition-[grid-template-rows,padding,opacity] duration-300 ease-out ${isOpen ? "grid-rows-[1fr] pb-7 pt-5 opacity-100" : "grid-rows-[0fr] pb-0 pt-0 opacity-0"
                }`}
            >
              <div
                className={`min-h-0 overflow-hidden transition-[transform,opacity] duration-300 ease-out ${isOpen ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"
                  }`}
              >
                <section className="mb-8">
                  <h4 className="mb-3 text-2xl font-black tracking-[-0.04em] text-white">
                    PROFILE
                  </h4>
                  <div className="pl-3 pr-4 text-base leading-6 tracking-[0.05em] text-white/75">
                    {item.profile}
                  </div>
                </section>

                <section>
                  <h4 className="mb-3 text-2xl font-black tracking-[-0.04em] text-white">
                    MOTIF{item.motifTitle ? `: ${item.motifTitle}` : ""}
                  </h4>
                  <div className="pl-3 pr-4 text-base leading-6 tracking-[0.05em] text-white/75">
                    {item.motif}
                  </div>
                </section>
              </div>
            </div>
          </article>
        );
      })}
    </section>
  );
}
