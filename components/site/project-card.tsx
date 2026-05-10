"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/types/content";

export function ProjectCard({ project, index = 0 }: { project: Project; index?: number }) {
  const [imageLayout, setImageLayout] = useState<"landscape" | "portrait">("landscape");
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const isPortrait = imageLayout === "portrait";
  const galleryImages = project.imageUrls.filter(Boolean);

  useEffect(() => {
    if (!isGalleryOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isGalleryOpen]);

  function openGallery(index = 0) {
    setActiveImageIndex(index);
    setIsGalleryOpen(true);
  }

  function showPreviousImage() {
    setActiveImageIndex((current) => (current === 0 ? galleryImages.length - 1 : current - 1));
  }

  function showNextImage() {
    setActiveImageIndex((current) => (current === galleryImages.length - 1 ? 0 : current + 1));
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.65, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
        className="group overflow-hidden rounded-[24px] border border-white/10 bg-white/5 transition hover:bg-white/[0.07]"
      >
      <div className="flex h-full flex-col">
        <button
          type="button"
          onClick={() => openGallery(0)}
          className="relative block aspect-[16/10] w-full overflow-hidden bg-[#0a1630] text-left"
          aria-label={`Open ${project.title} photos`}
        >
          {project.imageUrls[0] ? (
            <>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#18345f_0%,#0b1530_55%,#091126_100%)]" />
              {isPortrait ? (
                <div className="absolute inset-y-4 left-1/2 w-[44%] -translate-x-1/2 overflow-hidden rounded-[22px] border border-white/12 bg-[#0f172f] shadow-[0_22px_55px_rgba(0,0,0,0.38)] ring-1 ring-white/8 transition duration-700 group-hover:-translate-y-1">
                  <Image
                    src={project.imageUrls[0]}
                    alt={project.title}
                    fill
                    sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 25vw"
                    onLoad={({ currentTarget }) => {
                      const { naturalWidth, naturalHeight } = currentTarget;
                      setImageLayout(naturalHeight > naturalWidth ? "portrait" : "landscape");
                    }}
                    className="object-cover object-top transition duration-700 group-hover:scale-[1.03]"
                  />
                </div>
              ) : (
                <Image
                  src={project.imageUrls[0]}
                  alt={project.title}
                  fill
                  sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 25vw"
                  onLoad={({ currentTarget }) => {
                    const { naturalWidth, naturalHeight } = currentTarget;
                    setImageLayout(naturalHeight > naturalWidth ? "portrait" : "landscape");
                  }}
                  className="object-cover object-top transition duration-700 group-hover:scale-[1.04]"
                />
              )}
            </>
          ) : (
            <div className="absolute inset-0 bg-[linear-gradient(135deg,#3a200f,#0a0a0a)]" />
          )}
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,7,12,0.08)_0%,rgba(5,7,12,0.18)_55%,rgba(5,7,12,0.42)_100%)]" />
          <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-3 p-4 text-sm text-white/92">
            <span className="max-w-[58%] rounded-full bg-white/94 px-3 py-1 text-xs font-medium text-black shadow-[0_10px_30px_rgba(0,0,0,0.22)]">
              {project.category || "@work"}
            </span>
            <span className="shrink-0 rounded-full bg-black/45 px-3 py-1 text-xs font-black uppercase tracking-[0.12em] text-white/96 backdrop-blur-sm">
              {project.featured ? "Featured" : "Project"}
            </span>
          </div>
          {galleryImages.length ? (
            <div className="absolute bottom-4 right-4 rounded-full bg-black/55 px-3 py-1 text-[0.7rem] font-black uppercase tracking-[0.12em] text-white/92 backdrop-blur-sm">
              View photos
            </div>
          ) : null}
        </button>
        <Link href={`/projects/${project.id}`} className="flex flex-1 flex-col justify-between gap-3 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] p-5">
          <h3 className=" text-[1.05rem] font-black uppercase leading-[1.2] text-white sm:text-[1.4rem]">
            {project.title}
          </h3>
          <p className="line-clamp-3  text-sm leading-6 text-white/78">
            {project.summary || project.description}
          </p>
        </Link>
      </div>
      </motion.div>

      {isGalleryOpen && galleryImages.length ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/88 p-4">
          <button
            type="button"
            aria-label="Close gallery"
            className="absolute inset-0"
            onClick={() => setIsGalleryOpen(false)}
          />
          <div className="relative z-10 w-full max-w-5xl">
            <div className="mb-4 flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.14em] text-white/60">Project gallery</p>
                <h3 className="text-xl font-black uppercase text-white">{project.title}</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsGalleryOpen(false)}
                className="rounded-full border border-white/15 bg-white/8 px-4 py-2 text-xs font-black uppercase tracking-[0.1em] text-white transition hover:bg-white/14"
              >
                Close
              </button>
            </div>

            <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[#08111f] shadow-[0_24px_80px_rgba(0,0,0,0.45)]">
              <div className="relative aspect-[16/10]">
                <Image
                  src={galleryImages[activeImageIndex]}
                  alt={`${project.title} photo ${activeImageIndex + 1}`}
                  fill
                  sizes="100vw"
                  className="object-contain"
                />
              </div>

              {galleryImages.length > 1 ? (
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

            {galleryImages.length > 1 ? (
              <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
                {galleryImages.map((imageUrl, index) => (
                  <button
                    key={`${imageUrl}-${index}`}
                    type="button"
                    onClick={() => setActiveImageIndex(index)}
                    className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl border transition ${
                      index === activeImageIndex ? "border-[#ff6a00]" : "border-white/10"
                    }`}
                    aria-label={`Show photo ${index + 1}`}
                  >
                    <Image
                      src={imageUrl}
                      alt={`${project.title} thumbnail ${index + 1}`}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </>
  );
}
