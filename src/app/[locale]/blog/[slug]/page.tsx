import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { blogCopy, blogPath, blogSlug, catalogBlogPath, catalogPostCopy, catalogPostDate, catalogPostSlug, catalogPostSlugEn, firstPostDate, firstPostSlug, firstPostSlugEn, privacyBlogPath, privacyPostCopy, privacyPostDate, privacyPostSlug, privacyPostSlugEn } from "@/content/blog";
import { PrivacyArticle } from "./PrivacyArticle";
import { CatalogArticle } from "./CatalogArticle";
import styles from "../blog.module.css";

type Props = { params: Promise<{ locale: string; slug: string }> };
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://jakuninoleg.dev";

export function generateStaticParams() {
  return [{ locale: "ru", slug: firstPostSlug }, { locale: "en", slug: firstPostSlugEn }, { locale: "ru", slug: privacyPostSlug }, { locale: "en", slug: privacyPostSlugEn }, { locale: "ru", slug: catalogPostSlug }, { locale: "en", slug: catalogPostSlugEn }];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const isPrivacy = slug === (locale === "en" ? privacyPostSlugEn : privacyPostSlug);
  const isCatalog = slug === (locale === "en" ? catalogPostSlugEn : catalogPostSlug);
  if (!isPrivacy && !isCatalog && slug !== blogSlug(locale)) notFound();
  if (isCatalog) {
    const p = catalogPostCopy[locale === "en" ? "en" : "ru"];
    return { title: p.title, description: p.lead, alternates: { canonical: catalogBlogPath(locale), languages: { ru: catalogBlogPath("ru"), en: catalogBlogPath("en") } }, openGraph: { type: "article", title: p.title, description: p.lead, url: catalogBlogPath(locale), publishedTime: catalogPostDate, images: ["/blog/catalog-equipment-hero.webp"] } };
  }
  if (isPrivacy) {
    const p = privacyPostCopy[locale === "en" ? "en" : "ru"];
    return { title: p.title, description: p.lead, alternates: { canonical: privacyBlogPath(locale), languages: { ru: privacyBlogPath("ru"), en: privacyBlogPath("en") } }, openGraph: { type: "article", title: p.title, description: p.lead, url: privacyBlogPath(locale), publishedTime: privacyPostDate, images: ["/blog/mascot-152-fz.webp"] } };
  }
  const c = blogCopy[locale === "en" ? "en" : "ru"];
  return {
    title: c.firstTitle,
    description: c.firstLead,
    alternates: { canonical: blogPath(locale), languages: { ru: blogPath("ru"), en: blogPath("en") } },
    openGraph: { type: "article", title: c.firstTitle, description: c.firstLead, url: blogPath(locale), publishedTime: firstPostDate, images: ["/blog/mascot-blogger.webp"] },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { locale, slug } = await params;
  if (slug === (locale === "en" ? catalogPostSlugEn : catalogPostSlug)) return <CatalogPostPage locale={locale} />;
  if (slug === (locale === "en" ? privacyPostSlugEn : privacyPostSlug)) return <PrivacyPostPage locale={locale} />;
  if (slug !== blogSlug(locale)) notFound();
  setRequestLocale(locale);
  const isEn = locale === "en";
  const c = blogCopy[isEn ? "en" : "ru"];
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        headline: c.firstTitle,
        description: c.firstLead,
        datePublished: firstPostDate,
        dateModified: firstPostDate,
        inLanguage: isEn ? "en" : "ru",
        author: { "@type": "Person", name: "Олег Якунин", url: siteUrl },
        publisher: { "@type": "Person", name: "Олег Якунин" },
        mainEntityOfPage: `${siteUrl}${blogPath(locale)}`,
        image: `${siteUrl}/blog/mascot-blogger.webp`,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: isEn ? "Home" : "Главная", item: `${siteUrl}/${locale}` },
          { "@type": "ListItem", position: 2, name: isEn ? "Blog" : "Блог", item: `${siteUrl}/${locale}/blog` },
          { "@type": "ListItem", position: 3, name: c.firstTitle, item: `${siteUrl}${blogPath(locale)}` },
        ],
      },
    ],
  };

  return <><a href="#main" className="skip-link">{isEn ? "Skip to content" : "К основному содержимому"}</a><Header /><main id="main" className={styles.root}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
    <header className={`shell ${styles.articleHero}`}>
      <nav className={styles.breadcrumbs} aria-label={isEn ? "Breadcrumbs" : "Хлебные крошки"}><Link href={`/${locale}`}>{isEn ? "Home" : "Главная"}</Link><span>/</span><Link href={`/${locale}/blog`}>{isEn ? "Blog" : "Блог"}</Link><span>/</span><span>{isEn ? "Platform choice" : "Выбор платформы"}</span></nav>
      <p className={styles.eyebrow}>{c.firstTag} <span>·</span> <time dateTime={firstPostDate}>{c.date}</time> <span>·</span> {c.time}</p>
      <h1>{c.firstTitle}</h1><p className={styles.heroLead}>{c.firstLead}</p>
      <div className={styles.heroByline}><span className={styles.bylineMark}>ОЯ</span><span>{isEn ? "Oleg Jakunin / design and development" : "Олег Якунин / дизайн и разработка"}</span></div>
      <div className={styles.heroVisual}><Image src="/blog/mascot-blogger.webp" alt={isEn ? "Oleg writes a new article" : "Олег работает над статьёй"} width={1254} height={1254} sizes="(max-width: 760px) 90vw, 40vw" priority /></div>
    </header>
    {isEn ? <EnglishArticle locale={locale} /> : <RussianArticle locale={locale} />}
    <section className={`shell ${styles.articleCta}`}><p className={styles.eyebrow}>{isEn ? "Let's build" : "Давайте сделаем"}</p><h2>{isEn ? "A site built for your business, not a template." : "Сайт под вашу задачу, а не под ограничения шаблона."}</h2><p>{isEn ? "Tell me what you need. I will suggest the architecture, design direction and a realistic scope." : "Расскажите, какой сайт вам нужен. Предложу архитектуру, дизайн-направление и понятный объём работ."}</p><Link href={`/${locale}#contact`} className={styles.ctaButton}>{isEn ? "Discuss a project" : "Обсудить проект"} <span aria-hidden>↗</span></Link></section>
  </main><Footer /></>;
}

