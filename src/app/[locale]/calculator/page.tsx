import type { Metadata } from "next";
import Link from "next/link";
import { setRequestLocale } from "next-intl/server";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ProjectQuiz } from "@/components/ProjectQuiz";
import styles from "./page.module.css";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return [{ locale: "ru" }, { locale: "en" }];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const ru = locale !== "en";
  const title = ru ? "Калькулятор стоимости сайта, магазина и AI-проекта" : "Website, store and AI project cost calculator";
  const description = ru ? "Оцените стоимость и сроки лендинга, корпоративного сайта, каталога, интернет-магазина, портала, редизайна, CMS или AI-решения. Примерный расчёт за несколько шагов." : "Estimate the cost and timeline of a landing page, company website, catalog, online store, portal, redesign, CMS or AI solution.";
  return {
    title, description,
    alternates: { canonical: `/${locale}/calculator`, languages: { ru: "/ru/calculator", en: "/en/calculator" } },
    openGraph: { type: "website", url: `/${locale}/calculator`, title, description },
  };
}

export default async function CalculatorPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const ru = locale !== "en";
  return <>
    <a href="#main" className="skip-link">{ru ? "К содержимому" : "Skip to content"}</a>
    <Header />
    <main id="main" className={styles.page}>
      <section className={styles.hero} aria-labelledby="calculator-title"><div className="shell">
        <Breadcrumbs locale={locale} items={[{ label: ru ? "Услуги" : "Services", href: `/${locale}/services` }, { label: ru ? "Калькулятор" : "Calculator" }]} />
        <p className={styles.kicker}>OJ / {ru ? "МАСТЕРСКАЯ ПРОЕКТА" : "PROJECT WORKSHOP"}</p>
        <h1 id="calculator-title">{ru ? <>Давайте прикинем <em>ваш проект</em></> : <>Let&apos;s plan <em>your project</em></>}</h1>
        <div className={styles.heroBottom}><p>{ru ? "Пять коротких шагов: выберите формат, масштаб и нужные функции. Я покажу ориентир по стоимости и срокам, а вы сможете прислать мне расчёт для точной сметы." : "Five short steps: choose the format, scope and features. See a price and timeline guide, then send the estimate for a firm quote."}</p><Link href={`/${locale}/services`}>{ru ? "Все услуги" : "All services"} ↗</Link></div>
      </div></section>
      <ProjectQuiz locale={locale} />
    </main>
    <Footer />
  </>;
}
