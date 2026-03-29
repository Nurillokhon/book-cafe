/** @format */

/**
 * telegram.ts
 * Telegram Bot API yordamchi funksiyalar
 */

const TOKEN = process.env.TELEGRAM_BOT_TOKEN!;
const BASE = `https://api.telegram.org/bot${TOKEN}`;

export async function sendMessage(params: {
  chat_id: number | string;
  text: string;
  parse_mode?: "HTML" | "Markdown";
  reply_markup?: object;
}): Promise<{ ok: boolean; result?: { message_id?: number } }> {
  const res = await fetch(`${BASE}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params),
  });
  return res.json();
}

export async function editMessageText(params: {
  chat_id: number | string;
  message_id: number;
  text: string;
  parse_mode?: "HTML" | "Markdown";
  reply_markup?: object;
}): Promise<{ ok: boolean }> {
  const res = await fetch(`${BASE}/editMessageText`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params),
  });
  return res.json();
}

export async function answerCallbackQuery(params: {
  callback_query_id: string;
  text?: string;
}): Promise<{ ok: boolean }> {
  const res = await fetch(`${BASE}/answerCallbackQuery`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params),
  });
  return res.json();
}
