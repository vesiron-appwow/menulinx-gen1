import type { APIRoute } from "astro";
import { getEnv } from "../../../lib/kv";
import { getOrder, writeOrder } from "../../../lib/orders";

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

  const venueId = String(payload.venueId || "").trim();
  const orderId = String(payload.orderId || "").trim();
  const status = String(payload.status || "").trim();

  if(!venueId || !orderId || !status){
    return new Response(JSON.stringify({ ok:false,error:"Missing fields" }), {
      status:400,
      headers:{ "content-type":"application/json" }
    });
  }

  const order = await getOrder(MENULINX_KV, orderId);
  if(!order || order.venueId !== venueId){
    return new Response(JSON.stringify({ ok:false,error:"Order not found" }), {
      status:404,
      headers:{ "content-type":"application/json" }
    });
  }

  order.status = status;

  if(status==="ACCEPTED" && Number.isFinite(payload.eta_mins)){
    order.eta_mins = Number(payload.eta_mins);
  }

  await writeOrder(MENULINX_KV, order);

  return new Response(JSON.stringify({ ok:true }), {
    headers:{ "content-type":"application/json" }
  });
};
git status