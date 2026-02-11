globalThis.process ??= {}; globalThis.process.env ??= {};
import { g as getEnv } from '../../../chunks/kv_CaNHy7I2.mjs';
import { a as keyOrder } from '../../../chunks/keys_BxcRhGL4.mjs';
export { renderers } from '../../../renderers.mjs';

const GET = async ({ url, locals }) => {
  const { MENULINX_KV } = getEnv(locals);
  const orderId = (url.searchParams.get("orderId") || "").trim();
  if (!orderId) {
    return new Response(
      JSON.stringify({ ok: false, error: "Missing orderId" }),
      { status: 400, headers: { "content-type": "application/json" } }
    );
  }
  const raw = await MENULINX_KV.get(keyOrder(orderId));
  if (!raw) {
    return new Response(
      JSON.stringify({ ok: false, error: "Order not found" }),
      { status: 404, headers: { "content-type": "application/json" } }
    );
  }
  const order = JSON.parse(raw);
  return new Response(
    JSON.stringify({ ok: true, order }),
    { status: 200, headers: { "content-type": "application/json" } }
  );
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
