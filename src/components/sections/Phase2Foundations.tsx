"use client";

import React from "react";
import Image from "next/image";
import { Clapperboard, Compass, Handshake, Layers } from "lucide-react";
import siteData from "@/data/site.json";
import guestsData from "@/data/guests.json";
import companyData from "@/data/company.json";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { RevealInView } from "@/components/ui/MotionPrimitives";
import { ProMediaLogo } from "@/components/ui/ProMediaLogo";

const CAPABILITY_ICONS = [Compass, Clapperboard, Layers, Handshake];

export function Phase2Foundations() {
  const { locale } = useLanguage();

  // Only render guests with confirmed local portraits in this Phase 2 visual preview
  const confirmedPortraitGuests = guestsData.guests.filter(
    (g) => Boolean(g.portrait)
  );

  return (
    <>
      {/* LIGHT EDITORIAL SECTION — Demonstrates Dark -> Paper (#FAF7F2) Transition */}
      <section
        id="about"
        aria-labelledby="about-heading"
        className="bg-[#FAF7F2] py-16 text-[#090C16] sm:py-20 lg:py-24"
      >
        <div className="editorial-container">
          <RevealInView className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-widest text-[#B85400] sm:text-sm">
              {siteData.about.eyebrow[locale]}
            </p>
            <h2
              id="about-heading"
              className="mt-3 text-2xl font-extrabold leading-tight tracking-tight text-[#090C16] sm:text-3xl lg:text-4xl"
            >
              {siteData.about.title[locale]}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[#3B4459] sm:text-lg">
              {siteData.about.description[locale]}
            </p>
          </RevealInView>

          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:mt-12 lg:grid-cols-3 lg:gap-6">
            {siteData.about.pillars.map((pillar, idx) => (
              <RevealInView key={pillar.id} delay={idx * 0.06}>
                <article className="flex h-full flex-col rounded-2xl border border-[#090C16]/10 bg-[#FFFFFF] p-6 shadow-xs transition-colors hover:border-[#2F3B8E]/35">
                  <span className="tabular-nums text-xs font-bold text-[#2F3B8E]">
                    0{idx + 1}
                  </span>
                  <h3 className="mt-3 text-lg font-bold text-[#090C16]">
                    {pillar.title[locale]}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#3B4459]">
                    {pillar.body[locale]}
                  </p>
                </article>
              </RevealInView>
            ))}
          </div>
        </div>
      </section>

      {/* DARK EDITORIAL SECTION — Confirmed Guest Portraits Crop & Framing Verification */}
      <section
        id="guests"
        aria-labelledby="guests-preview-heading"
        className="border-t border-[var(--border-dark)] bg-[#090C16] py-16 text-[#F8FAFC] sm:py-20 lg:py-24"
      >
        <div className="editorial-container">
          <RevealInView className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[#F0C188] sm:text-sm">
                {locale === "ar" ? "ضيوف الموسم الأول" : "Season One Guests"}
              </p>
              <h2
                id="guests-preview-heading"
                className="mt-2 text-2xl font-extrabold tracking-tight text-[#FFFFFF] sm:text-3xl lg:text-4xl"
              >
                {locale === "ar"
                  ? "شخصيات مؤثرة وتجارب ملهمة"
                  : "Distinguished Voices & Leaders"}
              </h2>
            </div>
            <p className="max-w-md text-sm text-[#B8C2D8]">
              {locale === "ar"
                ? "استعراض أولي لإطار صور ضيوف الموسم الأول مع الحفاظ على نسب الوجه الطبيعية وجودة العرض."
                : "Initial editorial framing of confirmed Season One guest portraits preserving natural facial proportions."}
            </p>
          </RevealInView>

          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 lg:gap-6">
            {confirmedPortraitGuests.map((guest, idx) => (
              <RevealInView key={guest.id} delay={Math.min(idx * 0.04, 0.2)}>
                <article className="group overflow-hidden rounded-2xl border border-[var(--border-dark)] bg-[#111629] transition-colors hover:border-[#F0C188]/45">
                  <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#181f38]">
                    {guest.portrait && (
                      <Image
                        src={guest.portrait}
                        alt={guest.name[locale]}
                        fill
                        loading="lazy"
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        style={{ objectPosition: guest.objectPosition }}
                        sizes="(max-width: 640px) 46vw, (max-width: 1024px) 30vw, 23vw"
                      />
                    )}
                    <div
                      aria-hidden="true"
                      className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#090C16]/95 via-[#090C16]/40 to-transparent"
                    />
                  </div>
                  <div className="p-3.5 sm:p-4">
                    <h3 className="text-sm font-bold text-[#FFFFFF] sm:text-base">
                      {guest.name[locale]}
                    </h3>
                    <p className="mt-0.5 text-xs text-[#F0C188]">
                      {locale === "ar" ? "ضيف الموسم الأول" : "Season One Guest"}
                    </p>
                  </div>
                </article>
              </RevealInView>
            ))}
          </div>
        </div>
      </section>

      {/* ELEVATED DARK SECTION — ProMedia Production House (Mandatory Pure White Logo Plate) */}
      <section
        id="promedia"
        aria-labelledby="promedia-heading"
        className="border-t border-[var(--border-dark)] bg-[#111629] py-16 text-[#F8FAFC] sm:py-20 lg:py-24"
      >
        <div className="editorial-container">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
            <RevealInView className="lg:col-span-5">
              <p className="text-xs font-bold uppercase tracking-widest text-[#F0C188] sm:text-sm">
                {locale === "ar" ? "الشركة المنتجة" : "The Production House"}
              </p>
              <h2
                id="promedia-heading"
                className="mt-3 text-2xl font-extrabold tracking-tight text-[#FFFFFF] sm:text-3xl lg:text-4xl"
              >
                {companyData.tagline[locale]}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-[#CBD5E1]">
                {companyData.introduction[locale]}
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-4">
                <ProMediaLogo size="lg" />
              </div>
            </RevealInView>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-7">
              {companyData.capabilities.map((cap, idx) => {
                const Icon = CAPABILITY_ICONS[idx % CAPABILITY_ICONS.length];
                return (
                  <RevealInView key={cap.id} delay={idx * 0.05}>
                    <div className="flex h-full flex-col rounded-2xl border border-[var(--border-dark)] bg-[#090C16]/75 p-5">
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#2F3B8E]/25 text-[#F0C188]">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <h3 className="mt-4 text-base font-bold text-[#FFFFFF]">
                        {cap.title[locale]}
                      </h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-[#B8C2D8]">
                        {cap.description[locale]}
                      </p>
                    </div>
                  </RevealInView>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
