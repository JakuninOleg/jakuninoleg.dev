import Image from "next/image";
import Link from "next/link";
import { CaseServiceBridge } from "./CaseServiceBridge";
import { ServiceLeadForm } from "./ServiceLeadForm";
import { BlogContextLink } from "./BlogContextLink";
import styles from "./ProductCases.module.css";

type Language = "ru" | "en";
type Project = "okhana" | "tesla-explorer" | "oj-cms";

const copy = {
  ru: {
    common: { back: "Все работы", visit: "Открыть проект", discuss: "Обсудить похожую задачу", next: "Следующий проект", screen: "Фрагмент рабочего интерфейса" },
    okhana: {
      label: "01 / СЕМЕЙНЫЙ ВЕБ-ПРОДУКТ", title: "Охана", lead: "Семейные дела — в одном месте. Продукт, который помнит важное, помогает договориться и бережно обращается с личным.", scope: "ПРОДУКТ / ИНТЕРФЕЙС / AI-АССИСТЕНТ / ПРИВАТНОСТЬ", heroNote: "СЕМЬЯ. ВМЕСТЕ. ВСЕГДА.",
      contextLabel: "01 / ЗАДАЧА", contextTitle: "Домашние дела не должны жить в одном чужом календаре", context: "Список покупок, день рождения, поручение ребёнку, идея подарка — всё это часто разбросано по чатам и памяти одного человека. Я спроектировал Охану как общее семейное пространство: здесь можно говорить с ассистентом обычным языком, а дела и заметки становятся частью понятной системы.",
      ideaLabel: "02 / ИДЕЯ", ideaTitle: "Не ещё один чат. Место, где разговор превращается в действие.", ideaText: "Вместо формы с десятками полей — короткая просьба. Ассистент помогает создать поручение, сохранить заметку или добавить событие через инструменты приложения. Рядом — реальные разделы задач, заметок и календаря: семья видит результат, может его проверить и изменить без разговора с AI.",
      detailLabel: "03 / ИНТЕРФЕЙС", detailTitle: "Три слоя одного семейного дня", detailIntro: "Я собрал продукт вокруг реальных повседневных сценариев, а не вокруг списка функций.",
      features: [
        { n: "01", title: "Семейное пространство", text: "Участники, роли и общие разделы дают семье одну точку входа. Можно пригласить близкого человека и распределить доступ." },
        { n: "02", title: "Поручения и даты", text: "Задачи можно назначать, отмечать как увиденные и выполненные. Календарь и напоминания помогают не упускать важное." },
        { n: "03", title: "Разговор с Оханой", text: "Ассистент работает с заметками, задачами и событиями через инструменты продукта. Это продолжение интерфейса, а не чат поверх него." },
      ],
      principleLabel: "04 / ПРИВАТНОСТЬ", principleTitle: "Личное не попадает в ответ по ошибке", principleText: "У заметок есть уровни видимости и исключения для конкретных участников. Запрос к базе проверяет семейную принадлежность и доступ ещё до того, как данные попадут в контекст модели. Поэтому приватность задаётся логикой продукта, а не просьбой к ассистенту «не рассказывать».",
      flow: ["Участник задаёт вопрос", "Поиск проверяет доступ", "Ассистент видит разрешённое"],
      outcomeLabel: "05 / РЕЗУЛЬТАТ", outcomeTitle: "Полноценный семейный хаб", outcomeText: "Работают приглашения и роли, заметки, поручения, календарь, уведомления, голосовой ввод и диалог с действиями. Интерфейс доступен на русском и английском и адаптирован для телефона. Охана выросла из идеи «помнить за всех» в продукт, с которым семье проще действовать вместе.",
      nextTitle: "Tesla Explorer", nextText: "Из семейного пространства — в персональные поездки.",
    },
    "tesla-explorer": {
      label: "02 / ВЕБ-ПРИЛОЖЕНИЕ ДЛЯ ПОЕЗДОК", title: "Tesla Explorer", lead: "Поездка начинается не с маршрута на карте, а с вопроса: куда хочется поехать и сколько времени есть?", scope: "ПРОДУКТ / РЕДИЗАЙН / КАРТА / AI-ПЛАНИРОВАНИЕ", heroNote: "МАРШРУТ, КОТОРЫЙ ХОЧЕТСЯ ПРОЕХАТЬ.",
      contextLabel: "01 / ЗАДАЧА", contextTitle: "Сложное планирование — простой старт", context: "Водителю нужно учитывать заряд, время, интересы и точки по пути. Если заставить его вручную собрать все параметры, поездка превращается в таблицу. Я выстроил сценарий так, чтобы начать можно было с короткой идеи, а детали уточнять уже на готовом предложении.",
      ideaLabel: "02 / РЕДИЗАЙН", ideaTitle: "Сначала ощущение дороги. Затем точный инструмент.", ideaText: "На главной — дорога, воздух и один ясный призыв. В кабинете — карта, сценарии поездок и короткий запрос для планировщика. Новый визуальный язык ведёт человека от идеи путешествия к рабочему инструменту.",
      detailLabel: "03 / СЦЕНАРИЙ", detailTitle: "От идеи до маршрута в три шага", detailIntro: "Сложность зарядки и маршрутизации спрятана за последовательностью решений, понятных человеку.",
      features: [
        { n: "01", title: "Профиль поездки", text: "В кабинете сохраняются дом, работа, модель автомобиля и интересы. Перед новой поездкой задаются отправная точка, заряд и доступное время." },
        { n: "02", title: "Предложение от AI", text: "Модель учитывает профиль, заряд и время, а также оценки и пожелания по прошлым маршрутам. План можно одобрить, изменить или отклонить — решение остаётся за водителем." },
        { n: "03", title: "Карта и кинопросмотр", text: "Mapbox строит дорожный маршрут, показывает точки и рельеф. Three.js выводит 3D-модель автомобиля в кинопросмотре. После поездки можно оценить маршрут и сохранить впечатления." },
      ],
      principleLabel: "04 / ВНУТРИ ПРОДУКТА", principleTitle: "Карта, память поездок и места по пути", principleText: "Для карты я выбрал Mapbox GL JS: его маршрутизация, спутниковый стиль и собственные слои позволили собрать один сценарий от планирования до 3D-просмотра. Three.js загружает модель Tesla и показывает её поверх карты. AI предлагает остановки с учётом запроса, заряда, времени, прежних оценок и заметок. Для выбранного места сервис ищет YouTube-ролик именно о нём: проверяет совпадение названия и отсеивает посторонние видео. Ролик помогает оценить остановку до поездки, а не подменяет сведения о ней. Водитель подтверждает маршрут сам.",
      flow: ["Расскажите о поездке", "Уточните план", "Откройте карту и поезжайте"],
      outcomeLabel: "05 / РЕЗУЛЬТАТ", outcomeTitle: "Маршруты, которые становятся точнее после поездки", outcomeText: "Я соединил редизайн с личным кабинетом, Mapbox, Three.js и AI-планированием. После поездки водитель оценивает маршрут и записывает впечатления: эти данные попадают в контекст следующего запроса, чтобы сервис предлагал более подходящие места. Интерфейс работает на русском и английском и адаптирован для телефона.",
      nextTitle: "OJ CMS", nextText: "Дальше — продукт для тех, кто управляет сайтами.",
    },
    "oj-cms": {
      label: "03 / АВТОРСКИЙ ПРОДУКТ", title: "OJ CMS", lead: "Мощная система внутри. Спокойный интерфейс снаружи. Я разработал CMS, в которой редактировать сайт удобно каждый день.", scope: "ПРОДУКТ / UX / PAYLOAD / РЕДАКТОРСКИЙ СЦЕНАРИЙ", heroNote: "СОЗДАВАТЬ. ПРОВЕРЯТЬ. ПУБЛИКОВАТЬ.",
      contextLabel: "01 / ЗАДАЧА", contextTitle: "Сайт запускается. Работа с контентом только начинается.", context: "После релиза бизнесу нужно менять страницы, публиковать новости и находить изображения без помощи разработчика. Обычная админка показывает коллекции и системные поля; редактору нужен понятный рабочий процесс. Поэтому я построил OJ CMS вокруг действий человека, который поддерживает сайт.",
      ideaLabel: "02 / ПОДХОД", ideaTitle: "Сильный движок не обязан выглядеть сложным", ideaText: "В основе — Payload. Поверх него я разработал собственный визуальный язык и сценарии: обзор, страницы, новости, медиа, настройки и пользователи. Интерфейс спокойно объясняет состояние публикации и следующий шаг, не обрушивая на редактора технические детали.",
      detailLabel: "03 / РАБОЧИЕ ЭКРАНЫ", detailTitle: "Не макет панели, а настоящий редактор", detailIntro: "На этих экранах — рабочая демонстрация OJ CMS: обзор, редактирование страницы и медиатека.",
      features: [
        { n: "01", title: "Обзор", text: "Быстрый вход в страницы, новости, медиа и пользователей. Последние изменения и активность видны на главном экране." },
        { n: "02", title: "Редактор", text: "Страница сохраняется как черновик, проверяется и публикуется отдельно. Несохранённые изменения не исчезают незаметно." },
        { n: "03", title: "Медиатека", text: "Изображения собраны с названиями и связями. Система предупреждает, если файл уже используется на сайте." },
      ],
      principleLabel: "04 / ЛОГИКА", principleTitle: "У каждого изменения понятный статус", principleText: "Редактор видит разницу между черновиком, опубликованной версией и изменениями после публикации. Роли разделяют работу с контентом и управление доступом. В результате CMS не мешает команде — она помогает безопасно пройти путь от правки до живой страницы.",
      flow: ["Изменить страницу", "Сохранить черновик", "Проверить и опубликовать"],
      outcomeLabel: "05 / РЕЗУЛЬТАТ", outcomeTitle: "Собственный инструмент для сайтов клиентов", outcomeText: "OJ CMS уже можно открыть и пройти обычный путь редактора. Структура разделов, роли и внешний вид адаптируются под проект. Для меня это продолжение работы над сайтом: клиент получает не только готовую страницу, но и понятный способ развивать её дальше.",
      nextTitle: "Охана", nextText: "Дальше — семейный продукт с AI-ассистентом и приватными данными.",
    },
  },
  en: {
    common: { back: "All work", visit: "Open project", discuss: "Discuss a similar project", next: "Next project", screen: "A view of the working interface" },
    okhana: {
      label: "01 / FAMILY WEB PRODUCT", title: "Okhana", lead: "Family life in one place. A product that remembers what matters, helps everyone coordinate, and keeps private things private.", scope: "PRODUCT / INTERFACE / AI ASSISTANT / PRIVACY", heroNote: "FAMILY. TOGETHER. ALWAYS.",
      contextLabel: "01 / CHALLENGE", contextTitle: "Family life should not live in one person's memory", context: "Shopping lists, birthdays, tasks, and gift ideas get scattered across chats and one person's head. I designed Okhana as a shared family space: ask the assistant in everyday language, then see tasks and notes in a clear system.",
      ideaLabel: "02 / IDEA", ideaTitle: "More than another chat: a conversation becomes an action.", ideaText: "Instead of a form with ten fields, start with a short request. The assistant uses the app's tools to create a task, save a note, or add an event. Real task, note and calendar sections let the family review and edit the result without AI.",
      detailLabel: "03 / INTERFACE", detailTitle: "Three layers of a family day", detailIntro: "The product is shaped around everyday situations, not a feature list.",
      features: [
        { n: "01", title: "Family space", text: "Members, roles, and shared sections give the family one place to start. Invite someone and choose what they can access." },
        { n: "02", title: "Tasks and dates", text: "Assign tasks and mark them seen or done. The calendar and reminders keep important dates close." },
        { n: "03", title: "Talk to Okhana", text: "The assistant works with notes, tasks, and events through product tools. It is part of the interface, not a chatbot bolted on top." },
      ],
      principleLabel: "04 / PRIVACY", principleTitle: "Private information stays out of the wrong answer", principleText: "Notes have visibility rules and exclusions for individual members. A database query checks family membership and access before anything reaches the model. Privacy is product logic, not an instruction asking AI to keep a secret.",
      flow: ["A member asks", "Search checks access", "AI sees permitted data"],
      outcomeLabel: "05 / RESULT", outcomeTitle: "A complete family hub", outcomeText: "Invitations and roles, notes, tasks, calendar, notifications, voice input, and an action-taking chat work together. The interface supports Russian and English and adapts to phones. Okhana grew from an idea about remembering for everyone into a product for acting together.",
      nextTitle: "Tesla Explorer", nextText: "From a family space to personal road trips.",
    },
    "tesla-explorer": {
      label: "02 / TRAVEL WEB APP", title: "Tesla Explorer", lead: "A trip starts before the map: where do you want to go, and how much time do you have?", scope: "PRODUCT / REDESIGN / MAP / AI PLANNING", heroNote: "A ROUTE WORTH DRIVING.",
      contextLabel: "01 / CHALLENGE", contextTitle: "Complex planning, simple beginning", context: "A driver needs to account for battery, time, interests, and stops. Making them enter every parameter turns a trip into a spreadsheet. I shaped a flow that begins with a short idea and refines the details once there is a proposed plan.",
      ideaLabel: "02 / REDESIGN", ideaTitle: "First, the feeling of the road. Then, a precise tool.", ideaText: "The home page opens with the road, clear typography and one action. The workspace follows with a map, trip scenarios and a concise request for the planner. The visual system carries the driver from an idea into the working product.",
      detailLabel: "03 / JOURNEY", detailTitle: "From idea to route in three steps", detailIntro: "The complexities of charging and routing sit behind decisions a person can understand.",
      features: [
        { n: "01", title: "Trip profile", text: "The workspace stores home, work, car model, and interests. For a new trip, set the starting point, battery, and available time." },
        { n: "02", title: "AI suggestion", text: "The model considers the driver profile, battery, time and ratings and preferences from past routes. Approve, adjust or decline the proposal: the driver remains in control." },
        { n: "03", title: "Map and route cinema", text: "Mapbox draws the road and places in satellite view. Three.js renders the car in the 3D route cinema. After the trip, rate the route and record impressions." },
      ],
      principleLabel: "04 / INSIDE THE PRODUCT", principleTitle: "A map, trip memory and places worth visiting", principleText: "I chose Mapbox GL JS for directions, satellite terrain and custom layers, bringing planning and 3D exploration into one flow. Three.js loads a Tesla model over the map. AI suggests stops using the request, battery, time and ratings and notes from earlier drives. For a selected place, the app looks for a YouTube video about that specific location, checks name relevance and filters unrelated clips. The video helps the driver assess a stop; the driver still decides whether to approve the route.",
      flow: ["Describe the trip", "Refine the plan", "Open the map and drive"],
      outcomeLabel: "05 / RESULT", outcomeTitle: "Routes that learn from the last drive", outcomeText: "I connected the redesign to a personal workspace, Mapbox, Three.js and AI planning. After a drive, the driver rates the route and records impressions. Those details inform the next request so the proposed stops fit better. The interface supports English and Russian and adapts to phones.",
      nextTitle: "OJ CMS", nextText: "Next: a product for people who manage websites.",
    },
    "oj-cms": {
      label: "03 / ORIGINAL PRODUCT", title: "OJ CMS", lead: "A powerful system inside. A calm interface outside. I built a CMS designed for everyday editing.", scope: "PRODUCT / UX / PAYLOAD / EDITORIAL WORKFLOW", heroNote: "CREATE. REVIEW. PUBLISH.",
      contextLabel: "01 / CHALLENGE", contextTitle: "A site launches. Content work is just beginning.", context: "After launch, a business needs to change pages, publish news, and find images without a developer. A typical admin shows collections and system fields; an editor needs a clear workflow. I built OJ CMS around the person who keeps the site current.",
      ideaLabel: "02 / APPROACH", ideaTitle: "A strong engine does not have to feel complicated", ideaText: "Payload provides the foundation. I designed a visual language and workflows around it: overview, pages, news, media, settings, and users. The interface explains publication status and the next action without exposing every technical detail.",
      detailLabel: "03 / WORKING SCREENS", detailTitle: "A real editor, not an admin mockup", detailIntro: "These screens show the working OJ CMS demo: overview, page editor, and media library.",
      features: [
        { n: "01", title: "Overview", text: "Quick access to pages, news, media, and users. Recent changes and activity appear on the home screen." },
        { n: "02", title: "Editor", text: "Save a draft, review it, then publish. Unsaved changes do not silently disappear." },
        { n: "03", title: "Media library", text: "Images have names and usage links. The system warns when a file is already in use." },
      ],
      principleLabel: "04 / LOGIC", principleTitle: "Every change has a clear status", principleText: "Editors can tell a draft from the published version and from changes made since publication. Roles separate content editing from access management. The CMS supports the path from edit to live page without getting in the team's way.",
      flow: ["Edit a page", "Save a draft", "Review and publish"],
      outcomeLabel: "05 / RESULT", outcomeTitle: "My own tool for client websites", outcomeText: "You can open OJ CMS today and follow a normal editorial workflow. Sections, roles, and visual identity can be adapted to a project. For me, it extends the website delivery: the client gets both a finished site and a clear way to keep it growing.",
      nextTitle: "Okhana", nextText: "Next: a private family product with an AI assistant.",
    },
  },
} as const;

