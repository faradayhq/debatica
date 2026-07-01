"use client";

import { createElement, useEffect, useState, type ElementType } from "react";
import { useLanguage } from "./language-provider";

type TranslationAvailability = "available" | "downloadable" | "downloading" | "unavailable" | "readily" | "after-download" | "no";

type BrowserTranslator = {
  translate(text: string): Promise<string>;
  destroy?: () => void;
};

type BrowserTranslatorFactory = {
  availability(options: { sourceLanguage: string; targetLanguage: string }): Promise<TranslationAvailability>;
  create(options: { sourceLanguage: string; targetLanguage: string }): Promise<BrowserTranslator>;
};

declare global {
  interface Window {
    Translator?: BrowserTranslatorFactory;
  }
}

export type TranslatableSegment = {
  text: string;
  as?: ElementType;
  className?: string;
};

type TranslationState = "checking" | "available" | "unavailable" | "translating" | "translated";

export function BrowserTranslatedContent({
  segments,
  sourceLanguage = "en",
  buttonClassName = ""
}: {
  segments: TranslatableSegment[];
  sourceLanguage?: string;
  buttonClassName?: string;
}) {
  const { locale, t } = useLanguage();
  const [state, setState] = useState<TranslationState>("checking");
  const [translatedSegments, setTranslatedSegments] = useState<string[] | null>(null);
  const [showBrowserHelp, setShowBrowserHelp] = useState(false);
  const showingTranslation = state === "translated";

  useEffect(() => {
    let active = true;
    setTranslatedSegments(null);
    setShowBrowserHelp(false);

    async function detectAvailability() {
      if (locale === sourceLanguage || !window.Translator) {
        if (active) setState("unavailable");
        return;
      }
      try {
        const availability = await window.Translator.availability({ sourceLanguage, targetLanguage: locale });
        if (active) setState(availability === "unavailable" || availability === "no" ? "unavailable" : "available");
      } catch {
        if (active) setState("unavailable");
      }
    }

    setState("checking");
    void detectAvailability();
    return () => { active = false; };
  }, [locale, sourceLanguage]);

  async function translate() {
    if (showingTranslation) {
      setState("available");
      return;
    }
    if (!window.Translator || state === "translating") return;

    setState("translating");
    let translator: BrowserTranslator | undefined;
    try {
      translator = await window.Translator.create({ sourceLanguage, targetLanguage: locale });
      const results = await Promise.all(segments.map(({ text }) => translator!.translate(text)));
      setTranslatedSegments(results);
      setState("translated");
    } catch {
      setTranslatedSegments(null);
      setState("unavailable");
    } finally {
      translator?.destroy?.();
    }
  }

  const isSafariOrIos = typeof navigator !== "undefined" && (
    /iPhone|iPad|iPod/i.test(navigator.userAgent)
    || (/Safari/i.test(navigator.userAgent) && !/Chrome|Chromium|CriOS|Edg|OPR|Android/i.test(navigator.userAgent))
  );
  const browserHelp = isSafariOrIos
    ? "On Safari or iPhone, use Translate from the address bar’s page menu or the Share menu."
    : "Use your browser’s built-in translation from the address bar or browser menu.";

  return (
    <>
      {segments.map((segment, index) => createElement(
        segment.as ?? "p",
        { className: segment.className, key: index, lang: showingTranslation ? locale : sourceLanguage },
        showingTranslation ? translatedSegments?.[index] : segment.text
      ))}
      {state === "unavailable" ? (
        <>
          <button
            type="button"
            className={`translation-button translation-fallback-button ${buttonClassName}`.trim()}
            aria-expanded={showBrowserHelp}
            onClick={() => setShowBrowserHelp((visible) => !visible)}
          >
            🌐 Browser translate
          </button>
          {showBrowserHelp ? (
            <span className="translation-browser-help" role="status">{browserHelp}</span>
          ) : null}
        </>
      ) : state !== "checking" ? (
        <button
          type="button"
          className={`translation-button ${buttonClassName}`.trim()}
          aria-pressed={showingTranslation}
          disabled={state === "translating"}
          onClick={translate}
        >
          🌐 {state === "translating" ? "…" : t(showingTranslation ? "action.original" : "action.translate")}
        </button>
      ) : null}
    </>
  );
}