function CatalogPostPage({ locale }: { locale: string }) {
  setRequestLocale(locale);
  const isEn = locale === "en";
  const p = catalogPostCopy[isEn ? "en" : "ru"];
  const url = `${siteUrl}${catalogBlogPath(locale)}`;
  const schema = { "@context": "https://schema.org", "@graph": [
    { "@type": "BlogPosting", headline: p.title, description: p.lead, datePublished: catalogPostDate, dateModified: catalogPostDate, inLanguage: locale, author: { "@type": "Person", name: "Олег Якунин", url: siteUrl }, publisher: { "@type": "Person", name: "Олег Якунин" }, mainEntityOfPage: url, image: `${siteUrl}/blog/catalog-equipment-hero.webp` },
    { "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: isEn ? "Home" : "Главная", item: `${siteUrl}/${locale}` },
      { "@type": "ListItem", position: 2, name: isEn ? "Blog" : "Блог", item: `${siteUrl}/${locale}/blog` },
      { "@type": "ListItem", position: 3, name: p.title, item: url },
    ] },
  ] };
  return <><a href="#main" className="skip-link">{isEn ? "Skip to content" : "К основному содержимому"}</a><Header /><main id="main" className={styles.root}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
    <header className={`shell ${styles.articleHero}`}>
      <nav className={styles.breadcrumbs} aria-label={isEn ? "Breadcrumbs" : "Хлебные крошки"}><Link href={`/${locale}`}>{isEn ? "Home" : "Главная"}</Link><span>/</span><Link href={`/${locale}/blog`}>{isEn ? "Blog" : "Блог"}</Link><span>/</span><span>{isEn ? "Equipment catalog" : "Каталог оборудования"}</span></nav>
      <p className={styles.eyebrow}>{p.tag} <span>·</span> <time dateTime={catalogPostDate}>{p.date}</time> <span>·</span> {p.time}</p>
      <h1>{p.title}</h1><p className={styles.heroLead}>{p.lead}</p>
      <div className={styles.heroByline}><span className={styles.bylineMark}>ОЯ</span><span>{isEn ? "Oleg Jakunin / design and development" : "Олег Якунин / дизайн и разработка"}</span></div>
      <div className={`${styles.heroVisual} ${styles.catalogHeroVisual}`}><div className={styles.catalogHeroWords} aria-hidden="true"><span>{isEn ? "FROM A MODEL" : "ОТ МОДЕЛИ"}</span><strong>{isEn ? "TO A USEFUL ENQUIRY" : "К ПРЕДМЕТНОЙ ЗАЯВКЕ"}</strong><span>{isEn ? "FIND / CHECK / ASK" : "НАЙТИ / СВЕРИТЬ / ЗАПРОСИТЬ"}</span></div><Image src="/blog/catalog-equipment-hero.webp" alt={isEn ? "Oleg examines an industrial electric motor and technical drawing at a workbench" : "Маскот Олега изучает электродвигатель и чертёж за рабочим столом"} width={1672} height={941} sizes="(max-width: 760px) 94vw, 60vw" priority /></div>
    </header>
    <CatalogArticle locale={locale} />
    <section className={`shell ${styles.articleCta}`}><p className={styles.eyebrow}>{isEn ? "YOUR EQUIPMENT" : "ВАШЕ ОБОРУДОВАНИЕ"}</p><h2>{isEn ? "Make the next enquiry more specific." : "Поможем клиенту прийти с конкретным запросом."}</h2><p>{isEn ? "We can map buyer questions, catalog structure and the enquiry route before design begins." : "Разберём вопросы покупателей, структуру каталога и маршрут заявки до начала дизайна."}</p><Link href={`/${locale}#contact`} className={styles.ctaButton}>{isEn ? "Discuss a catalog" : "Обсудить каталог"} <span aria-hidden>↗</span></Link></section>
  </main><Footer /></>;
}

