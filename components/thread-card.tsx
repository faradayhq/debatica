"use client";

import { useState } from "react";
import Link from "next/link";
import type { Thread } from "@/lib/data";
import { Icon } from "./icons";
import { ReportModal } from "./report-modal";
import { categoryTranslationKey } from "@/lib/i18n";
import { useLanguage } from "./language-provider";

export function VoteSplit({ agree, disagree, compact = false }: { agree: number; disagree: number; compact?: boolean }) {
  const { t } = useLanguage();
  const total = agree + disagree;
  const agreePercent = total ? Math.round((agree / total) * 100) : 50;
  const disagreePercent = 100 - agreePercent;
  const leader = agreePercent === disagreePercent ? "even" : agreePercent > disagreePercent ? "agree" : "disagree";
  return (
    <div className={`vote-split ${compact ? "compact" : ""} leader-${leader}`}>
      <div className="vote-labels">
        <span className={leader === "agree" ? "leading" : ""}><b>{agreePercent}%</b> {t("thread.agree")}</span>
        <span className={leader === "disagree" ? "leading" : ""}><b>{disagreePercent}%</b> {t("thread.disagree")}</span>
      </div>
      <div className="vote-track" role="img" aria-label={`${agreePercent}% agree, ${disagreePercent}% disagree`}><span className="agree-bar" style={{ width: `${agreePercent}%` }} /><span className="disagree-bar" style={{ width: `${disagreePercent}%` }} /></div>
    </div>
  );
}

export function ThreadCard({ thread, rank }: { thread: Thread; rank?: number }) {
  const [reportOpen, setReportOpen] = useState(false);
  const { t } = useLanguage();

  return (
    <>
      <article className="thread-card">
        <Link href={`/thread/${thread.id}`} className="thread-card-link" aria-label={`Open debate: ${thread.title}`} />
        {rank && <span className="rank">{String(rank).padStart(2, "0")}</span>}
        <div className="thread-card-body">
          <div className="eyebrow-row"><span className="category-pill">{t(categoryTranslationKey(thread.category))}</span><span>{thread.time} ago</span></div>
          <h3>{thread.title}</h3>
          <VoteSplit agree={thread.agree} disagree={thread.disagree} compact />
          <div className="card-meta"><span><Icon name="comment" size={15} /> {thread.comments}</span><span className="card-meta-actions"><button className="report-button thread-report-button" onClick={() => setReportOpen(true)}>{t("action.report")}</button><span className="open-thread">{t("card.join")} <Icon name="arrow" size={16} /></span></span></div>
        </div>
      </article>
      <ReportModal open={reportOpen} onClose={() => setReportOpen(false)} targetType="thread" targetId={thread.id} threadId={thread.id} />
    </>
  );
}
