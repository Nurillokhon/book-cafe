/** @format */

/**
 * Oddiy username → chatId mapping.
 * Eslatma: server qayta ishga tushsa map tozalanadi (prod uchun DB kerak).
 */

const g = globalThis as typeof globalThis & {
  __tgUsers?: Map<string, number>;
};

if (!g.__tgUsers) g.__tgUsers = new Map();

export const users = g.__tgUsers;

export function normalizeTelegramUsername(raw: unknown): string | null {
  if (typeof raw !== "string") return null;
  const u = raw.trim().replace(/^@+/, "").toLowerCase();
  return u ? u : null;
}

