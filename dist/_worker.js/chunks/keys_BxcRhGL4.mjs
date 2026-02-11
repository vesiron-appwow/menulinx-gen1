globalThis.process ??= {}; globalThis.process.env ??= {};
const keyMenu = (venueId) => `menu:${venueId}`;
const keyOrder = (orderId) => `order:${orderId}`;
const keyOrdersIndex = (venueId) => `orders:${venueId}`;

export { keyOrder as a, keyOrdersIndex as b, keyMenu as k };
