import { notFound } from "next/navigation";
import { threads } from "@/lib/data";
import { ThreadView } from "@/components/thread-view";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { fetchThread } from "@/lib/supabase/data";

export default async function ThreadPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const fallbackThread = threads.find((item) => item.id === id);
  let thread = fallbackThread;
  const client = getSupabaseServerClient();
  if (client) {
    try {
      thread = await fetchThread(client, id) ?? fallbackThread;
    } catch {
      thread = fallbackThread;
    }
  }
  if (!thread) notFound();
  return <ThreadView thread={thread} />;
}
