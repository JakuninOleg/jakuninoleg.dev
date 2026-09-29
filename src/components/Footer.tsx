import { getLocale, getTranslations } from "next-intl/server";
import { site } from "@/content/site";
import { CookieSettingsButton } from "@/components/CookieConsent";
import { privacyBlogPath } from "@/content/blog";

export async function Footer() {
  const t = await getTranslations("Footer");
  const n = await getTranslations("Nav");
  const locale = await getLocale();

  return (
    <footer className="footer">
      <div className="shell footer-inner">
        <nav className="footer-site" aria-label={t("siteLabel")}>
          <a href={`/${locale}/services`}>{n("services")}</a>
          <a href={`/${locale}/work`}>{n("work")}</a>
          <a href={`/${locale}#about`}>{n("about")}</a>
          <a href={`/${locale}/oj-cms`}>{n("solutions")}</a>
          <a href={`/${locale}/blog`}>{n("blog")}</a>
          <a href={`/${locale}/calculator`}>{locale === "en" ? "Cost calculator" : "Калькулятор"}</a>
        </nav>
        <div className="footer-row">
          <p>
            © {new Date().getFullYear()} {site.name}
          </p>
          <div className="footer-links footer-links--social">
            <a href={site.telegram} target="_blank" rel="noreferrer">
              Telegram
            </a>
            <a href={site.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a href={`mailto:${site.email}`}>Email</a>
            <a href={`/${locale}#top`}>{t("top")}</a>
          </div>
        </div>
        <nav className="footer-legal" aria-label={t("legalLabel")}>
          <a href={`/${locale}/legal/privacy`}>{t("privacy")}</a>
          <a href={`/${locale}/legal/consent`}>{t("consent")}</a>
          <a href={`/${locale}/legal/cookies`}>{t("cookies")}</a>
          <a href={privacyBlogPath(locale)}>{locale === "en" ? "152-FZ website guide" : "152‑ФЗ для сайта"}</a>
          <CookieSettingsButton locale={locale} />
        </nav>
      </div>
    </footer>
  );
}
