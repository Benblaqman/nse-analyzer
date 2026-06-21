// admin.js
function verifySecurityGate() {
  const key = document.getElementById("securityKeyField").value;
  if (key === "admin123") { // Replace with your real logic
    document.getElementById("authGateBlock").classList.add("hidden");
    document.getElementById("unlockedLogFrame").classList.remove("hidden");
  } else {
    alert("Invalid key. Access denied.");
  }
}

async function fetchHistoryRegistry() {
  const list = document.getElementById("registryDataList");
  list.innerHTML = ""; // clear before update

  try {
    const response = await fetch("https://sheetdb.io/api/v1/ryq6j7fbhinf0");
    const data = await response.json();

    data.forEach(row => {
      const li = document.createElement("li");
      li.textContent = `${row.Ticker}: ${row.Score}`;
      li.className = "text-slate-300 text-sm py-1";
      list.appendChild(li);
    });
  } catch (err) {
    console.error(err);
    const li = document.createElement("li");
    li.textContent = "Error loading registry.";
    li.className = "text-red-400 text-sm py-1";
    list.appendChild(li);
  }
}
