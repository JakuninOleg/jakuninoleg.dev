type Entry = { period: string; company: string; role: string; context: string; points: string[]; stack: string };
type Resume = { name: string; role: string; intro: string; experience: Entry[]; mentoring: Entry[]; education: { title: string; place: string; period: string }[] };

export const resumes: Record<"ru" | "en", Resume> = {
  ru: {
    name: "Олег Якунин", role: "Frontend / Fullstack Developer",
    intro: "8+ лет коммерческой веб-разработки. Создаю интерфейсы, внутренние системы и веб-приложения: от требований и архитектуры до интеграций и запуска. Работал в финтехе, международном аутсорсинге и самостоятельных проектах.",
    experience: [
      { period: "2022 — сейчас", company: "Самостоятельная практика", role: "Frontend / Fullstack Developer", context: "Клиентские проекты и собственные продукты. Полный цикл разработки.", points: ["Разрабатываю сайты и приложения на React, Next.js, TypeScript, Vue и Nuxt: интерфейс, API и размещение на сервере.", "Создаю переиспользуемые компоненты, сложные формы, личные кабинеты, карты и интерфейсы для работы с данными.", "Подключаю REST API, PostgreSQL, Supabase, авторизацию и сторонние сервисы. Настраиваю headless CMS под задачи редакторов.", "Интегрирую LLM, RAG-поиск и потоковые ответы. Настраиваю CI/CD, поддерживаю приложения и оптимизирую производительность."], stack: "React · Next.js · TypeScript · Vue · Nuxt · Node.js · PostgreSQL · Payload · GitHub Actions" },
      { period: "2020 — 2021", company: "IT Club", role: "Frontend Developer", context: "Австралийская аутсорсинговая компания. Международная распределённая команда.", points: ["Разрабатывал интерфейсы коммерческих проектов: от требований до выпуска в production.", "Создавал общие UI-компоненты, подключал REST API, участвовал в code review и рефакторинге.", "Переиспользование компонентов сократило время реализации повторяющихся интерфейсов примерно на 30%.", "Разбирал проблемы в production и улучшал производительность."], stack: "JavaScript · TypeScript · Vue · Nuxt · REST API · Git" },
      { period: "2018 — 2020", company: "Здесь Легко", role: "Fullstack Web Developer", context: "Финтех и автомобильное финансирование. Внутренние инструменты для бизнеса.", points: ["Разрабатывал внутреннюю ERP: автоматизировал финансовую и операционную отчётность вместо ручной выгрузки и сведения данных.", "Создавал дашборды для CFO и CTO, инструменты коммерческого директора и экономистов, сложный калькулятор ценообразования.", "Автоматизация сократила ручные операции примерно на 50–60% по оценке команды.", "Разрабатывал приложение для курьеров и колл-центра с обновлениями в реальном времени, оптимизировал SQL-запросы и интеграции."], stack: "Vue · Nuxt · Vuex · PostgreSQL · MySQL · SQL · SCSS · REST API" },
    ],
    mentoring: [
      { period: "март — июнь 2020", company: "Яндекс Практикум", role: "Код-ревьюер", context: "Обучение frontend-разработке", points: ["Проверял студенческие проекты: JavaScript, архитектуру, читаемость кода и соответствие требованиям. Давал обратную связь по ООП и БЭМ."], stack: "JavaScript · Code review · ООП · БЭМ" },
      { period: "июль 2017 — декабрь 2018", company: "Le Wagon Barcelona", role: "Ассистент преподавателя / ментор", context: "Fullstack bootcamp", points: ["Помогал студентам с Ruby on Rails, JavaScript и SQL. Проводил консультации, разбирал код и сопровождал командные выпускные проекты."], stack: "Ruby on Rails · JavaScript · SQL · Менторство" },
    ],
    education: [{ title: "Fullstack Web Development Bootcamp", place: "Le Wagon Barcelona", period: "2017" }, { title: "Международная экономика · магистратура", place: "Уральский государственный экономический университет", period: "2007 — 2012" }],
  },
  en: {
    name: "Oleg Jakunin", role: "Frontend / Fullstack Developer",
    intro: "8+ years of commercial web development. I build interfaces, internal business systems and web applications, from requirements and architecture to integrations and launch. My background includes fintech, international outsourcing and independent projects.",
    experience: [
      { period: "2022 — present", company: "Independent practice", role: "Frontend / Fullstack Developer", context: "Client projects and my own products. End-to-end delivery.", points: ["Build websites and applications with React, Next.js, TypeScript, Vue and Nuxt, including interfaces, APIs and deployment.", "Develop reusable components, complex forms, dashboards, maps and data-driven interfaces.", "Integrate REST APIs, PostgreSQL, Supabase, authentication and third-party services. Customize headless CMS workflows.", "Integrate LLMs, RAG search and streaming responses. Set up CI/CD, maintain applications and improve performance."], stack: "React · Next.js · TypeScript · Vue · Nuxt · Node.js · PostgreSQL · Payload · GitHub Actions" },
      { period: "2020 — 2021", company: "IT Club", role: "Frontend Developer", context: "Australian outsourcing company. International distributed team.", points: ["Delivered commercial frontend features from requirements to production.", "Built shared UI components, integrated REST APIs and contributed to code reviews and refactoring.", "Reusable components reduced recurring interface implementation time by approximately 30%.", "Investigated production issues and improved performance."], stack: "JavaScript · TypeScript · Vue · Nuxt · REST API · Git" },
      { period: "2018 — 2020", company: "Zdeslegko", role: "Fullstack Web Developer", context: "Fintech / automotive finance. Internal business tools.", points: ["Developed an internal ERP to automate financial and operational reporting, replacing manual exports and consolidation.", "Built CFO and CTO dashboards, tools for economists and the commercial director, and a complex pricing calculator.", "Automation reduced manual operations by approximately 50–60%, according to the team's estimate.", "Built a real-time courier and call-center application, optimized SQL queries and integrated existing systems."], stack: "Vue · Nuxt · Vuex · PostgreSQL · MySQL · SQL · SCSS · REST API" },
    ],
    mentoring: [
      { period: "March — June 2020", company: "Yandex Practicum", role: "Code Reviewer", context: "Frontend development education", points: ["Reviewed student projects for JavaScript correctness, architecture, readability and technical requirements. Provided guidance on OOP and BEM."], stack: "JavaScript · Code review · OOP · BEM" },
      { period: "July 2017 — December 2018", company: "Le Wagon Barcelona", role: "Teaching Assistant / Mentor", context: "Fullstack bootcamp", points: ["Supported students with Ruby on Rails, JavaScript and SQL through consultations, code reviews and final team projects."], stack: "Ruby on Rails · JavaScript · SQL · Mentoring" },
    ],
    education: [{ title: "Fullstack Web Development Bootcamp", place: "Le Wagon Barcelona", period: "2017" }, { title: "International Economics · Master's degree", place: "Ural State University of Economics", period: "2007 — 2012" }],
  },
};

export const resumeSkills = [
  { title: "Frontend", items: "JavaScript / TypeScript, React, Next.js, Vue, Nuxt, Vuex, HTML, CSS, SCSS, Tailwind, BEM" },
  { title: "Backend & data", items: "Node.js, NestJS, Ruby on Rails, Python, Go, REST API, SSE, WebSockets, PostgreSQL, MySQL, Supabase, SQL" },
  { title: "AI & CMS", items: "OpenAI API, RAG, Vercel AI SDK, AI Gateway, Payload / OJ CMS, Contentful, Headless CMS" },
  { title: "Quality & delivery", items: "Vitest, Playwright, Git, GitHub Actions, Docker, CI/CD, Vercel, Fly.io, Figma, SEO" },
];
