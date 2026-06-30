"use client";

import { useMemo, useState } from "react";
import { ALL_COUNTRIES, POPULAR_COUNTRIES, getCountryByValue } from "@/lib/countries";

type CountryPickerProps = {
  selectedCountry?: string;
  onSelect: (countryCode: string) => void;
};

export function CountryPicker({ selectedCountry, onSelect }: CountryPickerProps) {
  const selected = getCountryByValue(selectedCountry);
  const [showAll, setShowAll] = useState(Boolean(selected && !POPULAR_COUNTRIES.some((item) => item.code === selected.code)));
  const [query, setQuery] = useState("");
  const filteredCountries = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return ALL_COUNTRIES;
    return ALL_COUNTRIES.filter((item) =>
      item.name.toLowerCase().includes(normalizedQuery) || item.code.toLowerCase().includes(normalizedQuery)
    );
  }, [query]);

  function selectCountry(code: string) {
    onSelect(code);
    setQuery("");
  }

  return (
    <div className="country-picker">
      {selected && (
        <div className="country-picker-current" aria-live="polite">
          <span>Selected</span>
          <strong>{selected.flag} {selected.name}</strong>
          <button type="button" onClick={() => onSelect("")} aria-label="Clear selected country">Clear</button>
        </div>
      )}

      <div className="country-picker-popular" aria-label="Popular countries">
        {POPULAR_COUNTRIES.map((item) => (
          <button
            type="button"
            key={item.code}
            className={selected?.code === item.code ? "selected" : ""}
            aria-pressed={selected?.code === item.code}
            onClick={() => selectCountry(item.code)}
          >
            <span aria-hidden="true">{item.flag}</span> {item.name}
          </button>
        ))}
      </div>

      <button
        type="button"
        className="country-picker-toggle"
        aria-expanded={showAll}
        onClick={() => setShowAll((current) => !current)}
      >
        Other country / search <span aria-hidden="true">{showAll ? "−" : "+"}</span>
      </button>

      {showAll && (
        <div className="country-picker-search">
          <label>
            <span className="visually-hidden">Search by country name or code</span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search country or code"
              autoComplete="off"
            />
          </label>
          <div className="country-picker-list" role="listbox" aria-label="All countries">
            {filteredCountries.map((item) => (
              <button
                type="button"
                role="option"
                aria-selected={selected?.code === item.code}
                className={selected?.code === item.code ? "selected" : ""}
                key={item.code}
                onClick={() => selectCountry(item.code)}
              >
                <span><span aria-hidden="true">{item.flag}</span> {item.name}</span>
                <small>{item.code}</small>
              </button>
            ))}
            {!filteredCountries.length && <p>No countries found.</p>}
          </div>
        </div>
      )}
    </div>
  );
}
