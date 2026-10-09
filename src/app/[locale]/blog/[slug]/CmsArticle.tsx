import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { setRequestLocale } from "next-intl/server";
import { cmsBlogPath, cmsPostArt, cmsPostCopy, cmsPostDate } from "@/content/cms-post";
import styles from "../blog.module.css";
import cms from "./cms-article.module.css";

const sections = {
  ru: ["Сайт под бизнес", "Что такое Payload", "Что добавляет OJ CMS", "Вместо Tilda, WordPress и Битрикса", "Как это работает у КЭМЗ", "SEO и развитие", "Что я сделаю для вас"],
  en: ["A website built for business", "What Payload does", "What OJ CMS adds", "Beyond Tilda, WordPress and Bitrix", "Inside the KEMZ project", "Search and growth", "What I deliver"],
};

export function CmsPostPage({ locale }: { locale: string }) {
  setRequestLocale(locale);
  const en = locale === "en";
  const p = cmsPostCopy[en ? "en" : "ru"];
  const origin = process.env.NEXT_PUBLIC_SITE_URL ?? "https://jakuninoleg.dev";
  const url = `${origin}${cmsBlogPath(locale)}`;
  const schema = { "@context": "https://schema.org", "@graph": [
    { "@type": "BlogPosting", headline: p.title, description: p.lead, datePublished: cmsPostDate, dateModified: cmsPostDate, inLanguage: en ? "en" : "ru", author: { "@type": "Person", name: en ? "Oleg Jakunin" : "Олег Якунин", url: `${origin}/${locale}/resume` }, mainEntityOfPage: url, image: `${origin}${cmsPostArt}` },
    { "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: en ? "Home" : "Главная", item: `${origin}/${locale}` },
      { "@type": "ListItem", position: 2, name: en ? "Blog" : "Блог", item: `${origin}/${locale}/blog` },
      { "@type": "ListItem", position: 3, name: p.title, item: url },
    ] },
  ] };
  return <><a href="#main" className="skip-link">{en ? "Skip to content" : "К основному содержимому"}</a><Header /><main id="main" className={styles.root}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
    <header className={`shell ${styles.articleHero}`}>
      <nav className={styles.breadcrumbs} aria-label={en ? "Breadcrumbs" : "Хлебные крошки"}><Link href={`/${locale}`}>{en ? "Home" : "Главная"}</Link><span>/</span><Link href={`/${locale}/blog`}>{en ? "Blog" : "Блог"}</Link><span>/</span><span>Next.js + OJ CMS</span></nav>
      <p className={styles.eyebrow}>{p.tag} <span>·</span> <time dateTime={cmsPostDate}>{p.date}</time> <span>·</span> {p.time}</p>
      <h1>{p.title}</h1><p className={styles.heroLead}>{p.lead}</p>
      <div className={styles.heroByline}><span className={styles.bylineMark}>{en ? "OJ" : "ОЯ"}</span><span>{en ? "Oleg Jakunin / developer and creator of OJ CMS" : "Олег Якунин / разработчик и автор OJ CMS"}</span></div>
      <div className={cms.cover}><Image src={cmsPostArt} alt={en ? "Oleg's mascot assembling a custom website and a connected content panel at an engineering workbench" : "Маскот Олега собирает авторский сайт и связанную панель управления контентом за инженерным столом"} width={1440} height={810} sizes="(max-width: 760px) 92vw, 1100px" priority /></div>
    </header>
    <article className={`shell ${styles.article}`}>
      <nav className={styles.toc} aria-label={en ? "Article contents" : "Содержание статьи"}><p>{en ? "IN THIS ARTICLE" : "В ЭТОЙ СТАТЬЕ"}</p>{sections[en ? "en" : "ru"].map((title, i) => <a href={`#cms-${i}`} key={title}>{title}</a>)}</nav>
      <div className={styles.articleBody}>{en ? <English locale={locale} /> : <Russian locale={locale} />}</div>
    </article>
    <section className={`shell ${styles.articleCta}`}><p className={styles.eyebrow}>{en ? "BUILD WITH OLEG JAKUNIN" : "РАЗРАБОТКА С ОЛЕГОМ ЯКУНИНЫМ"}</p><h2>{en ? "A website worth showing. A CMS your team can use." : "Сайт, который хочется показать. CMS, которой удобно пользоваться."}</h2><p>{en ? "Send your current website or a brief. I will map the structure, integrations and editorial workflow, then propose a bespoke Next.js + OJ CMS build." : "Пришлите текущий сайт или опишите задачу. Разберу структуру, интеграции и работу редактора, предложу разработку на Next.js с OJ CMS под ваш бизнес."}</p><Link href={`/${locale}#contact`} className={styles.ctaButton}>{en ? "Discuss my website" : "Обсудить мой сайт"} <span aria-hidden>↗</span></Link></section>
  </main><Footer /></>;
}

