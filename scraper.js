const axios = require("axios");
const cheerio = require("cheerio");

exports.handler = async function(event, context) {
  try {
    // Scrape NSE market statistics page
    const res = await axios.get("https://www.nse.co.ke/market-statistics/");
    const $ = cheerio.load(res.data);

    let results = [];
    $("table tbody tr").each((i, el) => {
      const ticker = $(el).find("td").eq(0).text().trim();
      const company = $(el).find("td").eq(1).text().trim();
      const price = $(el).find("td").eq(2).text().trim();

      if (ticker) {
        results.push({
          Ticker: ticker,
          Company: company,
          Score: price, // placeholder until you calculate
          DividendYield: "N/A",
          YieldSpread: "N/A",
          Verdict: "Pending analysis"
        });
      }
    });

    // Push scraped data into SheetDB
    await axios.post("https://sheetdb.io/api/v1/ryq6j7fbhinf0", { data: results });

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "SheetDB updated", count: results.length })
    };
  } catch (err) {
    console.error(err);
    return { statusCode: 500, body: "Scraper failed" };
  }
};
