import Link from "next/link";
import { CategoryGrid } from "@/components/category-grid";
import { ThreadCard, VoteSplit } from "@/components/thread-card";
import { Icon } from "@/components/icons";
import { threads } from "@/lib/data";

export default function Home() {
  const featured = threads[0];
  return (
    <div className="page home-page">
      <section className="welcome">
        <p className="kicker">A place to disagree thoughtfully</p>
        <h1>What do you <em>really</em> think?</h1>
        <p>Pick a side. Say why. Stay curious.</p>
      </section>

      <section className="today-card">
        <div className="today-top"><span>Today&apos;s debate</span><span className="live-dot">Live</span></div>
        <div className="today-content">
          <span className="category-pill light">{featured.category}</span>
          <h2>{featured.title}</h2>
          <p>{featured.description}</p>
          <VoteSplit agree={featured.agree} disagree={featured.disagree} />
          <Link href={`/thread/${featured.id}`} className="light-button">Enter the debate <Icon name="arrow" size={18} /></Link>
        </div>
      </section>

      <section className="content-section">
        <div className="section-heading"><div><span className="section-index">01</span><h2>Hot Debates</h2></div><Link href="/search">See all <Icon name="chevron" size={15} /></Link></div>
        <div className="thread-list">{threads.slice(1, 4).map((thread, i) => <ThreadCard thread={thread} rank={i + 1} key={thread.id} />)}</div>
      </section>

      <section className="content-section tinted-section">
        <div className="section-heading"><div><span className="section-index">02</span><h2>Most Active</h2></div><span className="section-note">gaining momentum ↗</span></div>
        <div className="horizontal-threads">{threads.slice(3, 6).map((thread) => <ThreadCard thread={thread} key={thread.id} />)}</div>
      </section>

      <section className="content-section">
        <div className="section-heading"><div><span className="section-index">03</span><h2>Closest Split</h2></div><span className="split-badge">≈ 50 / 50</span></div>
        <ThreadCard thread={threads[5]} />
      </section>

      <section className="content-section">
        <div className="section-heading"><div><span className="section-index">04</span><h2>Latest Debates</h2></div><Link href="/search">See all <Icon name="chevron" size={15} /></Link></div>
        <div className="thread-list">{threads.slice().reverse().slice(0, 3).map((thread) => <ThreadCard thread={thread} key={thread.id} />)}</div>
      </section>

      <section className="content-section categories-preview">
        <div className="section-heading"><div><span className="section-index">05</span><h2>Categories</h2></div><Link href="/categories">Browse all <Icon name="chevron" size={15} /></Link></div>
        <CategoryGrid limit={6} />
      </section>
    </div>
  );
}
