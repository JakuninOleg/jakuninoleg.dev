export const site = {
  name: "Jakunin Oleg",
  shortName: "Jakunin",
  role: "Frontend / Fullstack",
  email: "oleg.kemz@gmail.com",
  telegram: "https://t.me/Sainttss",
  telegramHandle: "@Sainttss",
  github: "https://github.com/JakuninOleg",
  location: "Remote",
} as const;

export type ProjectMeta = {
  id: string;
  title: string;
  stack: string[];
  image: string;
  href?: string;
  repo?: string;
  accent: string;
  /** How the cover sits in the 16:10 frame */
  imageFit?: "cover" | "contain";
};

export const projectsMeta: ProjectMeta[] = [
  {
    id: "oj-cms",
    title: "OJ CMS",
    stack: ["Payload", "CMS", "Media", "Preview"],
    image: "/projects/oj-cms-wide.webp",
    href: "https://oj-cms.vercel.app/admin",
    accent: "#5EEAD4",
  },
  {
    id: "okhana",
    title: "Okhana",
    stack: ["Next.js", "Clerk", "Drizzle", "Postgres", "RAG"],
    image: "/projects/okhana.webp",
    href: "https://okhanahome.com",
    repo: "https://github.com/JakuninOleg/okhana",
    accent: "#5EEAD4",
  },
  {
    id: "tesla-explorer",
    title: "Tesla Explorer",
    stack: ["Next.js", "Mapbox", "Auth.js", "Neon"],
    image: "/projects/tesla-explorer.webp",
    href: "https://tesla-explorer.vercel.app",
    repo: "https://github.com/JakuninOleg/tesla-explorer",
    accent: "#FBBF24",
  },
  {
    id: "aokemz",
    title: "AO KEMZ",
    stack: ["Nuxt", "Vue", "Contentful", "Tailwind"],
    image: "/projects/aokemz-v2.webp",
    href: "https://aokemz.ru/",
    accent: "#78CCF0",
    imageFit: "contain",
  },
];
