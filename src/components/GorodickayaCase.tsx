import Image from "next/image";
import Link from "next/link";
import { Breadcrumbs } from "./Breadcrumbs";
import { ServiceLeadForm } from "./ServiceLeadForm";
import { gorodickayaCase } from "@/content/gorodickaya-case";
import styles from "./GorodickayaCase.module.css";

const colours = ["#0F3D33", "#F5F2E8", "#92A39A", "#D1AD64"];

export function GorodickayaCase({ locale }: { locale: string }) {
  const c = gorodickayaCase[locale === "en" ? "en" : "ru"];
  const isRu = locale !== "en";

  return <>
    <article className={styles.case}>
      <header className={styles.hero}>
        <div className="shell">
          <Breadcrumbs locale={locale} items={[{ label: isRu ? "Работы" : "Work", href: `/${locale}/work` }, { label: c.name }]} />
          <div className={styles.heroGrid}>
            <h1 className={styles.heroTitle}>{c.title}</h1>
            <figure className={styles.heroArt}>
              <Image src="/projects/gorodickaya/portal.webp" alt={c.portalAlt} width={1536} height={1024} sizes="(max-width: 760px) 100vw, 55vw" priority />
              <figcaption>{c.name} · Astro</figcaption>
            </figure>
            <div className={styles.heroCopy}>
              <p className={styles.lead}>{c.lead}</p>
              <div className={styles.actions}>
                <a className={styles.primary} href="https://gorodickaya.ru/" target="_blank" rel="noopener noreferrer">{c.visit} <span aria-hidden="true">↗</span></a>
                <a className={styles.textLink} href="#service-contact">{c.discuss} <span aria-hidden="true">↓</span></a>
              </div>
            </div>
          </div>
          <dl className={styles.facts}>{c.facts.map(item => <div key={item.label}>
            <dt>{item.label}</dt>
            <dd><p className={styles.factTitle}>{item.title}</p><p className={styles.factText}>{item.text}</p></dd>
          </div>)}</dl>
        </div>
      </header>

      <div className={`shell ${styles.screenIntro}`}>
        <figure className={styles.screen}>
          <Image src="/projects/gorodickaya/desktop.webp" alt={c.desktopAlt} width={1425} height={990} sizes="(max-width: 1240px) 100vw, 1200px" />
          <figcaption><span aria-hidden="true" className={styles.statusDot} />{c.desktopCaption}<a href="https://gorodickaya.ru/" target="_blank" rel="noopener noreferrer" aria-label={c.visit}>gorodickaya.ru ↗</a></figcaption>
        </figure>
      </div>

      <section id="brief" className={`shell ${styles.section} ${styles.split}`} aria-labelledby="brief-title">
        <h2 id="brief-title">{c.problemTitle}</h2>
        <div className={styles.prose}>{c.problem.map(text => <p key={text}>{text}</p>)}<p className={styles.decision}>{c.decision}</p></div>
      </section>

      <section id="research" className={styles.research} aria-labelledby="research-title"><div className="shell">
        <div className={styles.split}><h2 id="research-title">{c.researchTitle}</h2><p className={styles.intro}>{c.researchIntro}</p></div>
        <div className={styles.researchRows}>{c.research.map(item => <div key={item.title}><h3>{item.title}</h3><p>{item.text}</p></div>)}</div>
      </div></section>

      <section id="design" className={`shell ${styles.section}`} aria-labelledby="design-title">
        <div className={styles.split}><h2 id="design-title">{c.designTitle}</h2><div className={styles.prose}>{c.design.map(text => <p key={text}>{text}</p>)}</div></div>
        <div className={styles.brandBoard}>
          <div className={styles.monogram}><Image src="/projects/gorodickaya/mark.svg" alt={isRu ? "Монограмма Натальи Городицкой" : "Natalia Goroditskaya's monogram"} width={180} height={180} /><span>{c.markCaption}</span></div>
          <div className={styles.typeSample}><span>{c.typeCaption}</span><p>{c.typeSample}</p><span>Prata / Manrope</span></div>
          <ul className={styles.swatches}>{colours.map((colour, index) => <li key={colour}><span style={{ background: colour }} /><div>{c.palette[index]}<small>{colour}</small></div></li>)}</ul>
        </div>
      </section>

      <section id="structure" className={styles.structure} aria-labelledby="structure-title"><div className="shell">
        <div className={styles.split}><h2 id="structure-title">{c.structureTitle}</h2><p className={styles.intro}>{c.structureIntro}</p></div>
        <ol className={styles.journey}>{c.journey.map((item, index) => <li key={item.title}><span className={styles.step}>{index + 1}</span><h3>{item.title}</h3><p>{item.text}</p><a href={item.path} target="_blank" rel="noopener noreferrer">{item.link} ↗</a></li>)}</ol>
        <figure className={styles.screen}><Image src="/projects/gorodickaya/service.webp" alt={c.serviceAlt} width={1425} height={990} sizes="(max-width: 1240px) 100vw, 1200px" /><figcaption>{c.serviceCaption}</figcaption></figure>
      </div></section>

      <section className={`shell ${styles.section}`} aria-labelledby="architecture-title">
        <h2 id="architecture-title" className={styles.narrowTitle}>{c.architectureTitle}</h2>
        <div className={styles.architectureGrid}>
          <figure className={styles.workshop}><Image src="/projects/gorodickaya/workshop.webp" alt={c.workshopAlt} width={1536} height={1024} sizes="(max-width: 900px) 100vw, 55vw" /><figcaption>{c.workshopCaption}</figcaption></figure>
          <div className={styles.pageRoles}>{c.architecture.map(item => <div key={item.title}><h3>{item.title}</h3><p>{item.text}</p></div>)}</div>
        </div>
      </section>

      <section id="search" className={styles.search} aria-labelledby="search-title"><div className="shell">
        <div className={styles.split}><h2 id="search-title">{c.seoTitleSection}</h2><p className={styles.intro}>{c.seoIntro}</p></div>
        <div className={styles.searchRows}>{c.seo.map(item => <div key={item.title}><h3>{item.title}</h3><p>{item.text}</p></div>)}</div>
        <div className={styles.geo}><h3>{c.geoTitle}</h3><p>{c.geo}</p></div>
      </div></section>

      <section id="development" className={`shell ${styles.section} ${styles.development}`} aria-labelledby="development-title">
        <div className={styles.developmentCopy}><h2 id="development-title">{c.buildTitle}</h2><div className={styles.prose}>{c.build.map(text => <p key={text}>{text}</p>)}</div><h3>{c.mobileTitle}</h3><p>{c.mobileText}</p><ul className={styles.stack}><li>Astro</li><li>TypeScript</li><li>HTML / CSS</li><li>Schema.org</li></ul></div>
        <figure className={styles.mobile}><Image src="/projects/gorodickaya/mobile.webp" alt={c.mobileAlt} width={375} height={812} sizes="(max-width: 600px) 80vw, 340px" /><figcaption>{isRu ? "Настоящий мобильный экран" : "Actual mobile screen"}</figcaption></figure>
      </section>

      <section className={styles.result} aria-labelledby="result-title"><div className="shell">
        <h2 id="result-title">{c.resultTitle}</h2>
        <div className={styles.resultGrid}>
          <figure className={styles.resultArt}><Image src="/projects/gorodickaya/result.webp" alt={c.resultAlt} width={1536} height={1024} sizes="(max-width: 900px) 100vw, 55vw" /></figure>
          <div><p className={styles.intro}>{c.result}</p><ul className={styles.deliverables}>{c.deliverables.map(text => <li key={text}>{text}</li>)}</ul><a className={styles.primary} href="https://gorodickaya.ru/" target="_blank" rel="noopener noreferrer">{c.visit} ↗</a></div>
        </div>
      </div></section>

      <aside className={`shell ${styles.section} ${styles.related}`} aria-labelledby="related-title"><h2 id="related-title">{c.relatedTitle}</h2><div>{c.related.map(([route, title, text]) => <Link key={route} href={`/${locale}/services/${route}`}><h3>{title} <span aria-hidden="true">↗</span></h3><p>{text}</p></Link>)}</div></aside>
    </article>
    <ServiceLeadForm locale={locale} service={isRu ? "Многостраничный сайт эксперта на Astro" : "Multi-page expert website with Astro"} title={c.formTitle} lead={c.formLead} />
    <div className={`shell ${styles.back}`}><Link href={`/${locale}/work`}>← {c.next}</Link></div>
  </>;
}