function Chapter({ id, title, children }: { id: number; title: string; children: React.ReactNode }) {
  return <section id={`cms-${id}`} className={`${styles.prose} ${cms.chapter}`}><p className={styles.chapter}>{String(id + 1).padStart(2, "0")} / OJ CMS</p><h2>{title}</h2>{children}</section>;
}

function Architecture({ en }: { en: boolean }) {
  const items = en ? [["Next.js", "The website", "Design, navigation, catalog and customer interactions"], ["Payload", "The foundation", "Data, APIs, authentication and access rules"], ["OJ CMS", "Your team's workspace", "Custom interface, content, inquiries and analytics"]] : [["Next.js", "Сайт для клиента", "Дизайн, навигация, каталог и сценарии покупателя"], ["Payload", "Основа системы", "Данные, API, авторизация и правила доступа"], ["OJ CMS", "Панель для команды", "Авторский интерфейс, контент, заявки и аналитика"]];
  return <figure className={cms.diagram}><div className={cms.layers}>{items.map(([name, title, body]) => <div key={name}><span>{name}</span><strong>{title}</strong><p>{body}</p></div>)}</div><figcaption>{en ? "Next.js builds the public experience. Payload supplies the backend. OJ CMS adapts that foundation to your business." : "Next.js отвечает за сайт. Payload — за серверную основу. OJ CMS адаптирует эту основу под работу вашей команды."}</figcaption></figure>;
}

function Screen({ name, en }: { name: "dashboard" | "editor"; en: boolean }) {
  return <figure className={styles.catalogFigure}><Image className={styles.catalogCmsImage} src={`/projects/kemz/cms/${name}.webp`} width={name === "dashboard" ? 1265 : 805} height={name === "dashboard" ? 723 : 580} sizes="(max-width: 760px) 92vw, 790px" alt={name === "dashboard" ? (en ? "KEMZ OJ CMS dashboard with catalog counts, recent changes and website traffic" : "Панель OJ CMS для КЭМЗ: каталог, последние изменения и посещаемость сайта") : (en ? "KEMZ product editor in OJ CMS with fields for equipment content" : "Редактор продукции КЭМЗ в OJ CMS с полями для контента оборудования")} loading="lazy" /><figcaption>{name === "dashboard" ? (en ? "Actual KEMZ dashboard: catalog content and website analytics together." : "Реальная панель КЭМЗ: материалы каталога и статистика сайта рядом.") : (en ? "Actual KEMZ product editor. Fields follow the equipment catalog's structure." : "Реальный редактор продукции КЭМЗ. Поля повторяют структуру каталога оборудования.")}</figcaption></figure>;
}

