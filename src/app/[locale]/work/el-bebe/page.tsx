import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { setRequestLocale } from "next-intl/server";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { elBebeCase, elBebeSiteUrl } from "@/content/el-bebe-case";
import styles from "./el-bebe.module.css";

type Props = { params: Promise<{ locale: string }> };
const assets = "/projects/el-bebe";

export function generateStaticParams() {
  return [{ locale: "ru" }, { locale: "en" }];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const c = elBebeCase[locale === "en" ? "en" : "ru"];
  const title = `${c.title} | Astro + EmDash`;
  return {
    title,
    description: c.lead,
    alternates: { canonical: `/${locale}/work/el-bebe`, languages: { ru: "/ru/work/el-bebe", en: "/en/work/el-bebe" } },
    openGraph: { title, description: c.lead, images: [`${assets}/cover.webp`] },
    twitter: { card: "summary_large_image", title, description: c.lead, images: [`${assets}/cover.webp`] },
  };
}

export default async function ElBebePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const c = elBebeCase[locale === "en" ? "en" : "ru"];

  return (
    <div className={styles.page}>
      <a href="#main" className="skip-link">{c.skip}</a>
      <Header />
      <main id="main" className={styles.case}>
        <header className={styles.hero}>
          <div className="shell">
            <Breadcrumbs locale={locale} items={[{ label: c.work, href: `/${locale}/work` }, { label: locale === "en" ? "El Bebe" : "Эльбэби" }]} />
            <div className={styles.heroGrid}>
              <h1>{c.title}</h1>
              <div className={styles.cover}>
                <Image src={`${assets}/cover.webp`} alt={c.coverAlt} width={1672} height={941} sizes="(max-width: 760px) 92vw, 55vw" preload />
              </div>
              <p className={styles.lead}>{c.lead}</p>
              <a className={`${styles.cta} ${styles.heroAction}`} href={elBebeSiteUrl}>{c.open} <span aria-hidden>↗</span></a>
            </div>
            <dl className={styles.facts}>
              {c.facts.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}
            </dl>
          </div>
        </header>

        <section className={`shell ${styles.section}`}>
          <div className={styles.intro}>
            <h2>{c.structure}</h2>
            <p>{c.structureText}</p>
          </div>
          <figure className={styles.screen}>
            <Image src={`${assets}/desktop.webp`} alt={c.desktopAlt} width={1265} height={712} sizes="(max-width: 760px) 92vw, 1200px" />
            <figcaption>{c.desktopCaption}</figcaption>
          </figure>
        </section>

        <section className={styles.design}>
          <div className={`shell ${styles.pair}`}>
            <div className={styles.copy}>
              <h2>{c.design}</h2>
              <p>{c.designText}</p>
              <p>{c.mobileText}</p>
            </div>
            <figure className={styles.phone}>
              <Image src={`${assets}/mobile.webp`} alt={c.mobileAlt} width={390} height={844} sizes="(max-width: 420px) 86vw, 330px" />
              <figcaption>{c.mobileCaption}</figcaption>
            </figure>
          </div>
        </section>

        <section className={`shell ${styles.section}`}>
          <div className={styles.intro}>
            <h2>{c.astro}</h2>
            <p>{c.astroText}</p>
          </div>
        </section>

        <section className={styles.cms}>
          <div className={`shell ${styles.pair}`}>
            <div className={styles.copy}>
              <h2>{c.cms}</h2>
              <p>{c.cmsText}</p>
              <p>{c.accessText}</p>
            </div>
            <Image className={styles.office} src={`${assets}/office.webp`} alt={c.officeAlt} width={1672} height={941} sizes="(max-width: 760px) 92vw, 50vw" />
          </div>
        </section>

        <section className={`shell ${styles.section}`}>
          <div className={styles.intro}>
            <h2>{c.visit}</h2>
            <p>{c.visitText}</p>
          </div>
        </section>

        <div className={`shell ${styles.contact}`}>
          <section className={styles.invitation}>
            <h2>{c.ctaTitle}</h2>
            <p>{c.ctaText}</p>
            <Link className={styles.cta} href={`/${locale}#contact`}>{c.cta} <span aria-hidden>↗</span></Link>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
