type IconProps = { name: "home" | "search" | "plus" | "grid" | "user" | "comment" | "vote" | "arrow" | "chevron" | "send"; size?: number };

export function Icon({ name, size = 20 }: IconProps) {
  const paths = {
    home: <><path d="m3 10 9-7 9 7"/><path d="M5 9v11h14V9"/><path d="M9 20v-6h6v6"/></>,
    search: <><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></>,
    plus: <><path d="M12 5v14M5 12h14"/></>,
    grid: <><rect x="4" y="4" width="6" height="6" rx="1"/><rect x="14" y="4" width="6" height="6" rx="1"/><rect x="4" y="14" width="6" height="6" rx="1"/><rect x="14" y="14" width="6" height="6" rx="1"/></>,
    user: <><circle cx="12" cy="8" r="4"/><path d="M4 21c.7-4.2 3.4-6 8-6s7.3 1.8 8 6"/></>,
    comment: <path d="M5 5h14v11H9l-4 4V5Z"/>,
    vote: <><path d="M5 5h14v14H5z"/><path d="m8 12 2.5 2.5L16 9"/></>,
    arrow: <><path d="M5 12h14"/><path d="m14 7 5 5-5 5"/></>,
    chevron: <path d="m9 18 6-6-6-6"/>,
    send: <><path d="m4 4 17 8-17 8 3-8-3-8Z"/><path d="M7 12h14"/></>
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}
