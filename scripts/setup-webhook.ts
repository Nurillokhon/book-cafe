/**
 * scripts/setup-webhook.ts
 * Bir marta ishga tushiriladi: npx ts-node scripts/setup-webhook.ts
 *
 * @format
 */

const TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const WEBHOOK_URL = process.env.NEXT_PUBLIC_APP_URL; // masalan: https://yourapp.vercel.app
const SECRET = process.env.TELEGRAM_WEBHOOK_SECRET;

if (!TOKEN || !WEBHOOK_URL) {
  console.error("TELEGRAM_BOT_TOKEN va NEXT_PUBLIC_APP_URL kerak");
  process.exit(1);
}

async function setup() {
  const url = `${WEBHOOK_URL}/api/telegram`;

  const res = await fetch(`https://api.telegram.org/bot${TOKEN}/setWebhook`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      url,
      allowed_updates: ["message", "callback_query"],
      ...(SECRET ? { secret_token: SECRET } : {}),
    }),
  });

  const json = await res.json();
  console.log("setWebhook natija:", json);
}

setup();
