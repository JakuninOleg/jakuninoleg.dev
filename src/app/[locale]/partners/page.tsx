import type { Metadata } from "next";
import Image from "next/image";
import { setRequestLocale } from "next-intl/server";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ServiceLeadForm } from "@/components/ServiceLeadForm";
import { site } from "@/content/site";
import styles from "./page.module.css";

type Props = { params: Promise<{ locale: string }> };
export function generateStaticParams() { return [{ locale: "ru" }, { locale: "en" }]; }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const title = locale === "en" ? "Partnerships for designers and agencies" : "Партнёрство для дизайнеров и агентств";
  const description = locale === "en" ? "Refer website projects or work together with fullstack developer Oleg Jakunin. Agree on referral fees, roles and payments before starting." : "Передавайте клиентов на разработку сайтов за вознаграждение или работайте вместе с Олегом Якуниным. Условия, роли и выплаты согласуем до старта.";
  return { title, description, alternates: { canonical: `/${locale}/partners`, languages: { ru: "/ru/partners", en: "/en/partners" } }, openGraph: { title, description, images: ["/partners-art/handshake-v2.webp"] } };
}

export default async function PartnersPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const ru = locale !== "en";
  const t = (a: string, b: string) => ru ? a : b;
  const audiences = [
    ["✎", t("Дизайнерам", "Designers"), t("Вы проектируете интерфейс — я превращаю макет в работающий сайт. Беру на себя код, CMS и запуск.", "You design the interface; I turn it into a working website, including code, CMS and launch.")],
    ["↗", t("SMM-специалистам", "Social media specialists"), t("Если клиенту нужен сайт для рекламы и контента, подключусь к задаче. Вам не придётся искать разработчика заново.", "When your client needs a website for campaigns and content, I can join the project.")],
    ["⌕", t("Маркетологам и SEO-специалистам", "Marketers and SEO specialists"), t("Разработаю посадочные страницы, каталог и интеграции под вашу стратегию. Учту структуру, аналитику и техническое SEO.", "I build landing pages, catalogs and integrations around your strategy, with analytics and technical SEO.")],
    ["⌘", t("Агентствам и студиям", "Agencies and studios"), t("Подключусь к разработке, когда не хватает своей команды. Согласуем объём, ответственность и формат общения с клиентом.", "I can support development when your own team needs extra capacity. We agree on scope, responsibilities and client communication.")],
  ];
  const terms = [
    [t("Процент и база расчёта", "Fee and calculation basis"), t("Обсудим размер вознаграждения и сумму, от которой его считаем. Зафиксируем условия для конкретного проекта.", "We agree on the referral fee and the amount it is calculated from for each project.")],
    [t("Когда выплачивается вознаграждение", "When the fee is paid"), t("Согласуем, к какому платежу клиента привязана выплата и в какой срок она поступит партнёру.", "We specify which client payment triggers your fee and when you receive it.")],
    [t("Кто и как общается с клиентом", "Who communicates with the client"), t("Определим, кто ведёт проект, собирает обратную связь и согласует изменения. Клиенту будет понятно, к кому обращаться.", "We decide who manages the project, gathers feedback and agrees on changes, so the client knows who to contact.")],
  ];
  const faq = [
    [t("Можно ли прийти с готовым макетом?", "Can I bring a finished design?"), t("Да. Изучу макет, адаптивные состояния и требования к CMS. Затем предложу объём разработки, сроки и порядок работы.", "Yes. I review the design, responsive states and CMS requirements, then propose scope, timing and the workflow.")],
    [t("Как согласуем процент?", "How do we agree on the fee?"), t("До передачи проекта в работу. Вознаграждение зависит от формата участия и объёма задачи. Единой ставки для всех проектов пока нет — сумму и базу расчёта закрепим в договорённостях.", "Before work starts. The fee depends on your role and the scope. There is no universal rate; we record the amount and calculation basis in our agreement.")],
    [t("Кто будет вести клиента?", "Who manages the client?"), t("При рекомендации я могу вести разработку напрямую. В совместном проекте вы можете остаться основным контактом. Выберем формат заранее, а не по ходу работы.", "For referrals I can manage development directly. For joint projects you can remain the primary contact. We decide in advance.")],
    [t("Какие проекты можно передавать?", "What projects can I refer?"), t("Лендинги, корпоративные сайты, каталоги, интернет-магазины, веб-приложения и проекты с CMS. Если задача сложнее, сначала обсудим требования и оценим, смогу ли я её взять.", "Landing pages, company websites, catalogs, online stores, web applications and CMS projects. For more complex requests we discuss requirements first.")],
  ];
  return <>
    <a className="skip-link" href="#main">{t("К основному содержимому", "Skip to content")}</a>
    <Header />
    <main id="main" className={styles.page}>
      <section className={styles.hero}>
        <div className="shell">
          <Breadcrumbs locale={locale} items={[{ label: t("Партнёрам", "Partners") }]} />
          <div className={styles.heroGrid}>
            <div>
              <p className={styles.eyebrow}>{t("ХОРОШИЕ ПРОЕКТЫ ДЕЛАЮТСЯ ВМЕСТЕ", "GOOD PROJECTS ARE BUILT TOGETHER")}</p>
              <h1>{t("Вы приводите клиента. Я создаю сайт. Вы получаете процент.", "You bring the client. I build the website. You earn a referral fee.")}</h1>
              <p className={styles.lead}>{t("Для дизайнеров, SMM-специалистов и агентств, которым нужен надёжный партнёр по разработке.", "For designers, social media specialists and agencies looking for a dependable development partner.")}</p>
              <div className={styles.actions}><a className={styles.button} href="#service-contact">{t("Обсудить партнёрство", "Discuss a partnership")} ↗</a><a className={styles.textLink} href="#formats">{t("Как это работает", "How it works")} ↓</a></div>
            </div>
            <Image className={styles.heroArt} src="/partners-art/handshake-v2.webp" width={1536} height={1024} sizes="(max-width: 800px) 100vw, 55vw" preload alt={t("Олег пожимает руку дизайнеру рядом с рабочим столом и проектом сайта", "Oleg shakes hands with a designer beside a website project workstation")} />
          </div>
        </div>
      </section>
      <section className={`shell ${styles.section}`} aria-labelledby="audience-title">
        <p className={styles.eyebrow}>{t("ВАША ЭКСПЕРТИЗА + МОЯ РАЗРАБОТКА", "YOUR EXPERTISE + MY DEVELOPMENT")}</p>
        <h2 id="audience-title">{t("Кому подойдёт партнёрство", "Who this partnership is for")}</h2>
        <div className={styles.audienceGrid}>
          <Image className={styles.scene} src="/partners-art/together.webp" width={1536} height={1024} sizes="(max-width: 800px) 100vw, 45vw" alt={t("Дизайнер и разработчик вместе работают над интерфейсом сайта", "A designer and developer working together on a website interface")} />
          <div>{audiences.map(([icon, title, body]) => <article className={styles.audience} key={title}><span aria-hidden="true">{icon}</span><div><h3>{title}</h3><p>{body}</p></div></article>)}</div>
        </div>
      </section>
      <section id="formats" className={`shell ${styles.section}`} aria-labelledby="formats-title">
        <h2 id="formats-title">{t("Два способа работать вместе", "Two ways to work together")}</h2>
        <div className={styles.formats}>
          <article className={styles.format}><div><p className={styles.eyebrow}>{t("ЗНАКОМИТЕ — Я ВЕДУ ПРОЕКТ", "INTRODUCE US — I RUN THE PROJECT")}</p><h3>{t("Рекомендация клиента", "Client referral")}</h3><p>{t("Вы знакомите меня с клиентом, которому нужна разработка. Я обсуждаю задачу, готовлю предложение и веду проект. Вы получаете согласованное вознаграждение.", "Introduce me to a client who needs development. I discuss the brief, prepare a proposal and deliver the project. You receive the agreed fee.")}</p></div><Image src="/partners-art/handshake-v2.webp" width={1536} height={1024} sizes="(max-width: 800px) 90vw, 40vw" alt="" /></article>
          <article className={styles.format}><div><p className={styles.eyebrow}>{t("ОБЪЕДИНЯЕМ СИЛЬНЫЕ СТОРОНЫ", "COMBINE OUR STRENGTHS")}</p><h3>{t("Совместный проект", "Joint project")}</h3><p>{t("Вы отвечаете за дизайн или маркетинг, я — за разработку. Согласуем роли, сроки и оплату до старта. Каждый занимается своей частью, а клиент получает целый проект.", "You handle design or marketing; I handle development. We agree on roles, timing and payment before starting, so the client receives a complete project.")}</p></div><Image src="/partners-art/together.webp" width={1536} height={1024} sizes="(max-width: 800px) 90vw, 40vw" alt="" /></article>
        </div>
      </section>
      <section className={styles.terms} aria-labelledby="terms-title"><div className="shell">
        <p className={styles.eyebrow}>{t("БЕЗ НЕОЖИДАННОСТЕЙ В КОНЦЕ", "NO SURPRISES AT THE END")}</p><h2 id="terms-title">{t("Условия фиксируем до старта", "Agree on the terms before starting")}</h2>
        <div className={styles.termsGrid}><Image className={styles.scene} src="/partners-art/agreement.webp" width={1536} height={1024} sizes="(max-width: 800px) 90vw, 40vw" alt={t("Олег с договором рядом с символом процента: условия вознаграждения согласуются заранее", "Oleg holding an agreement beside a percentage symbol")} /><div>{terms.map(([title, body]) => <article className={styles.term} key={title}><span aria-hidden="true">✓</span><div><h3>{title}</h3><p>{body}</p></div></article>)}<p className={styles.note}>{t("Сначала договорённости. Потом работа.", "First the agreement. Then the work.")}</p></div></div>
      </div></section>
      <section className={`shell ${styles.section}`} aria-labelledby="start-title"><h2 id="start-title">{t("От знакомства до совместного проекта", "From introductions to a shared project")}</h2><div className={styles.steps}>
        {[
          ["01-discovery", t("Обсуждаем формат", "Choose the format"), t("Напишите, чем занимаетесь и с какими задачами приходят ваши клиенты.", "Tell me what you do and what your clients need.")],
          ["02-research", t("Знакомимся с задачей клиента", "Explore the client’s brief"), t("Разберём цели, материалы и ограничения. Определим, что нужно разработать.", "Review goals, materials and constraints to define the development scope.")],
          ["04-build", t("Фиксируем условия и начинаем", "Agree and begin"), t("Согласуем ответственность, вознаграждение и план. Приступим к проекту.", "Agree on responsibilities, fees and the plan, then start the project.")],
        ].map(([asset, title, body]) => <article key={asset}><Image src={`/process-art/${asset}.webp`} width={1024} height={1024} sizes="(max-width: 650px) 80vw, 30vw" alt="" /><h3>{title}</h3><p>{body}</p></article>)}
      </div></section>
      <section className={`shell ${styles.section} ${styles.faq}`} aria-labelledby="faq-title"><h2 id="faq-title">{t("Что обсудим перед стартом?", "What do we discuss first?")}</h2><div>{faq.map(([q, a], i) => <details key={q} open={i === 0}><summary>{q}<span aria-hidden="true">+</span></summary><p>{a}</p></details>)}</div></section>
      <div className={styles.contact}><ServiceLeadForm locale={locale} service={t("Партнёрство", "Partnership")} partnership title={t("Есть клиент или идея для сотрудничества?", "Have a client or a collaboration in mind?")} lead={t("Расскажите о себе и формате, который вам интересен. Обсудим, как можем работать вместе.", "Tell me about yourself and how you would like to collaborate. Let’s see how we can work together.")} /><a className={`shell ${styles.telegram}`} href={site.telegram} target="_blank" rel="noreferrer">{t("Можно написать напрямую в Telegram", "Or contact me directly on Telegram")} {site.telegramHandle} ↗</a></div>
    </main>
    <Footer />
  </>;
}
