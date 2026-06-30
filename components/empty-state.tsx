import type { ReactNode } from "react";
import Link from "next/link";

export function EmptyState({
  code = "–",
  title,
  message,
  page = false,
  compact = false,
  children
}: {
  code?: string;
  title: string;
  message: string;
  page?: boolean;
  compact?: boolean;
  children?: ReactNode;
}) {
  const className = page ? "not-found-state" : `empty-state${compact ? " compact" : ""}`;

  return (
    <section className={className}>
      <span className={page ? "not-found-code" : undefined} aria-hidden="true">{code}</span>
      {page ? <h1>{title}</h1> : <h3>{title}</h3>}
      <p>{message}</p>
      <div className="empty-state-actions">
        <Link className="primary-button" href="/create">Create Thread</Link>
        {children}
      </div>
    </section>
  );
}
