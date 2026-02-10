// src/pages/api/order.ts
import type { APIRoute } from "astro";
import { getEnv } from "../../lib/kv";
import { getVenue } from "../../lib/venue";
import {
  computeEstimatedReadyAt,
  newOrderId,
  writeOrder,
  type OrderItem,
  type OrderRecord
} from "../../lib/orders";
import { sendOrderEmail } from "../../lib/email";

type CreateOrderPayload = {
  venueId: string;
  customerName: string;
  customerContact: string;
  customerNote?: string;
  items: Array<{
    itemId: string;
    name: string;
    qty: number;
    unitPrice?: number;
  }>;
};

function badRequest(message: string) {
  return new Response(JSON.stringify({ ok: false, error: message }), {
    status: 400,
    headers: { "content-type": "application/json" },
  });
}

function forbidden(message: string) {
  return new Response(JSON.stringify({ ok: false, error: message }), {
    status: 403,
    headers: { "content-type": "application/json" },
  });
}

export const POST: APIRoute = async ({ request, locals }) => {
  const { MENULINX_KV } = getEnv(locals);

  let payload: CreateOrderPayload;
  try {
    payload = (await request.json()) as CreateOrderPayload;
  } catch {
    return badRequest("Invalid JSON");
  }

  const venueId = (payload.venueId || "").trim();
  if (!venueId) return badRequest("Missing venueId");

  // ✅ AUTHORITATIVE SERVER GUARD
  const venue = await getVenue(MENULINX_KV, venueId);
  if (!venue.isOpen) {
    return forbidden("Venue is currently CLOSED. Orders are not being accepted.");
  }

  const customerName = (payload.customerName || "").trim();
  const customerContact = (payload.customerContact || "").trim();
  if (!customerName) return badRequest("Missing customerName");
  if (!customerContact) return badRequest("Missing customerContact");

  const rawItems = Array.isArray(payload.items) ? payload.items : [];
  if (rawItems.length === 0) return badRequest("No items in order");

  const items: OrderItem[] = rawItems
    .map((it) => ({
      itemId: String(it.itemId || "").trim(),
      name: String(it.name || "").trim(),
      qty: Number(it.qty || 0),
      unitPrice: typeof it.unitPrice === "number" ? it.unitPrice : undefined,
    }))
    .filter((it) => it.itemId && it.name && Number.isFinite(it.qty) && it.qty > 0);

  if (items.length === 0) return badRequest("Order items invalid");

  const orderId = newOrderId();
  const createdAt = new Date().toISOString();

  const order: OrderRecord = {
    orderId,
    venueId,
    createdAt,
    estimatedReadyAt: computeEstimatedReadyAt(venue.prepMinutes),
    customerName,
    customerContact,
    customerNote: (payload.customerNote || "").trim() || undefined,
    items,
    status: "NEW",
  };

  // AUTHORITATIVE WRITE
  await writeOrder(MENULINX_KV, order);

  // NON-AUTHORITATIVE EMAIL RELAY (fire-and-forget)
  if (venue.email) {
    sendOrderEmail(getEnv(locals), venue.email, {
      orderId: order.orderId,
      venueId: order.venueId,
      createdAt: order.createdAt,
      estimatedReadyAt: order.estimatedReadyAt,
      customerName: order.customerName,
      customerContact: order.customerContact,
      customerNote: order.customerNote,
      items: order.items.map(i => ({ name: i.name, qty: i.qty })),
    });
  }

  return new Response(JSON.stringify({ ok: true, orderId, order }), {
    status: 201,
    headers: { "content-type": "application/json" },
  });
};
