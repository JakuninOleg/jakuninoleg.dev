# Jakunin Oleg

Frontend / Fullstack · [jakuninoleg.dev](https://jakuninoleg.dev/)

---

## En

Personal site of developer **Oleg Jakunin**

He builds sites, landings, web apps, backends, and AI features inside products — from brief to production.

### On the site

- Live projects you can open
- What you can order
- Stack
- Contact form, Telegram, email, GitHub

### Format

Full project, a piece of work inside a team, or fixes on an existing codebase.

Site language switch: **En** / **Ru**.

---

## Ru

Личный сайт разработчика **Якунина Олега**.

Собирает сайты, лендинги, кабинеты, backend и AI-фичи в продукте — от брифа до прода.

### На сайте

- Живые проекты, которые можно открыть
- Что можно заказать
- Стек
- Форма, Telegram, email, GitHub

### Формат

Проект целиком, участок в команде или доработка уже существующего кода.

Язык сайта: **En** / **Ru**.

---

## Projects

| | En | Ru |
| --- | --- | --- |
| **Okhana** | Family hub with memory search | Семейный хаб с поиском по памяти |
| **Tesla Explorer** | Trip cabinet + Mapbox + AI routes | Кабинет поездок + карты + AI-маршруты |
| **AO KEMZ** | Factory site in production | Сайт завода в проде |

---

## Contact

- [jakuninoleg.dev](https://jakuninoleg.dev/)
- Telegram [@Sainttss](https://t.me/Sainttss)
- [oleg.kemz@gmail.com](mailto:oleg.kemz@gmail.com)
- GitHub [JakuninOleg](https://github.com/JakuninOleg)

## IndexNow

The site publishes its IndexNow verification file from `public/`. After a production deployment is complete, notify participating search engines **only about URLs that were actually added or materially updated**:

```sh
npm run indexnow -- /ru/blog/example /en/blog/example
```

Use `--dry-run` to check the URL list without a network request. The command verifies the deployed key file and each public page before submitting to the IndexNow global endpoint. A GitHub Actions workflow compares the sitemap before and after a push to `main`, waits for new URLs to appear in production, then runs the command automatically. For materially updated existing pages, run the command manually after deployment. Keep the sitemap in place for full-site discovery; IndexNow does not notify Google or guarantee indexing.
