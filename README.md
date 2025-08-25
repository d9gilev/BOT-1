# Telegram Bot with GPT-5

## Локальная разработка

```bash
npm run dev
```

## MCP Sequential Thinking Setup

### 1. Установка через Smithery AI
```bash
npx -y @smithery/cli@latest install @smithery-ai/server-sequential-thinking --client cursor
```

### 2. NPX Installation
```bash
npx -y @modelcontextprotocol/server-sequential-thinking
```

### 3. Docker Installation
```bash
docker run --rm -i mcp/sequentialthinking
```

### 4. Build from Source
```bash
docker build -t mcp/sequentialthinking -f src/sequentialthinking/Dockerfile .
```

## Workflows

### React Workflow
```bash
/think react "Simple User profile dashboard"
```

### Node.js Workflow
```bash
/think nodejs "REST API for user management"
```

## Структура

- `src/bot.ts` - Telegram бот с polling
- `package.json` - зависимости проекта
- `tsconfig.json` - конфигурация TypeScript

## Готово к работе!

Проект настроен для локальной разработки. Выполни:
1. `npm run dev`
