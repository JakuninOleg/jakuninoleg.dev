import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { CaseServiceBridge } from "./CaseServiceBridge";
import { Breadcrumbs } from "./Breadcrumbs";
import styles from "./VneShablonaCase.module.css";

const asset = "/projects/vne-shablona";
const siteUrl = "https://vneshablona.ru/";
const panelImages = [
  { file: "story-template.webp", width: 570, height: 631 },
  { file: "story-plugins.webp", width: 586, height: 631 },
  { file: "story-breakdown.webp", width: 590, height: 653 },
  { file: "story-custom.webp", width: 586, height: 653 },
] as const;

export async function VneShablonaCase({ locale }: { locale: string }) {
  const t = await getTranslations("VneCase");
  const p = await getTranslations("Portfolio");
  const panels = t.raw("panels") as { title: string; text: string; alt: string }[];
  const deliverables = t.raw("deliverables") as { title: string; text: string }[];

  return (
    <article className={styles.case}>
      <section className={styles.hero} aria-labelledby="vne-title">
        <div className={`shell ${styles.heroInner}`}>
          <Breadcrumbs locale={locale} items={[{ label: locale === "en" ? "Work" : "Работы", href: `/${locale}/work` }, { label: t("title") }]} />
          <div className={styles.heroGrid}>
            <div className={styles.heroCopy}>
              <p className={styles.kicker}>{t("heroKicker")}</p>
              <h1 id="vne-title">{t("title")}</h1>
              <p className={styles.heroLead}>{t("heroLead")}</p>
              <div className={styles.heroActions}>
                <a href={siteUrl} target="_blank" rel="noreferrer" className={styles.primaryLink}>{t("openSite")} <span aria-hidden="true">↗</span></a>
                <a href="#vne-story" className={styles.secondaryLink}>{t("exploreCase")} <span aria-hidden="true">↓</span></a>
              </div>
              <p className={styles.heroScope}>{t("heroScope")}</p>
            </div>

            <div className={styles.heroArt}>
              <div className={styles.browser} role="img" aria-label={t("browserAlt")}>
                <div className={styles.browserChrome}><span aria-hidden="true">● ● ●</span><span>vneshablona.ru</span></div>
                <div className={styles.browserStage}>
                  <Image src={`${asset}/desktop-actual.webp`} alt="" fill sizes="(max-width: 860px) 100vw, 55vw" loading="lazy" />
                </div>
              </div>
              <div className={styles.phone} role="img" aria-label={t("phoneAlt")}>
                <div className={styles.phoneScreen}>
                  <Image src={`${asset}/mobile-actual.webp`} alt="" fill sizes="(max-width: 580px) 73vw, 180px" loading="lazy" />
                </div>
              </div>
              <span className={styles.heroArtCaption}>{t("heroCaption")}</span>
            </div>
          </div>
        </div>
      </section>

      <section id="vne-story" className={styles.paperSection} aria-labelledby="vne-story-title">
        <div className={`shell ${styles.paperInner}`}>
          <div className={styles.sectionHead}>
            <div><p className={styles.chapter}>{t("storyKicker")}</p><h2 id="vne-story-title">{t("storyTitle")}</h2></div>
            <p>{t("storyLead")}</p>
          </div>
          <div className={styles.comicGrid}>
            {panels.map((panel, index) => (
              <figure key={panel.title} className={styles.comicPanel}>
                <span className={styles.panelNumber}>{String(index + 1).padStart(2, "0")}</span>
                <Image src={`${asset}/${panelImages[index].file}`} alt={panel.alt} width={panelImages[index].width} height={panelImages[index].height} sizes="(max-width: 580px) 100vw, (max-width: 900px) 50vw, 25vw" />
                <figcaption><strong>{panel.title}</strong><span>{panel.text}</span></figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.workshopSection} aria-labelledby="vne-workshop-title">
        <div className="shell">
          <div className={styles.sectionHead}>
            <div><p className={styles.chapter}>{t("workshopKicker")}</p><h2 id="vne-workshop-title">{t("workshopTitle")}</h2></div>
            <p>{t("workshopLead")}</p>
          </div>
          <figure className={styles.workshopFigure}>
            <Image src={`${asset}/workshop-desktop.webp`} alt={t("workshopAlt")} width={1614} height={975} sizes="(max-width: 900px) 100vw, 1200px" />
            <figcaption>{t("workshopCaption")}</figcaption>
          </figure>
        </div>
      </section>

      <section className={styles.deliverySection} aria-labelledby="vne-delivery-title">
        <div className="shell">
          <div className={styles.deliveryHead}><p className={styles.kicker}>{t("deliveryKicker")}</p><h2 id="vne-delivery-title">{t("deliveryTitle")}</h2><p>{t("deliveryLead")}</p></div>
          <div className={styles.deliveryGrid}>
            {deliverables.map((item, index) => <div key={item.title} className={styles.deliveryItem}><span>{String(index + 1).padStart(2, "0")}</span><h3>{item.title}</h3><p>{item.text}</p></div>)}
          </div>
          <div className={styles.deliveryInside}>
            <div className={styles.deliveryIntro}><span>{t("insideKicker")}</span><h3>{t("insideTitle")}</h3><p>{t("insideText")}</p></div>
            <ol><li>{t("insideStepOne")}</li><li>{t("insideStepTwo")}</li><li>{t("insideStepThree")}</li></ol>
            <Image className={styles.deliveryMascot} src="/service-art/vne-delivery-scene.webp" alt={locale === "en" ? "Mascot turns a page sketch into a working website and an emailed inquiry" : "Маскот превращает рисунок страницы в работающий сайт и отправленную заявку"} width={1536} height={1024} sizes="(max-width: 820px) 100vw, 38vw" />
          </div>
          <div className={styles.deliveryFooter}><a href={siteUrl} target="_blank" rel="noreferrer">{t("openSite")} ↗</a><Link href={`/${locale}#contact-form`}>{p("discuss")} ↗</Link></div>
        </div>
      </section>
      <CaseServiceBridge locale={locale} route="landing-pages" />
      <div className={`shell ${styles.next}`}><span>{p("nextProject")}</span><Link href={`/${locale}/work/oj-cms`}>OJ CMS <span aria-hidden="true">↗</span></Link></div>
    </article>
  );
}
