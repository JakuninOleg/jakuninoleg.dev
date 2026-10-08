import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { ServiceGlyph } from "@/components/ServiceGlyph";
import { siMailchimp, siMeilisearch, siPaypal, siResend, siStripe } from "simple-icons";
import { serviceArt, serviceCardArt } from "@/content/service-art";
import { relatedCardBlur, serviceCardBlur } from "@/content/service-art-blur";
import { serviceFaqExtra } from "@/content/service-faq-extra";
import { servicePages } from "@/content/service-pages";
import { serviceRoutes, type ServiceRoute } from "@/content/service-routes";
import { serviceTimelines } from "@/content/project-estimator";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ServiceLeadForm } from "@/components/ServiceLeadForm";
import { BlogContextLink } from "@/components/BlogContextLink";
import styles from "./page.module.css";
import { FaqList } from "./FaqList";

type Props = { params: Promise<{ locale: string; slug: string }> };
const colors: Record<ServiceRoute, string> = {
  "landing-pages": "#f6b74f", "product-catalogues": "#77c9ed", "online-stores": "#f6b74f",
  "web-applications": "#9d91f2", "design-redesign": "#f58c85", "seo-positioning": "#81d7b1",
  cms: "#69d9d0", "ai-solutions": "#aa9ef3",
};
const relatedCardArt: Partial<Record<ServiceRoute, { src: string; width: number; height: number }>> = {
  "landing-pages": { src: "/service-art/cards/related-landing.webp", width: 720, height: 512 },
  "product-catalogues": { src: "/service-art/cards/related-catalog.webp", width: 720, height: 480 },
  "online-stores": { src: "/service-art/cards/related-store.webp", width: 720, height: 480 },
  "web-applications": { src: "/service-art/cards/related-app.webp", width: 720, height: 480 },
};
const relatedByRoute: Record<ServiceRoute, ServiceRoute[]> = {
  "landing-pages": ["product-catalogues", "online-stores", "web-applications"],
  "product-catalogues": ["landing-pages", "online-stores", "web-applications"],
  "online-stores": ["product-catalogues", "landing-pages", "web-applications"],
  "web-applications": ["landing-pages", "product-catalogues", "online-stores"],
  "design-redesign": ["landing-pages", "product-catalogues", "web-applications"],
  "seo-positioning": ["landing-pages", "product-catalogues", "online-stores"],
  cms: ["product-catalogues", "online-stores", "web-applications"],
  "ai-solutions": ["web-applications", "product-catalogues", "cms"],
};
const relatedCopy: Record<"ru" | "en", Record<ServiceRoute, { title: string; text: string }>> = {
  ru: {
    "landing-pages": { title: "Одной страницы мало?", text: "Когда нужны десятки товаров, оформление заказов или личный кабинет, выбирайте формат под эту задачу." },
    "product-catalogues": { title: "Нужен другой путь к заявке?", text: "Для одного предложения хватит лендинга. Для онлайн-продаж нужен магазин, а для внутренних процессов — приложение." },
    "online-stores": { title: "Покупка онлайн пока не нужна?", text: "Каталог собирает запросы на подбор, лендинг проверяет отдельное предложение, приложение решает задачи команды." },
    "web-applications": { title: "Нужен сайт, а не сервис?", text: "Представить услугу, показать ассортимент или продавать онлайн можно без разработки личного кабинета." },
    "design-redesign": { title: "Какой сайт будем проектировать?", text: "Визуальную систему можно применить к лендингу, каталогу или сложному веб-продукту." },
    "seo-positioning": { title: "Где применим поисковую стратегию?", text: "Структура спроса превращается в страницы услуги, категории каталога или товары магазина." },
    cms: { title: "Каким сайтом управлять?", text: "Подберём редактор под контент каталога, магазина или веб-приложения." },
    "ai-solutions": { title: "Куда встроить ИИ?", text: "Помощник может работать в приложении, искать по каталогу или помогать редактору в CMS." },
  },
  en: {
    "landing-pages": { title: "Need more than one page?", text: "A catalog, store or web app is a better fit when you need many products, checkout or user accounts." },
    "product-catalogues": { title: "A different route to the lead?", text: "A landing page can test one offer, a store handles checkout, and an app supports internal workflows." },
    "online-stores": { title: "Not selling online yet?", text: "A catalog can collect inquiries; a landing page can test an offer; an app can support your team." },
    "web-applications": { title: "Need a site instead of an app?", text: "A landing page, catalog or store may cover your goal without accounts and custom workflows." },
    "design-redesign": { title: "What are we designing?", text: "A visual system can support a landing page, product catalog or web application." },
    "seo-positioning": { title: "Where will search work lead?", text: "Search demand becomes service pages, catalog categories or product pages." },
    cms: { title: "What needs editing?", text: "We can shape the editor around a catalog, store or web application." },
    "ai-solutions": { title: "Where should AI work?", text: "An assistant can live in an app, search a catalog or help editors in a CMS." },
  },
};

