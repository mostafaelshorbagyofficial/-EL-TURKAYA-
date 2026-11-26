"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Printer } from "lucide-react";
import siteData from "@/data/site.json";
import guestsData from "@/data/guests.json";
import hostData from "@/data/mohamed-elhagan.json";
import companyData from "@/data/company.json";
import platformsData from "@/data/platforms.json";
import sponsorshipData from "@/data/sponsorship.json";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { ProMediaLogo } from "@/components/ui/ProMediaLogo";

export default function MediaKitPage() {
  const { locale, isRtl, toggleLocale } = useLanguage();
  const BackArrow = isRtl ? ArrowRight : ArrowLeft;
  const verifiedGuests = guestsData.guests.filter(
    (g) =>
      g.verificationStatus === "VERIFIED" &&
      !("publicVisible" in g && g.publicVisible === false)
  );

  return (
    <div className="min-h-dvh bg-[#FAF7F2] text-[#090C16]">
      {/* Print-hidden utility bar */}
      <div className="sticky top-0 z-40 border-b border-[#090C16]/10 bg-[#090C16] text-[#FFFFFF] print:hidden">
        <div className="editorial-container flex h-16 items-center justify-between gap-3">
          <Link
            href="/"
            className="inline-flex min-h-[44px] items-center gap-2 text-sm font-bold text-[#F0C188] hover:text-[#FFFFFF]"
          >
            <BackArrow className="h-4 w-4" aria-hidden="true" />
            <span>{locale === "ar" ? "العودة للرئيسية" : "Back to Home"}</span>
          </Link>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggleLocale}
              className="min-h-[44px] rounded-lg border border-white/20 px-3 text-xs font-bold text-[#FFFFFF]"
            >
              {siteData.ui.switchLanguage[locale]}
            </button>
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-[#FE7C01] px-4 text-xs font-bold text-[#090C16] hover:bg-[#e56d00]"
            >
              <Printer className="h-4 w-4" aria-hidden="true" />
              <span>
                {locale === "ar" ? "طباعة / حفظ PDF" : "Print / Save PDF"}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Printable Executive Dossier */}
      <main className="editorial-container max-w-4xl py-10 sm:py-14">
        <article className="space-y-10 rounded-2xl border border-[#090C16]/10 bg-[#FFFFFF] p-6 shadow-xs sm:p-10 print:border-0 print:p-0 print:shadow-none">
          {/* Cover Header */}
          <header className="flex flex-col items-start justify-between gap-6 border-b border-[#090C16]/12 pb-8 sm:flex-row sm:items-center">
            <div className="space-y-3">
              <div className="w-[210px] overflow-hidden rounded-lg border border-[#090C16]/10 bg-[#F0C188]">
                <Image
                  src={siteData.brand.logoPath}
                  alt={siteData.brand.logoAlt[locale]}
                  width={1726}
                  height={911}
                  priority
                  className="h-auto w-full object-cover"
                />
              </div>
              <h1 className="text-2xl font-extrabold text-[#090C16] sm:text-3xl">
                {locale === "ar"
                  ? "الملف الإعلامي التنفيذي — برنامج التركايه"
                  : "Executive Media Kit — TURKEYA"}
              </h1>
              <p className="text-sm text-[#3B4459]">
                {siteData.brand.tagline[locale]}
              </p>
            </div>
            <ProMediaLogo size="md" />
          </header>

          {/* Program Overview */}
          <section>
            <h2 className="text-lg font-extrabold text-[#2F3B8E]">
              {locale === "ar" ? "١. نبذة عن البرنامج" : "1. Program Overview"}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-[#3B4459]">
              {siteData.about.description[locale]}
            </p>
          </section>

          {/* Verified Distribution Ecosystem */}
          <section>
            <h2 className="text-lg font-extrabold text-[#2F3B8E]">
              {locale === "ar"
                ? "٢. القنوات الرسمية ومنظومة التوزيع الموثقة"
                : "2. Verified Distribution Ecosystem"}
            </h2>
            <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {platformsData.platforms.map((p) => (
                <div
                  key={p.id}
                  className="rounded-xl border border-[#090C16]/10 bg-[#FAF7F2] p-3.5"
                >
                  <p className="text-sm font-bold text-[#090C16]">{p.name}</p>
                  <p className="text-xs text-[#5A647A]" dir="ltr">
                    {p.handle}
                  </p>
                  <p className="mt-1 text-xs font-bold text-[#2F3B8E]">
                    {p.metric[locale]}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Season One Guest Portfolio */}
          <section>
            <h2 className="text-lg font-extrabold text-[#2F3B8E]">
              {locale === "ar" ? "٣. ضيوف الموسم الأول" : "3. Season One Guest Portfolio"}
            </h2>
            <ul className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {verifiedGuests.map((g) => (
                <li
                  key={g.id}
                  className="rounded-xl border border-[#090C16]/10 bg-[#FAF7F2] p-3.5"
                >
                  <p className="text-sm font-bold text-[#090C16]">{g.name[locale]}</p>
                  <p className="mt-0.5 text-xs text-[#3B4459]">{g.title[locale]}</p>
                </li>
              ))}
            </ul>
          </section>

          {/* Host & Production House */}
          <section className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <h2 className="text-lg font-extrabold text-[#2F3B8E]">
                {locale === "ar" ? "٤. مقدم البرنامج" : "4. The Host"}
              </h2>
              <p className="mt-2 text-sm font-bold text-[#090C16]">
                {hostData.name[locale]}
              </p>
              <p className="mt-1 text-xs leading-relaxed text-[#3B4459]">
                {hostData.summary[locale]}
              </p>
            </div>
            <div>
              <h2 className="text-lg font-extrabold text-[#2F3B8E]">
                {locale === "ar" ? "٥. الشركة المنتجة" : "5. Production Company"}
              </h2>
              <p className="mt-2 text-sm font-bold text-[#090C16]">
                {companyData.legalDisplay}
              </p>
              <p className="mt-1 text-xs leading-relaxed text-[#3B4459]">
                {companyData.introduction[locale]}
              </p>
            </div>
          </section>

          {/* Sponsorship Formats */}
          <section>
            <h2 className="text-lg font-extrabold text-[#2F3B8E]">
              {locale === "ar" ? "٦. فرص الرعاية والشراكات" : "6. Sponsorship Opportunities"}
            </h2>
            <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {sponsorshipData.tiers.map((tier) => (
                <div
                  key={tier.id}
                  className="rounded-xl border border-[#090C16]/10 bg-[#FAF7F2] p-3.5"
                >
                  <p className="text-sm font-bold text-[#090C16]">
                    {tier.title[locale]}
                  </p>
                  <p className="mt-1 text-xs text-[#3B4459]">
                    {tier.summary[locale]}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Contact */}
          <footer className="border-t border-[#090C16]/12 pt-6 text-xs text-[#3B4459]">
            <p className="font-bold text-[#090C16]">{companyData.legalDisplay}</p>
            <p className="mt-1">{companyData.contact.address[locale]}</p>
            <p className="mt-1" dir="ltr">
              {companyData.contact.phones.join(" • ")} | WhatsApp: {companyData.contact.whatsappDigits} | {companyData.websiteDisplay}
            </p>
          </footer>
        </article>
      </main>
    </div>
  );
}
