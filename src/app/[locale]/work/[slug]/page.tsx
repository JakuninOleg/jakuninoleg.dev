import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { KemzCase } from "@/components/KemzCase";
import { Reveal } from "@/components/Reveal";
import { projectsMeta } from "@/content/site";
import { projectStories } from "@/content/project-stories";

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return ["ru", "en"].flatMap((locale) => projectsMeta.map((project) => ({ locale, slug: project.id })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = projectsMeta.find((item) => item.id === slug);
  if (!project) return {};
  const t = await getTranslations({ locale, namespace: "Work" });
  const title = t.has(`projects.${slug}.title`) ? t(`projects.${slug}.title`) : project.title;
  const description = t(`projects.${slug}.summary`);
  return {
    title: `${title} — ${locale === "ru" ? "кейс" : "case study"}`,
    description,
    alternates: { canonical: `/${locale}/work/${slug}`, languages: { ru: `/ru/work/${slug}`, en: `/en/work/${slug}` } },
    openGraph: { title, description, images: [project.image] },
  };
}

export default async function CasePage({ params }: Props) {
  const { locale, slug } = await params;
  const project = projectsMeta.find((item) => item.id === slug);
  if (!project) notFound();
  setRequestLocale(locale);
  const t = await getTranslations("Work");
  const p = await getTranslations("Portfolio");
  const n = await getTranslations("Nav");
  if (slug === "aokemz") {
    return <><a href="#main" className="skip-link">{n("skipToContent")}</a><Header /><Reveal /><main id="main" className="case-page flex-1"><KemzCase locale={locale} /></main><Footer /></>;
  }
  const title = t.has(`projects.${slug}.title`) ? t(`projects.${slug}.title`) : project.title;
  const imageAlt = t.has(`projects.${slug}.imageAlt`) ? t(`projects.${slug}.imageAlt`) : t("screenshotAlt", { title });
  const order = [projectsMeta.find((item) => item.id === "aokemz")!, ...projectsMeta.filter((item) => item.id !== "aokemz")];
  const next = order[(order.findIndex((item) => item.id === slug) + 1) % order.length];
  const nextTitle = t.has(`projects.${next.id}.title`) ? t(`projects.${next.id}.title`) : next.title;
  const kemz = slug === "aokemz";
  const story = projectStories[locale === "ru" ? "ru" : "en"][slug];

  return (
    <>
      <a href="#main" className="skip-link">{n("skipToContent")}</a>
      <Header />
      <Reveal />
      <main id="main" className="case-page flex-1">
        <div className="shell case-hero">
          <Link href={`/${locale}/work`} className="case-back">← {p("backCatalog")}</Link>
          <p className="section-kicker">{kemz ? p("kemz.eyebrow") : t(`projects.${slug}.tag`)}</p>
          <div className="case-hero__main">
            <div>
              <h1>{kemz ? p("kemz.title") : title}</h1>
              <p className="case-hero__lead">{kemz ? p("kemz.intro") : t(`projects.${slug}.summary`)}</p>
            </div>
            <div className="case-hero__aside">
              <span>{title}</span>
              <span>{project.stack.join(" / ")}</span>
              {project.href && <a href={project.href} target="_blank" rel="noreferrer">{p("visitSite")} ↗</a>}
            </div>
          </div>
        </div>

        <figure className="shell case-cover reveal-item">
          <div className={`case-cover__image${project.imageFit === "contain" ? " case-cover__image--contain" : ""}`}>
            <Image src={project.image} alt={imageAlt} width={kemz ? 1265 : 1280} height={kemz ? 712 : 800} sizes="(max-width: 1200px) 100vw, 1180px" priority />
          </div>
          <figcaption><span>01 / {title}</span><span>{kemz ? p("kemz.caption") : imageAlt}</span></figcaption>
        </figure>

        {kemz ? (
          <>
            <section className="shell case-story" aria-labelledby="case-context">
              <div className="case-story__side"><span>01 / {p("kemz.contextLabel")}</span></div>
              <div className="case-story__content"><h2 id="case-context">{p("kemz.contextTitle")}</h2><p>{p("kemz.contextText")}</p></div>
            </section>
            <section className="case-scope" aria-labelledby="case-scope">
              <div className="shell">
                <p className="section-kicker">02 / {p("kemz.scopeLabel")}</p>
                <h2 id="case-scope">{p("kemz.scopeTitle")}</h2>
                <div className="case-scope__grid">
                  {([1, 2, 3, 4] as const).map((index) => <article key={index} className="case-scope__item"><span>0{index}</span><h3>{p(`kemz.scope${index}Title`)}</h3><p>{p(`kemz.scope${index}Text`)}</p></article>)}
                </div>
              </div>
            </section>
            <section className="shell case-screen" aria-labelledby="case-screen">
              <div><p className="section-kicker">03 / {p("kemz.screenLabel")}</p><h2 id="case-screen">{p("kemz.screenTitle")}</h2><p>{p("kemz.screenText")}</p></div>
              <div className="case-screen__steps"><span>01 <b>{locale === "ru" ? "Понять производство" : "Understand the factory"}</b></span><span>02 <b>{locale === "ru" ? "Найти оборудование" : "Find equipment"}</b></span><span>03 <b>{locale === "ru" ? "Отправить запрос" : "Send an inquiry"}</b></span></div>
            </section>
            <section className="case-proof" aria-labelledby="case-proof">
              <div className="shell">
                <p className="section-kicker">04 / {p("kemz.proofLabel")}</p>
                <div className="case-proof__head"><h2 id="case-proof">{p("kemz.proofTitle")}</h2><p>{p("kemz.proofNote")}</p></div>
                <div className="case-proof__grid">
                  <div><span>{p("kemz.proofBefore")}</span><strong>{p("kemz.proofBeforeValue")}</strong><small>{p("kemz.proofBeforeNote")}</small></div>
                  <div><span>{p("kemz.proofAfter")}</span><strong>{p("kemz.proofAfterValue")}</strong><small>{p("kemz.proofAfterNote")}</small></div>
                  <div><span>{p("kemz.proofReview")}</span><strong>{p("kemz.proofReviewValue")}</strong><small>{p("kemz.proofReviewNote")}</small></div>
                  <a href={project.href} target="_blank" rel="noreferrer"><span>{p("kemz.proofLive")}</span><strong>{p("kemz.proofLiveValue")}</strong><small>{p("kemz.proofLiveNote")}</small></a>
                </div>
                <div className="case-proof__draft"><span>{p("kemz.reviewDraftLabel")}</span><p>{p("kemz.reviewDraftText")}</p></div>
              </div>
            </section>
            <section className="shell case-outcome"><p className="section-kicker">05 / {p("kemz.outcomeLabel")}</p><h2>{p("kemz.outcomeTitle")}</h2><p>{p("kemz.outcomeText")}</p><a href={`/${locale}#contact`}>{p("kemz.discuss")} ↗</a></section>
          </>
        ) : (
          <section className="shell case-story case-story--simple" aria-labelledby="case-about">
            <div className="case-story__side"><span>01 / {p("caseLead")}</span></div>
            <div className="case-story__content"><h2 id="case-about">{p("whatBuilt")}</h2><h3>{p("caseTask")}</h3><p>{story.task}</p><h3>{p("caseSolution")}</h3><p>{story.solution}</p><h3>{p("caseResult")}</h3><p>{story.result}</p><h3>{p("technology")}</h3><div className="case-stack">{project.stack.map((tech) => <span key={tech}>{tech}</span>)}</div>{project.href && <a className="case-story__link" href={project.href} target="_blank" rel="noreferrer">{p("visitSite")} ↗</a>}</div>
          </section>
        )}
        <div className="shell case-next"><span>{p("nextProject")}</span><Link href={`/${locale}/work/${next.id}`}>{nextTitle} <span aria-hidden>↗</span></Link></div>
      </main>
      <Footer />
    </>
  );
}
