export default function handler(req: any, res: any) {
  res.status(200).json({ 
    message: 'Telegram API works!',
    method: req.method,
    hasToken: !!process.env.TELEGRAM_BOT_TOKEN,
    hasOpenAI: !!process.env.OPENAI_API_KEY
  });
}
