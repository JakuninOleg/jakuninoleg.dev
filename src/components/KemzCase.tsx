import Image from "next/image";
import "./KemzCase.css";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { CaseServiceBridge } from "./CaseServiceBridge";
import { Breadcrumbs } from "./Breadcrumbs";

function KemzCatalogPreview({ locale }: { locale: string }) {
  const products = [
    { image: "/projects/kemz/dpt590-2.webp", category: "Тяговые Двигатели для БЕЛАЗ", name: "Электродвигатель тяговый постоянного тока ДПТ590-2", specs: [["Мощность, кВт", "590"], ["Напряжение, В", "830"]] },
    { image: "/projects/kemz/datch.webp", category: "Электрические машины для городского электротранспорта", name: "Электродвигатели асинхронные тяговые типа ДАТЧ", specs: [["Номинальная мощность, кВт", "63"]] },
    { image: "/projects/kemz/generators.webp", category: "Новые разработки", name: "Генераторы переменного тока", specs: [] },
  ];
  return (
    <div className="kemz-catalog-preview" role="img" aria-label={locale === "ru" ? "Фрагмент каталога КЭМЗ с фильтрами и карточкой оборудования" : "KEMZ catalog interface with filters and an equipment card"}>
      <div className="kemz-catalog-preview__filters"><div><b>ФИЛЬТРЫ</b><span>Сбросить</span></div><small>Поиск по названию</small><i>Например, ДПТ</i><strong>▾ Категория</strong><small>□ Экскаваторное оборудование</small><small>□ Шахтное оборудование</small><small>□ Тяговые Двигатели для БЕЛАЗ</small><strong>▾ Тип оборудования</strong></div>
      <div className="kemz-catalog-preview__results">
        <div className="kemz-catalog-preview__top"><strong>Найдено позиций: 33</strong><span>Сортировка&nbsp; <b>По умолчанию&nbsp;⌄</b> &nbsp;▦</span></div>
        <div className="kemz-catalog-preview__cards">{products.map((product) => <div className="kemz-catalog-preview__product" key={product.name}><div><Image src={product.image} alt="" width={480} height={360} sizes="(max-width: 800px) 30vw, 15vw" /></div><span>{product.category}</span><b>{product.name}</b>{product.specs.map(([label, value]) => <small key={label}>{label}<em>{value}</em></small>)}<i>Подробнее&nbsp; →</i></div>)}</div>
      </div>
    </div>
  );
}

function KemzRequestPreview({ locale }: { locale: string }) {
  return (
    <div className="kemz-request-preview" role="img" aria-label={locale === "ru" ? "Фрагмент настоящей формы запроса на подбор оборудования КЭМЗ" : "KEMZ equipment inquiry form interface"}>
      <div className="kemz-request-preview__panel">
        <div><b>Тип оборудования</b><span>Выберите тип <i>⌄</i></span></div><div><b>Имя</b><span>Ваше имя</span></div>
        <div><b>Модель техники</b><span>Например, ЭКГ-10</span></div><div><b>Телефон</b><span>+7 (___) ___-__-__</span></div>
        <div><b>Необходимая мощность, кВт</b><span>Например, 560</span></div><div><b>Email</b><span>Ваш почтовый адрес</span></div>
        <strong>Отправить в технический отдел&nbsp; →</strong>
      </div>
    </div>
  );
}

function KemzProductPreview({ locale }: { locale: string }) {
  return (
    <div className="kemz-product-preview" role="img" aria-label={locale === "ru" ? "Фрагмент карточки оборудования КЭМЗ: модель, характеристики и запрос на подбор" : "KEMZ equipment page: model, specifications, and inquiry"}>
      <div className="kemz-product-preview__crumbs">Главная / Продукция / Тяговые двигатели</div>
      <div className="kemz-product-preview__body">
        <div className="kemz-product-preview__photo"><Image src="/projects/kemz/dpt590-2.webp" alt="" width={480} height={360} sizes="(max-width: 800px) 75vw, 25vw" /></div>
        <div className="kemz-product-preview__copy"><span>ТЯГОВЫЕ ДВИГАТЕЛИ ДЛЯ БЕЛАЗ</span><strong>Электродвигатель тяговый постоянного тока ДПТ590-2</strong><p>Описание и технические данные модели</p><b>Запросить подбор →</b></div>
      </div>
      <div className="kemz-product-preview__tabs"><span>Описание</span><span>Технические данные</span></div>
    </div>
  );
}

