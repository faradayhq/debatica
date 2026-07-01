export function formatCompactCount(value: number) {
  const count = Math.max(0, Math.floor(value));
  if (count < 1_000) return String(count);

  const units = [
    { threshold: 1_000_000_000, suffix: "b" },
    { threshold: 1_000_000, suffix: "m" },
    { threshold: 1_000, suffix: "k" }
  ] as const;
  const unit = units.find(({ threshold }) => count >= threshold)!;
  const compact = Math.round((count / unit.threshold) * 10) / 10;
  return `${compact}${unit.suffix}`;
}
