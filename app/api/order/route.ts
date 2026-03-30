/** @format */
import { normalizeTelegramUsername, users } from "@/lib/telegram-users";

export async function POST(req: Request) {
  const { name, phone, product, address, location, telegramUsername } =
    await req.json();

  const orderId = crypto.randomUUID();
  const usernameKey = normalizeTelegramUsername(telegramUsername);
  const userChatId = usernameKey ? users.get(usernameKey) : undefined;

  const maps =
    location?.lat && location?.lng
      ? `https://maps.google.com/?q=${location.lat},${location.lng}`
      : null;

  const text = `
<b>🛒 Yangi buyurtma</b>

<b>🆔 ID:</b> ${orderId}
<b>📦 Mahsulot:</b> ${product}
<b>👤 Ism:</b> ${name}
<b>📞 Telefon:</b> ${phone}
<b>📍 Manzil:</b> ${address}
${usernameKey ? `<b>📍 Telegram:</b> @${usernameKey}` : ""}
${maps ? `<b>🗺 Location:</b> ${maps}` : ""}
`;

  const TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

  await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      chat_id: CHAT_ID,
      text,
      parse_mode: "HTML",

      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "🧑‍🍳 Tayyorlanmoqda",
              callback_data: usernameKey
                ? `cooking_${orderId}_${usernameKey}`
                : `cooking_${orderId}`,
            },
          ],
          [
            {
              text: "✅ Tayyor (chiqarildi)",
              callback_data: usernameKey ? `done_${orderId}_${usernameKey}` : `done_${orderId}`,
            },
          ],
        ],
      },
    }),
  });

  if (userChatId) {
    await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: userChatId,
        text: `🛒 Buyurtma qabul qilindi!\nID: ${orderId}`,
      }),
    });
  }

  return Response.json({ ok: true, orderId });
}
