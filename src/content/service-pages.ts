import type { ServiceRoute } from "./service-routes";

type Detail = { title: string; text: string };
export type ServicePageCopy = {
  seoTitle: string;
  seoDescription: string;
  label: string;
  title: string;
  lead: string;
  note: string;
  image?: string;
  imageAlt?: string;
  exampleLabel: string;
  exampleTitle: string;
  exampleText: string;
  exampleHref?: string;
  exampleCta?: string;
  includedTitle: string;
  included: Detail[];
  processTitle: string;
  process: Detail[];
  faq: Detail[];
  finalTitle: string;
  finalText: string;
  price?: string;
  priceNote?: string;
};

export const servicePages: Record<"ru" | "en", Partial<Record<ServiceRoute, ServicePageCopy>>> = {
  ru: {
    "landing-pages": {
      seoTitle: "Лендинг без Tilda и WordPress под ключ — от 11 900 ₽",
      seoDescription: "Разработка лендинга без Tilda и WordPress: дизайн, адаптив, форма, аналитика и SEO-основа. Стартовый одностраничный сайт от 11 900 ₽.",
      label: "01 / САЙТЫ И ЛЕНДИНГИ", title: "Лендинг, который понятно объясняет ваше предложение", lead: "Помогу сформулировать ценность, собрать структуру, разработать выразительный адаптивный дизайн и запустить страницу с работающей формой. Для небольших задач есть быстрый стартовый формат.",
      note: "Свой дизайн и чистая разработка вместо ограничений Tilda и шаблонов WordPress.", image: "/projects/vne-shablona/desktop-actual.webp", imageAlt: "Реальный первый экран авторского лендинга ВНЕ ШАБЛОНА",
      exampleLabel: "РЕАЛЬНАЯ РАБОТА", exampleTitle: "ВНЕ ШАБЛОНА — лендинг с собственным характером", exampleText: "Комиксный визуальный язык, ясный сценарий и адаптивный интерфейс. В кейсе показываю устройство страницы и детали реализации.", exampleHref: "/work/vne-shablona", exampleCta: "Смотреть кейс",
      includedTitle: "Что можно получить на запуске", included: [
        { title: "Структура и тексты", text: "Определяем аудиторию, предложение, порядок блоков и одно главное действие. Готовые материалы клиента помогают сократить бюджет." },
        { title: "Дизайн и адаптив", text: "Делаю дизайн под бренд и аккуратную мобильную версию, а не перенос десктопного макета в узкий экран." },
        { title: "Форма и аналитика", text: "Настраиваю получение заявок, защиту формы, базовые события аналитики и техническую основу для индексации." },
      ], processTitle: "Сильный сайт без студийной сметы", process: [
        { title: "Старт от 11 900 ₽", text: "Стартовая одностраничная разработка: на основе ваших материалов, с адаптивом, одной формой и авторской визуальной подачей без сложных иллюстраций." },
        { title: "Объём фиксируем заранее", text: "Дополнительные страницы, иллюстрации, сложная анимация, CMS и интеграции оцениваются отдельно до начала работы." },
        { title: "Проверяем перед запуском", text: "Мобильные экраны, кликабельность, отправка формы, метаданные и основные показатели скорости." },
      ], faq: [
        { title: "Почему не Tilda или WordPress?", text: "Шаблоны и плагины заставляют подстраивать идею под платформу. Я строю страницу вокруг вашего предложения: собственный дизайн, точный сценарий, чистый код и свобода развития." },
        { title: "Что входит в 11 900 ₽?", text: "Согласованная структура, адаптивная верстка, одна форма, базовые метаданные и запуск. Нужны описание предложения, контакты и изображения. CMS, оригинальная графика и дополнительные интеграции оцениваются отдельно." },
      ], finalTitle: "Расскажите, какой сайт нужен", finalText: "Предложу быстрый формат или более глубокую разработку — с прозрачным составом и стоимостью.", price: "от 11 900 ₽", priceNote: "Стартовый лендинг при готовых материалах",
    },
    "online-stores": {
      seoTitle: "Разработка интернет-магазина на Medusa.js от 49 000 ₽ — Олег Якунин",
      seoDescription: "Разработка интернет-магазина на Medusa.js: индивидуальная витрина, каталог, корзина, ЮKassa, Т-Касса, Robokassa, доставка через ApiShip, поиск, SEO и управление заказами.",
      label: "03 / ИНТЕРНЕТ-МАГАЗИНЫ", title: "Магазин по вашим правилам", lead: "Medusa.js даёт мощную торговую основу, а индивидуальная витрина — свободу в дизайне и сценарии покупки. Соберу каталог, корзину, оплату и управление заказами вокруг вашего бизнеса, а не вокруг готовой темы.",
      note: "Индивидуальная витрина, торговая система и интеграции — под ваш способ продажи.", exampleLabel: "КОНЦЕПТ ВИТРИНЫ", exampleTitle: "Магазин, в котором приятно выбирать", exampleText: "Не набор пустых карточек, а цельная витрина: выразительный каталог, реальные фотографии товаров, понятная корзина и заметные действия. Показан концепт для fashion-бренда — ваш магазин получит собственный визуальный язык.",
      includedTitle: "Из чего складывается магазин", included: [
        { title: "Каталог и поиск", text: "Категории, характеристики, варианты товара, фильтры и страницы, понятные покупателю и поисковым системам." },
        { title: "Корзина и заказ", text: "Проверяем цены, наличие, доставку, оплату, письма и возврат пользователя после платежа." },
        { title: "Управление и интеграции", text: "Админ-панель, роли, обмен данными, аналитика и подключения под реальные процессы. Состав фиксируем в смете." },
      ], processTitle: "Как запускается разработка", process: [
        { title: "Аудит задачи", text: "Выясняем число товаров, варианты цен, способы доставки, склад, 1С и обязательные платежные методы." },
        { title: "Прототип покупки", text: "Прорабатываю путь от категории до подтверждения заказа и показываю, что будет типовым, а что индивидуальным." },
        { title: "Сборка и проверка", text: "Разрабатываю витрину и серверную часть, тестирую платежи в тестовом контуре и обработку ошибок." },
      ], faq: [
        { title: "Можно подключить ЮKassa и Т-Банк?", text: "Да. Подключу ЮKassa или Т-Кассу, настрою нужные способы оплаты, чеки и возвраты. Покупателю важен удобный работающий платёж, а не устройство плагина." },
        { title: "Чем Medusa сильнее WooCommerce и 1С-Битрикс?", text: "Medusa отделяет торговую систему от витрины. Не нужно строить интерфейс вокруг темы WordPress или тяжёлого шаблона Битрикс: можно сделать собственный дизайн, быстрый путь к покупке и интеграции под ваши процессы." },
      ], finalTitle: "Соберём магазин без шаблонных ограничений", finalText: "Пришлите ассортимент, способы оплаты и доставки, пример магазина и требования к учёту. Предложу состав работ и стоимость по вашей задаче.", price: "от 49 000 ₽", priceNote: "Витрина с каталогом, корзиной и оформлением заказа; оплату и доставку подберём под задачу.",
    },
    "web-applications": {
      seoTitle: "Разработка веб-приложений и клиентских порталов — Олег Якунин",
      seoDescription: "Личные кабинеты, клиентские порталы и веб-сервисы: интерфейс, роли, API, данные и интеграции. Проектирование и разработка под задачи бизнеса.",
      label: "04 / ВЕБ-ПРИЛОЖЕНИЯ", title: "Сервис, в котором удобно работать каждый день", lead: "Разрабатываю интерфейсы с личными кабинетами, ролями, данными и интеграциями. Своя архитектура позволяет воплотить процессы бизнеса без подгонки под возможности готового плагина.", note: "От прототипа ключевого сценария до работающего продукта.",
      image: "/projects/okhana.webp", imageAlt: "Интерфейс веб-приложения Okhana", exampleLabel: "РЕАЛЬНАЯ РАБОТА", exampleTitle: "Okhana — приложение с собственными сценариями", exampleText: "Пример продукта, где интерфейс, данные и действия пользователей связаны в единую систему.", exampleHref: "/work/okhana", exampleCta: "Смотреть работу",
      includedTitle: "Что входит в разработку", included: [
        { title: "Пользовательские сценарии", text: "Описываю роли, состояния, ошибки и действия, которые человек должен выполнить без помощи инструкции." },
        { title: "Интерфейс и сервер", text: "Собираю адаптивный интерфейс, API, модель данных, авторизацию и права доступа под согласованную задачу." },
        { title: "Интеграции и запуск", text: "Подключаю внешние сервисы, проверяю безопасность основных потоков и готовлю продукт к эксплуатации." },
      ], processTitle: "От идеи к первой полезной версии", process: [
        { title: "Сценарий", text: "Выбираем один ценный путь пользователя и определяем, что ему нужно для результата." },
        { title: "Прототип", text: "Проверяем структуру экранов и данные до полной разработки." },
        { title: "Итерации", text: "Выпускаем рабочую основу, затем расширяем роли, отчёты и автоматизацию по приоритету." },
      ], faq: [{ title: "Можно начать с MVP?", text: "Да. Сначала ограничим первую версию одним главным сценарием и отдельно запланируем развитие." }], finalTitle: "Обсудим рабочий сценарий", finalText: "Опишите, кто будет пользоваться сервисом и что сейчас приходится делать вручную.",
    },
    "design-redesign": {
      seoTitle: "Дизайн и редизайн сайта под задачи бизнеса — Олег Якунин",
      seoDescription: "Дизайн-концепция и редизайн сайта: позиционирование, структура, визуальная система, адаптивные макеты и реализация. Без шаблонного оформления.",
      label: "05 / ДИЗАЙН И РЕДИЗАЙН", title: "Новый дизайн, у которого есть задача", lead: "Помогаю понять, что в текущем сайте мешает объяснять продукт и получать обращения. Создаю визуальную систему с характером вашего бренда, а не переставляю блоки готовой темы.", note: "Могу работать с новым проектом или бережно перестроить действующий сайт.",
      image: "/projects/aokemz-v2.webp", imageAlt: "Главная страница обновлённого сайта КЭМЗ", exampleLabel: "РЕАЛЬНАЯ РАБОТА", exampleTitle: "КЭМЗ — промышленный сайт с новым визуальным языком", exampleText: "В кейсе показаны контекст, структура, интерфейс и результат редизайна промышленного сайта.", exampleHref: "/work/aokemz", exampleCta: "Смотреть кейс",
      includedTitle: "Что меняется вместе с визуалом", included: [
        { title: "Смысл и структура", text: "Пересобираю подачу предложения, навигацию и путь к заявке до выбора цвета и анимации." },
        { title: "Система компонентов", text: "Определяю типографику, сетку, элементы интерфейса, изображения и правила поведения на разных экранах." },
        { title: "Работающий результат", text: "Дизайн довожу до адаптивной верстки; проверяю читаемость, контраст и удобство форм." },
      ], processTitle: "Как принимаем дизайн-решения", process: [
        { title: "Аудит", text: "Разбираю текущие страницы, аудиторию, визуальные материалы и сильные стороны бренда." },
        { title: "Концепция", text: "Показываю направление на ключевом экране и согласовываю его до размножения на все страницы." },
        { title: "Система", text: "Собираю компоненты и адаптивные состояния, чтобы сайт выглядел цельно после запуска." },
      ], faq: [{ title: "Нужно полностью переделывать сайт?", text: "Не обязательно. Иногда достаточно обновить структуру, первый экран и ключевые страницы, сохранив работающие части." }], finalTitle: "Покажите текущий сайт", finalText: "Отмечу, что стоит сохранить, а что поможет улучшить первое впечатление и путь клиента.",
    },
    "seo-positioning": {
      seoTitle: "SEO-структура сайта и позиционирование бренда — Олег Якунин",
      seoDescription: "Поисковая структура, семантическое ядро, технический SEO-аудит, страницы услуг и контент-план для сайта. Работа с намерениями пользователей, а не списком ключей.",
      label: "06 / SEO И ПОЗИЦИОНИРОВАНИЕ", title: "Страницы под запросы людей, а не под список слов", lead: "Исследую, как люди ищут ваши услуги, какие страницы уже видны в поиске и чего не хватает сайту. Выстраиваю структуру, тексты и техническую основу так, чтобы сайт мог расширяться под новые запросы без переделки шаблона.", note: "Позиционирование, структура и техническое SEO работают как одна система.",
      exampleLabel: "СХЕМА РАБОТЫ", exampleTitle: "От поискового намерения к нужной странице", exampleText: "Не сваливаю все запросы на главную. Развожу услугу, кейс и статью по разным задачам: выбрать исполнителя, увидеть работу, разобраться в подходе.",
      includedTitle: "Что делаю для поисковой основы", included: [
        { title: "Семантика и SERP", text: "Собираю темы и формулировки, смотрю выдачу Яндекса и Google, группирую по намерению и целевой странице." },
        { title: "Архитектура и тексты", text: "Определяю роли главной, услуг, кейсов и статей. Пишу ясные title, description и структуру без переспама." },
        { title: "Техническая проверка", text: "Проверяю индексацию, canonical, sitemap, скорость, мобильную версию и внутренние ссылки." },
      ], processTitle: "План продвижения без магии", process: [
        { title: "База", text: "Подключаем и анализируем Search Console и Яндекс Вебмастер, фиксируем текущие страницы и запросы." },
        { title: "Приоритет", text: "Выбираем страницы по коммерческому потенциалу и доказательствам, а не только по частотности." },
        { title: "Измерение", text: "После публикации смотрим показы, клики, позиции и качество заявок; корректируем страницы." },
      ], faq: [{ title: "Когда сайт окажется в топе?", text: "Срок и позиция не гарантируются: на них влияют конкуренция, история домена, качество предложения и изменения поиска." }], finalTitle: "Разберём ваш поисковый спрос", finalText: "Пришлите адрес сайта и основные услуги. Найдём страницы, которые стоит улучшить или создать в первую очередь.",
    },
    cms: {
      seoTitle: "Альтернатива WordPress и Битрикс — OJ CMS для вашего сайта",
      seoDescription: "Своя CMS вместо громоздкой панели WordPress или Битрикс: страницы, роли, медиа, предпросмотр и удобная редактура для команды.",
      label: "07 / CMS И КОНТЕНТ", title: "Контент меняется без очереди к разработчику", lead: "Настраиваю понятную систему управления для редакторов: страницы, медиа, роли и предпросмотр. OJ CMS даёт ровно те инструменты, которые нужны команде, без громоздкой панели WordPress или Битрикс.", note: "Редактор управляет контентом, а сайт сохраняет собственный дизайн и архитектуру.",
      image: "/projects/oj-cms-wide.webp", imageAlt: "Интерфейс OJ CMS для редактирования контента", exampleLabel: "СОБСТВЕННЫЙ ПРОДУКТ", exampleTitle: "OJ CMS — редактура без лишней сложности", exampleText: "Показываю панель, с которой можно управлять страницами, медиа и публикацией. Для каждого проекта адаптирую структуру данных и доступы.", exampleHref: "/work/oj-cms", exampleCta: "Смотреть OJ CMS",
      includedTitle: "Что получит команда", included: [
        { title: "Поля под ваш контент", text: "Карточки, разделы, SEO-поля и связи между материалами без хаотичных универсальных блоков." },
        { title: "Роли и предпросмотр", text: "Редактор видит результат до публикации, а права соответствуют реальным задачам сотрудников." },
        { title: "Передача и поддержка", text: "Проверяю типовые операции и объясняю, как добавлять и обновлять контент самостоятельно." },
      ], processTitle: "Как проектируется CMS", process: [
        { title: "Контентная модель", text: "Выписываю типы страниц, обязательные поля и связи." },
        { title: "Редакторский путь", text: "Проверяю создание, изменение, предпросмотр и публикацию на реальных примерах." },
        { title: "Интеграция", text: "Связываю CMS с сайтом и проверяю, как обновления попадают на публичные страницы." },
      ], faq: [{ title: "Это альтернатива WordPress и Битрикс?", text: "Да. Вместо универсальной панели с лишними разделами команда получает редактор под свои страницы и процессы. При проектировании отдельно определим, какие данные, роли и интеграции нужны именно вам." }], finalTitle: "Покажите, что команда редактирует", finalText: "Предложу структуру CMS и объясню, какие изменения сможет делать редактор без разработчика.",
    },
    "ai-solutions": {
      seoTitle: "ИИ-ассистенты и RAG-поиск для сайта и бизнеса — Олег Якунин",
      seoDescription: "Интеграция ИИ-ассистента, RAG-поиска по документам и автоматизации в веб-продукт. Сценарий, источники, интерфейс и контроль качества ответов.",
      label: "08 / ИИ И ПОИСК ПО ДАННЫМ", title: "ИИ там, где он сокращает ручную работу", lead: "Встраиваю поиск по вашим материалам, помощника и автоматизацию прямо в рабочий сценарий. Это продуктовая функция с вашими данными и интерфейсом, а не универсальный чат-виджет, приклеенный к сайту.", note: "Свой сценарий, свои данные, понятный результат для пользователя.",
      image: "/projects/okhana.webp", imageAlt: "Интерфейс приложения Okhana с ИИ-функциями", exampleLabel: "РЕАЛЬНАЯ РАБОТА", exampleTitle: "Okhana — ИИ как часть интерфейса", exampleText: "Веб-продукт показывает, как помощник может быть встроен в пользовательский сценарий, а не висеть отдельным виджетом без контекста.", exampleHref: "/work/okhana", exampleCta: "Смотреть работу",
      includedTitle: "Из чего состоит полезная интеграция", included: [
        { title: "Сценарий", text: "Определяем пользователя, частые вопросы, ограничения и момент, когда нужен человек." },
        { title: "Данные и поиск", text: "Подключаем разрешённые документы, готовим обновление источников и поиск релевантных фрагментов." },
        { title: "Контроль", text: "Проверяем ответы на тестовом наборе, добавляем ссылки на источники и обработку неопределённости." },
      ], processTitle: "Начинаем с проверяемого пилота", process: [
        { title: "Выбор задачи", text: "Берём узкую повторяющуюся проблему, где есть данные и критерий полезного ответа." },
        { title: "Прототип", text: "Строю цепочку поиска и ответа на ограниченном наборе материалов." },
        { title: "Проверка", text: "Сравниваем ответы с источниками и решаем, где нужна доработка или ручной контроль." },
      ], faq: [{ title: "Можно ли обещать безошибочные ответы?", text: "Нет. Качество зависит от источников и задачи. Поэтому пилот включает тестовые вопросы, ссылки на материалы и сценарий передачи человеку." }], finalTitle: "Найдём задачу для ИИ", finalText: "Опишите повторяющиеся вопросы или документы, по которым команда тратит время на поиск.",
    },
  },
  en: {
    "landing-pages": {
      seoTitle: "Landing page and website development — Oleg Jakunin", seoDescription: "Custom landing pages and company websites with structure, design, responsive development, forms, analytics and SEO foundations.", label: "01 / WEBSITES", title: "A landing page that explains your offer clearly", lead: "I help shape the message, page structure and visual language, then build a responsive site with a working contact form.", note: "Custom development without a Tilda or WordPress template.", image: "/projects/vne-shablona/desktop-actual.webp", imageAlt: "The VNE SHABLONA illustrated landing page", exampleLabel: "REAL PROJECT", exampleTitle: "VNE SHABLONA — a landing page with its own character", exampleText: "An illustrated visual language, clear journey and responsive interface.", exampleHref: "/work/vne-shablona", exampleCta: "View the case", includedTitle: "What the launch can include", included: [{title:"Structure and copy",text:"Audience, message, content order and one clear action."},{title:"Design and mobile",text:"A brand-specific interface designed for every screen."},{title:"Forms and analytics",text:"Lead delivery, basic events and technical search foundations."}], processTitle: "A clear scope keeps the budget lean", process: [{title:"Starter scope",text:"One page with an agreed structure, supplied content, one form and no custom integrations."},{title:"Agree additions",text:"Extra pages, illustration, CMS and integrations are estimated in advance."},{title:"Check before launch",text:"Mobile layout, forms, metadata and core speed metrics."}], faq:[{title:"Why not Tilda or WordPress?",text:"A custom page gives the brand and customer journey room to grow without being assembled from builder blocks or a WordPress theme."}], finalTitle:"Tell me about your site", finalText:"I will suggest a lean starting point or a deeper build with a clear scope.", price:"from ₽11,900", priceNote:"Starter page with supplied materials",
    },
    "online-stores": {
      seoTitle:"Custom online store development with Medusa from ₽49,000 — Oleg Jakunin", seoDescription:"Custom storefronts with Medusa: catalog, cart, checkout, payments, product management and integrations. Payments, shipping, search and SEO without a template storefront.", label:"03 / ONLINE STORES", title:"An online store built around the way you sell", lead:"I design the catalog, product pages, cart and checkout around the customer. Medusa separates commerce logic from the storefront, leaving room for a distinct interface.", note:"A custom storefront, commerce engine and integrations shaped around the way you sell.", exampleLabel:"STOREFRONT CONCEPT", exampleTitle:"A store people enjoy browsing", exampleText:"A coherent storefront with real product imagery, a clear cart and visible actions. This fashion concept is an example; your store will have its own visual language.", includedTitle:"What makes up the store", included:[{title:"Catalog and search",text:"Categories, variants, filters and useful product pages."},{title:"Cart and checkout",text:"Prices, availability, shipping, payment and error states."},{title:"Operations",text:"Admin, roles, analytics and integrations specified in the estimate."}], processTitle:"How we build it", process:[{title:"Requirements",text:"Products, pricing, shipping, inventory and accounting."},{title:"Purchase journey",text:"Prototype the path from discovery to order confirmation."},{title:"Build and test",text:"Develop the storefront and test payment flows in a sandbox."}], faq:[{title:"Can I use YooKassa or T-Bank?",text:"Third-party Medusa providers exist. I verify version compatibility, receipts and refunds before implementation; the merchant account belongs to you."},{title:"Is Medusa better than WooCommerce or Bitrix?",text:"Medusa gives the storefront its own design and separates commerce logic from the interface. That is a more flexible foundation for a distinctive store than assembling the customer journey around a WordPress theme or a Bitrix template."}], finalTitle:"Estimate the actual store", finalText:"Send your catalog size, payment, shipping and accounting requirements. I will suggest a platform and phased scope.", price:"from ₽49,000", priceNote:"A storefront with catalog, cart and checkout; payment and shipping options tailored to your project.",
    },
    "web-applications": {
      seoTitle:"Web application and client portal development — Oleg Jakunin", seoDescription:"Custom web apps and portals with accounts, roles, data, APIs and integrations, built around real workflows.", label:"04 / WEB APPLICATIONS", title:"A product people can use every day", lead:"I build accounts, roles, data-driven interfaces and integrations, starting with the tasks people actually need to complete.", note:"From a focused prototype to a working product.", image:"/projects/okhana.webp", imageAlt:"Okhana web application interface", exampleLabel:"REAL PROJECT", exampleTitle:"Okhana — connected product flows", exampleText:"An example where interface, data and user actions work together.", exampleHref:"/work/okhana", exampleCta:"View the work", includedTitle:"What the build covers", included:[{title:"User flows",text:"Roles, states, errors and key tasks."},{title:"Frontend and backend",text:"Responsive UI, APIs, data and permissions."},{title:"Launch",text:"Integrations, critical-flow checks and deployment."}], processTitle:"From idea to useful first version", process:[{title:"Focus",text:"Choose the most valuable user journey."},{title:"Prototype",text:"Validate screens and data before full development."},{title:"Iterate",text:"Release a core and expand based on priorities."}], faq:[{title:"Can we start with an MVP?",text:"Yes. We can limit the first release to one key workflow."}], finalTitle:"Discuss a workflow", finalText:"Tell me who will use the product and what they currently do manually.",
    },
    "design-redesign": {
      seoTitle:"Website design and redesign — Oleg Jakunin", seoDescription:"Positioning, structure, visual direction, responsive components and implementation for a new or existing website.", label:"05 / DESIGN", title:"A redesign with a purpose", lead:"I find what stops the current site from explaining the product and converting interest, then create a visual system and implement it.", note:"A new site or a considered rebuild of an existing one.", image:"/projects/aokemz-v2.webp", imageAlt:"Redesigned KEMZ website homepage", exampleLabel:"REAL PROJECT", exampleTitle:"KEMZ — a new visual language for industrial work", exampleText:"The case shows the context, structure, interface and finished industrial website.", exampleHref:"/work/aokemz", exampleCta:"View the case", includedTitle:"More than a visual refresh", included:[{title:"Message and structure",text:"Offer, navigation and paths to inquiry."},{title:"Component system",text:"Type, grid, UI, imagery and responsive rules."},{title:"Implementation",text:"The design becomes a usable, accessible website."}], processTitle:"How decisions are made", process:[{title:"Audit",text:"Review the site, audience and available brand assets."},{title:"Concept",text:"Agree on a key-screen direction."},{title:"System",text:"Build components and responsive states."}], faq:[{title:"Does every page need rebuilding?",text:"Not necessarily. We can keep working parts and focus on the crucial pages."}], finalTitle:"Show me your current site", finalText:"I will identify what to preserve and what to improve.",
    },
    "seo-positioning": {
      seoTitle:"SEO site structure and brand positioning — Oleg Jakunin", seoDescription:"Search intent research, SEO architecture, technical audit, service pages and content plans based on real user needs.", label:"06 / SEO", title:"Pages for people and their questions", lead:"I investigate how customers search, what the site already earns, and where the gaps are. Then I connect positioning, architecture, copy and technical SEO.", note:"Positioning, site architecture and technical SEO work as one system.", exampleLabel:"METHOD", exampleTitle:"From search intent to the right page", exampleText:"Service pages, case studies and articles answer different questions. They should not all compete through one homepage.", includedTitle:"Search foundations", included:[{title:"Queries and SERP",text:"Group topics by intent and target page."},{title:"Architecture and copy",text:"Map service, case and article roles with clear metadata."},{title:"Technical review",text:"Indexing, canonicals, sitemap, mobile and internal links."}], processTitle:"A measurable plan", process:[{title:"Baseline",text:"Review Search Console and Yandex Webmaster data."},{title:"Priorities",text:"Choose pages by commercial value and proof."},{title:"Measure",text:"Track impressions, clicks and lead quality."}], faq:[{title:"When will I rank first?",text:"No one can guarantee a date or position; competition and the site history matter."}], finalTitle:"Explore your search demand", finalText:"Send the site URL and your main services. We can prioritize pages to improve.",
    },
    cms: {
      seoTitle:"CMS setup and custom content management — Oleg Jakunin", seoDescription:"Content models, roles, media, preview and editorial workflows for company websites and catalogs, including OJ CMS and Payload.", label:"07 / CONTENT MANAGEMENT", title:"Edit content without waiting for a developer", lead:"I shape a CMS around the people updating your website: page types, fields, permissions, media and preview.", note:"The platform follows the editorial workflow, not popularity alone.", image:"/projects/oj-cms-wide.webp", imageAlt:"OJ CMS content editor", exampleLabel:"OWN PRODUCT", exampleTitle:"OJ CMS — focused content editing", exampleText:"A dashboard for pages, media and publishing, adapted to each project's structure.", exampleHref:"/work/oj-cms", exampleCta:"View OJ CMS", includedTitle:"What your team gets", included:[{title:"Content models",text:"Pages, entries, SEO fields and useful relationships."},{title:"Roles and preview",text:"Review changes before publishing with appropriate access."},{title:"Handover",text:"Check common tasks and teach editors to update content."}], processTitle:"How the CMS is shaped", process:[{title:"Model",text:"List content types, fields and relationships."},{title:"Workflow",text:"Test creation, editing, preview and publishing."},{title:"Integration",text:"Connect CMS updates to public pages."}], faq:[{title:"An alternative to WordPress or Bitrix?",text:"For some sites, yes. If a specific plugin or 1C workflow is essential, we compare it before choosing."}], finalTitle:"Show me what needs editing", finalText:"I will suggest a content model and clear editorial workflow.",
    },
    "ai-solutions": {
      seoTitle:"AI assistants and RAG search for websites — Oleg Jakunin", seoDescription:"AI assistants, document search and automation integrated into real web product workflows with source and answer quality checks.", label:"08 / AI", title:"AI where it reduces manual work", lead:"I integrate knowledge search, assistants and automation into a specific process. We begin with the questions and trustworthy sources, not a generic chatbot widget.", note:"An AI assistant shaped around your content and workflow.", image:"/projects/okhana.webp", imageAlt:"Okhana interface with assistant", exampleLabel:"REAL PROJECT", exampleTitle:"Okhana — AI within a product flow", exampleText:"An example of an assistant used in the product context rather than as an unrelated overlay.", exampleHref:"/work/okhana", exampleCta:"View the work", includedTitle:"What makes an integration useful", included:[{title:"Scenario",text:"Users, frequent questions and handoff boundaries."},{title:"Data and retrieval",text:"Permitted documents, updates and relevant passages."},{title:"Quality control",text:"Test questions, source links and uncertainty handling."}], processTitle:"Start with a testable pilot", process:[{title:"Choose the task",text:"Pick a narrow, repeated problem with usable data."},{title:"Prototype",text:"Build retrieval and response on a limited collection."},{title:"Evaluate",text:"Compare answers with sources and adjust."}], faq:[{title:"Can answers be guaranteed error-free?",text:"No. Quality depends on the sources and task, so the pilot includes tests and a human fallback."}], finalTitle:"Find an AI use case", finalText:"Tell me which questions or documents take your team the most time.",
    },
  },
};
