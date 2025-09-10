// package.json: { "type": "module" } OR use require() if CommonJS
import express from "express";
import cors from "cors";
import CoinMarketCap from "coinmarketcap-api";
import "dotenv/config";

const app = express();
app.use(cors());

const client = new CoinMarketCap(process.env.CMC_API_KEY);

app.get("/api/listings", async (_req, res) => {
  try {
    const data = await client.getTickers();
    // After fetching tickers
    const ids = data.data.map((coin) => coin.id).join(",");
    const info = await client.getMetadata({ id: ids });
    const coinsWithLogos = data.data.map((coin) => ({
      ...coin,
      logo: info.data[coin.id]?.logo,
    }));
    res.json({ data: coinsWithLogos });
  } catch (e) {
    console.error("API error:", e); // Add this line
    res.status(500).json({ error: e.message });
  }
});

app.listen(3001, () => console.log("API on http://localhost:3001"));
