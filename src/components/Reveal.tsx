"use client";

import { useEffect } from "react";

const SELECTOR = ".reveal-item";

function isInView(el: HTMLElement) {
  const rect = el.getBoundingClientRect();
  const vh = window.innerHeight || document.documentElement.clientHeight;
  return rect.top < vh * 0.92 && rect.bottom > vh * 0.08;
}

export function Reveal() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const nodes = Array.from(document.querySelectorAll<HTMLElement>(SELECTOR));
    if (!nodes.length) return;

    if (reduced) {
      nodes.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );

    nodes.forEach((el) => {
      if (el.classList.contains("is-visible")) return;
      if (isInView(el)) {
        el.classList.add("is-visible");
        return;
      }
      io.observe(el);
    });

    return () => io.disconnect();
  }, []);

  return null;
}
