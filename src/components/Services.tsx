"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const accents = ["cyan", "pink", "amber", "orange", "violet", "lime"] as const;

export function Services() {
  const t = useTranslations("Services");
  const rootRef = useRef<HTMLElement>(null);
  const items = t.raw("items") as { tag: string; title: string; text: string }[];

  useGSAP(
    () => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const cards = gsap.utils.toArray<HTMLElement>(".service-card");
      if (!cards.length) return;

      if (reduced) {
        gsap.set(cards, { opacity: 1, y: 0, clearProps: "transform" });
        return;
      }

      gsap.from(cards, {
        opacity: 0,
        y: 36,
        duration: 0.7,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 72%",
          once: true,
        },
      });
    },
    { scope: rootRef },
  );

  return (
    <section
      ref={rootRef}
      id="services"
      className="section section--alt"
      aria-labelledby="services-heading"
    >
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
              className={`service-card service-card--${accents[index % accents.length]}`}
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
