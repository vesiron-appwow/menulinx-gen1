globalThis.process ??= {}; globalThis.process.env ??= {};
export { renderers } from '../../renderers.mjs';

const GET = async () => {
  return new Response("PING OK", { status: 200 });
};
const POST = async () => {
  return new Response("POST OK", { status: 200 });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
