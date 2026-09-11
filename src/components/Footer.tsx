import { getTranslations } from "next-intl/server";
import { site } from "@/content/site";

export async function Footer() {
  const t = await getTranslations("Footer");

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
