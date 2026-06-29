import { CategoryGrid } from "@/components/category-grid";
import { ThreadCard } from "@/components/thread-card";
import { threads } from "@/lib/data";

export default async function CategoriesPage({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
  const { category } = await searchParams;
  const filtered = category ? threads.filter((item) => item.category === category) : threads;
  return (
    <div className="page inner-page">
      <header className="page-intro"><span className="section-index">BROWSE</span><h1>Categories</h1><p>Find the corner of the internet you want to argue about.</p></header>
      <CategoryGrid activeCategory={category} />
      <div className="results-heading category-results"><h2>{category || "Across Debatica"}</h2><span>{filtered.length} threads</span></div>
      <div className="thread-list">{filtered.map((thread) => <ThreadCard thread={thread} key={thread.id} />)}</div>
      {!filtered.length && <div className="empty-state compact"><span>–</span><h3>No debates here yet</h3><p>Choose another category to keep browsing.</p></div>}
    </div>
  );
}
