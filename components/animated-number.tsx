"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";

const ANIMATION_DURATION_MS = 300;

export function AnimatedNumber({ value, enabled = true, format = String }: { value: number; enabled?: boolean; format?: (value: number) => ReactNode }) {
  const previousValue = useRef(value);
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    const startValue = previousValue.current;
    previousValue.current = value;
    if (!enabled || startValue === value || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplayValue(value);
      return;
    }

    const startedAt = performance.now();
    let frame = 0;
    const update = (now: number) => {
      const progress = Math.min(1, (now - startedAt) / ANIMATION_DURATION_MS);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.round(startValue + (value - startValue) * eased));
      if (progress < 1) frame = requestAnimationFrame(update);
    };
    frame = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frame);
  }, [enabled, value]);

  return <>{format(displayValue)}</>;
}
