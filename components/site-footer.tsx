import Link from "next/link";

const links = [
  { href: "/help", label: "Help" },
  { href: "/about", label: "About" },
  { href: "/terms", label: "Terms" },
  { href: "/privacy", label: "Privacy" },
  { href: "/contact", label: "Contact" },
  { href: "/profile", label: "Guest profile" }
];

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <nav aria-label="Information and policies">{links.map((link) => <Link href={link.href} key={link.href}>{link.label}</Link>)}</nav>
    </footer>
  );
}
