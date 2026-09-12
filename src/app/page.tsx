import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { isLocale, routing } from "@/i18n/routing";

/**
 * Fallback if proxy doesn't run.
 * Same priority as next-intl: cookie → Accept-Language → defaultLocale.
 */
export default async function RootPage() {
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get("NEXT_LOCALE")?.value;
  if (cookieLocale && isLocale(cookieLocale)) {
    redirect(`/${cookieLocale}`);
  }

  const acceptLanguage = (await headers()).get("accept-language");
  redirect(`/${localeFromAcceptLanguage(acceptLanguage)}`);
}

function localeFromAcceptLanguage(header: string | null): string {
  if (!header) return routing.defaultLocale;

  const tags = header
    .split(",")
    .map((part) => {
      const [rawTag, ...params] = part.trim().split(";");
      const qParam = params.find((p) => p.trim().startsWith("q="));
      const quality = qParam ? Number(qParam.split("=")[1]) : 1;
      return {
        tag: rawTag.trim().toLowerCase(),
        quality: Number.isFinite(quality) ? quality : 0,
      };
    })
    .sort((a, b) => b.quality - a.quality);

  for (const { tag } of tags) {
    if (!tag) continue;
    if (isLocale(tag)) return tag;
    const base = tag.split("-")[0];
    if (isLocale(base)) return base;
  }

  return routing.defaultLocale;
}
