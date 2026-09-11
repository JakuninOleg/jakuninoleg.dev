"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";
import { site } from "@/content/site";

export function Header() {
  const t = useTranslations("Nav");
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const links = [
    { href: "#services", label: t("services") },
    { href: "#work", label: t("work") },
    { href: "#contact", label: t("contact") },
    { href: "#stack", label: t("stack") },
  ];

  const socials = [
    { href: site.github, label: "GitHub", external: true },
    { href: `mailto:${site.email}`, label: "Email", external: false },
    { href: site.telegram, label: site.telegramHandle, external: true },
  ];

  useEffect(() => {
    setMounted(true);
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

  return (
    <header className={`topbar${open ? " is-menu-open" : ""}`}>
      <div className="shell topbar__inner">
        <button
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

        <div className="brand-stack">
          <a href="#top" className="brand" onClick={() => setOpen(false)}>
            <span className="brand__mark" aria-hidden>
              JO
            </span>
            <span className="brand__text">
              <strong>{site.name}</strong>
              <span>{site.role}</span>
            </span>
          </a>
          <div className="brand-socials" aria-label={t("socialLabel")}>
            {socials.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noreferrer" : undefined}
              >
                {item.label}
              </a>
            ))}
          </div>
          <div className="brand-locale">
            <LocaleSwitcher />
          </div>
        </div>
      </div>

      <aside
        id="menu-panel"
        className={`menu-panel${open ? " is-open" : ""}`}
        aria-hidden={!open}
        {...(!open ? ({ inert: true } as React.HTMLAttributes<HTMLElement>) : {})}
      >
        <nav aria-label={t("navLabel")}>
          {links.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setOpen(false)} tabIndex={open ? 0 : -1}>
              {link.label}
            </a>
          ))}
        </nav>
        <div className="menu-panel__tools">
          <LocaleSwitcher />
          <a href="#contact" className="menu-panel__cta" onClick={() => setOpen(false)} tabIndex={open ? 0 : -1}>
            {t("write")}
          </a>
        </div>
      </aside>
    </header>
  );
}
