export const serviceRoutes = [
  "landing-pages",
  "product-catalogues",
  "online-stores",
  "web-applications",
  "design-redesign",
  "seo-positioning",
  "cms",
  "ai-solutions",
] as const;

export type ServiceRoute = (typeof serviceRoutes)[number];
