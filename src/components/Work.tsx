import Image from "next/image";
import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";
import { projectsMeta } from "@/content/site";

export async function Work() {
  const locale = await getLocale();
  const t = await getTranslations("Work");
  const p = await getTranslations("Portfolio");
  const project = projectsMeta.find((item) => item.id === "aokemz")!;
  const more = ["vne-shablona", "oj-cms", "okhana"].map((id) => projectsMeta.find((item) => item.id === id)!);

  return (
    <section id="work" className="section work-preview" aria-labelledby="work-heading">
      <div className="shell">
        <div className="section-head reveal-item">
          <div>
            <p className="section-kicker">{p("homeKicker")}</p>
            <h2 id="work-heading">{p("homeTitle")}</h2>
          </div>
          <p className="section-lead">{p("homeLead")}</p>
        </div>
        <Link href={`/${locale}/work/aokemz`} className="work-preview__feature reveal-item">
          <div className="work-preview__image">
            <Image src={project.image} alt={t("screenshotAlt", { title: t("projects.aokemz.title") })} width={1265} height={712} sizes="(max-width: 819px) 100vw, 65vw" />
          </div>
          <div className="work-preview__body">
            <span className="work-preview__index">01 / {p("featured")}</span>
            <span className="case-tag">{t("projects.aokemz.tag")}</span>
            <h3>{t("projects.aokemz.title")}</h3>
            <p>{p("kemz.lead")}</p>
            <span className="work-preview__link">{p("readCase")} <span aria-hidden>↗</span></span>
          </div>
        </Link>
        <div className="work-preview__more">
          {more.map((item, index) => {
            const title = t.has(`projects.${item.id}.title`) ? t(`projects.${item.id}.title`) : item.title;
            return (
              <Link key={item.id} href={`/${locale}/work/${item.id}`} className="work-preview__small reveal-item" style={{ ["--reveal-delay" as string]: `${index * 0.06}s` }}>
                <div className={`work-preview__small-image${item.imageFit === "contain" ? " work-preview__small-image--contain" : ""}${item.id === "vne-shablona" ? " work-preview__small-image--paper" : ""}`}>
                  <Image src={item.image} alt={t.has(`projects.${item.id}.imageAlt`) ? t(`projects.${item.id}.imageAlt`) : t("screenshotAlt", { title })} width={1280} height={800} sizes="(max-width: 819px) 100vw, 33vw" />
                </div>
                <div className="work-preview__small-copy">
                  <span>{t(`projects.${item.id}.tag`)}</span>
                  <h3>{title}</h3>
                  <p>{t(`projects.${item.id}.summary`)}</p>
                  <strong>{p("readCase")} <span aria-hidden="true">↗</span></strong>
                </div>
              </Link>
            );
          })}
        </div>
        <div className="work-preview__footer">
          <span>{p("count", { count: projectsMeta.length })}</span>
          <Link href={`/${locale}/work`}>{p("allWork")} <span aria-hidden>↗</span></Link>
        </div>
      </div>
    </section>
  );
}