function OkhanaGlyph({ kind }: { kind: "note" | "calendar" | "dates" | "more" | "task" | "mic" | "send" }) {
  const icons = {
    note: <><path d="M7 3h8l4 4v14H5V3h2Z" /><path d="M14 3v5h5M8 12h6M8 16h8" /></>,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M8 3v4M16 3v4M3 10h18" /></>,
    dates: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M8 3v4M16 3v4M3 10h18M8 15h3" /></>,
    more: <><circle cx="5" cy="12" r="1" /><circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /></>,
    task: <><path d="m4 7 2 2 3-3M11 7h9M4 15l2 2 3-3M11 15h9" /></>,
    mic: <><rect x="9" y="3" width="6" height="12" rx="3" /><path d="M5 11a7 7 0 0 0 14 0M12 18v3M9 21h6" /></>,
    send: <><path d="m22 2-7 20-4-9-9-4Z" /><path d="M22 2 11 13" /></>,
  };
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{icons[kind]}</svg>;
}

function OkhanaPreview({ language, detail = false }: { language: Language; detail?: boolean }) {
  const ru = language === "ru";
  const messages = detail
    ? [
      { role: "user", text: ru ? "Добавь напоминание проверить планы на завтра." : "Remind me to check tomorrow's plans." },
      { role: "assistant", text: ru ? "Готово. Создала поручение и добавила напоминание в семейный план." : "Done. I created a task and added a reminder to the family plan." },
      { role: "user", text: ru ? "Покажи, что запланировано." : "Show me what's planned." },
      { role: "assistant", text: ru ? "На завтра запланировано одно дело. Открыть календарь?" : "There is one item planned for tomorrow. Open the calendar?" },
    ]
    : [
      { role: "user", text: ru ? "Напомни проверить список покупок вечером." : "Remind me to check the shopping list tonight." },
      { role: "assistant", text: ru ? "Готово. Добавила поручение в общий список." : "Done. I added a task to the shared list." },
      { role: "user", text: ru ? "Спасибо!" : "Thanks!" },
    ];
  const tools = [
    { kind: "note" as const, label: ru ? "Заметки" : "Notes" },
    { kind: "calendar" as const, label: ru ? "Календарь" : "Calendar" },
    { kind: "dates" as const, label: ru ? "Даты" : "Dates" },
    { kind: "more" as const, label: ru ? "Ещё" : "More" },
  ];
  const participants = [
    { image: "member-woman-adult.webp", name: ru ? "Участник 01" : "Member 01", role: ru ? "Взрослый" : "Adult" },
    { image: "member-man-adult.webp", name: ru ? "Участник 02" : "Member 02", role: ru ? "Взрослый" : "Adult" },
  ];
  return <figure className={detail ? styles.okDetailCapture : styles.okHeroCapture}>
    <div className={styles.okDemo} role="img" aria-label={ru ? "Демонстрационный интерфейс Оханы: участники, срочные поручения и диалог с ассистентом" : "Okhana interface demo: family members, urgent tasks and assistant chat"}>
      <header className={styles.okDemoBar}><div className={styles.okDemoBrand}><Image src="/projects/okhana/okhana-mark.webp" alt="" width={30} height={30} /><strong>{ru ? "Охана" : "Okhana"}</strong></div><div className={styles.okDemoControls}><span>RU</span><span>EN</span><span aria-hidden="true">◐</span><b>{ru ? "Выйти" : "Sign out"}</b></div></header>
      <div className={styles.okDemoWorkspace}>
        <aside className={styles.okDemoSidebar}><div className={styles.okDemoFamily}><strong>{ru ? "Семейное пространство" : "Family space"}</strong><span>{ru ? "2 участника" : "2 members"}</span></div><div className={styles.okDemoTools}>{tools.map((tool) => <div key={tool.kind}><OkhanaGlyph kind={tool.kind} /><span>{tool.label}</span></div>)}</div><small>{ru ? "УЧАСТНИКИ" : "MEMBERS"}</small><div className={styles.okDemoMembers}>{participants.map((person) => <div className={styles.okDemoMember} key={person.name}><Image src={`/projects/okhana/${person.image}`} alt="" width={38} height={38} /><span><strong>{person.name}</strong><small>{person.role}</small></span></div>)}</div></aside>
        <div className={styles.okDemoMain}><section className={styles.okDemoTasks}><div className={styles.okDemoTaskHead}><OkhanaGlyph kind="task" /><div><strong>{ru ? "Ваши поручения" : "Your tasks"}</strong><span>{ru ? "Сначала срочные (сегодня и завтра)" : "Urgent first (today and tomorrow)"}</span></div><b>{ru ? "Поручения" : "Tasks"}</b></div><div className={styles.okDemoTask}><strong>{ru ? "Проверить список покупок" : "Check the shopping list"}</strong><small>{ru ? "Сегодня · Для семьи · Открыто" : "Today · Shared · Open"}</small></div><small className={styles.okDemoDue}>{ru ? "Ближайшее дело: проверить список покупок" : "Next up: check the shopping list"}</small></section>
          <section className={styles.okDemoChat}><div className={styles.okDemoChatHead}><Image src="/projects/okhana/okhana-mark.webp" alt="" width={30} height={30} /><div><strong>{ru ? "Охана" : "Okhana"}</strong><small>{ru ? "Ассистент готова помочь" : "Assistant is ready to help"}</small></div></div><div className={styles.okDemoMessages}>{messages.map((message, index) => <div key={`${message.role}-${index}`} className={message.role === "user" ? styles.okDemoUserMessage : styles.okDemoAssistantMessage}>{message.role === "assistant" && <Image src="/projects/okhana/okhana-mark.webp" alt="" width={26} height={26} />}<p>{message.text}</p></div>)}</div><div className={styles.okDemoQuickActions}>{(ru ? ["Создать поручение", "Какие планы?", "Добавить дату"] : ["Create a task", "What's planned?", "Add a date"]).map((label) => <span key={label}>{label}</span>)}</div><div className={styles.okDemoComposer}><OkhanaGlyph kind="mic" /><span>{ru ? "Напишите сообщение" : "Write a message"}</span><b><OkhanaGlyph kind="send" /></b></div></section>
        </div>
      </div>
    </div>
  </figure>;
}
function TeslaPreview({ language, hero = false }: { language: Language; hero?: boolean }) {
  const ru = language === "ru";
  return <div className={styles.teslaPreview} role="img" aria-label={ru ? "Экран Tesla Explorer: карта, запрос поездки и прошлые маршруты" : "Tesla Explorer screen with a map, trip request and route history"}>
    <aside><b>T <span>TESLA<br />EXPLORER</span></b><strong>{ru ? "Главная" : "Home"}</strong><span>{ru ? "Маршруты" : "Routes"}</span><span>{ru ? "История" : "History"}</span><span>{ru ? "Профиль авто" : "Car profile"}</span></aside>
    <div className={styles.teslaWorkspace}><div className={styles.teslaTop}><span>{ru ? "Куда отправимся?" : "Where to next?"}</span><b>Model Y · 78%</b></div><div className={styles.teslaMap}><Image className={styles.teslaMapImage} src="/projects/tesla-explorer/road.webp" alt="" fill sizes="(max-width: 700px) 100vw, 45vw" loading={hero ? "eager" : "lazy"} fetchPriority={hero ? "high" : "auto"} /><div className={styles.teslaMapOverlay}><strong>{ru ? "Куда отправимся?" : "Where to next?"}</strong><p>{ru ? "Опишите, как хотите провести вечер — подберём интересные места и построим маршрут." : "Describe your evening — discover places and build a route."}</p><div>{ru ? "Ужин у воды" : "Dinner by the water"} <span>{ru ? "Природа" : "Nature"}</span></div><small>{ru ? "Предложи маршрут на вечер…" : "Plan an evening trip…"} ↗</small></div><div className={styles.teslaMapPin}>⌖ <span>Austin, TX</span></div></div><div className={styles.teslaSummary}><span>Model Y <small>78% · 6 h</small></span><span>{ru ? "Дом" : "Home"} <small>Austin, TX</small></span><span>{ru ? "Работа" : "Work"} <small>Downtown</small></span></div><div className={styles.teslaHistory}><strong>{ru ? "Популярные сценарии" : "Popular scenarios"}</strong><div><span>{ru ? "Ужин и прогулка" : "Dinner and a walk"}</span><span>{ru ? "Природа рядом" : "Nearby nature"}</span><span>{ru ? "С детьми" : "With kids"}</span></div></div></div>
  </div>;
}

