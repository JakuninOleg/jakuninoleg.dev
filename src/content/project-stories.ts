type Story = { task: string; solution: string; result: string };

export const projectStories: Record<"ru" | "en", Record<string, Story>> = {
  ru: {
    "oj-cms": {
      task: "Сделать ежедневную работу с сайтом понятной для редактора: страницы, новости и медиа должны жить в одном месте.",
      solution: "Разработал панель на Payload с ролями, статусами публикации и предпросмотром. Структуру можно адаптировать под контент конкретного проекта.",
      result: "Откройте интерфейс CMS: в нём видны основные разделы и сценарий управления публикациями.",
    },
    okhana: {
      task: "Организовать личное пространство семьи, где поиск и ответы опираются на её собственные данные.",
      solution: "Собрал семейный хаб с ролями, приватностью и поиском по памяти. В основе — Next.js, база Postgres и RAG-сценарий.",
      result: "Работающий сервис доступен на okhanahome.com.",
    },
    "tesla-explorer": {
      task: "Соединить карту поездок, зарядки и планирование маршрута в одном кабинете.",
      solution: "Построил интерфейс на Next.js и Mapbox, добавил авторизацию и хранение данных, связал планирование с AI-сервисом.",
      result: "Можно открыть приложение и посмотреть карту и сценарии маршрута.",
    },
  },
  en: {
    "oj-cms": {
      task: "Make everyday website editing clear: pages, news, and media should live in one place.",
      solution: "I built a Payload admin with roles, publishing states, and preview. Its content structure can be tailored to each project.",
      result: "Open the CMS interface to see the main sections and publishing workflow.",
    },
    okhana: {
      task: "Create a private family space where search and answers use the family's own information.",
      solution: "I built a family hub with roles, privacy, and memory search, using Next.js, Postgres, and a RAG flow.",
      result: "The working service is available at okhanahome.com.",
    },
    "tesla-explorer": {
      task: "Bring trips, charging, and route planning into a single workspace.",
      solution: "I built the interface with Next.js and Mapbox, added authentication and persistence, and connected planning to an AI service.",
      result: "Open the app to explore the map and route-planning flow.",
    },
  },
};
