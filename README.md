# SellerMindAI Landing

Лендинг-страница для [sellermindai.com](https://sellermindai.com) — AI-агенты для продавцов на Wildberries и Ozon.

## Стек

- Vanilla HTML/CSS/JS (без фреймворков)
- Шрифты: Cabinet Grotesk + Satoshi (Fontshare CDN)
- Форма: formsubmit.co
- Хостинг: Cloudflare Pages

## Деплой

Автоматический деплой при пуше в `main` через GitHub Actions → Cloudflare Pages.

### Ручной деплой

Загрузить файлы (`index.html`, `base.css`, `style.css`, `app.js`) через [Cloudflare Pages Dashboard](https://dash.cloudflare.com) → Workers & Pages → Upload assets.

## Настройка автодеплоя

Добавить секреты в GitHub репо (Settings → Secrets → Actions):

| Secret | Где взять |
|--------|-----------|
| `CLOUDFLARE_API_TOKEN` | [dash.cloudflare.com](https://dash.cloudflare.com/profile/api-tokens) → Create Token → Edit Cloudflare Workers |
| `CLOUDFLARE_ACCOUNT_ID` | Cloudflare Dashboard → правая колонка → Account ID |

После добавления секретов — любой пуш в `main` автоматически обновит сайт на sellermindai.com.
