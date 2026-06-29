import { notFound } from "next/navigation";
import { threads } from "@/lib/data";
import { ThreadView } from "@/components/thread-view";

export default async function ThreadPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const thread = threads.find((item) => item.id === id);
  if (!thread) notFound();
  return <ThreadView thread={thread} />;
}
