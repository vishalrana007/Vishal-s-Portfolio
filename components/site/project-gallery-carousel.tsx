"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export function ProjectGalleryCarousel({
  images,
  title,
}: {
  images: string[];
  title: string;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  useEffect(() => {
    if (!isLightboxOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isLightboxOpen]);

  function showPreviousImage() {
    setActiveIndex((current) => (current === 0 ? images.length - 1 : current - 1));
  }

  function showNextImage() {
    setActiveIndex((current) => (current === images.length - 1 ? 0 : current + 1));
  }

  return (
    <>
      <div className="space-y-4 pt-4">
        <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[#08111f] shadow-[0_24px_80px_rgba(0,0,0,0.28)]">
          <button
            type="button"
            onClick={() => setIsLightboxOpen(true)}
            className="relative block aspect-[16/10] w-full text-left"
            aria-label={`Open ${title} photo ${activeIndex + 1}`}
          >
            <Image
              src={images[activeIndex]}
              alt={`${title} gallery ${activeIndex + 1}`}
              fill
              sizes="(max-width: 767px) 100vw, 80vw"
              className="object-contain transition duration-700 hover:scale-[1.02]"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,7,13,0.02)_0%,rgba(4,7,13,0.16)_100%)]" />
            <div className="absolute bottom-4 right-4 rounded-full bg-black/55 px-3 py-1 text-[0.7rem] font-black uppercase tracking-[0.12em] text-white/92 backdrop-blur-sm">
              Open photo
            </div>
          </button>

          {images.length > 1 ? (
            <>
              <button
                type="button"
                onClick={showPreviousImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/55 px-4 py-3 text-sm font-black uppercase tracking-[0.08em] text-white transition hover:bg-black/75"
                aria-label="Show previous photo"
              >
                Prev
              </button>
              <button
                type="button"
                onClick={showNextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/55 px-4 py-3 text-sm font-black uppercase tracking-[0.08em] text-white transition hover:bg-black/75"
                aria-label="Show next photo"
              >
                Next
              </button>
            </>
          ) : null}
        </div>

        {images.length > 1 ? (
          <div className="flex gap-3 overflow-x-auto pb-2">
            {images.map((imageUrl, index) => (
              <button
                key={`${imageUrl}-${index}`}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl border transition ${
                  index === activeIndex ? "border-[#ff6a00]" : "border-white/10"
                }`}
                aria-label={`Show photo ${index + 1}`}
              >
                <Image
                  src={imageUrl}
                  alt={`${title} thumbnail ${index + 1}`}
                  fill
                  sizes="96px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        ) : null}
      </div>

      {isLightboxOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/88 p-4">
          <button
            type="button"
            aria-label="Close photo viewer"
            className="absolute inset-0"
            onClick={() => setIsLightboxOpen(false)}
          />

          <div className="relative z-10 w-full max-w-6xl">
            <div className="mb-4 flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.14em] text-white/60">Project photo</p>
                <h3 className="text-xl font-black uppercase text-white">{title}</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsLightboxOpen(false)}
                className="rounded-full border border-white/15 bg-white/8 px-4 py-2 text-xs font-black uppercase tracking-[0.1em] text-white transition hover:bg-white/14"
              >
                Close
              </button>
            </div>

            <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[#08111f] shadow-[0_24px_80px_rgba(0,0,0,0.45)]">
              <div className="relative aspect-[16/10]">
                <Image
                  src={images[activeIndex]}
                  alt={`${title} photo ${activeIndex + 1}`}
                  fill
                  sizes="100vw"
                  className="object-contain"
                />
              </div>

              {images.length > 1 ? (
                <>
                  <button
                    type="button"
                    onClick={showPreviousImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/55 px-4 py-3 text-sm font-black uppercase tracking-[0.08em] text-white transition hover:bg-black/75"
                  >
                    Prev
                  </button>
                  <button
                    type="button"
                    onClick={showNextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/55 px-4 py-3 text-sm font-black uppercase tracking-[0.08em] text-white transition hover:bg-black/75"
                  >
                    Next
                  </button>
                </>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
