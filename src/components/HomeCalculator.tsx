import { ProjectQuiz } from "@/components/ProjectQuiz";
import styles from "./HomeCalculator.module.css";

export function HomeCalculator({ locale }: { locale: string }) {
  const ru = locale !== "en";

  return <section id="calculator" className={styles.section} aria-labelledby="home-calculator-title">
    <div className={`shell ${styles.intro}`}>
      <div>
        <p className="section-kicker">{ru ? "КАЛЬКУЛЯТОР СТОИМОСТИ" : "PROJECT COST CALCULATOR"}</p>
        <h2 id="home-calculator-title">{ru ? <>Что будем <em>создавать?</em></> : <>What shall we <em>build?</em></>}</h2>
      </div>
      <p>{ru ? "Выберите направление, масштаб и нужные функции. Через пять коротких шагов получите ориентир по цене и срокам — и сможете прислать мне задачу." : "Choose a direction, scope and features. Five short steps give you a price and timeline guide, then you can send me the brief."}</p>
    </div>
    <ProjectQuiz locale={locale} embedded />
  </section>;
}
