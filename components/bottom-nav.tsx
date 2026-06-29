"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "./icons";

const items = [
  { href: "/", label: "Home", icon: "home" as const },
  { href: "/search", label: "Search", icon: "search" as const },
  { href: "/create", label: "Create", icon: "plus" as const, primary: true },
  { href: "/categories", label: "Categories", icon: "grid" as const },
  { href: "/admin", label: "Guest", icon: "user" as const }
];

export function BottomNav() {
  const path = usePathname();
  return (
    <nav className="bottom-nav" aria-label="Primary navigation">
      {items.map((item) => {
        const active = item.href === "/" ? path === "/" || path.startsWith("/thread/") : path.startsWith(item.href);
        return (
          <Link href={item.href} className={`${active ? "active" : ""} ${item.primary ? "create-nav" : ""}`} aria-current={active ? "page" : undefined} key={item.href}>
            <span className="nav-icon"><Icon name={item.icon} size={item.primary ? 23 : 21} /></span>
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
