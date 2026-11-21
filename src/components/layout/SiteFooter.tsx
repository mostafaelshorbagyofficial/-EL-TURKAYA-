"use client";

import React from "react";
import Link from "next/link";
import siteData from "@/data/site.json";
import companyData from "@/data/company.json";
import linksData from "@/data/mohamed-elhagan-links.json";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { ProMediaLogo } from "@/components/ui/ProMediaLogo";

export function SiteFooter() {
  const { locale } = useLanguage();
  const publicLinks = linksData.links.filter(
    (l) => l.includeInPublicUI && l.id !== "location"
  );

  return (
    <footer
      className="border-t border-[var(--border-dark)] bg-[#090C16] pt-12 pb-10 text-[#CBD5E1]"
      style={{ paddingBottom: "max(2.5rem, var(--safe-bottom))" }}
    >
      <div className="editorial-container">
        <div className="grid grid-cols-1 gap-8 border-b border-[var(--border-dark)] pb-10 md:grid-cols-12 md:items-start">
          <div className="md:col-span-5">
            <p className="text-lg font-extrabold text-[#FFFFFF]">
              {siteData.brand[locale]}
            </p>
            <p className="mt-1 text-sm text-[#94A3B8]">
              {siteData.ui.footerProductionCredit[locale]}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {publicLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.cleanUrl || link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[38px] items-center rounded-lg border border-[var(--border-dark)] bg-[#111629] px-3 text-xs font-semibold text-[#CBD5E1] transition-colors hover:border-[#FE7C01] hover:text-[#FFFFFF]"
                >
                  {link.platform}
                </a>
              ))}
            </div>
          </div>

          <div className="md:col-span-4">
            <p className="text-xs font-bold uppercase tracking-widest text-[#F0C188]">
              {locale === "ar" ? "روابط سريعة" : "Quick Links"}
            </p>
            <ul className="mt-3 grid grid-cols-2 gap-y-2 text-xs">
              {siteData.navigation.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.href}
                    className="inline-flex min-h-[36px] items-center text-[#CBD5E1] hover:text-[#F0C188]"
                  >
                    {item.label[locale]}
                  </a>
                </li>
              ))}
              <li>
                <Link
                  href="/media-kit"
                  className="inline-flex min-h-[36px] items-center font-semibold text-[#FE7C01] hover:underline"
                >
                  {locale === "ar" ? "الملف الإعلامي" : "Media Kit"}
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex flex-col items-start gap-2 md:col-span-3 md:items-end">
            <ProMediaLogo size="sm" />
            <span className="text-xs text-[#94A3B8]" dir="ltr">
              {companyData.websiteDisplay}
            </span>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 text-xs text-[#8B97B5] sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {siteData.ui.copyright[locale]}
          </p>
          <p>{companyData.contact.location[locale]}</p>
        </div>
      </div>
    </footer>
  );
}
