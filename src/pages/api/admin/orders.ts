// src/pages/api/admin/orders.ts
import type { APIRoute } from "astro";
import { getEnv } from "../../../lib/kv";

export const GET: APIRoute = async ({ url, locals }) => {
  const { MENULINX_KV } = getEnv(locals);

  const venueId = (url.searchParams.get("venueId") || "").trim();
  if (!venueId) {
    return new Response(JSON.stringify({ ok: false, error: "Missing venueId" }), {
      status: 400,
      headers: { "content-type": "application/json" },
    });
  }

  const list = await MENULINX_KV.list({ prefix: "menulinx:orders:" });
  const orders: any[] = [];

  for (const key of list.keys) {
    const raw = await MENULINX_KV.get(key.name);
    if (!raw) continue;

    let order;
    try {
      order = JSON.parse(raw);
    } catch {
      // ⚠️ Skip invalid / legacy / corrupt KV entries
      continue;
    }

    if (order.venueId === venueId) {
      orders.push(order);
    }
  }

  orders.sort(
    (a, b) =>
      new Date(b.createdAt).getTime() -
      new Date(a.createdAt).getTime()
  );

  return new Response(JSON.stringify({ ok: true, orders }), {
    status: 200,
    headers: { "content-type": "application/json" },
  });
};

