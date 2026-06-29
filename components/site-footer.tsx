import Link from "next/link";

const links = [
  { href: "/about", label: "About" },
  { href: "/terms", label: "Terms of Service" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/contact", label: "Contact" }
];

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-brand"><span className="brand-mark">D</span><span><b>debatica</b><small>Pick a side. Stay curious.</small></span></div>
      <nav aria-label="Information and policies">{links.map((link) => <Link href={link.href} key={link.href}>{link.label}</Link>)}</nav>
      <p className="translation-hint">Language tip: use your browser&apos;s translate feature to read Debatica in your language.</p>
      <p>© 2026 Debatica · MVP prototype</p>
    </footer>
  );
}
