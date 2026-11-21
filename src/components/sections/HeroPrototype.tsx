"use client";

import React from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Play, Sparkles } from "lucide-react";
import siteData from "@/data/site.json";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { FadeIn } from "@/components/ui/MotionPrimitives";
import { ProMediaLogo } from "@/components/ui/ProMediaLogo";

export function HeroPrototype() {
  const { locale, isRtl } = useLanguage();
  const DirectionalArrow = isRtl ? ArrowLeft : ArrowRight;

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative isolate overflow-hidden bg-[#090C16] pt-8 pb-16 sm:pt-12 sm:pb-20 lg:pt-16 lg:pb-24"
    >
      {/* Subtle Ambient Studio Glow (Zero heavy filters, pure CSS radial gradient) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 68% 55% at 78% 18%, rgba(47, 59, 142, 0.34), transparent 70%), radial-gradient(ellipse 46% 38% at 18% 82%, rgba(254, 124, 1, 0.14), transparent 72%)",
        }}
      />

      {/* Subtle Editorial Grid Hairlines */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#F0C188]/30 to-transparent"
      />

      <div className="editorial-container">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Editorial Copy & Campaign Identity Column */}
          <div className="flex flex-col items-start lg:col-span-6">
            <FadeIn delay={0.04}>
              <div className="inline-flex items-center gap-2.5 rounded-full border border-[#F0C188]/25 bg-[#111629] px-3.5 py-1.5 text-xs font-semibold tracking-wide text-[#F0C188] sm:text-sm">
                <span
                  className="h-2 w-2 rounded-full bg-[#FE7C01]"
                  aria-hidden="true"
                />
                <span>{siteData.hero.seasonBadge[locale]}</span>
              </div>
            </FadeIn>

            {/* Official TURKEYA Logo Lockup (Framed to honor original wood-grain identity) */}
            <FadeIn delay={0.1} className="mt-6 w-full max-w-[260px] sm:max-w-[300px]">
              <div className="overflow-hidden rounded-xl border border-[#F0C188]/45 bg-[#F0C188] shadow-[0_18px_45px_-18px_rgba(0,0,0,0.75)]">
                <Image
                  src={siteData.brand.logoPath}
                  alt={siteData.brand.logoAlt[locale]}
                  width={1726}
                  height={911}
                  priority
                  className="h-auto w-full object-cover"
                  sizes="(max-width: 640px) 260px, 300px"
                />
              </div>
            </FadeIn>

            <FadeIn delay={0.16}>
              <h1
                id="hero-heading"
                className="mt-6 text-3xl font-extrabold leading-[1.22] tracking-tight text-[#FFFFFF] sm:text-4xl lg:text-[2.85rem] lg:leading-[1.18]"
              >
                {siteData.hero.headline[locale]}
              </h1>
            </FadeIn>

            <FadeIn delay={0.22}>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-[#CBD5E1] sm:text-lg">
                {siteData.hero.subheadline[locale]}
              </p>
            </FadeIn>

            {/* Primary & Secondary CTAs (48px min height for comfortable mobile touch) */}
            <FadeIn delay={0.28} className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <a
                href={siteData.hero.primaryCta.href}
                className="inline-flex min-h-[48px] items-center justify-center gap-2.5 rounded-xl bg-[#FE7C01] px-6 text-sm font-bold text-[#090C16] shadow-[0_10px_28px_-10px_rgba(254,124,1,0.65)] transition-colors hover:bg-[#e56d00] sm:text-base"
              >
                <Play className="h-4 w-4 fill-current" aria-hidden="true" />
                <span>{siteData.hero.primaryCta[locale]}</span>
              </a>

              <a
                href={siteData.hero.secondaryCta.href}
                className="inline-flex min-h-[48px] items-center justify-center gap-2.5 rounded-xl border border-[#F0C188]/35 bg-[#111629] px-6 text-sm font-semibold text-[#F8FAFC] transition-colors hover:border-[#F0C188] hover:bg-[#181f38] sm:text-base"
              >
                <span>{siteData.hero.secondaryCta[locale]}</span>
                <DirectionalArrow className="h-4 w-4 text-[#F0C188]" aria-hidden="true" />
              </a>
            </FadeIn>

            {/* Editorial Production Highlights */}
            <FadeIn delay={0.34} className="mt-9 w-full border-t border-[var(--border-dark)] pt-6">
              <dl className="grid grid-cols-3 gap-3 sm:gap-6">
                {siteData.hero.highlights.map((item) => (
                  <div key={item.id} className="flex flex-col">
                    <dt className="text-[11px] font-medium text-[#94A3B8] sm:text-xs">
                      {item.label[locale]}
                    </dt>
                    <dd className="tabular-nums mt-1 text-base font-bold text-[#FFFFFF] sm:text-lg">
                      {item.value[locale]}
                    </dd>
                  </div>
                ))}
              </dl>
            </FadeIn>
          </div>

          {/* Cinematic Host Portrait Frame Column */}
          <div className="lg:col-span-6">
            <FadeIn delay={0.18} y={20}>
              <div className="mx-auto max-w-[520px] overflow-hidden rounded-2xl border border-[#F0C188]/25 bg-[#05060B] shadow-[0_28px_70px_-24px_rgba(0,0,0,0.9)]">
                {/* Square / Editorial Portrait Container blends seamlessly with dark portrait */}
                <div className="relative aspect-square w-full overflow-hidden bg-[#050505]">
                  <Image
                    src={siteData.hero.studioBackdropAsset}
                    alt={siteData.hero.studioBackdropAlt[locale]}
                    fill
                    priority
                    className="object-cover object-top"
                    sizes="(max-width: 1024px) 92vw, 520px"
                  />
                  {/* Editorial Cinema Gradient */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-[#090C16] via-transparent to-transparent"
                  />

                  {/* Top Corner Season Tag */}
                  <div className="absolute top-3.5 inset-inline-start-3.5 flex items-center gap-2 rounded-lg border border-white/15 bg-[#090C16]/80 px-3 py-1.5 text-xs font-semibold text-[#F8FAFC] backdrop-blur-sm">
                    <Sparkles className="h-3.5 w-3.5 text-[#FE7C01]" aria-hidden="true" />
                    <span>
                      {locale === "ar"
                        ? "محمد الهجان • التركايه"
                        : "Mohamed Elhagan • TURKEYA"}
                    </span>
                  </div>
                </div>

                {/* Bottom Caption Bar with Mandatory White-Background ProMedia Credit */}
                <div className="flex flex-col gap-4 border-t border-[var(--border-dark)] bg-[#111629] p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-wider text-[#F0C188]">
                      {locale === "ar" ? "تقديم محمد الهجان" : "Hosted by Mohamed Elhagan"}
                    </p>
                    <p className="mt-1 text-sm font-medium text-[#E2E8F0]">
                      {locale === "ar"
                        ? "لقاءات حوارية مصوّرة بمعايير بث سينمائية في القاهرة"
                        : "Cinematic broadcast-grade talk-show episodes filmed in Cairo"}
                    </p>
                  </div>

                  <div className="shrink-0 self-start sm:self-center">
                    <ProMediaLogo size="sm" />
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
