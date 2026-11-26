"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Calendar, Eye, ExternalLink, Play, Tv } from "lucide-react";
import episodesData from "@/data/episodes.json";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { RevealInView } from "@/components/ui/MotionPrimitives";

type FilterStatus = "ALL" | "PUBLISHED" | "UPCOMING";

export function EpisodesSection() {
  const { locale } = useLanguage();
  const [filter, setFilter] = useState<FilterStatus>("ALL");
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);

  const filteredEpisodes = episodesData.episodes.filter((ep) => {
    if ("publicVisible" in ep && ep.publicVisible === false) return false;
    if (filter === "ALL") return true;
    if (filter === "PUBLISHED") return ep.publicationStatus === "PUBLISHED";
    return ep.publicationStatus !== "PUBLISHED";
  });

  const tabs: { id: FilterStatus; label: { ar: string; en: string } }[] = [
    { id: "ALL", label: { ar: "جميع الحلقات", en: "All Episodes" } },
    { id: "PUBLISHED", label: { ar: "حلقات منشورة", en: "Published" } },
    { id: "UPCOMING", label: { ar: "حلقات قادمة", en: "Upcoming" } },
  ];

  return (
    <section
      id="episodes"
      aria-labelledby="episodes-heading"
      className="border-t border-[var(--border-dark)] bg-[#090C16] py-16 text-[#F8FAFC] sm:py-20 lg:py-24"
    >
      <div className="editorial-container">
        <RevealInView className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-[#F0C188] sm:text-sm">
              {locale === "ar" ? "مكتبة الحلقات — الموسم الأول" : "Episode Library — Season One"}
            </p>
            <h2
              id="episodes-heading"
              className="mt-2 text-2xl font-extrabold tracking-tight text-[#FFFFFF] sm:text-3xl lg:text-4xl"
            >
              {locale === "ar" ? "شاهد حلقات «التركايه»" : "Watch TURKEYA Episodes"}
            </h2>
          </div>

          {/* Filter Tabs (44px min touch height) */}
          <div
            role="tablist"
            aria-label={locale === "ar" ? "تصفية الحلقات" : "Filter episodes"}
            className="inline-flex flex-wrap gap-2"
          >
            {tabs.map((tab) => {
              const active = filter === tab.id;
              return (
                <button
                  key={tab.id}
                  role="tab"
                  type="button"
                  aria-selected={active}
                  onClick={() => setFilter(tab.id)}
                  className={`min-h-[44px] rounded-xl px-4 text-xs font-bold transition-colors sm:text-sm ${
                    active
                      ? "bg-[#FE7C01] text-[#090C16]"
                      : "border border-[var(--border-dark-strong)] bg-[#111629] text-[#CBD5E1] hover:border-[#F0C188] hover:text-[#FFFFFF]"
                  }`}
                >
                  {tab.label[locale]}
                </button>
              );
            })}
          </div>
        </RevealInView>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredEpisodes.map((ep, idx) => {
            const videoId =
              "videoId" in ep && typeof ep.videoId === "string"
                ? ep.videoId
                : null;
            const isPlaying = Boolean(videoId && activeVideoId === videoId);
            const isPublished = ep.publicationStatus === "PUBLISHED";

            return (
              <RevealInView key={ep.id} delay={Math.min(idx * 0.04, 0.2)}>
                <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--border-dark)] bg-[#111629]">
                  {/* Click-to-Load Facade / Poster (Zero autoplay on mobile) */}
                  <div className="relative aspect-video w-full overflow-hidden bg-[#181f38]">
                    {isPlaying && videoId ? (
                      <iframe
                        src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
                        title={ep.title[locale]}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="h-full w-full border-0"
                      />
                    ) : (
                      <>
                        {ep.thumbnail ? (
                          <Image
                            src={ep.thumbnail}
                            alt={ep.title[locale]}
                            fill
                            loading="lazy"
                            className="object-cover object-[center_20%]"
                            sizes="(max-width: 768px) 92vw, (max-width: 1200px) 46vw, 31vw"
                          />
                        ) : (
                          <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-[#2F3B8E]/35 to-[#090C16] p-4 text-center">
                            <Tv className="h-8 w-8 text-[#F0C188]" aria-hidden="true" />
                            <span className="text-xs font-semibold text-[#CBD5E1]">
                              {locale === "ar" ? "قريباً في الموسم الأول" : "Coming Soon — Season One"}
                            </span>
                          </div>
                        )}

                        <div
                          aria-hidden="true"
                          className="absolute inset-0 bg-gradient-to-t from-[#090C16]/85 via-[#090C16]/25 to-transparent"
                        />

                        <span className="tabular-nums absolute top-3 inset-inline-start-3 rounded-lg bg-[#090C16]/85 px-2.5 py-1 text-xs font-bold text-[#F0C188] backdrop-blur-xs">
                          {locale === "ar"
                            ? `الحلقة ${ep.episodeNumber}`
                            : `EP ${String(ep.episodeNumber).padStart(2, "0")}`}
                        </span>

                        {videoId && (
                          <button
                            type="button"
                            onClick={() => setActiveVideoId(videoId)}
                            aria-label={
                              locale === "ar"
                                ? `تشغيل ${ep.title.ar}`
                                : `Play ${ep.title.en}`
                            }
                            className="absolute inset-0 flex items-center justify-center group"
                          >
                            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#FE7C01] text-[#090C16] shadow-lg transition-transform duration-200 group-hover:scale-105">
                              <Play className="h-6 w-6 fill-current" aria-hidden="true" />
                            </span>
                          </button>
                        )}
                      </>
                    )}
                  </div>

                  {/* Episode Metadata */}
                  <div className="flex flex-1 flex-col p-5">
                    <div className="flex flex-wrap items-center gap-3 text-xs text-[#94A3B8]">
                      <span
                        className={`rounded-md px-2 py-0.5 font-semibold ${
                          isPublished
                            ? "bg-[#2F3B8E]/35 text-[#F0C188]"
                            : "bg-white/10 text-[#CBD5E1]"
                        }`}
                      >
                        {isPublished
                          ? locale === "ar"
                            ? "منشورة"
                            : "Published"
                          : locale === "ar"
                            ? "قريباً"
                            : "Upcoming"}
                      </span>

                      {ep.publishedAt && (
                        <span className="inline-flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
                          <span>{ep.publishedAt}</span>
                        </span>
                      )}

                      {ep.viewCount && (
                        <span className="tabular-nums inline-flex items-center gap-1">
                          <Eye className="h-3.5 w-3.5" aria-hidden="true" />
                          <span>{ep.viewCount}</span>
                        </span>
                      )}
                    </div>

                    <h3 className="mt-3 text-base font-bold leading-snug text-[#FFFFFF]">
                      {ep.title[locale]}
                    </h3>

                    {ep.description[locale] && (
                      <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-[#B8C2D8]">
                        {ep.description[locale]}
                      </p>
                    )}

                    <div className="mt-auto pt-4">
                      {ep.youtubeUrl ? (
                        <a
                          href={ep.youtubeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex min-h-[44px] items-center gap-2 text-xs font-bold text-[#FE7C01] hover:underline"
                        >
                          <span>
                            {locale === "ar" ? "شاهد على يوتيوب" : "Watch on YouTube"}
                          </span>
                          <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                        </a>
                      ) : (
                        <a
                          href="https://www.youtube.com/@MohamedElhagan"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex min-h-[44px] items-center gap-2 text-xs font-semibold text-[#CBD5E1] hover:text-[#F0C188]"
                        >
                          <span>
                            {locale === "ar"
                              ? "تابع قناة محمد الهجان الرسمية"
                              : "Follow @MohamedElhagan on YouTube"}
                          </span>
                          <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              </RevealInView>
            );
          })}
        </div>
      </div>
    </section>
  );
}
