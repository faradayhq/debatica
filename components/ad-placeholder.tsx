type AdPlaceholderProps = {
  className?: string;
};

export function AdPlaceholder({ className = "" }: AdPlaceholderProps) {
  return (
    <aside className={`ad-placeholder ${className}`.trim()} aria-label="Advertisement">
      <span>Advertisement</span>
    </aside>
  );
}
