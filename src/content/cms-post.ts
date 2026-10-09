export const cmsPostDate = "2026-10-09";
export const cmsPostSlug = "nextjs-payload-oj-cms-dlya-biznesa";
export const cmsPostSlugEn = "nextjs-payload-oj-cms-for-business";
export const cmsPostArt = "/blog/oj-cms-engineering.webp";

export function cmsBlogPath(locale: string) {
  return `/${locale}/blog/${locale === "en" ? cmsPostSlugEn : cmsPostSlug}`;
}

export const cmsPostCopy = {
  ru: {
    tag: "Разработка / CMS / кейс КЭМЗ",
    title: "Ваш сайт перерос конструктор. Что дальше? Next.js + OJ CMS",
    lead: "Авторский дизайн, управляемый каталог и заявки в одной панели. Показываю на примере КЭМЗ, как я создаю сайты на Next.js и подключаю OJ CMS на базе Payload — без зависимости от готовой темы и набора плагинов.",
    date: "9 октября 2026",
    time: "8 минут чтения",
  },
  en: {
    tag: "Development / CMS / KEMZ case study",
    title: "Your website has outgrown a builder. Next.js + OJ CMS comes next",
    lead: "Bespoke design, an editable catalog and inquiries in one dashboard. The KEMZ project shows how I build Next.js websites with OJ CMS on Payload, without tying the product to a ready-made theme or a stack of plugins.",
    date: "9 October 2026",
    time: "6 min read",
  },
} as const;
