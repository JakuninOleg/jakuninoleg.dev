export type SolutionMeta = {
  id: "catalog" | "shop";
  accent: string;
  stack: string[];
  image: string;
};

export const solutionsMeta: SolutionMeta[] = [
  {
    id: "catalog",
    accent: "#22d3ee",
    stack: ["Next.js", "Payload CMS", "Postgres", "Media", "Preview"],
    image: "/solutions/catalog-site.png",
  },
  {
    id: "shop",
    accent: "#f0b429",
    stack: ["Next.js", "Medusa", "Robokassa", "YooKassa", "Stripe", "Orders"],
    image: "/solutions/shop-site.png",
  },
];
