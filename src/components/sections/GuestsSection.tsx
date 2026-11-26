"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Award, ExternalLink, UserRound, X } from "lucide-react";
import guestsData from "@/data/guests.json";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { RevealInView } from "@/components/ui/MotionPrimitives";

type Guest = (typeof guestsData.guests)[number];

export function GuestsSection() {
  const { locale } = useLanguage();
  const [selectedGuest, setSelectedGuest] = useState<Guest | null>(null);

  useEffect(() => {
    if (!selectedGuest) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedGuest(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selectedGuest]);

  const visibleGuests = guestsData.guests.filter(
    (g) => !("publicVisible" in g && g.publicVisible === false)
  );
  const publicGuests = visibleGuests.filter(
    (g) => g.verificationStatus === "VERIFIED"
  );
  const upcomingGuests = visibleGuests.filter(
    (g) => g.verificationStatus !== "VERIFIED"
  );

  return (
    <section
      id="guests"
      aria-labelledby="guests-heading"
      className="border-t border-[var(--border-dark)] bg-[#090C16] py-16 text-[#F8FAFC] sm:py-20 lg:py-24"
    >
      <div className="editorial-container">
        <RevealInView className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-[#F0C188] sm:text-sm">
              {locale === "ar" ? "ضيوف الموسم الأول" : "Season One Guests"}
            </p>
            <h2
              id="guests-heading"
              className="mt-2 text-2xl font-extrabold tracking-tight text-[#FFFFFF] sm:text-3xl lg:text-4xl"
            >
              {locale === "ar"
                ? "نخبة من القادة، الأطباء، والخبراء"
                : "Distinguished Leaders, Specialists & Authors"}
            </h2>
          </div>
          <p className="max-w-md text-sm text-[#B8C2D8]">
            {locale === "ar"
              ? "اضغط على أي ضيف لاستعراض السيرة المهنية الكاملة، أبرز الإنجازات، والروابط الرسمية الموثقة."
              : "Select any guest to view their full biography, key milestones, and verified official channels."}
          </p>
        </RevealInView>

        {/* Verified Guest Cards */}
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {publicGuests.map((guest, idx) => (
            <RevealInView key={guest.id} delay={Math.min(idx * 0.04, 0.2)}>
              <button
                type="button"
                onClick={() => setSelectedGuest(guest)}
                className="group flex h-full w-full flex-col overflow-hidden rounded-2xl border border-[var(--border-dark)] bg-[#111629] text-start transition-colors hover:border-[#FE7C01]/70 focus-visible:outline-2"
              >
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#181f38]">
                  {guest.portrait ? (
                    <Image
                      src={guest.portrait}
                      alt={guest.name[locale]}
                      fill
                      loading="lazy"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      style={{ objectPosition: guest.objectPosition }}
                      sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 23vw"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-[#8B97B5]">
                      <UserRound className="h-12 w-12" aria-hidden="true" />
                    </div>
                  )}
                  <div
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#090C16]/95 via-[#090C16]/45 to-transparent"
                  />
                </div>

                <div className="flex flex-1 flex-col p-4">
                  <h3 className="text-base font-bold text-[#FFFFFF] group-hover:text-[#F0C188]">
                    {guest.name[locale]}
                  </h3>
                  <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-[#B8C2D8]">
                    {guest.title[locale]}
                  </p>
                  <span className="mt-auto pt-3 text-xs font-semibold text-[#FE7C01]">
                    {locale === "ar" ? "عرض السيرة المهنية ←" : "View Profile →"}
                  </span>
                </div>
              </button>
            </RevealInView>
          ))}
        </div>

        {/* Upcoming / Announced Guest Slots (Cleanly presented without exposing internal flags) */}
        {upcomingGuests.length > 0 && (
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {upcomingGuests.map((guest) => (
              <div
                key={guest.id}
                className="flex items-center gap-4 rounded-2xl border border-dashed border-[var(--border-dark-strong)] bg-[#111629]/60 p-4"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#2F3B8E]/25 text-[#F0C188]">
                  <UserRound className="h-6 w-6" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-sm font-bold text-[#FFFFFF]">
                    {guest.name[locale]}
                  </p>
                  <p className="mt-0.5 text-xs text-[#94A3B8]">
                    {locale === "ar"
                      ? "حلقة ضمن الموسم الأول — يتم الإعلان عن التفاصيل قريباً"
                      : "Season One guest — full dossier coming soon"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Accessible Guest Dossier Modal */}
      {selectedGuest && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="guest-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-xs"
          onClick={() => setSelectedGuest(null)}
        >
          <div
            className="relative max-h-[88dvh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-[#F0C188]/30 bg-[#111629] p-5 text-[#F8FAFC] shadow-2xl sm:p-7"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedGuest(null)}
              aria-label={locale === "ar" ? "إغلاق" : "Close"}
              className="absolute top-4 inset-inline-end-4 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 bg-[#090C16] text-[#F8FAFC] transition-colors hover:border-[#FE7C01]"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>

            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
              {selectedGuest.portrait && (
                <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-2xl border border-[#F0C188]/30 bg-[#181f38]">
                  <Image
                    src={selectedGuest.portrait}
                    alt={selectedGuest.name[locale]}
                    fill
                    className="object-cover"
                    style={{ objectPosition: selectedGuest.objectPosition }}
                    sizes="112px"
                  />
                </div>
              )}
              <div className="pe-10">
                <p className="text-xs font-bold uppercase tracking-wider text-[#F0C188]">
                  {locale === "ar" ? "ضيف الموسم الأول" : "Season One Guest"}
                </p>
                <h3
                  id="guest-modal-title"
                  className="mt-1 text-2xl font-extrabold text-[#FFFFFF]"
                >
                  {selectedGuest.name[locale]}
                </h3>
                <p className="mt-1 text-sm text-[#CBD5E1]">
                  {selectedGuest.title[locale]}
                </p>
              </div>
            </div>

            {selectedGuest.biography[locale] && (
              <div className="mt-6 border-t border-[var(--border-dark)] pt-5">
                <h4 className="text-sm font-bold text-[#F0C188]">
                  {locale === "ar" ? "النبذة المهنية" : "Professional Biography"}
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-[#E2E8F0] sm:text-base">
                  {selectedGuest.biography[locale]}
                </p>
              </div>
            )}

            {selectedGuest.achievements.length > 0 && (
              <div className="mt-5">
                <h4 className="flex items-center gap-2 text-sm font-bold text-[#F0C188]">
                  <Award className="h-4 w-4 text-[#FE7C01]" aria-hidden="true" />
                  <span>
                    {locale === "ar" ? "أبرز الإنجازات والمحطات" : "Key Achievements"}
                  </span>
                </h4>
                <ul className="mt-3 space-y-2.5">
                  {selectedGuest.achievements.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2.5 text-sm text-[#CBD5E1]"
                    >
                      <span
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#FE7C01]"
                        aria-hidden="true"
                      />
                      <span>{item[locale]}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {selectedGuest.socialLinks.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-2.5 border-t border-[var(--border-dark)] pt-5">
                {selectedGuest.socialLinks.map((link) => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-[#F0C188]/30 bg-[#090C16] px-4 text-xs font-semibold text-[#F8FAFC] transition-colors hover:border-[#FE7C01] hover:text-[#F0C188]"
                  >
                    <span>
                      {link.platform}: {link.label}
                    </span>
                    <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
