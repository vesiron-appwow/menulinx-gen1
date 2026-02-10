// public/admin/order-check.js

async function check() {
  const id = document.getElementById("orderId").value.trim();
  const out = document.getElementById("result");
  out.textContent = "";

  if (!id) {
    out.textContent = "Enter an Order ID.";
    return;
  }

  const res = await fetch(`/api/admin/order-check?orderId=${encodeURIComponent(id)}`);
  const data = await res.json();

  out.textContent = JSON.stringify(data, null, 2);
}
