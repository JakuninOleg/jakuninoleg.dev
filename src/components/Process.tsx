import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";

const artwork = [
  "/process-art/01-discovery.webp",
  "/process-art/02-research.webp",
  "/process-art/03-design.webp",
  "/process-art/04-build.webp",
  "/process-art/05-launch.webp",
];

type ProcessStep = {
  title: string;
  text: string;
  result: string;
  alt: string;
};

export async function Process() {
  const t = await getTranslations("Process");
  const locale = await getLocale();
  const steps = t.raw("steps") as ProcessStep[];

  return (
    <section id="process" className="section process-section" aria-labelledby="process-heading">
      <div className="shell">
        <div className="process-head">
          <div>
            <p className="section-kicker">{t("kicker")}</p>
            <h2 id="process-heading">{t("title")}</h2>
          </div>
          <p>{t("lead")}</p>
        </div>

        <ol className="process-grid">
          {steps.map((step, index) => (
            <li className="process-card reveal-item" key={step.title} style={{ ["--reveal-delay" as string]: `${(index % 3) * 0.06}s` }}>
              <div className="process-card__topline">
                <span>{String(index + 1).padStart(2, "0")} / 05</span>
                <span className="process-card__mark" aria-hidden="true">✳</span>
              </div>
              <div className="process-card__art">
                <Image
                  src={artwork[index]}
                  alt={step.alt}
                  width={960}
                  height={720}
                  sizes="(max-width: 699px) 100vw, (max-width: 1100px) 50vw, 33vw"
                  loading="lazy"
                  unoptimized
                />
              </div>
              <div className="process-card__copy">
                <h3>{step.title}</h3>
                <p>{step.text}</p>
                <p className="process-card__result"><span>{t("resultLabel")}</span> {step.result}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="process-end">
          <p>{t("note")}</p>
          <div className="process-end__links">
            <a href={`/${locale}/work`}>{t("workCta")} <span aria-hidden="true">↗</span></a>
            <a href="#contact">{t("contactCta")} <span aria-hidden="true">↗</span></a>
          </div>
        </div>
      </div>
    </section>
  );
}
