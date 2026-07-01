import type { Metadata, Viewport } from "next";
import "./globals.css";
import { BottomNav } from "@/components/bottom-nav";
import { LanguageProvider } from "@/components/language-provider";
import { SiteFooter } from "@/components/site-footer";
import { ThreadTitleProvider } from "@/components/thread-title-provider";
import { NotificationBell } from "@/components/notification-bell";

export const metadata: Metadata = {
  metadataBase: new URL("https://debatica.com"),
  manifest: "/manifest.webmanifest",
  title: {
    default: "Debatica — See where public opinion splits",
    template: "%s · Debatica"
  },
  description: "Join the anonymous debate platform.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Debatica",
    title: "Debatica — See where public opinion splits",
    description: "Join the anonymous debate platform.",
    images: [{ url: "/opengraph-image.png", width: 1200, height: 630, alt: "Debatica — See where public opinion splits" }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Debatica — See where public opinion splits",
    description: "Join the anonymous debate platform.",
    images: ["/opengraph-image.png"]
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "32x32" }
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }]
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0F3D2E"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <LanguageProvider><ThreadTitleProvider><div className="app-shell">
          <header className="site-header">
            <a className="brand" href="/" aria-label="Debatica home">
              <span className="brand-mark">D</span>
              <span>debatica</span>
            </a>
            <NotificationBell />
          </header>
          <main>{children}</main>
          <SiteFooter />
          <BottomNav />
        </div></ThreadTitleProvider></LanguageProvider>
      </body>
    </html>
  );
}
