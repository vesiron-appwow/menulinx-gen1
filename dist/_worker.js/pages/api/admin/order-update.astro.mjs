globalThis.process ??= {}; globalThis.process.env ??= {};
import { g as getEnv } from '../../../chunks/kv_CaNHy7I2.mjs';
import { u as updateOrderStatus } from '../../../chunks/orders_DuN7cTMi.mjs';
export { renderers } from '../../../renderers.mjs';

const prerender = false;
function json(status, body) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" }
  });
}
const POST = async ({ request, locals }) => {
  const { MENULINX_KV } = getEnv(locals);
  let payload;
  try {
    payload = await request.json();
  } catch {
    return json(400, { ok: false, error: "Invalid JSON" });
  }
  const orderId = String(payload?.orderId || "").trim();
  const nextStatus = String(payload?.status || "").trim();
  if (!orderId || !nextStatus) {
    return json(400, { ok: false, error: "Missing fields" });
  }
  const validStatuses = [
    "NEW",
    "ACCEPTED",
    "READY",
    "DISPATCHED",
    "COLLECTED",
    "CANCELLED"
  ];
  if (!validStatuses.includes(nextStatus)) {
    return json(400, { ok: false, error: "Invalid status" });
  }
  const updated = await updateOrderStatus(
    MENULINX_KV,
    orderId,
    nextStatus
  );
  if (!updated) {
    return json(404, { ok: false, error: "Order not found" });
  }
  return json(200, { ok: true, order: updated });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
