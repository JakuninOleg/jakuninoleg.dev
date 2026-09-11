import { getTranslations } from "next-intl/server";

const accents = ["cyan", "pink", "amber", "orange", "violet", "lime"] as const;

export async function Services() {
  const t = await getTranslations("Services");
  const items = t.raw("items") as { tag: string; title: string; text: string }[];

  return (
    <section id="services" className="section section--alt" aria-labelledby="services-heading">
      <div className="shell">
        <div className="reveal-item">
          <p className="section-kicker">{t("kicker")}</p>
          <h2 id="services-heading">{t("title")}</h2>
          <p className="section-lead">{t("lead")}</p>
        </div>
        <div className="services">
          {items.map((service, index) => (
            <article
              key={service.title}
              className={`service-card service-card--${accents[index % accents.length]} reveal-item`}
              style={{ ["--reveal-delay" as string]: `${0.05 + index * 0.06}s` }}
            >
              <span className="service-card__tag">{service.tag}</span>
              <h3>{service.title}</h3>
              <p>{service.text}</p>
              <span className="service-card__bar" aria-hidden />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
