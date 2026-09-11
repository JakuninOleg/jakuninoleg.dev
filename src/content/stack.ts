import {
  siAuth0,
  siClerk,
  siDocker,
  siEslint,
  siGithubactions,
  siGo,
  siI18next,
  siNestjs,
  siNextdotjs,
  siNodedotjs,
  siNuxt,
  siPostgresql,
  siPython,
  siReact,
  siTailwindcss,
  siTypescript,
  siVercel,
  siVitest,
  siVuedotjs,
} from "simple-icons";

export type TechIcon = {
  title: string;
  hex: string;
  path: string;
};

export type StackTech = {
  label: string;
  icon: TechIcon;
  /** Override brand hex when needed for contrast on dark UI */
  color?: string;
};

export type StackGroupMeta = {
  id: "frontend" | "backend" | "ai" | "quality";
  items: StackTech[];
};

const openaiIcon: TechIcon = {
  title: "OpenAI",
  hex: "412991",
  path: "M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z",
};

const playwrightIcon: TechIcon = {
  title: "Playwright",
  hex: "2EAD33",
  path: "M23.01 12.0a2.45 2.45 0 0 0-1.53-2.26l-7.5-3.1a2.48 2.48 0 0 0-1.9 0l-7.5 3.1A2.45 2.45 0 0 0 2.99 12v6.28a2.45 2.45 0 0 0 1.53 2.26l7.5 3.1c.6.25 1.28.25 1.88 0l7.5-3.1a2.45 2.45 0 0 0 1.53-2.26Zm-9.1 7.72-6.9-2.85V13.7l6.9 2.86Zm7.2-2.85-6.9 2.85v-3.17l6.9-2.86Zm-15.4-5.12 7.1-2.93 7.1 2.93-7.1 2.93Zm.9 1.74v3.17l2.7 1.12v-3.17Zm11.6 0-2.7 1.12v3.17l2.7-1.12Z",
};

function fromSimple(icon: { title: string; hex: string; path: string }): TechIcon {
  return { title: icon.title, hex: icon.hex, path: icon.path };
}

export const stackGroupsMeta: StackGroupMeta[] = [
  {
    id: "frontend",
    items: [
      { label: "React", icon: fromSimple(siReact) },
      { label: "Next.js", icon: fromSimple(siNextdotjs), color: "#FFFFFF" },
      { label: "Vue", icon: fromSimple(siVuedotjs) },
      { label: "Nuxt", icon: fromSimple(siNuxt) },
      { label: "TypeScript", icon: fromSimple(siTypescript) },
      { label: "Tailwind CSS", icon: fromSimple(siTailwindcss) },
    ],
  },
  {
    id: "backend",
    items: [
      { label: "Node.js", icon: fromSimple(siNodedotjs) },
      { label: "NestJS", icon: fromSimple(siNestjs) },
      { label: "Go", icon: fromSimple(siGo) },
      { label: "Python", icon: fromSimple(siPython) },
      { label: "PostgreSQL", icon: fromSimple(siPostgresql) },
      { label: "Docker", icon: fromSimple(siDocker) },
    ],
  },
  {
    id: "ai",
    items: [
      { label: "Vercel AI SDK", icon: fromSimple(siVercel), color: "#FFFFFF" },
      { label: "RAG", icon: openaiIcon },
      { label: "OpenAI-compatible APIs", icon: openaiIcon },
      { label: "Auth.js", icon: fromSimple(siAuth0) },
      { label: "Clerk", icon: fromSimple(siClerk) },
      { label: "i18n", icon: fromSimple(siI18next) },
    ],
  },
  {
    id: "quality",
    items: [
      { label: "Vitest", icon: fromSimple(siVitest) },
      { label: "Playwright", icon: playwrightIcon },
      { label: "ESLint", icon: fromSimple(siEslint) },
      { label: "GitHub Actions", icon: fromSimple(siGithubactions) },
      { label: "CI/CD", icon: fromSimple(siGithubactions) },
      { label: "Vercel", icon: fromSimple(siVercel), color: "#FFFFFF" },
    ],
  },
];
