"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import Link from "next/link";
import { Icon } from "@/components/icons";
import { EmptyState } from "@/components/empty-state";
import { RecentlyViewedThreads } from "@/components/recently-viewed-threads";
import { ThreadCard } from "@/components/thread-card";
import { categories, mergeSeedThreads, threads, type Thread } from "@/lib/data";
import { categoryTranslationKey } from "@/lib/i18n";
import { useLanguage } from "@/components/language-provider";
import { getSupabaseBrowserClient, isSupabaseConfigured } from "@/lib/supabase/client";
import { fetchThreads } from "@/lib/supabase/data";
import { ThreadTitleText } from "@/components/thread-title-provider";

export default function SearchPage() {
  const { t } = useLanguage();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All topics");
  const [sort, setSort] = useState<"new" | "popular">("new");
  const [availableThreads, setAvailableThreads] = useState<Thread[]>(isSupabaseConfigured() ? [] : threads);
  const [loading, setLoading] = useState(isSupabaseConfigured());
  const [loadError, setLoadError] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const normalizedQuery = query.trim().toLocaleLowerCase();
  const searchTerms = useMemo(() => normalizedQuery.split(/\s+/).filter(Boolean), [normalizedQuery]);

  useEffect(() => {
    const client = getSupabaseBrowserClient();
    if (!client) return;
    let active = true;
    fetchThreads(client)
      .then((items) => { if (active) setAvailableThreads(mergeSeedThreads(items)); })
      .catch(() => {
        if (!active) return;
        setAvailableThreads(threads);
        setLoadError("Could not load live threads. Showing available threads instead.");
      })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  const rankedThreads = useMemo(() => availableThreads.map((thread) => {
    if (!normalizedQuery) return { thread, score: 0 };
    const title = thread.title.toLocaleLowerCase();
    const body = thread.description?.toLocaleLowerCase() ?? "";
    const topic = thread.category.toLocaleLowerCase();
    const matches = searchTerms.every((term) => title.includes(term) || body.includes(term) || topic.includes(term));
    const score = matches ? searchTerms.reduce((total, term) => total + (title.includes(term) ? 3 : 0) + (body.includes(term) ? 2 : 0) + (topic.includes(term) ? 1 : 0), 0) : 0;
    return { thread, score };
  }), [availableThreads, normalizedQuery, searchTerms]);
  const results = useMemo(() => {
    const filteredThreads = rankedThreads
      .filter(({ thread, score }) => (category === "All topics" || thread.category === category) && (!normalizedQuery || score > 0))
      .map(({ thread }) => thread);
    const newestFirst = (left: Thread, right: Thread) => {
      if (left.createdAt && right.createdAt) return Date.parse(right.createdAt) - Date.parse(left.createdAt);
      return availableThreads.indexOf(left) - availableThreads.indexOf(right);
    };

    return filteredThreads.sort((left, right) => {
      if (sort === "new") return newestFirst(left, right);
      return right.votes - left.votes || right.comments - left.comments || newestFirst(left, right);
    });
  }, [availableThreads, category, normalizedQuery, rankedThreads, sort]);
  const suggestions = normalizedQuery
    ? rankedThreads.filter(({ score }) => score > 0).sort((left, right) => right.score - left.score).slice(0, 5).map(({ thread }) => thread)
    : rankedThreads.slice(0, 5).map(({ thread }) => thread);

  function submitSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setQuery((current) => current.trim());
    setSearchFocused(false);
    event.currentTarget.querySelector("input")?.blur();
  }

  return (
    <div className="page inner-page">
      <header className="page-intro"><span className="section-index">EXPLORE</span><h1>Find a debate</h1><p>Search what people are discussing right now.</p></header>
      <div className="search-suggest" onFocus={() => setSearchFocused(true)} onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setSearchFocused(false); }}>
        <form className="search-box" role="search" onSubmit={submitSearch}><Icon name="search" size={20} /><input role="combobox" aria-label="Search threads" aria-autocomplete="list" aria-controls="thread-suggestions" aria-expanded={searchFocused && suggestions.length > 0} autoComplete="off" autoFocus type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search threads…" />{query && <button className="search-clear" type="button" aria-label="Clear search" onClick={() => setQuery("")}>×</button>}<button className="search-submit" type="submit">Search</button></form>
        {searchFocused && suggestions.length > 0 && <div className="search-suggestion-list" id="thread-suggestions" role="listbox" aria-label={normalizedQuery ? "Matching debates" : "Popular or recent debates"}>
          {suggestions.map((thread) => <Link href={`/thread/${thread.id}`} className="search-suggestion-item" role="option" aria-selected="false" key={thread.id}><span><b><ThreadTitleText threadId={thread.id} originalTitle={thread.title} /></b><small>{t(categoryTranslationKey(thread.category))}</small></span><Icon name="chevron" size={17} /></Link>)}
        </div>}
      </div>
      {loading && <p className="data-status" role="status">Loading threads…</p>}
      {loadError && <p className="data-status error" role="alert">{loadError}</p>}
      {!normalizedQuery && <div className="suggestions"><p>Try searching</p><div>{["remote work", "AI tools", "college degree", "cashless society"].map((item) => <button key={item} onClick={() => setQuery(item)}>↗ {item}</button>)}</div></div>}
      <RecentlyViewedThreads />
      <div className="filters"><select aria-label="Filter by category" value={category} onChange={(e) => setCategory(e.target.value)}><option>All topics</option>{categories.map((item) => <option key={item} value={item}>{t(categoryTranslationKey(item))}</option>)}</select></div>
      <div className="results-heading"><h2>{normalizedQuery ? `Results for “${query.trim()}”` : "Latest threads"}</h2><span>{results.length} {results.length === 1 ? "thread" : "threads"}</span></div>
      <div className="sort-tabs search-sort" role="group" aria-label="Sort search results">
        <button type="button" aria-pressed={sort === "new"} className={sort === "new" ? "active" : ""} onClick={() => setSort("new")}>New</button>
        <button type="button" aria-pressed={sort === "popular"} className={sort === "popular" ? "active" : ""} onClick={() => setSort("popular")}>Popular</button>
      </div>
      <div className="thread-list">{results.map((thread) => <ThreadCard thread={thread} key={thread.id} />)}</div>
      {!loading && !results.length && <EmptyState code="?" title="No threads found" message="Try a broader search or another category." compact />}
    </div>
  );
}
