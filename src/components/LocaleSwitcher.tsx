"use client";

import { useEffect, useTransition } from "react";
import { useParams } from "next/navigation";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

const SCROLL_KEY = "locale-switch-scroll-y";

export function LocaleSwitcher() {
  const pathname = usePathname();
  const router = useRouter();
  const { locale: currentLocale } = useParams<{ locale: string }>();
  const [isPending, startTransition] = useTransition();

  // Restore scroll after locale change (hash like #contact must not hijack the viewport).
  useEffect(() => {
    const raw = sessionStorage.getItem(SCROLL_KEY);
    if (raw == null) return;
    sessionStorage.removeItem(SCROLL_KEY);
    const y = Number(raw);
    if (!Number.isFinite(y)) return;

    const restore = () => window.scrollTo(0, y);
    restore();
    requestAnimationFrame(restore);
  }, [currentLocale]);

  return (
    <div
      className={`locale-switch${isPending ? " is-pending" : ""}`}
      aria-busy={isPending}
      role="group"
      aria-label="Language"
    >
      {routing.locales.map((locale) => (
        <button
          key={locale}
          type="button"
          className={locale === currentLocale ? "is-active" : undefined}
          disabled={locale === currentLocale || isPending}
          onClick={() => {
            // Drop #contact / #work so locale switch never jumps to an old hash target.
            if (window.location.hash) {
              const clean = `${window.location.pathname}${window.location.search}`;
              window.history.replaceState(null, "", clean);
            }
            sessionStorage.setItem(SCROLL_KEY, String(window.scrollY));
            startTransition(() => {
              router.replace(pathname, { locale, scroll: false });
            });
          }}
        >
          {locale.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
