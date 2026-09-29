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
  return {
    title: copy.seoTitle, description: copy.seoDescription,
    alternates: { canonical: path, languages: { ru: `/ru/services/${slug}`, en: `/en/services/${slug}` } },
    openGraph: { type: "website", url: path, title: copy.seoTitle, description: copy.seoDescription, ...(copy.image ? { images: [copy.image] } : {}) },
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
            {!artwork && <div className={styles.visualBottom}><span>{copy.exampleLabel}</span><Image src="/mascot/mascot-contact.webp" alt="" width={76} height={76} /></div>}
          </div>
        </div>
        <div className={`shell ${styles.heroNote}`}>{copy.note}</div>
      </section>

      <section className={`${styles.included} ${route === "landing-pages" ? styles.includedLanding : ""}`} aria-labelledby="included-title"><div className="shell">
        <div className={styles.sectionHead}><p className={styles.kicker}>01 / {isRu ? "СОСТАВ РАБОТ" : "SCOPE"}</p><h2 id="included-title">{copy.includedTitle}</h2></div>
        <div className={styles.includedGrid}>{copy.included.map((item, index) => <article key={item.title} className="reveal-item"><span>0{index + 1}</span>{route === "landing-pages" && <div className={styles.includedDetail} aria-hidden="true"><Image src={index === 0 ? "/service-art/landing-workshop-wide.webp" : index === 1 ? "/service-art/design-redesign.webp" : "/service-art/seo-positioning.webp"} alt="" fill sizes="(max-width: 650px) 80vw, 28vw" /></div>}<h3>{item.title}</h3><p>{item.text}</p></article>)}</div>
      </div></section>

      <section className={styles.example} aria-labelledby="example-title"><div className={`shell ${styles.exampleGrid}`}>
        <div className={styles.exampleCopy}><h2 id="example-title">{copy.exampleTitle}</h2><p>{copy.exampleText}</p>{caseHref && <Link href={caseHref} className={styles.inlineLink}>{copy.exampleCta} ↗</Link>}</div>
        <div className={styles.exampleArt}>
          {copy.image ? <Image src={copy.image} alt={copy.imageAlt || ""} fill sizes="(max-width: 850px) 100vw, 50vw" /> : route === "online-stores" ? <StoreVisual isRu={isRu} compact /> : <SeoDiagram isRu={isRu} />}
        </div>
      </div></section>

      {(route === "design-redesign" || route === "landing-pages") && <ConceptGallery isRu={isRu} compact={route === "landing-pages"} />}

      {route === "online-stores" && <CommerceDetails isRu={isRu} />}
      {route === "landing-pages" && <LandingDetails isRu={isRu} />}

      <section className={styles.process} aria-labelledby="process-title"><div className="shell">
        <div className={styles.sectionHead}><p className={styles.kicker}>03 / {isRu ? "ПРОЦЕСС" : "PROCESS"}</p><h2 id="process-title">{copy.processTitle}</h2></div>
        <ol className={styles.processGrid}>{copy.process.map((item, index) => <li key={item.title}><span>0{index + 1}</span><h3>{item.title}</h3><p>{item.text}</p></li>)}</ol>
      </div></section>

      <section className={styles.faq} aria-labelledby="faq-title"><div className={`shell ${styles.faqGrid}`}><div><p className={styles.kicker}>04 / FAQ</p><h2 id="faq-title">{isRu ? "Частые вопросы" : "Common questions"}</h2></div><FaqList items={[...copy.faq, ...serviceFaqExtra[isRu ? "ru" : "en"][route]]} /></div></section>

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
