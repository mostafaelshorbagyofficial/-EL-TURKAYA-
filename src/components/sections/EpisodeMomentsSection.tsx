"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Camera, Clapperboard, Maximize2, X } from "lucide-react";
import momentsData from "@/data/episode-moments.json";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { RevealInView } from "@/components/ui/MotionPrimitives";

type EpisodeFrame = (typeof momentsData.frames)[number];

export function EpisodeMomentsSection() {
  const { locale } = useLanguage();
  const [activeFrame, setActiveFrame] = useState<EpisodeFrame | null>(null);

  useEffect(() => {
    if (!activeFrame) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveFrame(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeFrame]);

  return (
    <section
      id="episode-moments"
      aria-labelledby="episode-moments-heading"
      className="border-t border-[var(--border-dark)] bg-[#111629] py-16 text-[#F8FAFC] sm:py-20 lg:py-24"
    >
      <div className="editorial-container">
        {/* Section Header */}
        <RevealInView className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#F0C188] sm:text-sm">
              <Clapperboard className="h-4 w-4 text-[#FE7C01]" aria-hidden="true" />
              <span>{momentsData.eyebrow[locale]}</span>
            </p>
            <h2
              id="episode-moments-heading"
              className="mt-2 text-2xl font-extrabold tracking-tight text-[#FFFFFF] sm:text-3xl lg:text-4xl"
            >
              {momentsData.title[locale]}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[#CBD5E1] sm:text-base">
              {momentsData.subtitle[locale]}
            </p>
          </div>
          <span className="tabular-nums shrink-0 rounded-full border border-[#F0C188]/25 bg-[#090C16] px-4 py-1.5 text-xs font-semibold text-[#F0C188]">
            {locale === "ar"
              ? `${momentsData.frames.length} حلقات مصوّرة`
              : `${momentsData.frames.length} Episode Collages`}
          </span>
        </RevealInView>

        {/* Three-Shot Episode Collages Grid (Preserves 16:9 aspect ratio, zero face/brand cropping) */}
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-7">
          {momentsData.frames.map((frame, idx) => (
            <RevealInView key={frame.id} delay={Math.min(idx * 0.04, 0.2)}>
              <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#F0C188]/20 bg-[#090C16] shadow-lg transition-colors hover:border-[#FE7C01]/70">
                <button
                  type="button"
                  onClick={() => setActiveFrame(frame)}
                  aria-label={
                    locale === "ar"
                      ? `تكبير ${frame.caption.ar}`
                      : `Expand ${frame.caption.en}`
                  }
                  className="relative aspect-video w-full overflow-hidden bg-[#05060B] text-start focus-visible:outline-2"
                >
                  <Image
                    src={frame.image}
                    alt={frame.caption[locale]}
                    width={frame.width}
                    height={frame.height}
                    loading="lazy"
                    className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-[1.015]"
                    sizes="(max-width: 768px) 94vw, 46vw"
                  />

                  <span className="absolute top-3 inset-inline-start-3 rounded-lg border border-white/15 bg-[#090C16]/85 px-3 py-1 text-[11px] font-bold text-[#F0C188] backdrop-blur-xs sm:text-xs">
                    {frame.episodeLabel[locale]}
                  </span>

                  <span
                    aria-hidden="true"
                    className="absolute bottom-3 inset-inline-end-3 inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 bg-[#090C16]/80 text-[#F8FAFC] opacity-85 transition-opacity group-hover:opacity-100"
                  >
                    <Maximize2 className="h-4 w-4" />
                  </span>
                </button>

                <div className="flex items-center justify-between gap-3 border-t border-[var(--border-dark)] bg-[#090C16] px-4 py-3.5 sm:px-5">
                  <div className="min-w-0">
                    <h3 className="truncate text-base font-bold text-[#FFFFFF] group-hover:text-[#F0C188]">
                      {frame.guestName[locale]}
                    </h3>
                    <p className="mt-0.5 truncate text-xs text-[#94A3B8]">
                      {frame.caption[locale]}
                    </p>
                  </div>
                  <span className="shrink-0 rounded-md bg-[#2F3B8E]/30 px-2.5 py-1 text-[11px] font-semibold text-[#F0C188]">
                    {locale === "ar" ? "٣ كادرات" : "3-Shot Frame"}
                  </span>
                </div>
              </article>
            </RevealInView>
          ))}
        </div>

        {/* Authentic Studio Location Strip (لوكيشن التركايه) */}
        <RevealInView className="mt-12 rounded-2xl border border-[var(--border-dark)] bg-[#090C16]/80 p-5 sm:p-6">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#F0C188] sm:text-sm">
            <Camera className="h-4 w-4 text-[#FE7C01]" aria-hidden="true" />
            <span>{momentsData.studioLocationTitle[locale]}</span>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {momentsData.studioShots.map((shot) => (
              <div
                key={shot.id}
                className="relative aspect-[3/2] overflow-hidden rounded-xl border border-[#F0C188]/15 bg-[#111629]"
              >
                <Image
                  src={shot.src}
                  alt={shot.alt[locale]}
                  width={shot.width}
                  height={shot.height}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-[1.03]"
                  sizes="(max-width: 640px) 92vw, 30vw"
                />
              </div>
            ))}
          </div>
        </RevealInView>
      </div>

      {/* Accessible Full-Frame Lightbox Modal */}
      {activeFrame && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="moment-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/88 p-4 backdrop-blur-xs"
          onClick={() => setActiveFrame(null)}
        >
          <div
            className="relative w-full max-w-5xl overflow-hidden rounded-2xl border border-[#F0C188]/30 bg-[#090C16] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-3 border-b border-[var(--border-dark)] px-4 py-3 sm:px-6">
              <div>
                <p className="text-xs font-semibold text-[#F0C188]">
                  {activeFrame.episodeLabel[locale]}
                </p>
                <h3
                  id="moment-modal-title"
                  className="text-base font-extrabold text-[#FFFFFF] sm:text-lg"
                >
                  {activeFrame.caption[locale]}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveFrame(null)}
                aria-label={locale === "ar" ? "إغلاق" : "Close"}
                className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 bg-[#111629] text-[#F8FAFC] transition-colors hover:border-[#FE7C01]"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <div className="relative aspect-video w-full bg-[#05060B]">
              <Image
                src={activeFrame.image}
                alt={activeFrame.caption[locale]}
                width={activeFrame.width}
                height={activeFrame.height}
                className="h-full w-full object-contain"
                sizes="95vw"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
