# Telegram Bot with GPT-5

## Локальная разработка

```bash
npm run dev
```

## MCP Sequential Thinking Installation

### NPX Installation
```bash
npx -y @modelcontextprotocol/server-sequential-thinking
```

### Docker Installation
```bash
docker run --rm -i mcp/sequentialthinking
```

### Build from Source
```bash
docker build -t mcp/sequentialthinking -f src/sequentialthinking/Dockerfile .
```

## Структура

- `src/bot.ts` - Telegram бот с polling
- `package.json` - зависимости проекта
- `tsconfig.json` - конфигурация TypeScript

## Готово к работе!

Проект настроен для локальной разработки. Выполни:
1. `npm run dev`
