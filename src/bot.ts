import 'dotenv/config';
import { Telegraf } from 'telegraf';
import OpenAI from 'openai';
import { spawn } from 'child_process';

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN!);
const ai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Запускаем MCP Sequential Thinking сервер как отдельный процесс
const mcpProcess = spawn('/usr/local/bin/node', [
  '/Users/ms/TG BOT/node_modules/@modelcontextprotocol/server-sequential-thinking/dist/index.js'
], {
  stdio: ['pipe', 'pipe', 'pipe']
});

let currentChatId: number | null = null;

mcpProcess.stdout.on('data', (data) => {
  console.log('MCP Server:', data.toString());
  
  try {
    const response = JSON.parse(data.toString());
    if (response.result && currentChatId) {
      bot.telegram.sendMessage(currentChatId, `Sequential Thinking ответ: ${response.result.content}`);
    }
  } catch (e) {
    console.log('MCP raw output:', data.toString());
  }
});

mcpProcess.stderr.on('data', (data) => {
  console.error('MCP Error:', data.toString());
});

bot.start((ctx) => ctx.reply('Я ваш тренер-бот. Команды: /help, /report, /plan, /stats'));
bot.help((ctx) => ctx.reply('Пришли: /report workout ... или /report food ...'));

bot.command('report', async (ctx) => {
  const text = ctx.message?.text ?? '';
  // тут сохраним в БД позже; пока просто ответим
  await ctx.reply(`Принял отчёт: ${text.slice(8).trim() || 'пусто'}`);
});

bot.on('text', async (ctx) => {
  const userText = ctx.message.text;
  
  // Если сообщение начинается с /mcp, используем Sequential Thinking
  if (userText.startsWith('/mcp')) {
    const question = userText.slice(4).trim();
    currentChatId = ctx.chat.id;
    
    // Отправляем вопрос в MCP сервер
    mcpProcess.stdin.write(JSON.stringify({
      method: 'tools/call',
      params: {
        name: 'sequential_thinking',
        arguments: { question }
      }
    }) + '\n');
    
    ctx.reply('Обрабатываю через Sequential Thinking...');
  } else {
    // Обычный ответ через OpenAI
    const aiResp = await ai.responses.create({
      model: 'gpt-4o-mini',
      input: `Ответь кратко: ${userText}`
    });
    ctx.reply(aiResp.output_text ?? '...');
  }
});

bot.launch().then(() => console.log('Bot polling...'));
