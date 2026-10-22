import Image from "next/image";
import Link from "next/link";
import { getLocale } from "next-intl/server";
import { blogCopy } from "@/content/blog";
import { cmsBlogPath, cmsPostCopy, cmsPostDate } from "@/content/cms-post";
import styles from "@/app/[locale]/blog/blog.module.css";
import { okhanaPostPath, okhanaPostCopy, okhanaPostDate } from "@/content/okhana-post";

export async function BlogFeature() {
  const locale = await getLocale();
  const c = blogCopy[locale === "en" ? "en" : "ru"];
  const post = locale === "ru" ? { ...okhanaPostCopy, date: "23 октября 2026" } : cmsPostCopy.en;

  return (
    <section className={styles.homeSection} aria-labelledby="home-blog-title">
      <div className={`shell ${styles.homeGrid}`}>
        <div className={styles.homeCopy}>
          <p className={styles.eyebrow}>06 / {c.indexKicker}</p>
          <h2 id="home-blog-title">{locale === "en" ? "I write about what I build." : "Пишу о том, что сам делаю."}</h2>
          <p>{locale === "en" ? "How to choose a platform, build a distinct identity and make a site useful after launch." : "Как выбирать платформу, находить свой визуальный язык и делать сайт полезным после запуска."}</p>
          <Link className={styles.textLink} href={`/${locale}/blog`}>{c.all} <span aria-hidden>↗</span></Link>
        </div>
        <div className={styles.homeMascot} aria-hidden="true">
          <div className={styles.paperOne} /><div className={styles.paperTwo} />
          <Image src="/blog/mascot-blogger.webp" alt="" width={1254} height={1254} sizes="(max-width: 760px) 80vw, 38vw" />
        </div>
        <Link href={locale === "ru" ? okhanaPostPath : cmsBlogPath(locale)} className={styles.homePost}>
          <span>{post.tag} · <time dateTime={locale === "ru" ? okhanaPostDate : cmsPostDate}>{post.date}</time></span>
          <strong>{post.title}</strong>
          <span className={styles.homePostAction}>{c.read} ↗</span>
        </Link>
      </div>
    </section>
  );
}
