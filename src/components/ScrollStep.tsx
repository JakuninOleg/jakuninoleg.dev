"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

const SECTION_IDS = ["solutions", "work", "services", "contact", "stack"] as const;

function sectionTop(el: HTMLElement) {
  return el.getBoundingClientRect().top + window.scrollY;
}

function isNearBottom() {
  return window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 24;
}

export function ScrollStep() {
  const t = useTranslations("Hero");
  const [up, setUp] = useState(false);

  useEffect(() => {
    let raf = 0;

    const sync = () => {
      raf = 0;
      setUp(isNearBottom());
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(sync);
    };

    sync();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", sync);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", sync);
    };
  }, []);

  function onClick() {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const behavior: ScrollBehavior = reduced ? "auto" : "smooth";

    if (up) {
      const top = document.getElementById("top") ?? document.body;
      window.scrollTo({ top: 0, behavior });
      top.focus?.({ preventScroll: true });
      return;
    }

    const probe = window.scrollY + (window.matchMedia("(max-width: 819px)").matches ? 28 : 48);
    const next = SECTION_IDS.map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el))
      .find((el) => sectionTop(el) > probe);

    if (next) {
      window.scrollTo({ top: Math.max(0, sectionTop(next) - 12), behavior });
      return;
    }

    window.scrollTo({
      top: document.documentElement.scrollHeight - window.innerHeight,
      behavior,
    });
  }

  return (
    <button
      type="button"
      className={`scroll-step${up ? " is-up" : ""}`}
      aria-label={up ? t("scrollUp") : t("scrollDown")}
      onClick={onClick}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true" fill="none">
        <path
          d="M12 5v14m0 0 6-6m-6 6-6-6"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
