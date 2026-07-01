"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useLanguage } from "./language-provider";
import {
  originalTitleProvider,
  resolveThreadTitle,
  type ThreadTitleTranslationProvider
} from "@/lib/thread-title-translation";

const ThreadTitleProviderContext = createContext<ThreadTitleTranslationProvider>(originalTitleProvider);

export function ThreadTitleProvider({
  children,
  provider = originalTitleProvider
}: {
  children: React.ReactNode;
  provider?: ThreadTitleTranslationProvider;
}) {
  return <ThreadTitleProviderContext.Provider value={provider}>{children}</ThreadTitleProviderContext.Provider>;
}

export function useThreadTitle(threadId: string, originalTitle: string) {
  const provider = useContext(ThreadTitleProviderContext);
  const { locale } = useLanguage();
  const [title, setTitle] = useState(originalTitle);

  useEffect(() => {
    let active = true;
    setTitle(originalTitle);
    void resolveThreadTitle(provider, {
      threadId,
      originalTitle,
      targetLocale: locale
    }).then((resolvedTitle) => {
      if (active) setTitle(resolvedTitle);
    });
    return () => { active = false; };
  }, [locale, originalTitle, provider, threadId]);

  return title;
}

export function ThreadTitleText({ threadId, originalTitle }: { threadId: string; originalTitle: string }) {
  return useThreadTitle(threadId, originalTitle);
}
