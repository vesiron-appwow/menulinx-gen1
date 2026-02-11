globalThis.process ??= {}; globalThis.process.env ??= {};
import { g as getEnv } from '../../../chunks/kv_CaNHy7I2.mjs';
import { g as getVenue } from '../../../chunks/venue_CDMwiKbU.mjs';
export { renderers } from '../../../renderers.mjs';

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
    const venue = await getVenue(MENULINX_KV, venueId);
    if (!venue) return json(404, { ok: false, error: "Venue not found" });
    return json(200, { ok: true, venue });
  } catch {
    return json(500, { ok: false, error: "Failed to load venue" });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
