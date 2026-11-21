"use client";

import React from "react";
import { BarChart3, ExternalLink, FileText, Radio } from "lucide-react";
import Link from "next/link";
import platformsData from "@/data/platforms.json";
import analyticsData from "@/data/analytics.json";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { RevealInView } from "@/components/ui/MotionPrimitives";

export function SeasonImpactSection() {
  const { locale } = useLanguage();

  return (
    <section
      id="season-one"
      aria-labelledby="season-one-heading"
      className="border-t border-[var(--border-dark)] bg-[#111629] py-16 text-[#F8FAFC] sm:py-20 lg:py-24"
    >
      <div className="editorial-container">
        <RevealInView className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-widest text-[#F0C188] sm:text-sm">
              {locale === "ar" ? "الموسم الأول — الأثر والانتشار" : "Season One — The Impact"}
            </p>
            <h2
              id="season-one-heading"
              className="mt-2 text-2xl font-extrabold tracking-tight text-[#FFFFFF] sm:text-3xl lg:text-4xl"
            >
              {locale === "ar"
                ? "حضور رقمي موثق ومنظومة توزيع متعددة المنصات"
                : "Verified Digital Ecosystem & Multi-Platform Distribution"}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[#CBD5E1] sm:text-base">
              {locale === "ar"
                ? "يستند برنامج «التركايه» إلى شبكة القنوات الرسمية لمقدم البرنامج محمد الهجان ومجموعة ProMedia، مما يمنح الحلقات والشركاء التجاريين وصولاً عضوياً واسعاً عبر أبرز المنصات الرقمية."
                : "TURKEYA leverages the verified official distribution network of host Mohamed Elhagan and ProMedia Group—delivering high-credibility organic reach across Egypt and the Arab world."}
            </p>
          </div>

          <Link
            href="/media-kit"
            className="inline-flex min-h-[48px] shrink-0 items-center justify-center gap-2 rounded-xl border border-[#F0C188]/40 bg-[#090C16] px-5 text-sm font-bold text-[#F0C188] transition-colors hover:border-[#FE7C01] hover:text-[#FFFFFF]"
          >
            <FileText className="h-4 w-4 text-[#FE7C01]" aria-hidden="true" />
            <span>
              {locale === "ar" ? "استعرض الملف الإعلامي (Media Kit)" : "View Executive Media Kit"}
            </span>
          </Link>
        </RevealInView>

        {/* Verified Season One & Distribution KPI Strip */}
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {analyticsData.metrics.map((item, idx) => (
            <RevealInView key={item.id} delay={idx * 0.05}>
              <div className="flex h-full flex-col rounded-2xl border border-[var(--border-dark)] bg-[#090C16]/85 p-5">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-[#2F3B8E]/30 text-[#F0C188]">
                  <BarChart3 className="h-4 w-4" aria-hidden="true" />
                </span>
                <p className="tabular-nums mt-4 text-2xl font-extrabold text-[#FFFFFF] sm:text-3xl" dir="ltr">
                  {item.value}
                </p>
                <p className="mt-1 text-sm font-bold text-[#F0C188]">
                  {item.label[locale]}
                </p>
                <p className="mt-2 text-xs leading-relaxed text-[#94A3B8]">
                  {item.measurementPeriod}
                </p>
              </div>
            </RevealInView>
          ))}
        </div>

        {/* Verified Official Distribution Channels */}
        <RevealInView className="mt-10">
          <div className="rounded-2xl border border-[var(--border-dark)] bg-[#090C16]/75 p-5 sm:p-6">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <h3 className="flex items-center gap-2 text-base font-bold text-[#FFFFFF]">
                <Radio className="h-4 w-4 text-[#FE7C01]" aria-hidden="true" />
                <span>
                  {locale === "ar"
                    ? "قنوات التوزيع الرسمية الموثقة (محمد الهجان • ProMedia)"
                    : "Verified Official Distribution Channels (Mohamed Elhagan • ProMedia)"}
                </span>
              </h3>
              <span className="text-xs text-[#94A3B8]">
                {locale === "ar"
                  ? "تقرير تحليلات الحلقات والجمهور التفصيلي متاح للشركاء عند الطلب"
                  : "Detailed episode demographic analytics available to partners upon request"}
              </span>
            </div>

            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {platformsData.platforms.map((p) => (
                <a
                  key={p.id}
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex min-h-[68px] items-center justify-between gap-3 rounded-xl border border-[var(--border-dark)] bg-[#111629] px-4 py-3 transition-colors hover:border-[#FE7C01]"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-[#FFFFFF] group-hover:text-[#F0C188]">
                      {p.name}
                    </p>
                    <p className="truncate text-xs text-[#94A3B8]" dir="ltr">
                      {p.handle}
                    </p>
                    <p className="tabular-nums mt-0.5 text-xs font-semibold text-[#F0C188]">
                      {p.metric[locale]}
                    </p>
                  </div>
                  <ExternalLink
                    className="h-4 w-4 shrink-0 text-[#94A3B8] transition-colors group-hover:text-[#FE7C01]"
                    aria-hidden="true"
                  />
                </a>
              ))}
            </div>
          </div>
        </RevealInView>
      </div>
    </section>
  );
}
