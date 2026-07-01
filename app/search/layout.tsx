import type { Metadata } from "next";

export const metadata: Metadata = { title: "Search", description: "Find debates and explore discussions on Debatica." };

export default function SearchLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
