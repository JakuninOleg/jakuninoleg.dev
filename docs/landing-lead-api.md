# Заявки с лендингов

`POST https://jakuninoleg.dev/api/landing-lead` принимает JSON с произвольными непустыми полями и отправляет их на адрес из `CONTACT_TO_EMAIL` (или основной контактный адрес сайта). Названия полей становятся подписями в письме. Если одно из значений целиком является email-адресом, оно используется как `Reply-To`.

Сейчас браузерные запросы разрешены с `vneshablona.ru` и `www.vneshablona.ru` по HTTP и HTTPS. Другие `Origin` отклоняются. CORS не является авторизацией: серверный клиент может подделать заголовок `Origin`. Для защиты от массовой отправки действует ограничение 5 заявок в минуту на IP.

Пример для формы статического сайта:

```js
const form = document.querySelector("#lead-form");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  // Проверьте обязательные поля и согласие на обработку данных до отправки.
  const fields = Object.fromEntries(new FormData(form).entries());
  const response = await fetch("https://jakuninoleg.dev/api/landing-lead", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(fields),
  });
  const result = await response.json();

  if (response.ok && result.ok) {
    form.reset();
    // Покажите посетителю подтверждение отправки.
  } else {
    // Покажите ошибку и дайте повторить отправку.
  }
});
```

Например, JSON `{"Имя":"Олег","Контакт":"+7 900 000-00-00","Сообщение":"Хочу обсудить проект"}` превратится в три строки письма. Обязательных названий полей нет. Тело запроса должно содержать хотя бы одно непустое поле, не более 30 полей и не более 16 000 символов JSON. Файлы не поддерживаются.

Успех: HTTP `200`, `{"ok":true,"id":"..."}`. Ошибка: `{"ok":false,"error":"..."}` с HTTP `400`, `403`, `413`, `415`, `429`, `502` или `503`. Preflight `OPTIONS` с разрешённого домена возвращает `204` и CORS-заголовки.
