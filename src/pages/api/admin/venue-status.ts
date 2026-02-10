// src/pages/api/admin/venue-status.ts
import type { APIRoute } from "astro";
import { getEnv } from "../../../lib/kv";
import { getVenue, setVenueOpenClosed } from "../../../lib/venue";

type Payload = {
  venueId: string;
  isOpen: boolean;
};

function badRequest(message: string) {
  return new Response(JSON.stringify({ ok: false, error: message }), {
    status: 400,
    headers: { "content-type": "application/json" },
  });
}

export const GET: APIRoute = async ({ url, locals }) => {
  const { MENULINX_KV } = getEnv(locals);
  const venueId = (url.searchParams.get("venueId") || "").trim();
  if (!venueId) return badRequest("Missing venueId");

  const venue = await getVenue(MENULINX_KV, venueId);
  return new Response(JSON.stringify({ ok: true, venue }), {
    status: 200,
    headers: { "content-type": "application/json" },
  });
};

export const POST: APIRoute = async ({ request, locals }) => {
  const { MENULINX_KV } = getEnv(locals);

  let payload: Payload;
  try {
    payload = (await request.json()) as Payload;
  } catch {
    return badRequest("Invalid JSON");
  }

  const venueId = (payload.venueId || "").trim();
  if (!venueId) return badRequest("Missing venueId");

  const isOpen = !!payload.isOpen;
  const venue = await setVenueOpenClosed(MENULINX_KV, venueId, isOpen);

  return new Response(JSON.stringify({ ok: true, venue }), {
    status: 200,
    headers: { "content-type": "application/json" },
  });
};
