/** @format */

/**
 * order-store.ts
 * Oddiy in-memory store (production'da Redis ishlatish tavsiya etiladi)
 */

export interface Order {
  shortRef: string;
  orderId: string;
  name: string;
  phone: string;
  product: string;
  address: string;
  telegramUsername?: string;
  customerChatId?: number;
  adminMessageId?: number;
  status: "new" | "cooking" | "done";
  createdAt: string;
}

// Global store (Next.js dev'da hot-reload tufayli global ishlatamiz)
const g = global as typeof globalThis & { __orders?: Map<string, Order> };
if (!g.__orders) g.__orders = new Map();
const orders = g.__orders;

export async function saveOrder(
  shortRef: string,
  data: Omit<
    Order,
    "shortRef" | "status" | "customerChatId" | "adminMessageId"
  >,
): Promise<void> {
  orders.set(shortRef, {
    ...data,
    shortRef,
    status: "new",
  });
}

export async function getOrder(shortRef: string): Promise<Order | null> {
  return orders.get(shortRef) ?? null;
}

export async function setCustomerChatId(
  shortRef: string,
  chatId: number,
): Promise<void> {
  const order = orders.get(shortRef);
  if (order) {
    order.customerChatId = chatId;
  }
}

export async function setAdminMessageId(
  shortRef: string,
  messageId: number,
): Promise<void> {
  const order = orders.get(shortRef);
  if (order) {
    order.adminMessageId = messageId;
  }
}

export async function setOrderStatus(
  shortRef: string,
  status: Order["status"],
): Promise<void> {
  const order = orders.get(shortRef);
  if (order) {
    order.status = status;
  }
}
