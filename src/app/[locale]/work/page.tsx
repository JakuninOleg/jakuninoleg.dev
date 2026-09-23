import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Reveal } from "@/components/Reveal";
import { projectsMeta } from "@/content/site";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Portfolio" });
  return {
    title: t("catalogTitle"),
    description: t("catalogLead"),
    alternates: { canonical: `/${locale}/work`, languages: { ru: "/ru/work", en: "/en/work" } },
  };
}

export default async function WorkPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Work");
  const p = await getTranslations("Portfolio");
  const ordered = [projectsMeta.find((item) => item.id === "aokemz")!, ...projectsMeta.filter((item) => item.id !== "aokemz")];
  const [featured, ...other] = ordered;

  const card = (project: typeof featured, index: number, isFeatured = false) => {
    const title = t.has(`projects.${project.id}.title`) ? t(`projects.${project.id}.title`) : project.title;
    return (
      <Link key={project.id} href={`/${locale}/work/${project.id}`} className={`portfolio-card reveal-item${isFeatured ? " portfolio-card--featured" : ""}`} style={{ ["--accent" as string]: project.accent, ["--reveal-delay" as string]: `${index * 0.04}s` }}>
        <div className="portfolio-card__image">
          <Image src={project.image} alt={t.has(`projects.${project.id}.imageAlt`) ? t(`projects.${project.id}.imageAlt`) : t("screenshotAlt", { title })} width={project.id === "aokemz" ? 1265 : 1280} height={project.id === "aokemz" ? 712 : 800} sizes={isFeatured ? "(max-width: 800px) 100vw, 60vw" : "(max-width: 800px) 100vw, 42vw"} priority={isFeatured} />
          <span className="portfolio-card__number">{String(index + 1).padStart(2, "0")}</span>
        </div>
        <div className="portfolio-card__copy">
          <p className="portfolio-card__tag">{t(`projects.${project.id}.tag`)}</p>
          <h2>{title}</h2>
          <p>{t(`projects.${project.id}.summary`)}</p>
          <span className="portfolio-card__action">{p("readCase")} <span aria-hidden>↗</span></span>
        </div>
      </Link>
    );
  };

  return (
    <>
      <a href="#main" className="skip-link">{(await getTranslations("Nav"))("skipToContent")}</a>
      <Header />
      <Reveal />
      <main id="main" className="portfolio-page flex-1">
        <div className="shell portfolio-intro">
          <p className="section-kicker">{p("catalogKicker")}</p>
          <h1>{p("catalogTitle")}</h1>
          <div className="portfolio-intro__bottom"><p>{p("catalogLead")}</p><span>{p("count", { count: ordered.length })}</span></div>
        </div>
        <div className="shell portfolio-list">
          <p className="portfolio-list__label">01 — {p("catalogFeatured")}</p>
          {card(featured, 0, true)}
          <p className="portfolio-list__label portfolio-list__label--other">02 — {p("catalogOther")}</p>
          <div className="portfolio-grid">{other.map((project, index) => card(project, index + 1))}</div>
        </div>
      </main>
      <Footer />
    </>
  );
}
