import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";

function KemzCatalogPreview({ locale }: { locale: string }) {
  return (
    <div className="kemz-catalog-preview" role="img" aria-label={locale === "ru" ? "Фрагмент каталога КЭМЗ с фильтрами и карточкой оборудования" : "KEMZ catalog interface with filters and an equipment card"}>
      <div className="kemz-catalog-preview__top"><strong>Найдено позиций: 33</strong><span>Сортировка&nbsp; ▾</span></div>
      <div className="kemz-catalog-preview__body">
        <div className="kemz-catalog-preview__filters"><b>ФИЛЬТРЫ</b><span>Поиск по названию</span><i>Например, ДПТ</i><strong>▾ Категория</strong><small>□ Экскаваторное оборудование</small><small>□ Шахтное оборудование</small></div>
        <div className="kemz-catalog-preview__product"><Image src="/projects/kemz/rotor.webp" alt="" width={1152} height={864} sizes="(max-width: 800px) 50vw, 15vw" /><span>Тяговые двигатели для БЕЛАЗ</span><b>Электродвигатель тяговый ДПТ590-2</b><small>Мощность, кВт&nbsp;&nbsp; 590</small></div>
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

export async function KemzCase({ locale }: { locale: string }) {
  const p = await getTranslations("Portfolio");
  const tasks = p.raw("kemz.contextItems") as string[];
  const site = "https://aokemz.ru/";

  return (
    <article className="kemz-case">
      <section className="kemz-hero" aria-labelledby="kemz-title">
        <Image className="kemz-hero__landscape" src="/projects/kemz/quarry.webp" alt="" fill sizes="100vw" priority />
        <div className="shell kemz-hero__inner">
          <div className="kemz-hero__copy">
            <Link href={`/${locale}/work`} className="kemz-back">← {p("backCatalog")}</Link>
            <p className="kemz-kicker">01 / {p("kemz.eyebrow")}</p>
            <h1 id="kemz-title"><strong>{locale === "ru" ? "КЭМЗ" : "KEMZ"}</strong>{" "}<span>{p("kemz.title")}</span></h1>
            <p>{p("kemz.intro")}</p>
            <a className="kemz-button" href="#kemz-context">{p("kemz.heroButton")} <span aria-hidden>↗</span></a>
          </div>
          <div className="kemz-hero__art">
            <div className="kemz-hero__tablet" aria-label={p("kemz.caption")}><div className="kemz-hero__screen"><Image src="/projects/aokemz-v2.webp" alt={p("kemz.caption")} width={1265} height={712} sizes="(max-width: 900px) 100vw, 60vw" priority /></div></div>
            <KemzPhonePreview locale={locale} />
            <span className="kemz-hero__art-index" aria-hidden>01</span>
          </div>
          <div className="kemz-hero__rail"><span>{p("kemz.heroProject")}</span><span>01 — 06</span></div>
        </div>
        <div className="shell kemz-hero__facts"><span>{p("kemz.heroFactOne")}</span><span>{p("kemz.heroFactTwo")}</span><span>{p("kemz.heroFactThree")}</span><a href={site} target="_blank" rel="noreferrer">{p("kemz.heroSite")} ↗</a></div>
      </section>

      <section className="kemz-context" id="kemz-context" aria-labelledby="kemz-context-title">
        <div className="kemz-context__photo"><Image src="/projects/kemz/quarry-detail.webp" alt={locale === "ru" ? "Карьерный экскаватор" : "Mining excavator"} fill sizes="(max-width: 800px) 100vw, 34vw" /></div>
        <div className="kemz-context__story"><p className="kemz-kicker">02 / {p("kemz.contextLabel")}</p><h2 id="kemz-context-title">{p("kemz.contextTitle")}</h2><p>{p("kemz.contextText")}</p></div>
        <div className="kemz-context__tasks"><span>{p("kemz.contextTask")}</span><ul>{tasks.map((item) => <li key={item}>{item}</li>)}</ul></div>
      </section>

      <section className="kemz-solution" aria-labelledby="kemz-solution-title">
        <div className="shell">
          <div className="kemz-solution__heading"><div><p className="kemz-kicker">03 / {p("kemz.solutionLabel")}</p><h2 id="kemz-solution-title">{p("kemz.scopeTitle")}</h2></div><p>{p("kemz.solutionIntro")}</p></div>
          <div className="kemz-solution__grid">
            <article className="kemz-solution__card"><span>01</span><h3>{p("kemz.scope1Title")}</h3><p>{p("kemz.scope1Text")}</p></article>
            <article className="kemz-solution__card"><span>02</span><h3>{p("kemz.scope2Title")}</h3><p>{p("kemz.scope2Text")}</p></article>
            <article className="kemz-solution__card"><span>03</span><h3>{p("kemz.scope3Title")}</h3><p>{p("kemz.scope3Text")}</p></article>
            <article className="kemz-solution__card"><span>04</span><h3>{p("kemz.scope4Title")}</h3><p>{p("kemz.scope4Text")}</p></article>
          </div>
        </div>
      </section>

      <section className="shell kemz-details" aria-labelledby="kemz-details-title"><div className="kemz-details__heading"><div><p className="kemz-kicker">04 / {p("kemz.detailsLabel")}</p><h2 id="kemz-details-title">{p("kemz.detailsTitle")}</h2></div><p>{p("kemz.detailsText")}</p></div><div className="kemz-details__grid"><figure className="kemz-details__primary"><Image src="/projects/aokemz-v2.webp" alt={p("kemz.caption")} width={1265} height={712} sizes="(max-width: 800px) 100vw, 60vw" /><figcaption>{p("kemz.caption")}</figcaption></figure><figure className="kemz-details__interface"><KemzCatalogPreview locale={locale} /><figcaption>{p("kemz.scope2Title")}</figcaption></figure><figure className="kemz-details__interface"><KemzRequestPreview locale={locale} /><figcaption>{p("kemz.scope3Title")}</figcaption></figure></div></section>

      <section className="kemz-result" aria-labelledby="kemz-result-title"><div className="shell kemz-result__inner"><div className="kemz-result__intro"><p className="kemz-kicker">05 / {p("kemz.resultLabel")}</p><h2 id="kemz-result-title">{p("kemz.proofTitle")}</h2><p>{p("kemz.resultText")}</p><div className="kemz-result__comparison"><span>{p("kemz.proofBefore")} <strong>~60–70</strong></span><span aria-hidden="true">→</span><span>{p("kemz.proofAfter")} <strong>95</strong></span></div></div><div className="kemz-result__report"><div className="kemz-result__report-head"><span>PageSpeed Insights / Mobile</span><span>23.09.2026</span></div><div className="kemz-result__scores"><div className="kemz-result__score-main"><div className="kemz-result__ring">95</div><strong>{p("kemz.psiPerformance")}</strong></div><div className="kemz-result__score"><strong>100</strong><span>{p("kemz.psiAccessibility")}</span></div><div className="kemz-result__score"><strong>96</strong><span>{p("kemz.psiBestPractices")}</span></div><div className="kemz-result__score"><strong>100</strong><span>SEO</span></div></div><div className="kemz-result__vitals"><div><strong>1,7 с</strong><span>FCP</span></div><div><strong>2,5 с</strong><span>LCP</span></div><div><strong>0 мс</strong><span>TBT</span></div><div><strong>0</strong><span>CLS</span></div><div><strong>4,2 с</strong><span>Speed Index</span></div></div><p>{p("kemz.psiSource")}</p><a className="kemz-result__source" href="https://pagespeed.web.dev/analysis/https-aokemz-ru/efozto0wws?form_factor=mobile" target="_blank" rel="noreferrer">{p("kemz.psiOpenReport")} ↗</a></div></div></section>

      <section className="kemz-review" aria-labelledby="kemz-review-title"><div className="shell kemz-review__inner"><div><p className="kemz-kicker">06 / {p("kemz.reviewDraftLabel")}</p><h2 id="kemz-review-title">{p("kemz.reviewDraftText")}</h2><p><strong>{p("kemz.reviewAuthor")}</strong><span>{p("kemz.reviewRole")}</span></p></div><Image src="/projects/kemz/worker.webp" alt="" width={1600} height={640} sizes="(max-width: 800px) 100vw, 45vw" /></div></section>
      <div className="shell kemz-next"><span>{p("nextProject")}</span><Link href={`/${locale}/work/oj-cms`}>OJ CMS <span aria-hidden>↗</span></Link></div>
    </article>
  );
}