function KemzPhonePreview({ locale }: { locale: string }) {
  return (
    <div className="kemz-hero__phone" role="img" aria-label={locale === "ru" ? "Мобильная версия главной страницы КЭМЗ" : "Mobile KEMZ home page"}>
      <div className="kemz-hero__phone-screen">
        <div className="kemz-hero__phone-header"><Image src="/projects/kemz/logo.webp" alt="" width={88} height={100} /><strong>КЭМЗ</strong><span>Связаться&nbsp; →</span><i aria-hidden="true">☰</i></div>
        <div className="kemz-hero__phone-main"><Image src="/projects/kemz/quarry.webp" alt="" fill sizes="160px" /><div><small>С 1960 ГОДА&nbsp; | &nbsp;КАРПИНСК</small><b>ЭЛЕКТРИЧЕСКИЕ МАШИНЫ ДЛЯ ГОРНОДОБЫВАЮЩЕЙ ТЕХНИКИ</b><p>Проектируем, производим и испытываем двигатели и генераторы</p><span>Перейти в каталог&nbsp; →</span></div></div>
        <div className="kemz-hero__phone-facts"><strong>54–600 кВт</strong><strong>15–1250 кВт</strong></div>
      </div>
    </div>
  );
}

function KemzArchivePreview({ locale }: { locale: string }) {
  return (
    <div
      className="kemz-archive__legacy"
      role="img"
      aria-label={locale === "ru" ? "Воссозданный по архивным материалам первый экран сайта КЭМЗ 2019 года" : "KEMZ 2019 home page, reconstructed from archived site assets"}
    >
      <div className="kemz-archive__legacy-head">
        <div className="kemz-archive__legacy-slide" />
        <Image className="kemz-archive__legacy-logo" src="/projects/kemz/archive-2019/logo.jpg" alt="" width={411} height={83} />
        <div className="kemz-archive__legacy-menu" aria-hidden="true">
          <span>О заводе</span><span>Спецпредложения</span><span>Новости</span><span>Каталог продукции</span><span>Контактная информация</span>
        </div>
        <span className="kemz-archive__legacy-contact" aria-hidden="true">На главную &nbsp; Контакты<br />Отдел продаж: (343) 278-37-43</span>
        <span className="kemz-archive__legacy-caption" aria-hidden="true">ОБОРУДОВАНИЕ ДЛЯ БУРОВЫХ УСТАНОВОК<br />электродвигатели постоянного тока</span>
      </div>
      <div className="kemz-archive__legacy-body" aria-hidden="true">
        <strong>ОАО «КАРПИНСКИЙ ЭЛЕКТРОМАШИНОСТРОИТЕЛЬНЫЙ ЗАВОД»</strong>
        <div><p>ОАО «Карпинский электромашиностроительный завод» действует на рынке электротехнического оборудования с 1960 года. Начав свою деятельность с производства 2–3 видов машин постоянного тока...</p><div><Image src="/projects/kemz/archive-2019/ekscavator.jpg" alt="" width={178} height={116} /><span>Экскаваторное<br />оборудование</span></div></div>
      </div>
    </div>
  );
}

