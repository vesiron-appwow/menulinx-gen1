globalThis.process ??= {}; globalThis.process.env ??= {};
import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead, l as renderScript } from '../chunks/astro/server_CUol773d.mjs';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_C28_ms2T.mjs';
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$BaseLayout, { "title": "MenuLinx" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<h1>Menu</h1> <div id="menu"></div> <h2>Basket</h2> <ul id="basket"></ul> <p><strong>Total: £<span id="total">0.00</span></strong></p> <h3>Customer Name</h3> <input id="customerName"> <br><br> <button onclick="placeOrder()">Place Order</button> ${renderScript($$result2, "C:/VTL/menulinx-gen1/src/pages/index.astro?astro&type=script&index=0&lang.ts")} ` })}`;
}, "C:/VTL/menulinx-gen1/src/pages/index.astro", void 0);

const $$file = "C:/VTL/menulinx-gen1/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
