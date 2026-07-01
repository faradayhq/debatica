import type { Metadata } from "next";

export const metadata: Metadata = { title: "Create a Debate", description: "Start an anonymous debate on Debatica." };

export default function CreateLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
