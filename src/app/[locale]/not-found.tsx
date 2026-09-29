import Image from "next/image";
import Link from "next/link";
import { getLocale } from "next-intl/server";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ServiceLeadForm } from "@/components/ServiceLeadForm";
import styles from "./not-found.module.css";

export default async function NotFound() {
  const locale = await getLocale();
  const ru = locale !== "en";
  const directions = [
    { n: "01", href: `/${locale}/services`, title: ru ? "Услуги" : "Services", detail: ru ? "Что могу сделать для вас" : "What I can build for you" },
    { n: "02", href: `/${locale}/work`, title: ru ? "Работы" : "Work", detail: ru ? "Проекты и подробные кейсы" : "Projects and detailed case studies" },
    { n: "03", href: `/${locale}/blog`, title: ru ? "Блог" : "Blog", detail: ru ? "Идеи о сайтах и технологиях" : "Ideas on websites and technology" },
    { n: "04", href: `/${locale}/oj-cms`, title: "OJ CMS", detail: ru ? "Как удобно управлять сайтом" : "A better way to manage a website" },
  ];

  return <>
    <a href="#main" className="skip-link">{ru ? "К содержимому" : "Skip to content"}</a>
    <Header />
    <main id="main" className={styles.page}>
      <section className={styles.hero} aria-labelledby="not-found-title">
        <div className={`shell ${styles.heroInner}`}>
          <div className={styles.copy}>
            <p className={styles.kicker}><span>404</span> / {ru ? "МАРШРУТ НЕ НАЙДЕН" : "ROUTE NOT FOUND"}</p>
            <h1 id="not-found-title">{ru ? <>Кажется, мы <em>заблудились.</em></> : <>Looks like we <em>lost our way.</em></>}</h1>
            <p className={styles.lead}>{ru ? "Этой страницы здесь нет. Давайте найдём нужное направление — или расскажите мне о своей задаче, и я помогу лично." : "This page is not here. Let's find the right direction — or tell me about your project and I'll help personally."}</p>
            <div className={styles.actions}>
              <Link href={`/${locale}`} className={styles.primary}>{ru ? "На главную" : "Back home"} <span aria-hidden>↗</span></Link>
              <a href="#service-contact" className={styles.secondary}>{ru ? "Оставить заявку" : "Send an enquiry"} <span aria-hidden>↓</span></a>
            </div>
          </div>
          <div className={styles.art} aria-hidden="true">
            <span className={styles.ghostNumber}>404</span>
            <span className={styles.orbit} />
            <Image src="/mascot/mascot-lost.png" alt="" width={1280} height={1280} priority sizes="(max-width: 700px) 90vw, 46vw" />
            <span className={styles.artNote}>{ru ? "ТАК, ГДЕ ТУТ ГЛАВНАЯ?" : "WHERE'S THE HOME PAGE?"}</span>
          </div>
        </div>
      </section>

      <section className={styles.directions} aria-labelledby="directions-title">
        <div className="shell">
          <div className={styles.directionsHeading}><p className={styles.kicker}>01 / {ru ? "ДРУГИЕ МАРШРУТЫ" : "OTHER ROUTES"}</p><h2 id="directions-title">{ru ? "Вот куда можно пойти" : "Here's where to go"}</h2></div>
          <nav className={styles.links} aria-label={ru ? "Разделы сайта" : "Site sections"}>
            {directions.map((item) => <Link key={item.n} href={item.href} className={styles.link}>
              <span className={styles.linkNumber}>{item.n}</span><span className={styles.linkBody}><strong>{item.title}</strong><small>{item.detail}</small></span><span className={styles.linkArrow} aria-hidden>↗</span>
            </Link>)}
          </nav>
        </div>
      </section>

      <ServiceLeadForm
        locale={locale}
        compact
        title={ru ? "Может, вы искали не страницу, а решение?" : "Maybe you were looking for a solution?"}
        lead={ru ? "Опишите задачу прямо здесь. Я прочитаю заявку и отвечу лично." : "Describe your project here. I'll read your message and reply personally."}
      />
    </main>
    <Footer />
  </>;
}
