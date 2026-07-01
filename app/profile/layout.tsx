import type { Metadata } from "next";

export const metadata: Metadata = { title: "Guest Profile", description: "Manage the optional context attached to your Debatica comments." };

export default function ProfileLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
