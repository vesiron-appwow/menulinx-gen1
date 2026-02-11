globalThis.process ??= {}; globalThis.process.env ??= {};
import { g as getEnv } from '../../../chunks/kv_CaNHy7I2.mjs';
import { g as getVenue, m as makeVenueDefaults, w as writeVenue } from '../../../chunks/venue_CDMwiKbU.mjs';
import { k as keyMenu } from '../../../chunks/keys_BxcRhGL4.mjs';
export { renderers } from '../../../renderers.mjs';

const prerender = false;
function json(ok, body, status = 200) {
  return new Response(JSON.stringify({ ok, ...body }), {
    status,
    headers: { "content-type": "application/json" }
  });
}
const POST = async ({ request, locals }) => {
  const { MENULINX_KV } = getEnv(locals);
  const url = new URL(request.url);
  const venueId = (url.searchParams.get("venueId") || "default").trim();
  if (!venueId) {
    return json(false, { error: "Missing venueId" }, 400);
  }
  let venue = await getVenue(MENULINX_KV, venueId);
  if (!venue) {
    venue = makeVenueDefaults(venueId);
    await writeVenue(MENULINX_KV, venue);
  }
  const menuKey = keyMenu(venueId);
  const existing = await MENULINX_KV.get(menuKey);
  if (existing) {
    return json(false, { error: "Menu already exists for venue" }, 409);
  }
  const menu = {
    venueId,
    restaurantName: venue.name || "MenuLinx Demo Venue",
    openingHours: "Open today",
    serviceArea: "Local delivery & collection",
    deliveryFee: 2.5,
    items: [
      {
        id: "burger-1",
        name: "Classic Burger",
        description: "Beef patty, cheese, lettuce, tomato",
        price: 8.5,
        category: "mains",
        available: true
      },
      {
        id: "burger-2",
        name: "Veggie Burger",
        description: "Plant-based patty with house sauce",
        price: 8,
        category: "mains",
        available: true
      },
      {
        id: "fries-1",
        name: "Fries",
        description: "Golden, lightly salted",
        price: 3,
        category: "sides",
        available: true
      },
      {
        id: "drink-1",
        name: "Soft Drink",
        description: "Cola / Lemonade / Orange",
        price: 2,
        category: "drinks",
        available: true
      }
    ],
    createdAt: (/* @__PURE__ */ new Date()).toISOString()
  };
  await MENULINX_KV.put(menuKey, JSON.stringify(menu));
  return json(true, {
    message: "Menu seeded",
    venueId,
    itemCount: menu.items.length
  });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