function HeroArt({ project, language }: { project: Project; language: Language }) {
  if (project === "okhana") return <div className={styles.okHeroArt}><OkhanaPreview language={language} /></div>;
  if (project === "tesla-explorer") return <div className={styles.teslaHeroArt}><TeslaPreview language={language} hero /></div>;
  return <div className={styles.cmsHeroArt}><div className={styles.cmsScreen}><Image src="/projects/oj-cms/dashboard.webp" alt={language === "ru" ? "Рабочий обзор OJ CMS" : "OJ CMS dashboard"} width={1536} height={1024} sizes="(max-width: 760px) 100vw, 55vw" priority /></div><div className={styles.cmsHeroPhone}><Image src="/projects/oj-cms/editor-mobile-viewport.webp" alt="" width={375} height={760} sizes="95px" /></div></div>;
}

export function ProductCase({ locale, project }: { locale: string; project: Project }) {
  const language: Language = locale === "en" ? "en" : "ru";
  const c = copy[language][project];
  const common = copy[language].common;
  const url = project === "okhana" ? "https://okhanahome.com" : project === "tesla-explorer" ? "https://tesla-explorer.vercel.app" : "https://oj-cms.vercel.app/admin";
  const next = project === "okhana" ? "tesla-explorer" : project === "tesla-explorer" ? "oj-cms" : "okhana";
  return <article className={`${styles.case} ${styles[project === "tesla-explorer" ? "tesla" : project === "oj-cms" ? "cms" : "okhana"]}`}>
    <section className={styles.hero} aria-labelledby="product-case-title"><div className={`shell ${styles.heroInner}`}><Link className={styles.back} href={`/${locale}/work`}>← {common.back}</Link><div className={styles.heroGrid}><div className={styles.heroCopy}><p className={styles.kicker}>{c.label}</p><h1 id="product-case-title">{c.title}</h1><p className={styles.heroLead}>{c.lead}</p><div className={styles.actions}><a href={url} target="_blank" rel="noreferrer">{common.visit} ↗</a><a href="#product-context">{language === "ru" ? "Смотреть кейс" : "Explore the case"} ↓</a></div></div><HeroArt project={project} language={language} /></div><div className={styles.heroFoot}><span>{c.scope}</span><span>{c.heroNote}</span></div></div></section>

    <section className={styles.context} id="product-context"><div className={`shell ${styles.split}`}><div><span className={styles.chapter}>{c.contextLabel}</span><h2>{c.contextTitle}</h2></div><p>{c.context}</p></div></section>

    <section className={styles.idea}><div className={`shell ${styles.ideaGrid}`}><div className={styles.ideaCopy}><span className={styles.chapter}>{c.ideaLabel}</span><h2>{c.ideaTitle}</h2><p>{c.ideaText}</p></div><div className={styles.ideaArt}>{project === "okhana" ? <><div className={styles.okNote}><span>✦ OKHANA</span><strong>{language === "ru" ? "Помнить важное — вместе" : "Remember together"}</strong><i>♡</i></div><Image src="/projects/okhana/gift.webp" alt="" fill sizes="(max-width: 760px) 100vw, 40vw" /></> : project === "tesla-explorer" ? <><Image src="/projects/tesla-explorer/bonnell.webp" alt="" fill sizes="(max-width: 760px) 100vw, 40vw" /><span className={styles.roadNote}>ROAD / EXPERIENCE / PRODUCT</span></> : <><Image src="/projects/oj-cms/editor.webp" alt={language === "ru" ? "Редактор страницы OJ CMS" : "OJ CMS page editor"} width={1280} height={800} sizes="(max-width: 760px) 100vw, 40vw" /><span className={styles.cmsStamp}>DRAFT → PUBLISH</span></>}</div></div></section>

    <section className={styles.details}><div className="shell"><div className={styles.sectionIntro}><div><span className={styles.chapter}>{c.detailLabel}</span><h2>{c.detailTitle}</h2></div><p>{c.detailIntro}</p></div><div className={styles.featureGrid}>{c.features.map((feature) => <div key={feature.n} className={styles.feature}><span>{feature.n}</span><h3>{feature.title}</h3><p>{feature.text}</p></div>)}</div><div className={styles.demoWrap}>{project === "okhana" ? <OkhanaPreview language={language} detail /> : project === "tesla-explorer" ? <TeslaPreview language={language} /> : <div className={styles.cmsGallery}><figure><Image src="/projects/oj-cms/dashboard.webp" alt={language === "ru" ? "Обзор OJ CMS" : "OJ CMS overview"} width={1536} height={1024} sizes="(max-width: 850px) 100vw, 52vw" /><figcaption>01 / {c.features[0].title}</figcaption></figure><figure><Image src="/projects/oj-cms/media.webp" alt={language === "ru" ? "Медиатека OJ CMS" : "OJ CMS media library"} width={1280} height={800} sizes="(max-width: 850px) 100vw, 30vw" /><figcaption>02 / {c.features[2].title}</figcaption></figure></div>}<span className={styles.demoCaption}>{project === "oj-cms" ? common.screen : project === "okhana" ? (language === "ru" ? "ДЕМОНСТРАЦИОННЫЙ ИНТЕРФЕЙС / ОХАНА" : "OKHANA / DEMO DASHBOARD") : language === "ru" ? "Экран приложения" : "Application screen"}</span></div></div></section>

    <section className={styles.principle}><div className={`shell ${styles.principleGrid}`}><div><span className={styles.chapter}>{c.principleLabel}</span><h2>{c.principleTitle}</h2><p>{c.principleText}</p></div><div className={styles.flow}>{c.flow.map((step, i) => <div key={step}><span>0{i + 1}</span><strong>{step}</strong></div>)}</div></div></section>

    <section className={styles.outcome}>
      <div className={`shell ${styles.outcomeGrid}`}>
        <div><span className={styles.chapter}>{c.outcomeLabel}</span><h2>{c.outcomeTitle}</h2><p>{c.outcomeText}</p><div className={styles.actions}><a href={url} target="_blank" rel="noreferrer">{common.visit} ↗</a><a href="#service-contact">{common.discuss} ↗</a></div></div>
        <div className={styles.outcomeVisual}>
          {project === "oj-cms" ? <Image src="/projects/oj-cms/editor.webp" alt={language === "ru" ? "Редактор OJ CMS" : "OJ CMS editor"} fill sizes="(max-width: 760px) 100vw, 38vw" /> : <Image className={styles.outcomeMascot} src={project === "okhana" ? "/projects/okhana/mascot-planning.webp" : "/projects/tesla-explorer/mascot-route.webp"} alt={language === "ru" ? "Иллюстрация: Олег помогает довести задачу до результата" : "Illustration: Oleg brings the project to life"} width={1000} height={750} sizes="(max-width: 760px) 80vw, 32vw" />}
        </div>
      </div>
    </section>
    {project === "oj-cms" && <CaseServiceBridge locale={locale} route="cms" />}
    {project === "oj-cms" && <BlogContextLink locale={locale} context="cms" />}
    <ServiceLeadForm locale={locale} service={c.title} title={language === "ru" ? `Обсудим проект, похожий на ${c.title}?` : `Discuss a project like ${c.title}`} lead={language === "ru" ? "Расскажите о задаче. Я предложу дизайн, архитектуру и первый план работ." : "Tell me about your idea. I will suggest a design direction, architecture and first steps."} />
    <Link href={`/${locale}/work/${next}`} className={styles.next}><span>{common.next} / {c.nextText}</span><strong>{c.nextTitle} ↗</strong></Link>
  </article>;
}
