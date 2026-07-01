"use client";

import Link from "next/link";
import { categoryFilters } from "@/lib/data";
import { categoryTranslationKey } from "@/lib/i18n";
import { useLanguage } from "./language-provider";

export function CategoryGrid({ limit, activeCategory }: { limit?: number; activeCategory?: string }) {
  const { t } = useLanguage();
  return (
    <div className="category-grid">
      {categoryFilters.slice(0, limit).map((filter) => (
        <Link href={activeCategory === filter.slug ? "/categories" : `/categories?category=${encodeURIComponent(filter.slug)}`} className={`category-card ${activeCategory === filter.slug ? "active" : ""}`} aria-current={activeCategory === filter.slug ? "page" : undefined} aria-label={activeCategory === filter.slug ? `Clear ${filter.slug} filter` : `Browse ${filter.slug}`} key={filter.slug}>
          <span className={`category-icon ${filter.color}`}>{filter.icon}</span>
          <span>{t(categoryTranslationKey(filter.categories[0]))}</span>
        </Link>
      ))}
    </div>
  );
}
