"use client";

import { FormEvent, useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { site } from "@/content/site";

type Status = "idle" | "sending" | "success" | "error";
type Field = "name" | "email" | "message";

type Errors = Partial<Record<Field, string>>;

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function Contact() {
  const t = useTranslations("Contact");
  const locale = useLocale();
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<Field, boolean>>>({});
  const [values, setValues] = useState({ name: "", email: "", message: "" });
  const [honeypot, setHoneypot] = useState("");

  const messageMax = 1500;
  const messageLen = values.message.length;

  const methods = useMemo(
    () => [
      {
        key: "telegram",
        label: t("telegram"),
        value: site.telegramHandle,
        href: site.telegram,
        external: true,
      },
      {
        key: "email",
        label: t("email"),
        value: site.email,
        href: `mailto:${site.email}`,
        external: false,
      },
      {
        key: "github",
        label: t("github"),
        value: "GitHub",
        href: site.github,
        external: true,
      },
    ],
    [t],
  );

  function validate(next = values): Errors {
    const nextErrors: Errors = {};
    if (!next.name.trim()) nextErrors.name = t("errors.nameRequired");
    else if (next.name.trim().length < 2) nextErrors.name = t("errors.nameShort");

    if (!next.email.trim()) nextErrors.email = t("errors.emailRequired");
    else if (!isEmail(next.email.trim())) nextErrors.email = t("errors.emailInvalid");

    if (!next.message.trim()) nextErrors.message = t("errors.messageRequired");
    else if (next.message.trim().length < 12) nextErrors.message = t("errors.messageShort");
    else if (next.message.length > messageMax) nextErrors.message = t("errors.messageLong");

    return nextErrors;
  }

  function onChange(field: Field, value: string) {
    const next = { ...values, [field]: value };
    setValues(next);
    if (touched[field] || status === "error") {
      setErrors(validate(next));
    }
    if (status === "error" || status === "success") setStatus("idle");
  }

  function onBlur(field: Field) {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors(validate(values));
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate();
    setTouched({ name: true, email: true, message: true });
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      setStatus("idle");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name.trim(),
          email: values.email.trim(),
          message: values.message.trim(),
          locale,
          company: honeypot,
        }),
      });
      if (!res.ok) throw new Error("fail");
      setStatus("success");
      setValues({ name: "", email: "", message: "" });
      setHoneypot("");
      setTouched({});
      setErrors({});
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="section section--alt" aria-labelledby="contact-heading">
      <div className="shell contact-shell">
        <div className="contact-intro reveal-item">
          <p className="section-kicker">{t("kicker")}</p>
          <h2 id="contact-heading">{t("title")}</h2>
          <p className="section-lead">{t("lead")}</p>
        </div>

        <div className="contact-card reveal-item" style={{ ["--reveal-delay" as string]: "0.08s" }}>
          <div className="contact-panel">
            <div className="contact-direct__head">
              <div className="contact-avatar" aria-hidden>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/mascot/mascot-contact.webp"
                  alt=""
                  width={172}
                  height={172}
                  decoding="async"
                  loading="lazy"
                />
              </div>
              <div>
                <h3>{t("always")}</h3>
                <p>{t("alwaysText")}</p>
              </div>
            </div>

            <div className="contact-methods">
              {methods.map((method) => (
                <a
                  key={method.key}
                  className="contact-method"
                  href={method.href}
                  target={method.external ? "_blank" : undefined}
                  rel={method.external ? "noreferrer" : undefined}
                >
                  <span>{method.label}</span>
                  <span>{method.value}</span>
                </a>
              ))}
            </div>

            <div className="contact-panel__divider" aria-hidden />

            {status === "success" ? (
              <div className="contact-success contact-success--embedded" role="status" aria-live="polite">
                <h3>{t("successTitle")}</h3>
                <p>{t("success")}</p>
              </div>
            ) : (
              <form className="contact-form contact-form--embedded" onSubmit={onSubmit} noValidate>
                <div className="contact-form__intro">
                  <h3>{t("formTitle")}</h3>
                  <p>{t("formLead")}</p>
                </div>

                <label className="hp-field" aria-hidden="true">
                  <span>Company</span>
                  <input
                    name="company"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                  />
                </label>

                <label className={errors.name && touched.name ? "is-invalid" : undefined}>
                  <span>{t("name")}</span>
                  <input
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder={t("namePlaceholder")}
                    value={values.name}
                    onChange={(e) => onChange("name", e.target.value)}
                    onBlur={() => onBlur("name")}
                    aria-invalid={Boolean(errors.name && touched.name)}
                    aria-describedby={errors.name && touched.name ? "contact-name-error" : undefined}
                    disabled={status === "sending"}
                  />
                  {errors.name && touched.name ? (
                    <em id="contact-name-error" className="field-error">
                      {errors.name}
                    </em>
                  ) : null}
                </label>

                <label className={errors.email && touched.email ? "is-invalid" : undefined}>
                  <span>{t("emailLabel")}</span>
                  <input
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder={t("emailPlaceholder")}
                    value={values.email}
                    onChange={(e) => onChange("email", e.target.value)}
                    onBlur={() => onBlur("email")}
                    aria-invalid={Boolean(errors.email && touched.email)}
                    aria-describedby={errors.email && touched.email ? "contact-email-error" : undefined}
                    disabled={status === "sending"}
                  />
                  {errors.email && touched.email ? (
                    <em id="contact-email-error" className="field-error">
                      {errors.email}
                    </em>
                  ) : null}
                </label>

                <label className={errors.message && touched.message ? "is-invalid" : undefined}>
                  <span>
                    {t("message")}{" "}
                    <small>
                      {messageLen}/{messageMax}
                    </small>
                  </span>
                  <textarea
                    name="message"
                    rows={5}
                    maxLength={messageMax}
                    placeholder={t("messagePlaceholder")}
                    value={values.message}
                    onChange={(e) => onChange("message", e.target.value)}
                    onBlur={() => onBlur("message")}
                    aria-invalid={Boolean(errors.message && touched.message)}
                    aria-describedby={
                      errors.message && touched.message ? "contact-message-error" : undefined
                    }
                    disabled={status === "sending"}
                  />
                  {errors.message && touched.message ? (
                    <em id="contact-message-error" className="field-error">
                      {errors.message}
                    </em>
                  ) : null}
                </label>

                <button
                  type="submit"
                  className={`btn-main contact-submit${status === "sending" ? " is-sending" : ""}`}
                  disabled={status === "sending"}
                >
                  <span>{status === "sending" ? t("sending") : t("submit")}</span>
                </button>

                {status === "error" ? (
                  <p className="form-status is-err" role="alert">
                    {t("error")}
                  </p>
                ) : null}

                <p className="form-hint">{t("channelHint")}</p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
