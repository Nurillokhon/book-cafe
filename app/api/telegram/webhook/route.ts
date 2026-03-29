/** @format */

/**
 * app/api/order/route.ts
 * Yangi buyurtma qabul qilish
 */

import { randomBytes } from "crypto";
import { buildCookCallback, buildDoneCallback } from "@/lib/telegram-callback";
import {
  saveOrder,
  setAdminMessageId,
  setCustomerChatId,
} from "@/lib/order-store";
import { getChatIdForTelegramUsername } from "@/lib/telegram-username-cache";
import { sendMessage } from "@/lib/telegram";

function escapeHtml(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function normalizeTelegramUsername(raw: unknown): string | undefined {
  if (typeof raw !== "string") return undefined;
  const u = raw.trim().replace(/^@+/, "");
  if (!u) return undefined;
  if (!/^[a-zA-Z0-9_]{5,32}$/.test(u)) return undefined;
  return u;
}

export async function POST(req: Request) {
  const body = await req.json();

  const { name, phone, product, address, location } = body;
  const telegramUsername = normalizeTelegramUsername(body.telegramUsername);

  if (
    !String(name ?? "").trim() ||
    !String(phone ?? "").trim() ||
    !String(address ?? "").trim() ||
    !String(product ?? "").trim()
  ) {
    return Response.json({ error: "Maydonlarni to'ldiring" }, { status: 400 });
  }

  const orderId = crypto.randomUUID();
  const shortRef = randomBytes(4).toString("hex");

  const maps =
    location?.lat && location?.lng
      ? `https://maps.google.com/?q=${location.lat},${location.lng}`
      : null;

  const botUser =
    process.env.TELEGRAM_BOT_USERNAME?.replace(/^@/, "") || "Book_coffeeUz_bot";

  const CHAT_ID = process.env.TELEGRAM_CHAT_ID!;

  // 1. Orderni saqlaymiz
  await saveOrder(shortRef, {
    orderId,
    name: String(name ?? "").trim(),
    phone: String(phone ?? "").trim(),
    product: String(product ?? "").trim(),
    address: String(address ?? "").trim(),
    telegramUsername,
    createdAt: new Date().toISOString(),
  });

  // 2. User oldindan botga /start yuborganmi? Cache'dan tekshiramiz
  let customerChatId: number | undefined;
  if (telegramUsername) {
    const cached = await getChatIdForTelegramUsername(telegramUsername);
    if (cached != null) {
      await setCustomerChatId(shortRef, cached);
      customerChatId = cached;
    }
  }

  // 3. Admin guruhiga xabar matni
  const text = [
    `<b>🛒 Yangi buyurtma</b>`,
    ``,
    `<b>🆔 ID:</b> <code>${orderId}</code>`,
    `<b>🔗 Ref:</b> <code>${shortRef}</code>`,
    `<b>📦 Mahsulot:</b> ${escapeHtml(String(product ?? ""))}`,
    `<b>👤 Ism:</b> ${escapeHtml(String(name ?? ""))}`,
    `<b>📞 Telefon:</b> ${escapeHtml(String(phone ?? ""))}`,
    `<b>📍 Manzil:</b> ${escapeHtml(String(address ?? ""))}`,
    telegramUsername
      ? `<b>✈️ Telegram:</b> @${escapeHtml(telegramUsername)}`
      : null,
    maps ? `<b>🗺 Location:</b> ${maps}` : null,
    ``,
    `<b>📊 Holat:</b> 🆕 Yangi`,
  ]
    .filter((l) => l !== null)
    .join("\n");

  // 4. Admin guruhiga yuboramiz
  let telegramTrackUrl = `https://t.me/${botUser}?start=o_${shortRef}`;

  const tgRes = await sendMessage({
    chat_id: CHAT_ID,
    text,
    parse_mode: "HTML",
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "🧑‍🍳 Tayyorlanmoqda",
            callback_data: buildCookCallback(shortRef, customerChatId),
          },
        ],
        [
          {
            text: "✅ Tayyor (chiqarildi)",
            callback_data: buildDoneCallback(shortRef, customerChatId),
          },
        ],
      ],
    },
  });

  if (tgRes.ok && tgRes.result?.message_id != null) {
    await setAdminMessageId(shortRef, tgRes.result.message_id);
    telegramTrackUrl = `https://t.me/${botUser}?start=o_${shortRef}_${tgRes.result.message_id}`;
  }

  return Response.json({
    ok: true,
    orderId,
    shortRef,
    telegramTrackUrl,
  });
}
