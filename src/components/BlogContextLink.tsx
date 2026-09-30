import Image from "next/image";
import Link from "next/link";
import { blogPath, privacyBlogPath } from "@/content/blog";
import styles from "./BlogContextLink.module.css";

type Context = "landing" | "catalog" | "store" | "cms" | "seo" | "case" | "privacy";

const copy = {
  ru: {
    landing: ["САЙТ БЕЗ КОНСТРУКТОРА", "Зачем лендингу свой дизайн и код?", "Разбираю, когда разработка без Tilda и WordPress даёт больше свободы и помогает избежать лишних доработок."],
    catalog: ["ВЫБОР ПЛАТФОРМЫ", "Почему каталог не обязан жить на Битриксе", "О стоимости владения, собственном интерфейсе и CMS, с которой сможет работать ваша команда."],
    store: ["ТЕХНОЛОГИИ И БЮДЖЕТ", "Своя витрина или готовый шаблон?", "Сравниваю индивидуальную разработку с Tilda, WordPress и Битриксом по задачам и дальнейшим расходам."],
    cms: ["УПРАВЛЕНИЕ КОНТЕНТОМ", "Сайт без WordPress — но с удобной CMS", "Показываю, как отделить дизайн сайта от редактирования страниц и связать авторский интерфейс OJ CMS с Payload."],
    seo: ["СТРУКТУРА САЙТА", "Платформа не продвинет сайт за вас", "Разбираю, как связаны архитектура, контент, скорость и выбор технологии для нового сайта."],
    case: ["ИЗ ПРАКТИКИ", "Почему эти сайты сделаны без шаблона", "На примерах проектов рассказываю, когда собственный интерфейс и подходящая CMS полезнее готовой темы."],
    privacy: ["ПЕРЕД ЗАПУСКОМ", "Что происходит с данными после отправки формы?", "Чек-лист по 152‑ФЗ для сайта: согласие, политика, уведомление и маршрут заявки."],
  },
  en: {
    landing: ["BEYOND BUILDERS", "Why design and code a landing page?", "When a bespoke build offers more freedom than adapting a Tilda or WordPress template."],
    catalog: ["PLATFORM CHOICE", "A product catalog need not start with Bitrix", "A practical look at total cost, custom interfaces and a CMS your team can use."],
    store: ["TECHNOLOGY AND COST", "A custom storefront or a template?", "Compare a tailored build with Tilda, WordPress and Bitrix over its working life."],
    cms: ["CONTENT MANAGEMENT", "No WordPress, yet still easy to edit", "How a custom OJ CMS editing interface can work with Payload without limiting the public site design."],
    seo: ["SITE STRUCTURE", "A platform will not rank your site for you", "How architecture, content, speed and technology work together."],
    case: ["FROM PRACTICE", "Why these websites were built without templates", "Real projects show when a custom interface and focused CMS make more sense."],
    privacy: ["BEFORE LAUNCH", "Where does a visitor's data go?", "A practical 152-FZ checklist for forms, consent, policy and data storage."],
  },
} as const;

export function BlogContextLink({
  locale,
  context,
  showArt = false,
}: {
  locale: string;
  context: Context;
  showArt?: boolean;
}) {
  const isEn = locale === "en";
  const [kicker, title, lead] = copy[isEn ? "en" : "ru"][context];
  const withEditorial = context === "cms" && showArt;

  return (
    <aside
      className={`${styles.wrap}${withEditorial ? ` ${styles.wrapEditorial}` : ""}`}
      aria-label={isEn ? "Related reading" : "Статья по теме"}
    >
      <div className={`shell ${styles.inner}${withEditorial ? ` ${styles.innerEditorial}` : ""}`}>
        <div>
          <p>{kicker} / {isEn ? "FROM THE BLOG" : "ИЗ БЛОГА"}</p>
          <h2>{title}</h2>
          <span>{lead}</span>
        </div>
        {withEditorial && (
          <div className={styles.art}>
            <Image
              src="/service-art/cms-editorial.webp"
              alt={isEn ? "Mascot arranging content cards in a custom website editor" : "Маскот собирает страницу из карточек контента в редакторе"}
              width={1672}
              height={941}
              sizes="(max-width: 760px) 88vw, min(42vw, 28rem)"
              loading="lazy"
            />
          </div>
        )}
        <Link href={context === "privacy" ? privacyBlogPath(locale) : blogPath(locale)}>
          {context === "privacy"
            ? isEn ? "Read the checklist" : "Читать чек-лист"
            : isEn ? "Read the platform comparison" : "Читать сравнение платформ"}{" "}
          <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </aside>
  );
}
