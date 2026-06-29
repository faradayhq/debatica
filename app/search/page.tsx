"use client";

import { useState } from "react";
import { Icon } from "@/components/icons";
import { ThreadCard } from "@/components/thread-card";
import { categories, threads } from "@/lib/data";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All topics");
  const results = threads.filter((t) => (category === "All topics" || t.category === category) && t.title.toLowerCase().includes(query.toLowerCase()));
  return (
    <div className="page inner-page">
      <header className="page-intro"><span className="section-index">EXPLORE</span><h1>Find a debate</h1><p>Search what people are discussing right now.</p></header>
      <div className="search-box"><Icon name="search" size={20} /><input aria-label="Search threads" autoFocus type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search threads…" />{query && <button aria-label="Clear search" onClick={() => setQuery("")}>×</button>}</div>
      {!query && <div className="suggestions"><p>Try searching</p><div>{["remote work", "AI tools", "college degree", "cashless society"].map((item) => <button key={item} onClick={() => setQuery(item)}>↗ {item}</button>)}</div></div>}
      <div className="filters"><select aria-label="Filter by category" value={category} onChange={(e) => setCategory(e.target.value)}><option>All topics</option>{categories.map((item) => <option key={item}>{item}</option>)}</select></div>
      <div className="results-heading"><h2>{query ? `Results for “${query}”` : "Browse debates"}</h2><span>{results.length} threads</span></div>
      <div className="thread-list">{results.map((thread) => <ThreadCard thread={thread} key={thread.id} />)}</div>
      {!results.length && <div className="empty-state"><span>?</span><h3>No debates found</h3><p>Try a broader search or another category.</p></div>}
    </div>
  );
}
