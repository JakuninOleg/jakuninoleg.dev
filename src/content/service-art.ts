import type { ServiceRoute } from "./service-routes";

export const serviceCardArt = (route: ServiceRoute) => `/service-art/cards/${route}.webp`;

type ServiceArt = {
  src: string;
  alt: { ru: string; en: string };
};

export const serviceArt: Record<ServiceRoute, ServiceArt> = {
  "landing-pages": {
    src: "/service-art/hero/landing-pages.webp",
    alt: {
      ru: "Маскот собирает лендинг ВНЕ ШАБЛОНА в своей мастерской",
      en: "The mascot assembles the VNE SHABLONA landing page in his workshop",
    },
  },
  "product-catalogues": {
    src: "/service-art/hero/product-catalogues.webp",
    alt: {
      ru: "Маскот собирает каталог промышленного оборудования КЭМЗ",
      en: "The mascot assembles a KEMZ industrial equipment catalog",
    },
  },
  "online-stores": {
    src: "/service-art/hero/online-stores.webp",
    alt: {
      ru: "Маскот оформляет товар для интернет-магазина одежды",
      en: "The mascot prepares a product for a clothing store",
    },
  },
  "web-applications": {
    src: "/service-art/hero/web-applications.webp",
    alt: {
      ru: "Маскот собирает веб-приложение с картой, задачами и рабочими данными",
      en: "The mascot builds a web application with a map, tasks and live data",
    },
  },
  "design-redesign": {
    src: "/service-art/hero/design-redesign.webp",
    alt: {
      ru: "Маскот превращает старый дизайн сайта в новый выразительный интерфейс",
      en: "The mascot transforms an old website design into a striking new interface",
    },
  },
  "seo-positioning": {
    src: "/service-art/hero/seo-positioning.webp",
    alt: {
      ru: "Маскот прокладывает путь от поисковых запросов к страницам и заявке",
      en: "The mascot maps search queries to useful pages and enquiries",
    },
  },
  cms: {
    src: "/service-art/hero/cms.webp",
    alt: {
      ru: "Маскот управляет контентом внутри интерфейса OJ CMS",
      en: "The mascot manages content inside the OJ CMS interface",
    },
  },
  "ai-solutions": {
    src: "/service-art/hero/ai-solutions.webp",
    alt: {
      ru: "Маскот соединяет документы и проверяемые ответы в AI-системе",
      en: "The mascot connects source documents to grounded answers in an AI system",
    },
  },
};
