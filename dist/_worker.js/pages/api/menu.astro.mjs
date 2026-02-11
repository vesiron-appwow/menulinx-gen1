globalThis.process ??= {}; globalThis.process.env ??= {};
import { g as getEnv, k as kvGetJSON } from '../../chunks/kv_CaNHy7I2.mjs';
import { k as keyMenu } from '../../chunks/keys_BxcRhGL4.mjs';
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
  const venueId = String(url.searchParams.get("venueId") || "default").trim();
  try {
    const menu = await kvGetJSON(MENULINX_KV, keyMenu(venueId));
    if (!menu) {
      return json(404, { ok: false, error: "Menu not found" });
    }
    return json(200, { ok: true, menu });
  } catch {
    return json(500, { ok: false, error: "Failed to load menu" });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
