import Link from "next/link";

export default function NotFound() {
  return (
    <div className="page inner-page not-found-state">
      <span className="not-found-code">404</span>
      <h1>This debate isn&apos;t here.</h1>
      <p>The link may be outdated, or the thread may have been removed.</p>
      <div><Link className="primary-button" href="/">Back to Home</Link><Link className="secondary-link-button" href="/search">Search debates</Link></div>
    </div>
  );
}
