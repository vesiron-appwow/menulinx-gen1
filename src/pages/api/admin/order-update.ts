import type { APIRoute } from "astro";
import { getEnv } from "../../../lib/kv";
import { getOrder, writeOrder } from "../../../lib/orders";

export const POST: APIRoute = async ({ request, locals }) => {
  const { MENULINX_KV } = getEnv(locals);

  let payload: any;
  try {
    payload = await request.json();
  } catch {
    return new Response(
      JSON.stringify({ ok: false, error: "Invalid JSON" }),
      { status: 400, headers: { "content-type": "application/json" } }
    );
  }

  const venueId = String(payload.venueId || "").trim();
  const orderId = String(payload.orderId || "").trim();
  const newStatus = String(payload.status || "").trim();

  if (!venueId || !orderId || !newStatus) {
    return new Response(
      JSON.stringify({ ok: false, error: "Missing fields" }),
      { status: 400, headers: { "content-type": "application/json" } }
    );
  }

  const existing = await getOrder(MENULINX_KV, orderId);

  if (!existing || existing.venueId !== venueId) {
    return new Response(
      JSON.stringify({ ok: false, error: "Order not found" }),
      { status: 404, headers: { "content-type": "application/json" } }
    );
  }

  const updatedOrder = {
    ...existing,
    status: newStatus,
    ...(newStatus === "ACCEPTED" && Number.isFinite(payload.eta_mins)
      ? { eta_mins: Number(payload.eta_mins) }
      : {})
  };

  await writeOrder(MENULINX_KV, updatedOrder);

  return new Response(
    JSON.stringify({ ok: true }),
    { headers: { "content-type": "application/json" } }
  );
};
