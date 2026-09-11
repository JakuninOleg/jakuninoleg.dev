"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";

export function Header() {
  const t = useTranslations("Nav");
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [hidden, setHidden] = useState(false);
  const panelRef = useRef<HTMLElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const links = [
    { href: "#services", label: t("services") },
    { href: "#work", label: t("work") },
    { href: "#contact", label: t("contact") },
    { href: "#stack", label: t("stack") },
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    let lastY = window.scrollY;

    const onScroll = () => {
      const y = window.scrollY;
      if (open) {
        setHidden(false);
        lastY = y;
        return;
      }

      if (y < 40) {
        setHidden(false);
      } else if (y > lastY + 8) {
        setHidden(true);
      } else if (y < lastY - 8) {
        setHidden(false);
      }
      lastY = y;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (panelRef.current?.contains(target)) return;
      if (buttonRef.current?.contains(target)) return;
      setOpen(false);
    };

    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  return (
    <header
      className={`topbar${open ? " is-menu-open" : ""}${hidden ? " is-hidden" : ""}`}
    >
      <div className="shell topbar__inner">
        <a href="#top" className="brand" onClick={() => setOpen(false)}>
          <span className="brand__first">Jakunin</span>
          <span className="brand__last">Oleg</span>
        </a>

        <nav className="topbar-nav" aria-label={t("navLabel")}>
          {links.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className="topbar-end">
          <div className="topbar-locale">
            <LocaleSwitcher />
          </div>

          <button
            ref={buttonRef}
            type="button"
            className={`menu-button${open ? " is-open" : ""}`}
            aria-expanded={mounted ? open : false}
            aria-controls="menu-panel"
            aria-label={open ? t("closeMenu") : t("openMenu")}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="menu-lines" aria-hidden>
              <span />
              <span />
            </span>
          </button>
        </div>
      </div>

      <div
        className={`menu-backdrop${open ? " is-open" : ""}`}
        aria-hidden={!open}
        onClick={() => setOpen(false)}
      />

      <aside
        ref={panelRef}
        id="menu-panel"
        className={`menu-panel${open ? " is-open" : ""}`}
        aria-hidden={!open}
        {...(!open ? ({ inert: true } as React.HTMLAttributes<HTMLElement>) : {})}
      >
        <button
          type="button"
          className="menu-panel__close"
          aria-label={t("closeMenu")}
          tabIndex={open ? 0 : -1}
          onClick={() => setOpen(false)}
        >
          <span aria-hidden>×</span>
        </button>

        <nav aria-label={t("mobileNavLabel")}>
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              tabIndex={open ? 0 : -1}
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="menu-panel__tools">
          <LocaleSwitcher />
          <a
            href="#contact"
            className="menu-panel__cta"
            onClick={() => setOpen(false)}
            tabIndex={open ? 0 : -1}
          >
            {t("write")}
          </a>
        </div>
      </aside>
    </header>
  );
}
