import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";

// Dummy generators
function randomOrders(type = "buy", count = 10, price = 10000) {
  return Array.from({ length: count }, (_, i) => ({
    price: (type === "buy" ? price - Math.random() * 100 : price + Math.random() * 100).toFixed(2),
    amount: (Math.random() * 2).toFixed(4),
    total: (Math.random() * 20000).toFixed(2),
  }));
}

function randomTrades(count = 15, price = 10000) {
  return Array.from({ length: count }, (_, i) => ({
    price: (price + (Math.random() - 0.5) * 100).toFixed(2),
    amount: (Math.random() * 2).toFixed(4),
    time: `${new Date(Date.now() - i * 60000).toLocaleTimeString()}`,
    side: Math.random() > 0.5 ? "buy" : "sell",
  }));
}

function randomTradingData(price = 10000) {
  return {
    open: (price + Math.random() * 50).toFixed(2),
    high: (price + Math.random() * 100).toFixed(2),
    low: (price - Math.random() * 100).toFixed(2),
    close: price.toFixed(2),
    change: (Math.random() * 5 - 2.5).toFixed(2),
    percentChange: (Math.random() * 2 - 1).toFixed(2),
  };
}

const TABS = ["Order Book", "Trades", "Info", "Trading Data"];

export default function CoinDetail() {
  const { id } = useParams();
  const [coin, setCoin] = useState(null);
  const [activeTab, setActiveTab] = useState(TABS[0]);

  useEffect(() => {
    fetch("http://localhost:3001/api/listings")
      .then(res => res.json())
      .then(data => {
        const found = data.data.find(c => String(c.id) === id);
        setCoin(found);
      });
  }, [id]);

  if (!coin) return (
    <>
      <Navbar />
      <div className="text-center text-white mt-20">Loading...</div>
    </>
  );

  // Use real price for dummy data generation
  const price = coin.quote.USD.price;
  const buyOrders = randomOrders("buy", 10, price);
  const sellOrders = randomOrders("sell", 10, price);
  const trades = randomTrades(15, price);
  const tradingData = randomTradingData(price);

  return (
    <>
      <Navbar />
      <div className="max-w-5xl mx-auto mt-10 p-8 bg-zinc-900 rounded-xl shadow-lg text-white">
        {/* Coin Header */}
        <div className="flex items-center gap-6 mb-8">
          {coin.logo && <img src={coin.logo} alt={coin.name} className="w-20 h-20 rounded-full" />}
          <div>
            <h1 className="text-4xl font-bold">{coin.name} <span className="text-2xl text-zinc-400">({coin.symbol})</span></h1>
            <div className="text-zinc-400 text-lg">{coin.slug}</div>
            <div className="mt-2 flex gap-8 text-xl">
              <span>Price: <span className="font-bold">${price.toFixed(2)}</span></span>
              <span>
                24h Change: <span className={coin.quote.USD.percent_change_24h >= 0 ? "text-green-400" : "text-red-400"}>
                  {coin.quote.USD.percent_change_24h.toFixed(2)}%
                </span>
              </span>
            </div>
            <div className="mt-2 text-zinc-400 text-sm">
              Market Cap: ${coin.quote.USD.market_cap.toLocaleString()} &nbsp;|&nbsp;
              Volume 24h: ${coin.quote.USD.volume_24h.toLocaleString()}
            </div>
          </div>
        </div>
        {/* Tabs */}
        <div className="flex gap-6 mb-8 border-b border-zinc-700">
          {TABS.map(tab => (
            <button
              key={tab}
              className={`py-2 px-4 font-semibold border-b-2 transition ${
                activeTab === tab ? "border-cyan-400 text-cyan-400" : "border-transparent text-zinc-400"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
        {/* Tab Content */}
        <div>
          {activeTab === "Order Book" && (
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h2 className="text-xl font-bold mb-2 text-green-400">Buy Orders</h2>
                <table className="w-full text-sm">
                  <thead>
                    <tr>
                      <th>Price</th>
                      <th>Amount</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {buyOrders.map((order, i) => (
                      <tr key={i} className="bg-zinc-800">
                        <td className="text-green-400">${order.price}</td>
                        <td>{order.amount}</td>
                        <td>{order.total}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div>
                <h2 className="text-xl font-bold mb-2 text-red-400">Sell Orders</h2>
                <table className="w-full text-sm">
                  <thead>
                    <tr>
                      <th>Price</th>
                      <th>Amount</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sellOrders.map((order, i) => (
                      <tr key={i} className="bg-zinc-800">
                        <td className="text-red-400">${order.price}</td>
                        <td>{order.amount}</td>
                        <td>{order.total}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          {activeTab === "Trades" && (
            <div>
              <h2 className="text-xl font-bold mb-4">Recent Trades</h2>
              <table className="w-full text-sm">
                <thead>
                  <tr>
                    <th>Time</th>
                    <th>Price</th>
                    <th>Amount</th>
                    <th>Side</th>
                  </tr>
                </thead>
                <tbody>
                  {trades.map((trade, i) => (
                    <tr key={i} className="bg-zinc-800">
                      <td>{trade.time}</td>
                      <td className={trade.side === "buy" ? "text-green-400" : "text-red-400"}>${trade.price}</td>
                      <td>{trade.amount}</td>
                      <td className={trade.side === "buy" ? "text-green-400" : "text-red-400"}>{trade.side}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {activeTab === "Info" && (
            <div>
              <h2 className="text-xl font-bold mb-4">Info</h2>
              <ul className="text-zinc-300 space-y-2">
                <li><strong>Symbol:</strong> {coin.symbol}</li>
                <li><strong>Market Cap:</strong> ${coin.quote.USD.market_cap.toLocaleString()}</li>
                <li><strong>Circulating Supply:</strong> {coin.circulating_supply?.toLocaleString() || "N/A"}</li>
                <li><strong>Max Supply:</strong> {coin.max_supply?.toLocaleString() || "N/A"}</li>
                <li><strong>24h Volume:</strong> ${coin.quote.USD.volume_24h.toLocaleString()}</li>
                <li><strong>Website:</strong> <a href={`https://www.google.com/search?q=${coin.name}+crypto`} className="text-cyan-400 underline" target="_blank" rel="noopener noreferrer">Search {coin.name}</a></li>
                <li><strong>Whitepaper:</strong> <a href={`https://www.google.com/search?q=${coin.name}+whitepaper`} className="text-cyan-400 underline" target="_blank" rel="noopener noreferrer">Find PDF</a></li>
              </ul>
            </div>
          )}
          {activeTab === "Trading Data" && (
            <div>
              <h2 className="text-xl font-bold mb-4">Trading Data</h2>
              <div className="grid grid-cols-2 gap-6 text-lg">
                <div><strong>Open:</strong> ${tradingData.open}</div>
                <div><strong>High:</strong> ${tradingData.high}</div>
                <div><strong>Low:</strong> ${tradingData.low}</div>
                <div><strong>Close:</strong> ${tradingData.close}</div>
                <div>
                  <strong>Change:</strong>{" "}
                  <span className={tradingData.change >= 0 ? "text-green-400" : "text-red-400"}>
                    {tradingData.change}
                  </span>
                </div>
                <div>
                  <strong>% Change:</strong>{" "}
                  <span className={tradingData.percentChange >= 0 ? "text-green-400" : "text-red-400"}>
                    {tradingData.percentChange}%
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
