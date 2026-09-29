import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { serviceArt } from "@/content/service-art";
import { serviceRoutes } from "@/content/service-routes";
import { serviceTimelines } from "@/content/project-estimator";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ServiceLeadForm } from "@/components/ServiceLeadForm";
import styles from "./page.module.css";

type Props = { params: Promise<{ locale: string }> };
type Service = { tag: string; title: string; text: string };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ServiceDirectory" });
  const path = `/${locale}/services`;
  return {
    title: t("seoTitle"),
    description: t("seoDescription"),
    alternates: {
      canonical: path,
      languages: { ru: "/ru/services", en: "/en/services" },
    },
    openGraph: { type: "website", url: path, title: t("seoTitle"), description: t("seoDescription") },
  };
}

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("ServiceDirectory");
  const s = await getTranslations("Services");
  const n = await getTranslations("Nav");
  const services = s.raw("items") as Service[];
  const outcomes = t.raw("outcomes") as string[];
  const steps = t.raw("steps") as { title: string; text: string }[];
  const advantages = t.raw("advantages") as { title: string; text: string }[];

  return (
    <>
      <a href="#main" className="skip-link">{n("skipToContent")}</a>
      <Header />
      <Reveal />
      <main id="main" className={`${styles.page} flex-1`}>
        <section className={styles.hero} aria-labelledby="services-title">
          <div className={`shell ${styles.heroInner}`}>
            <div className={styles.heroCopy}>
              <Breadcrumbs locale={locale} items={[{ label: locale === "en" ? "Services" : "Услуги" }]} />
              <p className={styles.kicker}>{t("kicker")}</p>
              <h1 id="services-title">{t("title")}</h1>
              <p className={styles.lead}>{t("lead")}</p>
              <div className={styles.heroActions}>
                <a href="#service-contact" className={styles.primary}>{t("discuss")} <span aria-hidden>↗</span></a>
                <Link href={`/${locale}/calculator`} className={styles.textLink}>{locale === "en" ? "Estimate cost and timeline" : "Рассчитать стоимость и срок"} <span aria-hidden>→</span></Link>
                <Link href={`/${locale}/work`} className={styles.textLink}>{t("workLink")} <span aria-hidden>→</span></Link>
              </div>
            </div>
            <div className={styles.heroGallery} aria-label={t("galleryLabel")}>
              <Link href={`/${locale}/work/aokemz`} className={`${styles.showcase} ${styles.showcaseMain}`}>
                <div className={styles.showcaseImage}>
                  <Image src="/projects/aokemz-v2.webp" alt={t("kemzAlt")} fill sizes="(max-width: 700px) 100vw, 52vw" priority />
                </div>
                <span className={styles.showcaseCaption}><strong>КЭМЗ</strong><span>{t("kemzCaption")}</span><span aria-hidden>↗</span></span>
              </Link>
              <Link href={`/${locale}/work/vne-shablona`} className={styles.showcase}>
                <div className={styles.showcaseImage}>
                  <Image src="/projects/vne-shablona/desktop-actual.webp" alt={t("vneAlt")} fill sizes="(max-width: 700px) 50vw, 26vw" />
                </div>
                <span className={styles.showcaseCaption}><strong>ВНЕ ШАБЛОНА</strong><span>{t("vneCaption")}</span><span aria-hidden>↗</span></span>
              </Link>
              <Link href={`/${locale}/work/oj-cms`} className={styles.showcase}>
                <div className={styles.showcaseImage}>
                  <Image src="/projects/oj-cms-wide.webp" alt={t("cmsAlt")} fill sizes="(max-width: 700px) 50vw, 26vw" />
                </div>
                <span className={styles.showcaseCaption}><strong>OJ CMS</strong><span>{t("cmsCaption")}</span><span aria-hidden>↗</span></span>
              </Link>
            </div>
          </div>
        </section>

        <section className={styles.directory} aria-labelledby="directory-title">
          <div className="shell">
            <div className={styles.sectionHead}>
              <p className={styles.kicker}>01 / {t("directionsKicker")}</p>
              <h2 id="directory-title">{t("directionsTitle")}</h2>
              <p>{t("directionsLead")}</p>
            </div>
            <div className={styles.grid}>
              {services.map((service, index) => {
                const route = serviceRoutes[index];
                const artwork = serviceArt[route];
                return (
                  <Link key={route} href={`/${locale}/services/${route}`} className={`${styles.card} ${artwork ? styles.cardIllustrated : ""} ${index === 7 ? styles.cardFeatured : ""} reveal-item`}>
                    <div className={styles.cardTop}><span>{String(index + 1).padStart(2, "0")}</span><span>{service.tag}</span></div>
                    {artwork && index !== 6 ? (
                      <div className={styles.cardArt}>
                        <Image src={artwork.src} alt={artwork.alt[locale === "en" ? "en" : "ru"]} fill sizes="(max-width: 650px) 100vw, (max-width: 1000px) 45vw, 28vw" />
                      </div>
                    ) : index !== 6 ? (
                      <div className={styles.cardMark} aria-hidden="true">{route === "web-applications" ? "APP" : route === "design-redesign" ? "REDO" : route === "seo-positioning" ? "SEO" : "AI"}</div>
                    ) : null}
                    <h3>{service.title}</h3>
                    <p>{service.text}</p>
                    <span className={styles.cardTime}>{serviceTimelines[route][locale === "en" ? "en" : "ru"]}</span>
                    <p className={styles.outcome}>{outcomes[index]}</p>
                    <span className={styles.cardLink}>
                      {t("discussService")} <span aria-hidden>↗</span>
                    </span>
                    {index === 6 && artwork && <div className={styles.cardCmsMedia}><Image src={artwork.src} alt={artwork.alt[locale === "en" ? "en" : "ru"]} fill sizes="(max-width: 650px) 100vw, 42vw" /></div>}
                    {index === 7 && <div className={styles.cardFeaturedMedia}><Image src="/projects/okhana.webp" alt={t("aiAlt")} fill sizes="(max-width: 650px) 100vw, 50vw" /></div>}
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <section className={styles.advantage} aria-labelledby="advantage-title"><div className={`shell ${styles.advantageInner}`}>
          <div className={styles.advantageCopy}>
            <p className={styles.kicker}>{t("advantageKicker")}</p>
            <h2 id="advantage-title">{t("advantageTitle")}</h2>
            <p>{t("advantageLead")}</p>
            <div className={styles.advantageGrid}>{advantages.map((item) => <div key={item.title}><h3>{item.title}</h3><p>{item.text}</p></div>)}</div>
            <Link href={`/${locale}/work/vne-shablona`} className={styles.advantageLink}>{t("advantageLink")} ↗</Link>
          </div>
          <div className={styles.advantageVisual} aria-hidden="true"><span>BUILD / OWN / GROW</span><Image src="/mascot/mascot-base.webp" alt="" width={1024} height={1024} sizes="(max-width: 650px) 80vw, 34vw" /></div>
        </div></section>

        <section className={styles.proof} aria-labelledby="proof-title">
          <div className={`shell ${styles.proofInner}`}>
            <div>
              <p className={styles.kicker}>02 / {t("exampleKicker")}</p>
              <h2 id="proof-title">{t("exampleTitle")}</h2>
              <p>{t("exampleText")}</p>
            </div>
            <div className={styles.proofLinks}>
              <Link href={`/${locale}/services/product-catalogues`}>{t("catalogLink")} <span aria-hidden>↗</span></Link>
              <Link href={`/${locale}/work/aokemz`}>{t("caseLink")} <span aria-hidden>↗</span></Link>
            </div>
          </div>
        </section>

        <section className={styles.process} aria-labelledby="process-title">
          <div className="shell">
            <div className={styles.sectionHead}>
              <p className={styles.kicker}>03 / {t("processKicker")}</p>
              <h2 id="process-title">{t("processTitle")}</h2>
            </div>
            <ol className={styles.steps}>
              {steps.map((step, index) => <li key={step.title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{step.title}</h3><p>{step.text}</p></li>)}
            </ol>
          </div>
        </section>

        <ServiceLeadForm locale={locale} title={t("finalTitle")} lead={t("finalLead")} />
      </main>
      <Footer />
    </>
  );
}
