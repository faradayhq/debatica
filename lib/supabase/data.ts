import type { SupabaseClient } from "@supabase/supabase-js";
import { categories, type Category, type Comment, type GuestProfile, type Thread } from "../data";
import { getCountryCode } from "../countries";

type ThreadRow = {
  id: string;
  title: string;
  description: string | null;
  category: string;
  created_at: string;
  comment_count: number | string | null;
  vote_count: number | string | null;
  agree_count: number | string | null;
  disagree_count: number | string | null;
};

type CommentRow = {
  id: number;
  thread_id: string;
  guest_id: string;
  author_name: string;
  side: "agree" | "disagree" | "neutral";
  body: string;
  reply_to: number | null;
  age_range: string | null;
  country_code: string | null;
  created_at: string;
};

export type ReportRow = {
  id: string;
  target_type: "thread" | "comment" | "general";
  target_id: string | null;
  thread_id: string | null;
  comment_id: number | null;
  guest_id: string;
  created_at: string;
};

const RATE_LIMIT_MESSAGES = {
  thread: "You have reached the thread limit. Please try again in a few minutes.",
  comment: "You are commenting too quickly. Please wait a minute and try again.",
  report: "You have reached the report limit. Please try again in a few minutes."
} as const;

export class RateLimitError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "RateLimitError";
  }
}

function throwWriteError(error: { message?: string; details?: string }, target: keyof typeof RATE_LIMIT_MESSAGES): never {
  const databaseMessage = `${error.message ?? ""} ${error.details ?? ""}`;
  if (databaseMessage.includes(`RATE_LIMIT:${target}`)) throw new RateLimitError(RATE_LIMIT_MESSAGES[target]);
  throw error;
}

export function writeErrorMessage(error: unknown, fallback: string) {
  return error instanceof RateLimitError ? error.message : fallback;
}

function isCategory(value: string): value is Category {
  return categories.some((category) => category === value);
}

