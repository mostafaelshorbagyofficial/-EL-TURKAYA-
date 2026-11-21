"use client";

import React from "react";
import siteData from "@/data/site.json";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { RevealInView } from "@/components/ui/MotionPrimitives";

export function AboutSection() {
  const { locale } = useLanguage();

  return (
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
            <RevealInView key={pillar.id} delay={idx * 0.05}>
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
  );
}
