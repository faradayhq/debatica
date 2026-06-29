"use client";

import { useEffect, useRef, useState } from "react";

export function CountryPrompt({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [choosing, setChoosing] = useState(false);
  const [country, setCountry] = useState("");
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab" || !dialogRef.current) return;
      const focusable = Array.from(dialogRef.current.querySelectorAll<HTMLElement>("button:not(:disabled), select:not(:disabled)"));
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
  }, [open, onClose]);

  if (!open) return null;

  function close() {
    setChoosing(false);
    setCountry("");
    onClose();
  }

  return (
    <div className="modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && close()}>
      <div ref={dialogRef} className="country-modal" role="dialog" aria-modal="true" aria-labelledby="country-modal-title" aria-describedby="country-modal-description">
        <button className="modal-close" aria-label="Close country prompt" onClick={close}>×</button>
        {!choosing ? (
          <>
            <span className="modal-icon" aria-hidden="true">◎</span>
            <h2 id="country-modal-title">Help improve global perspectives</h2>
            <div id="country-modal-description" className="modal-copy">
              <p>Which country are you joining from?</p>
              <p>Your selection is only used for anonymous aggregate statistics.<br />Individual locations are never shown.</p>
              <p className="modal-preview-note">Preview only — no selection is saved or sent.</p>
            </div>
            <div className="modal-actions">
              <button className="modal-primary" autoFocus onClick={() => setChoosing(true)}>Choose country</button>
              <button className="modal-secondary" onClick={close}>Skip for now</button>
            </div>
          </>
        ) : (
          <>
            <span className="modal-icon" aria-hidden="true">⌖</span>
            <h2 id="country-modal-title">Choose your country</h2>
            <p id="country-modal-description" className="selection-note">This mock selection stays in this screen only and is not saved or sent anywhere.</p>
            <label className="country-select-label">
              <span>Country</span>
              <select value={country} onChange={(event) => setCountry(event.target.value)} autoFocus>
                <option value="">Select a country</option>
                <option>Japan</option>
                <option>United States</option>
                <option>United Kingdom</option>
                <option>India</option>
              </select>
            </label>
            <div className="modal-actions">
              <button className="modal-primary" disabled={!country} onClick={close}>Confirm selection</button>
              <button className="modal-secondary" onClick={() => setChoosing(false)}>Back</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
