import Image from "next/image";
import Link from "next/link";
import { serviceArt } from "@/content/service-art";
import styles from "./CaseServiceBridge.module.css";

const copy = {
  "landing-pages": {
    ru: { kicker: "ПОХОЖАЯ ЗАДАЧА", title: "Нужен лендинг со своим характером?", text: "Продумать идею, дизайн и запустить страницу под вашу задачу." },
    en: { kicker: "RELATED SERVICE", title: "Need a landing page with character?", text: "Shape the idea, design it and launch a page built for your goal." },
  },
  "product-catalogues": {
    ru: { kicker: "ПОХОЖАЯ ЗАДАЧА", title: "Нужен каталог, в котором легко выбрать?", text: "Собрать структуру, карточки товаров, фильтры и сценарий заявки." },
    en: { kicker: "RELATED SERVICE", title: "Need a catalog that's easy to use?", text: "Structure products, filters, product pages and the enquiry journey." },
  },
  cms: {
    ru: { kicker: "ПОХОЖАЯ ЗАДАЧА", title: "Нужна удобная CMS для вашего сайта?", text: "Настроить управление контентом под редакторов и задачи бизнеса." },
    en: { kicker: "RELATED SERVICE", title: "Need a practical CMS for your site?", text: "Shape content management around editors and business needs." },
  },
} as const;

type BridgeRoute = keyof typeof copy;

export function CaseServiceBridge({ locale, route }: { locale: string; route: BridgeRoute }) {
  const language = locale === "en" ? "en" : "ru";
  const item = copy[route][language];
  const art = serviceArt[route];

  return (
    <aside className={styles.wrap}>
      <Link href={`/${locale}/services/${route}`} className={`shell ${styles.bridge}`}>
        <div className={styles.copy}>
          <span className={styles.kicker}>{item.kicker}</span>
          <h2>{item.title}</h2>
          <p>{item.text}</p>
          <span className={styles.action}>{language === "ru" ? "Посмотреть услугу" : "Explore the service"} <span aria-hidden="true">↗</span></span>
        </div>
        <div className={styles.art}><Image src={art.src} alt={art.alt[language]} fill sizes="(max-width: 700px) 100vw, 42vw" /></div>
      </Link>
    </aside>
  );
}
