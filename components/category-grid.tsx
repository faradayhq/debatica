"use client";

import Link from "next/link";
import { categories, categoryMeta } from "@/lib/data";
import { categoryTranslationKey } from "@/lib/i18n";
import { useLanguage } from "./language-provider";

export function CategoryGrid({ limit, activeCategory }: { limit?: number; activeCategory?: string }) {
  const { t } = useLanguage();
  return (
    <div className="category-grid">
      {categories.slice(0, limit).map((category) => (
        <Link href={activeCategory === category ? "/categories" : `/categories?category=${encodeURIComponent(category)}`} className={`category-card ${activeCategory === category ? "active" : ""}`} aria-current={activeCategory === category ? "page" : undefined} aria-label={activeCategory === category ? `Clear ${category} filter` : `Browse ${category}`} key={category}>
          <span className={`category-icon ${categoryMeta[category].color}`}>{categoryMeta[category].icon}</span>
          <span>{t(categoryTranslationKey(category))}</span>
        </Link>
      ))}
    </div>
  );
}
