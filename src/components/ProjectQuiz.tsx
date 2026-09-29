"use client";

import { useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ServiceLeadForm } from "@/components/ServiceLeadForm";
import { calculateEstimate, projects, type CmsMode, type MaterialState, type ProjectKind, type QuizLocale, type StartingPoint } from "@/content/project-estimator";
import styles from "./ProjectQuiz.module.css";

const startChoices: { id: StartingPoint; label: Record<QuizLocale, string>; detail: Record<QuizLocale, string> }[] = [
  { id: "new", label: { ru: "Начинаем с нуля", en: "Starting fresh" }, detail: { ru: "Сайта или рабочего продукта пока нет", en: "No existing site or product" } },
  { id: "source", label: { ru: "Есть сайт и исходники", en: "Existing site and source" }, detail: { ru: "Можно изучить код, дизайн и контент", en: "Code, design and content are available" } },
  { id: "no-source", label: { ru: "Есть сайт, но без исходников", en: "Existing site, no source" }, detail: { ru: "Нужно восстановить или перенести материалы", en: "Content may need recreating or migrating" } },
  { id: "unsure", label: { ru: "Пока не знаю", en: "Not sure yet" }, detail: { ru: "Разберёмся вместе перед точной сметой", en: "We'll clarify this before a final quote" } },
];

const aiStartChoices: typeof startChoices = [
  { id: "new", label: { ru: "Есть идея, но нет продукта", en: "An idea, no product yet" }, detail: { ru: "Спроектируем первый рабочий сценарий", en: "We'll design the first working flow" } },
  { id: "source", label: { ru: "Есть продукт и доступы", en: "Product and access available" }, detail: { ru: "Встроим ИИ в действующую систему", en: "Add AI to an existing product" } },
  { id: "no-source", label: { ru: "Есть продукт без исходников", en: "Product without source files" }, detail: { ru: "Изучим доступные API и ограничения", en: "Review available APIs and limitations" } },
  startChoices[3],
];

const seoStartChoices: typeof startChoices = [
  { id: "new", label: { ru: "Сайт ещё запускается", en: "The site is being launched" }, detail: { ru: "Заложим структуру до публикации", en: "Plan search structure before launch" } },
  { id: "source", label: { ru: "Есть сайт и доступы", en: "Site and access available" }, detail: { ru: "Проверим текущие страницы и данные", en: "Review current pages and data" } },
  { id: "no-source", label: { ru: "Есть сайт, но нет доступов", en: "Site without access" }, detail: { ru: "Начнём с открытого аудита", en: "Start with a public audit" } },
  startChoices[3],
];

const materialChoices: { id: MaterialState; label: Record<QuizLocale, string>; detail: Record<QuizLocale, string> }[] = [
  { id: "ready", label: { ru: "Всё подготовлено", en: "Everything is ready" }, detail: { ru: "Тексты, изображения, товары или данные есть", en: "Copy, images, products or data are ready" } },
  { id: "partial", label: { ru: "Есть часть материалов", en: "Some materials are ready" }, detail: { ru: "Остальное соберём вместе", en: "We'll finish the rest together" } },
  { id: "help", label: { ru: "Нужна помощь с содержанием", en: "I need content help" }, detail: { ru: "Помогу со структурой, текстами и подбором", en: "Help with structure, copy and selection" } },
];

const cmsChoices: { id: CmsMode; label: Record<QuizLocale, string>; detail: Record<QuizLocale, string> }[] = [
  { id: "none", label: { ru: "Не нужна", en: "Not needed" }, detail: { ru: "Редкие обновления можно делать через меня", en: "Occasional updates can be handled directly" } },
  { id: "basic", label: { ru: "Редактировать страницы самим", en: "Edit pages ourselves" }, detail: { ru: "Тексты, изображения и простые разделы", en: "Copy, images and simple sections" } },
  { id: "advanced", label: { ru: "Сложный редактор и роли", en: "Structured editor and roles" }, detail: { ru: "Связанные данные и разные права доступа", en: "Related content and different permissions" } },
];

