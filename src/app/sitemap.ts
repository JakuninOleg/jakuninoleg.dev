import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { projectsMeta } from "@/content/site";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://jakuninoleg.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const paths = ["", "/work", ...projectsMeta.map((project) => `/work/${project.id}`)];
  return paths.flatMap((path) => routing.locales.map((locale) => ({
    url: `${siteUrl}/${locale}${path}`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : path === "/work" ? 0.8 : 0.7,
    alternates: {
      languages: Object.fromEntries(
        routing.locales.map((alt) => [alt, `${siteUrl}/${alt}${path}`]),
      ),
    },
  })));
}
