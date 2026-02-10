const VENUE_ID = "default";

const el = (id) => document.getElementById(id);

function toast(msg){
  const t = el("toast");
  t.textContent = msg;
  t.classList.add("show");
  setTimeout(()=>t.classList.remove("show"),2500);
}

async function loadSettings(){
  try{
    const r = await fetch(`/api/admin/venue-settings?venueId=${VENUE_ID}`);
    const j = await r.json();
    if(j.ok && j.email){
      el("email").value = j.email;
    }
  }catch{}
}

async function saveSettings(){
  const email = el("email").value.trim();

  try{
    const r = await fetch("/api/admin/venue-settings",{
      method:"POST",
      headers:{ "content-type":"application/json" },
      body:JSON.stringify({
        venueId: VENUE_ID,
        email: email || null
      })
    });
    const j = await r.json();
    if(j.ok){
      toast("Saved");
    }else{
      toast(j.error || "Save failed");
    }
  }catch{
    toast("Network error");
  }
}

el("saveBtn").addEventListener("click", saveSettings);

loadSettings();