const labels = {
  ru: {
    step: "ШАГ", of: "ИЗ", next: "Дальше", back: "Назад", result: "Посмотреть расчёт", restart: "Рассчитать другой проект", continueHint: "Для продолжения нажмите «Дальше».",
    questions: ["Что хотите сделать?", "С чего начинаем?", "Какой объём нужен?", "Что ещё должно работать?", "Что уже подготовлено?"],
    helpers: ["Выберите ближайший формат. Детали можно уточнить после расчёта.", "Это влияет на объём переноса и доработки.", "Выберите ближайший масштаб первой версии.", "Можно отметить несколько пунктов или пропустить этот шаг.", "Последний шаг: материалы и управление контентом."],
    cms: "Нужно самим обновлять контент?", includedCms: "Базовое управление контентом уже входит в этот формат. Сложные роли и редактор обсудим отдельно.",
    preview: "ОРИЕНТИР ПО ПРОЕКТУ", previewEmpty: "Выберите формат, и я покажу ориентир по цене и срокам.",
    from: "от", days: "рабочих дней", estimate: "Предварительная оценка", estimateLead: "Я сложил выбранный формат и функции. После короткого разговора зафиксируем состав работ, стоимость и календарный план.",
    price: "Стоимость", time: "Срок", selected: "Что учтено", basic: "Базовый формат", noExtras: "Без дополнительных функций", cmsLine: "CMS для самостоятельного обновления", contentLine: "Помощь с материалами", sourceLine: "Перенос без исходников",
    disclaimer: "Это ориентир, а не публичная оферта: цена и срок зависят от материалов, доступов, интеграций и согласованного объёма. Платные сервисы, лицензии и тарифы провайдеров считаются отдельно.",
    action: "Обсудить точную смету", details: "Подробнее об услуге", formTitle: "Пришлите расчёт — обсудим детали", formLead: "Выбранные ответы уже записаны в сообщение. Добавьте контакт и то, что важно для проекта.",
    mascotNote: "Соберём проект по вашей задаче", chosen: "Выбрано", noSelection: "Пока без дополнительных функций",
  },
  en: {
    step: "STEP", of: "OF", next: "Next", back: "Back", result: "See estimate", restart: "Estimate another project", continueHint: "To continue, tap Next.",
    questions: ["What would you like to build?", "Where are we starting?", "How large is the first version?", "What else should it do?", "What is ready already?"],
    helpers: ["Choose the closest format. We can refine it later.", "This affects migration and discovery work.", "Pick the closest scope for version one.", "Choose several or skip this step.", "One last step: materials and content management."],
    cms: "Do you need to edit content yourselves?", includedCms: "Basic content management is included in this format. Advanced roles and editing can be scoped separately.",
    preview: "PROJECT GUIDE", previewEmpty: "Choose a format to see an indicative price and timeline.",
    from: "from", days: "working days", estimate: "Preliminary estimate", estimateLead: "This combines your selected format and features. After a brief discussion, we can agree on the scope, price and delivery plan.",
    price: "Cost", time: "Timeline", selected: "Included in the estimate", basic: "Base scope", noExtras: "No extra features", cmsLine: "CMS for self-service editing", contentLine: "Content support", sourceLine: "Migration without source files",
    disclaimer: "This is a guide, not a binding quote. The final price and timeline depend on materials, access, integrations and agreed scope. Third-party subscriptions and provider fees are separate.",
    action: "Discuss a firm quote", details: "Explore the service", formTitle: "Send the estimate — let's talk", formLead: "Your choices are prefilled in the message. Add your contact details and any project context.",
    mascotNote: "Let's plan around your task", chosen: "Selected", noSelection: "No extra features yet",
  },
} as const;

const money = (amount: number, locale: QuizLocale) => `${new Intl.NumberFormat(locale === "ru" ? "ru-RU" : "en-US").format(amount)} ₽`;

