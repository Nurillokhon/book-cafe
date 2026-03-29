/** @format */
import { users } from "../telegram/webhook/route";

export async function POST(req: Request) {
  const { name, phone, product, address, location, telegramUsername } =
    await req.json();

  const orderId = crypto.randomUUID();
  const userChatId = users.get(telegramUsername);

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
<b>📍 Telegram:</b> @${telegramUsername}
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
              callback_data: `cooking_${orderId}`,
            },
          ],
          [
            {
              text: "✅ Tayyor (chiqarildi)",
              callback_data: `done_${orderId}`,
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
