globalThis.process ??= {}; globalThis.process.env ??= {};
import { g as getEnv } from '../../../chunks/kv_CaNHy7I2.mjs';
import { g as getVenue, w as writeVenue, m as makeVenueDefaults } from '../../../chunks/venue_CDMwiKbU.mjs';
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
  const venueId = String(payload?.venueId || "").trim();
  if (!venueId) return json(400, { ok: false, error: "Missing venueId" });
  const existing = await getVenue(MENULINX_KV, venueId);
  const base = existing ?? makeVenueDefaults(venueId);
  const updated = {
    ...base,
    name: payload.name ?? base.name,
    status: payload.status === "OPEN" || payload.status === "CLOSED" ? payload.status : base.status,
    prepMinutes: payload.prepMinutes != null ? Number(payload.prepMinutes) : base.prepMinutes,
    collectionEnabled: payload.collectionEnabled != null ? Boolean(payload.collectionEnabled) : base.collectionEnabled,
    deliveryEnabled: payload.deliveryEnabled != null ? Boolean(payload.deliveryEnabled) : base.deliveryEnabled,
    updatedAt: Date.now()
  };
  await writeVenue(MENULINX_KV, updated);
  return json(200, { ok: true, venue: updated });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