export function ProjectQuiz({ locale, embedded = false }: { locale: string; embedded?: boolean }) {
  const panelRef = useRef<HTMLElement>(null);
  const language: QuizLocale = locale === "en" ? "en" : "ru";
  const t = labels[language];
  const QuestionHeading = embedded ? "h3" : "h2";
  const [step, setStep] = useState(0);
  const [kind, setKind] = useState<ProjectKind | null>(null);
  const [start, setStart] = useState<StartingPoint>("new");
  const [scope, setScope] = useState("base");
  const [features, setFeatures] = useState<string[]>([]);
  const [cms, setCms] = useState<CmsMode>("none");
  const [materials, setMaterials] = useState<MaterialState>("ready");
  const [cmsChosen, setCmsChosen] = useState(false);
  const [materialsChosen, setMaterialsChosen] = useState(false);
  const project = projects.find((item) => item.id === kind);
  const startingChoices = kind === "ai" ? aiStartChoices : kind === "seo" ? seoStartChoices : startChoices;
  const quote = useMemo(() => kind ? calculateEstimate({ kind, start, scope, features, cms, materials }) : null, [kind, start, scope, features, cms, materials]);
  const progress = Math.min(step, 5) / 5 * 100;

  function advanceTo(nextStep: number) {
    setStep(nextStep);
    requestAnimationFrame(() => panelRef.current?.scrollIntoView({
      block: "start",
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
    }));
  }

  function chooseKind(value: ProjectKind) {
    setKind(value);
    setStart("new");
    setScope("base");
    setFeatures([]);
    setCms("none");
    setMaterials("ready");
    setCmsChosen(false);
    setMaterialsChosen(false);
    advanceTo(1);
  }

  function toggleFeature(id: string) {
    setFeatures((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  }

  function restart() {
    setStep(0);
    setKind(null);
    setFeatures([]);
    setCmsChosen(false);
    setMaterialsChosen(false);
    requestAnimationFrame(() => panelRef.current?.scrollIntoView({
      block: "start",
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
    }));
  }

  const summary = quote && project ? [
    `${language === "ru" ? "Проект" : "Project"}: ${project.title[language]}`,
    `${language === "ru" ? "Старт" : "Starting point"}: ${startingChoices.find((item) => item.id === start)?.label[language]}`,
    `${language === "ru" ? "Объём" : "Scope"}: ${quote.scope.label[language]}`,
    `${language === "ru" ? "Функции" : "Features"}: ${quote.selected.length ? quote.selected.map((item) => item.label[language]).join(", ") : t.noSelection}`,
    ...(project.cms === "optional" ? [`CMS: ${cmsChoices.find((item) => item.id === cms)?.label[language]}`] : []),
    `${language === "ru" ? "Материалы" : "Materials"}: ${materialChoices.find((item) => item.id === materials)?.label[language]}`,
    `${language === "ru" ? "Ориентир" : "Guide"}: ${money(quote.minimum, language)}–${money(quote.maximum, language)}, ${quote.days[0]}–${quote.days[1]} ${t.days}.`,
    language === "ru" ? "Пожалуйста, уточните задачу и предложите точную смету." : "Please review the project and suggest a firm quote.",
  ].join("\n") : "";

  return <div className={styles.wrapper}>
    <div className={`shell ${styles.layout}`}>
      <section ref={panelRef} className={`${styles.panel}${step === 3 ? ` ${styles.panelWithAdvance}` : ""}`} aria-label={language === "ru" ? "Квиз-калькулятор стоимости проекта" : "Project cost calculator"}>
        <div className={styles.progressText}><span>{step < 5 ? `${t.step} ${step + 1} ${t.of} 5` : t.estimate}</span><span>{Math.round(progress)}%</span></div>
        <div className={styles.progressTrack}><span style={{ width: `${progress}%` }} /></div>

        {step < 5 ? <>
          <div className={styles.questionHead}><QuestionHeading>{step === 2 && project ? project.scopeQuestion[language] : step === 3 && project ? project.featureQuestion[language] : t.questions[step]}</QuestionHeading><p>{t.helpers[step]}</p></div>

          {step === 0 && <div className={styles.kindGrid}>{projects.map((item, index) => <button key={item.id} type="button" className={`${styles.kindCard} ${kind === item.id ? styles.active : ""}`} aria-pressed={kind === item.id} onClick={() => chooseKind(item.id)}><span className={styles.optionIndex}>{String(index + 1).padStart(2, "0")}</span><strong>{item.title[language]}</strong><small>{item.short[language]}</small><span className={styles.optionArrow} aria-hidden="true">↗</span></button>)}</div>}

          {step === 1 && <div className={styles.choiceGrid}>{startingChoices.map((item) => <button key={item.id} type="button" className={`${styles.choice} ${start === item.id ? styles.active : ""}`} aria-pressed={start === item.id} onClick={() => { setStart(item.id); advanceTo(2); }}><strong>{item.label[language]}</strong><small>{item.detail[language]}</small></button>)}</div>}

          {step === 2 && project && <div className={styles.choiceGrid}>{project.scopes.map((item) => <button key={item.id} type="button" className={`${styles.choice} ${scope === item.id ? styles.active : ""}`} aria-pressed={scope === item.id} onClick={() => { setScope(item.id); advanceTo(3); }}><strong>{item.label[language]}</strong><small>{item.price ? `+ ${money(item.price, language)}` : t.basic}</small></button>)}</div>}

          {step === 3 && project && <div className={styles.choiceGrid}>{project.features.map((item) => <button key={item.id} type="button" className={`${styles.choice} ${features.includes(item.id) ? styles.active : ""}`} aria-pressed={features.includes(item.id)} onClick={() => toggleFeature(item.id)}><strong>{item.label[language]}</strong><small>+ {money(item.price, language)}</small><span className={styles.check} aria-hidden="true">{features.includes(item.id) ? "✓" : "+"}</span></button>)}</div>}

          {step === 4 && project && <div className={styles.lastStep}><div><h3>{language === "ru" ? (kind === "ai" ? "Данные и примеры уже есть?" : kind === "seo" ? "Есть доступы и материалы?" : "Тексты, фото и данные готовы?") : "Are the materials ready?"}</h3><div className={styles.choiceGrid}>{materialChoices.map((item) => <button key={item.id} type="button" className={`${styles.choice} ${materialsChosen && materials === item.id ? styles.active : ""}`} aria-pressed={materialsChosen && materials === item.id} onClick={() => { setMaterials(item.id); setMaterialsChosen(true); if (project.cms !== "optional" || cmsChosen) advanceTo(5); }}><strong>{item.label[language]}</strong><small>{item.detail[language]}</small></button>)}</div></div>{project.cms === "optional" && <div><h3>{t.cms}</h3><div className={styles.choiceGrid}>{cmsChoices.map((item) => <button key={item.id} type="button" className={`${styles.choice} ${cmsChosen && cms === item.id ? styles.active : ""}`} aria-pressed={cmsChosen && cms === item.id} onClick={() => { setCms(item.id); setCmsChosen(true); if (materialsChosen) advanceTo(5); }}><strong>{item.label[language]}</strong><small>{item.detail[language]}</small></button>)}</div></div>}{project.cms === "included" && <p className={styles.includedNote}>{t.includedCms}</p>}</div>}

          <div className={styles.controls}>{step > 0 ? <button type="button" className={styles.back} onClick={() => setStep((value) => value - 1)}>← {t.back}</button> : <span />}{step === 3 && <button type="button" className={`${styles.next} ${styles.desktopAdvance}`} onClick={() => advanceTo(4)}>{t.next} <span aria-hidden="true">↗</span></button>}</div>
          {step === 3 && <div className={styles.mobileAdvance}><span>{t.continueHint}</span><button type="button" className={styles.next} onClick={() => advanceTo(4)}>{t.next} <span aria-hidden="true">→</span></button></div>}
        </> : quote && project && <div className={styles.result}>
          <QuestionHeading>{t.estimate}</QuestionHeading><p className={styles.resultLead}>{t.estimateLead}</p>
          <div className={styles.resultNumbers}><div><span>{t.price}</span><strong>{money(quote.minimum, language)} <i>—</i> {money(quote.maximum, language)}</strong></div><div><span>{t.time}</span><strong>{quote.days[0]}–{quote.days[1]} <small>{t.days}</small></strong></div></div>
          <div className={styles.resultDetails}><h3>{t.selected}</h3><ul><li>{project.title[language]} · {quote.scope.label[language]}</li>{quote.selected.map((item) => <li key={item.id}>{item.label[language]}</li>)}{project.cms === "optional" && cms !== "none" && <li>{t.cmsLine}</li>}{materials !== "ready" && <li>{t.contentLine}</li>}{start === "no-source" && <li>{t.sourceLine}</li>}</ul></div>
          <p className={styles.disclaimer}>{t.disclaimer}</p>
          <div className={styles.resultActions}><a href="#service-contact" className={styles.next}>{t.action} ↗</a>{project.service && <Link href={`/${locale}/services/${project.service}`} className={styles.serviceLink}>{t.details} →</Link>}<button type="button" onClick={restart} className={styles.restart}>{t.restart}</button></div>
        </div>}
      </section>

      <aside className={styles.aside} aria-label={t.preview}>
        <div className={styles.mascot}><Image src="/mascot/mascot-estimate.webp" alt="" width={1254} height={1254} sizes="(max-width: 900px) 75vw, 34vw" priority={!embedded} /><span>{t.mascotNote}</span></div>
        <div className={styles.liveQuote}><span>{t.preview}</span>{quote && project ? <><strong>{project.title[language]}</strong><b>{t.from} {money(quote.minimum, language)}</b><small>{quote.days[0]}–{quote.days[1]} {t.days}</small><p>{t.chosen}: {features.length ? features.map((id) => project.features.find((item) => item.id === id)?.label[language]).filter(Boolean).join(", ") : t.noSelection}</p></> : <p>{t.previewEmpty}</p>}</div>
      </aside>
    </div>
    {step === 5 && quote && project && <ServiceLeadForm key={summary} locale={locale} compact service={project.title[language]} messageDraft={summary} title={t.formTitle} lead={t.formLead} />}
  </div>;
}
