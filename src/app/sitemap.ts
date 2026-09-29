import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { projectsMeta } from "@/content/site";
import { serviceRoutes } from "@/content/service-routes";
import { blogPath, firstPostDate, privacyBlogPath, privacyPostDate } from "@/content/blog";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://jakuninoleg.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", "/services", "/calculator", "/oj-cms", "/work", "/blog", "/legal/privacy", "/legal/consent", "/legal/cookies", ...serviceRoutes.map((slug) => `/services/${slug}`), ...projectsMeta.map((project) => `/work/${project.id}`)];
  const pages = paths.flatMap((path) => (path.startsWith("/legal/") ? ["ru"] : routing.locales).map((locale) => ({
    url: `${siteUrl}/${locale}${path}`,
    // A build is not a content update. Keep lastModified only where we know the date.
    ...(path === "/blog" ? { lastModified: firstPostDate } : {}),
    alternates: {
      languages: Object.fromEntries(
        (path.startsWith("/legal/") ? ["ru"] : routing.locales).map((alt) => [alt, `${siteUrl}/${alt}${path}`]),
      ),
    },
  })));
  const articles = routing.locales.map((locale) => ({
    url: `${siteUrl}${blogPath(locale)}`,
    lastModified: firstPostDate,
    alternates: {
      languages: Object.fromEntries(routing.locales.map((alt) => [alt, `${siteUrl}${blogPath(alt)}`])),
    },
  }));
  const privacyArticles = routing.locales.map((locale) => ({
    url: `${siteUrl}${privacyBlogPath(locale)}`,
    lastModified: privacyPostDate,
    alternates: { languages: Object.fromEntries(routing.locales.map((alt) => [alt, `${siteUrl}${privacyBlogPath(alt)}`])) },
  }));
  return [...pages, ...articles, ...privacyArticles];
}
