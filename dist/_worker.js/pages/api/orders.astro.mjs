globalThis.process ??= {}; globalThis.process.env ??= {};
import { g as getEnv } from '../../chunks/kv_CaNHy7I2.mjs';
import { g as getVenue } from '../../chunks/venue_CDMwiKbU.mjs';
import { g as getOrdersByVenue, n as newOrderId, w as writeOrder } from '../../chunks/orders_DuN7cTMi.mjs';
export { renderers } from '../../renderers.mjs';

const prerender = false;
function json(status, body) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" }
  });
}
const GET = async ({ request, locals }) => {
  const { MENULINX_KV } = getEnv(locals);
  const url = new URL(request.url);
  const venueId = String(url.searchParams.get("venueId") || "").trim();
  if (!venueId) return json(400, { ok: false, error: "Missing venueId" });
  try {
    const orders = await getOrdersByVenue(MENULINX_KV, venueId);
    return json(200, { ok: true, orders });
  } catch {
    return json(500, { ok: false, error: "Failed to load orders" });
  }
};
const POST = async ({ request, locals }) => {
  const { MENULINX_KV } = getEnv(locals);
  let payload;
  try {
    payload = await request.json();
  } catch {
    return json(400, { ok: false, error: "Invalid JSON" });
  }
  const venueId = String(payload?.venueId || "").trim();
  if (!venueId) return json(400, { ok: false, error: "Missing venueId" });
  const venue = await getVenue(MENULINX_KV, venueId);
  if (!venue) return json(400, { ok: false, error: "Venue not found" });
  if (venue.status !== "OPEN") {
    return json(403, { ok: false, error: "Venue is closed" });
  }
  const customerName = String(payload?.customerName || "").trim();
  if (!customerName) return json(400, { ok: false, error: "Missing customerName" });
  const items = Array.isArray(payload?.items) ? payload.items : [];
  if (!items.length) return json(400, { ok: false, error: "No items" });
  const cleanItems = items.map((i) => ({
    itemId: String(i.itemId || "").trim(),
    name: String(i.name || "").trim(),
    qty: Number(i.qty || 0),
    pricePence: Number(i.pricePence || 0)
  })).filter((i) => i.name && i.qty > 0);
  if (!cleanItems.length) {
    return json(400, { ok: false, error: "No valid items" });
  }
  const subtotalPence = cleanItems.reduce(
    (sum, i) => sum + i.pricePence * i.qty,
    0
  );
  const orderId = newOrderId();
  const order = {
    orderId,
    venueId,
    status: "PLACED",
    createdAt: Date.now(),
    updatedAt: Date.now(),
    customer: {
      name: customerName
    },
    fulfilment: {
      method: "COLLECTION"
    },
    items: cleanItems,
    totals: {
      subtotalPence
    }
  };
  try {
    await writeOrder(MENULINX_KV, order);
    return json(200, { ok: true, orderId });
  } catch {
    return json(500, { ok: false, error: "Failed to create order" });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