function Russian({ locale }: { locale: string }) {
  return <>
    <Chapter id={0} title="Бизнес вырос. Сайт всё ещё живёт в шаблоне.">
      <p className={styles.dropLead}>Новый продукт, новый раздел, интеграция с отделом продаж — и каждое изменение превращается в поиск очередного обходного пути. Сайт должен помогать компании развиваться. Если вы постоянно подстраиваетесь под него, пора поменять подход к разработке.</p>
      <p>Я создаю сайты вокруг задач бизнеса: что клиент должен увидеть, как выбрать продукт, почему довериться компании и куда отправить заявку. Затем проектирую дизайн, разрабатываю интерфейс на Next.js и подключаю управление контентом через OJ CMS.</p>
      <p>Так устроен новый сайт АО КЭМЗ. Я перенёс старый сайт завода на Next.js и React, подключил Payload и адаптировал OJ CMS под каталог оборудования. Команда работает с продукцией, категориями, документами и новостями в собственной панели. Обращения с сайта сохраняются в CMS, а данные Яндекс Метрики доступны рядом с контентом.</p>
      <p><Link href={`/${locale}/work/aokemz`}>Посмотреть кейс КЭМЗ и экраны проекта ↗</Link></p>
    </Chapter>
    <Chapter id={1} title="Payload CMS: контент отдельно, дизайн свободен">
      <p>Payload — открытая платформа на TypeScript, которую я использую как серверную основу CMS. Она предоставляет панель управления, работу с базой данных, API, авторизацию и правила доступа. На этой основе можно описать именно ваши сущности: оборудование, характеристики, документы, публикации, заявки.</p>
      <p>Это headless-подход: CMS хранит и отдаёт данные, а внешний вид сайта разрабатывается отдельно. Редактор меняет название двигателя или добавляет PDF. Посетитель видит это в продуманной карточке товара, а не в интерфейсе самой CMS. Дизайн не привязан к теме движка.</p>
      <p>Для компании это означает свободу развивать сайт: добавить сравнение оборудования, личный кабинет, подбор по параметрам или новую интеграцию. Данные и интерфейс имеют понятную архитектуру, которую можно расширять.</p>
      <p>Payload можно разместить на выбранной инфраструктуре вместе с проектом. Базовая платформа открыта, а разработка, сервер и сопровождение входят в отдельную экономику вашего сайта. <a href="https://payloadcms.com/docs/getting-started/what-is-payload" target="_blank" rel="noreferrer">Как устроен Payload — документация платформы</a>.</p>
    </Chapter>
    <Architecture en={false} />
    <Chapter id={2} title="OJ CMS: я превращаю платформу в удобный рабочий инструмент">
      <p>OJ CMS — мой авторский интерфейс и набор доработок на базе Payload. Payload даёт технологическую основу; я проектирую поля, навигацию, экраны и интеграции под конкретную компанию. Поэтому редактор видит свою работу, а не десятки чужих настроек.</p>
      <p>В каталоге нужны продукция, категории и технические документы. В контентном проекте — статьи, авторы и медиа. В сервисном бизнесе — услуги и обращения. Я собираю модель контента до вёрстки, чтобы команда могла обновлять материалы без ручного редактирования HTML.</p>
      <p>Внедрение для КЭМЗ показывает этот подход в деле: материалы, обращения и аналитика объединены в одной панели. Не нужно менять привычный маршрут работы каждый раз, когда сайту добавляют новую функцию.</p>
      <p><Link href={`/${locale}/oj-cms`}>Подробнее об OJ CMS и возможностях панели ↗</Link></p>
    </Chapter>
    <Chapter id={3} title="Почему я выбираю эту разработку вместо Tilda, WordPress и Битрикса">
      <h3>Tilda: выйти за пределы конструктора</h3>
      <p>Я начинаю с архитектуры продукта и авторского дизайна. Каталог с техническими параметрами, сложный подбор и кабинет проектируются как части единой системы. Не приходится сначала выбирать готовый блок, а затем искать способ вместить в него бизнес-процесс.</p>
      <p>Есть и конкретная разница в контроле над проектом. По <a href="https://help.tilda.cc/export" target="_blank" rel="noreferrer">правилам экспорта Tilda</a> каталог и ленты не экспортируются, а приём заявок на экспортированном сайте требует активной подписки. В моём подходе сайт, CMS и обработка обращений разворачиваются в инфраструктуре проекта: их развитие не завязано на экспорт конструктора.</p>
      <h3>WordPress: собрать систему, а не коллекцию дополнений</h3>
      <p>Типичный путь сборки на WordPress — тема, визуальный редактор и плагины для отдельных задач. При развитии такого сайта приходится учитывать их настройки, обновления и совместимость. Я выбираю другой путь: описываю данные, компоненты и интеграции в коде проекта, а интерфейс CMS адаптирую под редактора.</p>
      <p>Новая функция получает место в общей архитектуре. Например, форма связана с записью обращения, оборудование — с категорией и документами, аналитика — с рабочей панелью. Вы заказываете связанный продукт, а не набор установленных расширений.</p>
      <h3>Битрикс: платить за свою задачу</h3>
      <p>У «1С-Битрикс: Управление сайтом» функции распределены по <a href="https://www.1c-bitrix.ru/products/cms/license.php" target="_blank" rel="noreferrer">коммерческим редакциям</a>. Я строю проект на открытой основе Payload: состав системы определяется задачей, а не выбором редакции CMS.</p>
      <p>Если компании нужен каталог с документами и заявками, я проектирую этот каталог. Если нужны интеграции — закладываю их отдельно. Вы получаете понятный состав работ и панель с нужными команде разделами.</p>
      <p><strong>Мой выбор — индивидуальная разработка, где бизнес управляет продуктом. Именно такой сайт я предлагаю создать для вас.</strong></p>
    </Chapter>
    <Chapter id={4} title="КЭМЗ: каталог, обращения и Метрика в одной системе">
      <p>Для завода CMS — ежедневная работа с конкретным оборудованием. Нужно обновить характеристики, приложить документ, опубликовать новость и увидеть, какие страницы интересуют посетителей. Я собрал эти задачи в OJ CMS.</p>
      <ul className={styles.catalogChecklist}><li><strong>Продукция и категории.</strong> Редактор ведёт каталог через поля, соответствующие структуре оборудования.</li><li><strong>Документы и новости.</strong> Материалы обновляются из панели, без изменения кода страницы.</li><li><strong>Обращения.</strong> Заявка сначала сохраняется в CMS, затем отправляется почтовое уведомление. История обращений остаётся в системе.</li><li><strong>Яндекс Метрика.</strong> API передаёт посещаемость и популярные страницы в админку. Команда видит статистику рядом с материалами сайта.</li></ul>
    </Chapter>
    <Screen name="dashboard" en={false} /><Screen name="editor" en={false} />
    <Chapter id={5} title="SEO закладывается в устройство сайта">
      <p>У каждого продукта и раздела должны быть собственный адрес, понятный заголовок и содержательная страница. Я проектирую структуру под вопросы покупателей: что они ищут, какие параметры сравнивают, какие документы нужны перед обращением.</p>
      <p>В разработку входят серверная выдача контента, метаданные, canonical, карта сайта, хлебные крошки и внутренние ссылки. Изображения получают подходящий размер и формат. Интерактивный код добавляется туда, где он нужен пользователю. Это даёт контроль над загрузкой и техническим SEO на уровне проекта.</p>
      <p>Контент тоже должен развиваться: страницы продукции, ответы на вопросы клиентов, разборы внедрений и статьи на основе опыта компании. Я могу подготовить структуру такого контента и план публикаций, а OJ CMS даст редактору удобное место для работы с ним.</p>
      <p><Link href={`/${locale}/services/seo-positioning`}>Как я работаю со структурой, SEO и контентом ↗</Link></p>
    </Chapter>
    <Chapter id={6} title="От задачи до сайта, которым команда пользуется">
      <p>Со мной вы работаете напрямую. Я разбираюсь в продукте и клиентах, проектирую структуру и редакционные сценарии, создаю дизайн и разрабатываю сайт. Затем подключаю CMS, формы, аналитику и необходимые интеграции, размещаю проект на сервере и показываю команде, как обновлять материалы.</p>
      <p>При переезде отдельно разбираю существующие страницы: какие адреса сохранить, где нужны редиректы, какие тексты, изображения и документы перенести. Новый сайт должен продолжить работу компании, а не заставить её начинать каталог с нуля.</p>
      <p>В результате у вас есть авторский сайт, управляемый контент и понятная основа для следующих функций. Хотите такой подход для своей компании? <Link href={`/${locale}#contact`}>Напишите мне и пришлите ссылку на текущий сайт</Link>. Обсудим, что стоит изменить и как собрать следующую версию.</p>
    </Chapter>
  </>;
}

