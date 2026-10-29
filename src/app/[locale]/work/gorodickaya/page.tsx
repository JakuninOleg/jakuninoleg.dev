import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { GorodickayaCase } from "@/components/GorodickayaCase";
import { gorodickayaCase } from "@/content/gorodickaya-case";
import styles from "@/components/GorodickayaCase.module.css";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return [{ locale: "ru" }, { locale: "en" }];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const c = gorodickayaCase[locale === "en" ? "en" : "ru"];
  return {
    title: c.seoTitle,
    description: c.seoDescription,
    alternates: { canonical: `/${locale}/work/gorodickaya`, languages: { ru: "/ru/work/gorodickaya", en: "/en/work/gorodickaya" } },
    openGraph: { title: c.seoTitle, description: c.seoDescription, images: [{ url: "/projects/gorodickaya/desktop.webp", width: 1425, height: 990, alt: c.desktopAlt }] },
    twitter: { card: "summary_large_image", title: c.seoTitle, description: c.seoDescription, images: ["/projects/gorodickaya/desktop.webp"] },
  };
}

export default async function GorodickayaPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const n = await getTranslations("Nav");
  return <div className={styles.page}><a href="#main" className="skip-link">{n("skipToContent")}</a><Header /><main id="main" className="case-page flex-1"><GorodickayaCase locale={locale} /></main><Footer /></div>;
}
