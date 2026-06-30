"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Icon } from "./icons";
import { threads } from "@/lib/data";
import type { Thread } from "@/lib/data";
import { readRecentlyViewedThreadIds } from "@/lib/recently-viewed";
import { getSupabaseBrowserClient, isSupabaseConfigured } from "@/lib/supabase/client";
import { fetchThreadsByIds } from "@/lib/supabase/data";

export function RecentlyViewedThreads({ className = "" }: { className?: string }) {
  const [recentlyViewedIds, setRecentlyViewedIds] = useState<string[]>([]);
  const [availableThreads, setAvailableThreads] = useState<Thread[] | null>(isSupabaseConfigured() ? null : threads);
  const recentlyViewed = useMemo(() => recentlyViewedIds
    .map((id) => availableThreads?.find((thread) => thread.id === id))
    .filter((thread): thread is Thread => Boolean(thread)), [availableThreads, recentlyViewedIds]);

  useEffect(() => {
    const ids = readRecentlyViewedThreadIds();
    setRecentlyViewedIds(ids);
    const client = getSupabaseBrowserClient();
    if (!client) return;
    let active = true;
    fetchThreadsByIds(client, ids)
      .then((items) => { if (active) setAvailableThreads(items); })
      .catch(() => { if (active) setAvailableThreads(threads); });
    return () => { active = false; };
  }, []);

  if (!recentlyViewed.length) return null;

  return (
    <section className={`recently-viewed ${className}`.trim()} aria-labelledby="recently-viewed-heading">
      <div className="recently-viewed-heading"><div><span className="section-index">HISTORY</span><h2 id="recently-viewed-heading">Recently viewed</h2></div><span>Stored on this device</span></div>
      <div className="recently-viewed-list">{recentlyViewed.map((thread) => <Link href={`/thread/${thread.id}`} className="recently-viewed-item" key={thread.id}><span className="category-pill">{thread.category}</span><strong>{thread.title}</strong><small>{thread.agree}% Agree · {thread.disagree}% Disagree</small><Icon name="chevron" size={17} /></Link>)}</div>
    </section>
  );
}
