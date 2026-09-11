import { useTranslations } from "next-intl";
import { site } from "@/content/site";

export function Footer() {
  const t = useTranslations("Footer");

  return (
    <footer className="footer">
      <div className="shell footer-inner">
        <p>
          © {new Date().getFullYear()} {site.name}
        </p>
        <div className="footer-links">
          <a href={site.telegram} target="_blank" rel="noreferrer">
            Telegram
          </a>
          <a href={site.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a href={`mailto:${site.email}`}>Email</a>
          <a href="#top">{t("top")}</a>
        </div>
      </div>
    </footer>
  );
}
