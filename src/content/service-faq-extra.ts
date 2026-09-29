import type { ServiceRoute } from "./service-routes";

type Answer = { title: string; text: string };

export const serviceFaqExtra: Record<"ru" | "en", Record<ServiceRoute, Answer[]>> = {
  ru: {
    "landing-pages": [
      { title: "Можно сделать больше блоков и отдельные страницы?", text: "Да. Объём зависит от предложения и пути клиента: иногда хватает короткой страницы, иногда нужны подробные разделы, кейсы и FAQ. Состав определяем до оценки." },
      { title: "Подключите мою почту, домен и аналитику?", text: "Да. Настрою домен, отправку заявок и нужные события аналитики; доступы к сервисам останутся у вас. Для формы предусмотрю проверку полей и защиту от спама." },
      { title: "Смогу ли я менять текст после запуска?", text: "Если обновления нужны регулярно, подключу CMS. Для редких правок можно обойтись без панели — подход согласуем до разработки." },
    ],
    "product-catalogues": [
      { title: "Чем сайт-каталог отличается от интернет-магазина?", text: "Каталог помогает изучить ассортимент и отправить запрос на подбор или цену. Магазин добавляет корзину, оплату, доставку и управление заказами." },
      { title: "Можно загрузить товары из таблицы или 1С?", text: "Да, если есть выгрузка или доступный интерфейс обмена. Сначала проверю качество данных, изображения, характеристики и частоту обновления." },
      { title: "Фильтры и карточки товаров будут видны в поиске?", text: "Для категорий и важных товаров подготовлю отдельные индексируемые страницы. Комбинации фильтров настрою так, чтобы не плодить дубли и пустые URL." },
    ],
    "online-stores": [
      { title: "Какие доставки и способы оплаты можно подключить?", text: "Подберём сервисы под географию и процессы магазина: оплату, получение чеков, доставку, пункты выдачи и уведомления. Совместимость конкретных модулей проверю перед сметой." },
      { title: "Можно перенести товары с WordPress или Битрикс?", text: "Да. Для переноса нужны данные о товарах, вариантах, категориях и изображениях. Отдельно составим карту старых URL и редиректов, чтобы сохранить полезные страницы." },
      { title: "Кто будет управлять ценами и заказами?", text: "Команда получает доступ к админ-панели. Роли, статус заказа, цены и остатки настраиваются под ваш рабочий процесс." },
    ],
    "web-applications": [
      { title: "Можно подключить существующую CRM или API?", text: "Да. Сначала изучу документацию и права доступа, затем согласуем, какие данные передаются и что делать при ошибке обмена." },
      { title: "Как защищаются личные кабинеты и данные?", text: "Продумываю роли и права, проверку входящих данных, безопасное хранение секретов и критические действия. Конкретные требования зависят от состава данных." },
      { title: "Сможем развивать сервис после запуска?", text: "Да. Первую версию строю вокруг главного сценария, а следующие функции приоритизируем по использованию и обратной связи." },
    ],
    "design-redesign": [
      { title: "Вы делаете только макет или запускаете сайт?", text: "Могу пройти путь от исследования и визуальной концепции до адаптивной верстки и запуска. Объём работы зафиксируем по страницам и состояниям интерфейса." },
      { title: "Как выбрать стиль, если у нас нет брендбука?", text: "Начнём с аудитории, предложения и примеров рынка. Покажу визуальное направление на ключевом экране: типографику, цвет, изображения и композицию." },
      { title: "Что произойдёт с контентом и поисковыми URL?", text: "Перед редизайном составим список важных страниц и адресов. Сохраним работающие материалы, а изменённые URL свяжем редиректами." },
    ],
    "seo-positioning": [
      { title: "Что входит в семантическое ядро?", text: "Не просто список фраз: группирую запросы по намерению, теме и странице. Отмечаю, где нужна услуга, категория, кейс или статья." },
      { title: "Вы пишете тексты и меняете структуру сайта?", text: "Да. Помогу уточнить позиционирование, подготовить план страниц, заголовки и тексты, затем внедрить структуру и внутренние ссылки." },
      { title: "Как понять, что SEO работает?", text: "Сравниваем индексацию, показы, клики и целевые обращения в Search Console, Яндекс Вебмастере и аналитике. Смотрим не только на отдельную позицию." },
    ],
    cms: [
      { title: "Смогу ли я добавлять товары, страницы и новости сам?", text: "Да. Поля и роли проектируются вокруг ваших редакторских задач. Перед передачей вместе проверим типовые действия." },
      { title: "Можно перенести материалы из старой CMS?", text: "Да. Сначала сравним структуры данных и проверим медиа, ссылки, метаданные и авторство. После тестового переноса настроим импорт остального." },
      { title: "Нужна ли CMS для небольшого лендинга?", text: "Если контент меняется редко, панель может быть лишней. Если нужны самостоятельные правки, новости или несколько редакторов, CMS стоит предусмотреть." },
    ],
    "ai-solutions": [
      { title: "Что такое RAG и чем он полезен?", text: "Это поиск подходящих фрагментов в ваших материалах перед ответом модели. Такой подход помогает опираться на документы, а не только на общие знания модели." },
      { title: "Можно подключить базу знаний и CRM?", text: "Да, при наличии доступа и понятных правил работы с данными. Для действий в CRM отдельно ограничим права и предусмотрим подтверждение важных операций." },
      { title: "Как проверить качество ответов до запуска?", text: "Соберём реальные вопросы, ожидаемые источники и критерии качества. Проверим ответы на этом наборе и предусмотрим передачу человеку там, где уверенности недостаточно." },
    ],
  },
  en: {
    "landing-pages": [
      { title: "Can the page have more sections or extra pages?", text: "Yes. The scope follows the offer and customer journey; we agree on the content before estimating." },
      { title: "Will you connect my domain, inbox and analytics?", text: "Yes. I can set up the domain, lead delivery, useful analytics events, validation and spam protection." },
      { title: "Can I edit the copy later?", text: "If updates are frequent, we can add a CMS. For occasional changes, a separate editing panel may be unnecessary." },
    ],
    "product-catalogues": [
      { title: "How is a catalog different from a store?", text: "A catalog supports discovery and inquiries. A store adds cart, payment, shipping and order management." },
      { title: "Can products be imported from a spreadsheet or ERP?", text: "Yes, if the data can be exported or accessed. We first inspect its structure and quality." },
      { title: "Can category and product pages rank in search?", text: "Important categories and products get dedicated pages. Filter combinations are controlled to avoid duplicate or empty URLs." },
    ],
    "online-stores": [
      { title: "What payment and shipping providers can be connected?", text: "We choose providers for your market and verify integration compatibility before estimating implementation." },
      { title: "Can you migrate products from WordPress or Bitrix?", text: "Yes. We map products, variants, images and old URLs, then plan redirects for useful pages." },
      { title: "Who manages prices and orders?", text: "Your team uses the admin panel with roles and workflows shaped around your operation." },
    ],
    "web-applications": [
      { title: "Can an existing CRM or API be integrated?", text: "Yes. I review its documentation, permissions and failure handling before defining the data flow." },
      { title: "How are accounts and data protected?", text: "Access roles, input validation, secrets and critical actions are designed around the data the product handles." },
      { title: "Can the product grow after launch?", text: "Yes. We start with a useful core and prioritize later features using feedback and usage." },
    ],
    "design-redesign": [
      { title: "Do you deliver a mockup or a live site?", text: "I can cover strategy, visual direction, responsive implementation and launch. We define the deliverables in advance." },
      { title: "What if we have no brand book?", text: "We start with your audience and offer, then test typography, color, imagery and layout on a key screen." },
      { title: "What happens to existing content and URLs?", text: "We inventory important pages, preserve useful content and redirect URLs that need to change." },
    ],
    "seo-positioning": [
      { title: "What does keyword research deliver?", text: "Queries grouped by intent, topic and target page rather than a raw list of phrases." },
      { title: "Do you also write and implement pages?", text: "Yes. I can plan the architecture, write page copy and metadata, and implement internal links." },
      { title: "How do we measure progress?", text: "We review indexing, impressions, clicks and qualified leads in search and analytics tools." },
    ],
    cms: [
      { title: "Can our team add products and news independently?", text: "Yes. Fields and permissions reflect editorial tasks, which we test together before handover." },
      { title: "Can content be migrated from another CMS?", text: "Yes. We map data, media, links and metadata, then test a sample import first." },
      { title: "Does a small landing page need a CMS?", text: "Not always. It is useful when your team updates content frequently or needs multiple editors." },
    ],
    "ai-solutions": [
      { title: "What is RAG?", text: "It retrieves relevant passages from your material before the model answers, so responses can refer to those sources." },
      { title: "Can it use our knowledge base and CRM?", text: "Yes, where access is available. Actions in the CRM need scoped permissions and confirmation for sensitive steps." },
      { title: "How do we test answer quality?", text: "We assemble real questions, expected sources and evaluation criteria, then test before release." },
    ],
  },
};
