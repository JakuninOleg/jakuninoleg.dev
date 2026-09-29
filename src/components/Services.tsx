import Image from "next/image";
import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";
import { serviceArt, serviceCardArt } from "@/content/service-art";
import { serviceRoutes } from "@/content/service-routes";
import { serviceTimelines } from "@/content/project-estimator";

export async function Services() {
  const t = await getTranslations("Services");
  const locale = await getLocale();
  const items = t.raw("items") as { tag: string; title: string; text: string }[];

  const renderService = (index: number) => {
    const service = items[index];
    const route = serviceRoutes[index];
    const artwork = serviceArt[route];

    return (
      <Link
        key={route}
        href={`/${locale}/services/${route}`}
        className="service-row service-row--illustrated reveal-item"
        style={{ ["--reveal-delay" as string]: `${index * 0.05}s` }}
      >
        <div className={`service-scene service-scene--${route}`}>
          <Image
            src={serviceCardArt(route)}
            alt={artwork.alt[locale === "en" ? "en" : "ru"]}
            fill
            sizes="(max-width: 520px) 100vw, (max-width: 840px) 90vw, 42vw"
            className="service-scene__image"
          />
          <span className="service-scene__stamp" aria-hidden="true">JO / WORKSHOP</span>
        </div>
        <div className="service-row__copy">
          <span className="service-row__tag">{service.tag}</span>
          <h3>{service.title}</h3>
          <p>{service.text}</p>
          <span className="service-row__time">{serviceTimelines[route][locale === "en" ? "en" : "ru"]}</span>
        </div>
        <span className="service-row__link" aria-hidden="true">↗</span>
      </Link>
    );
  };

  return (
    <section id="services" className="section section--alt" aria-labelledby="services-heading">
      <div className="shell services-layout">
        <div className="services-intro reveal-item">
          <p className="section-kicker">{t("kicker")}</p>
          <h2 id="services-heading">{t("title")}</h2>
          <p className="section-lead">{t("lead")}</p>
          <div className="services-intro__actions">
            <Link href={`/${locale}/services`} className="services-intro__link">{t("allServices")} <span aria-hidden="true">↗</span></Link>
            <a href="#calculator" className="services-intro__link">{locale === "en" ? "Estimate the cost" : "Рассчитать стоимость"} <span aria-hidden="true">↗</span></a>
            <a href="#contact" className="services-intro__link services-intro__link--secondary">{t("cta")} <span aria-hidden="true">↗</span></a>
          </div>
        </div>
        <div className="services-list">{items.map((_, index) => renderService(index))}</div>
      </div>
    </section>
  );
}
