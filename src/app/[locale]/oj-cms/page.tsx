import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { setRequestLocale } from "next-intl/server";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ServiceLeadForm } from "@/components/ServiceLeadForm";
import { BlogContextLink } from "@/components/BlogContextLink";
import { CmsBenefitIcon } from "@/components/CmsBenefitIcon";
import { ojCmsPage } from "@/content/oj-cms-page";
import styles from "./page.module.css";

type Props = { params: Promise<{ locale: string }> };
const demoHref = "https://oj-cms.vercel.app/admin";

const fitScenes = [
  {
    src: "/service-art/landing-workshop-wide.webp",
    alt: {
      ru: "Маскот собирает корпоративный сайт в мастерской",
      en: "Mascot assembling a company website in the workshop",
    },
  },
  {
    src: "/service-art/catalog-comic-wide.webp",
    alt: {
      ru: "Маскот упорядочивает каталог продукции",
      en: "Mascot arranging a product catalog",
    },
  },
  {
    src: "/service-art/cms-interface.webp",
    alt: {
      ru: "Маскот управляет контентом в редакторе",
      en: "Mascot managing content in the editor",
    },
  },
] as const;

export function generateStaticParams() { return [{ locale: "ru" }, { locale: "en" }]; }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const copy = ojCmsPage[locale === "en" ? "en" : "ru"];
  return {
    title: copy.seoTitle,
    description: copy.seoDescription,
    alternates: { canonical: `/${locale}/oj-cms`, languages: { ru: "/ru/oj-cms", en: "/en/oj-cms" } },
    openGraph: { title: copy.seoTitle, description: copy.seoDescription, images: ["/projects/oj-cms-wide.webp"] },
  };
}

