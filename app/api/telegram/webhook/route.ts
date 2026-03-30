/** @format */

export const dynamic = "force-dynamic";
export const revalidate = 0;
import {
  getUserChatId,
  normalizeTelegramUsername,
  saveUserChatId,
} from "@/lib/telegram-users";

// ✅ GET (405 ni yo‘q qiladi)
export async function GET() {
  return Response.json({ ok: true });
}

export async function POST(req: Request) {
  const body = await req.json();

  console.log("KELDI:", body);

  const TOKEN = process.env.TELEGRAM_BOT_TOKEN;

  // ✅ START
  if (typeof body.message?.text === "string" && body.message.text.startsWith("/start")) {
    const chatId = body.message.chat.id;
    const username = normalizeTelegramUsername(body.message.from?.username);

    if (username) await saveUserChatId(username, chatId);

    console.log("USER SAQLANDI:", username, chatId);

    await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: "✅ Siz ro‘yxatdan o‘tdingiz!",
      }),
    });
  }

  // ✅ BUTTON
  if (body.callback_query) {
    const data = body.callback_query.data;

    const [status, orderId, username] = data.split("_");

    console.log(orderId, "hello world");

    const usernameKey = normalizeTelegramUsername(username);
    const chatId = usernameKey ? await getUserChatId(usernameKey) : null;

    console.log(usernameKey ?? username, "box");

    let text = "";

    if (status === "cooking") {
      text = "🧑‍🍳 Buyurtmangiz tayyorlanmoqda";
    }

    if (status === "done") {
      text = "✅ Buyurtmangiz tayyor!";
    }

    if (chatId) {
      await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: `${text}\n\nID: ${orderId}`,
        }),
      });
    }

    await fetch(`https://api.telegram.org/bot${TOKEN}/answerCallbackQuery`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        callback_query_id: body.callback_query.id,
      }),
    });
  }

  return Response.json({ ok: true });
}
