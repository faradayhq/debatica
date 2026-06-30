"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CategoryGrid } from "@/components/category-grid";
import { AdPlaceholder } from "@/components/ad-placeholder";
import { ThreadCard, VoteSplit } from "@/components/thread-card";
import { Icon } from "@/components/icons";
import { RecentlyViewedThreads } from "@/components/recently-viewed-threads";
import { ReportButton } from "@/components/report-modal";
import { threads } from "@/lib/data";
import { categoryTranslationKey } from "@/lib/i18n";
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
  const featured = displayThreads[0];

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

      <section className="today-card">
        <div className="today-top"><span>{t("home.today")}</span><div className="today-status"><span className="live-dot">{t("home.live")}</span><ReportButton className="report-button report-button-light" targetType="thread" targetId={featured.id} threadId={featured.id} /></div></div>
        <div className="today-content">
          <span className="category-pill light">{t(categoryTranslationKey(featured.category))}</span>
          <h2>{featured.title}</h2>
          <p>{featured.description}</p>
          <VoteSplit agree={featured.agree} disagree={featured.disagree} />
          <Link href={`/thread/${featured.id}`} className="light-button">{t("home.enter")} <Icon name="arrow" size={18} /></Link>
        </div>
      </section>

      <RecentlyViewedThreads className="home-recently-viewed" />

      <section className="content-section">
        <div className="section-heading"><div><span className="section-index">01</span><h2>{t("home.hot")}</h2></div><Link href="/search">{t("home.seeAll")} <Icon name="chevron" size={15} /></Link></div>
        <div className="thread-list">{displayThreads.slice(1, 4).map((thread, i) => <ThreadCard thread={thread} rank={i + 1} key={thread.id} />)}</div>
        <AdPlaceholder />
      </section>

      <section className="content-section tinted-section">
        <div className="section-heading"><div><span className="section-index">02</span><h2>{t("home.active")}</h2></div><span className="section-note">{t("home.momentum")}</span></div>
        <div className="horizontal-threads">{displayThreads.slice(3, 6).map((thread) => <ThreadCard thread={thread} key={thread.id} />)}</div>
      </section>

      <section className="content-section">
        <div className="section-heading"><div><span className="section-index">03</span><h2>{t("home.closest")}</h2></div><span className="split-badge">≈ 50 / 50</span></div>
        {displayThreads[5] ? <ThreadCard thread={displayThreads[5]} /> : <ThreadCard thread={featured} />}
      </section>

      <section className="content-section">
        <div className="section-heading"><div><span className="section-index">04</span><h2>{t("home.latest")}</h2></div><Link href="/search">{t("home.seeAll")} <Icon name="chevron" size={15} /></Link></div>
        <div className="thread-list">{displayThreads.slice(0, 3).map((thread) => <ThreadCard thread={thread} key={thread.id} />)}</div>
      </section>

      <section className="content-section categories-preview">
        <div className="section-heading"><div><span className="section-index">05</span><h2>{t("home.categories")}</h2></div><Link href="/categories">{t("home.browseAll")} <Icon name="chevron" size={15} /></Link></div>
        <CategoryGrid limit={6} />
      </section>
    </div>
  );
}
