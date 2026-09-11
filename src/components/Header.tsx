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
    { href: "#work", label: t("work") },
    { href: "#services", label: t("services") },
    { href: "#stack", label: t("stack") },
    { href: "#contact", label: t("contact") },
  ];

  useEffect(() => {
    setMounted(true);
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className="header">
      <div className="shell header-inner">
        <a href="#top" className="logo">
          Jakunin <span>Oleg</span>
        </a>
        <nav className="nav-desktop" aria-label={t("navLabel")}>
          {links.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
        <div className="header-tools">
          <LocaleSwitcher />
          <a href="#contact" className="header-cta">
            {t("write")}
          </a>
        </div>
        <button
          type="button"
          className="menu-toggle"
          aria-expanded={mounted ? open : false}
          aria-controls="mobile-menu"
          aria-label={open ? t("closeMenu") : t("openMenu")}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
        </button>
      </div>
      {mounted && open ? (
        <nav id="mobile-menu" className="nav-mobile" aria-label={t("mobileNavLabel")}>
          {links.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
              {link.label}
            </a>
          ))}
          <div className="nav-mobile-tools">
            <LocaleSwitcher />
            <a href="#contact" className="header-cta" onClick={() => setOpen(false)}>
              {t("write")}
            </a>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
