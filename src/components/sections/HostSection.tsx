"use client";

import React from "react";
import Image from "next/image";
import { Briefcase, ExternalLink, Film, GraduationCap, Mic2 } from "lucide-react";
import hostData from "@/data/mohamed-elhagan.json";
import linksData from "@/data/mohamed-elhagan-links.json";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { RevealInView } from "@/components/ui/MotionPrimitives";

export function HostSection() {
  const { locale } = useLanguage();

  const publicSocialLinks = linksData.links.filter(
    (l) => l.includeInPublicUI && l.id !== "location"
  );

  return (
    <section
      id="host"
      aria-labelledby="host-heading"
      className="bg-[#FAF7F2] py-16 text-[#090C16] sm:py-20 lg:py-24"
    >
      <div className="editorial-container">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Portrait & Quick Facts Column */}
          <RevealInView className="lg:col-span-4">
            <div className="overflow-hidden rounded-2xl border border-[#090C16]/10 bg-[#090C16] p-5 text-[#F8FAFC] shadow-lg">
              <div className="relative mx-auto aspect-square w-full max-w-[280px] overflow-hidden rounded-xl border border-[#F0C188]/30 bg-[#111629]">
                <Image
                  src={hostData.portrait}
                  alt={hostData.name[locale]}
                  fill
                  loading="lazy"
                  className="object-cover object-top"
                  sizes="280px"
                />
              </div>

              <div className="mt-5 text-center">
                <p className="text-xs font-bold uppercase tracking-widest text-[#F0C188]">
                  {locale === "ar" ? "مقدم البرنامج" : "The Host"}
                </p>
                <h2
                  id="host-heading"
                  className="mt-1 text-2xl font-extrabold text-[#FFFFFF]"
                >
                  {hostData.name[locale]}
                </h2>
                <p className="mt-1.5 text-xs leading-relaxed text-[#CBD5E1]">
                  {hostData.role[locale]}
                </p>
              </div>

              {/* Verified Official Social Channels (Extracted from ProMedia Microsite) */}
              <div className="mt-6 border-t border-[var(--border-dark)] pt-5">
                <p className="mb-3 text-center text-xs font-semibold text-[#F0C188]">
                  {locale === "ar" ? "الحسابات الرسمية الموثقة" : "Verified Official Channels"}
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {publicSocialLinks.map((link) => (
                    <a
                      key={link.id}
                      href={link.cleanUrl || link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-[44px] items-center justify-between gap-1.5 rounded-xl border border-[var(--border-dark-strong)] bg-[#111629] px-3 text-xs font-semibold text-[#F8FAFC] transition-colors hover:border-[#FE7C01] hover:text-[#F0C188]"
                    >
                      <span className="truncate">{link.platform}</span>
                      <ExternalLink className="h-3.5 w-3.5 shrink-0 text-[#FE7C01]" aria-hidden="true" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </RevealInView>

          {/* Executive Biography, Education, Career Timeline & Productions */}
          <div className="space-y-8 lg:col-span-8">
            <RevealInView>
              <p className="text-xs font-bold uppercase tracking-widest text-[#B85400] sm:text-sm">
                {locale === "ar" ? "الملف التنفيذي لمقدم البرنامج" : "Executive Host Profile"}
              </p>
              <h3 className="mt-2 text-2xl font-extrabold leading-tight text-[#090C16] sm:text-3xl">
                {hostData.headline[locale]}
              </h3>
              <p className="mt-4 text-base leading-relaxed text-[#3B4459]">
                {hostData.summary[locale]}
              </p>
            </RevealInView>

            {/* Education & Academic Credentials */}
            <RevealInView>
              <div className="rounded-2xl border border-[#090C16]/10 bg-[#FFFFFF] p-6">
                <h4 className="flex items-center gap-2 text-base font-bold text-[#090C16]">
                  <GraduationCap className="h-5 w-5 text-[#2F3B8E]" aria-hidden="true" />
                  <span>
                    {locale === "ar" ? "التكوين الأكاديمي والسينمائي" : "Education & Cinema Training"}
                  </span>
                </h4>
                <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {hostData.education.map((edu, idx) => (
                    <li
                      key={idx}
                      className="rounded-xl border border-[#090C16]/8 bg-[#FAF7F2] p-3.5"
                    >
                      <span className="tabular-nums text-xs font-bold text-[#B85400]">
                        {edu.year}
                      </span>
                      <p className="mt-1 text-sm font-semibold text-[#090C16]">
                        {edu.degree[locale]}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </RevealInView>

            {/* Career Milestones */}
            <RevealInView>
              <div className="rounded-2xl border border-[#090C16]/10 bg-[#FFFFFF] p-6">
                <h4 className="flex items-center gap-2 text-base font-bold text-[#090C16]">
                  <Briefcase className="h-5 w-5 text-[#2F3B8E]" aria-hidden="true" />
                  <span>
                    {locale === "ar" ? "المسيرة المهنية والإعلامية" : "Career & Leadership Milestones"}
                  </span>
                </h4>
                <ol className="mt-4 space-y-3">
                  {hostData.careerTimeline.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex flex-col gap-1 border-b border-[#090C16]/8 pb-3 last:border-b-0 last:pb-0 sm:flex-row sm:items-baseline sm:gap-4"
                    >
                      <span className="tabular-nums w-28 shrink-0 text-xs font-bold text-[#2F3B8E]">
                        {item.period}
                      </span>
                      <span className="text-sm font-medium text-[#1E293B]">
                        {item.title[locale]}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            </RevealInView>

            {/* Selected Productions & Training */}
            <div className="grid grid-cols-1 gap-5 md:grid-cols-12">
              <RevealInView className="md:col-span-7">
                <div className="h-full rounded-2xl border border-[#090C16]/10 bg-[#FFFFFF] p-6">
                  <h4 className="flex items-center gap-2 text-base font-bold text-[#090C16]">
                    <Film className="h-5 w-5 text-[#2F3B8E]" aria-hidden="true" />
                    <span>
                      {locale === "ar" ? "أبرز الأعمال والإنتاجات" : "Selected Productions"}
                    </span>
                  </h4>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {hostData.selectedProductions.map((prod, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-[#2F3B8E]/15 bg-[#FAF7F2] px-3 py-1.5 text-xs font-semibold text-[#090C16]"
                      >
                        <span>{prod.title[locale]}</span>
                        <span className="text-[#5A647A]">• {prod.network[locale]}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </RevealInView>

              <RevealInView className="md:col-span-5">
                <div className="flex h-full flex-col justify-between rounded-2xl border border-[#2F3B8E]/20 bg-[#2F3B8E] p-6 text-[#FFFFFF]">
                  <div>
                    <h4 className="flex items-center gap-2 text-base font-bold text-[#F0C188]">
                      <Mic2 className="h-5 w-5" aria-hidden="true" />
                      <span>
                        {locale === "ar" ? "التدريب والمؤتمرات الدولية" : "Speaking & Academic Training"}
                      </span>
                    </h4>
                    <p className="mt-3 text-sm leading-relaxed text-[#E2E8F0]">
                      {hostData.trainingAndSpeaking[locale]}
                    </p>
                  </div>
                </div>
              </RevealInView>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
