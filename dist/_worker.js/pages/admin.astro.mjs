globalThis.process ??= {}; globalThis.process.env ??= {};
import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_CUol773d.mjs';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_C28_ms2T.mjs';
export { renderers } from '../renderers.mjs';

const $$Admin = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$BaseLayout, { "title": "MenuLinx Admin" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<h1>Admin Dashboard</h1> <p> <a href="/admin/orders">Orders</a> |
<a href="/admin/settings">Settings</a> </p> <p>Use dedicated pages for structured management.</p> ` })}`;
}, "C:/VTL/menulinx-gen1/src/pages/admin.astro", void 0);

const $$file = "C:/VTL/menulinx-gen1/src/pages/admin.astro";
const $$url = "/admin";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Admin,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
