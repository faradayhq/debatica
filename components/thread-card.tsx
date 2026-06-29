import Link from "next/link";
import type { Thread } from "@/lib/data";
import { Icon } from "./icons";

export function VoteSplit({ agree, disagree, compact = false }: { agree: number; disagree: number; compact?: boolean }) {
  const total = agree + disagree;
  const agreePercent = total ? Math.round((agree / total) * 100) : 50;
  const disagreePercent = 100 - agreePercent;
  const leader = agreePercent === disagreePercent ? "even" : agreePercent > disagreePercent ? "agree" : "disagree";
  return (
    <div className={`vote-split ${compact ? "compact" : ""} leader-${leader}`}>
      <div className="vote-labels">
        <span className={leader === "agree" ? "leading" : ""}><b>{agreePercent}%</b> Agree</span>
        <span className={leader === "disagree" ? "leading" : ""}><b>{disagreePercent}%</b> Disagree</span>
      </div>
      <div className="vote-track" role="img" aria-label={`${agreePercent}% agree, ${disagreePercent}% disagree`}><span className="agree-bar" style={{ width: `${agreePercent}%` }} /><span className="disagree-bar" style={{ width: `${disagreePercent}%` }} /></div>
    </div>
  );
}

export function ThreadCard({ thread, rank }: { thread: Thread; rank?: number }) {
  return (
    <Link href={`/thread/${thread.id}`} className="thread-card">
      {rank && <span className="rank">{String(rank).padStart(2, "0")}</span>}
      <div className="thread-card-body">
        <div className="eyebrow-row"><span className="category-pill">{thread.category}</span><span>{thread.time} ago</span></div>
        <h3>{thread.title}</h3>
        <VoteSplit agree={thread.agree} disagree={thread.disagree} compact />
        <div className="card-meta"><span><Icon name="comment" size={15} /> {thread.comments}</span><span className="open-thread">Join debate <Icon name="arrow" size={16} /></span></div>
      </div>
    </Link>
  );
}
