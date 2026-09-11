import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { projectsMeta } from "@/content/site";

export async function Work() {
  const t = await getTranslations("Work");

  return (
    <section id="work" className="section" aria-labelledby="work-heading">
      <div className="shell">
        <div className="section-head reveal-item">
          <div>
            <p className="section-kicker">{t("kicker")}</p>
            <h2 id="work-heading">{t("title")}</h2>
          </div>
        </div>

        <div className="cases">
          {projectsMeta.map((project, index) => {
            const target = project.href ?? project.repo;
            const title = t.has(`projects.${project.id}.title`)
              ? t(`projects.${project.id}.title`)
              : project.title;
            const style = {
              ["--accent" as string]: project.accent,
              ["--reveal-delay" as string]: `${0.04 + index * 0.06}s`,
            };

            const media = (
              <div
                className={`case-media${project.imageFit === "contain" ? " case-media--contain" : ""}`}
              >
                <Image
                  src={project.image}
                  alt={t("screenshotAlt", { title })}
                  width={1280}
                  height={800}
                  sizes="(max-width: 819px) 100vw, 55vw"
                  loading="lazy"
                />
                <span className="case-index">{String(index + 1).padStart(2, "0")}</span>
              </div>
            );

            const body = (
              <div className="case-body">
                <div className="case-meta">
                  <span className="case-tag">{t(`projects.${project.id}.tag`)}</span>
                </div>
                <h3>{title}</h3>
                <p>{t(`projects.${project.id}.summary`)}</p>
                <p className="case-result">{t(`projects.${project.id}.result`)}</p>
                <div className="case-stack">
                  {project.stack.map((tech) => (
                    <span key={tech}>{tech}</span>
                  ))}
                </div>
              </div>
            );

            if (!target) {
              return (
                <article
                  key={project.id}
                  className="case reveal-item"
                  style={style}
                >
                  {media}
                  {body}
                </article>
              );
            }

            return (
              <a
                key={project.id}
                href={target}
                target="_blank"
                rel="noreferrer"
                className="case reveal-item"
                style={style}
                aria-label={`${title} (opens in a new tab)`}
              >
                {media}
                {body}
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
