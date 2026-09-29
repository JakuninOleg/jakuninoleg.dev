import Link from "next/link";
import styles from "./Breadcrumbs.module.css";

type Crumb = { label: string; href?: string };

export function Breadcrumbs({ locale, items }: { locale: string; items: Crumb[] }) {
  const root = process.env.NEXT_PUBLIC_SITE_URL ?? "https://jakuninoleg.dev";
  const crumbs = [{ label: locale === "en" ? "Home" : "Главная", href: `/${locale}` }, ...items];
  const structured = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      ...(item.href ? { item: new URL(item.href, root).toString() } : {}),
    })),
  };

  return <>
    <nav className={styles.breadcrumbs} aria-label={locale === "en" ? "Breadcrumbs" : "Хлебные крошки"}>
      <ol>{crumbs.map((item, index) => <li key={`${index}-${item.label}`}>
        {index > 0 && <span aria-hidden="true">/</span>}
        {item.href ? <Link href={item.href}>{item.label}</Link> : <span aria-current="page">{item.label}</span>}
      </li>)}</ol>
    </nav>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structured).replace(/</g, "\\u003c") }} />
  </>;
}
