import { getTranslations } from "next-intl/server";
import { site } from "@/content/site";

export async function About() {
  const t = await getTranslations("About");
  const steps = t.raw("steps") as { title: string; text: string }[];
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
            <div className="about-profile__tools" aria-label={t("toolsLabel")}>
              {tools.map((tool) => <span key={tool}>{tool}</span>)}
            </div>
            <a href={site.github} target="_blank" rel="noreferrer" className="about-profile__link">
              {t("githubCta")} <span aria-hidden="true">↗</span>
            </a>
          </div>

          <div className="about-steps" aria-label={t("stepsLabel")}>
            {steps.map((step, index) => (
              <div key={step.title} className="about-step reveal-item" style={{ ["--reveal-delay" as string]: `${index * 0.06}s` }}>
                <span className="about-step__number">{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
