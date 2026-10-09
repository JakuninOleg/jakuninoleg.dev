export type SolutionMeta = {
  id: "catalog" | "shop";
  accent: string;
  stack: string[];
  image: string;
  demoHref?: string;
};

export const solutionsMeta: SolutionMeta[] = [
  {
    id: "catalog",
    accent: "#22d3ee",
    stack: ["OJ CMS", "Next.js", "Payload"],
    image: "/projects/kemz/cms/dashboard.webp",
    demoHref: "/ru/oj-cms",
  },
  {
    id: "shop",
    accent: "#f0b429",
    stack: ["Next.js", "Medusa", "Robokassa", "YooKassa", "Stripe", "Orders"],
    image: "/solutions/shop-site.png",
  },
];
