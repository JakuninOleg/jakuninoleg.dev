"use client";

import { useTransition } from "react";
import { useParams } from "next/navigation";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

export function LocaleSwitcher() {
  const pathname = usePathname();
  const router = useRouter();
  const { locale: currentLocale } = useParams<{ locale: string }>();
  const [isPending, startTransition] = useTransition();

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
            startTransition(() => {
              router.replace(pathname, { locale });
            });
          }}
        >
          {locale.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
