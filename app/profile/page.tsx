"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { GUEST_AGE_RANGES, GUEST_PROFILE_KEY, GUEST_PROFILE_PROMPT_SEEN_KEY, getOrCreateGuestIdentity, readGuestProfile } from "@/lib/guest-profile";
import { SUPPORTED_LANGUAGES, type Locale } from "@/lib/i18n";
import { useLanguage } from "@/components/language-provider";
import { CountryPicker } from "@/components/country-picker";
import { getCountryCode } from "@/lib/countries";

export default function GuestProfilePage() {
  const { locale, setLocale, t } = useLanguage();
  const [ageRange, setAgeRange] = useState("");
  const [country, setCountry] = useState("");
  const [guestId, setGuestId] = useState("Guest");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const profile = readGuestProfile();
    setGuestId(getOrCreateGuestIdentity().displayName);
    setAgeRange(profile.ageRange ?? "");
    setCountry(getCountryCode(profile.country) ?? "");
  }, []);

  function saveProfile() {
    localStorage.setItem(GUEST_PROFILE_KEY, JSON.stringify({
      ...(ageRange && { ageRange }),
      ...(country && { country })
    }));
    localStorage.setItem(GUEST_PROFILE_PROMPT_SEEN_KEY, "true");
    setSaved(true);
  }

  function updateAgeRange(value: string) {
    setAgeRange(value);
    setSaved(false);
  }

  function updateCountry(value: string) {
    setCountry(value);
    setSaved(false);
  }

  return (
    <div className="page inner-page guest-profile-page">
      <header className="page-intro">
        <span className="section-index">{t("profile.kicker")}</span>
        <h1>{t("profile.title")}</h1>
        <p>{t("profile.description")}</p>
      </header>

      <section className="profile-card" aria-labelledby="profile-details-title">
        <div className="profile-card-heading">
          <div><span className="profile-avatar">G</span><div><span>{t("profile.guestId")}</span><strong>{guestId}</strong></div></div>
          <span className="profile-local-badge">{t("profile.local")}</span>
        </div>
        <h2 id="profile-details-title">{t("profile.details")}</h2>
        <div className="profile-fields">
          <label>
            <span>{t("language.label")}</span>
            <select value={locale} onChange={(event) => setLocale(event.target.value as Locale)}>
              {SUPPORTED_LANGUAGES.map((language) => <option key={language.locale} value={language.locale}>{language.label}</option>)}
            </select>
          </label>
          <label>
            <span>{t("profile.age")}</span>
            <select value={ageRange} onChange={(event) => updateAgeRange(event.target.value)}>
              <option value="">{t("profile.private")}</option>
              {GUEST_AGE_RANGES.map((range) => <option key={range} value={range}>{range}</option>)}
            </select>
          </label>
          <div className="profile-country-field">
            <span>{t("profile.country")}</span>
            <CountryPicker selectedCountry={country} onSelect={updateCountry} />
          </div>
        </div>
        <div className="profile-save-row">
          <button className="primary-button" onClick={saveProfile}>{t("action.save")}</button>
          <span className={`profile-saved ${saved ? "visible" : ""}`} role="status" aria-live="polite">{saved ? t("profile.saved") : ""}</span>
        </div>
      </section>

      <Link href="/premium" className="premium-coming-soon" aria-label="Learn about Debatica Premium">
        <span className="access-icon premium">P</span>
        <div><span>PREMIUM</span><h2>Premium Coming Soon</h2><p>More profile and participation features are planned for a future release.</p></div>
        <span className="premium-card-arrow" aria-hidden="true">→</span>
      </Link>
    </div>
  );
}
