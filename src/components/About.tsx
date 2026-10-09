import { getLocale, getTranslations } from "next-intl/server";
import { site } from "@/content/site";

export async function About() {
  const t = await getTranslations("About");
  const locale = await getLocale();
  const experience = t.raw("experience") as { period: string; title: string; text: string }[];
  const tools = t.raw("tools") as string[];

  return (
    <section id="about" className="section about-section" aria-labelledby="about-heading">
      <div className="shell">
        <div className="about-head reveal-item">
          <div>
            <p className="section-kicker">{t("kicker")}</p>
            <h2 id="about-heading">{t("title")}</h2>
          </div>
          <p>{t("lead")}</p>
        </div>

        <div className="about-layout">
          <div className="about-profile reveal-item">
            <span className="about-profile__index">{t("profileLabel")}</span>
            <p className="about-profile__name">{t("name")}</p>
            <p className="about-profile__role">{t("role")}</p>
            <p className="about-profile__text">{t("profileText")}</p>
            <a href={site.github} target="_blank" rel="noreferrer" className="about-profile__link">
              {t("githubCta")} <span aria-hidden="true">↗</span>
            </a>
            <a href={`/${locale}/resume`} className="about-profile__link" style={{ marginLeft: 20 }}>
              {locale === "en" ? "Full resume" : "Полное резюме"} <span aria-hidden="true">↗</span>
            </a>
          </div>

          <div className="about-resume">
            <h3 className="about-resume__label">{t("experienceLabel")}</h3>
            <ol className="about-resume__list">
              {experience.map((entry, index) => (
                <li key={entry.title} className="about-step reveal-item" style={{ ["--reveal-delay" as string]: `${index * 0.06}s` }}>
                  <span className="about-step__number">{entry.period}</span>
                  <div>
                    <h4>{entry.title}</h4>
                    <p>{entry.text}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="about-resume__tools">
              <h3 className="about-resume__label">{t("toolsLabel")}</h3>
              <div className="about-profile__tools">
                {tools.map((tool) => <span key={tool}>{tool}</span>)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
