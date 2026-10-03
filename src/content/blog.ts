export const firstPostSlug = "sayt-bez-tilda-wordpress-bitriks";
export const firstPostSlugEn = "website-without-tilda-wordpress-bitrix";
export const firstPostDate = "2026-09-28";
export const privacyPostSlug = "152-fz-personalnye-dannye-na-sajte";
export const privacyPostSlugEn = "152-fz-personal-data-on-a-website";
export const privacyPostDate = "2026-09-25";
export const catalogPostSlug = "katalog-oborudovaniya-dlya-proizvoditelya";
export const catalogPostSlugEn = "equipment-catalog-for-manufacturers";
export const catalogPostDate = "2026-10-03";

export function catalogBlogPath(locale: string) {
  return `/${locale}/blog/${locale === "en" ? catalogPostSlugEn : catalogPostSlug}`;
}

export const catalogPostCopy = {
  ru: {
    tag: "Каталог оборудования / из практики",
    title: "Каталог оборудования: как провести клиента от модели до заявки",
    lead: "Покупателю нужны характеристики, документы и понятный следующий шаг. На примере каталога КЭМЗ показываю, как спроектировать поиск, карточку оборудования и заявку без лишних препятствий.",
    date: "3 октября 2026",
    time: "7 минут чтения",
  },
  en: {
    tag: "Equipment catalogs / field notes",
    title: "An equipment catalog that takes buyers from model to enquiry",
    lead: "Buyers need specifications, documents and a clear next step. The KEMZ project shows how to connect search, product pages and enquiries without adding friction.",
    date: "3 October 2026",
    time: "6 min read",
  },
} as const;

export function privacyBlogPath(locale: string) {
  return `/${locale}/blog/${locale === "en" ? privacyPostSlugEn : privacyPostSlug}`;
}

export const privacyPostCopy = {
  ru: {
    tag: "Запуск сайта / персональные данные",
    title: "152‑ФЗ для сайта: что проверить до запуска формы заявки",
    lead: "Форма, аналитика и хранение заявок связаны с персональными данными. Показываю владельцу сайта, какие вопросы задать разработчику до публикации и где возникают штрафные риски.",
    date: "25 сентября 2026",
    time: "7 минут чтения",
  },
  en: {
    tag: "Website launch / personal data",
    title: "Russia's 152‑FZ: a website owner's prelaunch checklist",
    lead: "Forms, analytics and stored enquiries may involve personal data. Here is what a site owner should review with a developer before launch.",
    date: "25 September 2026",
    time: "5 min read",
  },
} as const;

export function blogSlug(locale: string) {
  return locale === "en" ? firstPostSlugEn : firstPostSlug;
}

export const blogCopy = {
  ru: {
    indexTitle: "Блог о сайтах, которые работают на бизнес",
    indexLead: "Пишу о дизайне, разработке, CMS и поисковом продвижении. С примерами из своих проектов и без универсальных рецептов.",
    indexKicker: "Заметки из мастерской",
    firstTag: "Разработка / выбор платформы",
    firstTitle: "Почему вашему сайту не нужны Tilda, WordPress и Битрикс",
    firstLead: "В 2026 году сайт можно собрать вокруг вашей задачи, а не подгонять задачу под шаблон. Разбираю, когда индивидуальная разработка на Astro, React и Next.js оказывается разумнее готовой платформы.",
    read: "Читать статью",
    all: "Все статьи",
    date: "28 сентября 2026",
    time: "5 минут чтения",
  },
  en: {
    indexTitle: "Notes on websites that work for business",
    indexLead: "Design, development, CMS and search visibility, with examples from my own projects and no one-size-fits-all recipes.",
    indexKicker: "From the workshop",
    firstTag: "Development / choosing a platform",
    firstTitle: "Why your website may not need Tilda, WordPress or Bitrix",
    firstLead: "In 2026, a website can be built around your business instead of squeezing your business into a template. Here is when a bespoke Astro, React or Next.js build makes more sense.",
    read: "Read article",
    all: "All articles",
    date: "28 September 2026",
    time: "2 min read",
  },
} as const;

export function blogPath(locale: string) {
  return `/${locale}/blog/${blogSlug(locale)}`;
}
