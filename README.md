# Telegram Bot with GPT-5

## Локальная разработка

```bash
npm run dev
```

## Деплой на Vercel

1. Войди в аккаунт Vercel:
```bash
npx vercel login
```

2. Деплой:
```bash
npx vercel --prod
```

3. Добавь переменные окружения в Vercel Dashboard:
   - `TELEGRAM_BOT_TOKEN`
   - `OPENAI_API_KEY`

4. Установи webhook в Telegram (замени URL на твой):
```bash
curl -X POST "https://api.telegram.org/bot8479007772:AAEGQVho5ec7qUQ56yuwVPD5HkiP3TYYaJM/setWebhook" \
  -H "Content-Type: application/json" \
  -d '{"url": "https://your-app.vercel.app/api/webhook"}'
```

## Структура

- `api/webhook.ts` - Vercel serverless function
- `src/dev.ts` - Локальная разработка с polling
- `vercel.json` - Конфигурация Vercel

## Готово к деплою!

Проект настроен для Vercel. Выполни:
1. `npx vercel login`
2. `npx vercel --prod`
