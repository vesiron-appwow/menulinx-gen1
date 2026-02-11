globalThis.process ??= {}; globalThis.process.env ??= {};
import { p as decodeKey } from './chunks/astro/server_CUol773d.mjs';
import './chunks/astro-designed-error-pages_C-jSOVA3.mjs';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/noop-middleware_DPc_bJeU.mjs';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///C:/VTL/menulinx-gen1/","cacheDir":"file:///C:/VTL/menulinx-gen1/node_modules/.astro/","outDir":"file:///C:/VTL/menulinx-gen1/dist/","srcDir":"file:///C:/VTL/menulinx-gen1/src/","publicDir":"file:///C:/VTL/menulinx-gen1/public/","buildClientDir":"file:///C:/VTL/menulinx-gen1/dist/","buildServerDir":"file:///C:/VTL/menulinx-gen1/dist/_worker.js/","adapterName":"@astrojs/cloudflare","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/@astrojs/cloudflare/dist/entrypoints/image-endpoint.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":"body{font-family:system-ui,-apple-system,sans-serif;margin:40px;background:#f7f7f7}h1[data-astro-cid-37fxchfa],h2[data-astro-cid-37fxchfa],h3[data-astro-cid-37fxchfa]{margin-top:0}button[data-astro-cid-37fxchfa]{padding:8px 12px;margin:4px 0;cursor:pointer}input[data-astro-cid-37fxchfa]{padding:6px;margin:4px 0}section[data-astro-cid-37fxchfa]{background:#fff;padding:20px;margin-bottom:20px;border-radius:6px;box-shadow:0 2px 6px #0000000d}\n"}],"routeData":{"route":"/admin","isIndex":false,"type":"page","pattern":"^\\/admin\\/?$","segments":[[{"content":"admin","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/admin.astro","pathname":"/admin","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/admin/menu-seed","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/admin\\/menu-seed\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}],[{"content":"menu-seed","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/admin/menu-seed.ts","pathname":"/api/admin/menu-seed","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/admin/order-check","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/admin\\/order-check\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}],[{"content":"order-check","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/admin/order-check.ts","pathname":"/api/admin/order-check","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/admin/order-update","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/admin\\/order-update\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}],[{"content":"order-update","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/admin/order-update.ts","pathname":"/api/admin/order-update","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/admin/orders","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/admin\\/orders\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}],[{"content":"orders","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/admin/orders.ts","pathname":"/api/admin/orders","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/admin/venue-settings","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/admin\\/venue-settings\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}],[{"content":"venue-settings","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/admin/venue-settings.ts","pathname":"/api/admin/venue-settings","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/admin/venue-status","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/admin\\/venue-status\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"admin","dynamic":false,"spread":false}],[{"content":"venue-status","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/admin/venue-status.ts","pathname":"/api/admin/venue-status","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/menu","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/menu\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"menu","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/menu.ts","pathname":"/api/menu","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/orders","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/orders\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"orders","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/orders.ts","pathname":"/api/orders","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/ping","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/ping\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"ping","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/ping.ts","pathname":"/api/ping","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":"body{font-family:system-ui,-apple-system,sans-serif;margin:40px;background:#f7f7f7}h1[data-astro-cid-37fxchfa],h2[data-astro-cid-37fxchfa],h3[data-astro-cid-37fxchfa]{margin-top:0}button[data-astro-cid-37fxchfa]{padding:8px 12px;margin:4px 0;cursor:pointer}input[data-astro-cid-37fxchfa]{padding:6px;margin:4px 0}section[data-astro-cid-37fxchfa]{background:#fff;padding:20px;margin-bottom:20px;border-radius:6px;box-shadow:0 2px 6px #0000000d}\n"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["C:/VTL/menulinx-gen1/src/pages/admin.astro",{"propagation":"none","containsHead":true}],["C:/VTL/menulinx-gen1/src/pages/index.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000astro-internal:middleware":"_astro-internal_middleware.mjs","\u0000virtual:astro:actions/noop-entrypoint":"noop-entrypoint.mjs","\u0000@astro-page:src/pages/admin@_@astro":"pages/admin.astro.mjs","\u0000@astro-page:src/pages/api/admin/menu-seed@_@ts":"pages/api/admin/menu-seed.astro.mjs","\u0000@astro-page:src/pages/api/admin/order-check@_@ts":"pages/api/admin/order-check.astro.mjs","\u0000@astro-page:src/pages/api/admin/order-update@_@ts":"pages/api/admin/order-update.astro.mjs","\u0000@astro-page:src/pages/api/admin/orders@_@ts":"pages/api/admin/orders.astro.mjs","\u0000@astro-page:src/pages/api/admin/venue-settings@_@ts":"pages/api/admin/venue-settings.astro.mjs","\u0000@astro-page:src/pages/api/admin/venue-status@_@ts":"pages/api/admin/venue-status.astro.mjs","\u0000@astro-page:src/pages/api/menu@_@ts":"pages/api/menu.astro.mjs","\u0000@astro-page:src/pages/api/orders@_@ts":"pages/api/orders.astro.mjs","\u0000@astro-page:src/pages/api/ping@_@ts":"pages/api/ping.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"index.js","\u0000@astro-renderers":"renderers.mjs","\u0000@astro-page:node_modules/@astrojs/cloudflare/dist/entrypoints/image-endpoint@_@js":"pages/_image.astro.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_CfpSEB2A.mjs","C:/VTL/menulinx-gen1/node_modules/unstorage/drivers/cloudflare-kv-binding.mjs":"chunks/cloudflare-kv-binding_DMly_2Gl.mjs","C:/VTL/menulinx-gen1/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_BNe5PnsY.mjs","C:/VTL/menulinx-gen1/src/pages/index.astro?astro&type=script&index=0&lang.ts":"_astro/index.astro_astro_type_script_index_0_lang.CLZE4hug.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["C:/VTL/menulinx-gen1/src/pages/index.astro?astro&type=script&index=0&lang.ts","let o=null,d=[];async function l(){const n=await(await fetch(\"/api/menu?venueId=default\")).json();if(!n.ok){document.getElementById(\"menu\").innerText=\"Menu unavailable\";return}o=n.menu,u()}function u(){const e=document.getElementById(\"menu\");e.innerHTML=\"\",o.sections.forEach(n=>{const a=document.createElement(\"h2\");a.innerText=n.title,e.appendChild(a),n.items.forEach(t=>{const c=document.createElement(\"button\");c.innerText=`${t.name} - £${(t.pricePence/100).toFixed(2)}`,c.onclick=()=>i(t),e.appendChild(c),e.appendChild(document.createElement(\"br\"))})})}function i(e){d.push(e),r()}function r(){const e=document.getElementById(\"basket\");e.innerHTML=\"\";let n=0;d.forEach(a=>{const t=document.createElement(\"li\");t.innerText=a.name,e.appendChild(t),n+=a.pricePence}),document.getElementById(\"total\").innerText=(n/100).toFixed(2)}l();"]],"assets":["/manifest.webmanifest","/sw.js","/_worker.js/index.js","/_worker.js/noop-entrypoint.mjs","/_worker.js/renderers.mjs","/_worker.js/_@astrojs-ssr-adapter.mjs","/_worker.js/_astro-internal_middleware.mjs","/_worker.js/chunks/astro-designed-error-pages_C-jSOVA3.mjs","/_worker.js/chunks/astro_Ci645qWr.mjs","/_worker.js/chunks/BaseLayout_C28_ms2T.mjs","/_worker.js/chunks/cloudflare-kv-binding_DMly_2Gl.mjs","/_worker.js/chunks/image-endpoint_BDIz1t71.mjs","/_worker.js/chunks/index_DIu1XPrI.mjs","/_worker.js/chunks/keys_BxcRhGL4.mjs","/_worker.js/chunks/kv_CaNHy7I2.mjs","/_worker.js/chunks/noop-middleware_DPc_bJeU.mjs","/_worker.js/chunks/orders_DuN7cTMi.mjs","/_worker.js/chunks/path_CH3auf61.mjs","/_worker.js/chunks/remote_CrdlObHx.mjs","/_worker.js/chunks/sharp_BNe5PnsY.mjs","/_worker.js/chunks/venue_CDMwiKbU.mjs","/_worker.js/chunks/_@astrojs-ssr-adapter_DnnCkchv.mjs","/_worker.js/pages/admin.astro.mjs","/_worker.js/pages/index.astro.mjs","/_worker.js/pages/_image.astro.mjs","/_worker.js/chunks/astro/server_CUol773d.mjs","/_worker.js/pages/api/menu.astro.mjs","/_worker.js/pages/api/orders.astro.mjs","/_worker.js/pages/api/ping.astro.mjs","/_worker.js/pages/api/admin/menu-seed.astro.mjs","/_worker.js/pages/api/admin/order-check.astro.mjs","/_worker.js/pages/api/admin/order-update.astro.mjs","/_worker.js/pages/api/admin/orders.astro.mjs","/_worker.js/pages/api/admin/venue-settings.astro.mjs","/_worker.js/pages/api/admin/venue-status.astro.mjs"],"buildFormat":"directory","checkOrigin":true,"allowedDomains":[],"serverIslandNameMap":[],"key":"clc3LVTwY13pyhhkZJBeocTMX6OEhfuPpGWzfqKb/X0=","sessionConfig":{"driver":"cloudflare-kv-binding","options":{"binding":"SESSION"}}});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = () => import('./chunks/cloudflare-kv-binding_DMly_2Gl.mjs');

export { manifest };
