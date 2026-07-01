"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "./icons";
import { useLanguage } from "./language-provider";

const items = [
  { href: "/", labelKey: "nav.home" as const, icon: "home" as const },
  { href: "/search", labelKey: "nav.search" as const, icon: "search" as const },
  { href: "/create", labelKey: "nav.create" as const, icon: "plus" as const, primary: true },
  { href: "/categories", labelKey: "nav.categories" as const, icon: "grid" as const },
  { href: "/profile", labelKey: "nav.guest" as const, icon: "user" as const }
];

export function BottomNav() {
  const path = usePathname();
  const { t } = useLanguage();
  return (
    <nav className="bottom-nav" aria-label="Primary navigation">
      {items.map((item) => {
        const active = item.href === "/"
          ? path === "/"
          : path.startsWith(item.href);

        const className = `${active ? "active" : ""} ${item.primary ? "create-nav" : ""}`;
        const content = (
          <>
            <span className="nav-icon"><Icon name={item.icon} size={item.primary ? 23 : 21} /></span>
            <span>{t(item.labelKey)}</span>
          </>
        );

        if (item.href === "/") {
          return (
            <a href="/" className={className} aria-current={active ? "page" : undefined} key={item.href}>
              {content}
            </a>
          );
        }

        return (
          <Link href={item.href} className={className} aria-current={active ? "page" : undefined} key={item.href}>
            {content}
          </Link>
        );
      })}
    </nav>
  );
}
