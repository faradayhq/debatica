import type { Locale } from "./i18n";

export type ThreadTitleTranslationRequest = {
  threadId: string;
  originalTitle: string;
  targetLocale: Locale;
};

export interface ThreadTitleTranslationProvider {
  translateTitle(request: ThreadTitleTranslationRequest): Promise<string | null>;
}

export const originalTitleProvider: ThreadTitleTranslationProvider = {
  async translateTitle() {
    return null;
  }
};

export async function resolveThreadTitle(
  provider: ThreadTitleTranslationProvider,
  request: ThreadTitleTranslationRequest
) {
  try {
    const translatedTitle = (await provider.translateTitle(request))?.trim();
    return translatedTitle || request.originalTitle;
  } catch {
    return request.originalTitle;
  }
}
