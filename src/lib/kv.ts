// src/lib/kv.ts
import type { App } from "../types/app";

export type KVNamespaceLike = {
  get(key: string): Promise<string | null>;
  put(key: string, value: string): Promise<void>;
  delete(key: string): Promise<void>;
  list?(options?: { prefix?: string }): Promise<{ keys: Array<{ name: string }> }>;
};

export type RuntimeEnv = {
  MENULINX_KV: KVNamespaceLike;
};

export function getEnv(locals: App.Locals): RuntimeEnv {
  const env = locals?.runtime?.env as RuntimeEnv | undefined;
  if (!env?.MENULINX_KV) {
    throw new Error("Missing Cloudflare KV binding: MENULINX_KV");
  }
  return env;
}

export async function kvGetJSON<T>(
  kv: KVNamespaceLike,
  key: string
): Promise<T | null> {
  const raw = await kv.get(key);
  if (!raw) return null;
  return JSON.parse(raw) as T;
}

export async function kvPutJSON(
  kv: KVNamespaceLike,
  key: string,
  value: unknown
): Promise<void> {
  await kv.put(key, JSON.stringify(value));
}
