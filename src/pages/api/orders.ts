import type { APIRoute } from "astro";
import { getKV } from "../../lib/kv";

export const POST: APIRoute = async ({ request }) => {
  const body = await request.json();

  const { venueId, customer, fulfilment, items } = body;

  if (!venueId) {
    return new Response(JSON.stringify({ ok: false, error: "Missing venueId" }), { status: 400 });
  }

  if (!customer?.name) {
    return new Response(JSON.stringify({ ok: false, error: "Missing customer name" }), { status: 400 });
  }

  if (!items || !Array.isArray(items) || items.length === 0) {
    return new Response(JSON.stringify({ ok: false, error: "No items" }), { status: 400 });
  }

  const kv = await getKV();

  const menuRaw = await kv.get(`menu:${venueId}`);
  if (!menuRaw) {
    return new Response(JSON.stringify({ ok: false, error: "Menu not found" }), { status: 404 });
  }

  const menu = JSON.parse(menuRaw);

  let subtotalPence = 0;

  const resolvedItems = items.map((i: any) => {
    const menuItem = menu.items.find((m: any) => m.id === i.itemId);
    const pricePence = menuItem ? Math.round(menuItem.price * 100) : 0;
    subtotalPence += pricePence * i.qty;

    return {
      itemId: i.itemId,
      name: menuItem?.name || i.name,
      qty: i.qty,
      pricePence
    };
  });

  const orderId = `MLX-${Date.now().toString(36).toUpperCase()}`;

  const order = {
    orderId,
    venueId,
    status: "PLACED",
    createdAt: Date.now(),
    updatedAt: Date.now(),
    customer: {
      name: customer.name,
      contact: customer.contact || ""
    },
    fulfilment: fulfilment || { method: "COLLECTION" },
    items: resolvedItems,
    totals: {
      subtotalPence
    }
  };

  const ordersKey = `orders:${venueId}`;
  const existingRaw = await kv.get(ordersKey);
  const existing = existingRaw ? JSON.parse(existingRaw) : [];

  existing.unshift(order);

  await kv.put(ordersKey, JSON.stringify(existing));

  return new Response(JSON.stringify({ ok: true, orderId }), {
    headers: { "Content-Type": "application/json" }
  });
};
