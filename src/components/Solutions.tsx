import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { solutionsMeta } from "@/content/solutions";

export async function Solutions() {
  const t = await getTranslations("Solutions");

  return (
    <section id="solutions" className="section section--alt" aria-labelledby="solutions-heading">
      <div className="shell">
        <div className="section-head reveal-item">
          <div>
            <p className="section-kicker">{t("kicker")}</p>
            <h2 id="solutions-heading">{t("title")}</h2>
            <p className="section-lead">{t("lead")}</p>
          </div>
        </div>

        <div className="solutions">
          {solutionsMeta.map((solution, index) => {
            const points = t.raw(`offers.${solution.id}.points`) as string[];
            const style = {
              ["--accent" as string]: solution.accent,
              ["--reveal-delay" as string]: `${0.04 + index * 0.08}s`,
            };

            return (
              <article
                key={solution.id}
                className={`solution reveal-item${solution.demoHref ? " solution--cms" : ""}${index % 2 === 1 ? " solution--flip" : ""}`}
                style={style}
              >
                <div className="solution__intro">
                  <div className="solution__meta">
                    <span className="solution__tag">{t(`offers.${solution.id}.tag`)}</span>
                    <span className="solution__badge">{t(`offers.${solution.id}.badge`)}</span>
                  </div>
                  <h3>{t(`offers.${solution.id}.title`)}</h3>
                  <p className="solution__hook">{t(`offers.${solution.id}.hook`)}</p>
                  <p className="solution__text">{t(`offers.${solution.id}.text`)}</p>
                  {solution.demoHref && (
                    <p className="solution__author">{t(`offers.${solution.id}.author`)}</p>
                  )}
                </div>

                <div className="solution__media">
                  <figure className="solution-shot">
                    <Image
                      src={solution.image}
                      alt={t(`offers.${solution.id}.imageAlt`)}
                      width={solution.demoHref ? 1438 : 1600}
                      height={solution.demoHref ? 1224 : 900}
                      sizes="(max-width: 819px) 100vw, 55vw"
                      className="solution-shot__img"
                    />
                    {solution.demoHref && (
                      <figcaption className="solution-shot__caption">
                        <span>{t(`offers.${solution.id}.caption`)}</span>
                        <a href={solution.demoHref} target="_blank" rel="noreferrer">
                          {t(`offers.${solution.id}.demoCta`)} <span aria-hidden="true">↗</span>
                        </a>
                      </figcaption>
                    )}
                  </figure>
                </div>

                <div className="solution__details">
                  <ul className="solution__points">
                    {points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                  <div className="case-stack solution__stack">
                    {solution.stack.map((tech) => (
                      <span key={tech}>{tech}</span>
                    ))}
                  </div>
                  <div className="solution__actions">
                    <a href="#contact" className="btn-main">
                      {t(`offers.${solution.id}.cta`)}
                    </a>
                    <p className="solution__note">{t(`offers.${solution.id}.note`)}</p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
