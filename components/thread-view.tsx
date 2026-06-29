"use client";

import { useState } from "react";
import Link from "next/link";
import type { Thread } from "@/lib/data";
import { comments as initialComments, type Comment } from "@/lib/data";
import { VoteSplit } from "./thread-card";
import { Icon } from "./icons";
import { CountryPerspective } from "./country-perspective";
import { CountryPrompt } from "./country-prompt";

export function ThreadView({ thread }: { thread: Thread }) {
  const [vote, setVote] = useState<"agree" | "disagree" | null>(null);
  const [sort, setSort] = useState<"newest" | "top">("newest");
  const [comment, setComment] = useState("");
  const [addedComments, setAddedComments] = useState<Comment[]>([]);
  const [countryPromptOpen, setCountryPromptOpen] = useState(false);
  const [countryPromptShown, setCountryPromptShown] = useState(false);
  const allComments = [...addedComments, ...initialComments];
  const displayed = sort === "top" ? [...allComments].sort((a, b) => b.score - a.score) : allComments;
  const commentHasUrl = /https?:\/\/|www\./i.test(comment);
  const commentCanPost = Boolean(comment.trim()) && !commentHasUrl;

  function showCountryPromptOnce() {
    if (countryPromptShown) return;
    setCountryPromptShown(true);
    setCountryPromptOpen(true);
  }

  function castVote(side: "agree" | "disagree") {
    setVote(side);
    showCountryPromptOnce();
  }

  function submitComment() {
    const text = comment.trim();
    if (!text || commentHasUrl) return;
    setAddedComments([{ id: Date.now(), author: "guest_visitor", side: vote ?? "neutral", text, score: 0, time: "now" }, ...addedComments]);
    setComment("");
    showCountryPromptOnce();
  }

  return (
    <div className="page thread-page">
      <Link href="/" className="back-link">← Back to debates</Link>
      <article className="thread-hero">
        <div className="eyebrow-row"><span className="category-pill">{thread.category}</span><span>Started {thread.time} ago</span></div>
        <h1>{thread.title}</h1>
        {thread.description && <p className="thread-description">{thread.description}</p>}
        <VoteSplit agree={vote === "agree" ? thread.agree + 1 : thread.agree} disagree={vote === "disagree" ? thread.disagree + 1 : thread.disagree} />
        <p className="vote-prompt">Where do you stand?</p>
        <div className="vote-actions">
          <button aria-pressed={vote === "agree"} className={`agree-button ${vote === "agree" ? "selected" : ""}`} onClick={() => castVote("agree")}><span>✓</span> Agree</button>
          <button aria-pressed={vote === "disagree"} className={`disagree-button ${vote === "disagree" ? "selected" : ""}`} onClick={() => castVote("disagree")}><span>×</span> Disagree</button>
        </div>
        {vote && <p className="vote-confirmation">Preview vote applied. It isn&apos;t permanently saved.</p>}
      </article>

      <CountryPerspective thread={thread} />

      <section className="comments-section">
        <div className="comments-title"><div><span className="section-index">DISCUSSION</span><h2>{thread.comments + addedComments.length} comments</h2></div><div className="sort-tabs"><button aria-pressed={sort === "newest"} className={sort === "newest" ? "active" : ""} onClick={() => setSort("newest")}>Newest</button><button aria-pressed={sort === "top"} className={sort === "top" ? "active" : ""} onClick={() => setSort("top")}>Top</button></div></div>
        <div className="comment-list">
          {displayed.map((item) => {
            const timeLabel = item.time === "now" ? "now" : `${item.time} ago`;
            return <article id={`comment-${item.id}`} className={`comment-card ${item.side}`} key={item.id}>
              <div className="comment-head"><div className="avatar">{item.author.slice(0, 2).toUpperCase()}</div><div><b>{item.author}</b><span>{timeLabel} · <i>{item.side === "neutral" ? "no vote" : item.side}</i></span></div></div>
              {item.replyTo && <div className="reply-anchor">↳ Replying to <b>@{item.replyTo}</b> · “The commute is the clearest cost…”</div>}
              <p>{item.text}</p>
              <div className="comment-actions"><span className="comment-score">{item.score} points</span></div>
            </article>;
          })}
        </div>
        <div className="comment-composer">
          <div className="composer-status"><span>Commenting as <b>guest_visitor</b></span><span className={`side-dot ${vote ?? "neutral"}`}>{vote ?? "No vote"}</span></div>
          <div className="input-wrap"><textarea aria-label="Comment" aria-invalid={commentHasUrl} value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Add to the conversation…" maxLength={800} /><button disabled={!commentCanPost} onClick={submitComment} aria-label="Post comment"><Icon name="send" size={19} /></button></div>
          <div className="composer-note"><span>Preview only · Not saved · No URLs</span><span>{comment.length}/800</span></div>
          {commentHasUrl && <p className="form-error" role="alert">URLs aren&apos;t allowed in comments.</p>}
        </div>
      </section>
      <CountryPrompt open={countryPromptOpen} onClose={() => setCountryPromptOpen(false)} />
    </div>
  );
}
