/** @format */

/**
 * app/api/telegram/route.ts
 * Telegram webhook — barcha update'larni shu yerda qabul qilamiz:
 *   1. /start o_<shortRef>  — user botga keldi, chat_id saqlanadi
 *   2. callback_query       — admin "Tayyorlanmoqda" yoki "Tayyor" bosdi
 */

import { NextRequest } from "next/server";
import { parseCallback } from "@/lib/telegram-callback";
import { getOrder, setCustomerChatId, setOrderStatus } from "@/lib/order-store";
import { saveChatIdForTelegramUsername } from "@/lib/telegram-username-cache";
import {
  answerCallbackQuery,
  editMessageText,
  sendMessage,
} from "@/lib/telegram";

function escapeHtml(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// ─── Webhook secret tekshiruvi ───────────────────────────────────────────────
function isValidSecret(req: NextRequest): boolean {
  const secret = process.env.TELEGRAM_WEBHOOK_SECRET;
  if (!secret) return true;
  return req.headers.get("x-telegram-bot-api-secret-token") === secret;
}

// ─── Admin xabarini yangilash ────────────────────────────────────────────────
async function updateAdminMessage(
  shortRef: string,
  status: "cooking" | "done",
) {
  const order = await getOrder(shortRef);
  if (!order || !order.adminMessageId) return;

  const CHAT_ID = process.env.TELEGRAM_CHAT_ID!;
  const botUser =
    process.env.TELEGRAM_BOT_USERNAME?.replace(/^@/, "") || "Book_coffeeUz_bot";

  const statusLine =
    status === "cooking"
      ? "📊 Holat: 🧑‍🍳 Tayyorlanmoqda"
      : "📊 Holat: ✅ Tayyor (chiqarildi)";

  const text = [
    `<b>🛒 Buyurtma</b>`,
    ``,
    `<b>🆔 ID:</b> <code>${order.orderId}</code>`,
    `<b>🔗 Ref:</b> <code>${shortRef}</code>`,
    `<b>📦 Mahsulot:</b> ${escapeHtml(order.product)}`,
    `<b>👤 Ism:</b> ${escapeHtml(order.name)}`,
    `<b>📞 Telefon:</b> ${escapeHtml(order.phone)}`,
    `<b>📍 Manzil:</b> ${escapeHtml(order.address)}`,
    order.telegramUsername
      ? `<b>✈️ Telegram:</b> @${escapeHtml(order.telegramUsername)}`
      : null,
    ``,
    `<b>${statusLine}</b>`,
  ]
    .filter((l) => l !== null)
    .join("\n");

  // "Tayyor" bo'lganda tugmalarni olib tashlaymiz
  const reply_markup =
    status === "cooking"
      ? {
          inline_keyboard: [
            [
              {
                text: "✅ Tayyor (chiqarildi)",
                callback_data: `done:${shortRef}:${order.customerChatId ?? 0}`,
              },
            ],
          ],
        }
      : { inline_keyboard: [] };

  await editMessageText({
    chat_id: CHAT_ID,
    message_id: order.adminMessageId,
    text,
    parse_mode: "HTML",
    reply_markup,
  });
}

// ─── Userga holat xabari yuborish ────────────────────────────────────────────
async function notifyCustomer(
  chatId: number,
  status: "cooking" | "done",
  order: Awaited<ReturnType<typeof getOrder>>,
) {
  if (!order) return;

  const messages = {
    cooking: [
      `🧑‍🍳 <b>Buyurtmangiz tayyorlanmoqda!</b>`,
      ``,
      `<b>📦 Mahsulot:</b> ${escapeHtml(order.product)}`,
      `<b>🔗 Ref:</b> <code>${order.shortRef ?? ""}</code>`,
      ``,
      `Tayyor bo'lganda xabar beramiz ✅`,
    ].join("\n"),

    done: [
      `✅ <b>Buyurtmangiz tayyor!</b>`,
      ``,
      `<b>📦 Mahsulot:</b> ${escapeHtml(order.product)}`,
      `<b>🔗 Ref:</b> <code>${order.shortRef ?? ""}</code>`,
      ``,
      `Marhamat, olib ketishingiz mumkin! 🎉`,
    ].join("\n"),
  };

  await sendMessage({
    chat_id: chatId,
    text: messages[status],
    parse_mode: "HTML",
  });
}

// ─── /start handler ──────────────────────────────────────────────────────────
async function handleStart(message: TgMessage) {
  const chatId = message.chat.id;
  const username = message.from?.username;
  const text = message.text ?? "";

  // Chat_id ni username bilan bog'laymiz
  if (username) {
    await saveChatIdForTelegramUsername(username, chatId);
  }

  // /start o_<shortRef> formatini tekshiramiz
  const match = text.match(/^\/start\s+o_([a-f0-9]{8})/);
  if (match) {
    const shortRef = match[1];
    const order = await getOrder(shortRef);

    if (order) {
      // Customer chat_id ni orderga saqlaymiz
      await setCustomerChatId(shortRef, chatId);

      await sendMessage({
        chat_id: chatId,
        text: [
          `📋 <b>Buyurtmangiz qabul qilindi!</b>`,
          ``,
          `<b>📦 Mahsulot:</b> ${escapeHtml(order.product)}`,
          `<b>📍 Manzil:</b> ${escapeHtml(order.address)}`,
          `<b>🔗 Ref:</b> <code>${shortRef}</code>`,
          ``,
          `Holat yangilanganda siz xabardor qilinasiz 🔔`,
        ].join("\n"),
        parse_mode: "HTML",
      });
      return;
    }
  }

  // Oddiy /start
  await sendMessage({
    chat_id: chatId,
    text: "Salom! Buyurtmangiz holatini kuzatish uchun siz ro'yxatdan o'tdingiz. ✅",
    parse_mode: "HTML",
  });
}

// ─── Callback query handler ───────────────────────────────────────────────────
async function handleCallbackQuery(cq: TgCallbackQuery) {
  const data = cq.data ?? "";
  const callbackQueryId = cq.id;

  const parsed = parseCallback(data);
  if (!parsed) {
    await answerCallbackQuery({
      callback_query_id: callbackQueryId,
      text: "Noto'g'ri callback",
    });
    return;
  }

  const { action, shortRef } = parsed;

  // Orderni bazadan olamiz (eng yangi customer chat_id olish uchun)
  const order = await getOrder(shortRef);
  if (!order) {
    await answerCallbackQuery({
      callback_query_id: callbackQueryId,
      text: "Buyurtma topilmadi ❌",
    });
    return;
  }

  const status = action === "cook" ? "cooking" : "done";

  // Agar allaqachon shu holatda bo'lsa
  if (
    order.status === status ||
    (order.status === "done" && status === "cooking")
  ) {
    await answerCallbackQuery({
      callback_query_id: callbackQueryId,
      text: "Bu holat allaqachon o'rnatilgan",
    });
    return;
  }

  // 1. Statusni yangilaymiz
  await setOrderStatus(shortRef, status);

  // 2. Admin xabarini yangilaymiz
  await updateAdminMessage(shortRef, status);

  // 3. Userga xabar yuboramiz
  //    Callback'dan kelgan chatId yoki bazadagi chatId
  const customerChatId = parsed.customerChatId ?? order.customerChatId;
  if (customerChatId) {
    // shortRef ni order ichiga qo'shamiz (notifyCustomer uchun kerak)
    await notifyCustomer(customerChatId, status, {
      ...order,
      shortRef,
    } as Parameters<typeof notifyCustomer>[2]);
  }

  // 4. Admin'ga confirm javob
  const confirmText =
    status === "cooking"
      ? "🧑‍🍳 Tayyorlanmoqda deb belgilandi"
      : "✅ Tayyor deb belgilandi";

  await answerCallbackQuery({
    callback_query_id: callbackQueryId,
    text: confirmText,
  });
}

// ─── Types ───────────────────────────────────────────────────────────────────
interface TgUser {
  id: number;
  username?: string;
  first_name?: string;
}

interface TgChat {
  id: number;
  type: string;
}

interface TgMessage {
  message_id: number;
  from?: TgUser;
  chat: TgChat;
  text?: string;
}

interface TgCallbackQuery {
  id: string;
  from: TgUser;
  message?: TgMessage;
  data?: string;
}

interface TgUpdate {
  update_id: number;
  message?: TgMessage;
  callback_query?: TgCallbackQuery;
}

// ─── Main webhook handler ─────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  if (!isValidSecret(req)) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  let update: TgUpdate;
  try {
    update = await req.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  try {
    if (update.callback_query) {
      await handleCallbackQuery(update.callback_query);
    } else if (update.message) {
      const text = update.message.text ?? "";
      if (text.startsWith("/start")) {
        await handleStart(update.message);
      }
    }
  } catch (err) {
    console.error("[Telegram Webhook Error]", err);
  }

  // Telegram har doim 200 kutadi
  return Response.json({ ok: true });
}
