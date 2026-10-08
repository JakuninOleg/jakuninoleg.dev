import Image from "next/image";
import Link from "next/link";
import styles from "./PartnershipFeature.module.css";

export function PartnershipFeature({ locale }: { locale: string }) {
  const ru = locale !== "en";
  return <section id="partnership" className={styles.section} aria-labelledby="partnership-heading">
    <div className={`shell ${styles.layout}`}>
      <div className={styles.visual}>
        <Image src="/partners-art/handshake-v2.webp" width={1536} height={1024} sizes="(max-width: 800px) 100vw, 48vw" alt={ru ? "Олег и дизайнер пожимают руки перед совместной работой над сайтом" : "Oleg and a designer shaking hands before working on a website together"} />
      </div>
      <div className={styles.copy}>
        <p className={styles.kicker}>{ru ? "ПАРТНЁРСТВО" : "PARTNERSHIPS"}</p>
        <h2 id="partnership-heading">{ru ? "Ваш клиент. Наш совместный проект." : "Your client. Our shared project."}</h2>
        <p className={styles.lead}>{ru ? "Вы занимаетесь дизайном, SMM или маркетингом? Подключусь к разработке сайтов для ваших клиентов — напрямую или в составе вашей команды." : "Do you work in design, social media or marketing? I can develop websites for your clients, directly or as part of your team."}</p>
        <div className={styles.formats}>
          <p><strong>{ru ? "Рекомендуйте меня" : "Refer a client"}</strong><span>{ru ? "Получайте согласованное вознаграждение за клиентов на разработку." : "Receive an agreed referral fee for website development projects."}</span></p>
          <p><strong>{ru ? "Работайте со мной" : "Work with me"}</strong><span>{ru ? "Вы отвечаете за свою часть проекта, я — за код, CMS и запуск." : "You handle your part of the project; I handle code, CMS and launch."}</span></p>
        </div>
        <Link className={styles.button} href={`/${locale}/partners`}>{ru ? "Обсудить партнёрство" : "Discuss a partnership"}<span aria-hidden="true">↗</span></Link>
        <p className={styles.note}>{ru ? "Процент, роли и порядок выплат согласуем до старта." : "We agree on fees, roles and payments before starting."}</p>
      </div>
    </div>
  </section>;
}
