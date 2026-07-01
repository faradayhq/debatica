import { CategoryGrid } from "@/components/category-grid";
import { EmptyState } from "@/components/empty-state";
import { ThreadCard } from "@/components/thread-card";
import { categories, threads, type Category } from "@/lib/data";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { fetchThreads } from "@/lib/supabase/data";

export const metadata: Metadata = { title: "Categories", description: "Browse Debatica discussions by topic." };

export default async function CategoriesPage({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
  const { category: requestedCategory } = await searchParams;
  const category = categories.includes(requestedCategory as Category) ? requestedCategory as Category : undefined;
  let availableThreads = threads;
  let loadError = "";
  const client = getSupabaseServerClient();
  if (client) {
    try {
      const liveThreads = await fetchThreads(client);
      availableThreads = liveThreads.length ? liveThreads : threads;
    } catch {
      loadError = "Could not load live threads. Showing available threads instead.";
    }
  }
  const filtered = category ? availableThreads.filter((item) => item.category === category) : availableThreads;
  return (
    <div className="page inner-page">
      <header className="page-intro"><span className="section-index">BROWSE</span><h1>Categories</h1><p>Find the corner of the internet you want to argue about.</p></header>
      <CategoryGrid activeCategory={category} />
      {loadError && <p className="data-status error" role="alert">{loadError}</p>}
      <div className="results-heading category-results"><h2>{category || "Across Debatica"}</h2><span>{filtered.length} {filtered.length === 1 ? "thread" : "threads"}</span></div>
      <div className="thread-list">{filtered.map((thread) => <ThreadCard thread={thread} key={thread.id} />)}</div>
      {!filtered.length && <EmptyState title="No threads here yet" message="Be the first to start a debate in this category." compact />}
    </div>
  );
}
import type { Metadata } from "next";
