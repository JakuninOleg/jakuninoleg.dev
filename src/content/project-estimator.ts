export type QuizLocale = "ru" | "en";
export type ProjectKind = "landing" | "corporate" | "catalog" | "store" | "portal" | "redesign" | "ai" | "seo" | "cms";
export type StartingPoint = "new" | "source" | "no-source" | "unsure";
export type MaterialState = "ready" | "partial" | "help";
export type CmsMode = "none" | "basic" | "advanced";
type Text = Record<QuizLocale, string>;
type Addition = { price: number; days: number };

export type QuizOption = Addition & { id: string; label: Text; detail?: Text };
export type ProjectConfig = {
  id: ProjectKind;
  title: Text;
  short: Text;
  basePrice: number;
  days: [number, number];
  service?: string;
  scopeQuestion: Text;
  scopes: [QuizOption, QuizOption, QuizOption];
  featureQuestion: Text;
  features: QuizOption[];
  cms: "optional" | "included" | "none";
};

const option = (id: string, ru: string, en: string, price: number, days: number, detailRu?: string, detailEn?: string): QuizOption => ({
  id, label: { ru, en }, price, days, ...(detailRu ? { detail: { ru: detailRu, en: detailEn ?? detailRu } } : {}),
});

export const projects: ProjectConfig[] = [
  {
    id: "landing", title: { ru: "Лендинг", en: "Landing page" }, short: { ru: "Одна страница под предложение или запуск", en: "One page for an offer or launch" },
    basePrice: 11900, days: [1, 10], service: "landing-pages", cms: "optional", scopeQuestion: { ru: "Насколько большой лендинг?", en: "How much should the landing page cover?" },
    scopes: [option("base", "Одно предложение", "One focused offer", 0, 0), option("expanded", "Несколько аудиторий или сценариев", "Several audiences or journeys", 9000, 3), option("complex", "Сложная структура и интерактив", "Complex structure and interaction", 20000, 7)],
    featureQuestion: { ru: "Что добавить к странице?", en: "What should the page include?" },
    features: [option("illustration", "Авторская иллюстрация", "Custom illustration", 7000, 3), option("animation", "Выразительная анимация", "Expressive animation", 6500, 2), option("crm", "Передача заявок в CRM", "Send leads to a CRM", 4500, 2)],
  },
  {
    id: "corporate", title: { ru: "Корпоративный сайт", en: "Company website" }, short: { ru: "Компания, услуги, команда, кейсы и заявки", en: "Company, services, team, cases and enquiries" },
    basePrice: 39000, days: [10, 30], cms: "optional", scopeQuestion: { ru: "Какая структура нужна?", en: "What site structure do you need?" },
    scopes: [option("base", "Основные разделы компании", "Core company sections", 0, 0), option("expanded", "Услуги, кейсы и блог", "Services, cases and a blog", 18000, 6), option("complex", "Много направлений или языков", "Many services or languages", 38000, 12)],
    featureQuestion: { ru: "Какие задачи сайт должен решать?", en: "What else should the site do?" },
    features: [option("seo", "Поисковая структура и тексты", "Search structure and copy", 12000, 4), option("crm", "Формы и CRM", "Forms and CRM", 6000, 2), option("languages", "Вторая языковая версия", "Second language", 14000, 5)],
  },
  {
    id: "catalog", title: { ru: "Сайт-каталог", en: "Product catalog" }, short: { ru: "Ассортимент, фильтры, карточки и заявки", en: "Products, filters, product pages and leads" },
    basePrice: 29000, days: [7, 21], service: "product-catalogues", cms: "included", scopeQuestion: { ru: "Как устроен ассортимент?", en: "How is your catalog structured?" },
    scopes: [option("base", "Простые категории", "Simple categories", 0, 0), option("expanded", "Несколько групп и характеристик", "Several groups and specifications", 12000, 4), option("complex", "Многоуровневый каталог", "Multi-level catalog", 28000, 9)],
    featureQuestion: { ru: "Что нужно покупателю и команде?", en: "What do customers and your team need?" },
    features: [option("filters", "Расширенные фильтры", "Advanced filters", 8000, 3), option("import", "Импорт товаров или 1С", "Product import or 1C", 12000, 5), option("request", "Заявка с выбранными товарами", "Enquiry with selected products", 6000, 2)],
  },
  {
    id: "store", title: { ru: "Интернет-магазин", en: "Online store" }, short: { ru: "Витрина, корзина, заказ и управление", en: "Storefront, cart, checkout and admin" },
    basePrice: 49000, days: [14, 35], service: "online-stores", cms: "included", scopeQuestion: { ru: "Насколько сложные продажи?", en: "How complex is the sales flow?" },
    scopes: [option("base", "Обычные товары и заказ", "Products and checkout", 0, 0), option("expanded", "Варианты, акции и фильтры", "Variants, promotions and filters", 20000, 7), option("complex", "Несколько цен и сложный учёт", "Multiple prices and complex operations", 45000, 14)],
    featureQuestion: { ru: "Какие подключения потребуются?", en: "Which integrations do you need?" },
    features: [option("payment", "Онлайн-оплата", "Online payments", 9000, 4), option("delivery", "Расчёт и трекинг доставки", "Shipping rates and tracking", 10000, 4), option("accounting", "Учёт или складская система", "Accounting or inventory system", 15000, 6)],
  },
  {
    id: "portal", title: { ru: "Портал / веб-приложение", en: "Portal / web app" }, short: { ru: "Кабинеты, роли, процессы и данные", en: "Accounts, roles, workflows and data" },
    basePrice: 79000, days: [21, 60], service: "web-applications", cms: "none", scopeQuestion: { ru: "Какая первая версия нужна?", en: "What should the first version include?" },
    scopes: [option("base", "Один главный сценарий", "One core workflow", 0, 0), option("expanded", "Несколько ролей и сценариев", "Several roles and workflows", 35000, 12), option("complex", "Сложная платформа", "Complex platform", 80000, 25)],
    featureQuestion: { ru: "Какие возможности важны?", en: "Which capabilities matter?" },
    features: [option("auth", "Аккаунты и роли", "Accounts and roles", 16000, 5), option("integration", "Внешний API или CRM", "External API or CRM", 14000, 5), option("dashboard", "Отчёты и дашборды", "Reports and dashboards", 18000, 6)],
  },
  {
    id: "redesign", title: { ru: "Дизайн / редизайн", en: "Design / redesign" }, short: { ru: "Новый визуальный язык или перестройка сайта", en: "New visual direction or a rebuilt site" },
    basePrice: 19000, days: [5, 25], service: "design-redesign", cms: "optional", scopeQuestion: { ru: "Что меняем?", en: "What should change?" },
    scopes: [option("base", "Ключевой экран или концепция", "Key screen or concept", 0, 0), option("expanded", "Несколько страниц", "Several pages", 18000, 6), option("complex", "Вся система и разработка", "Full system and development", 42000, 14)],
    featureQuestion: { ru: "Что входит в обновление?", en: "What does the update include?" },
    features: [option("research", "Аудит и новая структура", "Audit and new structure", 8000, 3), option("frontend", "Новая вёрстка", "New frontend", 15000, 6), option("brand", "Иллюстрации и графика", "Illustrations and graphics", 9000, 4)],
  },
  {
    id: "ai", title: { ru: "AI-решение", en: "AI solution" }, short: { ru: "Ассистент, RAG-поиск или автоматизация", en: "Assistant, RAG search or automation" },
    basePrice: 25000, days: [7, 30], service: "ai-solutions", cms: "none", scopeQuestion: { ru: "Какую задачу решает ИИ?", en: "What should AI help with?" },
    scopes: [option("base", "Пилот одного сценария", "One-workflow pilot", 0, 0), option("expanded", "Несколько источников и сценариев", "Several sources and workflows", 22000, 8), option("complex", "Агент с действиями и контролем", "Agent with actions and controls", 55000, 18)],
    featureQuestion: { ru: "Откуда брать данные и куда встроить?", en: "Where are the data and interface?" },
    features: [option("rag", "Документы и RAG-поиск", "Documents and RAG search", 12000, 5), option("chat", "Чат в сайте или приложении", "Chat in a site or app", 9000, 4), option("actions", "Интеграция с CRM / API", "CRM / API integration", 16000, 6)],
  },
  {
    id: "seo", title: { ru: "SEO и позиционирование", en: "SEO and positioning" }, short: { ru: "Аудит, семантика, структура и страницы", en: "Audit, keywords, architecture and pages" },
    basePrice: 15000, days: [5, 15], service: "seo-positioning", cms: "none", scopeQuestion: { ru: "Какой объём продвижения?", en: "What is the SEO scope?" },
    scopes: [option("base", "Аудит и план улучшений", "Audit and action plan", 0, 0), option("expanded", "Семантика и структура страниц", "Keywords and page structure", 12000, 5), option("complex", "Страницы, тексты и внедрение", "Pages, copy and implementation", 30000, 11)],
    featureQuestion: { ru: "Что включить в работу?", en: "What should be included?" },
    features: [option("technical", "Технические исправления", "Technical fixes", 9000, 4), option("copy", "Тексты посадочных страниц", "Landing page copy", 10000, 5), option("local", "Локальная поисковая структура", "Local search structure", 6500, 3)],
  },
  {
    id: "cms", title: { ru: "CMS для сайта", en: "CMS for a website" }, short: { ru: "Редактор, контентная модель и публикация", en: "Editor, content model and publishing" },
    basePrice: 14900, days: [3, 14], service: "cms", cms: "none", scopeQuestion: { ru: "Чем будет управлять команда?", en: "What will your team manage?" },
    scopes: [option("base", "Страницы и медиа", "Pages and media", 0, 0), option("expanded", "Каталог или сложный контент", "Catalog or structured content", 12000, 5), option("complex", "Роли, связи и интеграции", "Roles, relations and integrations", 28000, 10)],
    featureQuestion: { ru: "Какие функции редактора нужны?", en: "Which editor features matter?" },
    features: [option("preview", "Предпросмотр публикаций", "Content preview", 6000, 2), option("migration", "Перенос материалов", "Content migration", 9000, 4), option("roles", "Разные роли редакторов", "Editor roles", 7000, 3)],
  },
];

