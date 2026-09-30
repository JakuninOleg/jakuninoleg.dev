type Story = { task: string; solution: string; result: string };

export const projectStories: Record<"ru" | "en", Record<string, Story>> = {
  ru: {
    "oj-cms": {
      task: "Сделать ежедневную работу с сайтом понятной для редактора: страницы, новости и медиа должны жить в одном месте.",
      solution: "Разработал демонстрационный редактор на Next.js: страницы, новости, медиа, статусы публикации и предпросмотр. Данные демо хранятся в браузере; интеграция с Payload проектируется для клиентского сайта отдельно.",
      result: "Откройте демо CMS и пройдите сценарий от черновика до публикации.",
    },
    okhana: {
      task: "Организовать личное пространство семьи, где поиск и ответы опираются на её собственные данные.",
      solution: "Собрал семейный хаб с ролями, приватностью и поиском по заметкам с проверкой доступа. В основе — Next.js и Postgres.",
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
      solution: "I built a Next.js editor demo with pages, news, media, publishing states and preview. Demo data stays in the browser; Payload integration is scoped separately for a client website.",
      result: "Open the CMS demo and follow the workflow from draft to publication.",
    },
    okhana: {
      task: "Create a private family space where search and answers use the family's own information.",
      solution: "I built a family hub with roles, privacy, and permission-aware note search using Next.js and Postgres.",
      result: "The working service is available at okhanahome.com.",
    },
    "tesla-explorer": {
      task: "Bring trips, charging, and route planning into a single workspace.",
      solution: "I built the interface with Next.js and Mapbox, added authentication and persistence, and connected planning to an AI service.",
      result: "Open the app to explore the map and route-planning flow.",
    },
  },
};
