// public/admin/orders.js

const VENUE_ID = "default"; // set once per venue

async function loadOrders() {
  const res = await fetch(`/api/admin/orders?venueId=${VENUE_ID}`);
  const data = await res.json();

  const container = document.getElementById("orders");
  container.innerHTML = "";

  if (!data.ok || data.orders.length === 0) {
    container.innerHTML = "<p>No orders yet.</p>";
    return;
  }

  for (const order of data.orders) {
    const div = document.createElement("div");
    div.className = "order";

    const status = order.status || "NEW";

    div.innerHTML = `
      <div class="order-header">
        <span>${order.orderId}</span>
        <span>${new Date(order.createdAt).toLocaleTimeString()}</span>
      </div>

      <div class="order-meta">
        Status: <strong>${status}</strong><br />
        Ready ~ ${new Date(order.estimatedReadyAt).toLocaleTimeString()}<br />
        ${order.customerName} — ${order.customerContact}
      </div>

      <div class="items">
        ${order.items
          .map((i) => `<div>${i.qty} × ${i.name}</div>`)
          .join("")}
      </div>

      ${
        order.customerNote
          ? `<div class="note">Note: ${order.customerNote}</div>`
          : ""
      }

      <div class="controls">
        ${renderControls(order)}
      </div>
    `;

    container.appendChild(div);
  }
}

function renderControls(order) {
  const id = order.orderId;
  const status = order.status || "NEW";

  if (status === "NEW") {
    return `
      <input type="number" min="1" placeholder="ETA (mins)" id="eta-${id}" />
      <button onclick="acceptOrder('${id}')">Accept</button>
    `;
  }

  if (status === "ACCEPTED") {
    return `
      <button onclick="updateStatus('${id}', 'READY')">Mark Ready</button>
    `;
  }

  if (status === "READY") {
    return `
      <button onclick="updateStatus('${id}', 'DESPATCHED')">Despatched</button>
      <button class="secondary" onclick="updateStatus('${id}', 'COLLECTED')">Collected</button>
    `;
  }

  return "";
}

async function acceptOrder(orderId) {
  const etaInput = document.getElementById(`eta-${orderId}`);
  const eta_mins =
    etaInput && etaInput.value ? Number(etaInput.value) : undefined;

  await sendUpdate(orderId, "ACCEPTED", eta_mins);
}

async function updateStatus(orderId, status) {
  await sendUpdate(orderId, status);
}

async function sendUpdate(orderId, status, eta_mins) {
  await fetch("/api/admin/order-update", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      venueId: VENUE_ID,
      orderId,
      status,
      eta_mins,
    }),
  });

  // reload orders after update
  await loadOrders();
}

// initial load
loadOrders();

// auto-refresh every 20s
setInterval(loadOrders, 20000);
