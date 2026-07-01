import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { threads } from "@/lib/data";
import { ThreadView } from "@/components/thread-view";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { fetchThread } from "@/lib/supabase/data";

async function findThread(id: string) {
  const fallbackThread = threads.find((item) => item.id === id);
  const client = getSupabaseServerClient();
  if (!client) return fallbackThread;
  try {
    return await fetchThread(client, id) ?? fallbackThread;
  } catch {
    return fallbackThread;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const thread = await findThread(id);
  if (!thread) return { title: "Debate not found" };
  return {
    title: thread.title,
    description: thread.description ?? "Vote and join the discussion on Debatica.",
    openGraph: { title: thread.title, description: thread.description ?? "Vote and join the discussion on Debatica." }
  };
}

export default async function ThreadPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const thread = await findThread(id);
  if (!thread) notFound();
  return <ThreadView thread={thread} />;
}
