import { getLocale, getTranslations } from "next-intl/server";
import { site } from "@/content/site";

export async function Footer() {
  const t = await getTranslations("Footer");
  const locale = await getLocale();

  return (
    <footer className="footer">
      <div className="shell footer-inner">
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
        </nav>
      </div>
    </footer>
  );
}
