import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { setRequestLocale } from "next-intl/server";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ServiceLeadForm } from "@/components/ServiceLeadForm";
import { BlogContextLink } from "@/components/BlogContextLink";
import styles from "./page.module.css";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() { return [{ locale: "ru" }, { locale: "en" }]; }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isRu = locale !== "en";
  const title = isRu ? "OJ CMS — управление контентом сайта без лишней сложности" : "OJ CMS — clear content management for your website";
  const description = isRu ? "OJ CMS — система управления сайтом на базе Payload: страницы, медиа, роли, предпросмотр и публикация в интерфейсе для команды." : "OJ CMS is a Payload-based content management system for pages, media, roles, previews and publishing.";
  return { title, description, alternates: { canonical: `/${locale}/oj-cms`, languages: { ru: "/ru/oj-cms", en: "/en/oj-cms" } }, openGraph: { title, description, images: ["/projects/oj-cms-wide.webp"] } };
}

export default async function OjCmsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isRu = locale !== "en";
  return <>
    <a href="#main" className="skip-link">{isRu ? "К содержимому" : "Skip to content"}</a>
    <Header />
    <main id="main" className={styles.page}>
      <section className={styles.hero}><div className="shell">
        <Breadcrumbs locale={locale} items={[{ label: "OJ CMS" }]} />
        <div className={styles.heroGrid}>
          <div><p className={styles.kicker}>OJ CMS / CONTENT SYSTEM</p><h1>{isRu ? "Сайт меняется вместе с вашим бизнесом" : "A website that grows with your business"}</h1><p className={styles.lead}>{isRu ? "OJ CMS — моя система управления контентом на базе Payload. Редакторы обновляют страницы, новости и медиа в понятной панели, а посетители видят сайт с собственным дизайном." : "OJ CMS is my Payload-based content system. Editors update pages, news and media in a focused workspace while visitors see a website with its own design."}</p><div className={styles.actions}><a href="#service-contact">{isRu ? "Обсудить сайт с OJ CMS" : "Discuss a site with OJ CMS"} ↗</a><a href="https://oj-cms.vercel.app/admin" target="_blank" rel="noreferrer">{isRu ? "Открыть интерфейс" : "Explore the interface"} ↗</a></div></div>
          <div className={styles.heroArt}><Image src="/service-art/cms-interface.webp" alt={isRu ? "Маскот работает с контентом в OJ CMS" : "Mascot working with content in OJ CMS"} fill priority sizes="(max-width: 900px) 100vw, 48vw" /></div>
        </div>
      </div></section>
      <section className={styles.interface}><div className={`shell ${styles.interfaceGrid}`}><div><p className={styles.kicker}>01 / {isRu ? "ИНТЕРФЕЙС" : "INTERFACE"}</p><h2>{isRu ? "Рабочая панель для вашей команды" : "A workspace for your team"}</h2><p>{isRu ? "Структуру разделов и права доступа подстраиваю под конкретный сайт. Редактор видит материалы, статусы и предпросмотр без необходимости просить разработчика изменить каждый текст." : "Collections and permissions are tailored to each website. Editors can manage content, publication states and previews without asking a developer for every text change."}</p></div><Image src="/projects/oj-cms-wide.webp" alt={isRu ? "Реальный интерфейс OJ CMS" : "Actual OJ CMS interface"} width={1438} height={1224} sizes="(max-width: 900px) 100vw, 52vw" /></div></section>
      <section className={styles.capabilities}><div className="shell"><p className={styles.kicker}>02 / {isRu ? "ВОЗМОЖНОСТИ" : "CAPABILITIES"}</p><h2>{isRu ? "Контент под задачу, а не под шаблон" : "Content shaped around the job"}</h2><div className={styles.cards}>{(isRu ? [
        ["Страницы и материалы", "Поля и связи отражают структуру сайта: страницы, новости, медиа и карточки товаров."],
        ["Роли и публикация", "Доступы для сотрудников, черновики и предпросмотр перед размещением."],
        ["Собственный интерфейс сайта", "CMS отвечает за данные, а внешний вид и сценарии создаются под ваш бренд."],
      ] : [
        ["Pages and content", "Fields and relations reflect the website: pages, news, media and product records."],
        ["Roles and publishing", "Team permissions, drafts and preview before publishing."],
        ["Your own website design", "The CMS handles content while the public interface follows your brand."],
      ]).map(([heading, text], index) => <article key={heading}><span>0{index + 1}</span><h3>{heading}</h3><p>{text}</p></article>)}</div></div></section>
      <section className={styles.links}><div className="shell"><p>{isRu ? "Хотите понять, как это выглядит в работе?" : "Want to see it in a real project?"}</p><Link href={`/${locale}/work/oj-cms`}>{isRu ? "Кейс OJ CMS" : "OJ CMS case study"} ↗</Link><Link href={`/${locale}/services/cms`}>{isRu ? "Услуга разработки сайта с CMS" : "Website CMS development service"} ↗</Link></div></section>
      <BlogContextLink locale={locale} context="cms" />
      <ServiceLeadForm locale={locale} service="OJ CMS" title={isRu ? "Нужен сайт с удобным управлением?" : "Need a website your team can manage?"} lead={isRu ? "Расскажите, какие материалы обновляет команда и какие разделы нужны. Предложу структуру и состав работ." : "Tell me what your team updates and which sections you need. I’ll suggest a structure and scope."} />
    </main><Footer />
  </>;
}
