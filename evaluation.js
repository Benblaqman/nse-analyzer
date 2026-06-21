// evaluation.js
async function processAssetEvaluation() {
  const ticker = document.getElementById("tickerInput").value.trim().toUpperCase();
  const status = document.getElementById("statusFeedback");

  if (!ticker) {
    status.textContent = "Please enter a valid ticker symbol.";
    return;
  }

  status.textContent = "Fetching live data…";

  try {
    const response = await fetch("https://sheetdb.io/api/v1/ryq6j7fbhinf0");
    const data = await response.json();

    // Clear old card before update
    document.getElementById("valuationCard").classList.add("hidden");

    const record = data.find(row => row.Ticker?.toUpperCase() === ticker);

    if (!record) {
      status.textContent = `No data found for ${ticker}.`;
      return;
    }

    document.getElementById("outCompanyName").textContent = record.Company || "Unknown Company";
    document.getElementById("outTicker").textContent = ticker;
    document.getElementById("outScore").textContent = record.Score || "N/A";
    document.getElementById("outDivYield").textContent = record.DividendYield ? record.DividendYield + "%" : "N/A";
    document.getElementById("outYieldSpread").textContent = record.YieldSpread ? record.YieldSpread + "%" : "N/A";
    document.getElementById("outVerdict").textContent = record.Verdict || "No guidance available.";

    document.getElementById("valuationCard").classList.remove("hidden");
    status.textContent = "Analysis complete.";
  } catch (err) {
    console.error(err);
    status.textContent = "Error fetching data.";
  }
}