function English({ locale }: { locale: string }) {
  return <>
    <Chapter id={0} title="Your business grew. The template stayed the same."><p className={styles.dropLead}>A new product, a new section or a sales integration should move your business forward. When every change turns into another workaround, it is time to rethink the website’s architecture.</p><p>I build around customer tasks: understanding your offer, choosing a product, trusting the company and sending an inquiry. I design the experience, develop it in Next.js and connect OJ CMS for content management.</p><p>That is the approach behind the new KEMZ website. I rebuilt the plant’s old site with Next.js and React, connected Payload and tailored OJ CMS to the equipment catalog. The team manages products, categories, documents and news in its own dashboard. Website inquiries are stored in the CMS, with Yandex Metrica data available alongside the content.</p><p><Link href={`/${locale}/work/aokemz`}>Explore the KEMZ case study ↗</Link></p></Chapter>
    <Chapter id={1} title="Payload CMS: content and design can evolve separately"><p>Payload is an open-source TypeScript platform I use as the backend foundation. It provides an admin panel, database operations, APIs, authentication and access rules. I configure it around your actual data: equipment, specifications, documents, articles and inquiries.</p><p>The headless approach separates stored content from the public interface. An editor updates a motor’s name or attaches a PDF; the visitor sees it inside a purpose-built product page. Your visual identity is not tied to a CMS theme.</p><p>This creates room for product comparisons, customer accounts, selection tools and integrations. Payload can run on your chosen infrastructure. The core is open source; development, hosting and maintenance form the project’s operating costs. <a href="https://payloadcms.com/docs/getting-started/what-is-payload" target="_blank" rel="noreferrer">Read Payload’s documentation</a>.</p></Chapter>
    <Architecture en />
    <Chapter id={2} title="OJ CMS turns the foundation into your team’s workspace"><p>OJ CMS is my custom interface and set of extensions built on Payload. Payload supplies the backend; I design the fields, navigation, screens and integrations for the business. Editors work with their own content model rather than a maze of unrelated settings.</p><p>An equipment catalog needs products, categories and technical documents. A publishing project needs articles, authors and media. I map those relationships before building the pages so routine content changes do not require editing HTML.</p><p>The KEMZ implementation brings catalog content, inquiries and analytics together. <Link href={`/${locale}/oj-cms`}>See OJ CMS in more detail ↗</Link></p></Chapter>
    <Chapter id={3} title="Why I build this way instead of using Tilda, WordPress or Bitrix"><h3>Tilda: move beyond the builder</h3><p>I start with product architecture and bespoke design. Technical catalogs, selection tools and customer accounts are designed as a coherent application. The business workflow determines the interface.</p><p>There is also a concrete ownership difference. <a href="https://help.tilda.cc/export" target="_blank" rel="noreferrer">Tilda’s export documentation</a> lists catalogs and feeds as non-exportable services; form submissions on exported sites require an active subscription. In my approach, the website, CMS and inquiry handling run within the project’s infrastructure.</p><h3>WordPress: a coherent system instead of a plugin assembly</h3><p>A typical WordPress build combines a theme, a visual editor and plugins. Future changes must account for their settings, updates and compatibility. I define the data model, interface components and integrations in the project’s code and adapt the CMS to the editors.</p><p>Products link to categories and documents. Forms link to saved inquiries. Analytics appears in the working dashboard. You commission a connected product with an architecture that can evolve.</p><h3>Bitrix: scope the product around your needs</h3><p>1C-Bitrix distributes features across <a href="https://www.1c-bitrix.ru/products/cms/license.php" target="_blank" rel="noreferrer">commercial editions</a>. I use Payload’s open-source foundation and scope the implementation around the required catalog, content and integrations. Your project is defined by the work it needs, rather than a CMS edition.</p><p><strong>My offer is a bespoke website with a purpose-built editorial workspace. That is the product I want to build for your company.</strong></p></Chapter>
    <Chapter id={4} title="KEMZ: equipment, inquiries and analytics together"><p>For a manufacturer, content management is daily work: update specifications, attach documents, publish news and understand which pages visitors use. The KEMZ implementation combines those jobs in OJ CMS.</p><ul className={styles.catalogChecklist}><li><strong>Products and categories:</strong> fields follow the equipment catalog’s structure.</li><li><strong>Documents and news:</strong> editors update materials through the dashboard.</li><li><strong>Inquiries:</strong> submissions are stored before email notifications are sent.</li><li><strong>Yandex Metrica:</strong> the API brings traffic and popular-page data into the admin interface.</li></ul></Chapter>
    <Screen name="dashboard" en /><Screen name="editor" en />
    <Chapter id={5} title="Search starts with how the website is built"><p>Products and categories need stable URLs, clear headings and useful content. I design the structure around buyer questions, specifications and the documents needed before an inquiry.</p><p>The implementation covers server-rendered content, metadata, canonicals, sitemaps, breadcrumbs and internal links. Images receive appropriate sizes and formats, while interactive code is kept where it serves the visitor. This gives the project control over loading behavior and technical SEO.</p><p>Content can then grow through product pages, customer questions, implementation stories and articles based on the company’s experience. I can plan that content and provide an editorial workspace for it. <Link href={`/${locale}/services/seo-positioning`}>Explore my SEO and content approach ↗</Link></p></Chapter>
    <Chapter id={6} title="From requirements to a website your team can run"><p>You work directly with me. I investigate the product and its customers, map the structure and editorial workflow, design and develop the website, then connect CMS, forms, analytics and integrations. I deploy the project and show the team how to update it.</p><p>For a migration, I map existing URLs, redirects, text, images and documents. The new website should continue the company’s work rather than force it to rebuild the catalog from scratch.</p><p>You receive a bespoke website, editable content and a clear foundation for future features. <Link href={`/${locale}#contact`}>Send me your current website or project brief</Link> and we can discuss the next version.</p></Chapter>
  </>;
}
