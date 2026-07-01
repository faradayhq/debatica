import type { MetadataRoute } from "next";

const siteUrl = "https://debatica.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/about", "/categories", "/contact", "/create", "/privacy", "/search", "/terms"];

  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1 : 0.7
  }));
}
