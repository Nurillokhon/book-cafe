/** @format */

/**
 * telegram-username-cache.ts
 * Username → chat_id mapping cache
 * User botga /start yuborganida bu cache to'ldiriladi
 */

const g = global as typeof globalThis & {
  __tgUsernameCache?: Map<string, number>;
};
if (!g.__tgUsernameCache) g.__tgUsernameCache = new Map();
const cache = g.__tgUsernameCache;

export async function getChatIdForTelegramUsername(
  username: string,
): Promise<number | null> {
  return cache.get(username.toLowerCase()) ?? null;
}

export async function saveChatIdForTelegramUsername(
  username: string,
  chatId: number,
): Promise<void> {
  cache.set(username.toLowerCase(), chatId);
}
