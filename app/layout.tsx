import type { Metadata, Viewport } from "next";
import "./globals.css";
import { BottomNav } from "@/components/bottom-nav";
import { GuestIdentityLink } from "@/components/guest-identity-link";
import { LanguageProvider } from "@/components/language-provider";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://debatica.com"),
  title: {
    default: "Debatica — See where public opinion splits",
    template: "%s · Debatica"
  },
  description: "Debatica is an anonymous debate board where people post questions, vote agree or disagree, and see how public opinion divides.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Debatica",
    title: "Debatica — See where public opinion splits",
    description: "Debatica is an anonymous debate board where people post questions, vote agree or disagree, and see how public opinion divides.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Debatica — See where public opinion splits" }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Debatica — See where public opinion splits",
    description: "Debatica is an anonymous debate board where people post questions, vote agree or disagree, and see how public opinion divides.",
    images: ["/opengraph-image"]
  },
  icons: { icon: "/icon.svg" }
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
        <LanguageProvider><div className="app-shell">
          <header className="site-header">
            <a className="brand" href="/" aria-label="Debatica home">
              <span className="brand-mark">D</span>
              <span>debatica</span>
            </a>
            <GuestIdentityLink />
          </header>
          <main>{children}</main>
          <SiteFooter />
          <BottomNav />
        </div></LanguageProvider>
      </body>
    </html>
  );
}
