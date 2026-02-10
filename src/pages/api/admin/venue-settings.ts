import type { APIRoute } from "astro";
import { getEnv } from "../../../lib/kv";
import { getVenue, writeVenue } from "../../../lib/venue";

export const GET: APIRoute = async ({ request, locals }) => {
  const url = new URL(request.url);
  const venueId = (url.searchParams.get("venueId") || "").trim();
  if (!venueId) {
    return new Response(JSON.stringify({ ok:false,error:"Missing venueId" }), {
      status:400,
      headers:{ "content-type":"application/json" }
    });
  }

  const { MENULINX_KV } = getEnv(locals);
  const venue = await getVenue(MENULINX_KV, venueId);

  return new Response(
    JSON.stringify({ ok:true, email: venue.email || "" }),
    { headers:{ "content-type":"application/json" } }
  );
};

export const POST: APIRoute = async ({ request, locals }) => {
  const { MENULINX_KV } = getEnv(locals);

  let payload:any;
  try{
    payload = await request.json();
  }catch{
    return new Response(JSON.stringify({ ok:false,error:"Invalid JSON" }), {
      status:400,
      headers:{ "content-type":"application/json" }
    });
  }

  const venueId = (payload.venueId || "").trim();
  if (!venueId) {
    return new Response(JSON.stringify({ ok:false,error:"Missing venueId" }), {
      status:400,
      headers:{ "content-type":"application/json" }
    });
  }

  const venue = await getVenue(MENULINX_KV, venueId);

  const email =
    typeof payload.email === "string" && payload.email.trim()
      ? payload.email.trim()
      : undefined;

  venue.email = email;

  await writeVenue(MENULINX_KV, venueId, venue);

  return new Response(
    JSON.stringify({ ok:true }),
    { headers:{ "content-type":"application/json" } }
  );
};
