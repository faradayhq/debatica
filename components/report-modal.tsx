"use client";

import { useEffect, useRef, useState } from "react";
import { X_MODERATOR_DM_URL } from "@/lib/moderation";
import { useLanguage } from "./language-provider";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { createReport, type ReportRow, writeErrorMessage } from "@/lib/supabase/data";
import { getOrCreateGuestIdentity } from "@/lib/guest-profile";

type ReportTargetProps = {
  targetType?: ReportRow["target_type"];
  targetId?: string;
  threadId?: string;
};

export function ReportModal({ open, onClose, targetType = "general", targetId, threadId }: { open: boolean; onClose: () => void } & ReportTargetProps) {
  const { t } = useLanguage();
  const dialogRef = useRef<HTMLDivElement>(null);
  const onCloseRef = useRef(onClose);
  const [reportStatus, setReportStatus] = useState("");

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!open) return;
    setReportStatus("");
    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogRef.current?.querySelector<HTMLElement>("a, button:not(:disabled)")?.focus();
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onCloseRef.current();
        return;
      }
      if (event.key !== "Tab" || !dialogRef.current) return;
      const focusable = Array.from(dialogRef.current.querySelectorAll<HTMLElement>("a, button:not(:disabled)"));
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last) return;
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus();
    };
  }, [open]);

  if (!open) return null;

  async function saveReport() {
    const client = getSupabaseBrowserClient();
    if (!client) {
      setReportStatus("Report storage is unavailable. You can still contact the Faraday team on X.");
      return;
    }
    try {
      await createReport(client, { targetType, targetId, threadId, guestId: getOrCreateGuestIdentity().id });
      setReportStatus("Report saved for review.");
    } catch (error) {
      setReportStatus(writeErrorMessage(error, "Could not save the report. You can still contact the Faraday team on X."));
    }
  }

  return (
    <div className="modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <div ref={dialogRef} className="country-modal report-modal" role="dialog" aria-modal="true" aria-labelledby="report-modal-title" aria-describedby="report-modal-description">
        <button className="modal-close" aria-label={t("report.close")} onClick={onClose}>×</button>
        <span className="modal-icon report-modal-icon" aria-hidden="true">!</span>
        <h2 id="report-modal-title">{t("report.title")}</h2>
        <p id="report-modal-description" className="selection-note">{t("report.description")}</p>
        <div className="modal-actions report-modal-actions">
          <a className="modal-primary report-link" href={X_MODERATOR_DM_URL} target="_blank" rel="noreferrer" onClick={() => void saveReport()}>{t("report.message")}</a>
          <button className="modal-secondary" onClick={onClose}>{t("action.cancel")}</button>
        </div>
        {reportStatus && <p className="data-status report-status" role="status">{reportStatus}</p>}
      </div>
    </div>
  );
}

export function ReportButton({ className = "report-button", ...target }: { className?: string } & ReportTargetProps) {
  const [open, setOpen] = useState(false);
  const { t } = useLanguage();

  return (
    <>
      <button className={className} onClick={() => setOpen(true)}>{t("action.report")}</button>
      <ReportModal open={open} onClose={() => setOpen(false)} {...target} />
    </>
  );
}