export const serviceTimelines: Record<string, Text> = {
  "landing-pages": { ru: "Лендинг: 1–10 дней · корпоративный сайт: от 10 дней", en: "Landing: 1–10 days · company site: from 10 days" },
  "product-catalogues": { ru: "Каталог: 7–21 рабочих дней", en: "Catalog: 7–21 working days" },
  "online-stores": { ru: "Магазин: 14–35 рабочих дней", en: "Store: 14–35 working days" },
  "web-applications": { ru: "Приложение: от 21 рабочего дня", en: "Web app: from 21 working days" },
  "design-redesign": { ru: "Дизайн: 5–25 рабочих дней", en: "Design: 5–25 working days" },
  "seo-positioning": { ru: "Аудит и план: 5–15 рабочих дней", en: "Audit and plan: 5–15 working days" },
  cms: { ru: "CMS: 3–14 рабочих дней", en: "CMS: 3–14 working days" },
  "ai-solutions": { ru: "AI-пилот: 7–30 рабочих дней", en: "AI pilot: 7–30 working days" },
};

export type QuizAnswers = {
  kind: ProjectKind;
  start: StartingPoint;
  scope: string;
  features: string[];
  cms: CmsMode;
  materials: MaterialState;
};

const cmsAdditions: Record<CmsMode, Addition> = {
  none: { price: 0, days: 0 }, basic: { price: 7000, days: 3 }, advanced: { price: 16000, days: 7 },
};

