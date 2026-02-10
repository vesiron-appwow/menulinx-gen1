// src/lib/venue.ts
import type { KVNamespaceLike } from "./kv";
import { kvGetJSON, kvPutJSON } from "./kv";
import { keyVenue } from "./keys";

export type VenueRecord = {
  venueId: string;
  name: string;
  isOpen: boolean;
  prepMinutes: number; // venue-set only
  updatedAt: string;   // ISO
};

export function defaultVenue(venueId: string): VenueRecord {
  return {
    venueId,
    name: "Venue",
    isOpen: true,
    prepMinutes: 15,
    updatedAt: new Date().toISOString(),
  };
}

export async function getVenue(kv: KVNamespaceLike, venueId: string): Promise<VenueRecord> {
  const existing = await kvGetJSON<VenueRecord>(kv, keyVenue(venueId));
  if (existing) return existing;

  const created = defaultVenue(venueId);
  await kvPutJSON(kv, keyVenue(venueId), created);
  return created;
}

export async function setVenueOpenClosed(
  kv: KVNamespaceLike,
  venueId: string,
  isOpen: boolean
): Promise<VenueRecord> {
  const venue = await getVenue(kv, venueId);
  const updated: VenueRecord = {
    ...venue,
    isOpen,
    updatedAt: new Date().toISOString(),
  };
  await kvPutJSON(kv, keyVenue(venueId), updated);
  return updated;
}
