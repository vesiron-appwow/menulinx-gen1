// public/admin/venue-status.js

const VENUE_ID = "default"; // lock per venue

const statusEl = document.getElementById("currentStatus");

async function loadStatus() {
  const res = await fetch(`/api/admin/venue-status?venueId=${VENUE_ID}`);
  const data = await res.json();

  if (!data.ok) {
    statusEl.textContent = "ERROR";
    return;
  }

  statusEl.textContent = data.venue.isOpen ? "OPEN" : "CLOSED";
}

async function setStatus(isOpen) {
  const res = await fetch("/api/admin/venue-status", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      venueId: VENUE_ID,
      isOpen
    })
  });

  const data = await res.json();
  if (!data.ok) {
    alert("Failed to update status");
    return;
  }

  loadStatus();
}

// initial load
loadStatus();
