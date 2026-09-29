"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./ServiceLeadForm.module.css";

type Props = { locale: string; service?: string; title?: string; lead?: string; compact?: boolean; messageDraft?: string };

export function ServiceLeadForm({ locale, service, title, lead, compact = false, messageDraft }: Props) {
  const isRu = locale !== "en";
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [consent, setConsent] = useState(false);
  const [company, setCompany] = useState("");

  useEffect(() => {
    const goToForm = () => {
      const target = document.getElementById("service-contact");
      if (target) window.scrollTo({ top: window.scrollY + target.getBoundingClientRect().top - 84, behavior: "smooth" });
    };
    const onClick = (event: MouseEvent) => {
      if (!(event.target instanceof Element) || !event.target.closest('a[href="#service-contact"]')) return;
      event.preventDefault();
      history.replaceState(null, "", "#service-contact");
      goToForm();
    };
    const onHash = () => { if (location.hash === "#service-contact") goToForm(); };
    document.addEventListener("click", onClick);
    window.addEventListener("hashchange", onHash);
    if (location.hash === "#service-contact") requestAnimationFrame(goToForm);
    return () => { document.removeEventListener("click", onClick); window.removeEventListener("hashchange", onHash); };
  }, []);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity() || !consent) return;
    const data = new FormData(form);
    setStatus("sending");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: String(data.get("name") ?? "").trim(),
          email: String(data.get("email") ?? "").trim(),
          message: `${isRu ? "Услуга" : "Service"}: ${service ?? String(data.get("service") ?? "").trim()}\n${String(data.get("message") ?? "").trim()}`,
          locale,
          company,
          consent,
        }),
      });
      if (!response.ok) throw new Error("send_failed");
      form.reset();
      setConsent(false);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return <section id="service-contact" className={`${styles.section}${compact ? ` ${styles.compact}` : ""}`} aria-labelledby="service-contact-title">
    <div className={`shell ${styles.layout}`}>
      <div className={styles.intro}>
        <span className={styles.kicker}>{isRu ? "СЛЕДУЮЩИЙ ШАГ" : "NEXT STEP"}</span>
        <h2 id="service-contact-title">{title ?? (isRu ? "Расскажите о задаче" : "Tell me about your project")}</h2>
        <p>{lead ?? (isRu ? "Опишите, что нужно сделать. Я отвечу лично и предложу подходящий формат работы." : "Describe what you need. I’ll reply personally with a suitable approach.")}</p>
        {!compact && <div className={styles.mascot} aria-hidden="true"><Image src="/service-art/service-brief-scene.webp" width={1254} height={1254} alt="" /><span>{isRu ? "ВАША ИДЕЯ — МОЙ ПЛАН РАБОТЫ" : "YOUR IDEA — MY PLAN"}</span></div>}
      </div>
      <div className={styles.tablet}>
        <div className={styles.tabletBar}><span>OJ / BRIEF</span><span aria-hidden="true">✦</span></div>
        {status === "success" ? <div className={styles.success} role="status"><strong>{isRu ? "Заявка отправлена" : "Message sent"}</strong><p>{isRu ? "Я отвечу на указанный адрес." : "I’ll reply to the email you provided."}</p></div> :
          <form onSubmit={submit} className={styles.form}>
            <label className={styles.honeypot} aria-hidden="true">Company<input name="company" tabIndex={-1} autoComplete="off" value={company} onChange={(event) => setCompany(event.target.value)} /></label>
            {!service && <label>{isRu ? "Какая услуга нужна" : "What do you need"}<select name="service" defaultValue="" required><option value="" disabled>{isRu ? "Выберите направление" : "Select a service"}</option>{(isRu ? ["Лендинг", "Сайт-каталог", "Интернет-магазин", "Веб-приложение", "Дизайн и редизайн", "SEO и позиционирование", "CMS для сайта", "AI-решение", "Пока не знаю"] : ["Landing page", "Product catalog website", "Online store", "Web application", "Design and redesign", "SEO and positioning", "Website CMS", "AI solution", "Not sure yet"]).map((item) => <option key={item} value={item}>{item}</option>)}</select></label>}
            <label>{isRu ? "Ваше имя" : "Your name"}<input name="name" autoComplete="name" minLength={2} maxLength={120} required placeholder={isRu ? "Как к вам обращаться" : "How should I address you"} /></label>
            <label>{isRu ? "Электронная почта" : "Email"}<input name="email" type="email" autoComplete="email" maxLength={160} required placeholder="name@example.com" /></label>
            <label>{isRu ? "О задаче" : "About the project"}<textarea name="message" minLength={12} maxLength={1400} required rows={5} defaultValue={messageDraft} placeholder={service ? (isRu ? `Что важно для проекта «${service}»?` : `What matters for your ${service} project?`) : (isRu ? "Что хотите создать или изменить?" : "What would you like to build or change?")} /></label>
            <label className={styles.consent}><input type="checkbox" checked={consent} onChange={(event) => setConsent(event.target.checked)} required /><span>{isRu ? "Согласен на обработку данных по " : "I agree to the "}<Link href={`/${locale}/legal/privacy`}>{isRu ? "политике конфиденциальности" : "privacy policy"}</Link>{isRu ? " и " : " and "}<Link href={`/${locale}/legal/consent`}>{isRu ? "условиям согласия" : "consent terms"}</Link>.</span></label>
            <button disabled={status === "sending"} type="submit">{status === "sending" ? (isRu ? "Отправляю…" : "Sending…") : (isRu ? "Отправить заявку ↗" : "Send enquiry ↗")}</button>
            {status === "error" && <p role="alert" className={styles.error}>{isRu ? "Не удалось отправить. Попробуйте ещё раз." : "Could not send. Please try again."}</p>}
          </form>}
      </div>
    </div>
  </section>;
}
