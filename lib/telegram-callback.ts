/** @format */

/**
 * telegram-callback.ts
 * Callback data qurilishi va parse qilinishi
 *
 * Format:
 *   cook:<shortRef>:<chatId|0>
 *   done:<shortRef>:<chatId|0>
 *
 * Telegram callback_data max 64 byte, shuning uchun ixcham formatda yozamiz.
 */

const SEP = ":";

export function buildCookCallback(
  shortRef: string,
  customerChatId?: number,
): string {
  return `cook${SEP}${shortRef}${SEP}${customerChatId ?? 0}`;
}

export function buildDoneCallback(
  shortRef: string,
  customerChatId?: number,
): string {
  return `done${SEP}${shortRef}${SEP}${customerChatId ?? 0}`;
}

export interface ParsedCallback {
  action: "cook" | "done";
  shortRef: string;
  customerChatId?: number;
}

export function parseCallback(data: string): ParsedCallback | null {
  const parts = data.split(SEP);
  if (parts.length !== 3) return null;

  const [action, shortRef, chatIdStr] = parts;
  if (action !== "cook" && action !== "done") return null;
  if (!shortRef) return null;

  const chatId = parseInt(chatIdStr, 10);

  return {
    action,
    shortRef,
    customerChatId: chatId > 0 ? chatId : undefined,
  };
}