function PrivacyPostPage({ locale }: { locale: string }) {
  setRequestLocale(locale);
  const isEn = locale === "en";
  const p = privacyPostCopy[isEn ? "en" : "ru"];
  const url = `${siteUrl}${privacyBlogPath(locale)}`;
  const schema = { "@context": "https://schema.org", "@graph": [
    { "@type": "BlogPosting", headline: p.title, description: p.lead, datePublished: privacyPostDate, dateModified: privacyPostDate, inLanguage: locale, author: { "@type": "Person", name: "Олег Якунин", url: siteUrl }, publisher: { "@type": "Person", name: "Олег Якунин" }, mainEntityOfPage: url, image: `${siteUrl}/blog/mascot-152-fz.webp` },
    { "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: isEn ? "Home" : "Главная", item: `${siteUrl}/${locale}` },
      { "@type": "ListItem", position: 2, name: isEn ? "Blog" : "Блог", item: `${siteUrl}/${locale}/blog` },
      { "@type": "ListItem", position: 3, name: p.title, item: url },
    ] },
  ] };
  return <><a href="#main" className="skip-link">{isEn ? "Skip to content" : "К основному содержимому"}</a><Header /><main id="main" className={styles.root}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
    <header className={`shell ${styles.articleHero}`}>
      <nav className={styles.breadcrumbs} aria-label={isEn ? "Breadcrumbs" : "Хлебные крошки"}><Link href={`/${locale}`}>{isEn ? "Home" : "Главная"}</Link><span>/</span><Link href={`/${locale}/blog`}>{isEn ? "Blog" : "Блог"}</Link><span>/</span><span>{isEn ? "Personal data" : "Персональные данные"}</span></nav>
      <p className={styles.eyebrow}>{p.tag} <span>·</span> <time dateTime={privacyPostDate}>{p.date}</time> <span>·</span> {p.time}</p>
      <h1>{p.title}</h1><p className={styles.heroLead}>{p.lead}</p>
      <div className={styles.heroByline}><span className={styles.bylineMark}>ОЯ</span><span>{isEn ? "Oleg Jakunin / design and development" : "Олег Якунин / дизайн и разработка"}</span></div>
      <div className={`${styles.heroVisual} ${styles.privacyVisual}`}><div className={styles.heroVisualWords} aria-hidden="true"><span>01 / {isEn ? "DATA" : "ДАННЫЕ"}</span><strong>{isEn ? "A FORM HAS A BACKSTORY." : "У ЗАЯВКИ ЕСТЬ МАРШРУТ."}</strong><span>02 / {isEn ? "CONTROL" : "КОНТРОЛЬ"}</span></div><Image src="/blog/mascot-152-fz.webp" alt={isEn ? "Oleg protects website visitor data" : "Маскот Олега защищает данные посетителей сайта"} width={1254} height={1254} sizes="(max-width: 760px) 90vw, 40vw" priority /></div>
    </header>
    <PrivacyArticle locale={locale} />
    <section className={`shell ${styles.articleCta}`}><p className={styles.eyebrow}>{isEn ? "BEFORE LAUNCH" : "ПЕРЕД ЗАПУСКОМ"}</p><h2>{isEn ? "Make the enquiry path clear." : "Продумайте путь заявки вместе с сайтом."}</h2><p>{isEn ? "I can plan the form, analytics and data flow while designing your site." : "Помогу спроектировать форму, аналитику и маршрут данных при разработке сайта."}</p><Link href={`/${locale}#contact`} className={styles.ctaButton}>{isEn ? "Discuss a website" : "Обсудить сайт"} <span aria-hidden>↗</span></Link></section>
  </main><Footer /></>;
}

