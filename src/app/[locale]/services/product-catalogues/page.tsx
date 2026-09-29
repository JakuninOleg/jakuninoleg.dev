import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Reveal } from "@/components/Reveal";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ServiceLeadForm } from "@/components/ServiceLeadForm";
import { BlogContextLink } from "@/components/BlogContextLink";
import { serviceFaqExtra } from "@/content/service-faq-extra";
import { FaqList } from "../[slug]/FaqList";
import { serviceArt } from "@/content/service-art";
import { serviceTimelines } from "@/content/project-estimator";
import styles from "./page.module.css";

type Props = { params: Promise<{ locale: string }> };
type Item = { title: string; text: string };

export function generateStaticParams() {
  return [{ locale: "ru" }, { locale: "en" }];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "CatalogService" });
  const path = `/${locale}/services/product-catalogues`;
  return {
    title: t("seoTitle"),
    description: t("seoDescription"),
    alternates: { canonical: path, languages: { ru: "/ru/services/product-catalogues", en: "/en/services/product-catalogues" } },
    openGraph: { type: "website", url: path, title: t("seoTitle"), description: t("seoDescription"), images: ["/projects/aokemz-v2.webp"] },
  };
}

export default async function ProductCataloguesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("CatalogService");
  const n = await getTranslations("Nav");
  const routeSteps = t.raw("routeSteps") as Item[];
  const systemItems = t.raw("systemItems") as Item[];
  const processSteps = t.raw("processSteps") as Item[];

  return (
    <>
      <a href="#main" className="skip-link">{n("skipToContent")}</a>
      <Header />
      <Reveal />
      <main id="main" className={`${styles.page} flex-1`}>
        <section className={styles.hero} aria-labelledby="catalog-title">
          <div className={`shell ${styles.heroInner}`}>
            <Breadcrumbs locale={locale} items={[{ label: locale === "en" ? "Services" : "Услуги", href: `/${locale}/services` }, { label: locale === "en" ? "Product catalog websites" : "Сайты-каталоги" }]} />
            <p className={`${styles.kicker} ${styles.heroKicker}`}>{t("eyebrow")}</p>
            <h1 id="catalog-title">{t("title")}</h1>
            <div className={styles.heroGrid}>
              <div className={styles.heroCopy}>
                <p className={styles.heroLead}>{t("lead")}</p>
                <div className={styles.actions}><a href="#service-contact" className={styles.primary}>{t("primaryCta")} ↗</a><Link href={`/${locale}/calculator`} className={styles.secondary}>{locale === "en" ? "Estimate cost" : "Рассчитать стоимость"} →</Link><Link href={`/${locale}/work/aokemz`} className={styles.secondary}>{t("caseCta")} →</Link></div>
                <div className={styles.price}><strong>{t("price")}</strong><span>{t("priceNote")}</span></div>
                <p className={styles.timeline}>{serviceTimelines["product-catalogues"][locale === "en" ? "en" : "ru"]}</p>
              </div>
              <div className={styles.heroArt}><Image src="/service-art/catalog-workshop-v2.webp" alt={locale === "en" ? "The mascot arranges an industrial motor, chair, lamp and headphones in a custom product catalog" : "Маскот собирает каталог разных товаров: оборудование, мебель, свет и электроника"} fill sizes="(max-width: 900px) 100vw, 58vw" priority /></div>
            </div>
            <div className={styles.heroFoot}><span>{t("heroNote")}</span><span>01 — 04</span></div>
          </div>
        </section>

        <section className={styles.route} aria-labelledby="catalog-route-title">
          <div className="shell">
            <div className={styles.sectionHead}><div><p className={styles.kicker}>{t("routeKicker")}</p><h2 id="catalog-route-title">{t("routeTitle")}</h2></div><p>{t("routeLead")}</p></div>
            <div className={styles.routeStory}>
              <div className={styles.routeArt}><Image src="/service-art/catalog-search-scene.webp" alt={locale === "en" ? "Mascot helps choose products using a magnifying glass" : "Маскот помогает выбрать товар среди оборудования, мебели и света"} fill sizes="(max-width: 900px) 100vw, 42vw" /></div>
              <ol className={styles.routeGrid}>{routeSteps.map((step, index) => <li key={step.title}><span>0{index + 1}</span><div><h3>{step.title}</h3><p>{step.text}</p></div></li>)}</ol>
            </div>
          </div>
        </section>

        <section className={styles.system} aria-labelledby="catalog-system-title">
          <div className={`shell ${styles.systemInner}`}>
            <div className={styles.systemHead}><p className={styles.kicker}>{t("systemKicker")}</p><h2 id="catalog-system-title">{t("systemTitle")}</h2><p>{t("systemLead")}</p><div className={styles.systemArt}><Image src="/service-art/catalog-build-scene-v2.webp" alt={locale === "en" ? "Mascot arranges products and materials into a catalog" : "Маскот собирает товары и материалы в аккуратный каталог"} fill sizes="(max-width: 900px) 100vw, 45vw" /></div></div>
            <div className={styles.systemList}>{systemItems.map((item, index) => <article key={item.title}><span>0{index + 1}</span><div><h3>{item.title}</h3><p>{item.text}</p></div></article>)}</div>
          </div>
        </section>

        <section className={styles.platform} aria-labelledby="catalog-platform-title"><div className={`shell ${styles.platformInner}`}><div className={styles.platformVisual}><Image src="/service-art/catalog-custom-scene-v2.webp" alt={locale === "en" ? "Mascot builds a custom product display instead of using generic templates" : "Маскот собирает собственную витрину вместо типового шаблона"} fill sizes="(max-width: 900px) 100vw, 45vw" /></div><div className={styles.platformCopy}><p className={styles.kicker}>CMS / COMMERCE</p><h2 id="catalog-platform-title">{t("platformTitle")}</h2><p>{t("platformText")}</p><Link href={`/${locale}/services/online-stores`}>{t("platformLink")} ↗</Link></div></div></section>

        <section className={styles.process} aria-labelledby="catalog-process-title"><div className="shell"><div className={styles.processHead}><div><p className={styles.kicker}>{t("processKicker")}</p><h2 id="catalog-process-title">{t("processTitle")}</h2></div><p>{locale === "en" ? "I turn the product range into a clear structure, build the interface, fill the first sections and prepare the team to manage it." : "Разбираю ассортимент, продумываю структуру, собираю страницы и передаю команде понятный инструмент для работы."}</p></div><ol>{processSteps.map((step, index) => <li key={step.title}><span>0{index + 1}</span><h3>{step.title}</h3><p>{step.text}</p></li>)}</ol><div className={styles.processImage}><Image src="/service-art/catalog-launch-scene.webp" alt="" fill sizes="(max-width: 900px) 100vw, 60vw" /><span>{locale === "en" ? "YOUR PRODUCTS / ONE SYSTEM" : "ВАШИ ТОВАРЫ / ОДНА СИСТЕМА"}</span></div></div></section>

        <section className={styles.proof} aria-labelledby="catalog-proof-title"><div className={`shell ${styles.proofInner}`}>
          <div className={styles.proofCopy}><p className={styles.kicker}>{t("proofKicker")}</p><h2 id="catalog-proof-title">{t("proofTitle")}</h2><p>{t("proofText")}</p><div><Link href={`/${locale}/work/aokemz`}>{t("proofLink")} ↗</Link><a href="https://aokemz.ru/" target="_blank" rel="noreferrer">{t("proofSite")} ↗</a></div></div>
          <Link href={`/${locale}/work/aokemz`} className={styles.proofVisual} aria-label={t("proofLink")}><div className={styles.proofBrowser}><div className={styles.proofBrowserBar}><span>● ● ●</span><span>aokemz.ru</span></div><Image src="/projects/aokemz-v2.webp" alt={t("proofTitle")} width={1265} height={712} sizes="(max-width: 800px) 100vw, 50vw" unoptimized /></div></Link>
        </div></section>

        <section className={styles.faq} aria-labelledby="catalog-faq-title"><div className={`shell ${styles.faqInner}`}><div><p className={styles.kicker}>FAQ</p><h2 id="catalog-faq-title">{locale === "en" ? "Catalog questions" : "Частые вопросы о сайте-каталоге"}</h2></div><FaqList items={serviceFaqExtra[locale === "en" ? "en" : "ru"]["product-catalogues"]} /></div></section>

        <nav className={styles.related} aria-label={locale === "en" ? "Other website formats" : "Другие форматы сайтов"}><div className="shell"><p className={styles.kicker}>{locale === "en" ? "ANOTHER FORMAT" : "ДРУГОЙ ФОРМАТ"}</p><h2>{locale === "en" ? "What if a catalog is not enough?" : "Если каталога недостаточно"}</h2><p>{locale === "en" ? "One focused offer, online checkout or a custom workflow each call for a different kind of site." : "Для одного предложения подойдёт лендинг, для покупки онлайн — магазин, для личного кабинета — приложение."}</p><div className={styles.relatedLinks}>{(["landing-pages", "online-stores", "web-applications"] as const).map((item) => <Link key={item} href={`/${locale}/services/${item}`}><span>{item === "landing-pages" ? (locale === "en" ? "Landing pages" : "Сайты-лендинги") : item === "online-stores" ? (locale === "en" ? "Online stores" : "Интернет-магазины") : (locale === "en" ? "Web applications" : "Веб-приложения")}</span><Image src={serviceArt[item].src} alt="" width={320} height={220} sizes="(max-width: 650px) 45vw, 20vw" /><b aria-hidden="true">↗</b></Link>)}</div></div></nav>

        <BlogContextLink locale={locale} context="catalog" />
        <ServiceLeadForm locale={locale} service={locale === "en" ? "Product catalog website" : "Сайт-каталог"} title={t("finalTitle")} lead={t("finalText")} />
      </main>
      <Footer />
    </>
  );
}
