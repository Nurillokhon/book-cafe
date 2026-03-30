/** @format */

/**
 * Oddiy username → chatId mapping.
 * Vercel uchun: agar REDIS_URL bo‘lsa, username → chatId Redis’da saqlanadi.
 * Aks holda (lokal) Map fallback ishlaydi.
 */

import Redis from "ioredis";

const g = globalThis as typeof globalThis & {
  __tgUsers?: Map<string, number>;
  __tgRedis?: Redis;
};

if (!g.__tgUsers) g.__tgUsers = new Map();

export const users = g.__tgUsers;

export function normalizeTelegramUsername(raw: unknown): string | null {
  if (typeof raw !== "string") return null;
  const u = raw.trim().replace(/^@+/, "").toLowerCase();
  return u ? u : null;
}

function hasRedisUrl() {
  return Boolean(process.env.REDIS_URL && process.env.REDIS_URL.trim());
}

function keyForUsername(username: string) {
  return `tg:user:${username}`;
}

function redisClient(): Redis | null {
  if (!hasRedisUrl()) return null;
  if (!g.__tgRedis) {
    g.__tgRedis = new Redis(process.env.REDIS_URL!, {
      maxRetriesPerRequest: 2,
      enableReadyCheck: true,
      lazyConnect: true,
    });
  }
  return g.__tgRedis;
}

export async function saveUserChatId(username: string, chatId: number) {
  const u = normalizeTelegramUsername(username);
  if (!u) return;
  const r = redisClient();
  if (r) {
    try {
      await r.set(keyForUsername(u), String(chatId));
      return;
    } catch {
      // fallback to memory
    }
  }
  users.set(u, chatId);
}

export async function getUserChatId(username: string): Promise<number | null> {
  const u = normalizeTelegramUsername(username);
  if (!u) return null;
  const r = redisClient();
  if (r) {
    try {
      const v = await r.get(keyForUsername(u));
      const n = v == null ? NaN : Number(v);
      return Number.isFinite(n) ? n : null;
    } catch {
      // fallback to memory
    }
  }
  return users.get(u) ?? null;
}

