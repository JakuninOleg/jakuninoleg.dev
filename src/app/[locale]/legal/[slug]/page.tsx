import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { LegalArticle } from "@/components/LegalArticle";
import {
  getLegalDoc,
  isLegalSlug,
  legalSlugs,
} from "@/content/legal";
import { routing } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    legalSlugs.map((slug) => ({ locale, slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLegalSlug(slug)) return {};
  const t = await getTranslations({ locale, namespace: "Legal" });
  const doc = getLegalDoc(slug);
  return {
    title: t(`${slug}.nav`),
    description: doc.title,
    robots: { index: true, follow: true },
  };
}

export default async function LegalPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLegalSlug(slug)) notFound();
  setRequestLocale(locale);

  const t = await getTranslations("Legal");
  const doc = getLegalDoc(slug);

  return (
    <>
      <Header />
      <main id="main" className="legal-page">
        <div className="shell legal-shell">
          <p className="legal-kicker">
            <a href={`/${locale}#contact`}>{t("back")}</a>
          </p>
          <LegalArticle
            title={doc.title}
            blocks={doc.blocks}
            locale={locale}
            note={locale === "en" ? t("ruOnlyNote") : undefined}
          />
        </div>
      </main>
      <Footer />
    </>
  );
}
