"use client";

import { useEffect, useId, useState } from "react";
import Link from "next/link";
import type { Thread } from "@/lib/data";
import { useLanguage } from "./language-provider";
import { formatCompactCount } from "@/lib/format-count";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { fetchThread } from "@/lib/supabase/data";
import { AnimatedNumber } from "./animated-number";
import { categoryTranslationKey } from "@/lib/i18n";
import { useThreadTitle } from "./thread-title-provider";

export function VoteSplit({ agree, disagree, compact = false, animate = false }: { agree: number; disagree: number; compact?: boolean; animate?: boolean }) {
  const { t } = useLanguage();
  const total = agree + disagree;
  const agreePercent = total ? Math.round((agree / total) * 100) : 0;
  const disagreePercent = 100 - agreePercent;
  if (!total) {
    if (compact) {
      return (
        <div className="vote-split compact empty">
          <div className="vote-labels"><span><b>0%</b> {t("thread.agree")}</span></div>
          <div className="vote-track" role="img" aria-label="0% agree" />
        </div>
      );
    }
    return (
      <div className="vote-split empty">
        <p className="vote-empty-label">{t("thread.noVotesYet")}</p>
        <div className="vote-track" role="img" aria-label={t("thread.noVotesYet")} />
      </div>
    );
  }
  const leader = agreePercent === disagreePercent ? "even" : agreePercent > disagreePercent ? "agree" : "disagree";
  return (
    <div className={`vote-split ${compact ? "compact" : ""} leader-${leader}`}>
      <div className="vote-labels">
        <span className={leader === "agree" ? "leading" : ""}><b><AnimatedNumber value={agreePercent} enabled={animate} />%</b> {t("thread.agree")}</span>
        {!compact && <span className={leader === "disagree" ? "leading" : ""}><b><AnimatedNumber value={disagreePercent} enabled={animate} />%</b> {t("thread.disagree")}</span>}
      </div>
      <div className="vote-track" role="img" aria-label={`${agreePercent}% agree, ${disagreePercent}% disagree`}><span className="agree-bar" style={{ width: `${agreePercent}%` }} /><span className="disagree-bar" style={{ width: `${disagreePercent}%` }} /></div>
    </div>
  );
}

export function ThreadCard({ thread }: { thread: Thread; rank?: number }) {
  const [liveThread, setLiveThread] = useState(thread);
  const subscriptionId = useId().replace(/:/g, "");
  const { t } = useLanguage();
  const displayedTitle = useThreadTitle(liveThread.id, liveThread.title);

  useEffect(() => setLiveThread(thread), [thread]);

  useEffect(() => {
    const persisted = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(thread.id);
    const client = persisted ? getSupabaseBrowserClient() : null;
    if (!client) return;
    let active = true;

    async function refreshSummary() {
      try {
        const latest = await fetchThread(client!, thread.id);
        if (active && latest) setLiveThread(latest);
      } catch {
        // Keep the last confirmed summary if a realtime refresh fails.
      }
    }

    const channel = client.channel(`thread-summary-${thread.id}-${subscriptionId}`)
      .on("postgres_changes", { event: "*", schema: "public", table: "thread_votes", filter: `thread_id=eq.${thread.id}` }, refreshSummary)
      .on("postgres_changes", { event: "*", schema: "public", table: "comments", filter: `thread_id=eq.${thread.id}` }, refreshSummary)
      .subscribe();

    return () => {
      active = false;
      void client.removeChannel(channel);
    };
  }, [subscriptionId, thread.id]);

  return (
    <article className="thread-card">
      <Link href={`/thread/${thread.id}`} className="thread-card-link" aria-label={`Open debate: ${displayedTitle}`} />
      {liveThread.thumbnailUrl && <img className="thread-thumbnail" src={liveThread.thumbnailUrl} alt="" />}
      <div className="thread-card-body">
        <h3>{displayedTitle}</h3>
        <VoteSplit agree={liveThread.agree} disagree={liveThread.disagree} compact />
        <div className="card-meta">
          <span className="thread-context"><span>{t(categoryTranslationKey(liveThread.category))}</span><span className="metric-separator" aria-hidden="true">•</span><span>{liveThread.time}</span></span>
          <span className="thread-metrics" aria-label={`${liveThread.votes} votes, ${liveThread.comments} comments`}><span>{t("card.votes", { count: formatCompactCount(liveThread.votes) })}</span><span className="metric-separator" aria-hidden="true">•</span><span>{t("thread.comments", { count: formatCompactCount(liveThread.comments) })}</span></span>
        </div>
      </div>
    </article>
  );
}
