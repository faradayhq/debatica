"use client";

import { EmptyState } from "@/components/empty-state";

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="page inner-page">
      <EmptyState code="!" title="Something went wrong" message="An unexpected error occurred. Please try again." page>
        <button className="secondary-link-button" type="button" onClick={reset}>Try again</button>
      </EmptyState>
    </div>
  );
}
