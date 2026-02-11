globalThis.process ??= {}; globalThis.process.env ??= {};
import { e as createComponent, n as renderHead, o as renderSlot, r as renderTemplate, h as createAstro } from './astro/server_CUol773d.mjs';
/* empty css                         */

const $$Astro = createAstro();
const $$BaseLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$BaseLayout;
  const { title } = Astro2.props;
  return renderTemplate`<html lang="en" data-astro-cid-37fxchfa> <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${title ?? "MenuLinx"}</title>${renderHead()}</head> <body data-astro-cid-37fxchfa> ${renderSlot($$result, $$slots["default"])} </body></html>`;
}, "C:/VTL/menulinx-gen1/src/layouts/BaseLayout.astro", void 0);

export { $$BaseLayout as $ };
