globalThis.process ??= {}; globalThis.process.env ??= {};
const devStore = /* @__PURE__ */ new Map();
const devKV = {
  async get(key) {
    return devStore.has(key) ? devStore.get(key) : null;
  },
  async put(key, value) {
    devStore.set(key, value);
  },
  async delete(key) {
    devStore.delete(key);
  },
  async list(options) {
    const keys = Array.from(devStore.keys()).filter((k) => !options?.prefix || k.startsWith(options.prefix)).map((name) => ({ name }));
    return { keys };
  }
};
function getEnv(locals) {
  const env = locals?.runtime?.env;
  if (env?.MENULINX_KV) {
    return { MENULINX_KV: env.MENULINX_KV };
  }
  return { MENULINX_KV: devKV };
}
async function kvGetJSON(kv, key) {
  const raw = await kv.get(key);
  if (!raw) return null;
  return JSON.parse(raw);
}
async function kvPutJSON(kv, key, value) {
  await kv.put(key, JSON.stringify(value));
}

export { kvPutJSON as a, getEnv as g, kvGetJSON as k };
