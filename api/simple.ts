import type { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(req: VercelRequest, res: VercelResponse) {
  res.status(200).json({ 
    message: 'Simple endpoint works!',
    method: req.method,
    env: {
      hasToken: !!process.env.TELEGRAM_BOT_TOKEN,
      hasOpenAI: !!process.env.OPENAI_API_KEY
    }
  });
}