export function calculateEstimate(answers: QuizAnswers) {
  const project = projects.find((item) => item.id === answers.kind);
  if (!project) throw new Error("Unknown project type");
  const scope = project.scopes.find((item) => item.id === answers.scope) ?? project.scopes[0];
  const selected = project.features.filter((item) => answers.features.includes(item.id));
  const cms = project.cms === "optional" ? cmsAdditions[answers.cms] : { price: 0, days: 0 };
  const source = answers.start === "no-source" && answers.kind !== "seo" ? { price: 6000, days: 3 } : { price: 0, days: 0 };
  const materials = answers.materials === "help" ? { price: 11000, days: 5 } : answers.materials === "partial" ? { price: 4000, days: 2 } : { price: 0, days: 0 };
  const additions = [scope, ...selected, cms, source, materials];
  const minimum = project.basePrice + additions.reduce((sum, item) => sum + item.price, 0);
  const extraDays = additions.reduce((sum, item) => sum + item.days, 0);
  const uncertainty = answers.start === "unsure" ? 1.35 : 1.22;
  const maximum = Math.ceil((minimum * uncertainty) / 1000) * 1000;
  return {
    project,
    minimum,
    maximum,
    days: [project.days[0] + Math.floor(extraDays / 2), project.days[1] + extraDays + (answers.start === "unsure" ? 3 : 0)] as [number, number],
    selected,
    scope,
  };
}
