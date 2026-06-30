export const RECENTLY_VIEWED_THREADS_KEY = "debaticaRecentlyViewedThreads";

const MAX_RECENTLY_VIEWED_THREADS = 5;

export function readRecentlyViewedThreadIds(): string[] {
  try {
    const stored = localStorage.getItem(RECENTLY_VIEWED_THREADS_KEY);
    if (!stored) return [];

    const parsed: unknown = JSON.parse(stored);
    if (!Array.isArray(parsed)) return [];

    return parsed
      .filter((id): id is string => typeof id === "string")
      .filter((id, index, ids) => ids.indexOf(id) === index)
      .slice(0, MAX_RECENTLY_VIEWED_THREADS);
  } catch {
    return [];
  }
}

export function addRecentlyViewedThread(threadId: string): void {
  try {
    const recentIds = readRecentlyViewedThreadIds().filter((id) => id !== threadId);
    localStorage.setItem(
      RECENTLY_VIEWED_THREADS_KEY,
      JSON.stringify([threadId, ...recentIds].slice(0, MAX_RECENTLY_VIEWED_THREADS))
    );
  } catch {
    // Browsing a thread must continue to work when storage is unavailable.
  }
}
