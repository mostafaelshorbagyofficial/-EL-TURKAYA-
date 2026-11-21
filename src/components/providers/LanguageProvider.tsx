"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type Locale = "ar" | "en";

interface LanguageContextValue {
  locale: Locale;
  dir: "rtl" | "ltr";
  isRtl: boolean;
  setLocale: (next: Locale) => void;
  toggleLocale: () => void;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(
  undefined
);

export function LanguageProvider({
  children,
  initialLocale = "ar",
}: {
  children: React.ReactNode;
  initialLocale?: Locale;
}) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);

  useEffect(() => {
    const dir = locale === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = locale;
    document.documentElement.dir = dir;
  }, [locale]);

  const setLocale = (next: Locale) => {
    setLocaleState(next);
  };

  const toggleLocale = () => {
    setLocaleState((prev) => (prev === "ar" ? "en" : "ar"));
  };

  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <LanguageContext.Provider
      value={{
        locale,
        dir,
        isRtl: locale === "ar",
        setLocale,
        toggleLocale,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return ctx;
}
