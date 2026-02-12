import type { APIRoute } from "astro";
import { getKV } from "../../lib/kv";

function generateOrderId() {
  const rand = Math.random().toString(36).substring(2, 8).toUpperCase();
  const time = Date.now().toString(36).toUpperCase();
  return `MLX-${time}-${rand}`;
}

export const POST: APIRoute = async ({ request }) => {
  const body = await request.json();
  const { venueId, customerName, customerContact, items } = body;

  if (!venueId || !customerName || !customerContact || !items?.length) {
    return new Response(JSON.stringify({ ok: false }), { status: 400 });
  }

  const kv = getKV();
  const menuRaw = await kv.get(`menu:${venueId}`);
  if (!menuRaw) {
    return new Response(JSON.stringify({ ok: false }), { status: 404 });
  }

  const menu = JSON.parse(menuRaw);

  let subtotalPence = 0;

  const normalisedItems = items.map((item: any) => {
    const menuItem = menu.items.find((m: any) => m.id === item.itemId);
    if (!menuItem) return null;

    const pricePence = Math.round(menuItem.price * 100);
    subtotalPence += pricePence * item.qty;

    return {
      itemId: menuItem.id,
      name: menuItem.name,
      qty: item.qty,
      pricePence
    };
  }).filter(Boolean);

  const order = {
    orderId: generateOrderId(),
    venueId,
    status: "NEW",
    createdAt: Date.now(),
    updatedAt: Date.now(),
    customer: {
      name: customerName,
      contact: customerContact
    },
    fulfilment: {
      method: "COLLECTION"
    },
    items: normalisedItems,
    totals: {
      subtotalPence
    }
  };

  const ordersKey = `orders:${venueId}`;
  const existingRaw = await kv.get(ordersKey);
  const existing = existingRaw ? JSON.parse(existingRaw) : [];

  existing.unshift(order);

  await kv.put(ordersKey, JSON.stringify(existing));

  return new Response(JSON.stringify({ ok: true }), {
    headers: { "Content-Type": "application/json" }
  });
};
