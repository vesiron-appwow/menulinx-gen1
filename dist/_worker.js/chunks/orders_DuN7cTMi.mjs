globalThis.process ??= {}; globalThis.process.env ??= {};
import { a as kvPutJSON, k as kvGetJSON } from './kv_CaNHy7I2.mjs';
import { a as keyOrder, b as keyOrdersIndex } from './keys_BxcRhGL4.mjs';

function newOrderId() {
  const rnd = Math.random().toString(36).slice(2, 8).toUpperCase();
  const ts = Date.now().toString(36).toUpperCase();
  return `MLX-${ts}-${rnd}`;
}
async function readOrderIndex(kv, venueId) {
  const raw = await kv.get(keyOrdersIndex(venueId));
  if (!raw) return [];
  try {
    const ids = JSON.parse(raw);
    return Array.isArray(ids) ? ids : [];
  } catch {
    return [];
  }
}
async function writeOrderIndex(kv, venueId, ids) {
  await kv.put(keyOrdersIndex(venueId), JSON.stringify(ids));
}
async function appendToIndex(kv, venueId, orderId) {
  const ids = await readOrderIndex(kv, venueId);
  if (!ids.includes(orderId)) {
    ids.unshift(orderId);
    await writeOrderIndex(kv, venueId, ids);
  }
}
async function writeOrder(kv, order) {
  await kvPutJSON(kv, keyOrder(order.orderId), order);
  await appendToIndex(kv, order.venueId, order.orderId);
}
async function getOrder(kv, orderId) {
  return kvGetJSON(kv, keyOrder(orderId));
}
async function getOrdersByVenue(kv, venueId) {
  const ids = await readOrderIndex(kv, venueId);
  const orders = [];
  for (const id of ids) {
    const o = await getOrder(kv, id);
    if (o) orders.push(o);
  }
  return orders;
}
async function updateOrderStatus(kv, orderId, nextStatus) {
  const existing = await getOrder(kv, orderId);
  if (!existing) return null;
  const nowIso = (/* @__PURE__ */ new Date()).toISOString();
  const updated = {
    ...existing,
    status: nextStatus,
    acceptedAt: nextStatus === "ACCEPTED" ? nowIso : existing.acceptedAt,
    readyAt: nextStatus === "READY" ? nowIso : existing.readyAt,
    completedAt: nextStatus === "DISPATCHED" || nextStatus === "COLLECTED" || nextStatus === "CANCELLED" ? nowIso : existing.completedAt
  };
  await kvPutJSON(kv, keyOrder(orderId), updated);
  return updated;
}

export { getOrdersByVenue as g, newOrderId as n, updateOrderStatus as u, writeOrder as w };
