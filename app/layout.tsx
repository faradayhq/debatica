import type { Metadata, Viewport } from "next";
import "./globals.css";
import { BottomNav } from "@/components/bottom-nav";
import { SiteFooter } from "@/components/site-footer";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Debatica — Pick a side",
  description: "A lightweight place for thoughtful, two-sided debate."
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#111315"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <div className="app-shell">
          <header className="site-header">
            <a className="brand" href="/" aria-label="Debatica home">
              <span className="brand-mark">D</span>
              <span>debatica</span>
            </a>
            <Link className="guest-badge" href="/admin" aria-label="Open guest access">guest mode</Link>
          </header>
          <main>{children}</main>
          <SiteFooter />
          <BottomNav />
        </div>
      </body>
    </html>
  );
}
