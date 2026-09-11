import { getTranslations } from "next-intl/server";
import { HeroStage } from "@/components/HeroStage";

export async function Hero() {
  const t = await getTranslations("Hero");
  const focus = t.raw("focus") as string[];

  return (
    <section className="hero" id="top" aria-labelledby="hero-heading">
      <p className="hero-watermark" aria-hidden="true">
        {t("watermark")}
      </p>

      <HeroStage />

      <div className="shell hero-content">
        <div className="hero-copy">
          <p className="eyebrow">{t("eyebrow")}</p>
          <h1 id="hero-heading">{t("headline")}</h1>
          <p className="lead">{t("lead")}</p>
          <div className="hero-actions">
            <a href="#contact" className="btn-main">
              {t("primaryCta")}
            </a>
            <a href="#work" className="btn-side">
              {t("secondaryCta")}
            </a>
          </div>
          <div className="focus-card reveal-item" style={{ ["--reveal-delay" as string]: "0.12s" }}>
            <div className="focus-card__head">
              <strong>{t("focusTitle")}</strong>
              <span className="focus-card__tag">{t("focusTag")}</span>
            </div>
            <ul className="focus-list">
              {focus.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