export async function KemzCase({ locale }: { locale: string }) {
  const p = await getTranslations("Portfolio");
  const tasks = p.raw("kemz.contextItems") as string[];
  const site = "https://aokemz.ru/";

  return (
    <article className="kemz-case">
      <section className="kemz-hero" aria-labelledby="kemz-title">
        <picture>
          <source media="(max-width: 900px)" srcSet="/projects/kemz/quarry-mobile.webp" />
          <img className="kemz-hero__landscape" src="/projects/kemz/quarry.webp" alt="" fetchPriority="high" decoding="async" />
        </picture>
        <div className="shell kemz-hero__inner">
          <div className="kemz-hero__copy">
            <Breadcrumbs locale={locale} items={[{ label: locale === "en" ? "Work" : "Работы", href: `/${locale}/work` }, { label: locale === "en" ? "KEMZ" : "КЭМЗ" }]} />
            <p className="kemz-kicker">01 / {p("kemz.eyebrow")}</p>
            <h1 id="kemz-title"><strong>{locale === "ru" ? "КЭМЗ" : "KEMZ"}</strong>{" "}<span>{p("kemz.title")}</span></h1>
            <p>{p("kemz.intro")}</p>
            <a className="kemz-button" href="#kemz-archive">{p("kemz.heroButton")} <span aria-hidden>↗</span></a>
          </div>
          <div className="kemz-hero__art">
            <div className="kemz-hero__tablet" aria-label={p("kemz.caption")}><div className="kemz-hero__screen"><picture><source media="(max-width: 900px)" srcSet="/projects/aokemz-v2-mobile.webp" /><img src="/projects/aokemz-v2.webp" alt={p("kemz.caption")} width={1265} height={712} decoding="async" /></picture></div></div>
            <KemzPhonePreview locale={locale} />
            <span className="kemz-hero__art-index" aria-hidden>01</span>
          </div>
          <div className="kemz-hero__rail"><span>{p("kemz.heroProject")}</span><span>01 — 10</span></div>
        </div>
        <div className="shell kemz-hero__facts"><span>{p("kemz.heroFactOne")}</span><span>{p("kemz.heroFactTwo")}</span><span>{p("kemz.heroFactThree")}</span><a href={site} target="_blank" rel="noreferrer">{p("kemz.heroSite")} ↗</a></div>
      </section>

      <section className="kemz-archive" id="kemz-archive" aria-labelledby="kemz-archive-title">
        <div className="shell">
          <div className="kemz-archive__heading">
            <div><p className="kemz-kicker">02 / {p("kemz.archiveLabel")}</p><h2 id="kemz-archive-title">{p("kemz.archiveTitle")}</h2></div>
            <p>{p("kemz.archiveIntro")}</p>
          </div>
          <div className="kemz-archive__grid">
            <figure className="kemz-archive__card kemz-archive__card--before">
              <div className="kemz-archive__card-top"><span>{p("kemz.archiveBefore")}</span><span>26.12.2019</span></div>
              <KemzArchivePreview locale={locale} />
              <figcaption><strong>{p("kemz.archiveBeforeTitle")}</strong><span>{p("kemz.archiveBeforeText")}</span></figcaption>
            </figure>
            <figure className="kemz-archive__card kemz-archive__card--after">
              <div className="kemz-archive__card-top"><span>{p("kemz.archiveAfter")}</span><span>aokemz.ru</span></div>
              <div className="kemz-archive__new"><Image src="/projects/aokemz-v2.webp" alt={p("kemz.archiveAfterAlt")} width={1265} height={712} sizes="(max-width: 800px) 100vw, 46vw" /></div>
              <figcaption><strong>{p("kemz.archiveAfterTitle")}</strong><span>{p("kemz.archiveAfterText")}</span></figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="kemz-context" id="kemz-context" aria-labelledby="kemz-context-title">
        <div className="kemz-context__photo"><Image src="/projects/kemz/quarry-detail.webp" alt={locale === "ru" ? "Карьерный экскаватор" : "Mining excavator"} fill sizes="(max-width: 800px) 100vw, 34vw" /></div>
        <div className="kemz-context__story"><p className="kemz-kicker">03 / {p("kemz.contextLabel")}</p><h2 id="kemz-context-title">{p("kemz.contextTitle")}</h2><p>{p("kemz.contextText")}</p></div>
        <div className="kemz-context__tasks"><span>{p("kemz.contextTask")}</span><ul>{tasks.map((item) => <li key={item}>{item}</li>)}</ul></div>
      </section>

      <section className="kemz-solution" aria-labelledby="kemz-solution-title">
        <div className="shell">
          <div className="kemz-solution__heading"><div><p className="kemz-kicker">04 / {p("kemz.solutionLabel")}</p><h2 id="kemz-solution-title">{p("kemz.scopeTitle")}</h2></div><p>{p("kemz.solutionIntro")}</p></div>
          <div className="kemz-solution__grid">
            <article className="kemz-solution__card"><span>01</span><h3>{p("kemz.scope1Title")}</h3><p>{p("kemz.scope1Text")}</p></article>
            <article className="kemz-solution__card"><span>02</span><h3>{p("kemz.scope2Title")}</h3><p>{p("kemz.scope2Text")}</p></article>
            <article className="kemz-solution__card"><span>03</span><h3>{p("kemz.scope3Title")}</h3><p>{p("kemz.scope3Text")}</p></article>
            <article className="kemz-solution__card"><span>04</span><h3>{p("kemz.scope4Title")}</h3><p>{p("kemz.scope4Text")}</p></article>
          </div>
        </div>
      </section>

      <section className="kemz-details" aria-labelledby="kemz-details-title">
        <div className="shell">
          <div className="kemz-details__heading"><div><p className="kemz-kicker">05 / {p("kemz.detailsLabel")}</p><h2 id="kemz-details-title">{p("kemz.detailsTitle")}</h2></div><p>{p("kemz.detailsText")}</p></div>
          <div className="kemz-details__grid">
            <figure className="kemz-details__interface kemz-details__interface--catalog"><KemzCatalogPreview locale={locale} /><figcaption><span>01 / {p("kemz.journeyCatalogTitle")}</span><strong>{p("kemz.journeyCatalogText")}</strong></figcaption></figure>
            <figure className="kemz-details__interface"><KemzProductPreview locale={locale} /><figcaption><span>02 / {p("kemz.journeyProductTitle")}</span><strong>{p("kemz.journeyProductText")}</strong></figcaption></figure>
            <figure className="kemz-details__interface"><KemzRequestPreview locale={locale} /><figcaption><span>03 / {p("kemz.journeyRequestTitle")}</span><strong>{p("kemz.journeyRequestText")}</strong></figcaption></figure>
          </div>
        </div>
      </section>

      <section className="kemz-discovery" aria-labelledby="kemz-discovery-title"><div className="shell kemz-discovery__inner">
        <div><p className="kemz-kicker">06 / {locale === "ru" ? "ИССЛЕДОВАНИЕ И КОНТЕНТ" : "RESEARCH AND CONTENT"}</p><h2 id="kemz-discovery-title">{locale === "ru" ? "Сначала разобраться в заводе. Потом говорить от его имени." : "Understand the factory before speaking for it."}</h2><p>{locale === "ru" ? "На старом сайте информации о предприятии не хватало: масштаб и особенности производства оставались за кадром. Я изучил историю КЭМЗ, ассортимент и работу разных подразделений, чтобы новая структура и тексты опирались на реальный бизнес." : "The old site did not explain enough about the company or its production. I studied KEMZ’s history, product range and teams before shaping the new site structure and copy."}</p></div>
        <div className="kemz-discovery__steps">
          <article><span>01 / {locale === "ru" ? "ИНТЕРВЬЮ" : "INTERVIEWS"}</span><h3>{locale === "ru" ? "Услышать тех, кто знает производство" : "Learn from the people behind production"}</h3><p>{locale === "ru" ? "Поговорил с генеральным директором и сотрудниками маркетинга, производства и продаж. Выяснил, что важно показать заказчику и какие вопросы возникают до обращения." : "I spoke with the CEO and people in marketing, production and sales to learn what customers need before they contact the factory."}</p></article>
          <article><span>02 / {locale === "ru" ? "РЕДАКТУРА" : "EDITORIAL"}</span><h3>{locale === "ru" ? "Перевести знания в понятные страницы" : "Turn knowledge into useful pages"}</h3><p>{locale === "ru" ? "Помог написать тексты и подобрать изображения. Помимо каталога появились содержательные разделы о заводе и производстве, а также новости для регулярных обновлений." : "I helped write the copy and select imagery. The site gained useful company and production pages, alongside news the team can update."}</p></article>
          <article><span>03 / {locale === "ru" ? "ПОЗИЦИОНИРОВАНИЕ" : "POSITIONING"}</span><h3>{locale === "ru" ? "Показать масштаб без канцелярита" : "Show scale without corporate filler"}</h3><p>{locale === "ru" ? "Визуальный язык, структура и тексты сложились в цельную подачу завода: реальные машины, инженерная экспертиза и прямой путь к нужной модели и техническому отделу." : "Imagery, structure and copy work together to show real machines, engineering expertise and a direct path to the right model and technical team."}</p></article>
        </div>
      </div></section>

      <section className="kemz-inside" aria-labelledby="kemz-inside-title"><div className="shell kemz-inside__inner">
        <div className="kemz-inside__heading"><p className="kemz-kicker">07 / {p("kemz.insideLabel")}</p><h2 id="kemz-inside-title">{p("kemz.insideTitle")}</h2><p>{p("kemz.insideIntro")}</p><Link href={`/${locale}/services/product-catalogues`}>{p("kemz.insideServiceLink")} ↗</Link></div>
        <div className="kemz-inside__tracks">
          <div><span>CONTENT / CMS</span><h3>{p("kemz.insideCmsTitle")}</h3><p>{p("kemz.insideCmsText")}</p></div>
          <div><span>LEADS / FORMS</span><h3>{p("kemz.insideLeadsTitle")}</h3><p>{p("kemz.insideLeadsText")}</p></div>
          <div><span>SEARCH / SEO</span><h3>{p("kemz.insideSeoTitle")}</h3><p>{p("kemz.insideSeoText")}</p></div>
        </div>
      </div></section>

      <section className="kemz-not-found" id="kemz-not-found" aria-labelledby="kemz-not-found-title"><div className="shell kemz-not-found__inner"><div className="kemz-not-found__copy"><p className="kemz-kicker">08 / {locale === "ru" ? "ДЕТАЛЬ, КОТОРАЯ ТОЖЕ РАБОТАЕТ" : "A DETAIL THAT STILL WORKS"}</p><h2 id="kemz-not-found-title">{locale === "ru" ? "Даже тупик ведёт к нужному разделу" : "Even a dead end offers a way forward"}</h2><p>{locale === "ru" ? "Оформил страницу 404 в языке завода: инженерный образ, ясное объяснение ошибки, переходы на главную и в каталог. Если человек попал по старой или ошибочной ссылке, он может сразу продолжить поиск оборудования или оставить запрос." : "I designed the 404 page in the factory’s visual language, with clear routes to the homepage and catalog. An old or mistyped link can still lead a visitor to equipment or an inquiry."}</p><a href="https://aokemz.ru/this-page-does-not-exist" target="_blank" rel="noreferrer">{locale === "ru" ? "Открыть страницу 404" : "Open the 404 page"} ↗</a></div><div className="kemz-not-found__screen"><Image src="/projects/kemz/not-found-engineering.webp" alt={locale === "ru" ? "Инженерный образ на странице 404 КЭМЗ" : "KEMZ engineering artwork on the 404 page"} fill sizes="(max-width: 850px) 100vw, 55vw" /><div className="kemz-not-found__overlay"><strong>404</strong><span>{locale === "ru" ? "Страница не найдена" : "Page not found"}</span><small>{locale === "ru" ? "Главная →　Каталог продукции →" : "Home →　Product catalog →"}</small></div></div></div></section>

      <section className="kemz-result" aria-labelledby="kemz-result-title"><div className="shell kemz-result__inner"><div className="kemz-result__intro"><p className="kemz-kicker">09 / {p("kemz.resultLabel")}</p><h2 id="kemz-result-title">{p("kemz.proofTitle")}</h2><p>{p("kemz.resultText")}</p><div className="kemz-result__comparison"><span>{p("kemz.proofBefore")} <strong>{p("kemz.proofBeforeValue")}</strong></span><span aria-hidden="true">→</span><span>{p("kemz.proofAfter")} <strong>95</strong></span></div></div><div className="kemz-result__report"><div className="kemz-result__report-head"><span>PageSpeed Insights / Mobile</span><span>23.09.2026</span></div><div className="kemz-result__scores"><div className="kemz-result__score-main"><div className="kemz-result__ring">95</div><strong>{p("kemz.psiPerformance")}</strong></div><div className="kemz-result__score"><strong>100</strong><span>{p("kemz.psiAccessibility")}</span></div><div className="kemz-result__score"><strong>96</strong><span>{p("kemz.psiBestPractices")}</span></div><div className="kemz-result__score"><strong>100</strong><span>SEO</span></div></div><div className="kemz-result__vitals"><div><strong>1,7 с</strong><span>FCP</span></div><div><strong>2,5 с</strong><span>LCP</span></div><div><strong>0 мс</strong><span>TBT</span></div><div><strong>0</strong><span>CLS</span></div><div><strong>4,2 с</strong><span>Speed Index</span></div></div></div></div></section>

      <section className="kemz-review" aria-labelledby="kemz-review-title"><div className="shell kemz-review__inner"><div><p className="kemz-kicker">10 / {p("kemz.reviewDraftLabel")}</p><h2 id="kemz-review-title">{p("kemz.reviewDraftText")}</h2><p><strong>{p("kemz.reviewAuthor")}</strong><span>{p("kemz.reviewRole")}</span></p></div><Image src="/projects/kemz/worker.webp" alt="" width={1600} height={640} sizes="(max-width: 800px) 100vw, 45vw" /></div></section>
      <CaseServiceBridge locale={locale} route="product-catalogues" />
      <div className="shell kemz-next"><span>{p("nextProject")}</span><Link href={`/${locale}/work/vne-shablona`}>{p("vne.nextTitle")} <span aria-hidden>↗</span></Link></div>
    </article>
  );
}
