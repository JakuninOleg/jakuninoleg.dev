import { getTranslations } from "next-intl/server";
import { stackGroupsMeta } from "@/content/stack";

export async function Stack() {
  const t = await getTranslations("Stack");

  return (
    <section id="stack" className="section" aria-labelledby="stack-heading">
      <div className="shell">
        <div className="reveal-item">
          <p className="section-kicker">{t("kicker")}</p>
          <h2 id="stack-heading">{t("title")}</h2>
          <p className="section-lead">{t("lead")}</p>
        </div>
        <div className="stack-grid">
          {stackGroupsMeta.map((group, index) => (
            <div
              key={group.id}
              className={`stack-card stack-card--${group.id} reveal-item`}
              style={{ ["--reveal-delay" as string]: `${0.05 + index * 0.05}s` }}
            >
              <h3>{t(`groups.${group.id}`)}</h3>
              <ul className="stack-list">
                {group.items.map((tech) => {
                  const color = tech.color ?? `#${tech.icon.hex}`;
                  return (
                    <li key={tech.label} style={{ ["--tech" as string]: color }}>
                      <span className="stack-tech__icon" aria-hidden>
                        <svg viewBox="0 0 24 24" role="img" focusable="false">
                          <path d={tech.icon.path} fill="currentColor" />
                        </svg>
                      </span>
                      <span>{tech.label}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
