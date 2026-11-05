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
const groupPaths = ["gruppy/mladshaya/", "gruppy/srednyaya/", "gruppy/starshaya/"] as const;

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

        <section id="groups" className={`shell ${styles.section}`}>
          <div className={styles.intro}>
            <h2>{c.groups}</h2>
            <p>{c.groupsText}</p>
          </div>
          <ul className={styles.groupList}>
            {groupPaths.map((path, index) => (
              <li key={path}>
                <a href={`${elBebeSiteUrl}${path}`}>{c.groupNames[index]} <span aria-hidden>↗</span></a>
                <p>{c.groupPrograms[index]}</p>
              </li>
            ))}
          </ul>
          <figure className={styles.screen}>
            <Image src={`${assets}/group-schedule.webp`} alt={c.scheduleAlt} width={1265} height={712} sizes="(max-width: 760px) 92vw, 1200px" />
            <figcaption>{c.scheduleCaption}</figcaption>
          </figure>
        </section>

        <section id="inner-pages" className={styles.innerPages}>
          <div className={`shell ${styles.section}`}>
            <h2>{c.inner}</h2>
            <div className={styles.examples}>
              <article>
                <Image src={`${assets}/day-map.webp`} alt={c.dayAlt} width={1265} height={712} sizes="(max-width: 760px) 92vw, 50vw" />
                <h3><a href={`${elBebeSiteUrl}den-v-sadu/`}>{c.day} <span aria-hidden>↗</span></a></h3>
                <p>{c.dayText}</p>
              </article>
              <article>
                <Image src={`${assets}/gallery.webp`} alt={c.galleryAlt} width={1265} height={712} sizes="(max-width: 760px) 92vw, 50vw" />
                <h3><a href={`${elBebeSiteUrl}prostranstvo/`}>{c.gallery} <span aria-hidden>↗</span></a></h3>
                <p>{c.galleryText}</p>
              </article>
            </div>
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

        <section id="print" className={`shell ${styles.section}`}>
          <div className={styles.intro}>
            <h2>{c.print}</h2>
            <p>{c.printText}</p>
          </div>
          <figure className={styles.printSamples}>
            <div className={styles.printGrid}>
              <div>
                <h3>{c.printWeek}</h3>
                <p>{c.printWeekText}</p>
                <Image src={`${assets}/print-week.webp`} alt={c.printWeek} width={1123} height={794} sizes="(max-width: 760px) 92vw, 56vw" />
              </div>
              <div>
                <h3>{c.printBirthdays}</h3>
                <p>{c.printBirthdaysText}</p>
                <Image src={`${assets}/print-birthdays.webp`} alt={c.printBirthdays} width={794} height={1123} sizes="(max-width: 760px) 92vw, 32vw" />
              </div>
            </div>
            <figcaption>{c.printCaption}</figcaption>
          </figure>
          <p className={styles.printNote}>{c.printExtra}</p>
        </section>

        <section id="documents" className={styles.documents}>
          <div className={`shell ${styles.section} ${styles.intro}`}>
            <h2>{c.documents}</h2>
            <div className={styles.copy}>
              <p>{c.documentsText}</p>
              <p>{c.dataText}</p>
              <ul className={styles.documentLinks}>
                <li><a href={`${elBebeSiteUrl}dokumenty/`}>{c.documentsLink}</a></li>
                <li><a href={`${elBebeSiteUrl}privacy/`}>{c.privacyLink}</a></li>
                <li><a href={`${elBebeSiteUrl}soglasie/`}>{c.consentLink}</a></li>
              </ul>
            </div>
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
