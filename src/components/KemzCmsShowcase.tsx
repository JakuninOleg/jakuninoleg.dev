import Image from "next/image";
import Link from "next/link";
import styles from "./KemzCmsShowcase.module.css";

export function KemzCmsShowcase({ locale, compact = false }: { locale: string; compact?: boolean }) {
  const ru = locale !== "en";
  const features = ru ? [
    ["Контент и каталог", "Продукция, категории, новости и документы собраны в OJ CMS на базе Payload. У материалов есть статусы публикации; карточку продукции можно сохранить как черновик."],
    ["Заявки внутри CMS", "Обращение с сайта сохраняется до отправки почтового уведомления. Редактор может просматривать заявки, а обработка и удаление доступны администратору."],
    ["Метрика рядом с контентом", "Через API Яндекс Метрики подключены посетители, визиты, просмотры и популярные страницы. Команда видит посещаемость за выбранный период прямо в панели."],
  ] : [
    ["Content and catalog", "Products, categories, news and documents live in OJ CMS, built on Payload. Content has publishing states, and product edits can be saved as drafts."],
    ["Inquiries in the CMS", "Website inquiries are saved before an email notification is sent. Editors can view them; processing and deletion are reserved for administrators."],
    ["Analytics alongside content", "The Yandex Metrika API brings visitors, visits, page views and popular pages into the dashboard, with a selectable reporting period."],
  ];
  return <section className={styles.section} aria-labelledby="kemz-cms-proof-title">
    <div className="shell">
      <div className={styles.heading}><p className={styles.kicker}>OJ CMS / {ru ? "В РАБОТЕ У КЭМЗ" : "LIVE AT KEMZ"}</p><h2 id="kemz-cms-proof-title">{ru ? "Каталог, обращения и статистика — в одной панели" : "Catalog, inquiries and analytics in one dashboard"}</h2><p>{ru ? "Для сайта КЭМЗ на Next.js и React я подключил Payload и адаптировал OJ CMS под работу завода. Ниже — реальные экраны внедрения, а не дизайн-концепция." : "For the KEMZ website on Next.js and React, I integrated Payload and adapted OJ CMS to the factory’s workflows. These are actual implementation screens."}</p></div>
      <figure className={styles.dashboard}><Image src="/projects/kemz/cms/dashboard.webp" alt={ru ? "Рабочая панель OJ CMS на сайте КЭМЗ: продукция, категории, новости, недавние изменения и заявки" : "Live KEMZ OJ CMS dashboard: products, categories, news, recent changes and inquiries"} width={1265} height={723} sizes="(max-width: 760px) 92vw, 1200px" loading="lazy" /><figcaption>{ru ? "Реальный интерфейс КЭМЗ · октябрь 2026. Персональные данные заявок не показаны." : "Actual KEMZ interface · October 2026. Personal inquiry data is not shown."}</figcaption></figure>
      <div className={styles.features}>{features.map(([title, text]) => <div key={title}><h3>{title}</h3><p>{text}</p></div>)}</div>
      {!compact && <div className={styles.screens}>
        <figure><Image src="/projects/kemz/cms/editor.webp" alt={ru ? "Редактор продукции КЭМЗ с категорией, изображением, черновиком и публикацией" : "KEMZ product editor with category, image, draft and publishing controls"} width={805} height={580} sizes="(max-width: 760px) 92vw, 58vw" loading="lazy" /><figcaption>{ru ? "Карточка продукции: поля под технический каталог и отдельное действие публикации." : "Product editing: fields for a technical catalog and a separate publishing action."}</figcaption></figure>
        <figure><Image src="/projects/kemz/cms/analytics.webp" alt={ru ? "Статистика КЭМЗ из Яндекс Метрики в OJ CMS: визиты, просмотры, график и популярные страницы" : "KEMZ Yandex Metrika data in OJ CMS: visits, views, chart and popular pages"} width={809} height={700} sizes="(max-width: 760px) 92vw, 38vw" loading="lazy" /><figcaption>{ru ? "Снимок статистики показывает возможности панели; это не показатель роста продаж." : "This analytics snapshot illustrates the dashboard, not sales growth."}</figcaption></figure>
      </div>}
      {compact && <Link className={styles.link} href={`/${locale}/work/aokemz`}>{ru ? "Разобрать внедрение на сайте КЭМЗ" : "Explore the KEMZ implementation"} ↗</Link>}
    </div>
  </section>;
}
