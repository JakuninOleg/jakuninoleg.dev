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
    id: "vne-shablona",
    title: "ВНЕ ШАБЛОНА",
    stack: ["HTML", "CSS", "JavaScript", "S3"],
    image: "/projects/vne-shablona/hero-wide-2k-v8.webp",
    href: "https://vneshablona.ru/",
    accent: "#F45D50",
    imageFit: "contain",
  },
  {
    id: "oj-cms",
    title: "OJ CMS",
    stack: ["Next.js", "Editor UX", "Media", "Preview"],
    image: "/projects/oj-cms/dashboard.webp",
    href: "https://oj-cms.vercel.app/admin",
    accent: "#5EEAD4",
  },
  {
    id: "okhana",
    title: "Okhana",
    stack: ["Next.js", "Clerk", "Drizzle", "Postgres", "AI"],
    image: "/projects/okhana.webp",
    href: "https://okhanahome.com",
    repo: "https://github.com/JakuninOleg/okhana",
    accent: "#5EEAD4",
  },
  {
    id: "tesla-explorer",
    title: "Tesla Explorer",
    stack: ["Next.js", "Mapbox", "Auth.js", "Neon"],
    image: "/projects/tesla-explorer/road.webp",
    href: "https://tesla-explorer.vercel.app",
    repo: "https://github.com/JakuninOleg/tesla-explorer",
    accent: "#FBBF24",
  },
  {
    id: "aokemz",
    title: "AO KEMZ",
    stack: ["Next.js", "React", "Payload", "OJ CMS", "TypeScript"],
    image: "/projects/aokemz-v2.webp",
    href: "https://aokemz.ru/",
    accent: "#78CCF0",
    imageFit: "contain",
  },
];
