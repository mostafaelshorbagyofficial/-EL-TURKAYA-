"use client";

import React from "react";
import { Clapperboard, Compass, ExternalLink, Handshake, Layers, MapPin, Phone } from "lucide-react";
import companyData from "@/data/company.json";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { RevealInView } from "@/components/ui/MotionPrimitives";
import { ProMediaLogo } from "@/components/ui/ProMediaLogo";

const CAPABILITY_ICONS = [Compass, Clapperboard, Layers, Handshake];

export function ProMediaSection() {
  const { locale } = useLanguage();

  return (
    <section
      id="promedia"
      aria-labelledby="promedia-heading"
      className="border-t border-[var(--border-dark)] bg-[#111629] py-16 text-[#F8FAFC] sm:py-20 lg:py-24"
    >
      <div className="editorial-container">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12">
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

            {/* Mandatory Pure White Logo Plate */}
            <div className="mt-7 flex flex-wrap items-center gap-4">
              <ProMediaLogo size="lg" />
            </div>

            {/* Verified HQ & Contact Details */}
            <div className="mt-7 space-y-2.5 rounded-2xl border border-[var(--border-dark)] bg-[#090C16]/70 p-4 text-sm text-[#CBD5E1]">
              <div className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#FE7C01]" aria-hidden="true" />
                <span>{companyData.contact.address[locale]}</span>
              </div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                {companyData.contact.phones.map((phone) => (
                  <a
                    key={phone}
                    href={`tel:${phone.replace(/\s+/g, "")}`}
                    dir="ltr"
                    className="inline-flex min-h-[36px] items-center gap-2 font-semibold text-[#F8FAFC] hover:text-[#F0C188]"
                  >
                    <Phone className="h-3.5 w-3.5 text-[#FE7C01]" aria-hidden="true" />
                    <span>{phone}</span>
                  </a>
                ))}
              </div>
              <div className="pt-1">
                <a
                  href={companyData.contact.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[44px] items-center gap-2 text-xs font-semibold text-[#F0C188] hover:underline"
                >
                  <span>
                    {locale === "ar" ? "عرض مقر ProMedia على خرائط جوجل" : "View ProMedia HQ on Google"}
                  </span>
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              </div>
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
  );
}