function RussianArticle({ locale }: { locale: string }) {
  return <article className={`shell ${styles.article}`}>
    <aside className={styles.toc}><p>В ЭТОЙ СТАТЬЕ</p><a href="#problem">Что не так с шаблоном</a><a href="#cost">Сколько стоит владение</a><a href="#approach">Современный подход</a><a href="#work">Примеры работ</a><a href="#cms">Как редактировать сайт</a><a href="#choice">Как выбрать</a></aside>
    <div className={styles.articleBody}>
      <section className={styles.prose}><p className={styles.dropLead}>Я не против Tilda, WordPress или Битрикса как инструментов. Я против ситуации, когда инструмент выбирают до того, как разобрались в вашем продукте. Тогда сайт наследует чужую структуру, а за каждую новую идею приходится бороться с ограничениями шаблона.</p><p>В 2026 году для многих задач есть другой путь: спроектировать нужный интерфейс, собрать его на современном фреймворке, подключить подходящую CMS и платить за то, чем команда действительно пользуется. Именно так я работаю с лендингами, каталогами и веб-приложениями.</p></section>
      <section id="problem" className={styles.prose}><p className={styles.chapter}>01 / ПРОБЛЕМА</p><h2>Когда «быстро на шаблоне» становится долгим проектом</h2><p>Готовая тема помогает стартовать, пока задача совпадает с её логикой. Но бизнесу нужны собственная подача, нестандартный каталог, сценарий заявки, интеграция или редактор под конкретную команду. Начинаются обходные решения: дополнительный плагин, ручная правка темы, ещё один скрипт, отдельный специалист для поддержки.</p><p>Речь не о том, что каждый сайт на конструкторе плох. Простую временную страницу там можно выпустить быстро. Но если сайт должен отличаться, расти и помогать продавать, стоимость «доработать шаблон» стоит сравнить с созданием своего решения с самого начала.</p></section>
      <div className={styles.quote}><span>«</span><p>Сначала задача и путь клиента. Потом дизайн и технология. Не наоборот.</p></div>
      <section id="cost" className={styles.prose}><p className={styles.chapter}>02 / ДЕНЬГИ</p><h2>Считайте не цену запуска, а стоимость владения</h2><p><a href="https://wordpress.org/about/license/" target="_blank" rel="noreferrer">WordPress распространяется по свободной лицензии</a> — сам движок не требует покупки. Но готовая тема, коммерческие плагины, хостинг, обновления, защита и разработка функций могут формировать регулярный бюджет. У <a href="https://www.help.tilda.cc/subscription" target="_blank" rel="noreferrer">Tilda есть подписка</a>, а у <a href="https://www.1c-bitrix.ru/products/cms/license.php" target="_blank" rel="noreferrer">1С-Битрикс — лицензии</a>. В индивидуальном проекте деньги уходят на разработку и поддержку вашей системы, а не на принудительную адаптацию чужой темы.</p></section>
      <div className={styles.platformNotes}>
        <div><span>01 / TILDA</span><h3>Не собирать бренд из чужих блоков</h3><p>Конструктор удобен для быстрого теста. Но если нужны необычная композиция, интерактивность и собственная логика формы, ручная подгонка блоков может занять больше времени, чем аккуратная вёрстка готовой концепции.</p></div>
        <div><span>02 / WORDPRESS</span><h3>Не наращивать сайт плагинами</h3><p>Бесплатный движок не равен бесплатному проекту. Когда ключевые функции зависят от набора тем и расширений, каждое обновление и новая интеграция требуют внимания. Я предпочитаю добавить ровно те возможности, которые нужны бизнесу.</p></div>
        <div><span>03 / 1С-БИТРИКС</span><h3>Не покупать систему крупнее задачи</h3><p>Большой платформе найдётся применение в сложной инфраструктуре. Но для лендинга, сайта услуг или каталога без тяжёлого бэкенда лицензия и настройка платформы могут быть лишней статьёй расходов.</p></div>
      </div>
      <div className={styles.costGrid}><div><span>Шаблонная сборка</span><strong>Запуск → плагины → обходные решения → обслуживание</strong></div><div><span>Индивидуальная сборка</span><strong>Задача → нужные функции → понятная архитектура → развитие</strong></div></div>
      <section id="approach" className={styles.prose}><p className={styles.chapter}>03 / ПОДХОД</p><h2>React, Astro, Next.js: код под задачу</h2><p>Для контентного сайта я могу выбрать Astro: он умеет заранее собирать страницы в HTML и добавлять интерактивность там, где она нужна. Для проекта с личным кабинетом, сложными сценариями и активным интерфейсом подойдут React и Next.js. У Next.js есть серверный рендеринг, статические страницы и компоненты, которые не заставляют отправлять весь интерфейс в браузер.</p><p>Это не волшебная кнопка «100 баллов PageSpeed». Скорость зависит от изображений, шрифтов, скриптов и качества реализации. Зато архитектура позволяет не тащить на страницу функции, которые ей не нужны. Для уникального дизайна это часто быстрее, чем переделывать готовую тему до неузнаваемости.</p><p className={styles.sourceLine}>Техническая основа: <a href="https://docs.astro.build/en/basics/rendering-modes/" target="_blank" rel="noreferrer">режимы рендеринга Astro</a> · <a href="https://nextjs.org/docs/app/getting-started/server-and-client-components" target="_blank" rel="noreferrer">компоненты Next.js</a></p></section>
      <section id="work" className={styles.prose}><p className={styles.chapter}>04 / ПРАКТИКА</p><h2>Так выглядит подход в моих проектах</h2><p>Я не продаю один стек для любой задачи. Сначала выясняю, как сайт должен работать для посетителя и команды, затем собираю подходящую систему.</p></section>
      <div className={styles.caseGrid}>
        <Link href={`/${locale}/work/vne-shablona`} className={styles.caseCard}><Image src="/projects/vne-shablona/hero-wide-2k-v8.webp" alt="Первый экран авторского лендинга «ВНЕ ШАБЛОНА»" width={900} height={540} sizes="(max-width: 760px) 90vw, 28vw" /><span>01 / ЛЕНДИНГ</span><strong>ВНЕ ШАБЛОНА</strong><p>Авторский комикс и форма заявки на лёгкой статической странице. Визуальную идею не пришлось втискивать в блоки конструктора.</p></Link>
        <Link href={`/${locale}/work/aokemz`} className={styles.caseCard}><Image src="/projects/kemz/quarry.webp" alt="Индустриальный образ сайта завода КЭМЗ" width={900} height={540} sizes="(max-width: 760px) 90vw, 28vw" /><span>02 / САЙТ-КАТАЛОГ</span><strong>КЭМЗ</strong><p>Индустриальный дизайн, каталог продукции и сценарии обращения. Здесь использована индивидуальная разработка на Nuxt — тот же принцип, другой фреймворк.</p></Link>
      </div>
      <section id="cms" className={styles.prose}><p className={styles.chapter}>05 / КОНТЕНТ</p><h2>«Без WordPress» не означает «без редактора»</h2><p>Нельзя заставлять клиента звать разработчика ради каждой новости или карточки товара. Для этого есть современные системы управления контентом. <a href="https://payloadcms.com/" target="_blank" rel="noreferrer">Payload</a> — открытая CMS, которую можно настроить под структуру проекта. <Link href={`/${locale}/oj-cms`}>OJ CMS</Link> — моя система для управления страницами, медиа и контентом. Редакция получает удобную админку, а посетитель — интерфейс, спроектированный специально для сайта.</p></section>
      <Link href={`/${locale}/work/oj-cms`} className={styles.cmsCard}><div><span>OJ CMS / СВОЯ СИСТЕМА</span><strong>Контентом управляете вы. Ограничения шаблона убираю я.</strong><span>Смотреть проект ↗</span></div><Image src="/projects/oj-cms/dashboard.webp" alt="Панель управления OJ CMS" width={900} height={630} sizes="(max-width: 760px) 90vw, 32vw" /></Link>
      <section id="choice" className={styles.prose}><p className={styles.chapter}>06 / ВЫБОР</p><h2>Когда свой сайт имеет смысл</h2><p>Если нужна временная страница для проверки идеи, готовый сервис может быть самым коротким путём. Если важны собственный дизайн, каталог, сложные формы, интеграции, SEO-структура и развитие проекта, я предложу индивидуальную разработку и посчитаю её вместе с дальнейшей поддержкой. Так вы сравните решения по результату и полной стоимости, а не по цене первого экрана.</p><p>Посмотрите, как я делаю <Link href={`/${locale}/services/landing-pages`}>лендинги</Link>, <Link href={`/${locale}/services/product-catalogues`}>сайты-каталоги</Link> и <Link href={`/${locale}/services/online-stores`}>интернет-магазины</Link>. Или <Link href={`/${locale}/work`}>откройте все работы</Link>, чтобы оценить разные визуальные подходы.</p></section>
      <div className={styles.faq}><p className={styles.chapter}>КОРОТКО О ГЛАВНОМ</p><h2>Частые вопросы</h2><h3>Можно ли сделать сайт без Tilda и WordPress и всё равно редактировать его самому?</h3><p>Да. Для новостей, товаров, текстов и медиа подключается CMS с правами доступа и полями под вашу структуру.</p><h3>Индивидуальная разработка всегда дороже?</h3><p>Нет единого ответа. Простой сайт на готовой теме может стоить меньше на старте. Если понадобятся особенный дизайн, интеграции и регулярные доработки, сравнивать нужно общий бюджет запуска и владения.</p><h3>React или Next.js сами по себе улучшают SEO?</h3><p>Нет. Для поиска важны содержимое страниц, структура, доступный HTML, ссылки, мобильная версия и техническое качество. Фреймворк даёт инструменты, а результат зависит от реализации.</p><p>Какую бы платформу вы ни выбрали, проверьте <Link href={privacyBlogPath(locale)}>обработку персональных данных в формах и аналитике</Link> до запуска сайта.</p></div>
    </div>
  </article>;
}

