import { getLocale, getTranslations } from "next-intl/server";
import { HeroStage } from "@/components/HeroStage";

export async function Hero() {
  const t = await getTranslations("Hero");
  const locale = await getLocale();
  const scope = t.raw("scope") as string[];

  return (
    <section className="hero" id="top" aria-labelledby="hero-heading">
      <p className="hero-mobile-identity" aria-hidden="true">{t("eyebrow")}</p>
      <HeroStage />

      <div className="shell hero-content">
        <div className="hero-copy">
          <p className="eyebrow">{t("eyebrow")}</p>
          <h1 id="hero-heading"><span className="hero-headline-desktop">{t.rich("headline", { keep: (chunks) => <span className="hero-keep">{chunks}</span> })}</span><span className="hero-headline-mobile">{t("headlineMobile")}</span></h1>
          <p className="lead"><span className="hero-lead-desktop">{t("lead")}</span><span className="hero-lead-mobile">{t("leadMobile")}</span></p>
          <div className="hero-actions">
            <a href="#contact" className="btn-main">
              {t("primaryCta")}
            </a>
            <a href={`/${locale}/work`} className="btn-side">
              {t("secondaryCta")}
            </a>
          </div>
          <a href="#process" className="hero-about-link">{t("aboutCta")} <span aria-hidden="true">↗</span></a>
          <a href="#process" className="hero-scroll-cue">{t("scrollPrompt")} <span aria-hidden="true">↓</span></a>
          <ul className="hero-scope" aria-label={t("scopeLabel")}>
            {scope.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>
      </div>
    </section>
  );
}
