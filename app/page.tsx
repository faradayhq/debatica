"use client";

import { useEffect, useMemo, useState } from "react";
import { ThreadCard } from "@/components/thread-card";
import { threads } from "@/lib/data";
import { useLanguage } from "@/components/language-provider";
import { getSupabaseBrowserClient, isSupabaseConfigured } from "@/lib/supabase/client";
import { fetchThreads } from "@/lib/supabase/data";
import type { Thread } from "@/lib/data";
import { CategoryGrid } from "@/components/category-grid";
import Link from "next/link";

export default function Home() {
  const { locale, setLocale, t } = useLanguage();
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
      <h1 className="visually-hidden">Debatica debates</h1>
      <div className="home-layout">
      <div className="home-main">
      <section className="home-intro" aria-label="Debatica introduction and language">
        <p>{t("home.subtitle")}</p>
        <div className="language-options" role="group" aria-label="Choose display language / 表示言語を選択">
          <button
            type="button"
            className={locale === "ja" ? "active" : ""}
            aria-pressed={locale === "ja"}
            onClick={() => setLocale("ja")}
          >
            <span aria-hidden="true">🇯🇵</span> 日本語
          </button>
          <button
            type="button"
            className={locale === "en" ? "active" : ""}
            aria-pressed={locale === "en"}
            onClick={() => setLocale("en")}
          >
            <span aria-hidden="true">🇺🇸</span> English
          </button>
        </div>
      </section>

      {loading && <p className="data-status" role="status">Loading threads…</p>}
      {loadError && <p className="data-status error" role="alert">{loadError}</p>}

      <section className="content-section home-feed">
        <div className="sort-tabs home-sort" role="group" aria-label="Sort debates">
          <button aria-pressed={sort === "new"} className={sort === "new" ? "active" : ""} onClick={() => setSort("new")}>{t("sort.new")}</button>
          <button aria-pressed={sort === "popular"} className={sort === "popular" ? "active" : ""} onClick={() => setSort("popular")}>{t("sort.best")}</button>
        </div>
        <div className="thread-list">{sortedThreads.map((thread) => <ThreadCard thread={thread} key={thread.id} />)}</div>
      </section>
      </div>
      <aside className="desktop-sidebar" aria-label="Explore Debatica">
        <section className="sidebar-panel">
          <div className="sidebar-heading">
            <div><span className="section-index">EXPLORE</span><h2>Categories</h2></div>
            <Link href="/categories">View all</Link>
          </div>
          <CategoryGrid limit={6} />
        </section>
        <section className="sidebar-panel sidebar-create">
          <span className="section-index">YOUR TURN</span>
          <h2>Put a question to the board.</h2>
          <p>Start a focused debate and see where opinion splits.</p>
          <Link className="primary-button" href="/create">Create a debate</Link>
        </section>
      </aside>
      </div>
    </div>
  );
}
