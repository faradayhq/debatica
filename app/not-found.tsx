import Link from "next/link";
import { EmptyState } from "@/components/empty-state";

export default function NotFound() {
  return (
    <div className="page inner-page">
      <EmptyState code="404" title="Page not found" message="The link may be outdated, or the thread may have been removed." page>
        <Link className="secondary-link-button" href="/">Back to Home</Link>
      </EmptyState>
    </div>
  );
}
