import type { Thread } from "./data";

export type ThreadStatus = "trending" | "rising" | "new";

const NEW_WINDOW_MS = 24 * 60 * 60 * 1_000;
const RISING_VOTE_THRESHOLD = 50;
const TRENDING_VOTE_THRESHOLD = 300;

function ageInMilliseconds(thread: Pick<Thread, "createdAt" | "time">, now: number) {
  if (thread.createdAt) return Math.max(0, now - new Date(thread.createdAt).getTime());

  const match = thread.time.match(/^(\d+)(m|h|d)$/);
  if (!match) return Number.POSITIVE_INFINITY;
  const amount = Number(match[1]);
  const unit = match[2];
  if (unit === "m") return amount * 60_000;
  if (unit === "h") return amount * 60 * 60_000;
  return amount * 24 * 60 * 60_000;
}

export function getThreadStatus(
  thread: Pick<Thread, "votes" | "createdAt" | "time">,
  now = Date.now()
): ThreadStatus | null {
  if (thread.votes >= TRENDING_VOTE_THRESHOLD) return "trending";

  const isNew = ageInMilliseconds(thread, now) < NEW_WINDOW_MS;
  if (isNew && thread.votes >= RISING_VOTE_THRESHOLD) return "rising";
  if (isNew) return "new";
  return null;
}
