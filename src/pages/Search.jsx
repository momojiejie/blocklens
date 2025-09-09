import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { Line } from "react-chartjs-2";
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
} from "chart.js";
import { Link, useLocation } from "react-router-dom";
Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale
);

function getMockHistory(price, points = 7) {
  // Generate 'points' days of mock prices around the current price
  return Array.from(
    { length: points },
    (_, i) => price * (0.98 + Math.random() * 0.04)
  );
}

export default function Search() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const initialQuery = params.get("query") || "";

  const [coins, setCoins] = useState([]);
  const [searchTerm, setSearchTerm] = useState(initialQuery);
  const [maxPrice, setMaxPrice] = useState(100000);
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [sortOrder, setSortOrder] = useState("desc"); // "desc" or "asc"

  useEffect(() => {
    fetch("http://localhost:3001/api/listings")
      .then((res) => res.json())
      .then((data) => {
        // Attach mock history to each coin
        const coinsWithHistory = data.data.map((coin) => ({
          ...coin,
          mockHistory: getMockHistory(coin.quote.USD.price),
        }));
        setCoins(coinsWithHistory);
        const highest = Math.max(...data.data.map((c) => c.quote.USD.price));
        setMaxPrice(Math.ceil(highest));
        setPriceRange([0, Math.ceil(highest)]);
      });
  }, []);

  // Filter coins by search and price range
  let filteredCoins = coins.filter(
    (coin) =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      coin.quote.USD.price >= priceRange[0] &&
      coin.quote.USD.price <= priceRange[1]
  );

  // Sort coins by price
  filteredCoins = filteredCoins.sort((a, b) =>
    sortOrder === "desc"
      ? b.quote.USD.price - a.quote.USD.price
      : a.quote.USD.price - b.quote.USD.price
  );

  return (
    <>
      <Navbar />
      <div className="max-w-2xl mx-auto mt-10 p-6 bg-zinc-900 rounded-xl shadow-lg text-white">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Search Cryptocurrencies
        </h1>
        <form className="mb-4">
          <input
            type="text"
            placeholder="Search Crypto"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-16 rounded-full bg-white text-gray-900 px-8 text-xl shadow-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition placeholder-gray-400"
          />
        </form>
        <div className="mb-4 flex items-center gap-4">
          <label className="font-semibold">Sort by price:</label>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="p-2 rounded bg-white text-black"
          >
            <option value="desc">Highest to Lowest</option>
            <option value="asc">Lowest to Highest</option>
          </select>
        </div>
        <div className="border-t border-zinc-700 my-6"></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto px-6 text-white mt-10">
        {filteredCoins.length > 0 ? (
          filteredCoins.map((coin) => (
            <Link
              to={`/coin/${coin.id}`}
              key={coin.id}
              className="w-full max-w-xl"
            >
              <div
                key={coin.id}
                className="flex flex-col justify-between bg-zinc-800 rounded-lg p-6 mb-4 shadow h-full"
              >
                <div className="flex items-center gap-4 mb-2">
                  {coin.logo && (
                    <img
                      src={coin.logo}
                      alt={coin.name}
                      className="w-10 h-10 rounded-full"
                    />
                  )}
                  <div>
                    <div className="font-bold text-lg">
                      {coin.name}{" "}
                      <span className="text-sm text-zinc-400">
                        ({coin.symbol})
                      </span>
                    </div>
                    <div className="text-sm text-zinc-400">{coin.slug}</div>
                  </div>
                </div>
                <div className="mb-4">
                  <Line
                    data={{
                      labels: ["6d", "5d", "4d", "3d", "2d", "1d", "Now"],
                      datasets: [
                        {
                          label: "Price (USD)",
                          data: coin.mockHistory,
                          borderColor: "#22d3ee",
                          backgroundColor: "rgba(34,211,238,0.2)",
                          tension: 0.3,
                        },
                      ],
                    }}
                    options={{
                      responsive: true,
                      plugins: { legend: { display: false } },
                      scales: {
                        x: { display: false },
                        y: { display: false },
                      },
                    }}
                    height={80}
                  />
                </div>
                <div className="text-right">
                  <div className="text-base font-semibold">
                    ${coin.quote.USD.price.toFixed(2)}
                  </div>
                  <div
                    className={`text-sm font-medium ${
                      coin.quote.USD.percent_change_24h >= 0
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    24h: {coin.quote.USD.percent_change_24h.toFixed(2)}%
                  </div>
                  <div className="text-xs text-zinc-400">
                    Market Cap: ${coin.quote.USD.market_cap.toLocaleString()}
                  </div>
                  <div className="text-xs text-zinc-400">
                    Volume 24h: ${coin.quote.USD.volume_24h.toLocaleString()}
                  </div>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="text-zinc-400 text-center col-span-3">
            No coins found.
          </div>
        )}
      </div>
    </>
  );
}
