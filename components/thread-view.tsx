"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { Thread } from "@/lib/data";
import { commentsByThread, type Comment, type GuestProfile } from "@/lib/data";
import { VoteSplit } from "./thread-card";
import { AdPlaceholder } from "./ad-placeholder";
import { Icon } from "./icons";
import { CountryPerspective } from "./country-perspective";
import { CountryPrompt } from "./country-prompt";
import { ReportModal } from "./report-modal";
import { EmptyState } from "./empty-state";
import { GUEST_PROFILE_PROMPT_SEEN_KEY, getOrCreateGuestIdentity, readGuestProfile } from "@/lib/guest-profile";
import { addRecentlyViewedThread } from "@/lib/recently-viewed";
import { categoryTranslationKey } from "@/lib/i18n";
import { useLanguage } from "./language-provider";
import { getCountryByValue } from "@/lib/countries";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { createComment, createReport, fetchComments, fetchGuestVote, fetchVoteCounts, saveGuestVote, writeErrorMessage } from "@/lib/supabase/data";
import { BrowserTranslatedContent } from "./browser-translated-content";
import { formatCompactCount } from "@/lib/format-count";
import { AnimatedNumber } from "./animated-number";

const COMMENT_VOTES_KEY = "debaticaCommentVotes";
type CommentVote = "positive" | "negative";
type CommentVotes = Record<string, CommentVote>;

function readCommentVotes(): CommentVotes {
  const stored = localStorage.getItem(COMMENT_VOTES_KEY);
  if (!stored) return {};
  try {
    const parsed = JSON.parse(stored) as Record<string, unknown>;
    return Object.fromEntries(
      Object.entries(parsed).filter((entry): entry is [string, CommentVote] => entry[1] === "positive" || entry[1] === "negative")
    );
  } catch {
    return {};
  }
}

