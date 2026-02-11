globalThis.process ??= {}; globalThis.process.env ??= {};
const keyVenue = (venueId) => `venue:${venueId}`;
const keyVenueList = () => `venues:index`;
async function getVenue(kv, venueId) {
  const raw = await kv.get(keyVenue(venueId));
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}
async function writeVenue(kv, venue) {
  await kv.put(keyVenue(venue.venueId), JSON.stringify(venue));
  const idxRaw = await kv.get(keyVenueList());
  let ids = [];
  try {
    ids = idxRaw ? JSON.parse(idxRaw) : [];
  } catch {
    ids = [];
  }
  if (!ids.includes(venue.venueId)) {
    ids.push(venue.venueId);
    await kv.put(keyVenueList(), JSON.stringify(ids));
  }
}
function makeVenueDefaults(venueId, name = "New Venue") {
  const now = Date.now();
  return {
    venueId,
    name,
    status: "OPEN",
    prepMinutes: 15,
    collectionEnabled: true,
    deliveryEnabled: false,
    createdAt: now,
    updatedAt: now
  };
}

export { getVenue as g, makeVenueDefaults as m, writeVenue as w };
