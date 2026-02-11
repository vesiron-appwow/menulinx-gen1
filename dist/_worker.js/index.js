globalThis.process ??= {}; globalThis.process.env ??= {};
import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_DnnCkchv.mjs';
import { manifest } from './manifest_CfpSEB2A.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/admin.astro.mjs');
const _page2 = () => import('./pages/api/admin/menu-seed.astro.mjs');
const _page3 = () => import('./pages/api/admin/order-check.astro.mjs');
const _page4 = () => import('./pages/api/admin/order-update.astro.mjs');
const _page5 = () => import('./pages/api/admin/orders.astro.mjs');
const _page6 = () => import('./pages/api/admin/venue-settings.astro.mjs');
const _page7 = () => import('./pages/api/admin/venue-status.astro.mjs');
const _page8 = () => import('./pages/api/menu.astro.mjs');
const _page9 = () => import('./pages/api/orders.astro.mjs');
const _page10 = () => import('./pages/api/ping.astro.mjs');
const _page11 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/@astrojs/cloudflare/dist/entrypoints/image-endpoint.js", _page0],
    ["src/pages/admin.astro", _page1],
    ["src/pages/api/admin/menu-seed.ts", _page2],
    ["src/pages/api/admin/order-check.ts", _page3],
    ["src/pages/api/admin/order-update.ts", _page4],
    ["src/pages/api/admin/orders.ts", _page5],
    ["src/pages/api/admin/venue-settings.ts", _page6],
    ["src/pages/api/admin/venue-status.ts", _page7],
    ["src/pages/api/menu.ts", _page8],
    ["src/pages/api/orders.ts", _page9],
    ["src/pages/api/ping.ts", _page10],
    ["src/pages/index.astro", _page11]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./noop-entrypoint.mjs'),
    middleware: () => import('./_astro-internal_middleware.mjs')
});
const _args = undefined;
const _exports = createExports(_manifest);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) {
	serverEntrypointModule[_start](_manifest, _args);
}

export { __astrojsSsrVirtualEntry as default, pageMap };
