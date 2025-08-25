import 'dotenv/config';
import { Telegraf } from 'telegraf';
import OpenAI from 'openai';

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN!);
const ai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

bot.start((ctx) => ctx.reply('Я ваш тренер-бот. Команды: /help, /report, /plan, /stats'));
bot.help((ctx) => ctx.reply('Пришли: /report workout ... или /report food ...'));

bot.command('report', async (ctx) => {
  const text = ctx.message?.text ?? '';
  // тут сохраним в БД позже; пока просто ответим
  await ctx.reply(`Принял отчёт: ${text.slice(8).trim() || 'пусто'}`);
});

bot.on('text', async (ctx) => {
  const userText = ctx.message.text;
  const aiResp = await ai.responses.create({
    model: 'gpt-4o-mini',
    input: `Ответь кратко: ${userText}`
  });
  ctx.reply(aiResp.output_text ?? '...');
});

bot.launch().then(() => console.log('Bot polling...'));
