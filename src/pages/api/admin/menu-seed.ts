// src/pages/api/admin/menu-seed.ts

import type { APIRoute } from "astro";
import { getEnv } from "../../../lib/kv";
import { getVenue } from "../../../lib/venue";

export const prerender = false; // ✅ REQUIRED FOR POST ON PAGES

function json(ok: boolean, body: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify({ ok, ...body }), {
    status,
    headers: { "content-type": "application/json" },
  });
}

export const POST: APIRoute = async ({ request, locals }) => {
  const { MENULINX_KV } = getEnv(locals);

  const url = new URL(request.url);
  const venueId = (url.searchParams.get("venueId") || "default").trim();

  if (!venueId) {
    return json(false, { error: "Missing venueId" }, 400);
  }

  // Ensure venue exists (auto-init behaviour)
  const venue = await getVenue(MENULINX_KV, venueId);

  const menuKey = `menulinx:menu:${venueId}`;

  // Prevent accidental reseeding
  const existing = await MENULINX_KV.get(menuKey, { type: "json" });
  if (existing) {
    return json(false, { error: "Menu already exists for venue" }, 409);
  }

  // ---- DEMO MENU (GEN-1 SAFE) ----
  const menu = {
    venueId,
    restaurantName: venue.name || "MenuLinx Demo Venue",
    logoEmoji: "🍽️",
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
        emoji: "🍔",
        available: true,
      },
      {
        id: "burger-2",
        name: "Veggie Burger",
        description: "Plant-based patty with house sauce",
        price: 8.0,
        category: "mains",
        emoji: "🥬",
        available: true,
      },
      {
        id: "fries-1",
        name: "Fries",
        description: "Golden, lightly salted",
        price: 3.0,
        category: "sides",
        emoji: "🍟",
        available: true,
      },
      {
        id: "drink-1",
        name: "Soft Drink",
        description: "Cola / Lemonade / Orange",
        price: 2.0,
        category: "drinks",
        emoji: "🥤",
        available: true,
      },
    ],
    createdAt: new Date().toISOString(),
  };

  await MENULINX_KV.put(menuKey, JSON.stringify(menu));

  return json(true, {
    message: "Menu seeded",
    venueId,
    itemCount: menu.items.length,
  });
};
