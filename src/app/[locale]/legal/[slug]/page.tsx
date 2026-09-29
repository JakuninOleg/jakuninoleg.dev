import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
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
import { privacyBlogPath } from "@/content/blog";

const intros = {
  privacy: { eyebrow: "01 / ПЕРСОНАЛЬНЫЕ ДАННЫЕ", title: "Данные посетителей — под контролем", lead: "Здесь описано, какие данные я получаю через сайт, зачем они нужны и как можно обратиться по поводу их обработки." },
  consent: { eyebrow: "02 / СОГЛАСИЕ", title: "Понятные правила для заявки", lead: "Перед отправкой формы можно узнать, на какую обработку данных вы даёте согласие и как его отозвать." },
  cookies: { eyebrow: "03 / COOKIE И АНАЛИТИКА", title: "Вы решаете, что разрешить", lead: "Объясняю, какие технологии использует сайт и как управлять необязательной аналитикой." },
} as const;

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
    description: `${doc.title}. Сведения об обработке данных на сайте Олега Якунина и контакты оператора.`,
    alternates: { canonical: `/${locale}/legal/${slug}` },
    robots: { index: locale === "ru", follow: true },
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
  const intro = intros[slug];

  return (
    <>
      <Header />
      <main id="main" className="legal-page">
        <header className="shell legal-hero">
          <nav className="legal-breadcrumbs" aria-label={locale === "en" ? "Breadcrumbs" : "Хлебные крошки"}><Link href={`/${locale}`}>{locale === "en" ? "Home" : "Главная"}</Link><span>/</span><span>{t(`${slug}.nav`)}</span></nav>
          <div className="legal-hero__grid">
            <div><p className="legal-hero__eyebrow">{intro.eyebrow}</p><p className="legal-hero__title">{intro.title}</p><p className="legal-hero__lead">{intro.lead}</p><div className="legal-hero__actions"><Link href={privacyBlogPath(locale)}>{locale === "en" ? "152-FZ website checklist" : "Что проверить по 152‑ФЗ"} ↗</Link><Link href={`/${locale}#contact`}>{locale === "en" ? "Contact me" : "Задать вопрос"} ↗</Link></div></div>
            <div className="legal-hero__art"><span>ДАННЫЕ / МАРШРУТ / КОНТРОЛЬ</span><Image src="/blog/mascot-152-fz.webp" alt="" width={1254} height={1254} sizes="(max-width: 760px) 88vw, 38vw" priority /></div>
          </div>
        </header>
        <div className="shell legal-shell">
          <p className="legal-kicker">{locale === "en" ? "SITE DOCUMENT / RUSSIAN TEXT" : "ДОКУМЕНТ САЙТА / АКТУАЛЬНАЯ РЕДАКЦИЯ"}</p>
          <LegalArticle
            title={doc.title}
            blocks={doc.blocks}
            locale={locale}
            note={locale === "en" ? t("ruOnlyNote") : undefined}
          />
        </div>
        <aside className="shell legal-next"><p>{locale === "en" ? "CONTINUE READING" : "ЧТО ЕЩЁ ПОСМОТРЕТЬ"}</p><h2>{locale === "en" ? "A website is more than a form." : "За аккуратной формой стоит продуманный сайт."}</h2><div><Link href={privacyBlogPath(locale)}>{locale === "en" ? "152-FZ guide for website owners" : "Статья: 152‑ФЗ для владельца сайта"}<span>↗</span></Link><Link href={`/${locale}/services`}>{locale === "en" ? "Website services" : "Разработка сайтов и услуг"}<span>↗</span></Link><Link href={`/${locale}/blog`}>{locale === "en" ? "All articles" : "Все статьи блога"}<span>↗</span></Link></div></aside>
      </main>
      <Footer />
    </>
  );
}
