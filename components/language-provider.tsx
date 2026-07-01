"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { dictionaries, LANGUAGE_STORAGE_KEY, type Locale, type TranslationKey } from "@/lib/i18n";

type LanguageContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: TranslationKey, values?: Record<string, string | number>) => string;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const value = useMemo<LanguageContextValue>(() => ({
    locale,
    setLocale(nextLocale) {
      try { localStorage.setItem(LANGUAGE_STORAGE_KEY, nextLocale); } catch { /* Keep the in-memory preference. */ }
      setLocaleState(nextLocale);
    },
    t(key, values = {}) {
      return Object.entries(values).reduce(
        (message, [name, replacement]) => message.replaceAll(`{${name}}`, String(replacement)),
        dictionaries[locale][key]
      );
    }
  }), [locale]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
}
