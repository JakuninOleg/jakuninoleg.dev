import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { KemzCase } from "@/components/KemzCase";
import { BlogContextLink } from "@/components/BlogContextLink";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return [{ locale: "ru" }, { locale: "en" }];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Portfolio.kemz" });
  return {
    title: t("seoTitle"),
    description: t("seoDescription"),
    alternates: { canonical: `/${locale}/work/aokemz`, languages: { ru: "/ru/work/aokemz", en: "/en/work/aokemz" } },
    openGraph: { title: t("seoTitle"), description: t("seoDescription"), images: ["/projects/aokemz-v2.webp"] },
  };
}

export default async function KemzPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const n = await getTranslations("Nav");
  return <><a href="#main" className="skip-link">{n("skipToContent")}</a><Header /><Reveal /><main id="main" className="case-page flex-1"><KemzCase locale={locale} /><BlogContextLink locale={locale} context="caseCatalog" /></main><Footer /></>;
}