function EnglishArticle({ locale }: { locale: string }) {
  return <article className={`shell ${styles.article}`}><aside className={styles.toc}><p>IN THIS ARTICLE</p><a href="#en-problem">The template trap</a><a href="#en-cost">Total cost</a><a href="#en-stack">The modern stack</a><a href="#en-work">Real projects</a><a href="#en-cms">Content editing</a><a href="#en-choice">How to decide</a></aside><div className={styles.articleBody}>
    <section id="en-problem" className={styles.prose}><p className={styles.dropLead}>I do not object to Tilda, WordPress or Bitrix as tools. I object to picking a tool before understanding the product. A template can launch a simple page quickly; it becomes a constraint when the brand needs its own visual language, a custom catalog, unusual forms or integrations.</p><p>For those projects I prefer to design the customer journey first, then choose the technology. The site follows the business instead of the business following a theme.</p></section>
    <section id="en-cost" className={styles.prose}><p className={styles.chapter}>01 / COST</p><h2>Compare the full cost, not just the launch price</h2><p><a href="https://wordpress.org/about/license/" target="_blank" rel="noreferrer">WordPress itself is open source</a>. Premium themes and plugins, hosting, updates, security and custom work may still add recurring costs. <a href="https://www.help.tilda.cc/subscription" target="_blank" rel="noreferrer">Tilda sells subscriptions</a>; <a href="https://www.1c-bitrix.ru/products/cms/license.php" target="_blank" rel="noreferrer">Bitrix sells licenses</a>. A bespoke site has development and maintenance costs too, but you spend on features you actually need rather than working around a theme.</p></section>
    <section id="en-stack" className={styles.prose}><p className={styles.chapter}>02 / TECHNOLOGY</p><h2>Astro, React and Next.js let the brief lead</h2><p>Astro can prebuild content pages as HTML and add interactivity only where needed. React and Next.js suit richer interfaces, applications and complex interactions. Next.js can render pages on the server and keep non-interactive components out of the client bundle. None of these tools guarantees a fast site or higher search rankings on its own; implementation and content still matter.</p></section>
    <section id="en-work" className={styles.prose}><p className={styles.chapter}>03 / REAL WORK</p><h2>Different projects, different solutions</h2><p><Link href={`/${locale}/work/vne-shablona`}>VNE SHABLONA</Link> is a comic-inspired landing page where the design would lose its character in a standard block layout. <Link href={`/${locale}/work/aokemz`}>KEMZ</Link> is an industrial site with a product catalog and custom inquiry journeys, built with Nuxt. The principle is the same even though the framework differs.</p></section>
    <section id="en-cms" className={styles.prose}><p className={styles.chapter}>04 / CONTENT</p><h2>Custom does not mean hard to edit</h2><p>A CMS can give editors control over pages, products and media without giving up the frontend design. <a href="https://payloadcms.com/" target="_blank" rel="noreferrer">Payload</a> is an open-source option. <Link href={`/${locale}/work/oj-cms`}>OJ CMS</Link> is my own content-management project. The right choice depends on the team&apos;s workflow.</p></section>
    <section id="en-choice" className={styles.prose}><p className={styles.chapter}>05 / DECISION</p><h2>When should you build from scratch?</h2><p>A temporary test page may be fastest on a builder. When design, content structure, integrations and long-term growth matter, compare a tailored build against the full cost of adapting and maintaining a template. Explore my <Link href={`/${locale}/services/landing-pages`}>landing pages</Link>, <Link href={`/${locale}/services/product-catalogues`}>product catalogs</Link> and <Link href={`/${locale}/work`}>project cases</Link>.</p><p>Whatever platform you choose, review <Link href={privacyBlogPath(locale)}>how forms and analytics handle personal data</Link> before launch.</p></section>
  </div></article>;
}
