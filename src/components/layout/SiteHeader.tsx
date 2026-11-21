"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Globe, Menu, X } from "lucide-react";
import siteData from "@/data/site.json";
import { useLanguage } from "@/components/providers/LanguageProvider";

export function SiteHeader() {
  const { locale, toggleLocale } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <>
      <a href="#main-content" className="skip-to-content">
        {siteData.ui.skipToContent[locale]}
      </a>

      <header
        className="sticky top-0 z-50 border-b border-[var(--border-dark)] bg-[#090C16]/92 backdrop-blur-md"
        style={{ paddingTop: "var(--safe-top)" }}
      >
        <div className="editorial-container flex h-[4.5rem] items-center justify-between gap-3">
          {/* Brand Lockup */}
          <Link
            href="/"
            className="group flex min-h-[44px] items-center gap-3 rounded-lg py-1"
            aria-label={siteData.brand.logoAlt[locale]}
          >
            <span className="relative flex h-10 w-[76px] shrink-0 items-center justify-center overflow-hidden rounded-md border border-[#F0C188]/35 bg-[#F0C188] shadow-sm transition-transform duration-300 group-hover:scale-[1.02]">
              <Image
                src={siteData.brand.logoPath}
                alt={siteData.brand.logoAlt[locale]}
                width={152}
                height={80}
                priority
                className="h-full w-full object-cover"
                sizes="76px"
              />
            </span>
            <span className="hidden flex-col sm:flex">
              <span className="text-sm font-bold tracking-tight text-[#F8FAFC]">
                {siteData.brand[locale]}
              </span>
              <span className="text-[11px] font-medium text-[#F0C188]">
                {siteData.brand.tagline[locale]}
              </span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav
            aria-label={locale === "ar" ? "التنقل الرئيسي" : "Main navigation"}
            className="hidden items-center gap-1 lg:flex"
          >
            {siteData.navigation.map((item) => (
              <a
                key={item.id}
                href={item.href}
                className="inline-flex min-h-[44px] items-center rounded-md px-3 text-sm font-medium text-[#CBD5E1] transition-colors hover:bg-white/5 hover:text-[#FFFFFF]"
              >
                {item.label[locale]}
              </a>
            ))}
          </nav>

          {/* Right/End Controls */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggleLocale}
              className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center gap-2 rounded-lg border border-[var(--border-dark-strong)] bg-[#111629] px-3 text-xs font-semibold text-[#F8FAFC] transition-colors hover:border-[#FE7C01] hover:text-[#F0C188]"
              aria-label={
                locale === "ar" ? "Switch to English" : "التبديل إلى العربية"
              }
            >
              <Globe className="h-4 w-4 text-[#FE7C01]" aria-hidden="true" />
              <span>{siteData.ui.switchLanguage[locale]}</span>
            </button>

            <a
              href="#sponsorship"
              className="hidden min-h-[44px] items-center justify-center rounded-lg bg-[#FE7C01] px-4 text-sm font-bold text-[#090C16] transition-colors hover:bg-[#e56d00] md:inline-flex"
            >
              {siteData.hero.secondaryCta[locale]}
            </a>

            {/* Mobile Menu Trigger (44x44px minimum touch target) */}
            <button
              type="button"
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav-drawer"
              aria-label={
                menuOpen
                  ? siteData.ui.closeMenu[locale]
                  : siteData.ui.openMenu[locale]
              }
              className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-[var(--border-dark-strong)] bg-[#111629] text-[#F8FAFC] transition-colors hover:border-[#FE7C01] lg:hidden"
            >
              {menuOpen ? (
                <X className="h-5 w-5" aria-hidden="true" />
              ) : (
                <Menu className="h-5 w-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {menuOpen && (
          <nav
            id="mobile-nav-drawer"
            aria-label={
              locale === "ar" ? "قائمة الجوال" : "Mobile navigation"
            }
            className="border-t border-[var(--border-dark)] bg-[#090C16] lg:hidden"
          >
            <div className="editorial-container flex flex-col gap-1 py-4">
              {siteData.navigation.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="flex min-h-[44px] items-center rounded-lg px-3 text-base font-medium text-[#E2E8F0] transition-colors hover:bg-[#111629] hover:text-[#F0C188]"
                >
                  {item.label[locale]}
                </a>
              ))}
              <div className="mt-3 pt-3 border-t border-[var(--border-dark)]">
                <a
                  href="#sponsorship"
                  onClick={() => setMenuOpen(false)}
                  className="flex min-h-[48px] w-full items-center justify-center rounded-lg bg-[#FE7C01] px-4 text-sm font-bold text-[#090C16]"
                >
                  {siteData.hero.secondaryCta[locale]}
                </a>
              </div>
            </div>
          </nav>
        )}
      </header>
    </>
  );
}
