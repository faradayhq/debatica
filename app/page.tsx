"use client";

import { useEffect, useMemo, useState } from "react";
import { ThreadCard } from "@/components/thread-card";
import { threads } from "@/lib/data";
import { useLanguage } from "@/components/language-provider";
import { getSupabaseBrowserClient, isSupabaseConfigured } from "@/lib/supabase/client";
import { fetchThreads } from "@/lib/supabase/data";
import type { Thread } from "@/lib/data";

export default function Home() {
  const { t } = useLanguage();
  const [supabaseThreads, setSupabaseThreads] = useState<Thread[] | null>(null);
  const [loading, setLoading] = useState(isSupabaseConfigured());
  const [loadError, setLoadError] = useState("");
  const displayThreads = supabaseThreads?.length ? supabaseThreads : threads;
  const [sort, setSort] = useState<"new" | "popular">("new");
  const sortedThreads = useMemo(() => {
    if (sort === "new") {
      return [...displayThreads].sort((a, b) => {
        if (a.createdAt && b.createdAt) return Date.parse(b.createdAt) - Date.parse(a.createdAt);
        return displayThreads.indexOf(a) - displayThreads.indexOf(b);
      });
    }
    const popularity = (thread: Thread) => {
      const ageHours = thread.createdAt
        ? Math.max(0, (Date.now() - Date.parse(thread.createdAt)) / 3_600_000)
        : Number.parseFloat(thread.time) * (thread.time.endsWith("d") ? 24 : thread.time.endsWith("h") ? 1 : 1 / 60);
      const momentum = (thread.votes + thread.comments * 3) / Math.pow(ageHours + 2, 0.35);
      return thread.votes + thread.comments * 3 + momentum * 5;
    };
    return [...displayThreads].sort((a, b) => popularity(b) - popularity(a));
  }, [displayThreads, sort]);

  useEffect(() => {
    const client = getSupabaseBrowserClient();
    if (!client) return;
    let active = true;
    fetchThreads(client)
      .then((items) => { if (active) setSupabaseThreads(items); })
      .catch(() => { if (active) setLoadError("Could not load live threads. Showing available threads instead."); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  return (
    <div className="page home-page">
      <section className="welcome">
        <p className="kicker">{t("home.kicker")}</p>
        <h1>{t("home.title")}</h1>
        <p>{t("home.subtitle")}</p>
      </section>

      {loading && <p className="data-status" role="status">Loading threads…</p>}
      {loadError && <p className="data-status error" role="alert">{loadError}</p>}

      <section className="content-section home-feed">
        <div className="sort-tabs home-sort" role="group" aria-label="Sort debates">
          <button aria-pressed={sort === "new"} className={sort === "new" ? "active" : ""} onClick={() => setSort("new")}>New</button>
          <button aria-pressed={sort === "popular"} className={sort === "popular" ? "active" : ""} onClick={() => setSort("popular")}>Popular</button>
        </div>
        <div className="thread-list">{sortedThreads.map((thread) => <ThreadCard thread={thread} key={thread.id} />)}</div>
      </section>
    </div>
  );
}
