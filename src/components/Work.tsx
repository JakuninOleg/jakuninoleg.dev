import Image from "next/image";
import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";
import { projectsMeta } from "@/content/site";

export async function Work() {
  const locale = await getLocale();
  const t = await getTranslations("Work");
  const p = await getTranslations("Portfolio");
  const project = projectsMeta.find((item) => item.id === "aokemz")!;

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
        <div className="work-preview__footer">
          <span>{p("count", { count: projectsMeta.length })}</span>
          <Link href={`/${locale}/work`}>{p("allWork")} <span aria-hidden>↗</span></Link>
        </div>
      </div>
    </section>
  );
}
