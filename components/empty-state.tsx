import type { ReactNode } from "react";
import Link from "next/link";

export function EmptyState({
  code = "–",
  title,
  message,
  page = false,
  compact = false,
  showCreate = true,
  children
}: {
  code?: string;
  title: string;
  message: string;
  page?: boolean;
  compact?: boolean;
  showCreate?: boolean;
  children?: ReactNode;
}) {
  const className = page ? "not-found-state" : `empty-state${compact ? " compact" : ""}`;

  return (
    <section className={className}>
      <span className={page ? "not-found-code" : undefined} aria-hidden="true">{code}</span>
      {page ? <h1>{title}</h1> : <h3>{title}</h3>}
      <p>{message}</p>
      {((!page && showCreate) || children) && <div className="empty-state-actions">
        {!page && showCreate && <Link className="primary-button" href="/create">Create thread</Link>}
        {children}
      </div>}
    </section>
  );
}