export function ThreadView({ thread }: { thread: Thread }) {
  const { t } = useLanguage();
  const initialComments = commentsByThread[thread.id] ?? [];
  const persistedThread = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(thread.id);
  const [vote, setVote] = useState<"agree" | "disagree" | null>(null);
  const [voteCounts, setVoteCounts] = useState(() => ({
    agree: Math.round(thread.votes * thread.agree / 100),
    disagree: Math.max(0, thread.votes - Math.round(thread.votes * thread.agree / 100))
  }));
  const [voteSaving, setVoteSaving] = useState(false);
  const [sort, setSort] = useState<"best" | "new" | "old">("old");
  const [comment, setComment] = useState("");
  const [replyTo, setReplyTo] = useState<number | null>(null);
  const [loadedComments, setLoadedComments] = useState<Comment[] | null>(null);
  const [addedComments, setAddedComments] = useState<Comment[]>([]);
  const [commentsLoading, setCommentsLoading] = useState(persistedThread);
  const [postingComment, setPostingComment] = useState(false);
  const [dataError, setDataError] = useState("");
  const [countryPromptOpen, setCountryPromptOpen] = useState(false);
  const [commentVotes, setCommentVotes] = useState<CommentVotes>({});
  const [reportedCommentIds, setReportedCommentIds] = useState<Set<number>>(() => new Set());
  const [reportOpen, setReportOpen] = useState(false);
  const pendingComment = useRef<{ text: string; replyTo: number | null } | null>(null);
  const composerRef = useRef<HTMLDivElement>(null);
  const commentInputRef = useRef<HTMLTextAreaElement>(null);
  const baseComments = persistedThread ? (loadedComments ?? []) : initialComments;
  const allComments = [...baseComments, ...addedComments];
  const displayed = sort === "best"
    ? allComments
      .map((item, recency) => ({
        item,
        recency,
        rating: item.positiveVotes
          + (commentVotes[`comment-id-${item.id}`] === "positive" ? 1 : 0)
          - item.negativeVotes
          - (commentVotes[`comment-id-${item.id}`] === "negative" ? 1 : 0)
      }))
      .sort((a, b) => b.rating - a.rating || a.recency - b.recency)
      .map(({ item }) => item)
    : sort === "new"
      ? [...allComments].reverse()
      : allComments;
  const commentHasUrl = /https?:\/\/|www\./i.test(comment);
  const commentCanPost = Boolean(comment.trim()) && !commentHasUrl;

  useEffect(() => {
    setCommentVotes(readCommentVotes());
  }, []);

  useEffect(() => {
    if (!persistedThread) return;
    const client = getSupabaseBrowserClient();
    if (!client) {
      setCommentsLoading(false);
      setDataError("Live data is unavailable. Please check the Supabase configuration.");
      return;
    }
    let active = true;
    const identity = getOrCreateGuestIdentity();

    Promise.all([
      fetchComments(client, thread.id),
      fetchGuestVote(client, thread.id, identity.id),
      fetchVoteCounts(client, thread.id)
    ]).then(([comments, guestVote, counts]) => {
      if (!active) return;
      setLoadedComments(comments);
      setVote(guestVote);
      setVoteCounts({ agree: counts.agree, disagree: counts.disagree });
    }).catch(() => {
      if (active) setDataError("Could not load the latest discussion. Please try again.");
    }).finally(() => {
      if (active) setCommentsLoading(false);
    });

    async function refreshVotes() {
      try {
        const counts = await fetchVoteCounts(client!, thread.id);
        if (active) setVoteCounts({ agree: counts.agree, disagree: counts.disagree });
      } catch {
        // The optimistic vote remains visible if a realtime refresh fails.
      }
    }

    const channel = client.channel(`thread-votes-${thread.id}`)
      .on("postgres_changes", { event: "*", schema: "public", table: "thread_votes", filter: `thread_id=eq.${thread.id}` }, refreshVotes)
      .subscribe();

    return () => {
      active = false;
      void client.removeChannel(channel);
    };
  }, [persistedThread, thread.id]);

  useEffect(() => {
    addRecentlyViewedThread(thread.id);
  }, [thread.id]);

  useEffect(() => {
    const viewport = window.visualViewport;
    if (!viewport) return;

    function updateKeyboardOffset() {
      const keyboardOffset = Math.max(0, window.innerHeight - viewport!.height - viewport!.offsetTop);
      const focusedBottom = keyboardOffset > 100
        ? `${keyboardOffset + 8}px`
        : "calc(78px + env(safe-area-inset-bottom))";
      composerRef.current?.style.setProperty("--composer-focus-bottom", focusedBottom);
    }

    updateKeyboardOffset();
    viewport.addEventListener("resize", updateKeyboardOffset);
    viewport.addEventListener("scroll", updateKeyboardOffset);
    window.addEventListener("resize", updateKeyboardOffset);
    return () => {
      viewport.removeEventListener("resize", updateKeyboardOffset);
      viewport.removeEventListener("scroll", updateKeyboardOffset);
      window.removeEventListener("resize", updateKeyboardOffset);
    };
  }, []);

  function hasSeenProfilePrompt() {
    return localStorage.getItem(GUEST_PROFILE_PROMPT_SEEN_KEY) === "true";
  }

  function showProfilePromptOnce() {
    if (countryPromptOpen || hasSeenProfilePrompt()) return;
    setCountryPromptOpen(true);
  }

  async function castVote(side: "agree" | "disagree") {
    if (voteSaving) return;
    const previousVote = vote;
    if (previousVote === side) return;
    setDataError("");
    setVote(side);
    setVoteCounts((current) => ({
      agree: current.agree + (side === "agree" ? 1 : 0) - (previousVote === "agree" ? 1 : 0),
      disagree: current.disagree + (side === "disagree" ? 1 : 0) - (previousVote === "disagree" ? 1 : 0)
    }));
    showProfilePromptOnce();
    if (!persistedThread) return;
    const client = getSupabaseBrowserClient();
    if (!client) {
      setVote(previousVote);
      setVoteCounts((current) => ({
        agree: current.agree - (side === "agree" ? 1 : 0) + (previousVote === "agree" ? 1 : 0),
        disagree: current.disagree - (side === "disagree" ? 1 : 0) + (previousVote === "disagree" ? 1 : 0)
      }));
      setDataError("Could not save your vote. Supabase is not configured.");
      return;
    }
    setVoteSaving(true);
    try {
      await saveGuestVote(client, thread.id, getOrCreateGuestIdentity().id, side);
    } catch {
      setVote(previousVote);
      setVoteCounts((current) => ({
        agree: current.agree - (side === "agree" ? 1 : 0) + (previousVote === "agree" ? 1 : 0),
        disagree: current.disagree - (side === "disagree" ? 1 : 0) + (previousVote === "disagree" ? 1 : 0)
      }));
      setDataError("Could not save your vote. Please try again.");
    } finally {
      setVoteSaving(false);
    }
  }

  async function addComment(text: string, commentReplyTo: number | null, profile = readGuestProfile()) {
    const identity = getOrCreateGuestIdentity();
    setDataError("");
    if (persistedThread) {
      const client = getSupabaseBrowserClient();
      if (!client) {
        setDataError("Could not post your comment. Supabase is not configured.");
        return;
      }
      setPostingComment(true);
      try {
        const created = await createComment(client, {
          threadId: thread.id,
          guestId: identity.id,
          authorName: identity.displayName,
          side: vote ?? "neutral",
          body: text,
          ...(commentReplyTo && { replyTo: commentReplyTo }),
          profile
        });
        setAddedComments((current) => [...current, created]);
      } catch (error) {
        setDataError(writeErrorMessage(error, "Could not post your comment. Please try again."));
        return;
      } finally {
        setPostingComment(false);
      }
    } else {
      setAddedComments((current) => {
        const nextNumber = Math.max(0, ...initialComments.map((item) => item.number ?? 0), ...current.map((item) => item.number ?? 0)) + 1;
        return [...current, { id: Date.now(), number: nextNumber, author: identity.displayName, side: vote ?? "neutral", text, score: 0, positiveVotes: 0, negativeVotes: 0, time: "now", replyTo: commentReplyTo ?? undefined, profile }];
      });
    }
    setComment("");
    setReplyTo(null);
  }

  function startReply(commentNumber: number) {
    setReplyTo(commentNumber);
    commentInputRef.current?.focus();
  }

  function voteOnComment(commentId: number, choice: CommentVote) {
    const key = `comment-id-${commentId}`;
    const storedVotes = readCommentVotes();
    if (commentVotes[key] || storedVotes[key]) {
      setCommentVotes({ ...commentVotes, ...storedVotes });
      return;
    }
    const nextVotes = { ...storedVotes, ...commentVotes, [key]: choice };
    setCommentVotes(nextVotes);
    localStorage.setItem(COMMENT_VOTES_KEY, JSON.stringify(nextVotes));
  }

  async function reportComment(commentId: number) {
    const client = getSupabaseBrowserClient();
    if (!client) {
      setDataError("Could not send this report. Supabase is not configured.");
      return;
    }
    try {
      await createReport(client, { targetType: "comment", targetId: String(commentId), threadId: thread.id, commentId, guestId: getOrCreateGuestIdentity().id });
      setReportedCommentIds((current) => new Set(current).add(commentId));
    } catch (error) {
      setDataError(writeErrorMessage(error, "Could not send this report. Please try again."));
    }
  }

  function submitComment() {
    const text = comment.trim();
    if (!text || commentHasUrl || postingComment) return;
    if (!hasSeenProfilePrompt()) {
      pendingComment.current = { text, replyTo };
      showProfilePromptOnce();
      return;
    }
    addComment(text, replyTo);
  }

  function completeProfilePrompt(profile?: GuestProfile) {
    setCountryPromptOpen(false);
    if (pendingComment.current) {
      addComment(pendingComment.current.text, pendingComment.current.replyTo, profile);
      pendingComment.current = null;
    }
  }

  function shareOnX() {
    const text = `${thread.title}\n${window.location.href}\n\nWhat do you think?`;
    window.open(`https://x.com/intent/post?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
  }

  return (
    <div className="page thread-page">
      <Link href="/" className="back-link">{t("thread.back")}</Link>
      <article className="thread-hero">
        <div className="eyebrow-row"><span className="category-pill">{t(categoryTranslationKey(thread.category))}</span><span className="thread-hero-meta"><span>{t("thread.started", { time: thread.time })}</span><button className="report-button" onClick={() => setReportOpen(true)}>{t("action.report")}</button></span></div>
        <BrowserTranslatedContent segments={[
          { as: "h1", text: thread.title },
          ...(thread.description ? [{ as: "p" as const, className: "thread-description", text: thread.description }] : [])
        ]} />
        <VoteSplit agree={voteCounts.agree} disagree={voteCounts.disagree} animate />
        <div className="thread-stats" aria-live="polite">
          <span title={`${voteCounts.agree + voteCounts.disagree} votes`}><Icon name="vote" size={15} /> <AnimatedNumber value={voteCounts.agree + voteCounts.disagree} format={(count) => t("card.votes", { count: formatCompactCount(count) })} /></span>
          <span title={`${allComments.length} comments`}><Icon name="comment" size={15} /> {t("thread.comments", { count: formatCompactCount(allComments.length) })}</span>
          <button type="button" className="share-x-button" onClick={shareOnX}>{t("action.shareX")}</button>
        </div>
        <p className="vote-prompt">{t("thread.votePrompt")}</p>
        <div className="vote-actions">
          <button disabled={voteSaving} aria-pressed={vote === "agree"} className={`agree-button ${vote === "agree" ? "selected" : ""}`} onClick={() => castVote("agree")}><span>✓</span> {t("thread.agree")}</button>
          <button disabled={voteSaving} aria-pressed={vote === "disagree"} className={`disagree-button ${vote === "disagree" ? "selected" : ""}`} onClick={() => castVote("disagree")}><span>×</span> {t("thread.disagree")}</button>
        </div>
        {vote && <p className="vote-confirmation">{t("thread.previewVote")}</p>}
        {dataError && <p className="data-status error thread-data-status" role="alert">{dataError}</p>}
      </article>

      {thread.votes > 0 && <CountryPerspective thread={thread} />}
      <AdPlaceholder className="thread-ad-placeholder" />

      <section className="comments-section">
        <div className="comments-title"><div><span className="section-index">{t("thread.discussion")}</span><h2>{t("thread.comments", { count: allComments.length })}</h2></div><div className="sort-tabs" role="group" aria-label="Sort comments"><button aria-pressed={sort === "best"} className={sort === "best" ? "active" : ""} onClick={() => setSort("best")}>{t("sort.best")}</button><button aria-pressed={sort === "new"} className={sort === "new" ? "active" : ""} onClick={() => setSort("new")}>{t("sort.new")}</button><button aria-pressed={sort === "old"} className={sort === "old" ? "active" : ""} onClick={() => setSort("old")}>{t("sort.old")}</button></div></div>
        {commentsLoading && <p className="data-status" role="status">Loading comments…</p>}
        {!commentsLoading && !allComments.length && <EmptyState title="No comments yet" message="Start the conversation, or create a new thread." compact />}
        <div className="comment-list">
          {displayed.map((item) => {
            const timeLabel = item.time === "now" ? t("thread.now") : `${item.time} ago`;
            const profileCountry = getCountryByValue(item.profile?.country);
            const profileLabel = [profileCountry && `${profileCountry.flag} ${profileCountry.name}`, item.profile?.ageRange].filter(Boolean).join(" · ");
            const commentVote = commentVotes[`comment-id-${item.id}`];
            const isReported = reportedCommentIds.has(item.id);
            return <article id={`comment-${item.id}`} className={`comment-card ${item.side}`} key={item.id}>
              <div className="comment-head"><div className="avatar">{item.author.slice(0, 2).toUpperCase()}</div><div><div className="comment-author-line"><b>{item.author}</b>{item.number && <span className="comment-number">#{item.number}</span>}</div><span>{timeLabel} · <i>{item.side === "neutral" ? t("thread.noVote") : item.side}</i>{profileLabel && <> · <span className="comment-profile">{profileLabel}</span></>}</span></div><button className="report-button" disabled={isReported} onClick={() => reportComment(item.id)}>{t(isReported ? "action.reported" : "action.report")}</button></div>
              {item.replyTo && <div className="reply-anchor">↪ Reply to <b>#{item.replyTo}</b></div>}
              <BrowserTranslatedContent segments={[{ text: item.text }]} buttonClassName="comment-translation-button" />
              <div className="comment-actions">
                <span className="comment-score">{t("thread.points", { count: item.score })}</span>
                {item.number && <button type="button" className="comment-reply-button" onClick={() => startReply(item.number!)}>{t("action.reply")}</button>}
                <div className="comment-votes" role="group" aria-label="Rate this comment">
                  <button type="button" className={`comment-vote positive ${commentVote === "positive" ? "selected" : ""}`} aria-label={`Support comment by ${item.author}`} aria-pressed={commentVote === "positive"} disabled={Boolean(commentVote)} onClick={() => voteOnComment(item.id, "positive")}><span aria-hidden="true">+</span> {item.positiveVotes + (commentVote === "positive" ? 1 : 0)}</button>
                  <button type="button" className={`comment-vote negative ${commentVote === "negative" ? "selected" : ""}`} aria-label={`Oppose comment by ${item.author}`} aria-pressed={commentVote === "negative"} disabled={Boolean(commentVote)} onClick={() => voteOnComment(item.id, "negative")}><span aria-hidden="true">−</span> {item.negativeVotes + (commentVote === "negative" ? 1 : 0)}</button>
                </div>
              </div>
            </article>;
          })}
        </div>
      </section>
      <div className="comment-composer" ref={composerRef}>
        {replyTo && <div className="composer-reply-context"><span>{t("thread.replying", { number: replyTo })}</span><button type="button" onClick={() => setReplyTo(null)}>{t("action.cancel")}</button></div>}
        <div className="composer-input-row">
          <Icon name="comment" size={18} />
          <textarea ref={commentInputRef} rows={1} aria-label="Comment" aria-invalid={commentHasUrl} value={comment} onChange={(e) => setComment(e.target.value)} placeholder={t("thread.write")} maxLength={800} />
          <button type="button" disabled={!commentCanPost || postingComment} onClick={submitComment}>{postingComment ? "…" : t("action.post")}</button>
        </div>
        <div className="composer-note"><span>{t("thread.composerNote")}</span><span>{comment.length}/800</span></div>
        {commentHasUrl && <p className="form-error" role="alert">URLs aren&apos;t allowed in comments.</p>}
      </div>
      <CountryPrompt open={countryPromptOpen} onComplete={completeProfilePrompt} />
      <ReportModal open={reportOpen} onClose={() => setReportOpen(false)} targetType="thread" targetId={thread.id} threadId={thread.id} />
    </div>
  );
}
