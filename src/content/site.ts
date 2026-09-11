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
};

export const projectsMeta: ProjectMeta[] = [
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
    stack: ["Next.js", "Mapbox", "Auth.js", "Neon", "Go-Ai"],
    image: "/projects/tesla-explorer.webp",
    href: "https://tesla-explorer.vercel.app",
    repo: "https://github.com/JakuninOleg/tesla-explorer",
    accent: "#FBBF24",
  },
  {
    id: "go-ai",
    title: "Go-Ai",
    stack: ["Go", "Docker", "Fly.io", "SSE", "OpenAI-compatible"],
    image: "/projects/go-ai.webp",
    repo: "https://github.com/JakuninOleg/Go-Ai",
    accent: "#60A5FA",
  },
  {
    id: "aokemz",
    title: "AO KEMZ",
    stack: ["Nuxt", "Vue", "Contentful", "Tailwind"],
    image: "/projects/aokemz.webp",
    href: "https://www.aokemz.ru",
    accent: "#FB923C",
  },
  {
    id: "lu4-ai",
    title: "Lu4-AI",
    stack: ["Python", "OCR", "Arduino", "HID"],
    image: "/projects/lu4-ai.webp",
    accent: "#C084FC",
  },
];
