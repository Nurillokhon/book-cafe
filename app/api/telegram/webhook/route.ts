/** @format */

export const users = new Map();

// ✅ GET (405 ni yo‘q qiladi)
export async function GET() {
  return Response.json({ ok: true });
}

export async function POST(req: Request) {
  const body = await req.json();

  console.log("KELDI:", body);

  const TOKEN = process.env.TELEGRAM_BOT_TOKEN;

  // ✅ START
  if (body.message?.text === "/start") {
    const chatId = body.message.chat.id;
    const username = body.message.from.username;

    users.set(username, chatId);

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

    const chatId = users.get(username);

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
          text,
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
