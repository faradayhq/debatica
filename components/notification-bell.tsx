"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Icon } from "./icons";
import { getOrCreateGuestIdentity } from "@/lib/guest-profile";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import {
  fetchReplyNotifications,
  markAllReplyNotificationsRead,
  markReplyNotificationRead,
  type ReplyNotification
} from "@/lib/supabase/data";

function notificationTime(createdAt: string) {
  const created = new Date(createdAt);
  const elapsed = Math.max(0, Date.now() - created.getTime());
  const minutes = Math.floor(elapsed / 60_000);
  if (minutes < 1) return "now";
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h`;
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  if (created.toDateString() === yesterday.toDateString()) return "Yesterday";
  return created.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

export function NotificationBell() {
  const router = useRouter();
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState<ReplyNotification[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const unreadCount = notifications.filter((item) => !item.readAt).length;

  const loadNotifications = useCallback(async (showLoading = false) => {
    const client = getSupabaseBrowserClient();
    if (!client) return;
    if (showLoading) setLoading(true);
    try {
      setNotifications(await fetchReplyNotifications(client, getOrCreateGuestIdentity().id));
      setLoadError(false);
    } catch {
      setLoadError(true);
    } finally {
      if (showLoading) setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadNotifications();
    const client = getSupabaseBrowserClient();
    const channel = client?.channel("reply-notification-refresh")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "comments" }, () => void loadNotifications())
      .subscribe();
    const interval = window.setInterval(() => void loadNotifications(), 30_000);
    const refresh = () => { if (document.visibilityState === "visible") void loadNotifications(); };
    document.addEventListener("visibilitychange", refresh);
    return () => {
      window.clearInterval(interval);
      document.removeEventListener("visibilitychange", refresh);
      if (client && channel) void client.removeChannel(channel);
    };
  }, [loadNotifications]);

  useEffect(() => {
    if (!open) return;
    window.setTimeout(() => panelRef.current?.focus(), 0);
    void loadNotifications(true);
    const closeOnOutsideClick = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("mousedown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
      triggerRef.current?.focus();
    };
  }, [open, loadNotifications]);

  async function openNotification(notification: ReplyNotification) {
    setNotifications((current) => current.map((item) => item.id === notification.id
      ? { ...item, readAt: item.readAt ?? new Date().toISOString() }
      : item));
    setOpen(false);
    const client = getSupabaseBrowserClient();
    if (client && !notification.readAt) {
      try {
        await markReplyNotificationRead(client, getOrCreateGuestIdentity().id, notification.id);
      } catch {
        void loadNotifications();
      }
    }
    router.push(`/thread/${notification.threadId}#comment-${notification.replyId}`);
  }

  async function markAllRead() {
    const previous = notifications;
    const readAt = new Date().toISOString();
    setNotifications((current) => current.map((item) => ({ ...item, readAt: item.readAt ?? readAt })));
    const client = getSupabaseBrowserClient();
    if (!client) return;
    try {
      await markAllReplyNotificationsRead(client, getOrCreateGuestIdentity().id);
    } catch {
      setNotifications(previous);
    }
  }

  return (
    <div className="notification-root" ref={rootRef}>
      <button
        type="button"
        ref={triggerRef}
        className="notification-trigger"
        aria-label={unreadCount ? `Notifications, ${unreadCount} unread` : "Notifications"}
        aria-expanded={open}
        aria-controls="notification-panel"
        onClick={() => setOpen((current) => !current)}
      >
        <Icon name="bell" size={20} />
        {unreadCount > 0 && <span className="notification-badge">{unreadCount > 9 ? "9+" : unreadCount}</span>}
      </button>
      {open && <>
        <button className="notification-backdrop" type="button" aria-label="Close notifications" onClick={() => setOpen(false)} />
        <section ref={panelRef} className="notification-panel" id="notification-panel" role="dialog" aria-label="Reply notifications" tabIndex={-1}>
          <div className="notification-heading">
            <div><span className="notification-grabber" aria-hidden="true" /><h2>Notifications</h2></div>
            {unreadCount > 0 && <button type="button" onClick={markAllRead}>Mark all as read</button>}
          </div>
          <div className="notification-list">
            {loading && notifications.length === 0 ? <p className="notification-empty">Loading…</p> : null}
            {!loading && loadError ? <p className="notification-empty">Notifications are temporarily unavailable.</p> : null}
            {!loading && !loadError && notifications.length === 0 ? <p className="notification-empty">No new notifications.</p> : null}
            {notifications.map((notification) => (
              <button
                type="button"
                className={`notification-item ${notification.readAt ? "" : "unread"}`}
                onClick={() => openNotification(notification)}
                key={notification.id}
              >
                <span className="notification-dot" aria-hidden="true" />
                <span className="notification-copy">
                  <strong>Someone replied to your comment</strong>
                  <span className="notification-thread">{notification.threadTitle}</span>
                  <span className="notification-preview">{notification.replyPreview}</span>
                </span>
                <time dateTime={notification.createdAt}>{notificationTime(notification.createdAt)}</time>
              </button>
            ))}
          </div>
        </section>
      </>}
    </div>
  );
}
