import fs from "node:fs";

const content = `export const site = {
  name: "Oleg Jakunin",
  shortName: "Oleg",
  role: "Frontend / Fullstack",
  email: "oleg.kemz@gmail.com",
  github: "https://github.com/JakuninOleg",
  location: "Remote",
} as const;

export const hero = {
  eyebrow: "Сайты · веб-приложения · AI",
  headline: "Собираю рабочие веб-продукты под задачу клиента.",
  lead: "От лендинга и кабинета до AI-шлюза и автоматизации. Беру интерфейс, логику и запуск — без театра вокруг «идеального процесса».",
  primaryCta: { label: "Написать", href: "#contact" },
  secondaryCta: { label: "Кейсы", href: "#work" },
} as const;

export const focus = [
  "Сначала сценарий пользователя, потом стек",
  "Рабочая версия раньше идеального макета",
  "Довожу до продакшена, а не до демо",
] as const;

export type Project = {
  id: string;
  title: string;
  tag: string;
  year: string;
  summary: string;
  result: string;
  stack: string[];
  image: string;
  href?: string;
  repo?: string;
  accent: string;
};

export const projects: Project[] = [
  {
    id: "okhana",
    title: "Okhana",
    tag: "AI · семейный продукт",
    year: "2025–26",
    summary:
      "Семейный хаб с поиском по памяти, ролями и приватностью. AI отвечает по данным семьи, а не по общему чату.",
    result: "Live: okhanahome.com — Next.js, Clerk, Postgres, RAG.",
    stack: ["Next.js", "Clerk", "Drizzle", "Postgres", "AI"],
    image: "/projects/okhana.png",
    href: "https://okhanahome.com",
    repo: "https://github.com/JakuninOleg/okhana",
    accent: "#5EEAD4",
  },
  {
    id: "tesla-explorer",
    title: "Tesla Explorer",
    tag: "карты · маршруты",
    year: "2026",
    summary:
      "Кабинет для поездок по США: дом/работа, зарядка, Mapbox и план маршрута через свой AI-gateway.",
    result: "Полный цикл: Auth.js, Neon, Mapbox, Go-Ai.",
    stack: ["Next.js", "Mapbox", "Auth.js", "Neon", "Go-Ai"],
    image: "/projects/tesla-explorer.png",
    repo: "https://github.com/JakuninOleg/tesla-explorer",
    accent: "#FBBF24",
  },
  {
    id: "go-ai",
    title: "Go-Ai",
    tag: "backend · LLM gateway",
    year: "2026",
    summary:
      "OpenAI-совместимый шлюз на Go: секреты провайдеров за бэкендом, алиасы моделей, SSE-стрим, Fly.io.",
    result: "Backend для Tesla Explorer и других приложений.",
    stack: ["Go", "Docker", "Fly.io", "Gemini", "OpenRouter"],
    image: "/projects/go-ai.png",
    repo: "https://github.com/JakuninOleg/Go-Ai",
    accent: "#60A5FA",
  },
  {
    id: "aokemz",
    title: "АО «КЭМЗ»",
    tag: "корпоративный сайт",
    year: "продакшен",
    summary:
      "Сайт завода: каталог, новости, Contentful CMS, формы и PWA. Nuxt в продакшене у реального заказчика.",
    result: "Прод: aokemz.ru",
    stack: ["Nuxt", "Vue", "Contentful", "Tailwind"],
    image: "/projects/aokemz.png",
    href: "https://www.aokemz.ru",
    accent: "#FB923C",
  },
  {
    id: "lu4-ai",
    title: "Sigma / Lu4-AI",
    tag: "desktop · OCR · HID",
    year: "сейчас",
    summary:
      "Ассистент по экрану игры: OCR HUD, hunt-цикл, Arduino Leonardo как клавиатура/мышь. Python-ядро и продукт Sigma.",
    result: "Поставка .exe + конфиг под железо.",
    stack: ["Python", "OCR", "Arduino", "CustomTkinter"],
    image: "/projects/sigma.png",
    href: "https://www.sigmabrowser.com",
    accent: "#C084FC",
  },
];

export const services = [
  {
    title: "Сайты и лендинги",
    text: "Страница под конкретную задачу: оффер, адаптив, формы, аналитика.",
  },
  {
    title: "Веб-приложения",
    text: "Кабинеты, роли, платежи, интеграции. То, чем пользуются каждый день.",
  },
  {
    title: "AI в продукте",
    text: "Чат, RAG, gateway, стриминг. Модель внутри сценария, а не виджет сбоку.",
  },
  {
    title: "Backend и API",
    text: "Go и Node: авторизация, БД, прокси к провайдерам, Docker, деплой.",
  },
  {
    title: "MVP за короткий цикл",
    text: "Первая версия, которую можно показать клиентам и проверить спрос.",
  },
  {
    title: "Доработка чужого кода",
    text: "Разберусь в легаси, починю узкое место, подключу CI и доведу до релиза.",
  },
] as const;

export const stackGroups = [
  {
    title: "Frontend",
    items: ["React", "Next.js", "Vue", "Nuxt", "TypeScript", "Tailwind"],
  },
  {
    title: "Backend",
    items: ["Go", "Node.js", "Postgres", "Drizzle", "Auth.js / Clerk", "Docker"],
  },
  {
    title: "AI",
    items: ["Vercel AI SDK", "RAG", "Gemini", "OpenRouter", "OpenAI-compatible APIs"],
  },
  {
    title: "Качество",
    items: ["Vitest", "Playwright", "ESLint", "GitHub Actions", "i18n"],
  },
] as const;

export const heroFragments = [
  { id: "fx1", kind: "code" as const, label: "const plan = await goAi.chat()" },
  { id: "fx2", kind: "code" as const, label: "useEffect(() => stream())" },
  { id: "fx3", kind: "code" as const, label: "drizzle.select().from(family)" },
  { id: "fx4", kind: "symbol" as const, label: "</>" },
  { id: "fx5", kind: "symbol" as const, label: "{ }" },
  { id: "fx6", kind: "symbol" as const, label: "[ ]" },
  { id: "fx7", kind: "tag" as const, label: "Next.js" },
  { id: "fx8", kind: "tag" as const, label: "Go" },
  { id: "fx9", kind: "tag" as const, label: "RAG" },
  { id: "fx10", kind: "tag" as const, label: "Mapbox" },
  { id: "fx11", kind: "emoji" as const, label: "⚡" },
  { id: "fx12", kind: "emoji" as const, label: "◆" },
];
`;

fs.writeFileSync(
  new URL("../src/content/site.ts", import.meta.url),
  content,
  "utf8",
);
console.log("ok");