function relativeTime(createdAt: string) {
  const elapsed = Math.max(0, Date.now() - new Date(createdAt).getTime());
  const minutes = Math.floor(elapsed / 60_000);
  if (minutes < 1) return "now";
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h`;
  return `${Math.floor(hours / 24)}d`;
}

function mapThread(row: ThreadRow): Thread {
  const votes = Number(row.vote_count ?? 0);
  const agreeCount = Number(row.agree_count ?? 0);
  const agree = votes ? Math.round((agreeCount / votes) * 100) : 0;
  return {
    id: row.id,
    title: row.title,
    category: isCategory(row.category) ? row.category : "Society",
    ...(row.description && { description: row.description }),
    agree,
    disagree: votes ? 100 - agree : 0,
    comments: Number(row.comment_count ?? 0),
    votes,
    time: relativeTime(row.created_at),
    createdAt: row.created_at
  };
}

function mapComment(row: CommentRow): Comment {
  const profile: GuestProfile = {
    ...(row.age_range && { ageRange: row.age_range }),
    ...(row.country_code && { country: row.country_code })
  };
  return {
    id: Number(row.id),
    number: Number(row.id),
    author: row.author_name,
    side: row.side,
    text: row.body,
    score: 0,
    positiveVotes: 0,
    negativeVotes: 0,
    time: relativeTime(row.created_at),
    ...(row.reply_to && { replyTo: Number(row.reply_to) }),
    ...(Object.keys(profile).length && { profile })
  };
}

export async function fetchThreads(client: SupabaseClient) {
  const { data, error } = await client.from("thread_summaries").select("*").order("created_at", { ascending: false });
  if (error) throw error;
  return (data as ThreadRow[]).map(mapThread);
}

export async function fetchThread(client: SupabaseClient, id: string) {
  const { data, error } = await client.from("thread_summaries").select("*").eq("id", id).maybeSingle();
  if (error) throw error;
  return data ? mapThread(data as ThreadRow) : null;
}

export async function fetchThreadsByIds(client: SupabaseClient, ids: string[]) {
  const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  const validIds = ids.filter((id) => uuidPattern.test(id));
  if (!validIds.length) return [];
  const { data, error } = await client.from("thread_summaries").select("*").in("id", validIds);
  if (error) throw error;
  const byId = new Map((data as ThreadRow[]).map((row) => {
    const thread = mapThread(row);
    return [thread.id, thread] as const;
  }));
  return validIds.map((id) => byId.get(id)).filter((thread): thread is Thread => Boolean(thread));
}

export async function createThread(client: SupabaseClient, input: { title: string; description?: string; category: Category; guestId: string }) {
  const { data, error } = await client.rpc("create_thread_limited", {
    p_title: input.title,
    p_description: input.description ?? "",
    p_category: input.category,
    p_guest_id: input.guestId
  }).single();
  if (error) throwWriteError(error, "thread");
  return data as { id: string };
}

export async function fetchComments(client: SupabaseClient, threadId: string) {
  const { data, error } = await client.from("comments").select("*").eq("thread_id", threadId).order("created_at", { ascending: true });
  if (error) throw error;
  return (data as CommentRow[]).map(mapComment);
}

export async function createComment(client: SupabaseClient, input: {
  threadId: string;
  guestId: string;
  authorName: string;
  side: "agree" | "disagree" | "neutral";
  body: string;
  replyTo?: number;
  profile?: GuestProfile;
}) {
  const { data, error } = await client.rpc("create_comment_limited", {
    p_thread_id: input.threadId,
    p_guest_id: input.guestId,
    p_author_name: input.authorName,
    p_side: input.side,
    p_body: input.body,
    p_reply_to: input.replyTo ?? null,
    p_age_range: input.profile?.ageRange ?? null,
    p_country_code: getCountryCode(input.profile?.country) ?? null
  }).single();
  if (error) throwWriteError(error, "comment");
  return mapComment(data as CommentRow);
}

export async function fetchGuestVote(client: SupabaseClient, threadId: string, guestId: string) {
  const { data, error } = await client.from("thread_votes").select("choice").eq("thread_id", threadId).eq("guest_id", guestId).maybeSingle();
  if (error) throw error;
  return (data?.choice as "agree" | "disagree" | undefined) ?? null;
}

export async function saveGuestVote(client: SupabaseClient, threadId: string, guestId: string, choice: "agree" | "disagree") {
  const { error } = await client.from("thread_votes").upsert(
    { thread_id: threadId, guest_id: guestId, choice, updated_at: new Date().toISOString() },
    { onConflict: "thread_id,guest_id" }
  );
  if (error) throw error;
}

export async function fetchVoteCounts(client: SupabaseClient, threadId: string) {
  const { data, error } = await client.from("thread_votes").select("choice").eq("thread_id", threadId);
  if (error) throw error;
  const choices = data as { choice: "agree" | "disagree" }[];
  const agree = choices.filter((item) => item.choice === "agree").length;
  return { agree, disagree: choices.length - agree, total: choices.length };
}

export async function createReport(client: SupabaseClient, input: {
  targetType: ReportRow["target_type"];
  targetId?: string;
  threadId?: string;
  commentId?: number;
  guestId: string;
}) {
  const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  const persistedThreadId = input.threadId && uuidPattern.test(input.threadId) ? input.threadId : null;
  const { error } = await client.rpc("create_report_limited", {
    p_target_type: input.targetType,
    p_target_id: input.targetId ?? null,
    p_thread_id: persistedThreadId,
    p_comment_id: persistedThreadId ? input.commentId ?? null : null,
    p_guest_id: input.guestId
  });
  if (error) throwWriteError(error, "report");
}

export async function fetchReports(client: SupabaseClient) {
  const { data, error } = await client.from("reports").select("*").order("created_at", { ascending: false });
  if (error) throw error;
  return data as ReportRow[];
}
