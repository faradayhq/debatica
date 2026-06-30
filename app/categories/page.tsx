import { CategoryGrid } from "@/components/category-grid";
import { EmptyState } from "@/components/empty-state";
import { ThreadCard } from "@/components/thread-card";
import { threads } from "@/lib/data";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { fetchThreads } from "@/lib/supabase/data";

export default async function CategoriesPage({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
  const { category } = await searchParams;
  let availableThreads = threads;
  let loadError = "";
  const client = getSupabaseServerClient();
  if (client) {
    try {
      availableThreads = await fetchThreads(client);
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
      <div className="results-heading category-results"><h2>{category || "Across Debatica"}</h2><span>{filtered.length} threads</span></div>
      <div className="thread-list">{filtered.map((thread) => <ThreadCard thread={thread} key={thread.id} />)}</div>
      {!filtered.length && <EmptyState title="No threads here yet" message="Be the first to start a debate in this category." compact />}
    </div>
  );
}
