import 'dotenv/config';
import { Telegraf } from 'telegraf';
import OpenAI from 'openai';
import type { VercelRequest, VercelResponse } from '@vercel/node';

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
  const q = ctx.message.text;
  const r = await ai.responses.create({
    model: 'gpt-5',
    input: `Кратко и по делу. Вопрос про тренировки/питание: "${q}"`,
  });
  await ctx.reply(r.output_text || 'Ок');
});

// Vercel serverless function
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'POST') {
    try {
      await bot.handleUpdate(req.body);
      res.status(200).json({ ok: true });
    } catch (error) {
      console.error('Webhook error:', error);
      res.status(500).json({ error: 'Webhook error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