export default async function OjCmsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isRu = locale !== "en";
  const copy = ojCmsPage[isRu ? "ru" : "en"];

  return <>
    <a href="#main" className="skip-link">{isRu ? "К содержимому" : "Skip to content"}</a>
    <Header />
    <main id="main" className={styles.page}>
      <section className={styles.hero} aria-labelledby="oj-cms-title"><div className="shell">
        <Breadcrumbs locale={locale} items={[{ label: "OJ CMS" }]} />
        <div className={styles.heroGrid}>
          <div className={styles.heroCopy}>
            <p className={styles.kicker}>{copy.hero.eyebrow}</p>
            <h1 id="oj-cms-title">{copy.hero.title}</h1>
            <p className={styles.heroLead}>{copy.hero.lead}</p>
            <div className={styles.actions}>
              <a className={styles.primaryAction} href={demoHref} target="_blank" rel="noopener noreferrer">{copy.hero.primary} <span aria-hidden="true">↗</span></a>
              <a className={styles.secondaryAction} href="#service-contact">{copy.hero.secondary} <span aria-hidden="true">↘</span></a>
            </div>
            <p className={styles.demoNote}><span aria-hidden="true">●</span>{copy.hero.note}</p>
          </div>
          <div className={styles.heroVisual}>
            <span className={styles.heroVisualLabel}>OJ / CONTENT SYSTEM</span>
            <Image src="/service-art/cms-interface.webp" alt={isRu ? "Маскот работает с контентом в OJ CMS" : "Mascot working with content in OJ CMS"} width={1000} height={1000} priority sizes="(max-width: 760px) 100vw, 48vw" />
            <span className={styles.heroVisualIndex} aria-hidden="true">01 — 06</span>
          </div>
        </div>
      </div></section>

      <section className={styles.benefits} aria-labelledby="benefits-title"><div className="shell">
        <div className={styles.benefitsLead}>
          <div className={styles.benefitsCopy}>
            <p className={styles.kicker}>{copy.benefits.label}</p>
            <h2 id="benefits-title">{copy.benefits.title}</h2>
            <p className={styles.benefitsIntro}>{copy.benefits.intro}</p>
          </div>
          <div className={styles.benefitsArt}>
            <Image
              src="/service-art/cms-workflow.webp"
              alt={isRu ? "Маскот ведёт контент через рабочий процесс OJ CMS" : "Mascot guiding content through the OJ CMS workflow"}
              width={1672}
              height={940}
              sizes="(max-width: 760px) 92vw, min(48vw, 40rem)"
              loading="lazy"
            />
          </div>
        </div>
        <div className={styles.benefitGrid}>{copy.benefits.items.map((item, index) => <article className={styles.benefitCard} key={item.title}>
          <div className={styles.benefitCardTop}><span className={styles.cardIndex}>0{index + 1}</span><CmsBenefitIcon index={index} className={styles.benefitIcon} /></div>
          <h3>{item.title}</h3><p>{item.text}</p>
        </article>)}</div>
      </div></section>

      <section className={styles.workflow} aria-labelledby="workflow-title"><div className="shell">
        <div className={styles.sectionHead}><div><p className={styles.kicker}>{copy.workflow.label}</p><h2 id="workflow-title">{copy.workflow.title}</h2></div><p>{copy.workflow.intro}</p></div>
        <div className={styles.workflowSteps}>{copy.workflow.steps.map((step) => <article className={styles.workflowStep} key={step.number}>
          <div className={styles.workflowCopy}><span className={styles.stepNumber}>{step.number}<span aria-hidden="true"> / 03</span></span><h3>{step.title}</h3><p>{step.text}</p></div>
          <figure className={styles.screen}><Image src={step.image} alt={step.alt} width={step.number === "01" ? 1536 : 1280} height={step.number === "01" ? 1024 : 800} sizes="(max-width: 760px) 100vw, 64vw" /><figcaption>OJ CMS / {step.number}</figcaption></figure>
        </article>)}</div>
        <a className={styles.textLink} href={demoHref} target="_blank" rel="noopener noreferrer">{copy.hero.primary} <span aria-hidden="true">↗</span></a>
      </div></section>

      <section className={styles.payload} aria-labelledby="payload-title"><div className={`shell ${styles.payloadGrid}`}>
        <div className={styles.payloadIntro}><p className={styles.kicker}>{copy.payload.label}</p><h2 id="payload-title">{copy.payload.title}</h2><p>{copy.payload.intro}</p><a className={styles.textLink} href={copy.payload.docsHref} target="_blank" rel="noopener noreferrer">{copy.payload.docs} <span aria-hidden="true">↗</span></a></div>
        <div className={styles.payloadPanel}><div className={styles.payloadPanelTop}><span>PAYLOAD</span><span>API → WEBSITE</span></div><div className={styles.payloadPoints}>{copy.payload.points.map((point, index) => <article key={point.title}>
          <span className={styles.cardIndex}>0{index + 1}</span><div><h3>{point.title}</h3><p>{point.text}</p></div>
        </article>)}</div></div>
      </div></section>

      <section className={styles.boundary} aria-labelledby="boundary-title"><div className="shell">
        <p className={styles.kicker}>{copy.boundary.label}</p><h2 id="boundary-title">{copy.boundary.title}</h2>
        <div className={styles.boundaryGrid}>
          <article><span className={styles.boundaryFlag}>01 / DEMO</span><h3>{copy.boundary.demoTitle}</h3><p>{copy.boundary.demoText}</p></article>
          <article><span className={styles.boundaryFlag}>02 / PRODUCTION</span><h3>{copy.boundary.productionTitle}</h3><p>{copy.boundary.productionText}</p></article>
        </div>
      </div></section>

      <section className={styles.fit} aria-labelledby="fit-title"><div className="shell">
        <p className={styles.kicker}>{copy.fit.label}</p><h2 id="fit-title">{copy.fit.title}</h2>
        <div className={styles.fitGrid}>{copy.fit.items.map((item, index) => {
          const scene = fitScenes[index];
          return <article className={styles.fitCard} key={item.title}>
            <span className={styles.cardIndex}>0{index + 1}</span>
            <div className={styles.fitArt}>
              <Image
                src={scene.src}
                alt={scene.alt[isRu ? "ru" : "en"]}
                width={960}
                height={540}
                sizes="(max-width: 760px) 92vw, 30vw"
                loading="lazy"
              />
            </div>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </article>;
        })}</div>
      </div></section>

      <section className={styles.delivery} aria-labelledby="delivery-title"><div className={`shell ${styles.deliveryGrid}`}>
        <div><p className={styles.kicker}>{copy.delivery.label}</p><h2 id="delivery-title">{copy.delivery.title}</h2></div>
        <ol>{copy.delivery.steps.map((step, index) => <li key={step.title}><span>0{index + 1}</span><div><h3>{step.title}</h3><p>{step.text}</p></div></li>)}</ol>
      </div></section>

      <section className={styles.related} aria-labelledby="related-title"><div className="shell">
        <h2 id="related-title">{copy.related.title}</h2>
        <div className={styles.relatedGrid}>
          <Link href={`/${locale}/work/oj-cms`}><span>01 / CASE STUDY</span><h3>{copy.related.caseTitle}</h3><p>{copy.related.caseText}</p><b aria-hidden="true">↗</b></Link>
          <Link href={`/${locale}/services/cms`}><span>02 / SERVICE</span><h3>{copy.related.serviceTitle}</h3><p>{copy.related.serviceText}</p><b aria-hidden="true">↗</b></Link>
        </div>
      </div></section>

      <BlogContextLink locale={locale} context="cms" showArt />
      <ServiceLeadForm locale={locale} service="OJ CMS" title={copy.final.title} lead={copy.final.text} />
    </main><Footer />
  </>;
}
