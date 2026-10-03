import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { setRequestLocale } from "next-intl/server";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { blogCopy, blogPath, catalogBlogPath, catalogPostCopy, catalogPostDate, firstPostDate, privacyBlogPath, privacyPostCopy, privacyPostDate } from "@/content/blog";
import styles from "./blog.module.css";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const c = blogCopy[locale === "en" ? "en" : "ru"];
  return {
    title: c.indexTitle,
    description: c.indexLead,
    alternates: { canonical: `/${locale}/blog`, languages: { ru: "/ru/blog", en: "/en/blog" } },
    openGraph: { title: c.indexTitle, description: c.indexLead, url: `/${locale}/blog`, images: ["/blog/mascot-blogger.webp"] },
  };
}

export default async function BlogPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const c = blogCopy[locale === "en" ? "en" : "ru"];
  const p = privacyPostCopy[locale === "en" ? "en" : "ru"];
  const catalog = catalogPostCopy[locale === "en" ? "en" : "ru"];
  return <><a href="#main" className="skip-link">{locale === "en" ? "Skip to content" : "К основному содержимому"}</a><Header /><main id="main" className={styles.root}>
    <div className={`shell ${styles.indexHero}`}>
      <div><Breadcrumbs locale={locale} items={[{ label: locale === "en" ? "Blog" : "Блог" }]} /><p className={styles.eyebrow}>01 / {c.indexKicker}</p><h1>{c.indexTitle}</h1><p className={styles.indexLead}>{c.indexLead}</p></div>
      <div className={styles.indexPortrait}><Image src="/blog/mascot-blogger.webp" alt={locale === "en" ? "Oleg writing at his desk" : "Олег пишет статью за столом"} width={1254} height={1254} priority sizes="(max-width: 760px) 85vw, 40vw" /></div>
    </div>
    <div className={`shell ${styles.indexList}`}>
      <p className={styles.eyebrow}>{locale === "en" ? "Published" : "Опубликовано"} / 003</p>
      <Link href={catalogBlogPath(locale)} className={styles.indexCard}>
        <div className={styles.indexCardNumber}>01<span aria-hidden>↗</span></div>
        <div><p className={styles.cardMeta}>{catalog.tag} · <time dateTime={catalogPostDate}>{catalog.date}</time></p><h2>{catalog.title}</h2><p>{catalog.lead}</p><span className={styles.textLink}>{c.read} ↗</span></div>
        <div className={styles.catalogCardArt}><Image src="/blog/catalog-equipment-flow.webp" alt="" width={1672} height={941} sizes="(max-width: 760px) 88vw, 260px" /></div>
      </Link>
      <Link href={blogPath(locale)} className={styles.indexCard}>
        <div className={styles.indexCardNumber}>02<span aria-hidden>↗</span></div>
        <div><p className={styles.cardMeta}>{c.firstTag} · <time dateTime={firstPostDate}>{c.date}</time></p><h2>{c.firstTitle}</h2><p>{c.firstLead}</p><span className={styles.textLink}>{c.read} ↗</span></div>
        <div className={styles.indexCardArt} aria-hidden="true"><span>CMS</span><span>→</span><span>{locale === "en" ? "YOUR IDEA" : "ВАША ИДЕЯ"}</span></div>
      </Link>
      <Link href={privacyBlogPath(locale)} className={styles.indexCard}>
        <div className={styles.indexCardNumber}>03<span aria-hidden>↗</span></div>
        <div><p className={styles.cardMeta}>{p.tag} · <time dateTime={privacyPostDate}>{p.date}</time></p><h2>{p.title}</h2><p>{p.lead}</p><span className={styles.textLink}>{c.read} ↗</span></div>
        <div className={styles.privacyCardArt}><Image src="/blog/mascot-152-fz.webp" alt="" width={1254} height={1254} sizes="260px" /></div>
      </Link>
    </div>
  </main><Footer /></>;
}
