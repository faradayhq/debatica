import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Debatica",
    short_name: "Debatica",
    description: "See where public opinion splits.",
    start_url: "/",
    display: "standalone",
    background_color: "#0F3D2E",
    theme_color: "#0F3D2E",
    icons: [
      { src: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { src: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" }
    ]
  };
}
