"use client";

import React from "react";
import { MessageCircle } from "lucide-react";
import companyData from "@/data/company.json";
import { useLanguage } from "@/components/providers/LanguageProvider";

export function FloatingWhatsApp() {
  const { locale } = useLanguage();

  return (
    <a
      href={companyData.contact.whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={
        locale === "ar"
          ? "تواصل معنا عبر واتساب"
          : "Contact us on WhatsApp"
      }
      style={{
        bottom: "calc(1.25rem + var(--safe-bottom))",
      }}
      className="fixed inset-inline-end-5 z-40 inline-flex h-12 items-center gap-2 rounded-full border border-white/15 bg-[#25D366] px-4 text-xs font-extrabold text-[#090C16] shadow-[0_12px_30px_-8px_rgba(37,211,102,0.55)] transition-transform duration-200 hover:scale-105 focus-visible:outline-2 print:hidden sm:h-13 sm:px-5 sm:text-sm"
    >
      <MessageCircle className="h-5 w-5 fill-current" aria-hidden="true" />
      <span className="hidden sm:inline">
        {locale === "ar" ? "تواصل واتساب" : "WhatsApp"}
      </span>
    </a>
  );
}
