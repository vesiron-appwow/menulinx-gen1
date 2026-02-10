// src/lib/orders.ts
import type { KVNamespaceLike } from "./kv";
import { kvPutJSON } from "./kv";
import { keyOrder } from "./keys";

export type OrderItem = {
  itemId: string;
  name: string;
  qty: number;
  unitPrice?: number; // optional (Gen-1 can omit)
};

export type OrderRecord = {
  orderId: string;
  venueId: string;

  createdAt: string;          // ISO
  estimatedReadyAt: string;   // ISO (now + venue prepMinutes)

  customerName: string;
  customerContact: string;    // phone/email free text
  customerNote?: string;

  items: OrderItem[];

  status: "NEW";              // Gen-1 locked (no acceptance semantics)
};

export function newOrderId(): string {
  // short unique id suitable for UI
  const rnd = Math.random().toString(36).slice(2, 8).toUpperCase();
  const ts = Date.now().toString(36).toUpperCase();
  return `MLX-${ts}-${rnd}`;
}

export function computeEstimatedReadyAt(prepMinutes: number): string {
  const ms = Math.max(0, prepMinutes) * 60_000;
  return new Date(Date.now() + ms).toISOString();
}

export async function writeOrder(kv: KVNamespaceLike, order: OrderRecord): Promise<void> {
  await kvPutJSON(kv, keyOrder(order.orderId), order);
}
