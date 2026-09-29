import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { VneShablonaCase } from "@/components/VneShablonaCase";
import { BlogContextLink } from "@/components/BlogContextLink";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return [{ locale: "ru" }, { locale: "en" }];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "VneCase" });
  return {
    title: t("seoTitle"),
    description: t("seoDescription"),
    alternates: { canonical: `/${locale}/work/vne-shablona`, languages: { ru: "/ru/work/vne-shablona", en: "/en/work/vne-shablona" } },
    openGraph: { title: t("seoTitle"), description: t("seoDescription"), images: ["/projects/vne-shablona/desktop-actual.webp"] },
  };
}

export default async function VneShablonaPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const n = await getTranslations("Nav");
  return <><link rel="preload" href="/fonts/onest-latin.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />{locale === "ru" && <link rel="preload" href="/fonts/onest-cyrillic.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />}<a href="#main" className="skip-link">{n("skipToContent")}</a><Header /><Reveal /><main id="main" className="case-page flex-1"><VneShablonaCase locale={locale} /><BlogContextLink locale={locale} context="case" /></main><Footer /></>;
}
