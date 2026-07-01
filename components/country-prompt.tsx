"use client";

import { useEffect, useRef, useState } from "react";
import type { GuestProfile } from "@/lib/data";
import { GUEST_AGE_RANGES, GUEST_PROFILE_KEY, GUEST_PROFILE_PROMPT_SEEN_KEY } from "@/lib/guest-profile";
import { CountryPicker } from "./country-picker";
import { useLanguage } from "./language-provider";

type CountryPromptProps = {
  open: boolean;
  onComplete: (profile?: GuestProfile) => void;
};

export function CountryPrompt({ open, onComplete }: CountryPromptProps) {
  const { t } = useLanguage();
  const [ageRange, setAgeRange] = useState("");
  const [country, setCountry] = useState("");
  const dialogRef = useRef<HTMLDivElement>(null);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    if (!open) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        localStorage.setItem(GUEST_PROFILE_PROMPT_SEEN_KEY, "true");
        onCompleteRef.current();
        return;
      }
      if (event.key !== "Tab" || !dialogRef.current) return;
      const focusable = Array.from(dialogRef.current.querySelectorAll<HTMLElement>("button:not(:disabled), input:not(:disabled), select:not(:disabled)"));
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
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

  function finish(profile?: GuestProfile) {
    localStorage.setItem(GUEST_PROFILE_PROMPT_SEEN_KEY, "true");
    if (profile) localStorage.setItem(GUEST_PROFILE_KEY, JSON.stringify(profile));
    setAgeRange("");
    setCountry("");
    onComplete(profile);
  }

  function save() {
    finish({
      ...(ageRange && { ageRange }),
      ...(country && { country })
    });
  }

  return (
    <div className="modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && finish()}>
      <div ref={dialogRef} className="country-modal" role="dialog" aria-modal="true" aria-labelledby="country-modal-title" aria-describedby="country-modal-description">
        <button className="modal-close" aria-label="Skip optional guest profile" onClick={() => finish()}>×</button>
        <span className="modal-icon" aria-hidden="true">◎</span>
        <h2 id="country-modal-title">Optional guest profile</h2>
        <p id="country-modal-description" className="selection-note">Add context to your comments. Both fields are optional, saved on this device, and shared with comments you post.</p>
        <div className="guest-profile-fields">
          <label className="country-select-label">
            <span>{t("profile.age")}</span>
            <select value={ageRange} onChange={(event) => setAgeRange(event.target.value)} autoFocus>
              <option value="">{t("profile.private")}</option>
              {GUEST_AGE_RANGES.map((range) => <option key={range} value={range}>{range}</option>)}
            </select>
          </label>
          <div className="country-select-label country-picker-field">
            <span>{t("profile.country")}</span>
            <CountryPicker selectedCountry={country} onSelect={setCountry} />
          </div>
        </div>
        <div className="modal-actions">
          <button className="modal-primary" onClick={save}>{t("action.save")}</button>
          <button className="modal-secondary" onClick={() => finish()}>{t("action.skip")}</button>
        </div>
      </div>
    </div>
  );
}
