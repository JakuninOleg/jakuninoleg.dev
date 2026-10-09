import type { Metadata } from "next";
import Image from "next/image";
import { setRequestLocale } from "next-intl/server";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ResumePrintButton } from "@/components/ResumePrintButton";
import { resumes, resumeSkills } from "@/content/resume";
import { site } from "@/content/site";
import styles from "./page.module.css";

type Props = { params: Promise<{ locale: string }> };
export function generateStaticParams() { return [{ locale: "ru" }, { locale: "en" }]; }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const cv = resumes[locale === "en" ? "en" : "ru"];
  return { title: `${cv.name} — Frontend / Fullstack Developer · ${locale === "en" ? "Resume" : "Резюме"}`, description: cv.intro, alternates: { canonical: `/${locale}/resume`, languages: { ru: "/ru/resume", en: "/en/resume" } } };
}

export default async function ResumePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const lang = locale === "en" ? "en" : "ru";
  const cv = resumes[lang];
  const t = (ru: string, en: string) => lang === "ru" ? ru : en;
  const projects = [
    { slug: "aokemz", name: "КЭМЗ / KEMZ", image: "/projects/aokemz-v2.webp", text: t("Промышленный каталог, заявки и аналитика. Next.js + OJ CMS на Payload.", "Industrial catalog, inquiries and analytics. Next.js + Payload-based OJ CMS.") },
    { slug: "oj-cms", name: "OJ CMS", image: "/projects/oj-cms-wide.webp", text: t("Авторский интерфейс управления контентом на базе Payload.", "A custom content management interface built on Payload.") },
    { slug: "okhana", name: "Okhana", image: "/projects/okhana.webp", text: t("Семейный хаб: личное пространство, роли и поиск по памяти.", "A family hub with private spaces, roles and memory search.") },
  ];
  return <>
    <a className="skip-link" href="#main">{t("К основному содержимому", "Skip to content")}</a>
    <Header />
    <main id="main" className={styles.page}>
      <section className={styles.hero}>
        <div className="shell">
          <Breadcrumbs locale={locale} items={[{ label: t("Резюме", "Resume") }]} />
          <div className={styles.heroGrid}>
            <div className={styles.heroCopy}>
              <p className={styles.kicker}>{t("РЕЗЮМЕ / РАЗРАБОТЧИК", "RESUME / DEVELOPER")}</p>
              <h1>{cv.name.split(" ").map((word, index) => <span key={word}>{index > 0 ? " " : ""}{word}</span>)}</h1>
              <p className={styles.role}>{cv.role}</p>
              <p className={styles.intro}>{cv.intro}</p>
              <div className={styles.facts}><span>{t("Сочи · удалённо", "Sochi · remote")}</span><span>{t("Английский — рабочий", "Working proficiency in English")}</span></div>
              <div className={styles.actions}><a className={styles.primary} href={`mailto:${site.email}`}>{t("Связаться со мной", "Get in touch")} ↗</a><a href={`/resume/oleg-jakunin-${lang}.docx`} download>{t("Скачать CV", "Download CV")} ↓</a><ResumePrintButton label={t("Сохранить PDF", "Save as PDF")} className={styles.printButton} /></div>
            </div>
            <div className={styles.portrait}><span className={styles.portraitLabel}>React / Next.js / TypeScript</span><Image src="/mascot/mascot-base-fast.webp" width={1024} height={1024} preload sizes="(max-width: 760px) 90vw, 40vw" alt={t("Маскот Олега Якунина с ноутбуком", "Oleg Jakunin's mascot holding a laptop")} /><span className={styles.portraitNote}>{t("От задачи — до работающего продукта", "From an idea to a working product")}</span></div>
          </div>
          <div className={styles.heroBottom}><span>{t("8+ лет в разработке", "8+ years in development")}</span><span>{t("Финтех / аутсорсинг / свои продукты", "Fintech / outsourcing / own products")}</span><a href="#experience">{t("Посмотреть опыт", "Explore experience")} ↓</a></div>
        </div>
      </section>
      <section id="experience" className={`shell ${styles.section}`} aria-labelledby="experience-title">
        <div className={styles.sectionHead}><p className={styles.kicker}>01 / {t("ПРАКТИКА", "EXPERIENCE")}</p><h2 id="experience-title">{t("Опыт, который превращается в результат", "Experience that turns into results")}</h2></div>
        {cv.experience.map(entry => <article className={styles.job} key={entry.company}><div className={styles.jobSide}><p>{entry.period}</p><h3>{entry.company}</h3></div><div className={styles.jobBody}><h4>{entry.role}</h4><p className={styles.context}>{entry.context}</p><ul>{entry.points.map(point => <li key={point}>{point}</li>)}</ul><p className={styles.stack}>{entry.stack}</p></div></article>)}
      </section>
      <section className={styles.skillsSection} aria-labelledby="skills-title"><div className="shell"><div className={styles.sectionHead}><p className={styles.kicker}>02 / {t("ИНСТРУМЕНТЫ", "TOOLKIT")}</p><h2 id="skills-title">{t("Стек под задачу", "Tools for the task")}</h2></div><div className={styles.skills}>{resumeSkills.map(group => <div key={group.title}><h3>{group.title}</h3><p>{group.items}</p></div>)}</div></div></section>
      <section className={`shell ${styles.section}`} aria-labelledby="projects-title"><div className={styles.sectionHead}><p className={styles.kicker}>03 / {t("В РАБОТЕ", "SELECTED WORK")}</p><h2 id="projects-title">{t("Не только строки в резюме", "Beyond the resume")}</h2></div><div className={styles.projects}>{projects.map(project => <a href={`/${locale}/work/${project.slug}`} key={project.slug}><div className={styles.projectImage}><Image src={project.image} width={1200} height={750} sizes="(max-width: 760px) 90vw, 30vw" alt={t(`Интерфейс проекта ${project.name}`, `${project.name} project interface`)} /></div><h3>{project.name} <span aria-hidden="true">↗</span></h3><p>{project.text}</p></a>)}</div></section>
      <section className={`shell ${styles.section}`} aria-labelledby="mentoring-title"><div className={styles.sectionHead}><p className={styles.kicker}>04 / {t("ПЕРЕДАЧА ОПЫТА", "SHARING KNOWLEDGE")}</p><h2 id="mentoring-title">{t("Ревью и наставничество", "Code review & mentoring")}</h2></div>{cv.mentoring.map(entry => <article className={styles.job} key={entry.company}><div className={styles.jobSide}><p>{entry.period}</p><h3>{entry.company}</h3></div><div className={styles.jobBody}><h4>{entry.role}</h4><p className={styles.context}>{entry.context}</p><p>{entry.points[0]}</p></div></article>)}</section>
      <section className={styles.educationSection} aria-labelledby="education-title"><div className={`shell ${styles.educationGrid}`}><div><p className={styles.kicker}>05 / {t("ОБРАЗОВАНИЕ", "EDUCATION")}</p><h2 id="education-title">{t("Технологии + экономика", "Technology + economics")}</h2></div><div>{cv.education.map(item => <article className={styles.education} key={item.place}><p>{item.period}</p><h3>{item.title}</h3><p>{item.place}</p></article>)}</div></div></section>
      <section className={`shell ${styles.contact}`} aria-labelledby="contact-title"><p className={styles.kicker}>{t("СЛЕДУЮЩИЙ ПРОЕКТ", "THE NEXT PROJECT")}</p><h2 id="contact-title">{t("Давайте работать вместе", "Let's work together")}</h2><p>{t("Удалённо · full-time · контракт · проектная работа", "Remote · full-time · contract · freelance")}</p><div className={styles.contactLinks}><a href={`mailto:${site.email}`}>{site.email} ↗</a><a href={site.telegram} target="_blank" rel="noreferrer">Telegram ↗</a><a href={site.github} target="_blank" rel="noreferrer">GitHub ↗</a></div></section>
    </main>
    <Footer />
  </>;
}