export function generateStaticParams() {
  return ["ru", "en"].flatMap((locale) => serviceRoutes.filter((slug) => slug !== "product-catalogues").map((slug) => ({ locale, slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const copy = servicePages[locale === "en" ? "en" : "ru"][slug as ServiceRoute];
  if (!copy) return {};
  const path = `/${locale}/services/${slug}`;
  const image = copy.image ?? serviceArt[slug as ServiceRoute]?.src;
  return {
    title: copy.seoTitle, description: copy.seoDescription,
    alternates: { canonical: path, languages: { ru: `/ru/services/${slug}`, en: `/en/services/${slug}` } },
    openGraph: { type: "website", url: path, title: copy.seoTitle, description: copy.seoDescription, ...(image ? { images: [image] } : {}) },
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  const route = slug as ServiceRoute;
  const copy = servicePages[locale === "en" ? "en" : "ru"][route];
  if (!serviceRoutes.includes(route) || !copy) notFound();
  setRequestLocale(locale);
  const nav = await getTranslations("Nav");
  const services = await getTranslations("Services");
  const isRu = locale !== "en";
  const accent = { "--service-accent": colors[route] } as CSSProperties;
  const caseHref = copy.exampleHref ? `/${locale}${copy.exampleHref}` : null;
  const serviceTitles = services.raw("items") as { title: string }[];
  const relatedRoutes = relatedByRoute[route];
  const related = relatedCopy[isRu ? "ru" : "en"][route];
  const artwork = serviceArt[route];

  return <>
    <a href="#main" className="skip-link">{nav("skipToContent")}</a>
    <Header /><Reveal />
    <main id="main" className={`${styles.page} flex-1`} style={accent}>
      <section className={`${styles.hero} ${route === "landing-pages" ? styles.heroLanding : ""}`} aria-labelledby="service-title">
        <div className="shell">
          <Breadcrumbs locale={locale} items={[{ label: isRu ? "Услуги" : "Services", href: `/${locale}/services` }, { label: serviceTitles[serviceRoutes.indexOf(route)].title }]} />
          <p className={styles.kicker}>{copy.label}</p>
          <h1 id="service-title">{copy.title}</h1>
        </div>
        <div className={`shell ${styles.heroGrid}`}>
          <div className={styles.heroCopy}>
            <p className={styles.lead}>{copy.lead}</p>
            <div className={styles.heroActions}><a href="#service-contact" className={styles.primary}>{isRu ? "Обсудить задачу" : "Discuss a project"} <span aria-hidden="true">↗</span></a><Link href={`/${locale}/calculator`} className={styles.secondary}>{isRu ? "Рассчитать стоимость" : "Estimate cost"} →</Link>{caseHref && <Link href={caseHref} className={styles.secondary}>{copy.exampleCta} →</Link>}{route === "cms" && <Link href={`/${locale}/oj-cms`} className={styles.secondary}>{isRu ? "О продукте OJ CMS" : "About OJ CMS"} →</Link>}</div>
            {copy.price && <div className={styles.price}><strong>{copy.price}</strong><span>{copy.priceNote}</span></div>}
            <p className={styles.timeline}>{serviceTimelines[route][isRu ? "ru" : "en"]}</p>
          </div>
          <div className={styles.heroVisual}>
            {!artwork && <div className={styles.visualTop}><span>{isRu ? "НАПРАВЛЕНИЕ" : "SERVICE"} / {String(serviceRoutes.indexOf(route) + 1).padStart(2, "0")}</span><ServiceGlyph kind={route} /></div>}
            {artwork ? <div className={`${styles.visualImage} ${styles.visualImageArtwork}`}><Image src={artwork.src} alt={artwork.alt[isRu ? "ru" : "en"]} fill sizes="(max-width: 850px) 100vw, 50vw" priority /></div> : route === "seo-positioning" ? <SeoDiagram isRu={isRu} /> : route === "ai-solutions" ? <AiDiagram isRu={isRu} /> : route === "design-redesign" ? <DesignDiagram isRu={isRu} /> : copy.image ? <div className={styles.visualImage}><Image src={copy.image} alt={copy.imageAlt || ""} fill sizes="(max-width: 850px) 100vw, 50vw" priority /></div> : null}
            {!artwork && <div className={styles.visualBottom}><span>{copy.exampleLabel}</span><Image src="/mascot/mascot-base.webp" alt="" width={76} height={76} /></div>}
          </div>
        </div>
        <div className={`shell ${styles.heroNote}`}>{copy.note}</div>
      </section>

      <section className={`${styles.included} ${route === "landing-pages" ? styles.includedLanding : ""}`} aria-labelledby="included-title"><div className="shell">
        <div className={styles.sectionHead}><p className={styles.kicker}>01 / {isRu ? "СОСТАВ РАБОТ" : "SCOPE"}</p><h2 id="included-title">{copy.includedTitle}</h2></div>
        <div className={styles.includedGrid}>{copy.included.map((item, index) => <article key={item.title} className="reveal-item"><span>0{index + 1}</span>{route === "landing-pages" && <div className={styles.includedDetail} aria-hidden="true"><Image src={index === 0 ? "/service-art/landing-workshop-wide.webp" : index === 1 ? "/service-art/design-redesign.webp" : "/service-art/seo-positioning.webp"} alt="" fill sizes="(max-width: 650px) 80vw, 28vw" /></div>}<h3>{item.title}</h3><p>{item.text}</p></article>)}</div>
      </div></section>

      <section className={`${styles.example} ${route === "seo-positioning" ? styles.seoExample : ""}`} aria-labelledby="example-title"><div className={`shell ${styles.exampleGrid}`}>
        <div className={styles.exampleCopy}><h2 id="example-title">{copy.exampleTitle}</h2><p>{copy.exampleText}</p>{caseHref && <Link href={caseHref} className={styles.inlineLink}>{copy.exampleCta} ↗</Link>}</div>
        <div className={`${styles.exampleArt} ${route === "seo-positioning" ? styles.seoExampleArt : ""}`}>
          {copy.image ? <Image src={copy.image} alt={copy.imageAlt || ""} fill sizes="(max-width: 850px) 100vw, 50vw" /> : route === "online-stores" ? <StoreVisual isRu={isRu} compact /> : route === "seo-positioning" ? <Image src="/service-art/seo-intent-routes.webp" alt={isRu ? "Маскот направляет запрос клиента к странице услуги, кейсу и полезной статье" : "Mascot maps a customer question to a service page, case study and useful article"} fill sizes="(max-width: 900px) 100vw, 50vw" /> : <SeoDiagram isRu={isRu} />}
        </div>
      </div></section>

      {(route === "design-redesign" || route === "landing-pages") && <ConceptGallery isRu={isRu} compact={route === "landing-pages"} />}

      {route === "online-stores" && <CommerceDetails isRu={isRu} />}
      {route === "landing-pages" && <LandingDetails isRu={isRu} />}
      {route === "seo-positioning" && <SeoServiceDetails isRu={isRu} />}

      <section className={styles.process} aria-labelledby="process-title"><div className="shell">
        <div className={styles.sectionHead}><p className={styles.kicker}>{route === "seo-positioning" ? "04" : "03"} / {isRu ? "ПРОЦЕСС" : "PROCESS"}</p><h2 id="process-title">{copy.processTitle}</h2></div>
        <ol className={styles.processGrid}>{copy.process.map((item, index) => <li key={item.title}><span>0{index + 1}</span><h3>{item.title}</h3><p>{item.text}</p></li>)}</ol>
      </div></section>

      <section className={styles.faq} aria-labelledby="faq-title"><div className={`shell ${styles.faqGrid}`}><div><p className={styles.kicker}>{route === "seo-positioning" ? "05" : "04"} / FAQ</p><h2 id="faq-title">{isRu ? "Частые вопросы" : "Common questions"}</h2></div><FaqList items={[...copy.faq, ...serviceFaqExtra[isRu ? "ru" : "en"][route]]} /></div></section>

      <nav className={styles.related} aria-label={isRu ? "Другие услуги" : "Other services"}><div className="shell"><p className={styles.kicker}>{isRu ? "МОЖНО ПО-ДРУГОМУ" : "ANOTHER ROUTE"}</p><div className={styles.relatedHead}><h2>{related.title}</h2><p>{related.text}</p></div><div className={styles.relatedGrid}>{relatedRoutes.map((item) => {
        const artwork = relatedCardArt[item];
        return <Link key={item} href={`/${locale}/services/${item}`}><Image className={artwork ? styles.relatedArtworkFeature : styles.relatedArtwork} src={artwork?.src ?? serviceCardArt(item)} alt="" width={artwork?.width ?? 960} height={artwork?.height ?? 960} sizes="(max-width: 650px) 100vw, 33vw" placeholder="blur" blurDataURL={relatedCardBlur[item] ?? serviceCardBlur[item]} /><span className={styles.relatedTitle}>{serviceTitles[serviceRoutes.indexOf(item)].title}</span><span className={styles.relatedArrow} aria-hidden="true">↗</span></Link>;
      })}</div><Link href={`/${locale}/services`} className={styles.relatedAll}>{isRu ? "Все направления" : "All services"} ↗</Link></div></nav>

      {(["landing-pages", "online-stores", "seo-positioning", "cms"] as ServiceRoute[]).includes(route) && <BlogContextLink locale={locale} context={route === "landing-pages" ? "landing" : route === "online-stores" ? "store" : route === "cms" ? "cms" : "seo"} />}
      {route === "web-applications" && <BlogContextLink locale={locale} context="privacy" />}
      <ServiceLeadForm locale={locale} service={serviceTitles[serviceRoutes.indexOf(route)].title} title={copy.finalTitle} lead={copy.finalText} />
    </main><Footer />
  </>;
}

const concepts = [
  { src: "/concepts/photo.webp", ru: "Редакционный коллаж", en: "Editorial collage", fieldRu: "Фотография и образование", fieldEn: "Photography and education" },
  { src: "/concepts/construction.webp", ru: "Инженерная графика", en: "Engineering graphics", fieldRu: "Строительство", fieldEn: "Construction" },
  { src: "/concepts/anapa.webp", ru: "Чертёж и калькулятор", en: "Blueprint and calculator", fieldRu: "Загородные дома", fieldEn: "Home building" },
  { src: "/concepts/anapa-catalog.webp", ru: "Каталог и выбор", en: "Catalog and selection", fieldRu: "Недвижимость", fieldEn: "Real estate" },
  { src: "/concepts/surgeon.webp", ru: "Экспертная подача", en: "Expert-led design", fieldRu: "Медицина", fieldEn: "Healthcare" },
  { src: "/concepts/investment.webp", ru: "Строгая типографика", en: "Confident typography", fieldRu: "Инвестиции", fieldEn: "Investment" },
  { src: "/concepts/retreat.webp", ru: "Маршрут как история", en: "Story-led journey", fieldRu: "Отдых и туризм", fieldEn: "Travel and retreat" },
  { src: "/concepts/wedding.webp", ru: "Визуальная драматургия", en: "Visual storytelling", fieldRu: "События", fieldEn: "Events" },
];

function ConceptGallery({ isRu, compact }: { isRu: boolean; compact: boolean }) {
  const items = compact ? [concepts[0], concepts[1], concepts[6], concepts[7]] : concepts;
  return <section className={styles.concepts} aria-labelledby="concepts-title"><div className="shell">
    <div className={styles.conceptsHead}><div><p className={styles.kicker}>{isRu ? "02 / ВИЗУАЛЬНЫЕ НАПРАВЛЕНИЯ" : "02 / VISUAL DIRECTIONS"}</p><h2 id="concepts-title">{isRu ? compact ? "Лендинг может быть любым, но не безликим" : "Не один шаблон для всех отраслей" : compact ? "A landing page with its own character" : "One idea does not fit every industry"}</h2></div><p>{isRu ? compact ? "Для каждой задачи ищу свой язык: редакционный, инженерный, эмоциональный или предметный. Ниже — концепты, которые показывают диапазон подходов." : "От инженерного чертежа до тёплого редакционного коллажа. Это концепты визуальных направлений, а не готовые клиентские проекты." : compact ? "Editorial, technical or emotional: the direction follows the offer. These are design concepts, not launched client projects." : "From technical drawings to editorial collages. These are design concepts, not launched client projects."}</p></div>
    <div className={styles.conceptsGrid}>{items.map((concept, index) => <a href={concept.src} target="_blank" rel="noopener noreferrer" key={concept.src} className={styles.conceptCard} aria-label={`${isRu ? concept.fieldRu : concept.fieldEn}: ${isRu ? concept.ru : concept.en}. ${isRu ? "Открыть концепт" : "Open concept"}`}><div className={styles.conceptImage}><Image src={concept.src} alt="" fill sizes="(max-width: 650px) 90vw, (max-width: 1100px) 45vw, 24vw" /></div><span className={styles.conceptMeta}><small>{String(index + 1).padStart(2, "0")} / {isRu ? concept.fieldRu : concept.fieldEn}</small><strong>{isRu ? concept.ru : concept.en}</strong><span aria-hidden="true">↗</span></span></a>)}</div>
  </div></section>;
}

function StoreVisual({ isRu, compact = false }: { isRu: boolean; compact?: boolean }) {
  return <div className={`${styles.storeVisual} ${compact ? styles.storeVisualCompact : ""}`}>
    <span className={styles.storeVisualLabel}>{isRu ? "КОНЦЕПТ ВИТРИНЫ / ATELIER" : "STOREFRONT CONCEPT / ATELIER"}</span>
    <div className={styles.storeVisualFrame}>
      <Image src="/solutions/shop-site.png" alt={isRu ? "Дизайн-концепт интернет-магазина одежды: каталог товаров и корзина" : "Fashion store design concept with product catalog and cart"} width={1280} height={720} sizes="(max-width: 900px) 100vw, 48vw" priority={!compact} />
    </div>
    <span className={styles.storeVisualNote}>{isRu ? "ВИТРИНА · КАТАЛОГ · КОРЗИНА" : "STOREFRONT · CATALOG · CART"}</span>
  </div>;
}

function SeoServiceDetails({ isRu }: { isRu: boolean }) {
  const content = isRu ? {
    kicker: "03 / ОТ ПЛАНА К РЕЗУЛЬТАТУ",
    title: "После аудита понятно, что делать дальше",
    intro: "Вместо общего списка ошибок — приоритеты, страницы и способ проверить изменения. Состав внедрения согласуем отдельно: можно начать с аудита или пройти путь до публикации и наблюдения за результатом.",
    deliverables: [
      { label: "01 / КАРТА СПРОСА", title: "Какие страницы нужны", text: "Группы запросов, поисковое намерение и назначение страницы: услуга, категория, кейс или полезный материал." },
      { label: "02 / ОЧЕРЕДЬ ПРАВОК", title: "Что исправить сначала", text: "Проблемные URL, причина, влияние на обход или путь к заявке и конкретное действие. Технические ошибки отделены от гипотез по контенту." },
      { label: "03 / КОНТЕНТ-ПЛАН", title: "О чём писать и зачем", text: "Темы опираются на вопросы покупателей и реальные материалы бизнеса. Для каждой — цель, целевая страница и доказательства, которые стоит собрать." },
    ],
    researchLabel: "КАК ИЗУЧАЮ РЫНОК",
    researchTitle: "Сравниваю не позиции, а ответы на задачу клиента",
    researchIntro: "По каждому важному намерению смотрю выдачу Яндекса и Google в нужном регионе: какие страницы ранжируются, что они обещают и чем подтверждают предложение. Затем сопоставляю это с вашим сайтом и реальными преимуществами бизнеса.",
    researchCaption: "Иллюстрация процесса исследования; сравнение для проекта строится на фактической выдаче.",
    researchColumns: ["Слой анализа", "Что фиксирую", "Решение для сайта"],
    researchRows: [
      ["Запрос и выдача", "Намерение, типы результатов, регион и устройство; отдельно Яндекс и Google.", "Понять, нужна ли услуга, категория, кейс или ответ на вопрос."],
      ["Страницы конкурентов", "Предложение, ассортимент, структура, доказательства, цены и путь к заявке.", "Показать собственное отличие там, где клиент действительно сравнивает."],
      ["Наши страницы", "Какие URL уже отвечают на запрос, чего не хватает в содержании и внутренних ссылках.", "Сохранить, улучшить или создать страницу — с приоритетом по ценности задачи."],
    ],
    editorialLabel: "РЕДАКЦИОННЫЙ ПЛАН",
    editorialTitle: "Статьи из вашей практики, а не из чужого текста",
    editorialIntro: "В SEO-план включаю темы, целевые страницы и календарь публикаций. Пример рабочего ритма — 8 материалов за месяц, по 2 в неделю. Частоту выбираем по запасу фактов и возможности эксперта участвовать: объём сам по себе не даёт результата.",
    editorialCadence: ["8 статей", "4 недели", "2 в неделю"],
    editorialSource: "Темы собираю из поискового спроса, вопросов отдела продаж, выдачи конкурентов и материалов вашей команды. Для каждой статьи фиксирую задачу читателя, эксперта, доказательства и ссылку на следующую полезную страницу. Написание и публикацию материалов согласуем отдельно от подготовки плана.",
    editorialAvoidLabel: "НЕ ДЕЛАЕМ",
    editorialAvoidTitle: "Рерайт ради количества",
    editorialAvoidText: "Не пересказываем чужие статьи с заменой слов и не заполняем календарь без фактов о вашем продукте. Такой материал не показывает, почему клиенту стоит выбрать вас.",
    editorialDoLabel: "ДЕЛАЕМ",
    editorialDoTitle: "Показываем собственный опыт",
    editorialDoText: "Разбираем задачу, решения, скриншоты, ограничения и выводы с вашим экспертом. Такие материалы дают человеку ответ и помогают поисковым системам понять, на чём он основан.",
    geoLabel: "SEO / AEO / GEO",
    geoTitle: "Одна экспертиза — три способа быть найденными",
    geoIntro: "Работаю с обычной выдачей, прямыми ответами на вопросы и AI-поиском как с разными сценариями одной задачи. Основа общая: доступная страница, конкретный ответ и доказательства из вашей практики.",
    geoSteps: [
      { number: "SEO", title: "Классический поиск", text: "Собираю спрос по намерениям, устраняю проблемы индексации, создаю нужные страницы и внутренние связи. Смотрю показы, клики и целевые обращения." },
      { number: "AEO", title: "Ответ на вопрос", text: "Выделяю реальные вопросы покупателей, даю короткий ответ в начале раздела, затем раскрываю условия и примеры. Проверяю, понятно ли это человеку и поисковой выдаче." },
      { number: "GEO", title: "AI-поиск", text: "Делаю источники доступными для обхода, добавляю авторство и проверяемые кейсы; отслеживаю цитирования и переходы там, где сервисы дают такие данные." },
    ],
    geoNote: "Упоминание в AI-ответе и место в обычной выдаче нельзя обещать. Проверяю видимость по важным вопросам и связываю её с переходами, действиями на сайте и подходящими заявками.",
    toolsTitle: "Инструменты под задачу, а не ради отчёта",
    tools: [
      { title: "Поисковые системы", text: "Google Search Console, Яндекс Вебмастер, при необходимости Bing Webmaster: индексация, запросы, страницы и ошибки обхода." },
      { title: "Техническая диагностика", text: "Обход сайта, проверка ответов сервера, canonical, robots.txt, sitemap, внутренних ссылок и мобильной версии; PageSpeed Insights и Lighthouse для скорости." },
      { title: "Поведение и заявки", text: "Яндекс Метрика или GA4 при наличии доступа и настроенных целей: органические переходы, действия на сайте и обращения." },
    ],
    metricsTitle: "На какие цифры смотрим",
    metrics: [
      { title: "Видимость", text: "Проиндексированные страницы, показы, клики, CTR и запросы по важным URL." },
      { title: "Качество трафика", text: "Органические визиты, целевые действия и обращения, которые действительно подходят бизнесу." },
      { title: "Техническое качество", text: "Ошибки обхода, мобильная пригодность, LCP, INP и CLS по полевым данным, когда их достаточно." },
    ],
    proofLabel: "ИЗ РЕАЛЬНОГО ПРОЕКТА",
    proofTitle: "КЭМЗ: каталог, который можно искать по моделям",
    proofText: "Для завода пересобрал структуру каталога: у категорий и моделей появились отдельные страницы с характеристиками, метаданными и понятным путём к заявке. В кейсе показаны реальные экраны и решения.",
    proofLink: "Смотреть кейс КЭМЗ",
    footnote: "Для анализа данных нужны доступы к счётчикам и кабинетам вебмастеров. Если их нет, сначала проверяю публичную часть сайта и помогаю настроить измерение.",
  } : {
    kicker: "03 / FROM PLAN TO ACTION",
    title: "An audit you can act on",
    intro: "The outcome is a prioritized list of pages and changes, with a way to check progress. Implementation is scoped separately: we can start with an audit or continue through publication and monitoring.",
    deliverables: [
      { label: "01 / DEMAND MAP", title: "Pages to create", text: "Query groups, search intent and a destination for each: service page, category, case study or useful article." },
      { label: "02 / FIX QUEUE", title: "What to fix first", text: "Affected URLs, the cause, its effect on discovery or inquiries, and an actionable change. Technical defects are separated from content hypotheses." },
      { label: "03 / CONTENT PLAN", title: "What to publish", text: "Topics grounded in customer questions and real business material, each with a goal, target page and evidence to gather." },
    ],
    researchLabel: "HOW I STUDY THE MARKET",
    researchTitle: "Compare answers to the buyer's task, not just rankings",
    researchIntro: "For each important intent, I inspect Google and Yandex results in the relevant market: which pages appear, what they offer, and how they support their claims. I then compare that with your site and what your business can actually prove.",
    researchCaption: "An illustration of the research process; project comparisons use observed search results.",
    researchColumns: ["Layer", "What I record", "Decision for your site"],
    researchRows: [
      ["Query and results", "Intent, result types, region and device; Google and Yandex separately.", "Choose a service page, category, case study or direct answer."],
      ["Competitor pages", "Offer, range, structure, proof, pricing and path to inquiry.", "Show a real difference where buyers compare providers."],
      ["Your pages", "Existing URLs, missing answers, supporting evidence and internal links.", "Keep, improve or create a page based on business value."],
    ],
    editorialLabel: "EDITORIAL PLAN",
    editorialTitle: "Articles from your work, not someone else's copy",
    editorialIntro: "The SEO plan includes topics, target pages and a publishing calendar. An example cadence is 8 articles a month, 2 per week. We set the pace based on available evidence and expert time; volume alone is not a result.",
    editorialCadence: ["8 articles", "4 weeks", "2 per week"],
    editorialSource: "Topics come from search demand, sales questions, competitor results and your team's own material. For each article I record the reader's task, the expert, the evidence and the next useful page. Writing and publishing are scoped separately from the plan.",
    editorialAvoidLabel: "AVOID",
    editorialAvoidTitle: "Rewriting for volume",
    editorialAvoidText: "We do not paraphrase other people's articles or fill a calendar without facts about your product. That gives a buyer no reason to choose you.",
    editorialDoLabel: "DO INSTEAD",
    editorialDoTitle: "Show first-hand work",
    editorialDoText: "Explain the problem, decisions, screens, constraints and outcomes with your expert. That answers the reader and makes the basis for your answer clear to search systems.",
    geoLabel: "SEO / AEO / GEO",
    geoTitle: "One expertise, three ways to be found",
    geoIntro: "Traditional results, direct answers and AI search are different paths to the same useful source. Each needs an accessible page, a clear answer and evidence from your work.",
    geoSteps: [
      { number: "SEO", title: "Traditional search", text: "Group demand by intent, fix indexing issues, create the right pages and internal links. Track impressions, clicks and qualified inquiries." },
      { number: "AEO", title: "Direct answers", text: "Identify real buyer questions, answer them briefly up front, then explain conditions and examples. Check clarity for readers and search results." },
      { number: "GEO", title: "AI search", text: "Keep sources crawlable, add authorship and verifiable case studies; monitor citations and referrals where services expose that data." },
    ],
    geoNote: "No one can promise an AI citation or a ranking. I check visibility for important questions and connect it to visits, on-site actions and qualified inquiries.",
    toolsTitle: "Tools chosen for the question",
    tools: [
      { title: "Search platforms", text: "Google Search Console, Yandex Webmaster and, where useful, Bing Webmaster for indexing, queries, pages and crawl issues." },
      { title: "Technical checks", text: "Site crawl, server responses, canonicals, robots.txt, sitemap, internal links and mobile layout; PageSpeed Insights and Lighthouse for speed." },
      { title: "Behavior and leads", text: "Yandex Metrica or GA4 when access and goals are configured: organic visits, on-site actions and inquiries." },
    ],
    metricsTitle: "How we track progress",
    metrics: [
      { title: "Visibility", text: "Indexed pages, impressions, clicks, CTR and queries for priority URLs." },
      { title: "Traffic quality", text: "Organic visits, goal completions and inquiries that fit the business." },
      { title: "Technical quality", text: "Crawl errors, mobile usability, and LCP, INP and CLS field data when available." },
    ],
    proofLabel: "REAL PROJECT",
    proofTitle: "KEMZ: a catalog searchable by model",
    proofText: "I rebuilt the factory catalog structure with separate category and model pages, product specifications, metadata and a clear route to inquiry. The case study shows real screens and decisions.",
    proofLink: "View the KEMZ case",
    footnote: "Private search and analytics data requires access. Without it, I start with the public site and help set up measurement.",
  };

  return <section className={styles.seoDetails} aria-labelledby="seo-details-title"><div className="shell">
    <div className={styles.seoDetailsIntro}><div><p className={styles.kicker}>{content.kicker}</p><h2 id="seo-details-title">{content.title}</h2></div><p>{content.intro}</p></div>
    <div className={styles.seoDeliverables}>{content.deliverables.map((item) => <article key={item.label}><span>{item.label}</span><h3>{item.title}</h3><p>{item.text}</p></article>)}</div>
    <div className={styles.seoResearch}>
      <div className={styles.seoResearchIntro}><div><span>{content.researchLabel}</span><h3>{content.researchTitle}</h3><p>{content.researchIntro}</p></div><figure><Image src="/service-art/seo-research.webp" alt={isRu ? "Маскот изучает страницы в поисковой выдаче и группирует запросы по задачам" : "Mascot studies search results and groups queries by user task"} width={1672} height={941} sizes="(max-width: 900px) 100vw, 48vw" /><figcaption>{content.researchCaption}</figcaption></figure></div>
      <div className={styles.seoWorksheet} role="table" aria-label={isRu ? "Как исследование конкурентов превращается в план страниц" : "How competitor research becomes a page plan"}>
        <div className={styles.seoWorksheetHead} role="row">{content.researchColumns.map((column) => <span role="columnheader" key={column}>{column}</span>)}</div>
        {content.researchRows.map((row) => <div className={styles.seoWorksheetRow} role="row" key={row[0]}>{row.map((cell, index) => <div role="cell" key={index}><span className={styles.seoWorksheetMobileLabel}>{content.researchColumns[index]}</span>{cell}</div>)}</div>)}
      </div>
    </div>
    <div className={styles.seoProof}><div><span>{content.proofLabel}</span><h3>{content.proofTitle}</h3><p>{content.proofText}</p></div><Link href={isRu ? "/ru/work/aokemz" : "/en/work/aokemz"}>{content.proofLink} ↗</Link></div>
    <div className={styles.seoEditorial}>
      <div className={styles.seoEditorialHead}><div><span>{content.editorialLabel}</span><h3>{content.editorialTitle}</h3></div><p>{content.editorialIntro}</p></div>
      <div className={styles.seoEditorialCadence} aria-label={isRu ? "Пример плана публикаций" : "Example publishing schedule"}>{content.editorialCadence.map((item, index) => <span key={item}>{item}{index < content.editorialCadence.length - 1 && <b aria-hidden="true">/</b>}</span>)}</div>
      <p className={styles.seoEditorialSource}>{content.editorialSource}</p>
      <div className={styles.seoEditorialCards}>
        <article className={styles.seoEditorialAvoid}><div className={styles.seoEditorialImage}><Image src="/service-art/seo-no-rewrites.webp" alt={isRu ? "Маскот скрестил руки перед стопкой однотипных переписанных статей" : "Mascot crosses his arms in front of a stack of rewritten articles"} fill sizes="(max-width: 700px) 90vw, 40vw" /></div><div><span>{content.editorialAvoidLabel}</span><h4>{content.editorialAvoidTitle}</h4><p>{content.editorialAvoidText}</p></div></article>
        <article className={styles.seoEditorialDo}><div className={styles.seoEditorialImage}><Image src="/service-art/seo-original-work.webp" alt={isRu ? "Маскот показывает статью-кейс с собственными материалами и даёт знак одобрения" : "Mascot approves an article based on original case material"} fill sizes="(max-width: 700px) 90vw, 40vw" /></div><div><span>{content.editorialDoLabel}</span><h4>{content.editorialDoTitle}</h4><p>{content.editorialDoText}</p></div></article>
      </div>
    </div>
    <div className={styles.seoGeo}>
      <div className={styles.seoGeoIntro}><span>{content.geoLabel}</span><h3>{content.geoTitle}</h3><p>{content.geoIntro}</p></div>
      <div className={styles.seoGeoSteps}>{content.geoSteps.map((step) => <article key={step.number}><span>{step.number}</span><h4>{step.title}</h4><p>{step.text}</p></article>)}</div>
      <p className={styles.seoGeoNote}>{content.geoNote}</p>
    </div>
    <div className={styles.seoEvidenceGrid}>
      <div><h3>{content.toolsTitle}</h3>{content.tools.map((item) => <div className={styles.seoEvidenceRow} key={item.title}><h4>{item.title}</h4><p>{item.text}</p></div>)}</div>
      <div><h3>{content.metricsTitle}</h3>{content.metrics.map((item) => <div className={styles.seoEvidenceRow} key={item.title}><h4>{item.title}</h4><p>{item.text}</p></div>)}</div>
    </div>
    <p className={styles.seoDetailsFootnote}>{content.footnote}</p>
  </div></section>;
}

function SeoDiagram({ isRu }: { isRu: boolean }) {
  const cards = isRu ? ["Услуга", "Кейс", "Статья"] : ["Service", "Case study", "Article"];
  return <div className={styles.seoDiagram} aria-label={isRu ? "Схема: поисковые намерения ведут на разные типы страниц" : "Search intents lead to different page types"}><span>{isRu ? "ЗАПРОС ЧЕЛОВЕКА" : "USER QUERY"}</span><div className={styles.seoCore}>?</div><div className={styles.seoBranches}>{cards.map((card) => <div key={card}>{card}<span>↗</span></div>)}</div></div>;
}

function AiDiagram({ isRu }: { isRu: boolean }) {
  return <div className={styles.aiDiagram} aria-label={isRu ? "Схема RAG: документы, поиск, ответ со ссылкой на источник" : "RAG flow: documents, retrieval, sourced answer"}>
    <div><span>01 / DATA</span><strong>{isRu ? "Ваши материалы" : "Your content"}</strong><small>PDF · FAQ · CMS</small></div>
    <span className={styles.aiArrow}>→</span><div><span>02 / SEARCH</span><strong>{isRu ? "Поиск смысла" : "Retrieval"}</strong><small>RAG · API</small></div>
    <span className={styles.aiArrow}>→</span><div><span>03 / ANSWER</span><strong>{isRu ? "Ответ с источником" : "Sourced answer"}</strong><small>↗ {isRu ? "Проверить" : "Verify"}</small></div>
  </div>;
}

function DesignDiagram({ isRu }: { isRu: boolean }) {
  return <div className={styles.designDiagram} aria-label={isRu ? "Схема редизайна: структура, визуальная система, готовый интерфейс" : "Redesign flow: structure, design system, finished interface"}>
    <div className={styles.designWire}><span>{isRu ? "СТРУКТУРА" : "STRUCTURE"}</span><i/><i/><i/></div>
    <span className={styles.designArrow}>→</span>
    <div className={styles.designFinal}><span>{isRu ? "ВАШ БРЕНД" : "YOUR BRAND"}</span><b>{isRu ? "Своя история" : "Your story"}</b><em/></div>
  </div>;
}

function LandingDetails({ isRu }: { isRu: boolean }) {
  return <section className={styles.landingDetails} aria-labelledby="landing-detail-title"><div className="shell"><div className={styles.sectionHead}><p className={styles.kicker}>TILDA / WORDPRESS</p><h2 id="landing-detail-title">{isRu ? "Выйти за пределы шаблона можно без бюджета студии" : "Step beyond templates without an agency budget"}</h2><p>{isRu ? "Стартовая версия концентрируется на главном предложении и заявке. Когда бизнесу понадобятся новые страницы, дизайн и логика не упрутся в готовую тему." : "The starter version focuses on the offer and inquiry. As the business grows, its design and logic are not trapped in a ready-made theme."}</p></div>
    <div className={styles.comicGrid}><figure><Image src="/projects/vne-shablona/story-template.webp" alt={isRu ? "Комикс: идея бизнеса не помещается в шаблон" : "Comic: a business idea outgrows a template"} width={570} height={631} sizes="(max-width: 650px) 100vw, 40vw"/><figcaption>{isRu ? "Не подгонять идею под блоки конструктора" : "Don't force an idea into builder blocks"}</figcaption></figure><figure><Image src="/projects/vne-shablona/story-plugins.webp" alt={isRu ? "Комикс: механик среди плагинов WordPress" : "Comic: mechanic among WordPress plugins"} width={586} height={631} sizes="(max-width: 650px) 100vw, 40vw"/><figcaption>{isRu ? "Не собирать простую задачу из десятка плагинов" : "Don't solve a simple task with a dozen plugins"}</figcaption></figure></div>
  </div></section>;
}

function CommerceDetails({ isRu }: { isRu: boolean }) {
  const groups = [
    {
      id: "01", title: isRu ? "Оплата и возвраты" : "Payments and refunds",
      text: isRu ? "Подключаю способы оплаты под географию продаж: российские карты и СБП, международные платежи, чеки и возвраты. Покупатель видит понятный сценарий, а магазин получает корректный статус заказа." : "Payment providers can match your sales geography, with a clear checkout, order status, receipts and refunds.",
      items: [
        { name: "ЮKassa", logoSrc: "/integrations/yookassa.svg", tone: "yoo", href: "https://medusajs.com/integrations/%40gorgomedusa-integration" },
        { name: "Т-Касса", mark: "Т", tone: "tbank", href: "https://medusajs.com/integrations/t-kassa" },
        { name: "Robokassa", mark: "R", tone: "robo", href: "https://medusajs.com/integrations/robokassa/" },
        { name: "Stripe", icon: siStripe, tone: "stripe", href: "https://docs.medusajs.com/resources/commerce-modules/payment/payment-provider/stripe" },
        { name: "PayPal", icon: siPaypal, tone: "paypal", href: "https://medusajs.com/integrations" },
      ],
    },
    {
      id: "02", title: isRu ? "Доставка и выполнение заказов" : "Shipping and fulfillment",
      text: isRu ? "Рассчитываю варианты доставки в корзине, передаю заказ службе и возвращаю покупателю статус и трек-номер. Через ApiShip можно связать магазин с СДЭК, Яндекс Доставкой, Почтой России и другими перевозчиками; для международных сценариев есть ShipStation." : "Show delivery options at checkout, send orders to a carrier and return tracking details. ApiShip covers Russian carriers; ShipStation serves international flows.",
      items: [
        { name: "ApiShip", mark: "A", tone: "api", href: "https://medusajs.com/integrations/apiship" },
        { name: "СДЭК", mark: "С", tone: "cdek", href: "https://medusajs.com/integrations/apiship" },
        { name: "Яндекс Доставка", mark: "Я", tone: "yandex", href: "https://medusajs.com/integrations/apiship" },
        { name: "Почта России", mark: "✉", tone: "post", href: "https://medusajs.com/integrations/apiship" },
        { name: "ShipStation", mark: "S", tone: "ship", href: "https://docs.medusajs.com/resources/integrations/guides/shipstation" },
      ],
    },
    {
      id: "03", title: isRu ? "Поиск, письма и маркетинг" : "Search, email and marketing",
      text: isRu ? "Подключаю быстрый поиск по ассортименту, письма о заказах, сегментацию и рассылки. Это помогает человеку найти товар, получить подтверждение покупки и вернуться за повторным заказом." : "Fast catalog search, order emails and marketing flows help shoppers find products, receive updates and return.",
      items: [
        { name: "Meilisearch", icon: siMeilisearch, tone: "meili", href: "https://medusajs.com/integrations/%40rokmoharmedusa-plugin-meilisearch" },
        { name: "Resend", icon: siResend, tone: "resend", href: "https://docs.medusajs.com/resources/integrations/guides/resend" },
        { name: "Mailchimp", icon: siMailchimp, tone: "mailchimp", href: "https://docs.medusajs.com/resources/integrations/guides/mailchimp" },
      ],
    },
  ];
  return <section className={styles.commerce} aria-labelledby="commerce-title"><div className="shell"><div className={styles.sectionHead}><p className={styles.kicker}>MEDUSA / COMMERCE</p><h2 id="commerce-title">{isRu ? "Современная торговля без зоопарка плагинов" : "Modern commerce without a plugin maze"}</h2><p>{isRu ? "Строю магазин на современной архитектуре: Medusa отвечает за торговые процессы, а витрина создаётся под ваш бренд и ваших покупателей." : "Medusa powers the commerce logic while the storefront is designed around your brand and customers."}</p></div>
    <div className={styles.commerceScene}><div><span>{isRu ? "СВОЯ ВИТРИНА" : "YOUR OWN STOREFRONT"}</span><strong>{isRu ? "Не подгоняю ваш бизнес под чужую тему" : "No generic theme dictates your storefront"}</strong><p>{isRu ? "Собираю путь к покупке вокруг товара, бренда и привычек ваших клиентов. Торговую логику и интеграции держит Medusa." : "The buying journey follows your products, brand and customers. Medusa powers the commerce logic and integrations."}</p></div><Image src="/service-art/store-commerce-scene.webp" alt={isRu ? "Маскот собирает индивидуальную витрину магазина одежды" : "Mascot builds a distinctive fashion storefront"} width={1254} height={1254} sizes="(max-width: 650px) 100vw, 46vw" /></div>
    <div className={styles.compareGrid}>
      <article><h3>Medusa.js</h3><p>{isRu ? "Свободная витрина, модульная торговая логика и API для интеграций. Дизайн и путь к покупке подстраиваются под бизнес, а не под возможности темы." : "A distinct storefront, modular commerce logic and APIs for integrations. The purchase journey follows the business, not a theme."}</p></article>
      <article><h3>WooCommerce</h3><p>{isRu ? "Магазин внутри WordPress часто обрастает темами и плагинами. Каждое нестандартное требование добавляет зависимость; я предпочитаю управляемую архитектуру без этого слоя." : "A WordPress store can accumulate themes and plugins. Custom requirements add dependencies; I prefer an architecture designed for the job."}</p></article>
      <article><h3>1С-Битрикс</h3><p>{isRu ? "Мощная, но тяжёлая платформа со своим устройством и шаблонными привычками. Для индивидуальной витрины Medusa даёт более современную и гибкую отправную точку." : "A large platform with its own conventions. For a custom storefront, Medusa offers a more flexible starting point."}</p></article>
    </div>
    <div className={styles.integrationIntro}><p className={styles.kicker}>{isRu ? "ПЛАТЕЖИ / ДОСТАВКА / ПОИСК" : "PAYMENTS / SHIPPING / SEARCH"}</p><h3>{isRu ? "Подключения, из которых складывается работающий магазин" : "The integrations behind a working store"}</h3><p>{isRu ? "Состав выбираем под ассортимент, географию продаж и процессы команды. Medusa даёт основу, а нужные сервисы связываю в единый путь от поиска товара до повторной покупки." : "We choose providers for your catalog, markets and operations, then connect them into one purchase journey."}</p></div>
    <div className={styles.integrationGroups}>{groups.map((group) => <article key={group.id} className={styles.integrationGroup}><div className={styles.integrationGroupHeading}><span>{group.id} / 03</span><h4>{group.title}</h4><p>{group.text}</p></div><div className={styles.integrationMarks}>{group.items.map((item) => <a key={item.name} href={item.href} target="_blank" rel="noreferrer" className={`${styles.integrationMark} ${styles[`integrationMark_${item.tone}`]}`} aria-label={`${item.name} — ${isRu ? "интеграция Medusa" : "Medusa integration"}`}><span className={styles.integrationLogo}>{"logoSrc" in item && item.logoSrc ? <Image src={item.logoSrc} alt="" width={110} height={27} /> : "icon" in item && item.icon ? <svg viewBox="0 0 24 24" aria-hidden="true"><path d={item.icon.path} fill="currentColor"/></svg> : item.mark}</span><span>{item.name}</span><span aria-hidden="true">↗</span></a>)}</div></article>)}</div>
    <p className={styles.integrationFootnote}>{isRu ? "СДЭК, Яндекс Доставка и Почта России показаны как перевозчики через ApiShip. Доступность, тарифы и условия подключения проверяю под конкретный проект." : "Russian carriers are connected through ApiShip. Availability and terms are checked for each project."}</p>
    <div className={styles.commerceSeo}><div><span>CATALOG / SEO</span><h3>{isRu ? "Каталог должен приводить не только к корзине, но и из поиска" : "A catalog should work in search, too"}</h3></div><p>{isRu ? "Проектирую категории, страницы товаров, фильтры, хлебные крошки, канонические адреса и метаданные. Отдельно решаю, какие комбинации фильтров полезны поиску, а какие создают дубли. Скорость витрины, разметка товара, изображения и мобильный путь к заказу входят в план запуска — без обещаний случайного места в выдаче." : "I plan categories, product pages, filters, breadcrumbs, canonical URLs and metadata. We decide which filter combinations deserve indexable pages and which would create duplicates."}</p></div>
    <div className={styles.commerceExamples}><span>{isRu ? "Магазины на Medusa в мире" : "Stores built with Medusa"}</span><p>{isRu ? "Tekla и Matt Sleeps — примеры того, насколько разной может быть витрина на одной торговой платформе." : "Tekla and Matt Sleeps show how different storefronts can be on one commerce platform."}</p><div className={styles.sourceLinks}><a href="https://medusajs.com/blog/tekla" target="_blank" rel="noreferrer">Tekla ↗</a><a href="https://medusajs.com/blog/matt-sleeps" target="_blank" rel="noreferrer">Matt Sleeps ↗</a></div></div>
  </div></section>;
}
