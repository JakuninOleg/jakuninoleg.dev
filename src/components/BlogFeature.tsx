import Image from "next/image";
import Link from "next/link";
import { getLocale } from "next-intl/server";
import { blogCopy, catalogBlogPath, catalogPostCopy, catalogPostDate } from "@/content/blog";
import styles from "@/app/[locale]/blog/blog.module.css";

export async function BlogFeature() {
  const locale = await getLocale();
  const c = blogCopy[locale === "en" ? "en" : "ru"];
  const post = catalogPostCopy[locale === "en" ? "en" : "ru"];

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
        <Link href={catalogBlogPath(locale)} className={styles.homePost}>
          <span>{post.tag} · <time dateTime={catalogPostDate}>{post.date}</time></span>
          <strong>{post.title}</strong>
          <span className={styles.homePostAction}>{c.read} ↗</span>
        </Link>
      </div>
    </section>
  );
}
